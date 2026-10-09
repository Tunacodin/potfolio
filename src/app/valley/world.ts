import * as THREE from "three";
import { local } from "./copy";

/* The valley: one terrain mesh, a sky dome, drifting fog veils, dust and a distant beacon.
   Scroll drives a camera along a spline; the pointer is a lantern that thins the fog and
   exposes the terrain's lattice. Everything shares one uniform bag so the fog matches. */

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Valley centre line, meanders as it runs into -z. */
export const cx = (z: number) => 18 * Math.sin(z * 0.012) + 8 * Math.sin(z * 0.031 + 1.3);

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function vnoise(x: number, y: number) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy), b = hash(ix + 1, iy), c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}
function fbm(x: number, y: number) {
  let v = 0, a = 0.5;
  for (let i = 0; i < 5; i++) {
    v += a * vnoise(x, y);
    const nx = 1.6 * x - 1.2 * y, ny = 1.2 * x + 1.6 * y;
    x = nx; y = ny; a *= 0.5;
  }
  return v;
}

export function heightAt(x: number, z: number) {
  const d = x - cx(z);
  const wall = 74 * (1 - Math.exp(-(d * d) / 3600));
  const ridge = (fbm(x * 0.018, z * 0.018) - 0.5) * 30 * smooth(12, 70, Math.abs(d));
  const floor = (fbm(x * 0.05 + 7, z * 0.05) - 0.5) * 2.2;
  return wall + ridge + floor;
}

const GLSL_NOISE = /* glsl */ `
float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; mat2 m=mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<5;i++){ v+=a*noise(p); p=m*p; a*=.5; } return v; }
`;

const GLSL_COMMON = /* glsl */ `
uniform float uTime, uFog, uBeacon, uLens, uLensOn, uDay, uSun;
uniform vec3 uFogLow, uFogHigh, uBeaconDir, uBeaconCol, uSunDir, uSunCol;
uniform vec2 uMouse;
${GLSL_NOISE}
vec3 fogColor(vec3 dir){
  float h = clamp(dir.y*1.6 + .25, 0., 1.);
  vec3 c = mix(uFogLow, uFogHigh, h);
  float b = max(dot(dir, uBeaconDir), 0.);
  float s = max(dot(dir, uSunDir), 0.);
  c += uSunCol * (smoothstep(.9996, .9998, s) * 1.4 + pow(s, 260.) * .5 + pow(s, 18.) * .2 + pow(s, 3.) * .08) * uSun;
  return c + uBeaconCol * (pow(b, 900.)*.35 + pow(b, 40.)*.07 + pow(b, 6.)*.035) * uBeacon;
}
float lensAt(float inner, float outer){
  return uLensOn * (1. - smoothstep(uLens*inner, uLens*outer, length(gl_FragCoord.xy - uMouse)));
}
`;

