type SectionTitleProps = {
  line1: string;
  line2: string;
  className?: string;
};

export function SectionTitle({ line1, line2, className = "" }: SectionTitleProps) {
  return (
    <h2
      className={`font-bold uppercase tracking-tight ${className}`}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <span className="block text-white text-4xl md:text-5xl">{line1}</span>
      <span className="block text-[#595959] text-3xl md:text-4xl mt-0.5 ml-2 md:ml-4">{line2}</span>
    </h2>
  );
}
