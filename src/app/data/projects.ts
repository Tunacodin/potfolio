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
    id: "parking-system",
    title: "Intelligent Parking System",
    description: "A comprehensive parking automation system with real-time license plate recognition using React Native, React.js, Python, and PostgreSQL for efficient lot management.",
    role: "Full Stack Developer",
    highlights: [
      "Real-time license plate recognition with Python",
      "Mobile app for users and web dashboard for admins",
      "Automated entry/exit processing",
      "Comprehensive database design"
    ],
    techStack: ["React Native", "React.js", "Python", "PostgreSQL", "REST API"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    overview: "Developed an intelligent parking system automating operations through image processing and real-time data synchronization. Features mobile app for users and web dashboard for administrators.",
    problem: "Manual parking operations were time-consuming and error-prone. Lot tracking and payment processing required significant operational overhead.",
    solution: "Built full-stack solution with React Native for mobile, React.js for admin dashboard, and Python for image recognition with license plate detection and automated payment.",
    architecture: [
      "React Native mobile app for user access",
      "React.js administrative dashboard",
      "Python backend with OpenCV for image recognition",
      "PostgreSQL for reliable data management",
      "REST APIs for mobile-to-backend communication"
    ],
    technicalDecisions: [
      "React Native for cross-platform development",
      "Python with OpenCV for license plate recognition",
      "PostgreSQL for structured parking data",
      "JWT authentication for security"
    ],
    tradeoffs: [
      "OpenCV requires GPU acceleration for performance",
      "React Native has limitations with camera on older devices",
      "Real-time processing adds server load"
    ],
    impact: "Reduced parking operations time by 90%. Eliminated manual entry errors. Enabled real-time lot occupancy tracking. Improved customer satisfaction through faster processing.",
    lessonsLearned: "Image processing libraries need careful optimization. Real-time systems require robust error handling. User feedback is critical for mobile app acceptance."
  },
  {
    id: "izmir-eventy",
    title: "Izmir Eventy - Event Discovery App",
    description: "React Native event discovery application using Izmir Open Source API for real-time event aggregation, user authentication with Firebase, and personalized recommendations.",
    role: "Mobile Developer",
    highlights: [
      "Real-time event data from Izmir Open Source API",
      "Firebase authentication and data persistence",
      "Personalized event recommendations",
      "Interactive event calendar and filtering"
    ],
    techStack: ["React Native", "Expo", "Firebase", "Izmir API", "Redux"],
    image: "https://images.unsplash.com/photo-1540575467063-178f50002991?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    overview: "Created a mobile application that aggregates events from Izmir Open Source API, providing users with personalized event discovery and filtering capabilities.",
    problem: "Event seekers struggled to find and track events across multiple platforms in Izmir. No unified event discovery platform existed for the region.",
    solution: "Built React Native app consuming Izmir Open Source API for real-time event data. Implemented Firebase for authentication and real-time data persistence. Added recommendation engine based on user preferences.",
    architecture: [
      "React Native with Expo for development",
      "Firebase Authentication for user management",
      "Firestore for real-time data sync",
      "Redux for state management",
      "Izmir Open Source API integration"
    ],
    technicalDecisions: [
      "Firebase for rapid development and scalability",
      "Expo for faster development without Xcode dependencies",
      "Redux for complex state management",
      "Real-time database for live updates"
    ],
    tradeoffs: [
      "Firebase adds dependency on external service",
      "Expo has limitations with certain native modules",
      "API rate limiting from Izmir Open Source"
    ],
    impact: "500+ registered users. 80% daily event discovery rate. Average session time: 8 minutes. Connected users to 200+ events monthly.",
    lessonsLearned: "External APIs require rate limiting strategies. Firebase provides excellent developer experience but verify cost at scale. User engagement depends on content freshness and personalization."
  },
  {
    id: "apartment-management",
    title: "Apartment Management System",
    description: "React Native (Expo) and .NET Core application for multi-tenant property management with tenant-landlord communication, automated payment tracking, and maintenance requests.",
    role: "Full Stack Developer",
    highlights: [
      "Tenant-landlord communication platform",
      "Automated payment tracking and invoicing",
      "Maintenance request management",
      "Real-time expense dashboard"
    ],
    techStack: ["React Native", "Expo", ".NET Core", "MS SQL Server", "SignalR"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    overview: "Developed comprehensive apartment management system connecting tenants with landlords. Features include automated billing, maintenance tracking, and real-time communication.",
    problem: "Property managers struggled with manual tenant communication, payment tracking, and maintenance coordination. System needed to work for both mobile tenants and desktop landlords.",
    solution: "Built React Native app for tenants (mobile-first) and .NET Core backend with SignalR for real-time updates. Integrated automated payment reminders and maintenance request tracking.",
    architecture: [
      "React Native (Expo) frontend for tenant app",
      ".NET Core backend with clean architecture layers",
      "MS SQL Server for relational data integrity",
      "SignalR for real-time notifications",
      "RESTful APIs with token-based authentication"
    ],
    technicalDecisions: [
      "React Native for tenant mobile accessibility",
      ".NET Core for robust backend with strong typing",
      "MS SQL Server for complex business rules",
      "SignalR for instant tenant-landlord notifications",
      "Entity Framework for data access abstraction"
    ],
    tradeoffs: [
      "Mobile UI simplicity vs. desktop feature parity",
      "Real-time updates vs. server scalability",
      ".NET hosting costs vs. feature richness"
    ],
    impact: "Improved tenant-landlord communication 80%. Automated payment tracking reduced manual work 90%. Reduced maintenance response time from 48h to 2h. Enabled multi-property management from single dashboard.",
    lessonsLearned: "Enterprise apps need robust error handling. Real-time systems require comprehensive logging. Authentication is critical from day one. Data integrity non-negotiable in financial systems."
  }
];
