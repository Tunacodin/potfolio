/* Ambience made from nothing: brown-noise wind through a wandering band-pass, and a low
   detuned drone. No files. Scroll speed feeds the wind; lattice nodes ring a soft chime. */

export class Ambience {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private wind!: GainNode;
  private band!: BiquadFilterNode;
  private water!: GainNode;
  private low!: BiquadFilterNode;
  private on = false;
  private lit = [-1, -1];

  get enabled() { return this.on; }

  private build() {
    const ctx = new AudioContext();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    this.master.connect(comp).connect(ctx.destination);

    // brown noise, 4 s loop
    const len = ctx.sampleRate * 4;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      d[i] = last * 3.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;
    this.band = ctx.createBiquadFilter();
    this.band.type = "bandpass";
    this.band.frequency.value = 420;
    this.band.Q.value = 0.7;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoAmt = ctx.createGain();
    lfoAmt.gain.value = 220;
    lfo.connect(lfoAmt).connect(this.band.frequency);
    this.wind = ctx.createGain();
    this.wind.gain.value = 0.35;
    noise.connect(this.band).connect(this.wind).connect(this.master);
    noise.start();
    lfo.start();

    // the river: the same noise, higher and brighter, swelling in as the water runs
    const rush = ctx.createBiquadFilter();
    rush.type = "bandpass";
    rush.frequency.value = 1400;
    rush.Q.value = 0.9;
    this.water = ctx.createGain();
    this.water.gain.value = 0;
    noise.connect(rush).connect(this.water).connect(this.master);

    // drone: A1 and E2, each a pair of slightly detuned sines, swelling slowly
    const low = (this.low = ctx.createBiquadFilter());
    low.type = "lowpass";
    low.frequency.value = 340;
    const drone = ctx.createGain();
    drone.gain.value = 0.05;
    const swell = ctx.createOscillator();
    swell.frequency.value = 0.045;
    const swellAmt = ctx.createGain();
    swellAmt.gain.value = 0.025;
    swell.connect(swellAmt).connect(drone.gain);
    swell.start();
    for (const [f, det] of [[55, -6], [55, 5], [82.4, -4], [82.4, 7], [110, 3]] as const) {
      const o = ctx.createOscillator();
      o.frequency.value = f;
      o.detune.value = det;
      o.connect(low);
      o.start();
    }
    low.connect(drone).connect(this.master);
  }

  toggle() {
    if (!this.ctx) this.build();
    const ctx = this.ctx!;
    this.on = !this.on;
    if (this.on) void ctx.resume();
    const g = this.master.gain;
    g.cancelScheduledValues(ctx.currentTime);
    g.setTargetAtTime(this.on ? 0.55 : 0, ctx.currentTime, this.on ? 1.2 : 0.25);
    return this.on;
  }

  /** Scroll speed in px/s; gusts with motion, settles at rest. */
  gust(v: number) {
    if (!this.on || !this.ctx) return;
    const k = Math.min(Math.abs(v) / 2500, 1);
    const t = this.ctx.currentTime;
    this.wind.gain.setTargetAtTime(0.3 + k * 0.9, t, 0.35);
    this.band.Q.setTargetAtTime(0.7 + k * 1.6, t, 0.5);
  }

  /** The river act: water swells with the flow, and the drone opens up as the day comes. */
  light(river: number, day: number) {
    if (!this.on || !this.ctx) return;
    // called every frame: only reschedule when the values have actually moved
    if (Math.abs(river - this.lit[0]) < 0.01 && Math.abs(day - this.lit[1]) < 0.01) return;
    this.lit = [river, day];
    const t = this.ctx.currentTime;
    this.water.gain.setTargetAtTime(river * 0.5, t, 0.6);
    this.low.frequency.setTargetAtTime(340 + day * 560, t, 0.8);
  }

  /** A glassy two-partial ping, pitched by index so the lattice plays a chord. */
  chime(i: number) {
    if (!this.on || !this.ctx) return;
    const ctx = this.ctx;
    const scale = [659.3, 880, 987.8, 1318.5, 1174.7, 1479.98, 1760, 1975.5];
    const f = scale[i % scale.length];
    const t = ctx.currentTime;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.05, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.6);
    g.connect(this.master);
    for (const m of [1, 2.76]) {
      const o = ctx.createOscillator();
      o.frequency.value = f * m;
      const og = ctx.createGain();
      og.gain.value = m === 1 ? 1 : 0.18;
      o.connect(og).connect(g);
      o.start(t);
      o.stop(t + 2.7);
    }
  }

  dispose() {
    void this.ctx?.close();
    this.ctx = null;
    this.on = false;
  }
}
