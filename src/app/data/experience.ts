export type Experience = {
  company: string;
  location: string;
  period: string;
  role?: string;
  description: string;
  href?: string;
};

export const experiences: Experience[] = [
  {
    company: "Füzyonist",
    location: "Konya",
    period: "2025 – Present",
    role: "Mobile/Backend Developer",
    description:
      "A social evaluation platform where users review and rate products based on real experiences. Developed mobile application using React Native. Designed backend services with Node.js for review, rating, and user interaction systems.",
    href: "#",
  },
  {
    company: "OmTun Labs",
    location: "Remote",
    period: "2024 – Present",
    role: "Co-Founder & AI Workflow Engineer",
    description:
      "Created AI-assisted tooling using Claude Code and LangChain-inspired patterns for multi-step reasoning and task evaluation. Built CLI and automated connectors to orchestrate complex tasks, improve pipeline efficiency, and reduce manual intervention. Collaborated with cross-functional stakeholders to document logic structures and evaluation criteria.",
    href: "#",
  },
  {
    company: "Phinia Delphi Technology",
    location: "İzmir",
    period: "2024",
    role: "Mobile Developer Intern",
    description:
      "Contributed to React Native mobile application development. Assisted API integrations and debugging processes. Supported UI refinement and performance optimization.",
    href: "#",
  },
  {
    company: "KodPit Software",
    location: "Denizli",
    period: "2023",
    role: "Mobile Developer Intern",
    description:
      "Received foundational training in React Native development. Built basic cross-platform components and API-connected features. Learned Git-based collaborative workflows.",
    href: "#",
  },
];
