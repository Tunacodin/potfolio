import { useRef } from "react";
import type { ElementType } from "react";
import { gsap, MQ, useGSAP } from "../../lib/scroll";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
  delay?: number;
};

/** Headline that rises word by word out of a mask. */
export function RevealText({ text, as: Tag = "h2", className, immediate, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(ref.current!.querySelectorAll(".rw-i"), {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.06,
          delay,
          scrollTrigger: immediate ? undefined : { trigger: ref.current, start: "top 88%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [text], revertOnUpdate: true },
  );

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="rw">
            <span className="rw-i">{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
