/**
 * Zero-Config Dual Persistence Engine for Phantom CMS
 * Supports seamless Local Storage mode (default) and Supabase Cloud mode.
 */

import { supabase, isSupabaseConfigured } from './supabaseClient';
import {
  INITIAL_PROFILE,
  INITIAL_PROJECTS,
  INITIAL_SKILLS,
  INITIAL_TIMELINE,
  INITIAL_CERTIFICATIONS
} from './initialData';
import { formatExternalUrl } from '../utils/urlHelper';

const STORAGE_KEYS = {
  PROFILE: 'phantom_profile',
  PROJECTS: 'phantom_projects',
  SKILLS: 'phantom_skills',
  TIMELINE: 'phantom_timeline',
  CERTIFICATIONS: 'phantom_certifications',
  AUTH_SESSION: 'phantom_admin_session'
};

// Default single-admin credentials fallback
const DEFAULT_ADMIN_EMAIL = import.meta.env.VITE_PHANTOM_ADMIN_ID || 'phantom@shyam.dev';
const DEFAULT_ADMIN_PASSWORD = import.meta.env.VITE_PHANTOM_ADMIN_PASSWORD || 'phantom2026';

/**
 * Initialize Local Storage with complete seed data if empty
 */
export const initializeLocalStorage = () => {
  if (typeof window === 'undefined') return;

  const cachedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
  if (!cachedProfile) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_PROFILE));
  } else {
    try {
      const parsed = JSON.parse(cachedProfile);
      // Ensure all socials use formatExternalUrl and point to user's exact profiles
      const linkedin = parsed.socials?.linkedin || 'https://www.linkedin.com/in/shyam-sunder-sharma-22488b371';
      const leetcode = parsed.socials?.leetcode || 'https://leetcode.com/u/Shyam_Sunder_Sharma/';
      const github = parsed.socials?.github || 'https://github.com/Shyam-Sunder-Sharma';

      parsed.socials = {
        ...parsed.socials,
        linkedin: formatExternalUrl(linkedin.includes('22488b371') ? linkedin : 'https://www.linkedin.com/in/shyam-sunder-sharma-22488b371'),
        leetcode: formatExternalUrl(leetcode.includes('Shyam_Sunder_Sharma') ? leetcode : 'https://leetcode.com/u/Shyam_Sunder_Sharma/'),
        github: formatExternalUrl(github)
      };
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(parsed));
    } catch {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_PROFILE));
    }
  }

  // Check cached projects to update ATOM's definition if it contains Voice Assistant
  const cachedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  if (!cachedProjects) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
  } else {
    try {
      const projs = JSON.parse(cachedProjects);
      let modified = false;
      const updated = projs.map(p => {
        if (p.id === 'atom-flagship' || (p.title === 'ATOM' && p.subtitle?.includes('Voice'))) {
          modified = true;
          return {
            ...p,
            subtitle: 'Personal Local AI Assistant',
            description: 'Personal Local AI Assistant engineered for private on-device execution, real-time web search, system hardware telemetry monitoring, and autonomous task execution. Built to operate without third-party cloud dependencies, featuring hands-free system commands and an intelligent contextual memory buffer.',
            tags: ["Python", "Local LLM", "Autonomous AI", "System Telemetry", "AsyncIO", "GGUF"],
            features: [
              "100% Private On-Device LLM Inference",
              "Real-time Hardware Telemetry (CPU, GPU, RAM, Thermals)",
              "Autonomous Web Scraping & Multi-Source Search",
              "Low-Latency Execution & Intelligent Context Buffer"
            ]
          };
        }
        return p;
      });
      if (modified) {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      }
    } catch {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
    }
  }
  if (!localStorage.getItem(STORAGE_KEYS.SKILLS)) {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(INITIAL_SKILLS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TIMELINE)) {
    localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(INITIAL_TIMELINE));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CERTIFICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(INITIAL_CERTIFICATIONS));
  }
};

// Run initialization immediately on module load
initializeLocalStorage();

/**
 * Mode Reporter
 */
export const getStorageMode = () => {
  return isSupabaseConfigured ? 'supabase' : 'local';
};

export const getStorageModeLabel = () => {
  return isSupabaseConfigured ? 'Production Supabase Engine' : 'Zero-Config Local Storage Engine';
};

// ==========================================
// AUTHENTICATION
// ==========================================

