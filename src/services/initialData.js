/**
 * Phantom Core Initial Seed Data
 * Pre-populated data for Shyam Sunder Sharma ("The Phantom")
 */

export const INITIAL_PROFILE = {
  name: "Shyam Sunder Sharma",
  callSign: "The Phantom",
  signature: "Engineered by The Phantom",
  headline: "Full-Stack Developer • AI & Systems Builder • CS Undergrad (UPTTI '28)",
  bio: "Engineering end-to-end web applications, developer tools, and autonomous local AI systems under the call sign The Phantom. Pursuing B.Tech in CSE at UPTTI Kanpur with a focus on robust distributed systems, low-latency pipelines, and intelligent agentic workflows.",
  aboutSummary: "Pursuing B.Tech in Computer Science & Engineering at Uttar Pradesh Textile Technology Institute (UPTTI), Kanpur (2024–2028). Active leader in the Startup Cell, focused on full-stack web architecture, system software, and AI agents. Achieved Top 2% Topper (80%) in Swayam NPTEL Database Management System.",
  location: "Kanpur, Uttar Pradesh, India",
  availabilityStatus: "Available for High-Impact Projects & Roles",
  isAvailable: true,
  contactEmail: "shyam.sunder.sharma.dev@gmail.com",
  resumeUrl: "https://drive.google.com/file/d/view?usp=sharing",
  socials: {
    github: "https://github.com/Shyam-Sunder-Sharma",
    linkedin: "https://www.linkedin.com/in/shyam-sunder-sharma-22488b371",
    leetcode: "https://leetcode.com/u/Shyam_Sunder_Sharma/",
    email: "mailto:shyam.sunder.sharma.dev@gmail.com"
  },
  statsFallback: {
    github: {
      public_repos: 6,
      followers: 2,
      following: 2,
      totalStars: 0,
      totalCommits: 412
    },
    leetcode: {
      totalSolved: 95,
      ranking: "#1,799,533",
      easySolved: 53,
      mediumSolved: 39,
      hardSolved: 3,
      acceptanceRate: "70.1%"
    }
  }
};

