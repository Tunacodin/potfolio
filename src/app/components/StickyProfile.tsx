import { profile } from "../data/profile";

const ACCENT = "#FF6B4A";

const socials = [
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "GitHub", href: profile.links.github },
  { label: "Website", href: profile.links.website },
  { label: "OmTun Labs", href: profile.links.company },
];

export function StickyProfile() {
  return (
    <div
      className="sticky top-20 w-full max-w-[340px] rounded-2xl bg-white p-6 shadow-xl flex flex-col gap-5"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Photo with orange dotted circle */}
      <div className="relative w-full aspect-[3/4] max-h-[280px] rounded-xl overflow-hidden bg-[#FFF5F0]">
        <img
          src="/removedbg.png"
          alt="Profile"
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
          }}
        />
        <div className="hidden w-full h-full bg-[#FF6B4A]/20 flex items-center justify-center text-[#0A0A0A] text-4xl font-bold">
          TB
        </div>
      </div>

      {/* Name & title */}
      <div>
        <h2 className="text-[#0A0A0A] font-bold text-xl md:text-2xl uppercase tracking-tight">
          {profile.name}
        </h2>
        <p className="text-[#555] text-sm font-light mt-0.5">{profile.title}</p>
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-1.5 text-sm">
        <a
          href={`mailto:${profile.email}`}
          className="text-[#0A0A0A] font-light hover:opacity-80"
        >
          {profile.email}
        </a>
        <a
          href={`tel:${profile.phone.replace(/\s/g, "")}`}
          className="text-[#555] font-light hover:opacity-80"
        >
          {profile.phone}
        </a>
        <span className="text-[#555] font-light">{profile.location}</span>
      </div>

      {/* Social / links */}
      <div className="flex items-center gap-3 flex-wrap">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white hover:opacity-80 transition-opacity text-xs font-bold"
            aria-label={s.label}
            title={s.label}
          >
            {s.label[0]}
          </a>
        ))}
        <a
          href="#work"
          className="w-9 h-9 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
          aria-label="Projects"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7h-8M17 7v8" />
          </svg>
        </a>
      </div>
    </div>
  );
}
