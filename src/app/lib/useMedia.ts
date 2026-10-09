import { useEffect, useState } from "react";

/** Live result of a CSS media query (client-only app, so the first render is already correct). */
export function useMedia(query: string) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const on = () => setMatch(mql.matches);
    on();
    mql.addEventListener("change", on);
    return () => mql.removeEventListener("change", on);
  }, [query]);

  return match;
}

export const DESKTOP = "(min-width: 1024px)";