export const INITIAL_PROJECTS = [
  {
    id: "atom-flagship",
    title: "ATOM",
    subtitle: "Personal Local AI Assistant",
    description: "Personal Local AI Assistant engineered for private on-device execution, real-time web search, system hardware telemetry monitoring, and autonomous task execution. Built to operate without third-party cloud dependencies, featuring hands-free system commands and an intelligent contextual memory buffer.",
    tags: ["Python", "Local LLM", "Autonomous AI", "System Telemetry", "AsyncIO", "GGUF"],
    liveUrl: "",
    githubUrl: "https://github.com/Shyam-Sunder-Sharma/atom-ai-assistant",
    previewImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    isFlagship: true,
    engineeredByPhantom: true,
    isVisible: true,
    order: 1,
    features: [
      "100% Private On-Device LLM Inference",
      "Real-time Hardware Telemetry (CPU, GPU, RAM, Thermals)",
      "Autonomous Web Scraping & Multi-Source Search",
      "Low-Latency Execution & Intelligent Context Buffer"
    ]
  },
  {
    id: "papervault-uptti",
    title: "PaperVault",
    subtitle: "UPTTI Academic Question Paper & Resource Vault",
    description: "Full-stack academic platform for UPTTI students to browse, preview, download, and contribute previous-year question papers. Implements role-based access control, secure cloud document storage, and fast full-text search across branches and semesters.",
    tags: ["React", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "Supabase"],
    liveUrl: "https://papervault-uptti.vercel.app",
    githubUrl: "https://github.com/Shyam-Sunder-Sharma/papervault",
    previewImage: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
    isFlagship: false,
    engineeredByPhantom: true,
    isVisible: true,
    order: 2,
    features: [
      "Branch-wise and Semester-wise Categorized Papers",
      "High-speed PDF In-Browser Preview & Watermarking",
      "Crowdsourced Peer Paper Uploads with Admin Verification"
    ]
  },
  {
    id: "uniassist-ai",
    title: "UniAssist AI Agent",
    subtitle: "Autonomous Educational Copilot & Multi-Agent Assistant",
    description: "Agentic AI assistant built with IBM Orchestrate and custom datasets with a responsive web interface. Provides intelligent querying, academic scheduling, and campus navigation assistance with natural language processing.",
    tags: ["IBM Orchestrate", "Web Frontend", "Vercel", "Agentic Workflows", "Prompt Engineering"],
    liveUrl: "https://uni-assist-ai-agent.vercel.app",
    githubUrl: "https://github.com/Shyam-Sunder-Sharma/UniAssist-AI-Agent",
    previewImage: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80",
    isFlagship: false,
    engineeredByPhantom: true,
    isVisible: true,
    order: 3,
    features: [
      "Orchestrated Multi-Step Agent Workflows",
      "Knowledge Graph Retrieval on University Syllabi",
      "Fast Responsive UI Deployed to Vercel"
    ]
  },
  {
    id: "daddys-music",
    title: "Daddy's Music",
    subtitle: "Full-Stack Web Audio Streaming Platform",
    description: "Full-stack web music streaming platform powered by a Python Flask backend. Features audio wave streaming, playlist queue management, dynamic audio player controls, and responsive UI with low buffering latency.",
    tags: ["Python", "Flask", "HTML5", "CSS3", "JavaScript", "Audio API"],
    liveUrl: "https://daddy-s-music.onrender.com",
    githubUrl: "https://github.com/Shyam-Sunder-Sharma/Daddy-s-Music",
    previewImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    isFlagship: false,
    engineeredByPhantom: true,
    isVisible: true,
    order: 4,
    features: [
      "Custom Audio Player with Scrubbing & Equalizer FX",
      "Lightweight Python Flask REST API Backend",
      "Zero-latency Track Preloading & Storage"
    ]
  },
  {
    id: "skill-bridge",
    title: "Skill Bridge",
    subtitle: "Academia-Industry Collaboration & Placement Portal",
    description: "Centralized academia-industry collaboration portal for skill mapping, internship placement, and institutional analytics. Engineered for Smart India Hackathon to bridge the gap between student competencies and industry demands.",
    tags: ["Full-Stack Web", "React", "Node.js", "Analytics", "Role-Based Auth"],
    liveUrl: "",
    githubUrl: "https://github.com/Shyam-Sunder-Sharma/sih-academia-industry-portal",
    previewImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    isFlagship: false,
    engineeredByPhantom: true,
    isVisible: true,
    order: 5,
    features: [
      "Automated Industry Skill Gap Matrix Calculator",
      "Internship & Live Problem Statement Matching",
      "Admin Analytics Dashboard for Educational Institutions"
    ]
  }
];

export const INITIAL_SKILLS = [
  {
    id: "languages",
    category: "Languages",
    iconName: "Code",
    items: [
      { name: "Java", level: "Advanced", proficiency: 90 },
      { name: "Python", level: "Advanced", proficiency: 92 },
      { name: "C++", level: "Proficient", proficiency: 85 },
      { name: "C", level: "Proficient", proficiency: 82 },
      { name: "JavaScript", level: "Advanced", proficiency: 88 },
      { name: "SQL", level: "Advanced (Topper 80%)", proficiency: 90 }
    ]
  },
  {
    id: "frontend",
    category: "Frontend",
    iconName: "Layout",
    items: [
      { name: "React", level: "Advanced", proficiency: 90 },
      { name: "Next.js", level: "Intermediate", proficiency: 80 },
      { name: "Tailwind CSS", level: "Expert", proficiency: 94 },
      { name: "HTML5", level: "Expert", proficiency: 95 },
      { name: "CSS3", level: "Advanced", proficiency: 92 }
    ]
  },
  {
    id: "backend-db",
    category: "Backend & Databases",
    iconName: "Server",
    items: [
      { name: "Node.js", level: "Proficient", proficiency: 86 },
      { name: "Express.js", level: "Proficient", proficiency: 85 },
      { name: "Flask", level: "Proficient", proficiency: 84 },
      { name: "PostgreSQL", level: "Advanced", proficiency: 88 },
      { name: "Supabase", level: "Advanced", proficiency: 90 }
    ]
  },
  {
    id: "tools-ai",
    category: "Tools & AI",
    iconName: "Cpu",
    items: [
      { name: "Git", level: "Advanced", proficiency: 90 },
      { name: "GitHub", level: "Advanced", proficiency: 92 },
      { name: "IBM Orchestrate", level: "Proficient", proficiency: 85 },
      { name: "Sanity CMS", level: "Intermediate", proficiency: 80 },
      { name: "VS Code", level: "Expert", proficiency: 95 }
    ]
  }
];

