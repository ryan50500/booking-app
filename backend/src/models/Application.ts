// Application model - stored in Supabase table: applications
//
// Columns:
//   id               uuid          primary key (auto-generated)
//   user_id          uuid          references auth.users(id) - the logged-in user who owns this record
//   company          text          company name
//   role             text          job title / role name
//   job_url          text          link to the job posting (optional)
//   source           text          where they found the job: 'linkedin' | 'company_site' | 'referral' | 'recruiter' | 'other'
//   status           text          current stage: 'applied' | 'screening' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
//   interest_level   text          how interested you are: 'high' | 'medium' | 'low'
//   salary_range     text          e.g. '£50,000 - £60,000' or '85,000' (optional)
//   interview_stage  integer       which interview round you are on, e.g. 1, 2, 3 (optional, only relevant when status = 'interview')
//   applied_date     date          date the application was submitted
//   notes            text          free-form notes about this specific application (optional)
//   contact_name     text          recruiter or hiring manager name (optional)
//   contact_email    text          recruiter or hiring manager email (optional)
//   created_at       timestamptz   auto-set by Supabase
//   updated_at       timestamptz   auto-set by Supabase

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
  interview_stage?: number;
  applied_date: string;
  notes?: string;           // per-application notes (NOT the general prep notes page)
  contact_name?: string;
  contact_email?: string;
  created_at: string;
  updated_at: string;
}
