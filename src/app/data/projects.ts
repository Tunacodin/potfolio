export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  role: string;
  techStack: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    id: "sorsana-app",
    title: "SorsanaApp — AI-Integrated Peer Learning App",
    description:
      "A peer-based question solving platform where students share questions and receive AI-supported explanations. Developed cross-platform mobile app using React Native. Built Node.js backend for question flow, user interaction, and content management. Integrated AI-powered solution support for enhanced learning experience.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=240&fit=crop",
    role: "Product Owner & Full-Stack Developer",
    techStack: ["React Native", "Node.js", "AI integration", "Content management"],
    href: "#",
  },
  {
    id: "apartment-management",
    title: "Apartment Management System",
    description:
      "Digitized apartment management processes including payments, announcements, and tenant communication. React Native (Expo) mobile client, .NET Core REST API backend, MS SQL Server database design and management. Role-based access and financial record tracking.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=240&fit=crop",
    role: "Undergraduate Thesis Project",
    techStack: ["React Native", "Expo", ".NET Core", "MS SQL Server"],
    href: "#",
  },
  {
    id: "ai-evaluation-workflow",
    title: "AI Evaluation & Workflow Design Tool",
    description:
      "Designed automated evaluation pipelines that assess model outputs against structured criteria. Implemented workflows using n8n to integrate internal and third-party services. Built Node.js REST APIs for workflow orchestration. Developed Claude Code-based agents for autonomous resolution of structured logic tasks. Documentation templates for decision logic and scoring rubrics.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop",
    role: "AI & Automation",
    techStack: ["n8n", "Node.js", "Claude Code", "LangChain", "Evaluation pipelines"],
    href: "#",
  },
];
