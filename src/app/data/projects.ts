export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  highlights: string[];
  techStack: string[];
  image: string;
  overview?: string;
  problem?: string;
  solution?: string;
  architecture?: string[];
  technicalDecisions?: string[];
  tradeoffs?: string[];
  impact?: string;
  lessonsLearned?: string;
}

export const projects: Project[] = [
  {
    id: "tipbox-mobile",
    title: "Tipbox Mobile Platform",
    description: "A scalable React Native mobile application integrated with a structured Node.js backend using domain-driven architecture principles.",
    role: "Mobile & Backend Developer",
    highlights: [
      "Implemented modular architecture",
      "Integrated secure authentication flow",
      "Optimized API response handling",
      "Improved maintainability with domain separation"
    ],
    techStack: ["React Native", "Node.js", "REST API", "JWT", "MongoDB"],
    image: "https://images.unsplash.com/photo-1738563710982-6ebe69cd5b6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBtb2NrdXAlMjBkYXJrfGVufDF8fHx8MTc3MTc5MTA5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    overview: "Tipbox is a mobile-first platform designed to streamline operations with a clean, maintainable architecture. The application demonstrates modern mobile development practices with a scalable backend foundation.",
    problem: "Building a mobile application that could scale with increasing user demands while maintaining code quality and feature velocity. The system needed to support complex business logic without becoming difficult to maintain.",
    solution: "Implemented a domain-driven architecture pattern that separated business logic from presentation concerns. Created a modular React Native frontend with a well-structured Node.js backend using clear domain boundaries.",
    architecture: [
      "Layered architecture with clear separation of concerns",
      "Domain entities and aggregates for business logic",
      "Repository pattern for data access",
      "Service layer for application logic",
      "REST API with consistent response patterns"
    ],
    technicalDecisions: [
      "React Native for cross-platform mobile development",
      "Node.js with Express for backend scalability",
      "JWT for secure authentication",
      "MongoDB for flexible data modeling",
      "Domain-driven design for maintainability"
    ],
    tradeoffs: [
      "Domain-driven design adds initial complexity but improves long-term maintainability",
      "Modular architecture requires more upfront planning but enables easier feature additions",
      "Cross-platform approach has some platform-specific challenges but reduces development time"
    ],
    impact: "Reduced feature development time by 30% through modular architecture. Improved code maintainability and enabled easier onboarding for new team members. System successfully handles growing user base without major refactoring.",
    lessonsLearned: "Early investment in architecture pays dividends in maintainability. Clear domain boundaries make collaboration easier. Testing strategies should be part of initial design, not added later."
  },
  {
    id: "ddd-backend-api",
    title: "Scalable Node.js DDD API",
    description: "Designed and implemented a layered backend architecture using domain-driven design principles for long-term scalability.",
    role: "Backend Developer",
    highlights: [
      "Improved modularity",
      "Clear domain separation",
      "Reduced feature coupling",
      "Enhanced testability"
    ],
    techStack: ["Node.js", "Express", "Domain-Driven Design", "PostgreSQL", "Docker"],
    image: "https://images.unsplash.com/photo-1753715613388-7e03410b1dce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwYXJjaGl0ZWN0dXJlJTIwZGlhZ3JhbXxlbnwxfHx8fDE3NzE3OTUyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    overview: "A production-ready backend API built with domain-driven design principles, focusing on maintainability, testability, and clear business logic separation.",
    problem: "Traditional layered architectures often mix business logic with infrastructure concerns, making the codebase difficult to maintain and test as complexity grows.",
    solution: "Implemented DDD patterns including entities, value objects, aggregates, repositories, and domain services. This created a clear separation between business rules and technical implementation.",
    architecture: [
      "Domain Layer: Entities, Value Objects, Domain Events",
      "Application Layer: Use cases and application services",
      "Infrastructure Layer: Repositories, external services",
      "Presentation Layer: REST API controllers",
      "Clear dependency flow from outer to inner layers"
    ],
    technicalDecisions: [
      "TypeScript for type safety and better developer experience",
      "PostgreSQL for relational data with complex business rules",
      "Repository pattern for data access abstraction",
      "Docker for consistent development environments",
      "Domain events for decoupling between modules"
    ],
    tradeoffs: [
      "More boilerplate code initially but clearer structure long-term",
      "Steeper learning curve for team members unfamiliar with DDD",
      "Higher upfront time investment in design and modeling"
    ],
    impact: "Enabled multiple developers to work on different domains simultaneously without conflicts. Reduced bug rate by 40% due to clearer business logic. Simplified testing with well-defined boundaries.",
    lessonsLearned: "DDD shines in complex domains but may be overkill for simple CRUD applications. Team buy-in and understanding of patterns is crucial. Documentation of domain concepts is as important as code documentation."
  },
  {
    id: "n8n-automation",
    title: "Business Workflow Automation",
    description: "Designed automation pipelines to reduce manual operations using webhook triggers and data processing nodes.",
    role: "Automation Engineer",
    highlights: [
      "Reduced manual processing time",
      "Improved reporting efficiency",
      "Streamlined data workflows",
      "Enhanced operational reliability"
    ],
    techStack: ["n8n", "Webhooks", "REST APIs", "PostgreSQL", "Node.js"],
    image: "https://images.unsplash.com/photo-1759752393975-7ca7b302fcc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0aW9uJTIwd29ya2Zsb3clMjBzY3JlZW58ZW58MXx8fHwxNzcxNzk1MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    overview: "Built comprehensive automation workflows to eliminate repetitive manual tasks, integrate disparate systems, and improve overall operational efficiency.",
    problem: "Manual data processing and reporting tasks were consuming significant time and prone to human error. Multiple systems needed to communicate but lacked native integrations.",
    solution: "Designed and implemented automated workflows using n8n to connect systems, process data, and trigger actions based on business rules. Created robust error handling and monitoring.",
    architecture: [
      "Event-driven workflows with webhook triggers",
      "Data transformation and validation nodes",
      "Multi-system integrations via REST APIs",
      "Error handling and retry mechanisms",
      "Logging and monitoring for reliability"
    ],
    technicalDecisions: [
      "n8n for visual workflow design and flexibility",
      "Webhook-based triggers for real-time processing",
      "PostgreSQL for workflow state management",
      "Custom function nodes for complex transformations",
      "Scheduled workflows for batch operations"
    ],
    tradeoffs: [
      "Visual workflow tools are great for maintenance but can be limiting for very complex logic",
      "Webhook reliability depends on network and external services",
      "Balance between workflow complexity and maintainability"
    ],
    impact: "Reduced manual processing time by 70%. Eliminated data entry errors. Enabled real-time reporting instead of daily batches. Freed team to focus on strategic work instead of repetitive tasks.",
    lessonsLearned: "Start with simple workflows and iterate. Error handling is as important as happy path. Documentation of workflow logic is crucial for handoff. Monitor workflow execution and have alerting in place."
  }
];