export const INITIAL_TIMELINE = [
  {
    id: "timeline-1",
    role: "Software Engineering Virtual Intern",
    organization: "IBM SkillsBuild & Edunet Foundation",
    period: "June 2026 – July 2026",
    type: "Internship",
    description: "Engaged in hands-on enterprise software engineering simulations, cloud infrastructure deployment, and autonomous agent orchestration pipelines with IBM technologies.",
    highlights: ["Enterprise Cloud Workflows", "Autonomous AI Agents", "Agile Software Lifecycle"],
    order: 1
  },
  {
    id: "timeline-2",
    role: "B.Tech in Computer Science & Engineering",
    organization: "Uttar Pradesh Textile Technology Institute (UPTTI), Kanpur",
    period: "2024 – 2028",
    type: "Education",
    description: "Focusing on core computer science foundations: Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Architecture, and Distributed Systems. Active student leader in the Startup Cell.",
    highlights: ["Startup Cell Coordinator", "DBMS Elite Topper (Top 2%)", "Core CS Foundations"],
    order: 2
  },
  {
    id: "timeline-3",
    role: "Class XII (86.6%) & Class X (88.4%)",
    organization: "Kendriya Vidyalaya, Kanpur",
    period: "2021 – 2023",
    type: "Education",
    description: "Completed Senior Secondary and Secondary education with distinction in Science and Mathematics, building strong analytical and problem-solving fundamentals.",
    highlights: ["Distinction in Science & Math", "Academic Excellence Award"],
    order: 3
  }
];

export const INITIAL_CERTIFICATIONS = [
  {
    id: "cert-dbms",
    title: "Database Management System",
    issuer: "Swayam NPTEL",
    badge: "Top 2% Elite Topper (80%)",
    category: "Development",
    credentialUrl: "https://nptel.ac.in",
    issueDate: "2025",
    description: "Comprehensive certification covering relational algebra, advanced SQL, normalization, concurrency control, and index architecture."
  },
  {
    id: "cert-deloitte",
    title: "Technology Job Simulation",
    issuer: "Deloitte",
    badge: "Completed with Distinction",
    category: "Development",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com",
    issueDate: "2025",
    description: "Practical virtual experience solving enterprise coding problems, architectural reviews, and client technology implementations."
  },
  {
    id: "cert-codealpha",
    title: "Java Programming Internship",
    issuer: "Code Alpha",
    badge: "Certified Intern",
    category: "Development",
    credentialUrl: "https://codealpha.tech",
    issueDate: "2025",
    description: "Implemented complex object-oriented systems, algorithmic problem sets, and interactive desktop/server utilities in modern Java."
  },
  {
    id: "cert-ibm-ai",
    title: "Getting Started with Artificial Intelligence",
    issuer: "IBM",
    badge: "IBM Verified Credential",
    category: "AI & Cloud",
    credentialUrl: "https://www.credly.com",
    issueDate: "2025",
    description: "Foundational mastery in neural networks, natural language processing, LLM architectures, and machine learning models."
  },
  {
    id: "cert-ibm-cloud",
    title: "Journey to Cloud",
    issuer: "IBM",
    badge: "IBM Verified Credential",
    category: "AI & Cloud",
    credentialUrl: "https://www.credly.com",
    issueDate: "2025",
    description: "Architecture paradigms for hybrid cloud, microservices, containerization, and enterprise cloud migration strategies."
  },
  {
    id: "cert-ibm-cyber",
    title: "Getting Started with Cybersecurity",
    issuer: "IBM",
    badge: "IBM Verified Credential",
    category: "Cybersecurity",
    credentialUrl: "https://www.credly.com",
    issueDate: "2025",
    description: "Core tenets of network defense, threat modeling, cryptography basics, and identity & access management (IAM)."
  }
];
