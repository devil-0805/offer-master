import type { Resume } from '../types/resume';

const RESUME_STORAGE_KEY = 'resumes';

export function saveResume(resume: Resume): void {
  try {
    const storedResumes = getStoredResumes();
    const existingIndex = storedResumes.findIndex(r => r.id === resume.id);
    
    if (existingIndex >= 0) {
      storedResumes[existingIndex] = { ...resume, updatedAt: new Date().toISOString() };
    } else {
      storedResumes.push({ ...resume, updatedAt: new Date().toISOString() });
    }
    
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(storedResumes));
  } catch (error) {
    console.error('Error saving resume:', error);
  }
}

export function getStoredResumes(): Resume[] {
  try {
    const stored = localStorage.getItem(RESUME_STORAGE_KEY);
    if (!stored) {
      return [];
    }
    
    const resumes: Resume[] = JSON.parse(stored);
    return resumes;
  } catch (error) {
    console.error('Error getting resumes:', error);
    return [];
  }
}

export function getStoredResume(id: string): Resume | undefined {
  const resumes = getStoredResumes();
  return resumes.find(resume => resume.id === id);
}

export function deleteResume(id: string): void {
  try {
    const storedResumes = getStoredResumes();
    const filteredResumes = storedResumes.filter(resume => resume.id !== id);
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(filteredResumes));
  } catch (error) {
    console.error('Error deleting resume:', error);
  }
}

export function clearAllResumes(): void {
  try {
    localStorage.removeItem(RESUME_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing resumes:', error);
  }
}
