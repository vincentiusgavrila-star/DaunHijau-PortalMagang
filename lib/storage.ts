import { Internship, Application } from '@/types';
import { MOCK_INTERNSHIPS, MOCK_APPLICATIONS } from './mockData';

const INTERNSHIPS_KEY = 'daunhijau_internships';
const APPLICATIONS_KEY = 'daunhijau_applications';
// Bump this version string whenever mock data changes to force a re-seed
const DATA_VERSION_KEY = 'daunhijau_data_version';
const CURRENT_DATA_VERSION = 'v2';

/**
 * Ensures LocalStorage is seeded with the latest mock data.
 * If the stored version differs from CURRENT_DATA_VERSION, data is re-seeded.
 * Called once on first storage access per session.
 */
function ensureSeeded(): void {
  if (typeof window === 'undefined') return;
  const storedVersion = localStorage.getItem(DATA_VERSION_KEY);
  if (storedVersion !== CURRENT_DATA_VERSION) {
    localStorage.setItem(INTERNSHIPS_KEY, JSON.stringify(MOCK_INTERNSHIPS));
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(MOCK_APPLICATIONS));
    localStorage.setItem(DATA_VERSION_KEY, CURRENT_DATA_VERSION);
  }
}

// --- Internships ---
export function getInternships(): Internship[] {
  if (typeof window === 'undefined') return MOCK_INTERNSHIPS;
  ensureSeeded();
  try {
    const raw = localStorage.getItem(INTERNSHIPS_KEY);
    if (!raw) return MOCK_INTERNSHIPS;
    const parsed = JSON.parse(raw) as Internship[];
    return Array.isArray(parsed) ? parsed : MOCK_INTERNSHIPS;
  } catch {
    return MOCK_INTERNSHIPS;
  }
}

export function saveInternships(data: Internship[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(INTERNSHIPS_KEY, JSON.stringify(data));
}

export function getInternshipById(id: string): Internship | undefined {
  return getInternships().find((i) => i.id === id);
}

export function createInternship(data: Omit<Internship, 'id' | 'createdAt'>): Internship {
  const internships = getInternships();
  const newItem: Internship = {
    ...data,
    id: `int-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
  };
  saveInternships([newItem, ...internships]);
  return newItem;
}

export function updateInternship(id: string, data: Partial<Omit<Internship, 'id' | 'createdAt'>>): Internship | null {
  const internships = getInternships();
  const idx = internships.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  const updated = { ...internships[idx], ...data };
  internships[idx] = updated;
  saveInternships(internships);
  return updated;
}

export function deleteInternship(id: string): boolean {
  const internships = getInternships();
  const filtered = internships.filter((i) => i.id !== id);
  if (filtered.length === internships.length) return false;
  saveInternships(filtered);
  return true;
}

// --- Applications ---
export function getApplications(): Application[] {
  if (typeof window === 'undefined') return MOCK_APPLICATIONS;
  ensureSeeded();
  try {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    if (!raw) return MOCK_APPLICATIONS;
    const parsed = JSON.parse(raw) as Application[];
    return Array.isArray(parsed) ? parsed : MOCK_APPLICATIONS;
  } catch {
    return MOCK_APPLICATIONS;
  }
}

export function saveApplications(data: Application[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(data));
}

export function createApplication(data: Omit<Application, 'id' | 'status' | 'appliedAt'>): Application {
  const applications = getApplications();
  const newItem: Application = {
    ...data,
    id: `app-${Date.now()}`,
    status: 'Pending',
    appliedAt: new Date().toISOString().split('T')[0],
  };
  saveApplications([newItem, ...applications]);
  return newItem;
}

export function updateApplicationStatus(id: string, status: Application['status']): Application | null {
  const applications = getApplications();
  const idx = applications.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  applications[idx] = { ...applications[idx], status };
  saveApplications(applications);
  return applications[idx];
}

export function deleteApplication(id: string): boolean {
  const applications = getApplications();
  const filtered = applications.filter((a) => a.id !== id);
  if (filtered.length === applications.length) return false;
  saveApplications(filtered);
  return true;
}
