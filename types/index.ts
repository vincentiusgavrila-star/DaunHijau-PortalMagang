export type WorkType = 'Remote' | 'Hybrid' | 'On-site';
export type InternshipStatus = 'Open' | 'Closed';
export type ApplicationStatus = 'Pending' | 'Reviewing' | 'Accepted' | 'Rejected';

export interface Internship {
  id: string;
  title: string;
  department: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  location: string;
  workType: WorkType;
  duration: string;
  deadline: string; // ISO date string
  status: InternshipStatus;
  createdAt: string; // ISO date string
}

export interface Application {
  id: string;
  internshipId: string;
  internshipTitle: string;
  fullName: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  semester: number;
  linkedIn?: string;
  portfolio?: string;
  motivation: string;
  status: ApplicationStatus;
  appliedAt: string; // ISO date string
}

export interface DashboardStats {
  totalInternships: number;
  activeInternships: number;
  totalApplications: number;
  pendingApplications: number;
}
