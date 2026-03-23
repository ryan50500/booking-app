export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export type ApplicationStatus =
  | 'applied'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'rejected'
  | 'withdrawn';

export type ApplicationSource =
  | 'linkedin'
  | 'company_site'
  | 'referral'
  | 'recruiter'
  | 'other';

export type InterestLevel = 'high' | 'medium' | 'low';

export interface Application {
  id: string;
  user_id: string;
  company: string;
  role: string;
  job_url?: string;
  source: ApplicationSource;
  status: ApplicationStatus;
  interest_level?: InterestLevel;
  salary_range?: string;
  interview_stage?: number;  // which round: 1, 2, 3...
  applied_date: string;
  notes?: string;            // per-application notes (NOT the general prep notes)
  contact_name?: string;
  contact_email?: string;
  created_at: string;
  updated_at: string;
}

export interface PrepNote {
  id: string;
  user_id: string;
  question: string;
  answer: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
