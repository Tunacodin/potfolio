import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer
      className="w-full py-8 border-t border-white/[0.06]"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-[#AAAAAA] text-sm font-light">
        <span>Made by {profile.name}</span>
        <span className="hidden sm:inline">|</span>
        <a
          href={profile.links.website}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          {profile.links.website.replace(/^https?:\/\//, "")}
        </a>
        <span className="hidden sm:inline">|</span>
        <a
          href={profile.links.company}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          OmTun Labs
        </a>
      </div>
    </footer>
  );
}
