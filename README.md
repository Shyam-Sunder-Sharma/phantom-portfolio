# Shyam Sunder Sharma — Portfolio & Self-Hosted Phantom CMS
> **"Engineered by The Phantom"**  
> *Full-Stack Developer • AI & Systems Builder • CS Undergrad (UPTTI '28)*

A high-performance, dark-mode-first engineering portfolio and self-hosted content management system (`/phantom-cms`) built with **React (Vite), Tailwind CSS, Lucide Icons, and Supabase / LocalStorage Dual Persistence Engine**.

---

## ⚡ Key Highlights & Architecture

- **Aesthetic:** Dark-mode-first obsidian engineering theme (`#090d16` primary background, `#111827` elevated cards, `1px solid rgba(255,255,255,0.08)` borders, cyan `#06b6d4` and emerald `#10b981` accents, with an active light-mode toggle).
- **Typography:** `Inter` for clean body typography and `JetBrains Mono` for telemetry pills, badges, and code snippets.
- **Flagship Project:** **ATOM** — Personal Local AI Assistant engineered for on-device private execution, real-time web search, and hardware telemetry monitoring.
- **Zero-Config Dual Persistence Engine (`src/services/cmsService.js`):**
  - **Local Storage Engine (Default):** Runs immediately out of the box with complete pre-populated seed data. Full CRUD in `/phantom-cms` persists in the browser and updates the live portfolio in real time.
  - **Supabase Cloud Engine (Production):** Activates automatically whenever `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are provided in `.env`.
- **Top-Right Phantom Emblem SVG:** Far top-right corner of the sticky navbar hosts the geometric Phantom Mask/Emblem (`aria-label="Phantom Core"`), linking directly to `/phantom-cms`.
- **Developer Telemetry:** Live GitHub API fetcher for `Shyam-Sunder-Sharma` (`https://api.github.com/users/Shyam-Sunder-Sharma`) and LeetCode problem-solving cards with graceful offline fallbacks.

---

## 🔑 Single-Admin Phantom Core CMS Credentials

Access the CMS at:  
👉 **`http://localhost:5173/phantom-cms`** or click the **Phantom Icon** in the top-right navbar.

| Parameter | Default Value | Configurable Env Variable |
|---|---|---|
| **Admin Identifier** | `phantom@shyam.dev` | `VITE_PHANTOM_ADMIN_ID` |
| **Passkey** | `phantom2026` | `VITE_PHANTOM_ADMIN_PASSWORD` |

*Session state is preserved across reloads. A "Logout & View Live Site" button provides a 1-click return to the public portfolio.*

---

## 📁 Repository Structure

```
├── public/
│   └── favicon.svg              # Sleek geometric Phantom Emblem SVG
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── BrandIcons.jsx       # Custom GitHub & LinkedIn SVG icons
│   │   ├── CertificationsSection.jsx # Accreditations & Top 2% NPTEL DBMS
│   │   ├── ContactSection.jsx   # Direct encrypted dispatch form + 1-click copy
│   │   ├── FlagshipAtom.jsx     # ATOM personal AI assistant showcase & architecture HUD
│   │   ├── Footer.jsx           # Obsidian footer with "Engineered by The Phantom"
│   │   ├── HeroSection.jsx      # Developer bio, live status pill, socials & telemetry
│   │   ├── Navbar.jsx           # Sticky nav, theme toggle, and top-right Phantom Icon
│   │   ├── PhantomIcon.jsx      # High-fidelity geometric mask SVG component
│   │   ├── ProjectsSection.jsx  # Filterable showcase with Phantom stamps
│   │   ├── SkillsSection.jsx    # Tech stack matrix with proficiency indicators
│   │   ├── StatsSection.jsx     # Live GitHub metrics & LeetCode telemetry
│   │   ├── TimelineSection.jsx  # Experience & Education milestones
│   │   └── Toast.jsx            # Toast notifications for CMS mutations
│   ├── context/
│   │   ├── CmsContext.jsx       # State management & instant mutation reactivity
│   │   └── ThemeContext.jsx     # Obsidian Dark & Light theme provider
│   ├── pages/
│   │   ├── HomePage.jsx         # Public Portfolio & Interactive Resume
│   │   └── CmsPage.jsx          # Restricted Admin Login & Visual CRUD CMS
│   ├── services/
│   │   ├── cmsService.js        # Zero-Config Dual Persistence Engine
│   │   ├── initialData.js       # Complete pre-populated seed data
│   │   └── supabaseClient.js   # Conditional Supabase client
│   ├── App.jsx                  # React Router architecture
│   ├── index.css                # Tailwind directives & scanline patterns
│   └── main.jsx
├── supabase/
│   └── schema.sql               # Ready-to-run tables, RLS policies & SQL seeds
├── .env.example                 # Template for environment configuration
├── vercel.json                  # SPA routing configuration for Vercel
├── package.json
└── tailwind.config.js           # Obsidian theme & JetBrains Mono typography
```

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Local Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Verification
```bash
npm run build
npm run preview
```

---

## 🗄️ Optional: Connecting Supabase (Cloud Production)

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase dashboard and run the entire script in [supabase/schema.sql](file:///c:/Users/shyam/OneDrive/Desktop/Portfolio/supabase/schema.sql).
3. In your `.env` file (or your deployment provider's environment variables), add:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```
4. Restart the dev server or re-deploy. The CMS will automatically switch to **Production Supabase Engine** mode!

---

## 🌐 Deploying to Vercel (1-Click Ready)

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Engineered by The Phantom"
   git remote add origin https://github.com/Shyam-Sunder-Sharma/Portfolio.git
   git push -u origin main
   ```
2. Import the repository in [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Root Directory: `./`.
5. Environment Variables (Optional): Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_PHANTOM_ADMIN_ID`, `VITE_PHANTOM_ADMIN_PASSWORD`.
6. Click **Deploy**. The included `vercel.json` ensures direct URL routing to `/phantom-cms` functions flawlessly.

---

*Designed & Engineered by The Phantom (Shyam Sunder Sharma).*
