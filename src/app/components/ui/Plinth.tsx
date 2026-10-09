import type { CSSProperties, RefObject } from "react";

/*
 * A round podium seen from slightly above: a light top disc with a dial of ticks,
 * and a black rim carrying the product numbers. Drawn in a 1000 x 190 box; the
 * numbers and ticks turn with the phones via `drawPlinth`.
 */
const CX = 500;
const RX = 490;
/** Vertical squash of every circle on the podium (ry / rx). Phones on the ring use the same value. */
export const TILT = 0.12;
const RY = RX * TILT;
const CY = 61;
const BAND = 66;
/** Where the disc centre sits, as a fraction of the drawn width (CY / 1000). */
export const PLINTH_FLOOR = CY / 1000;
/** Drawn height as a fraction of the drawn width. */
export const PLINTH_RATIO = 190 / 1000;
/** Ring the phones stand on, as a fraction of the disc radius. */
export const RING = 0.805;
const TICKS = 8;

const band = `M${CX - RX},${CY}V${CY + BAND}A${RX} ${RY} 0 0 0 ${CX + RX},${CY + BAND}V${CY}Z`;
const pad = (n: number) => String(n).padStart(2, "0");

type Props = {
  count: number;
  svgRef: RefObject<SVGSVGElement | null>;
  className?: string;
  style?: CSSProperties;
};

export function Plinth({ count, svgRef, className, style }: Props) {
  return (
    <svg ref={svgRef} viewBox="0 0 1000 190" aria-hidden="true" className={className} style={style}>
      <path d={band} fill="var(--ink)" />
      <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="var(--stone)" />
      <ellipse cx={CX} cy={CY} rx={RX * RING} ry={RY * RING} fill="none" stroke="var(--line-strong)" vectorEffect="non-scaling-stroke" />
      <ellipse cx={CX} cy={CY} rx={RX * 0.55} ry={RY * 0.55} fill="none" stroke="var(--line)" vectorEffect="non-scaling-stroke" />
      <path className="pl-ticks" fill="none" stroke="var(--ink-3)" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      {Array.from({ length: count }, (_, i) => (
        <text key={i} className="pl-num" fill="var(--paper)" textAnchor="middle" fontWeight={600} letterSpacing="-0.02em">
          {pad(i + 1)}
        </text>
      ))}
    </svg>
  );
}

/** Turn the dial so product `rot` faces front (fractional values sit between two products). */
export function drawPlinth(svg: SVGSVGElement, rot: number, count: number) {
  const step = (Math.PI * 2) / count;
  // Keep the numbers readable (>= 11px) on small podiums.
  const scale = svg.clientWidth / 1000 || 1;
  const fs = Math.min(30, Math.max(22, 11 / scale));

  let d = "";
  for (let k = 0; k < count * TICKS; k++) {
    const a = (k / TICKS - rot) * step;
    const s = Math.sin(a);
    const c = Math.cos(a);
    const outer = k % TICKS === 0 ? 0.985 : 0.95;
    d += `M${(CX + s * RX * 0.9).toFixed(1)},${(CY + c * RY * 0.9).toFixed(1)}L${(CX + s * RX * outer).toFixed(1)},${(CY + c * RY * outer).toFixed(1)}`;
  }
  svg.querySelector(".pl-ticks")?.setAttribute("d", d);

  svg.querySelectorAll<SVGTextElement>(".pl-num").forEach((el, i) => {
    const a = (i - rot) * step;
    const c = Math.cos(a);
    const o = Math.min(1, Math.max(0, (c - 0.1) / 0.5));
    el.style.opacity = String(o);
    if (!o) return;
    const x = CX + Math.sin(a) * RX * 0.985;
    const y = CY + c * RY + BAND / 2 + fs * 0.36;
    el.setAttribute("font-size", fs.toFixed(1));
    el.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${c.toFixed(3)} 1)`);
  });
}
