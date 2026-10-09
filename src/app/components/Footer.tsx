import { ArrowUp } from "lucide-react";
import { useLang } from "../i18n/context";
import { onAnchor } from "../lib/scroll";
import { Roll } from "./ui/Roll";

export function Footer() {
  const { t, pick } = useLang();
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 px-[var(--gutter)] py-8 text-[15px]">
      <p className="text-ink-2">
        © {new Date().getFullYear()} {pick(t.hero.name)}. {pick(t.footer.rights)}
      </p>
      <a href="#top" onClick={onAnchor} className="roll-host inline-flex items-center gap-1.5 font-medium">
        <Roll text={pick(t.nav.home)} />
        <ArrowUp className="size-4" strokeWidth={2.25} />
      </a>
    </footer>
  );
}
