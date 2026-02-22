export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  highlights: string[];
  techStack: string[];
  image: string;
  video?: string;
  overview?: string;
  problem?: string;
  solution?: string;
  architecture?: string[];
  technicalDecisions?: string[];
  tradeoffs?: string[];
  impact?: string;
  lessonsLearned?: string;
}

import n8nVideo from "../components/videos/n8n.mov";
import slackVideo from "../components/videos/slack.mov";

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
    title: "Sorsana n8n Automation",
    description: "Enterprise workflow automation platform integrating n8n with Slack and custom APIs for streamlined data processing and team collaboration.",
    role: "Automation Architect",
    highlights: [
      "70% reduction in manual processing",
      "Real-time Slack notifications",
      "Multi-system data synchronization",
      "Comprehensive error monitoring"
    ],
    techStack: ["n8n", "Slack API", "Webhooks", "PostgreSQL", "Node.js"],
    image: new URL("../components/images/n8n.png", import.meta.url).href,
    video: n8nVideo,
    overview: "Built enterprise-grade automation workflows using n8n to orchestrate complex business processes. Integrated Slack for real-time notifications and team communication. Created modular, reusable workflow components.",
    problem: "Manual data processing consumed 70% of operational time. Multiple systems lacked native integration. Team needed real-time visibility into workflow execution and errors. Error handling was inconsistent across processes.",
    solution: "Architected n8n workflows with visual workflow design for maintainability. Integrated Slack webhooks for real-time alerts and status updates. Implemented error handling with retry logic and comprehensive logging. Created reusable workflow components for faster deployment.",
    architecture: [
      "Modular workflow components for code reuse",
      "Event-driven architecture with webhook triggers",
      "Slack integration for notifications and status",
      "PostgreSQL for workflow state and audit logs",
      "Error handling with exponential backoff retry strategy",
      "Monitoring dashboard with real-time metrics"
    ],
    technicalDecisions: [
      "n8n for visual workflow design and no-code flexibility",
      "Slack as primary notification and status communication channel",
      "PostgreSQL for reliable workflow state management",
      "Custom function nodes for complex business logic",
      "Webhook-based triggers for real-time processing",
      "Scheduled workflows alongside event-driven processing"
    ],
    tradeoffs: [
      "Visual workflow design improves team productivity but complex logic remains challenging",
      "Slack integration adds real-time visibility but increases message volumes",
      "Webhook reliability depends on external service availability",
      "Centralized error handling provides consistency but requires careful monitoring"
    ],
    impact: "Reduced operational time by 70%. Eliminated manual data entry errors entirely. Enabled real-time team visibility into process status. Freed team for strategic initiatives. Improved customer data synchronization from 24h to real-time.",
    lessonsLearned: "Visual workflow tools excel for team collaboration but require clear documentation. Slack notifications are critical for team buy-in and issue resolution. Error handling and monitoring are more important than feature count. Regular workflow audits prevent technical debt accumulation."
  },
  {
    id: "slack-integration",
    title: "Slack API Integration Layer",
    description: "Real-time team communication platform with bidirectional Slack API integration, custom bot workflows, and workflow automation triggers.",
    role: "Integration Engineer",
    highlights: [
      "Bidirectional Slack API sync",
      "Custom bot command handling",
      "Real-time event streaming",
      "Comprehensive permission management"
    ],
    techStack: ["Slack API", "Node.js", "Express", "WebSockets", "Redis"],
    image: new URL("../components/images/n8n2.png", import.meta.url).href,
    video: slackVideo,
    overview: "Developed a comprehensive Slack integration layer that handles real-time team communication, custom bot interactions, and workflow automation triggers. Enables seamless bidirectional data synchronization with internal systems.",
    problem: "Team communication was fragmented across multiple tools. Critical alerts and updates were missed. Workflow triggers needed to be executed from Slack without complex manual intervention. Integration was brittle and difficult to maintain.",
    solution: "Built a robust integration layer using Slack's Real Time Messaging API and event subscriptions. Created custom bot commands for workflow triggering. Implemented WebSocket connections for real-time updates. Added comprehensive error handling and message queuing.",
    architecture: [
      "Slack RTM API for real-time message handling",
      "Event subscriptions for workflow triggers",
      "Custom slash commands for user interactions",
      "Redis for message queuing and delivery guarantees",
      "WebSocket connections for live updates",
      "Comprehensive permission validation layer"
    ],
    technicalDecisions: [
      "Node.js with Express for HTTP endpoints",
      "Slack RTM API for real-time messaging",
      "Redis for reliable message queue",
      "Custom middleware for permission and security",
      "Structured logging for debugging",
      "Exponential backoff for failed messages"
    ],
    tradeoffs: [
      "Real-time connections require persistent server resources",
      "Slack API rate limits require careful request management",
      "Complex permission rules slow down message processing",
      "Message ordering guarantees add complexity"
    ],
    impact: "Reduced alert response time from hours to seconds. Unified team communication in single platform. Enabled workflow automation without leaving Slack. Improved team collaboration efficiency by 45%. Reduced support ticket volume through self-service commands.",
    lessonsLearned: "Real-time APIs require robust error handling and monitoring. Message queuing is essential for reliability. Rate limiting must be built in from the start. User education on bot commands is as important as feature development."
  }
];
