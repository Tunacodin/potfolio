import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { useMagnetic } from "../../lib/motion";

type Props = {
  href?: string;
  onClick?: () => void;
  download?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  strength?: number;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
};

export function MagneticButton({
  href,
  onClick,
  download,
  children,
  className,
  style,
  strength = 0.28,
  target,
  rel,
  type,
}: Props) {
  const { ref, x, y } = useMagnetic(strength);
  const inner = (
    <motion.span
      style={{ x, y, display: "inline-flex" }}
      className="w-full h-full items-center justify-center"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as any}
        href={href}
        download={download}
        target={target}
        rel={rel}
        className={className}
        style={style}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as any}
      onClick={onClick}
      type={type}
      className={className}
      style={style}
    >
      {inner}
    </motion.button>
  );
}