export const loginAdmin = async (email, password) => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      const session = {
        user: { email: data.user.email, id: data.user.id },
        mode: 'supabase',
        token: data.session?.access_token,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(session));
      return { success: true, session };
    } catch (err) {
      console.warn('Supabase auth failed, falling back to local credentials check:', err.message);
      // Fall through to local check if admin uses predefined local credential
    }
  }

  // Local Authentication check
  const trimmedEmail = email.trim().toLowerCase();
  const validEmail = DEFAULT_ADMIN_EMAIL.trim().toLowerCase();

  if (trimmedEmail === validEmail && password === DEFAULT_ADMIN_PASSWORD) {
    const session = {
      user: {
        email: DEFAULT_ADMIN_EMAIL,
        name: 'The Phantom (Admin)',
        role: 'superadmin'
      },
      mode: 'local',
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(session));
    return { success: true, session };
  }

  throw new Error('Invalid Phantom Admin Credentials. Access Denied.');
};

export const logoutAdmin = async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Supabase signout error:', err);
    }
  }
  localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
  return { success: true };
};

export const getAdminSession = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  return Boolean(getAdminSession());
};

// ==========================================
// PROFILE CRUD
// ==========================================

export const getProfile = async () => {
  initializeLocalStorage();

  let prof = INITIAL_PROFILE;
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .limit(1)
        .single();
      if (!error && data) {
        prof = data.content || data;
      }
    } catch (err) {
      console.warn('Supabase getProfile fetch error, using local fallback:', err);
    }
  } else {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) {
      try {
        prof = JSON.parse(raw);
      } catch {
        prof = INITIAL_PROFILE;
      }
    }
  }

  // Guarantee absolute URLs on socials so clicks always leave localhost
  if (prof && prof.socials) {
    prof.socials = {
      ...prof.socials,
      linkedin: formatExternalUrl(prof.socials.linkedin || 'https://www.linkedin.com/in/shyam-sunder-sharma-22488b371'),
      leetcode: formatExternalUrl(prof.socials.leetcode || 'https://leetcode.com/u/Shyam_Sunder_Sharma/'),
      github: formatExternalUrl(prof.socials.github || 'https://github.com/Shyam-Sunder-Sharma')
    };
  }

  return prof;
};

export const updateProfile = async (profileData) => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profileData));

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('profile')
        .upsert({ id: 'primary', content: profileData, updated_at: new Date().toISOString() });
      if (error) console.error('Supabase updateProfile error:', error);
    } catch (err) {
      console.error('Supabase updateProfile exception:', err);
    }
  }

  return profileData;
};

// ==========================================
// PROJECTS CRUD
// ==========================================

export const getProjects = async () => {
  initializeLocalStorage();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order', { ascending: true });
      if (!error && data && data.length > 0) {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.warn('Supabase getProjects error, using local fallback:', err);
    }
  }

  const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  const projects = raw ? JSON.parse(raw) : INITIAL_PROJECTS;
  return projects.sort((a, b) => (a.order || 0) - (b.order || 0));
};

export const saveProject = async (project) => {
  const projects = await getProjects();
  let updatedProjects;

  const projectToSave = {
    ...project,
    id: project.id || `proj-${Date.now()}`,
    order: project.order !== undefined ? project.order : projects.length + 1,
    isVisible: project.isVisible !== undefined ? project.isVisible : true,
    engineeredByPhantom: project.engineeredByPhantom !== undefined ? project.engineeredByPhantom : true,
    tags: Array.isArray(project.tags)
      ? project.tags
      : (typeof project.tags === 'string' ? project.tags.split(',').map(s => s.trim()).filter(Boolean) : [])
  };

  const existingIndex = projects.findIndex(p => p.id === projectToSave.id);
  if (existingIndex >= 0) {
    updatedProjects = [...projects];
    updatedProjects[existingIndex] = projectToSave;
  } else {
    updatedProjects = [...projects, projectToSave];
  }

  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updatedProjects));

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('projects').upsert(projectToSave);
    } catch (err) {
      console.error('Supabase saveProject error:', err);
    }
  }

  return updatedProjects;
};

export const deleteProject = async (id) => {
  const projects = await getProjects();
  const updatedProjects = projects.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updatedProjects));

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch (err) {
      console.error('Supabase deleteProject error:', err);
    }
  }

  return updatedProjects;
};

export const toggleProjectVisibility = async (id) => {
  const projects = await getProjects();
  const updatedProjects = projects.map(p => {
    if (p.id === id) {
      return { ...p, isVisible: !p.isVisible };
    }
    return p;
  });
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updatedProjects));

  if (isSupabaseConfigured && supabase) {
    try {
      const target = updatedProjects.find(p => p.id === id);
      if (target) await supabase.from('projects').upsert(target);
    } catch (err) {
      console.error('Supabase toggle visibility error:', err);
    }
  }

  return updatedProjects;
};

