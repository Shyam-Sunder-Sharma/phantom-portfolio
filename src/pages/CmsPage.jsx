import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCms } from '../context/CmsContext';
import * as cmsService from '../services/cmsService';
import PhantomIcon from '../components/PhantomIcon';
import Toast from '../components/Toast';
import {
  Lock,
  Terminal,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Download,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  Clock,
  Award,
  User,
  ExternalLink,
  ShieldAlert,
  X,
  FileText
} from 'lucide-react';

export const CmsPage = () => {
  const navigate = useNavigate();
  const {
    profile,
    projects,
    skills,
    timeline,
    certifications,
    storageMode,
    storageLabel,
    updateProfileData,
    saveProjectData,
    deleteProjectData,
    toggleProjectVisibility,
    reorderProjectData,
    saveSkillCategoryData,
    deleteSkillCategoryData,
    saveSkillItemData,
    deleteSkillItemData,
    saveTimelineItemData,
    deleteTimelineItemData,
    reorderTimelineData,
    saveCertificationData,
    deleteCertificationData,
    resetAllData,
    exportDataBackup,
    showToast
  } = useCms();

  // Auth State
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState('profile');

  // Confirmation Modal
  const [confirmModal, setConfirmModal] = useState({ open: false, title: '', action: null });

  // Tab 1: Profile form state
  const [profileForm, setProfileForm] = useState(profile);

  // Tab 2: Flagship ATOM form state
  const [flagshipForm, setFlagshipForm] = useState(null);

  // Tab 3: Project modal state
  const [projectModal, setProjectModal] = useState({ open: false, isEditing: false, data: null });

  // Tab 4: Skill category & item modal state
  const [categoryModal, setCategoryModal] = useState({ open: false, isEditing: false, data: null });
  const [skillItemModal, setSkillItemModal] = useState({ open: false, categoryId: null, data: null });

  // Tab 5: Timeline modal state
  const [timelineModal, setTimelineModal] = useState({ open: false, isEditing: false, data: null });

  // Tab 6: Certification modal state
  const [certModal, setCertModal] = useState({ open: false, isEditing: false, data: null });

  // Check auth session on load
  useEffect(() => {
    const session = cmsService.getAdminSession();
    if (session) {
      setIsAdmin(true);
    }
    setAuthLoading(false);
  }, []);

  // Sync profile form when profile changes
  useEffect(() => {
    if (profile) {
      setProfileForm(profile);
    }
  }, [profile]);

  // Sync flagship form when projects change
  useEffect(() => {
    const f = (projects || []).find(p => p.id === 'atom-flagship' || p.isFlagship) || (projects || [])[0];
    if (f) {
      setFlagshipForm({
        ...f,
        version: f.version || 'v2.4',
        tags: Array.isArray(f.tags) ? f.tags.join(', ') : (f.tags || ''),
        features: Array.isArray(f.features) && f.features.length >= 4 ? f.features : [
          "100% Private On-Device LLM Inference",
          "Real-time Hardware Telemetry (CPU, GPU, RAM, Thermals)",
          "Autonomous Web Scraping & Multi-Source Search",
          "Low-Latency Execution & Intelligent Context Buffer"
        ],
        cloneCmd: f.cloneCmd || "git clone https://github.com/Shyam-Sunder-Sharma/atom-ai-assistant.git",
        runCmd: f.runCmd || "python -m atom.core --local-inference --telemetry",
        specs: f.specs || {
          privacy: "100% Local / Zero Cloud",
          latency: "< 250ms Pipeline",
          hardware: "CPU, Thermals, RAM",
          orchestration: "AsyncIO Multi-Task"
        },
        pipelines: (f.pipelines && f.pipelines.length > 0) ? f.pipelines : [
          {
            stage: "01. QUERY DISPATCH",
            title: "Local Command Stream & Async Pipe",
            desc: "Instant command orchestration via asynchronous system pipes with zero outbound cloud latency.",
            badge: "Local Pipe"
          },
          {
            stage: "02. PRIVACY BUFFER",
            title: "Context Window & Tokenizer Engine",
            desc: "High-efficiency local tokenizer maintaining contextual memory buffers securely on device.",
            badge: "Air-Gapped"
          },
          {
            stage: "03. COGNITIVE REASONING",
            title: "On-Device Quantized LLM Core",
            desc: "Private local inference powering natural language reasoning, code synthesis, and task decisions.",
            badge: "Zero-Cloud"
          },
          {
            stage: "04. TELEMETRY & TOOLS",
            title: "System Hardware Daemon & Search Engine",
            desc: "Direct polling of CPU thermals, RAM heap, and autonomous multi-source real-time web retrieval.",
            badge: "Kernel Polling"
          }
        ]
      });
    }
  }, [projects]);

  const handleSaveFlagship = async () => {
    if (!flagshipForm) return;
    try {
      const toSave = {
        ...flagshipForm,
        id: flagshipForm.id || 'atom-flagship',
        isFlagship: true,
        tags: typeof flagshipForm.tags === 'string'
          ? flagshipForm.tags.split(',').map(s => s.trim()).filter(Boolean)
          : flagshipForm.tags
      };
      await saveProjectData(toSave);
      showToast('Flagship ATOM configurations saved successfully.');
    } catch (err) {
      showToast('Error saving flagship: ' + err.message, 'error');
    }
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSubmitting(true);

    try {
      await cmsService.loginAdmin(emailInput, passwordInput);
      setIsAdmin(true);
      showToast('Phantom Core Admin access granted.');
    } catch (err) {
      setLoginError(err.message || 'Access Denied: Invalid Credentials');
    } finally {
      setLoginSubmitting(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await cmsService.logoutAdmin();
    setIsAdmin(false);
    showToast('Signed out of Phantom Core.');
    navigate('/');
  };

  // Reset confirmation
  const triggerResetConfirm = () => {
    setConfirmModal({
      open: true,
      title: 'Reset to Default Blueprint Data?',
      message: 'This will reset all profile info, projects, skills, timeline, and certifications to the pre-populated seed data.',
      action: async () => {
        await resetAllData();
        setConfirmModal({ open: false, title: '', action: null });
      }
    });
  };

  // =========================================================================
  // RENDER: Loading or Login Screen
  // =========================================================================
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center font-mono text-cyan-400">
        <div className="flex flex-col items-center gap-3">
          <PhantomIcon className="w-12 h-12 animate-pulse" />
          <span>INITIALIZING PHANTOM CORE CMS...</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col items-center justify-center p-4 bg-grid-pattern relative">
        <div className="absolute top-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-md w-full bg-[#111827] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="p-3 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 mb-3 shadow-glow-cyan">
              <PhantomIcon className="w-10 h-10" glow={true} />
            </div>
            <div className="font-mono text-xs text-cyan-400 font-bold tracking-widest uppercase">
              PHANTOM CORE // RESTRICTED ACCESS
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              Single-Admin Gateway
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Identity verification required for content mutation.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-300 text-xs font-mono flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                ADMIN IDENTIFIER (EMAIL)
              </label>
              <input
                type="text"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="phantom@shyam.dev"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.1] text-white font-mono text-xs focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                ACCESS KEY (PASSWORD)
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.1] text-white font-mono text-xs focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
            >
              {loginSubmitting ? 'VERIFYING CREDENTIALS...' : 'AUTHENTICATE & ENTER'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
            >
              &larr; Return to Live Portfolio
            </Link>
          </div>
        </div>
        <Toast />
      </div>
    );
  }

  // =========================================================================
  // RENDER: Authenticated Phantom CMS Dashboard
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      
      {/* Top Admin Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#111827] border-b border-white/[0.08] px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <PhantomIcon className="w-7 h-7" glow={true} />
          <div>
            <div className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <span>PHANTOM CORE CMS</span>
              <span className="text-slate-500">•</span>
              <span className="text-[10px] text-emerald-400 font-normal">ROOT ACCESS</span>
            </div>
            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{storageLabel}</span>
            </div>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={exportDataBackup}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black text-slate-300 hover:text-white border border-white/[0.08] font-mono text-xs transition-colors"
            title="Download JSON Snapshot"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Export Backup</span>
          </button>

          <button
            onClick={triggerResetConfirm}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/40 text-rose-300 border border-rose-500/30 font-mono text-xs transition-colors"
            title="Reset to initial blueprint data"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Reset Blueprint</span>
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/50 text-cyan-300 hover:bg-cyan-900/50 border border-cyan-500/40 font-mono text-xs font-medium transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/50 text-red-300 border border-red-500/30 font-mono text-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main CMS Layout with Tabs */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#111827] border border-white/[0.08] overflow-x-auto mb-8">
          {[
            { id: 'profile', label: '1. Hero & Profile', icon: User },
            { id: 'flagship', label: '2. Flagship AI (ATOM)', icon: Cpu },
            { id: 'projects', label: '3. Projects Manager', icon: Layers },
            { id: 'skills', label: '4. Tech Stack & Skills', icon: Sparkles },
            { id: 'timeline', label: '5. Timeline & Career', icon: Clock },
            { id: 'certifications', label: '6. Certifications Vault', icon: Award }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =====================================================================
            TAB 1: HERO & PROFILE
        ===================================================================== */}
        {activeTab === 'profile' && (
          <div className="bg-[#111827] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-400" />
                  <span>Hero & Profile Configuration</span>
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Update primary developer identity, bio, social links, and availability badge.
                </p>
              </div>

              <button
                onClick={() => updateProfileData(profileForm)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold uppercase transition-all shadow-md shadow-cyan-500/20"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Developer Name
                </label>
                <input
                  type="text"
                  value={profileForm?.name || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Builder Call Sign / Alias
                </label>
                <input
                  type="text"
                  value={profileForm?.callSign || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, callSign: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={profileForm?.headline || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Bio / Philosophy
                </label>
                <textarea
                  rows={3}
                  value={profileForm?.bio || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  About Summary (Detailed)
                </label>
                <textarea
                  rows={3}
                  value={profileForm?.aboutSummary || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, aboutSummary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Availability Status Text
                </label>
                <input
                  type="text"
                  value={profileForm?.availabilityStatus || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, availabilityStatus: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  value={profileForm?.location || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Contact Email Address
                </label>
                <input
                  type="email"
                  value={profileForm?.contactEmail || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, contactEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  GitHub Profile URL
                </label>
                <input
                  type="text"
                  value={profileForm?.socials?.github || ''}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    socials: { ...profileForm.socials, github: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  LinkedIn Profile URL
                </label>
                <input
                  type="text"
                  value={profileForm?.socials?.linkedin || ''}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    socials: { ...profileForm.socials, linkedin: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  LeetCode Profile URL
                </label>
                <input
                  type="text"
                  value={profileForm?.socials?.leetcode || ''}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    socials: { ...profileForm.socials, leetcode: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: FLAGSHIP AI ASSISTANT (ATOM)
        ===================================================================== */}
        {activeTab === 'flagship' && flagshipForm && (
          <div className="bg-[#111827] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <span>Flagship AI System Configuration (ATOM)</span>
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Manage the core autonomous on-device AI assistant, hardware telemetry, architecture pipelines, and CLI commands.
                </p>
              </div>

              <button
                onClick={handleSaveFlagship}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:opacity-95 text-slate-950 font-mono text-xs font-bold uppercase transition-all shadow-md shadow-cyan-500/20"
              >
                <Save className="w-4 h-4" />
                <span>Save Flagship Settings</span>
              </button>
            </div>

            {/* Core Identity Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  System Name
                </label>
                <input
                  type="text"
                  value={flagshipForm.title || ''}
                  onChange={(e) => setFlagshipForm({ ...flagshipForm, title: e.target.value })}
                  placeholder="ATOM"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Version Tag
                </label>
                <input
                  type="text"
                  value={flagshipForm.version || 'v2.4'}
                  onChange={(e) => setFlagshipForm({ ...flagshipForm, version: e.target.value })}
                  placeholder="v2.4"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Subtitle / Role
                </label>
                <input
                  type="text"
                  value={flagshipForm.subtitle || ''}
                  onChange={(e) => setFlagshipForm({ ...flagshipForm, subtitle: e.target.value })}
                  placeholder="Personal Local AI Assistant"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  System Architectural Description
                </label>
                <textarea
                  rows={3}
                  value={flagshipForm.description || ''}
                  onChange={(e) => setFlagshipForm({ ...flagshipForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Engineered Subsystems / Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={flagshipForm.tags || ''}
                  onChange={(e) => setFlagshipForm({ ...flagshipForm, tags: e.target.value })}
                  placeholder="Python, Local LLM, Autonomous AI, System Telemetry, AsyncIO, GGUF"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  GitHub Repository URL
                </label>
                <input
                  type="text"
                  value={flagshipForm.githubUrl || ''}
                  onChange={(e) => setFlagshipForm({ ...flagshipForm, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Live Console URL (Optional)
                </label>
                <input
                  type="text"
                  value={flagshipForm.liveUrl || ''}
                  onChange={(e) => setFlagshipForm({ ...flagshipForm, liveUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center gap-6 pt-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                  <input
                    type="checkbox"
                    checked={Boolean(flagshipForm.engineeredByPhantom !== false)}
                    onChange={(e) => setFlagshipForm({ ...flagshipForm, engineeredByPhantom: e.target.checked })}
                    className="rounded bg-[#090d16] border-white/20 text-cyan-500 focus:ring-0"
                  />
                  <span className="text-emerald-300">"Engineered by The Phantom" Stamp</span>
                </label>
              </div>
            </div>

            {/* Terminal Commands */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3 font-mono text-xs">
              <div className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
                Terminal Deployment Instructions
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 text-[11px]">Git Clone Command</label>
                  <input
                    type="text"
                    value={flagshipForm.cloneCmd || ''}
                    onChange={(e) => setFlagshipForm({ ...flagshipForm, cloneCmd: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.08] text-cyan-300"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 text-[11px]">Python Run Command</label>
                  <input
                    type="text"
                    value={flagshipForm.runCmd || ''}
                    onChange={(e) => setFlagshipForm({ ...flagshipForm, runCmd: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.08] text-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3 font-mono text-xs">
              <div className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
                Key Specifications Matrix
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 text-[11px]">Privacy Model</label>
                  <input
                    type="text"
                    value={flagshipForm.specs?.privacy || ''}
                    onChange={(e) => setFlagshipForm({
                      ...flagshipForm,
                      specs: { ...(flagshipForm.specs || {}), privacy: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.08] text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 text-[11px]">Response Latency</label>
                  <input
                    type="text"
                    value={flagshipForm.specs?.latency || ''}
                    onChange={(e) => setFlagshipForm({
                      ...flagshipForm,
                      specs: { ...(flagshipForm.specs || {}), latency: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.08] text-cyan-300"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 text-[11px]">Hardware Monitored</label>
                  <input
                    type="text"
                    value={flagshipForm.specs?.hardware || ''}
                    onChange={(e) => setFlagshipForm({
                      ...flagshipForm,
                      specs: { ...(flagshipForm.specs || {}), hardware: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.08] text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 text-[11px]">Orchestration Engine</label>
                  <input
                    type="text"
                    value={flagshipForm.specs?.orchestration || ''}
                    onChange={(e) => setFlagshipForm({
                      ...flagshipForm,
                      specs: { ...(flagshipForm.specs || {}), orchestration: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.08] text-emerald-300"
                  />
                </div>
              </div>
            </div>

            {/* Architectural Pipeline Stages */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3 font-mono text-xs">
              <div className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
                4 Core Architectural Pipelines
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(flagshipForm.pipelines || []).map((pipe, pIdx) => (
                  <div key={pIdx} className="p-3.5 rounded-xl bg-[#111827] border border-white/[0.08] space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={pipe.stage || ''}
                        onChange={(e) => {
                          const updated = [...flagshipForm.pipelines];
                          updated[pIdx] = { ...updated[pIdx], stage: e.target.value };
                          setFlagshipForm({ ...flagshipForm, pipelines: updated });
                        }}
                        className="px-2 py-1 rounded bg-[#090d16] border border-white/[0.08] text-cyan-400 font-bold text-[10px]"
                      />
                      <input
                        type="text"
                        value={pipe.badge || ''}
                        onChange={(e) => {
                          const updated = [...flagshipForm.pipelines];
                          updated[pIdx] = { ...updated[pIdx], badge: e.target.value };
                          setFlagshipForm({ ...flagshipForm, pipelines: updated });
                        }}
                        className="px-2 py-1 rounded bg-[#090d16] border border-white/[0.08] text-emerald-400 text-[10px] w-24 text-right"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={pipe.title || ''}
                        onChange={(e) => {
                          const updated = [...flagshipForm.pipelines];
                          updated[pIdx] = { ...updated[pIdx], title: e.target.value };
                          setFlagshipForm({ ...flagshipForm, pipelines: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-[#090d16] border border-white/[0.08] text-white font-sans text-xs font-semibold"
                        placeholder="Pipeline Title"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={2}
                        value={pipe.desc || ''}
                        onChange={(e) => {
                          const updated = [...flagshipForm.pipelines];
                          updated[pIdx] = { ...updated[pIdx], desc: e.target.value };
                          setFlagshipForm({ ...flagshipForm, pipelines: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-[#090d16] border border-white/[0.08] text-slate-300 font-sans text-[11px]"
                        placeholder="Pipeline Description"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3 font-mono text-xs">
              <div className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
                Key Capability Highlights
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(flagshipForm.features || []).map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">{fIdx + 1}.</span>
                    <input
                      type="text"
                      value={feat || ''}
                      onChange={(e) => {
                        const updated = [...flagshipForm.features];
                        updated[fIdx] = e.target.value;
                        setFlagshipForm({ ...flagshipForm, features: updated });
                      }}
                      className="flex-1 px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.08] text-white text-xs font-sans"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 3: PROJECTS MANAGER
        ===================================================================== */}
        {activeTab === 'projects' && (
          <div className="bg-[#111827] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06] mb-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" />
                  <span>Projects & Architectures Manager</span>
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Add, edit, reorder, toggle visibility, and stamp projects with "Engineered by The Phantom".
                </p>
              </div>

              <button
                onClick={() => setProjectModal({
                  open: true,
                  isEditing: false,
                  data: {
                    id: '',
                    title: '',
                    subtitle: '',
                    description: '',
                    tags: '',
                    liveUrl: '',
                    githubUrl: '',
                    previewImage: '',
                    isFlagship: false,
                    engineeredByPhantom: true,
                    isVisible: true
                  }
                })}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold uppercase transition-all shadow-md shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Projects Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] text-slate-400">
                    <th className="pb-3 px-2">ORDER</th>
                    <th className="pb-3 px-3">TITLE & SUBTITLE</th>
                    <th className="pb-3 px-3">STATUS & BADGES</th>
                    <th className="pb-3 px-3">LINKS</th>
                    <th className="pb-3 px-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {(projects || []).map((proj, idx) => (
                    <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1 text-slate-400">
                          <span className="w-5 text-center font-bold text-white">{idx + 1}</span>
                          <div className="flex flex-col">
                            <button
                              disabled={idx === 0}
                              onClick={() => reorderProjectData(proj.id, 'up')}
                              className="p-0.5 text-slate-400 hover:text-cyan-400 disabled:opacity-20"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              disabled={idx === (projects || []).length - 1}
                              onClick={() => reorderProjectData(proj.id, 'down')}
                              className="p-0.5 text-slate-400 hover:text-cyan-400 disabled:opacity-20"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-bold text-white font-sans text-sm flex items-center gap-2">
                          <span>{proj.title}</span>
                          {proj.isFlagship && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                              FLAGSHIP
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-xs">
                          {proj.subtitle}
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1.5">
                          {proj.engineeredByPhantom && (
                            <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                              Phantom Stamp
                            </span>
                          )}
                          <span className={`px-2 py-0.5 rounded text-[9px] ${
                            proj.isVisible !== false
                              ? 'bg-emerald-950 text-emerald-400'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {proj.isVisible !== false ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          {proj.githubUrl && <span className="text-cyan-400">GitHub</span>}
                          {proj.liveUrl && <span className="text-emerald-400">Live</span>}
                        </div>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => toggleProjectVisibility(proj.id)}
                            className="p-1.5 rounded-lg bg-black/40 hover:bg-black text-slate-300 hover:text-cyan-400 border border-white/[0.06]"
                            title={proj.isVisible !== false ? "Hide Project" : "Show Project"}
                          >
                            {proj.isVisible !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
                          </button>

                          <button
                            onClick={() => setProjectModal({
                              open: true,
                              isEditing: true,
                              data: {
                                ...proj,
                                tags: Array.isArray(proj.tags) ? proj.tags.join(', ') : proj.tags
                              }
                            })}
                            className="p-1.5 rounded-lg bg-black/40 hover:bg-black text-slate-300 hover:text-cyan-400 border border-white/[0.06]"
                            title="Edit Project"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              setConfirmModal({
                                open: true,
                                title: `Delete "${proj.title}"?`,
                                message: 'Are you sure you want to delete this project? This action will remove it from the portfolio.',
                                action: async () => {
                                  await deleteProjectData(proj.id);
                                  setConfirmModal({ open: false, title: '', action: null });
                                }
                              });
                            }}
                            className="p-1.5 rounded-lg bg-black/40 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-white/[0.06]"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 3: TECH STACK & SKILLS
        ===================================================================== */}
        {activeTab === 'skills' && (
          <div className="bg-[#111827] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06] mb-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <span>Tech Stack & Skill Categories</span>
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Manage categories (Languages, Frontend, Backend & Databases, Tools & AI) and individual competencies.
                </p>
              </div>

              <button
                onClick={() => setCategoryModal({
                  open: true,
                  isEditing: false,
                  data: { id: '', category: '', iconName: 'Cpu', items: [] }
                })}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold uppercase transition-all shadow-md shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>New Skill Category</span>
              </button>
            </div>

            <div className="space-y-6">
              {(skills || []).map((cat) => (
                <div key={cat.id} className="rounded-xl bg-[#090d16] border border-white/[0.06] p-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.04] mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">{cat.category}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/20">
                        {(cat.items || []).length} Items
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSkillItemModal({
                          open: true,
                          categoryId: cat.id,
                          data: { name: '', level: 'Advanced', proficiency: 85 }
                        })}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono text-cyan-300"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Skill</span>
                      </button>

                      <button
                        onClick={() => {
                          setConfirmModal({
                            open: true,
                            title: `Delete Category "${cat.category}"?`,
                            message: 'This will remove the entire category and all skills contained inside it.',
                            action: async () => {
                              await deleteSkillCategoryData(cat.id);
                              setConfirmModal({ open: false, title: '', action: null });
                            }
                          });
                        }}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(cat.items || []).map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-[#111827] border border-white/[0.04] flex items-center justify-between font-mono text-xs"
                      >
                        <div>
                          <div className="text-white font-semibold">{item.name}</div>
                          <div className="text-[10px] text-cyan-400">{item.level || 'Proficient'}</div>
                        </div>

                        <button
                          onClick={() => deleteSkillItemData(cat.id, item.name)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                          title="Remove skill"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 4: TIMELINE & PROGRESSION
        ===================================================================== */}
        {activeTab === 'timeline' && (
          <div className="bg-[#111827] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06] mb-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <span>Timeline Milestones Manager</span>
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Add, edit, reorder, and document software engineering internships and academic milestones.
                </p>
              </div>

              <button
                onClick={() => setTimelineModal({
                  open: true,
                  isEditing: false,
                  data: {
                    id: '',
                    role: '',
                    organization: '',
                    period: '',
                    type: 'Internship',
                    description: '',
                    highlights: ''
                  }
                })}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold uppercase transition-all shadow-md shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Milestone</span>
              </button>
            </div>

            <div className="space-y-4">
              {(timeline || []).map((item, idx) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-[#090d16] border border-white/[0.06] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        {item.type}
                      </span>
                      <span className="text-slate-400">{item.period}</span>
                    </div>
                    <div className="text-base font-bold text-white font-sans">
                      {item.role}
                    </div>
                    <div className="text-xs text-cyan-400 font-mono">
                      {item.organization}
                    </div>
                    <p className="text-xs text-slate-300 max-w-2xl font-sans mt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center font-mono">
                    <button
                      disabled={idx === 0}
                      onClick={() => reorderTimelineData(item.id, 'up')}
                      className="p-1.5 rounded-lg bg-black/40 hover:bg-black text-slate-400 hover:text-cyan-400 disabled:opacity-20 border border-white/[0.06]"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === (timeline || []).length - 1}
                      onClick={() => reorderTimelineData(item.id, 'down')}
                      className="p-1.5 rounded-lg bg-black/40 hover:bg-black text-slate-400 hover:text-cyan-400 disabled:opacity-20 border border-white/[0.06]"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setTimelineModal({
                        open: true,
                        isEditing: true,
                        data: {
                          ...item,
                          highlights: Array.isArray(item.highlights) ? item.highlights.join(', ') : item.highlights
                        }
                      })}
                      className="p-1.5 rounded-lg bg-black/40 hover:bg-black text-slate-300 hover:text-cyan-400 border border-white/[0.06]"
                      title="Edit Milestone"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setConfirmModal({
                          open: true,
                          title: `Delete Milestone "${item.role}"?`,
                          message: 'Are you sure you want to delete this timeline milestone?',
                          action: async () => {
                            await deleteTimelineItemData(item.id);
                            setConfirmModal({ open: false, title: '', action: null });
                          }
                        });
                      }}
                      className="p-1.5 rounded-lg bg-black/40 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-white/[0.06]"
                      title="Delete Milestone"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 5: CERTIFICATIONS VAULT
        ===================================================================== */}
        {activeTab === 'certifications' && (
          <div className="bg-[#111827] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06] mb-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <span>Certifications & Credentials Vault</span>
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Manage accredited certifications (NPTEL DBMS Top 2%, IBM AI, Deloitte, etc.).
                </p>
              </div>

              <button
                onClick={() => setCertModal({
                  open: true,
                  isEditing: false,
                  data: {
                    id: '',
                    title: '',
                    issuer: '',
                    badge: 'Verified Credential',
                    category: 'Development',
                    credentialUrl: '',
                    issueDate: '2025',
                    description: ''
                  }
                })}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold uppercase transition-all shadow-md shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certification</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(certifications || []).map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-xl bg-[#090d16] border border-white/[0.06] p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-white/[0.04] text-slate-300">
                        {cert.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                        {cert.badge}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-base">{cert.title}</h3>
                    <div className="text-xs font-mono text-cyan-400 mt-0.5">
                      {cert.issuer} {cert.issueDate ? `• ${cert.issueDate}` : ''}
                    </div>

                    {cert.description && (
                      <p className="text-xs text-slate-400 mt-2 font-sans line-clamp-2">
                        {cert.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between font-mono text-xs">
                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px]"
                      >
                        <span>Verify Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-600">No URL</span>
                    )}

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setCertModal({
                          open: true,
                          isEditing: true,
                          data: cert
                        })}
                        className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setConfirmModal({
                            open: true,
                            title: `Delete "${cert.title}"?`,
                            message: 'Are you sure you want to delete this credential?',
                            action: async () => {
                              await deleteCertificationData(cert.id);
                              setConfirmModal({ open: false, title: '', action: null });
                            }
                          });
                        }}
                        className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* =====================================================================
          MODAL: PROJECT ADD / EDIT
      ===================================================================== */}
      {projectModal.open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#111827] border border-cyan-500/30 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <PhantomIcon className="w-5 h-5" />
                <span>{projectModal.isEditing ? 'EDIT PROJECT' : 'NEW PROJECT ARCHITECTURE'}</span>
              </h3>
              <button
                onClick={() => setProjectModal({ open: false, isEditing: false, data: null })}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveProjectData(projectModal.data);
                setProjectModal({ open: false, isEditing: false, data: null });
              }}
              className="space-y-4 font-mono text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={projectModal.data?.title || ''}
                    onChange={(e) => setProjectModal({
                      ...projectModal,
                      data: { ...projectModal.data, title: e.target.value }
                    })}
                    placeholder="e.g. ATOM"
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Subtitle / Callout</label>
                  <input
                    type="text"
                    value={projectModal.data?.subtitle || ''}
                    onChange={(e) => setProjectModal({
                      ...projectModal,
                      data: { ...projectModal.data, subtitle: e.target.value }
                    })}
                    placeholder="e.g. Personal Local AI Assistant"
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={projectModal.data?.description || ''}
                  onChange={(e) => setProjectModal({
                    ...projectModal,
                    data: { ...projectModal.data, description: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Tech Stack Tags (comma-separated)</label>
                <input
                  type="text"
                  value={projectModal.data?.tags || ''}
                  onChange={(e) => setProjectModal({
                    ...projectModal,
                    data: { ...projectModal.data, tags: e.target.value }
                  })}
                  placeholder="Python, Local LLM, Speech Recognition, Telemetry"
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">GitHub Repo URL</label>
                  <input
                    type="text"
                    value={projectModal.data?.githubUrl || ''}
                    onChange={(e) => setProjectModal({
                      ...projectModal,
                      data: { ...projectModal.data, githubUrl: e.target.value }
                    })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Live Demo URL</label>
                  <input
                    type="text"
                    value={projectModal.data?.liveUrl || ''}
                    onChange={(e) => setProjectModal({
                      ...projectModal,
                      data: { ...projectModal.data, liveUrl: e.target.value }
                    })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Preview Image URL</label>
                <input
                  type="text"
                  value={projectModal.data?.previewImage || ''}
                  onChange={(e) => setProjectModal({
                    ...projectModal,
                    data: { ...projectModal.data, previewImage: e.target.value }
                  })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                />
              </div>

              {/* Toggles */}
              <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(projectModal.data?.isFlagship)}
                    onChange={(e) => setProjectModal({
                      ...projectModal,
                      data: { ...projectModal.data, isFlagship: e.target.checked }
                    })}
                    className="rounded bg-[#090d16] border-white/20 text-cyan-500 focus:ring-0"
                  />
                  <span className="text-cyan-300">Flagship Spotlight Banner (ATOM)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(projectModal.data?.engineeredByPhantom !== false)}
                    onChange={(e) => setProjectModal({
                      ...projectModal,
                      data: { ...projectModal.data, engineeredByPhantom: e.target.checked }
                    })}
                    className="rounded bg-[#090d16] border-white/20 text-cyan-500 focus:ring-0"
                  />
                  <span className="text-emerald-300">"Engineered by The Phantom" Stamp</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProjectModal({ open: false, isEditing: false, data: null })}
                  className="px-4 py-2 rounded-lg bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: SKILL CATEGORY ADD
      ===================================================================== */}
      {categoryModal.open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#111827] border border-cyan-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white font-mono">
              ADD NEW SKILL CATEGORY
            </h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveSkillCategoryData(categoryModal.data);
                setCategoryModal({ open: false, isEditing: false, data: null });
              }}
              className="space-y-4 font-mono text-xs"
            >
              <div>
                <label className="block text-slate-300 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={categoryModal.data?.category || ''}
                  onChange={(e) => setCategoryModal({
                    ...categoryModal,
                    data: { ...categoryModal.data, category: e.target.value }
                  })}
                  placeholder="e.g. Distributed Systems & Cloud"
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCategoryModal({ open: false, isEditing: false, data: null })}
                  className="px-4 py-2 rounded-lg bg-white/[0.04] text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: SKILL ITEM ADD
      ===================================================================== */}
      {skillItemModal.open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#111827] border border-cyan-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white font-mono">
              ADD SKILL ITEM
            </h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveSkillItemData(skillItemModal.categoryId, skillItemModal.data);
                setSkillItemModal({ open: false, categoryId: null, data: null });
              }}
              className="space-y-4 font-mono text-xs"
            >
              <div>
                <label className="block text-slate-300 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={skillItemModal.data?.name || ''}
                  onChange={(e) => setSkillItemModal({
                    ...skillItemModal,
                    data: { ...skillItemModal.data, name: e.target.value }
                  })}
                  placeholder="e.g. Rust / Docker / PyTorch"
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Proficiency Level Label (e.g. Advanced / Expert / Proficient)</label>
                <input
                  type="text"
                  value={skillItemModal.data?.level || ''}
                  onChange={(e) => setSkillItemModal({
                    ...skillItemModal,
                    data: { ...skillItemModal.data, level: e.target.value }
                  })}
                  placeholder="Advanced / Expert / Proficient"
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSkillItemModal({ open: false, categoryId: null, data: null })}
                  className="px-4 py-2 rounded-lg bg-white/[0.04] text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: TIMELINE ADD / EDIT
      ===================================================================== */}
      {timelineModal.open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#111827] border border-cyan-500/30 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 my-8">
            <h3 className="text-base font-bold text-white font-mono">
              {timelineModal.isEditing ? 'EDIT TIMELINE MILESTONE' : 'NEW TIMELINE MILESTONE'}
            </h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveTimelineItemData(timelineModal.data);
                setTimelineModal({ open: false, isEditing: false, data: null });
              }}
              className="space-y-4 font-mono text-xs"
            >
              <div>
                <label className="block text-slate-300 mb-1">Role / Degree Title *</label>
                <input
                  type="text"
                  required
                  value={timelineModal.data?.role || ''}
                  onChange={(e) => setTimelineModal({
                    ...timelineModal,
                    data: { ...timelineModal.data, role: e.target.value }
                  })}
                  placeholder="e.g. Software Engineering Virtual Intern"
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Organization / Institute *</label>
                  <input
                    type="text"
                    required
                    value={timelineModal.data?.organization || ''}
                    onChange={(e) => setTimelineModal({
                      ...timelineModal,
                      data: { ...timelineModal.data, organization: e.target.value }
                    })}
                    placeholder="IBM SkillsBuild & Edunet"
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Period (e.g. 2024 – 2028) *</label>
                  <input
                    type="text"
                    required
                    value={timelineModal.data?.period || ''}
                    onChange={(e) => setTimelineModal({
                      ...timelineModal,
                      data: { ...timelineModal.data, period: e.target.value }
                    })}
                    placeholder="June 2026 – July 2026"
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Type (Internship / Education / Role)</label>
                <input
                  type="text"
                  value={timelineModal.data?.type || 'Internship'}
                  onChange={(e) => setTimelineModal({
                    ...timelineModal,
                    data: { ...timelineModal.data, type: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={timelineModal.data?.description || ''}
                  onChange={(e) => setTimelineModal({
                    ...timelineModal,
                    data: { ...timelineModal.data, description: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Highlights (comma-separated)</label>
                <input
                  type="text"
                  value={timelineModal.data?.highlights || ''}
                  onChange={(e) => setTimelineModal({
                    ...timelineModal,
                    data: { ...timelineModal.data, highlights: e.target.value }
                  })}
                  placeholder="Enterprise Workflows, Autonomous AI Agents, Agile"
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTimelineModal({ open: false, isEditing: false, data: null })}
                  className="px-4 py-2 rounded-lg bg-white/[0.04] text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: CERTIFICATION ADD / EDIT
      ===================================================================== */}
      {certModal.open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#111827] border border-cyan-500/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 my-8">
            <h3 className="text-base font-bold text-white font-mono">
              {certModal.isEditing ? 'EDIT CERTIFICATION' : 'NEW CERTIFICATION'}
            </h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveCertificationData(certModal.data);
                setCertModal({ open: false, isEditing: false, data: null });
              }}
              className="space-y-4 font-mono text-xs"
            >
              <div>
                <label className="block text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={certModal.data?.title || ''}
                  onChange={(e) => setCertModal({
                    ...certModal,
                    data: { ...certModal.data, title: e.target.value }
                  })}
                  placeholder="Database Management System"
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Issuer *</label>
                  <input
                    type="text"
                    required
                    value={certModal.data?.issuer || ''}
                    onChange={(e) => setCertModal({
                      ...certModal,
                      data: { ...certModal.data, issuer: e.target.value }
                    })}
                    placeholder="Swayam NPTEL"
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Category (Development / AI & Cloud / Cybersecurity)</label>
                  <select
                    value={certModal.data?.category || 'Development'}
                    onChange={(e) => setCertModal({
                      ...certModal,
                      data: { ...certModal.data, category: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                  >
                    <option value="Development">Development</option>
                    <option value="AI & Cloud">AI & Cloud</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Highlight Badge</label>
                  <input
                    type="text"
                    value={certModal.data?.badge || ''}
                    onChange={(e) => setCertModal({
                      ...certModal,
                      data: { ...certModal.data, badge: e.target.value }
                    })}
                    placeholder="e.g. Top 2% Elite Topper (80%)"
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Issue Date</label>
                  <input
                    type="text"
                    value={certModal.data?.issueDate || ''}
                    onChange={(e) => setCertModal({
                      ...certModal,
                      data: { ...certModal.data, issueDate: e.target.value }
                    })}
                    placeholder="2025"
                    className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Credential URL</label>
                <input
                  type="text"
                  value={certModal.data?.credentialUrl || ''}
                  onChange={(e) => setCertModal({
                    ...certModal,
                    data: { ...certModal.data, credentialUrl: e.target.value }
                  })}
                  placeholder="https://nptel.ac.in"
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={certModal.data?.description || ''}
                  onChange={(e) => setCertModal({
                    ...certModal,
                    data: { ...certModal.data, description: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-[#090d16] border border-white/[0.1] text-white font-sans"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCertModal({ open: false, isEditing: false, data: null })}
                  className="px-4 py-2 rounded-lg bg-white/[0.04] text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold"
                >
                  Save Credential
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          CONFIRMATION MODAL
      ===================================================================== */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#111827] border border-rose-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <ShieldAlert className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-white text-base font-mono">
                {confirmModal.title}
              </h3>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {confirmModal.message}
            </p>
            <div className="flex justify-end gap-2 pt-2 font-mono text-xs">
              <button
                onClick={() => setConfirmModal({ open: false, title: '', action: null })}
                className="px-4 py-2 rounded-lg bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
              >
                Cancel
              </button>
              <button
                onClick={confirmModal.action}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold"
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast />
    </div>
  );
};

export default CmsPage;
