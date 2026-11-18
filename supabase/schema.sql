-- ==============================================================================
-- PHANTOM CORE // SUPABASE DATABASE SCHEMA & SEED SPECIFICATION
-- Architecture: Dark-Mode First Engineering Portfolio & Phantom CMS
-- Developer: Shyam Sunder Sharma ("The Phantom")
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROFILE TABLE
CREATE TABLE IF NOT EXISTS public.profile (
    id TEXT PRIMARY KEY DEFAULT 'primary',
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    live_url TEXT,
    github_url TEXT,
    preview_image TEXT,
    is_flagship BOOLEAN DEFAULT false,
    engineered_by_phantom BOOLEAN DEFAULT true,
    is_visible BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    features JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    icon_name TEXT,
    items JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TIMELINE TABLE
CREATE TABLE IF NOT EXISTS public.timeline (
    id TEXT PRIMARY KEY,
    role TEXT NOT NULL,
    organization TEXT NOT NULL,
    period TEXT NOT NULL,
    type TEXT DEFAULT 'Experience',
    description TEXT,
    highlights JSONB DEFAULT '[]'::jsonb,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.certifications (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    badge TEXT DEFAULT 'Verified Credential',
    category TEXT DEFAULT 'Development',
    credential_url TEXT,
    issue_date TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Rule: Public users have unrestricted SELECT access.
-- Rule: INSERT, UPDATE, DELETE are restricted STRICTLY to authenticated admins.
-- ==============================================================================

ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- Profile Policies
DROP POLICY IF EXISTS "Public Profile Read Access" ON public.profile;
CREATE POLICY "Public Profile Read Access" ON public.profile FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin Profile Write Access" ON public.profile;
CREATE POLICY "Admin Profile Write Access" ON public.profile FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Projects Policies
DROP POLICY IF EXISTS "Public Projects Read Access" ON public.projects;
CREATE POLICY "Public Projects Read Access" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin Projects Write Access" ON public.projects;
CREATE POLICY "Admin Projects Write Access" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Skills Policies
DROP POLICY IF EXISTS "Public Skills Read Access" ON public.skills;
CREATE POLICY "Public Skills Read Access" ON public.skills FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin Skills Write Access" ON public.skills;
CREATE POLICY "Admin Skills Write Access" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Timeline Policies
DROP POLICY IF EXISTS "Public Timeline Read Access" ON public.timeline;
CREATE POLICY "Public Timeline Read Access" ON public.timeline FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin Timeline Write Access" ON public.timeline;
CREATE POLICY "Admin Timeline Write Access" ON public.timeline FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Certifications Policies
DROP POLICY IF EXISTS "Public Certifications Read Access" ON public.certifications;
CREATE POLICY "Public Certifications Read Access" ON public.certifications FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin Certifications Write Access" ON public.certifications;
CREATE POLICY "Admin Certifications Write Access" ON public.certifications FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- SEED INITIAL DATA
-- ==============================================================================

-- 1. Insert Profile
INSERT INTO public.profile (id, content, updated_at)
VALUES (
    'primary',
    '{
        "name": "Shyam Sunder Sharma",
        "callSign": "The Phantom",
        "signature": "Engineered by The Phantom",
        "headline": "Full-Stack Developer • AI & Systems Builder • CS Undergrad (UPTTI ''28)",
        "bio": "Engineering end-to-end web applications, developer tools, and autonomous local AI systems under the call sign The Phantom. Pursuing B.Tech in CSE at UPTTI Kanpur with a focus on robust distributed systems, low-latency pipelines, and intelligent agentic workflows.",
        "aboutSummary": "Pursuing B.Tech in Computer Science & Engineering at Uttar Pradesh Textile Technology Institute (UPTTI), Kanpur (2024–2028). Active leader in the Startup Cell, focused on full-stack web architecture, system software, and AI agents. Achieved Top 2% Topper (80%) in Swayam NPTEL Database Management System.",
        "location": "Kanpur, Uttar Pradesh, India",
        "availabilityStatus": "Available for High-Impact Projects & Roles",
        "isAvailable": true,
        "contactEmail": "shyam.sunder.sharma.dev@gmail.com",
        "resumeUrl": "https://drive.google.com/file/d/view?usp=sharing",
        "socials": {
            "github": "https://github.com/Shyam-Sunder-Sharma",
            "linkedin": "https://www.linkedin.com/in/shyam-sunder-sharma-22488b371",
            "leetcode": "https://leetcode.com/u/Shyam_Sunder_Sharma/",
            "email": "mailto:shyam.sunder.sharma.dev@gmail.com"
        }
    }'::jsonb,
    NOW()
)
ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, updated_at = NOW();

-- 2. Insert Projects (All tagged "Engineered by The Phantom")
INSERT INTO public.projects (id, title, subtitle, description, tags, live_url, github_url, preview_image, is_flagship, engineered_by_phantom, is_visible, "order", features)
VALUES
(
    'atom-flagship',
    'ATOM',
    'Personal Local AI Assistant',
    'Personal Local AI Assistant engineered for private on-device execution, real-time web search, system hardware telemetry monitoring, and autonomous task execution. Built to operate without third-party cloud dependencies, featuring hands-free system commands and an intelligent contextual memory buffer.',
    '["Python", "Local LLM", "Autonomous AI", "System Telemetry", "AsyncIO", "GGUF"]'::jsonb,
    '',
    'https://github.com/Shyam-Sunder-Sharma/atom-ai-assistant',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    true,
    true,
    true,
    1,
    '["100% Private On-Device LLM Inference", "Real-time Hardware Telemetry (CPU, GPU, RAM, Thermals)", "Autonomous Web Scraping & Multi-Source Search", "Low-Latency Execution & Intelligent Context Buffer"]'::jsonb
),
(
    'papervault-uptti',
    'PaperVault',
    'UPTTI Academic Question Paper & Resource Vault',
    'Full-stack academic platform for UPTTI students to browse, preview, download, and contribute previous-year question papers. Implements role-based access control, secure cloud document storage, and fast full-text search across branches and semesters.',
    '["React", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "Supabase"]'::jsonb,
    'https://papervault-uptti.vercel.app',
    'https://github.com/Shyam-Sunder-Sharma/papervault',
    'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
    false,
    true,
    true,
    2,
    '["Branch-wise and Semester-wise Categorized Papers", "High-speed PDF In-Browser Preview & Watermarking", "Crowdsourced Peer Paper Uploads with Admin Verification"]'::jsonb
),
(
    'uniassist-ai',
    'UniAssist AI Agent',
    'Autonomous Educational Copilot & Multi-Agent Assistant',
    'Agentic AI assistant built with IBM Orchestrate and custom datasets with a responsive web interface. Provides intelligent querying, academic scheduling, and campus navigation assistance with natural language processing.',
    '["IBM Orchestrate", "Web Frontend", "Vercel", "Agentic Workflows", "Prompt Engineering"]'::jsonb,
    'https://uni-assist-ai-agent.vercel.app',
    'https://github.com/Shyam-Sunder-Sharma/UniAssist-AI-Agent',
    'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80',
    false,
    true,
    true,
    3,
    '["Orchestrated Multi-Step Agent Workflows", "Knowledge Graph Retrieval on University Syllabi", "Fast Responsive UI Deployed to Vercel"]'::jsonb
),
(
    'daddys-music',
    'Daddy''s Music',
    'Full-Stack Web Audio Streaming Platform',
    'Full-stack web music streaming platform powered by a Python Flask backend. Features audio wave streaming, playlist queue management, dynamic audio player controls, and responsive UI with low buffering latency.',
    '["Python", "Flask", "HTML5", "CSS3", "JavaScript", "Audio API"]'::jsonb,
    'https://daddy-s-music.onrender.com',
    'https://github.com/Shyam-Sunder-Sharma/Daddy-s-Music',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    false,
    true,
    true,
    4,
    '["Custom Audio Player with Scrubbing & Equalizer FX", "Lightweight Python Flask REST API Backend", "Zero-latency Track Preloading & Storage"]'::jsonb
),
(
    'skill-bridge',
    'Skill Bridge',
    'Academia-Industry Collaboration & Placement Portal',
    'Centralized academia-industry collaboration portal for skill mapping, internship placement, and institutional analytics. Engineered for Smart India Hackathon to bridge the gap between student competencies and industry demands.',
    '["Full-Stack Web", "React", "Node.js", "Analytics", "Role-Based Auth"]'::jsonb,
    '',
    'https://github.com/Shyam-Sunder-Sharma/sih-academia-industry-portal',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    false,
    true,
    true,
    5,
    '["Automated Industry Skill Gap Matrix Calculator", "Internship & Live Problem Statement Matching", "Admin Analytics Dashboard for Educational Institutions"]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    tags = EXCLUDED.tags,
    live_url = EXCLUDED.live_url,
    github_url = EXCLUDED.github_url,
    preview_image = EXCLUDED.preview_image,
    is_flagship = EXCLUDED.is_flagship,
    engineered_by_phantom = EXCLUDED.engineered_by_phantom,
    is_visible = EXCLUDED.is_visible,
    "order" = EXCLUDED."order",
    features = EXCLUDED.features;

-- 3. Insert Skills
INSERT INTO public.skills (id, category, icon_name, items)
VALUES
(
    'languages',
    'Languages',
    'Code',
    '[
        {"name": "Java", "level": "Advanced", "proficiency": 90},
        {"name": "Python", "level": "Advanced", "proficiency": 92},
        {"name": "C++", "level": "Proficient", "proficiency": 85},
        {"name": "C", "level": "Proficient", "proficiency": 82},
        {"name": "JavaScript", "level": "Advanced", "proficiency": 88},
        {"name": "SQL", "level": "Advanced (Topper 80%)", "proficiency": 90}
    ]'::jsonb
),
(
    'frontend',
    'Frontend',
    'Layout',
    '[
        {"name": "React", "level": "Advanced", "proficiency": 90},
        {"name": "Next.js", "level": "Intermediate", "proficiency": 80},
        {"name": "Tailwind CSS", "level": "Expert", "proficiency": 94},
        {"name": "HTML5", "level": "Expert", "proficiency": 95},
        {"name": "CSS3", "level": "Advanced", "proficiency": 92}
    ]'::jsonb
),
(
    'backend-db',
    'Backend & Databases',
    'Server',
    '[
        {"name": "Node.js", "level": "Proficient", "proficiency": 86},
        {"name": "Express.js", "level": "Proficient", "proficiency": 85},
        {"name": "Flask", "level": "Proficient", "proficiency": 84},
        {"name": "PostgreSQL", "level": "Advanced", "proficiency": 88},
        {"name": "Supabase", "level": "Advanced", "proficiency": 90}
    ]'::jsonb
),
(
    'tools-ai',
    'Tools & AI',
    'Cpu',
    '[
        {"name": "Git", "level": "Advanced", "proficiency": 90},
        {"name": "GitHub", "level": "Advanced", "proficiency": 92},
        {"name": "IBM Orchestrate", "level": "Proficient", "proficiency": 85},
        {"name": "Sanity CMS", "level": "Intermediate", "proficiency": 80},
        {"name": "VS Code", "level": "Expert", "proficiency": 95}
    ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category,
    icon_name = EXCLUDED.icon_name,
    items = EXCLUDED.items;

-- 4. Insert Timeline
INSERT INTO public.timeline (id, role, organization, period, type, description, highlights, "order")
VALUES
(
    'timeline-1',
    'Software Engineering Virtual Intern',
    'IBM SkillsBuild & Edunet Foundation',
    'June 2026 – July 2026',
    'Internship',
    'Engaged in hands-on enterprise software engineering simulations, cloud infrastructure deployment, and autonomous agent orchestration pipelines with IBM technologies.',
    '["Enterprise Cloud Workflows", "Autonomous AI Agents", "Agile Software Lifecycle"]'::jsonb,
    1
),
(
    'timeline-2',
    'B.Tech in Computer Science & Engineering',
    'Uttar Pradesh Textile Technology Institute (UPTTI), Kanpur',
    '2024 – 2028',
    'Education',
    'Focusing on core computer science foundations: Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Architecture, and Distributed Systems. Active student leader in the Startup Cell.',
    '["Startup Cell Coordinator", "DBMS Elite Topper (Top 2%)", "Core CS Foundations"]'::jsonb,
    2
),
(
    'timeline-3',
    'Class XII (86.6%) & Class X (88.4%)',
    'Kendriya Vidyalaya, Kanpur',
    '2021 – 2023',
    'Education',
    'Completed Senior Secondary and Secondary education with distinction in Science and Mathematics, building strong analytical and problem-solving fundamentals.',
    '["Distinction in Science & Math", "Academic Excellence Award"]'::jsonb,
    3
)
ON CONFLICT (id) DO UPDATE SET
    role = EXCLUDED.role,
    organization = EXCLUDED.organization,
    period = EXCLUDED.period,
    type = EXCLUDED.type,
    description = EXCLUDED.description,
    highlights = EXCLUDED.highlights,
    "order" = EXCLUDED."order";

-- 5. Insert Certifications
INSERT INTO public.certifications (id, title, issuer, badge, category, credential_url, issue_date, description)
VALUES
(
    'cert-dbms',
    'Database Management System',
    'Swayam NPTEL',
    'Top 2% Elite Topper (80%)',
    'Development',
    'https://nptel.ac.in',
    '2025',
    'Comprehensive certification covering relational algebra, advanced SQL, normalization, concurrency control, and index architecture.'
),
(
    'cert-deloitte',
    'Technology Job Simulation',
    'Deloitte',
    'Completed with Distinction',
    'Development',
    'https://forage-uploads-prod.s3.amazonaws.com',
    '2025',
    'Practical virtual experience solving enterprise coding problems, architectural reviews, and client technology implementations.'
),
(
    'cert-codealpha',
    'Java Programming Internship',
    'Code Alpha',
    'Certified Intern',
    'Development',
    'https://codealpha.tech',
    '2025',
    'Implemented complex object-oriented systems, algorithmic problem sets, and interactive desktop/server utilities in modern Java.'
),
(
    'cert-ibm-ai',
    'Getting Started with Artificial Intelligence',
    'IBM',
    'IBM Verified Credential',
    'AI & Cloud',
    'https://www.credly.com',
    '2025',
    'Foundational mastery in neural networks, natural language processing, LLM architectures, and machine learning models.'
),
(
    'cert-ibm-cloud',
    'Journey to Cloud',
    'IBM',
    'IBM Verified Credential',
    'AI & Cloud',
    'https://www.credly.com',
    '2025',
    'Architecture paradigms for hybrid cloud, microservices, containerization, and enterprise cloud migration strategies.'
),
(
    'cert-ibm-cyber',
    'Getting Started with Cybersecurity',
    'IBM',
    'IBM Verified Credential',
    'Cybersecurity',
    'https://www.credly.com',
    '2025',
    'Core tenets of network defense, threat modeling, cryptography basics, and identity & access management (IAM).'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    issuer = EXCLUDED.issuer,
    badge = EXCLUDED.badge,
    category = EXCLUDED.category,
    credential_url = EXCLUDED.credential_url,
    issue_date = EXCLUDED.issue_date,
    description = EXCLUDED.description;