const WORLD_VERT = /* glsl */ `
varying vec3 vW; varying vec3 vN; varying vec2 vUv;
void main(){
  vec4 w = modelMatrix * vec4(position, 1.);
  vW = w.xyz; vN = normalize(mat3(modelMatrix) * normal); vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

const TERRAIN_FRAG = /* glsl */ `
${GLSL_COMMON}
uniform float uReveal, uRiver, uFront;
uniform vec2 uOrigin;
uniform vec3 uLine;
varying vec3 vW; varying vec3 vN;
float cxg(float z){ return 18. * sin(z * .012) + 8. * sin(z * .031 + 1.3); }
void main(){
  vec3 V = vW - cameraPosition; float dist = length(V); vec3 dir = V/dist;
  vec3 n = normalize(vN);
  float diff = max(dot(n, normalize(vec3(-.35,.8,-.45))), 0.);
  vec3 col = vec3(.030,.034,.042) * (.35 + diff*.9) + vec3(.018,.021,.027) * (1. - n.y);
  // by day: pale ground, lit by the low sun and the open sky
  float sunL = max(dot(n, normalize(vec3(uSunDir.x, max(uSunDir.y, .25), uSunDir.z))), 0.);
  vec3 dayCol = vec3(.56,.55,.52) * (.5 + sunL * .45 + n.y * .2) + uSunCol * sunL * .06;
  col = mix(col, dayCol, uDay);

  float lens = lensAt(.3, 1.);

  // the lattice under the surface: three line families make a triangulated mesh
  vec2 p = vW.xz / 12.;
  vec3 q = vec3(p, p.x + p.y);
  vec3 gd = abs(fract(q - .5) - .5) / fwidth(q);
  float d = min(min(gd.x, gd.y), gd.z * 1.3);
  float line = 1. - smoothstep(0., 1.1, d);
  float halo = exp(-d * .6) * .14;
  vec2 nd = (fract(p - .5) - .5) / fwidth(p);
  float node = 1. - smoothstep(1.2, 2.6, length(nd));

  float r = length(vW.xz - uOrigin);
  float front = 1. - smoothstep(uReveal - 40., uReveal, r);
  float edge = exp(-abs(r - uReveal) / 5.) * step(1., uReveal);
  float breathe = .25 + .75 * smoothstep(.3, .72, fbm(vW.xz * .025 + vec2(uTime * .04, 0.)));
  float trail = .5 + .5 * exp(-max(uReveal - r, 0.) / 45.);
  float vis = max(front * breathe * trail, lens * .75);
  float net = (line + halo + node * 1.4) * vis + (line + halo) * edge * 1.5;
  net *= exp(-dist * .011) * smoothstep(3., 14., dist);
  // at night the lattice glows; by day the same lines read as ink on a drawing
  col = mix(col + uLine * net, mix(col, vec3(.16,.19,.24), clamp(net * 1.6, 0., 1.) * .6), uDay);

  // the river: the sign's light runs down the valley floor; the water moves, the bed stays
  if (uRiver > 0.) {
    float rx = vW.x - cxg(vW.z);
    float w = 4.2 + 1.4 * sin(vW.z * .021 + 2.);
    float bandR = 1. - smoothstep(w - .7, w, abs(rx));
    float bank = exp(-abs(abs(rx) - w) / .22);
    float fill = (1. - smoothstep(uFront - 30., uFront, vW.z)) * smoothstep(-600., -568., vW.z);
    float head = exp(-abs(vW.z - uFront) / 6.) * step(-568., vW.z) * (1. - smoothstep(w * .7, w * 1.4, abs(rx)));
    float streak = smoothstep(.5, .85, noise(vec2(rx * 1.3, vW.z * .06 - uTime * .55)))
                 * smoothstep(.35, .7, noise(vec2(rx * .5 + 9., vW.z * .02 - uTime * .3)));
    float fade = exp(-dist * .006) * smoothstep(2., 10., dist) * uRiver;
    vec3 glow = vec3(.62,.76,.95) * (bandR * (.16 + streak * 1.1) + bank * .7) * fill + vec3(1.,.95,.86) * head * 1.6;
    vec3 water = mix(vec3(.18,.27,.36), vec3(.86,.92,.98), streak * .8);
    vec3 night = col + glow * fade;
    vec3 day = mix(col, water, bandR * fill * fade) + vec3(.1,.13,.16) * bank * fill * fade * -.6 + vec3(1.) * head * fade;
    col = mix(night, day, uDay);
  }

  float hf = exp(-max(vW.y, 0.) / 14.);
  float nz = fbm(vW.xz * .012 + vec2(uTime * .012, uTime * .004));
  float dens = uFog * (.55 + 1.1*nz) * (.6 + 1.2*hf) * (1. - .65*lens);
  col = mix(col, fogColor(dir), 1. - exp(-dist * dens));
  gl_FragColor = vec4(col, 1.);
}
`;

const SKY_FRAG = /* glsl */ `
${GLSL_COMMON}
varying vec3 vW;
void main(){
  vec3 dir = normalize(vW - cameraPosition);
  vec3 col = fogColor(dir);
  vec2 uv = dir.xz / (abs(dir.y) + .35);
  col += mix(vec3(.016,.018,.022), vec3(.1,.09,.08), uDay) * smoothstep(.45, .9, fbm(uv * 1.8 + uTime * .006)) * step(0., dir.y);
  gl_FragColor = vec4(col, 1.);
}
`;

const VEIL_FRAG = /* glsl */ `
${GLSL_COMMON}
uniform float uSeed, uAlpha, uVeil;
varying vec3 vW; varying vec2 vUv;
void main(){
  vec3 V = vW - cameraPosition; float dist = length(V);
  float n = fbm(vW.xy * .022 + vec2(uTime * .018 + uSeed, uSeed * 3.1));
  n = smoothstep(.32, .85, n);
  vec2 u = vUv;
  float edge = smoothstep(0., .28, u.x) * smoothstep(1., .72, u.x) * smoothstep(0., .35, u.y) * smoothstep(1., .55, u.y);
  float near = smoothstep(4., 38., dist);
  float far = 1. - smoothstep(160., 320., dist);
  float a = n * edge * near * far * uAlpha * uVeil * (1. - .9 * lensAt(.25, 1.15));
  gl_FragColor = vec4(fogColor(V/dist) * 1.7 + vec3(.022,.024,.028), a);
}
`;

const BEACON_SIZE = 64;
const BEACON_FRAG = /* glsl */ `
${GLSL_COMMON}
uniform float uDraw, uForm;
varying vec3 vW; varying vec2 vUv;
// distance to the drawn part (0..t) of segment a-b
float seg(vec2 p, vec2 a, vec2 b, float t){
  if (t <= 0.) return 1e3;
  b = mix(a, b, t);
  vec2 pa = p - a, ba = b - a;
  return length(pa - ba * clamp(dot(pa, ba) / max(dot(ba, ba), 1e-4), 0., 1.));
}
vec2 corner(float k){ float a = radians(30. + 60. * k); return vec2(cos(a), sin(a)) * 13.; }
void main(){
  vec2 m = (vUv - .5) * ${BEACON_SIZE}.;
  float r = length(m);
  float flick = .92 + .08 * sin(uTime * 1.7) * sin(uTime * 2.9 + 1.);
  // the far light: a point in a wide halo that tightens once the sign has formed
  float g = exp(-r * r * mix(.48, 1.4, uForm)) * 1.2 + exp(-r * .41) * mix(.22, .09, uForm);

  // the sign, drawn out of the light: a Y from the centre, then the hexagon closes around it
  float ty = clamp(uDraw / .4, 0., 1.), th = clamp((uDraw - .4) / .6, 0., 1.);
  float d = 1e3, spark = 0.;
  for (int k = 0; k < 3; k++){
    vec2 a = corner(float(k * 2)), b1 = corner(float(k * 2 + 1)), b2 = corner(float(k * 2 + 5));
    d = min(d, seg(m, vec2(0.), a, ty));
    d = min(d, seg(m, a, b1, th));
    d = min(d, seg(m, a, b2, th));
    vec2 t0 = m - a * ty, t1 = m - mix(a, b1, th), t2 = m - mix(a, b2, th);
    spark += exp(-dot(t0, t0) * 1.4) * step(.001, ty) * step(ty, .999)
           + (exp(-dot(t1, t1) * 1.4) + exp(-dot(t2, t2) * 1.4)) * step(.001, th) * step(th, .999);
  }
  float fw = fwidth(d);
  float line = 1. - smoothstep(.22, .22 + fw * 1.5, d);
  g += (line * 1.1 + exp(-d * 1.1) * .3) * step(.001, uDraw) + spark * 1.6;

  // once closed it reads as a solid: three faces, three tones of the same light
  vec3 h = abs(vec3(m.x, dot(m, vec2(.5, .866)), dot(m, vec2(-.5, .866))));
  float inside = 1. - smoothstep(11.0, 11.3, max(h.x, max(h.y, h.z)));
  float ang = degrees(atan(m.y, m.x));
  float tone = ang > 30. && ang < 150. ? .3 : (ang > 150. || ang < -90. ? .14 : .06);
  g += inside * tone * uForm;

  float dist = length(vW - cameraPosition);
  g *= exp(-dist * uFog * .32) * uBeacon * flick * (1. - smoothstep(.85, 1., r / ${BEACON_SIZE / 2}.));
  gl_FragColor = vec4(uBeaconCol * g, g);
}
`;

const DUST_VERT = /* glsl */ `
uniform float uTime, uPx;
attribute float aSeed;
varying float vA; varying float vDist;
void main(){
  vec3 p = position;
  p.y += sin(uTime * .25 + aSeed * 6.28) * 1.6;
  p.x += sin(uTime * .17 + aSeed * 12.) * 2.2;
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  vDist = -mv.z;
  vA = .35 + .65 * fract(aSeed * 7.13);
  gl_PointSize = uPx * (1. + aSeed) * 90. / vDist;
  gl_Position = projectionMatrix * mv;
}
`;
const DUST_FRAG = /* glsl */ `
uniform float uFog, uDay;
varying float vA; varying float vDist;
void main(){
  float r = length(gl_PointCoord - .5);
  float a = (1. - smoothstep(.1, .5, r)) * vA * .32 * exp(-vDist * uFog * .9) * smoothstep(1., 6., vDist) * (1. - uDay * .8);
  gl_FragColor = vec4(vec3(.82,.86,.92) * a, a);
}
`;

// sky palettes: night, dawn, day (low = horizon haze, high = zenith)
const NIGHT_LOW = [0.052, 0.058, 0.07], NIGHT_HIGH = [0.012, 0.014, 0.02];
const DAWN_LOW = [0.5, 0.39, 0.34], DAWN_HIGH = [0.11, 0.14, 0.25];
const DAY_LOW = [0.9, 0.89, 0.86], DAY_HIGH = [0.6, 0.71, 0.84];
const mix3 = (a: number[], b: number[], c: number[], t1: number, t2: number) =>
  [0, 1, 2].map((i) => lerp(lerp(a[i], b[i], t1), c[i], t2)) as [number, number, number];

export type WorldLabel = { el: HTMLElement; pos: THREE.Vector3; at: number };

const ORIGIN = new THREE.Vector2(cx(-215), -215);

/** Lattice nodes near the reveal origin, snapped to the 12m grid so labels sit on a node. */
export function nodeSpots(offsets: [number, number][]) {
  return offsets.map(([dx, dz]) => {
    const x = Math.round((ORIGIN.x + dx) / 12) * 12;
    const z = Math.round((ORIGIN.y + dz) / 12) * 12;
    const pos = new THREE.Vector3(x, heightAt(x, z) + 0.4, z);
    return { pos, at: Math.hypot(x - ORIGIN.x, z - ORIGIN.y) };
  });
}

export class World {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private clock = new THREE.Clock();
  private path: THREE.CatmullRomCurve3;
  private path2: THREE.CatmullRomCurve3;
  private path3: THREE.CatmullRomCurve3;
  private path4: THREE.CatmullRomCurve3;
  private sky: THREE.Mesh;
  private beacon: THREE.Mesh;
  private beaconPos = new THREE.Vector3(cx(-560), 44, -560);
  private U: Record<string, THREE.IUniform>;
  private veilU: THREE.IUniform;
  private dustU: Record<string, THREE.IUniform>;
  private signU = { uDraw: { value: 0 }, uForm: { value: 0 } };
  private riverU!: Record<string, THREE.IUniform>;
  private p = 0;
  private target = 0;
  private look = new THREE.Vector2();
  private lookTarget = new THREE.Vector2();
  private lensPos = new THREE.Vector2(-9999, -9999);
  private lensTarget = new THREE.Vector2(-9999, -9999);
  private lensOn = 0;
  private lensWant = 0;
  private pr = 1;
  private w = 1;
  private h = 1;
  private last = 0;
  private running = false;
  private frameCbs: ((w: World) => void)[] = [];
  labels: WorldLabel[] = [];
  readonly coarse: boolean;

  constructor(private canvas: HTMLCanvasElement) {
    this.coarse = matchMedia("(pointer: coarse)").matches || innerWidth < 768;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: !this.coarse, powerPreference: "high-performance" });
    this.renderer.setClearColor(0x050608, 1);
    this.camera = new THREE.PerspectiveCamera(52, 1, 0.5, 1400);

    this.U = {
      uTime: { value: 0 },
      uFog: { value: 0.024 },
      uFogLow: { value: new THREE.Color(0.052, 0.058, 0.07) },
      uFogHigh: { value: new THREE.Color(0.012, 0.014, 0.02) },
      uBeacon: { value: 1 },
      uBeaconDir: { value: new THREE.Vector3(0, 0, -1) },
      uBeaconCol: { value: new THREE.Color(1, 0.95, 0.88) },
      uMouse: { value: new THREE.Vector2(-9999, -9999) },
      uLens: { value: 170 },
      uLensOn: { value: 0 },
      uDay: { value: 0 },
      uSun: { value: 0 },
      uSunDir: { value: new THREE.Vector3(-0.3, -0.05, 1).normalize() },
      uSunCol: { value: new THREE.Color(1, 0.8, 0.6) },
    };

    // terrain
    const [sx, sz] = this.coarse ? [130, 240] : [220, 400];
    const geo = new THREE.PlaneGeometry(420, 840, sx, Math.round(sz * 1.1));
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, 0, -340);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) pos.setY(i, heightAt(pos.getX(i), pos.getZ(i)));
    geo.computeVertexNormals();
    const terrainMat = new THREE.ShaderMaterial({
      vertexShader: WORLD_VERT,
      fragmentShader: TERRAIN_FRAG,
      uniforms: {
        ...this.U,
        uReveal: { value: 0 },
        uOrigin: { value: ORIGIN },
        uLine: { value: new THREE.Color(0.5, 0.6, 0.74) },
        uRiver: { value: 0 },
        uFront: { value: -600 },
      },
    });
    this.scene.add(new THREE.Mesh(geo, terrainMat));
    (this.U as Record<string, THREE.IUniform>).uReveal = terrainMat.uniforms.uReveal;
    this.riverU = terrainMat.uniforms;

    // sky dome follows the camera
    this.sky = new THREE.Mesh(
      new THREE.SphereGeometry(1000, 32, 16),
      new THREE.ShaderMaterial({ vertexShader: WORLD_VERT, fragmentShader: SKY_FRAG, uniforms: this.U, side: THREE.BackSide, depthWrite: false }),
    );
    this.sky.renderOrder = -1;
    this.scene.add(this.sky);

    // fog veils the camera flies through
    this.veilU = { value: 1 };
    let seed = 1;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const veilGeo = new THREE.PlaneGeometry(1, 1);
    for (let i = 0; i < 22; i++) {
      const z = 50 - i * 22 - rnd() * 10;
      const m = new THREE.Mesh(
        veilGeo,
        new THREE.ShaderMaterial({
          vertexShader: WORLD_VERT,
          fragmentShader: VEIL_FRAG,
          uniforms: { ...this.U, uSeed: { value: rnd() * 40 }, uAlpha: { value: 0.45 + rnd() * 0.5 }, uVeil: this.veilU },
          transparent: true,
          depthWrite: false,
        }),
      );
      m.position.set(cx(z) + (rnd() - 0.5) * 70, i < 9 ? 18 + rnd() * 26 : 8 + rnd() * 22, z);
      m.scale.set(170 + rnd() * 120, 50 + rnd() * 50, 1);
      m.rotation.y = (rnd() - 0.5) * 0.5;
      this.scene.add(m);
    }

    // beacon: the far light, drawn into the brand sign in the second act
    this.beacon = new THREE.Mesh(
      new THREE.PlaneGeometry(BEACON_SIZE, BEACON_SIZE),
      new THREE.ShaderMaterial({
        vertexShader: WORLD_VERT, fragmentShader: BEACON_FRAG, uniforms: { ...this.U, ...this.signU },
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      }),
    );
    this.beacon.position.copy(this.beaconPos);
    this.scene.add(this.beacon);

    // dust
    const n = this.coarse ? 1100 : 2500;
    const dp = new Float32Array(n * 3), ds = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const z = 70 - rnd() * 560;
      dp.set([cx(z) + (rnd() - 0.5) * 120, 2 + rnd() * 50, z], i * 3);
      ds[i] = rnd();
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute("position", new THREE.BufferAttribute(dp, 3));
    dg.setAttribute("aSeed", new THREE.BufferAttribute(ds, 1));
    this.dustU = { uTime: this.U.uTime, uFog: this.U.uFog, uDay: this.U.uDay, uPx: { value: 1 } };
    this.scene.add(new THREE.Points(dg, new THREE.ShaderMaterial({
      vertexShader: DUST_VERT, fragmentShader: DUST_FRAG, uniforms: this.dustU,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    })));

    const P = (z: number, dx: number, y: number) => new THREE.Vector3(cx(z) + dx, y, z);
    this.path = new THREE.CatmullRomCurve3(
      [P(70, 0, 36), P(20, 4, 35), P(-40, -6, 29), P(-95, 8, 18), P(-140, 6, 10.5), P(-172, -4, 9), P(-200, -8, 9.5), P(-240, -4, 10)],
      false, "centripetal",
    );
    // second act: from where the valley walk stops, up the valley toward the light
    this.path2 = new THREE.CatmullRomCurve3(
      [this.path.getPointAt(0.9), this.path.getPointAt(1), P(-300, 2, 11), P(-370, 4, 13), P(-430, 1, 15), P(-458, 0, 16)],
      false, "centripetal",
    );
    // third act: rise above the source, turn round, and follow the river back down the valley
    this.path3 = new THREE.CatmullRomCurve3(
      [P(-458, 0, 16), P(-470, 4, 24), P(-478, 2, 36), P(-462, -3, 44), P(-410, 0, 46), P(-330, 2, 44), P(-250, 0, 42)],
      false, "centripetal",
    );
    // fourth and fifth acts: drift slowly through the clearing, then rise toward the horizon
    this.path4 = new THREE.CatmullRomCurve3(
      [P(-250, 0, 42), P(-215, 1, 41), P(-180, 0, 41), P(-150, -1, 46), P(-125, 0, 58)],
      false, "centripetal",
    );

    this.resize();
    addEventListener("resize", this.resize);
    document.addEventListener("visibilitychange", this.onVis);
    this.start();
  }

  /** Scroll progress of the whole film, 0..1. */
  setProgress(p: number) { this.target = p; }

  /** Pointer in CSS px; `on` false hides the lantern. */
  pointer(x: number, y: number, on: boolean) {
    this.lensTarget.set(x * this.pr, (this.h - y) * this.pr);
    this.lookTarget.set((x / this.w) * 2 - 1, (y / this.h) * 2 - 1);
    this.lensWant = on ? 1 : 0;
  }

  onFrame(cb: (w: World) => void) { this.frameCbs.push(cb); }

  get progress() { return this.p; }
  get size() { return { w: this.w, h: this.h }; }

  /** Project a world point to CSS px; null when behind the camera. */
  project(v: THREE.Vector3, out: THREE.Vector3) {
    out.copy(v).project(this.camera);
    if (out.z > 1) return null;
    return { x: (out.x * 0.5 + 0.5) * this.w, y: (-out.y * 0.5 + 0.5) * this.h, dist: v.distanceTo(this.camera.position) };
  }

  get reveal() { return (this.U.uReveal.value as number); }
  /** Daylight, 0 night .. 1 day. */
  get day() { return this.U.uDay.value as number; }
  /** How much of the brand sign is drawn, 0..1. */
  get sign() { return this.signU.uDraw.value; }

  private resize = () => {
    this.w = this.canvas.clientWidth || innerWidth;
    this.h = this.canvas.clientHeight || innerHeight;
    this.pr = Math.min(devicePixelRatio, this.coarse ? 1 : 1.5);
    this.renderer.setPixelRatio(this.pr);
    this.renderer.setSize(this.w, this.h, false);
    this.camera.aspect = this.w / this.h;
    this.camera.fov = this.w < this.h ? 66 : 52;
    this.camera.updateProjectionMatrix();
    this.U.uLens.value = (this.coarse ? 120 : 170) * this.pr;
    this.dustU.uPx.value = this.pr * (this.h / 900);
  };

  private onVis = () => (document.hidden ? this.stop() : this.start());

  private start() {
    if (this.running) return;
    this.running = true;
    this.clock.getDelta();
    this.renderer.setAnimationLoop(this.tick);
  }
  private stop() {
    this.running = false;
    this.renderer.setAnimationLoop(null);
  }

  private tmp = new THREE.Vector3();
  private ahead = new THREE.Vector3();
  private aim = new THREE.Vector3();

  private tick = (now: number) => {
    // phones get 30 fps, the fog hides it and the battery thanks us
    if (this.coarse && now - this.last < 32) return;
    this.last = now;
    const dt = Math.min(this.clock.getDelta(), 0.1);
    const t = this.clock.elapsedTime;
    const U = this.U;
    U.uTime.value = t;

    this.p += (this.target - this.p) * (1 - Math.exp(-dt * 3));
    const p = local("valley", this.p), q = local("beacon", this.p), r = local("river", this.p);
    const c = local("clearing", this.p), h = local("horizon", this.p);

    // progress -> distance along the path: drift in the cloud, descend, then walk the floor
    const s =
      p < 0.3 ? lerp(0, 0.22, p / 0.3)
      : p < 0.6 ? lerp(0.22, 0.74, smooth(0.3, 0.6, p))
      : lerp(0.74, 0.9, (p - 0.6) / 0.4);

    const cam = this.camera;
    if (q <= 0) {
      this.path.getPointAt(s, this.tmp);
      this.path.getPointAt(Math.min(s + 0.07, 1), this.ahead);
    } else if (c > 0) {
      this.path4.getPointAt(0.72 * c + 0.28 * smooth(0, 0.8, h), this.tmp);
    } else if (r > 0) {
      // hover while turning, then glide downstream
      const u = 0.5 * smooth(0, 0.4, r) + 0.5 * smooth(0.4, 1, r);
      this.path3.getPointAt(u, this.tmp);
    } else {
      // walk toward the light and slow to a stop as the sign is drawn
      const x = Math.min(q / 0.6, 1), u = 1 - (1 - x) * (1 - x);
      this.path2.getPointAt(u, this.tmp);
      this.path2.getPointAt(Math.min(u + 0.1, 1), this.ahead);
    }
    this.tmp.x += Math.sin(t * 0.23) * 0.6;
    this.tmp.y += Math.sin(t * 0.35) * 0.4;
    this.tmp.y = Math.max(this.tmp.y, heightAt(this.tmp.x, this.tmp.z) + 4);
    cam.position.copy(this.tmp);

    this.look.lerp(this.lookTarget, 1 - Math.exp(-dt * 2.2));
    this.ahead.y -= lerp(3, 7, smooth(0.45, 0.8, p));
    this.ahead.x += this.look.x * 7;
    this.ahead.y -= this.look.y * 3.5;
    // second act: the gaze lifts to the light and keeps it in the upper quarter of the frame
    const k = smooth(0, 0.3, q);
    if (k > 0) {
      const b = this.beaconPos, c = cam.position;
      const hz = Math.hypot(b.x - c.x, b.z - c.z);
      const up = Math.atan2(b.y - c.y, hz) - Math.atan(0.5 * Math.tan((cam.fov * Math.PI) / 360));
      this.aim.set(b.x + this.look.x * 14, c.y + hz * Math.tan(up) - this.look.y * 7, b.z);
      this.ahead.lerp(this.aim, k);
    }
    if (r > 0) {
      // turn from the light to the valley we came through: yaw and pitch, never through the camera
      const c = cam.position, d0 = this.aim.sub(c).normalize();
      const zz = c.z + 160;
      const d1 = this.ahead.set(cx(zz) + this.look.x * 30, heightAt(cx(zz), zz) + 4 - this.look.y * 14, zz).sub(c).normalize();
      const tr = smooth(0.06, 0.4, r);
      const y0 = Math.atan2(d0.x, d0.z), p0 = Math.asin(d0.y);
      // always turn the same way round (dy stays near pi, far from the wrap)
      const dy = (((Math.atan2(d1.x, d1.z) - y0) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      // at the horizon the gaze lifts from the valley floor to the sky
      const yaw = y0 + dy * tr, pitch = lerp(p0, Math.asin(d1.y), tr) + 0.2 * smooth(0.05, 0.75, h);
      this.ahead.set(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)).add(c);
    }
    cam.lookAt(this.ahead);

    U.uFog.value = lerp(lerp(0.024, 0.0085, smooth(0.28, 0.62, p)), 0.0065, smooth(0, 0.6, q));
    this.veilU.value = lerp(1, 0.3, smooth(0.32, 0.66, p)) * (1 - 0.4 * smooth(0, 0.5, q));
    // the lattice wave runs on up the valley and reaches the light just as the sign starts
    U.uReveal.value = smooth(0.55, 0.95, p) * 300 + smooth(0.05, 0.36, q) * 48 + smooth(0.36, 0.9, q) * 140;
    U.uBeacon.value = lerp(1, 0.75, smooth(0.4, 0.7, p)) + smooth(0.3, 0.6, q) * 0.35;
    this.signU.uDraw.value = Math.min(1, Math.max(0, (q - 0.36) / 0.26));
    this.signU.uForm.value = smooth(0.56, 0.72, q);

    // third act: the sign's light pours into the valley as a river, and dawn comes up ahead
    const day = smooth(0.08, 0.8, r);
    U.uDay.value = day;
    U.uSun.value = smooth(0.04, 0.4, r) * (1 - 0.35 * day);
    (U.uSunDir.value as THREE.Vector3).set(-0.32, lerp(-0.03, 0.16, smooth(0.05, 0.9, r)), 1).normalize();
    (U.uSunCol.value as THREE.Color).setRGB(1, lerp(0.72, 0.94, day), lerp(0.5, 0.86, day));
    const a = Math.min(day * 2, 1), b2 = Math.max(day * 2 - 1, 0);
    (U.uFogLow.value as THREE.Color).setRGB(...mix3(NIGHT_LOW, DAWN_LOW, DAY_LOW, a, b2));
    (U.uFogHigh.value as THREE.Color).setRGB(...mix3(NIGHT_HIGH, DAWN_HIGH, DAY_HIGH, a, b2));
    U.uFog.value = lerp(lerp(U.uFog.value, 0.0042, smooth(0.1, 0.8, r)), 0.003, smooth(0, 0.6, h));
    U.uBeacon.value *= 1 - smooth(0.04, 0.3, r);
    this.veilU.value *= 1 - smooth(0.1, 0.55, r);
    this.riverU.uRiver.value = smooth(0.05, 0.1, r);
    const f = Math.max(0, (r - 0.08) / 0.54);
    this.riverU.uFront.value = -568 + 660 * Math.pow(f, 1.3);


    this.lensOn += (this.lensWant - this.lensOn) * (1 - Math.exp(-dt * 4));
    this.lensPos.lerp(this.lensTarget, 1 - Math.exp(-dt * 30));
    U.uLensOn.value = this.lensOn;
    (U.uMouse.value as THREE.Vector2).copy(this.lensPos);

    (U.uBeaconDir.value as THREE.Vector3).copy(this.beaconPos).sub(cam.position).normalize();
    this.sky.position.copy(cam.position);
    this.beacon.quaternion.copy(cam.quaternion);

    this.renderer.render(this.scene, cam);
    for (const cb of this.frameCbs) cb(this);
  };

  dispose() {
    this.stop();
    removeEventListener("resize", this.resize);
    document.removeEventListener("visibilitychange", this.onVis);
    this.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      const mat = m.material as THREE.Material | undefined;
      mat?.dispose?.();
    });
    this.renderer.dispose();
  }
}
