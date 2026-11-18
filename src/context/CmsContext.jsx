import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as cmsService from '../services/cmsService';
import {
  INITIAL_PROFILE,
  INITIAL_PROJECTS,
  INITIAL_SKILLS,
  INITIAL_TIMELINE,
  INITIAL_CERTIFICATIONS
} from '../services/initialData';

const CmsContext = createContext();

export const CmsProvider = ({ children }) => {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [timeline, setTimeline] = useState(INITIAL_TIMELINE);
  const [certifications, setCertifications] = useState(INITIAL_CERTIFICATIONS);
  const [loading, setLoading] = useState(true);
  const [storageMode, setStorageMode] = useState(cmsService.getStorageMode());
  const [storageLabel, setStorageLabel] = useState(cmsService.getStorageModeLabel());
  const [toasts, setToasts] = useState([]);

  // Toast notification dispatcher
  const showToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Fetch all CMS data from active persistence engine
  const loadAllData = useCallback(async () => {
    try {
      const [prof, projs, skls, time, certs] = await Promise.all([
        cmsService.getProfile(),
        cmsService.getProjects(),
        cmsService.getSkills(),
        cmsService.getTimeline(),
        cmsService.getCertifications()
      ]);

      if (prof) setProfile(prof);
      if (projs) setProjects(projs);
      if (skls) setSkills(skls);
      if (time) setTimeline(time);
      if (certs) setCertifications(certs);

      setStorageMode(cmsService.getStorageMode());
      setStorageLabel(cmsService.getStorageModeLabel());
    } catch (err) {
      console.error('Failed to load CMS data:', err);
      showToast('Loaded local fallback data due to network error.', 'warning');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Profile actions
  const updateProfileData = async (data) => {
    try {
      const updated = await cmsService.updateProfile(data);
      setProfile(updated);
      showToast('Profile & Hero details saved successfully.');
      return updated;
    } catch (err) {
      showToast('Error updating profile: ' + err.message, 'error');
      throw err;
    }
  };

  // Projects actions
  const saveProjectData = async (project) => {
    try {
      const updated = await cmsService.saveProject(project);
      setProjects(updated);
      showToast(`Project "${project.title}" saved.`);
      return updated;
    } catch (err) {
      showToast('Error saving project: ' + err.message, 'error');
      throw err;
    }
  };

  const deleteProjectData = async (id) => {
    try {
      const updated = await cmsService.deleteProject(id);
      setProjects(updated);
      showToast('Project deleted successfully.');
      return updated;
    } catch (err) {
      showToast('Error deleting project: ' + err.message, 'error');
      throw err;
    }
  };

  const toggleProjectVisibility = async (id) => {
    try {
      const updated = await cmsService.toggleProjectVisibility(id);
      setProjects(updated);
      showToast('Project visibility toggled.');
      return updated;
    } catch (err) {
      showToast('Error toggling visibility: ' + err.message, 'error');
      throw err;
    }
  };

  const reorderProjectData = async (id, direction) => {
    try {
      const updated = await cmsService.reorderProjects(id, direction);
      setProjects(updated);
      return updated;
    } catch (err) {
      showToast('Error reordering projects: ' + err.message, 'error');
      throw err;
    }
  };

  // Skills actions
  const saveSkillCategoryData = async (category) => {
    try {
      const updated = await cmsService.saveSkillCategory(category);
      setSkills(updated);
      showToast(`Category "${category.category}" saved.`);
      return updated;
    } catch (err) {
      showToast('Error saving skill category: ' + err.message, 'error');
      throw err;
    }
  };

  const deleteSkillCategoryData = async (id) => {
    try {
      const updated = await cmsService.deleteSkillCategory(id);
      setSkills(updated);
      showToast('Skill category deleted.');
      return updated;
    } catch (err) {
      showToast('Error deleting category: ' + err.message, 'error');
      throw err;
    }
  };

  const saveSkillItemData = async (categoryId, item) => {
    try {
      const updated = await cmsService.saveSkillItem(categoryId, item);
      setSkills(updated);
      showToast(`Skill "${item.name}" updated.`);
      return updated;
    } catch (err) {
      showToast('Error saving skill: ' + err.message, 'error');
      throw err;
    }
  };

  const deleteSkillItemData = async (categoryId, itemName) => {
    try {
      const updated = await cmsService.deleteSkillItem(categoryId, itemName);
      setSkills(updated);
      showToast(`Skill "${itemName}" removed.`);
      return updated;
    } catch (err) {
      showToast('Error deleting skill: ' + err.message, 'error');
      throw err;
    }
  };

  // Timeline actions
  const saveTimelineItemData = async (item) => {
    try {
      const updated = await cmsService.saveTimelineItem(item);
      setTimeline(updated);
      showToast('Timeline milestone saved.');
      return updated;
    } catch (err) {
      showToast('Error saving milestone: ' + err.message, 'error');
      throw err;
    }
  };

  const deleteTimelineItemData = async (id) => {
    try {
      const updated = await cmsService.deleteTimelineItem(id);
      setTimeline(updated);
      showToast('Timeline milestone removed.');
      return updated;
    } catch (err) {
      showToast('Error deleting milestone: ' + err.message, 'error');
      throw err;
    }
  };

  const reorderTimelineData = async (id, direction) => {
    try {
      const updated = await cmsService.reorderTimeline(id, direction);
      setTimeline(updated);
      return updated;
    } catch (err) {
      showToast('Error reordering timeline: ' + err.message, 'error');
      throw err;
    }
  };

  // Certifications actions
  const saveCertificationData = async (cert) => {
    try {
      const updated = await cmsService.saveCertification(cert);
      setCertifications(updated);
      showToast(`Certification "${cert.title}" saved.`);
      return updated;
    } catch (err) {
      showToast('Error saving certification: ' + err.message, 'error');
      throw err;
    }
  };

  const deleteCertificationData = async (id) => {
    try {
      const updated = await cmsService.deleteCertification(id);
      setCertifications(updated);
      showToast('Certification removed.');
      return updated;
    } catch (err) {
      showToast('Error deleting certification: ' + err.message, 'error');
      throw err;
    }
  };

  // Reset & Backup
  const resetAllData = async () => {
    try {
      const defaults = await cmsService.resetToDefaultData();
      setProfile(defaults.profile);
      setProjects(defaults.projects);
      setSkills(defaults.skills);
      setTimeline(defaults.timeline);
      setCertifications(defaults.certifications);
      showToast('All CMS data reset to Phantom default blueprint.');
    } catch (err) {
      showToast('Failed to reset data: ' + err.message, 'error');
    }
  };

  const exportDataBackup = async () => {
    try {
      await cmsService.exportBackup();
      showToast('Backup JSON exported successfully.');
    } catch (err) {
      showToast('Export failed: ' + err.message, 'error');
    }
  };

  const importDataBackup = async (jsonString) => {
    try {
      await cmsService.importBackup(jsonString);
      await loadAllData();
      showToast('Backup imported and applied successfully.');
    } catch (err) {
      showToast('Import failed: ' + err.message, 'error');
      throw err;
    }
  };

  return (
    <CmsContext.Provider
      value={{
        profile,
        projects,
        skills,
        timeline,
        certifications,
        loading,
        storageMode,
        storageLabel,
        toasts,
        showToast,
        removeToast,
        refreshData: loadAllData,
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
        importDataBackup
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