export const reorderProjects = async (id, direction) => {
  const projects = await getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index < 0) return projects;

  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= projects.length) return projects;

  const reordered = [...projects];
  const [moved] = reordered.splice(index, 1);
  reordered.splice(targetIndex, 0, moved);

  // Re-assign order numbers
  const finalProjects = reordered.map((item, idx) => ({
    ...item,
    order: idx + 1
  }));

  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(finalProjects));

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('projects').upsert(finalProjects);
    } catch (err) {
      console.error('Supabase reorderProjects error:', err);
    }
  }

  return finalProjects;
};

// ==========================================
// SKILLS CRUD
// ==========================================

export const getSkills = async () => {
  initializeLocalStorage();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('skills').select('*');
      if (!error && data && data.length > 0) {
        localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.warn('Supabase getSkills error, using local fallback:', err);
    }
  }

  const raw = localStorage.getItem(STORAGE_KEYS.SKILLS);
  return raw ? JSON.parse(raw) : INITIAL_SKILLS;
};

export const saveSkillCategory = async (category) => {
  const skills = await getSkills();
  const id = category.id || `cat-${Date.now()}`;
  const categoryToSave = { ...category, id, items: category.items || [] };

  const existingIndex = skills.findIndex(s => s.id === id);
  let updated;
  if (existingIndex >= 0) {
    updated = [...skills];
    updated[existingIndex] = categoryToSave;
  } else {
    updated = [...skills, categoryToSave];
  }

  localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('skills').upsert(categoryToSave);
    } catch (err) {
      console.error('Supabase saveSkillCategory error:', err);
    }
  }

  return updated;
};

export const deleteSkillCategory = async (id) => {
  const skills = await getSkills();
  const updated = skills.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('skills').delete().eq('id', id);
    } catch (err) {
      console.error('Supabase deleteSkillCategory error:', err);
    }
  }

  return updated;
};

export const saveSkillItem = async (categoryId, skillItem) => {
  const skills = await getSkills();
  const updated = skills.map(cat => {
    if (cat.id === categoryId) {
      const items = cat.items || [];
      const existingIdx = items.findIndex(i => i.name.toLowerCase() === skillItem.name.toLowerCase());
      let newItems;
      if (existingIdx >= 0) {
        newItems = [...items];
        newItems[existingIdx] = { ...items[existingIdx], ...skillItem };
      } else {
        newItems = [...items, skillItem];
      }
      return { ...cat, items: newItems };
    }
    return cat;
  });

  localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));

  if (isSupabaseConfigured && supabase) {
    try {
      const updatedCat = updated.find(c => c.id === categoryId);
      if (updatedCat) await supabase.from('skills').upsert(updatedCat);
    } catch (err) {
      console.error('Supabase saveSkillItem error:', err);
    }
  }

  return updated;
};

export const deleteSkillItem = async (categoryId, skillName) => {
  const skills = await getSkills();
  const updated = skills.map(cat => {
    if (cat.id === categoryId) {
      return {
        ...cat,
        items: (cat.items || []).filter(i => i.name.toLowerCase() !== skillName.toLowerCase())
      };
    }
    return cat;
  });

  localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));

  if (isSupabaseConfigured && supabase) {
    try {
      const updatedCat = updated.find(c => c.id === categoryId);
      if (updatedCat) await supabase.from('skills').upsert(updatedCat);
    } catch (err) {
      console.error('Supabase deleteSkillItem error:', err);
    }
  }

  return updated;
};

// ==========================================
// TIMELINE CRUD
// ==========================================

export const getTimeline = async () => {
  initializeLocalStorage();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('timeline')
        .select('*')
        .order('order', { ascending: true });
      if (!error && data && data.length > 0) {
        localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.warn('Supabase getTimeline error, using local fallback:', err);
    }
  }

  const raw = localStorage.getItem(STORAGE_KEYS.TIMELINE);
  const timeline = raw ? JSON.parse(raw) : INITIAL_TIMELINE;
  return timeline.sort((a, b) => (a.order || 0) - (b.order || 0));
};

export const saveTimelineItem = async (item) => {
  const timeline = await getTimeline();
  const id = item.id || `timeline-${Date.now()}`;
  const itemToSave = {
    ...item,
    id,
    order: item.order !== undefined ? item.order : timeline.length + 1,
    highlights: Array.isArray(item.highlights)
      ? item.highlights
      : (typeof item.highlights === 'string' ? item.highlights.split(',').map(s => s.trim()).filter(Boolean) : [])
  };

  const existingIndex = timeline.findIndex(t => t.id === id);
  let updated;
  if (existingIndex >= 0) {
    updated = [...timeline];
    updated[existingIndex] = itemToSave;
  } else {
    updated = [...timeline, itemToSave];
  }

  localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(updated));

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('timeline').upsert(itemToSave);
    } catch (err) {
      console.error('Supabase saveTimelineItem error:', err);
    }
  }

  return updated;
};

