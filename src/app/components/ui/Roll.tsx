type Props = {
  text: string;
  className?: string;
};

/**
 * Text whose letters roll up to an identical copy when the nearest `.group`
 * (or the element itself, with `roll-host`) is hovered. Screen readers get the plain text.
 */
export function Roll({ text, className }: Props) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span className={`roll ${className ?? ""}`} aria-hidden="true">
        {Array.from(text).map((c, i) => (
          <span key={i} className="roll-l" data-c={c} style={{ ["--i" as string]: i }}>
            {c}
          </span>
        ))}
      </span>
    </>
  );
}
