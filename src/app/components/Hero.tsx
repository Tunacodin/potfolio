import React from "react";
import { ArrowRight, Download, Linkedin, Github } from "lucide-react";
import { profile } from "../data/profile";

const ACCENT_ORANGE = "#FF6B4A";
const ACCENT_LIME = "#C5FF41";

/** CV dosyası public klasöründe olmalı (örn. public/cv.pdf) */
export const CV_DOWNLOAD_PATH = "/cv.pdf";

export function Hero() {
  return (
    <div
      className="w-full flex flex-col gap-8 pb-16"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Title: SOFTWARE / ENGINEER */}
      <div>
        <h1 className="text-white font-bold text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight">
          SOFTWARE
        </h1>
        <h1 className="text-[#888888] font-bold text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mt-1">
          ENGINEER
        </h1>
      </div>

      {/* Intro paragraph - merged CV summaries */}
      <p className="text-white text-base md:text-lg font-light leading-relaxed max-w-xl">
        AI-augmented mobile and backend developer (React Native, Node.js). Product-oriented with
        experience in AI-supported systems, n8n automation workflows, and structured logic pipelines.
        Co-Founder at OmTun Labs. Cursor IDE, Claude Code, rapid iteration.
      </p>

      {/* Stats row - CV aligned */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
        <div className="flex flex-col gap-1">
          <span className="text-white font-bold text-3xl md:text-4xl">+4</span>
          <span className="text-white text-sm font-light">YEARS OF EXPERIENCE</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-white font-bold text-3xl md:text-4xl">+3</span>
          <span className="text-white text-sm font-light">PROJECTS COMPLETED</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-white font-bold text-3xl md:text-4xl">2</span>
          <span className="text-white text-sm font-light">INTERNSHIPS</span>
        </div>
      </div>

      {/* Two cards: Download CV + Tech stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href={CV_DOWNLOAD_PATH}
          download
          className="group relative rounded-2xl p-6 min-h-[140px] flex flex-col justify-between text-white overflow-hidden"
          style={{ backgroundColor: ACCENT_ORANGE }}
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_white_0%,_transparent_70%)]" />
          <div className="relative z-10">
            <Download className="w-8 h-8 mb-3 opacity-90" />
            <p className="text-sm font-medium uppercase tracking-wide">
              Download CV
            </p>
          </div>
          <div className="relative z-10 flex justify-end">
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </div>
        </a>
        <div
          className="relative rounded-2xl p-6 min-h-[140px] flex flex-col justify-between text-[#0A0A0A] overflow-hidden"
          style={{ backgroundColor: ACCENT_LIME }}
        >
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_white_0%,_transparent_70%)]" />
          <div className="relative z-10">
            <p className="text-sm font-medium uppercase tracking-wide mb-4">
              Connect
            </p>
            <div className="flex items-center gap-4">
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#0A0A0A]/10 hover:bg-[#0A0A0A]/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#0A0A0A]/10 hover:bg-[#0A0A0A]/20 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href={profile.links.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#0A0A0A]/10 hover:bg-[#0A0A0A]/20 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