export const deleteTimelineItem = async (id) => {
  const timeline = await getTimeline();
  const updated = timeline.filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(updated));

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('timeline').delete().eq('id', id);
    } catch (err) {
      console.error('Supabase deleteTimelineItem error:', err);
    }
  }

  return updated;
};

export const reorderTimeline = async (id, direction) => {
  const timeline = await getTimeline();
  const index = timeline.findIndex(t => t.id === id);
  if (index < 0) return timeline;

  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= timeline.length) return timeline;

  const reordered = [...timeline];
  const [moved] = reordered.splice(index, 1);
  reordered.splice(targetIndex, 0, moved);

  const finalTimeline = reordered.map((item, idx) => ({
    ...item,
    order: idx + 1
  }));

  localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(finalTimeline));

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('timeline').upsert(finalTimeline);
    } catch (err) {
      console.error('Supabase reorderTimeline error:', err);
    }
  }

  return finalTimeline;
};

// ==========================================
// CERTIFICATIONS CRUD
// ==========================================

export const getCertifications = async () => {
  initializeLocalStorage();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('certifications').select('*');
      if (!error && data && data.length > 0) {
        localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.warn('Supabase getCertifications error, using local fallback:', err);
    }
  }

  const raw = localStorage.getItem(STORAGE_KEYS.CERTIFICATIONS);
  return raw ? JSON.parse(raw) : INITIAL_CERTIFICATIONS;
};

export const saveCertification = async (cert) => {
  const certs = await getCertifications();
  const id = cert.id || `cert-${Date.now()}`;
  const certToSave = {
    ...cert,
    id,
    badge: cert.badge || 'Verified Credential',
    category: cert.category || 'Development'
  };

  const existingIndex = certs.findIndex(c => c.id === id);
  let updated;
  if (existingIndex >= 0) {
    updated = [...certs];
    updated[existingIndex] = certToSave;
  } else {
    updated = [...certs, certToSave];
  }

  localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(updated));

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('certifications').upsert(certToSave);
    } catch (err) {
      console.error('Supabase saveCertification error:', err);
    }
  }

  return updated;
};

export const deleteCertification = async (id) => {
  const certs = await getCertifications();
  const updated = certs.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(updated));

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('certifications').delete().eq('id', id);
    } catch (err) {
      console.error('Supabase deleteCertification error:', err);
    }
  }

  return updated;
};

// ==========================================
// BACKUP & RESET ENGINE
// ==========================================

export const exportBackup = async () => {
  const [profile, projects, skills, timeline, certifications] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
    getTimeline(),
    getCertifications()
  ]);

  const backupData = {
    version: '1.0.0',
    builder: 'The Phantom (Shyam Sunder Sharma)',
    exportedAt: new Date().toISOString(),
    engine: getStorageModeLabel(),
    data: {
      profile,
      projects,
      skills,
      timeline,
      certifications
    }
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `phantom-cms-backup-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();

  return backupData;
};

export const resetToDefaultData = async () => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_PROFILE));
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
  localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(INITIAL_SKILLS));
  localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(INITIAL_TIMELINE));
  localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(INITIAL_CERTIFICATIONS));

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('profile').upsert({ id: 'primary', content: INITIAL_PROFILE });
      await supabase.from('projects').upsert(INITIAL_PROJECTS);
      await supabase.from('skills').upsert(INITIAL_SKILLS);
      await supabase.from('timeline').upsert(INITIAL_TIMELINE);
      await supabase.from('certifications').upsert(INITIAL_CERTIFICATIONS);
    } catch (err) {
      console.warn('Supabase reset warning:', err);
    }
  }

  return {
    profile: INITIAL_PROFILE,
    projects: INITIAL_PROJECTS,
    skills: INITIAL_SKILLS,
    timeline: INITIAL_TIMELINE,
    certifications: INITIAL_CERTIFICATIONS
  };
};

export const importBackup = async (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    const data = parsed.data || parsed;

    if (data.profile) await updateProfile(data.profile);
    if (data.projects && Array.isArray(data.projects)) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(data.projects));
    }
    if (data.skills && Array.isArray(data.skills)) {
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(data.skills));
    }
    if (data.timeline && Array.isArray(data.timeline)) {
      localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(data.timeline));
    }
    if (data.certifications && Array.isArray(data.certifications)) {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(data.certifications));
    }

    return { success: true };
  } catch (err) {
    throw new Error('Failed to parse and import backup JSON: ' + err.message);
  }
};
