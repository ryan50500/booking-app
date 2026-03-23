// PrepNote model - stored in Supabase table: prep_notes
//
// Columns:
//   id          uuid          primary key (auto-generated)
//   user_id     uuid          references auth.users(id)
//   question    text          the interview question
//   answer      text          your answer / talking points
//   category    text          tag for grouping: e.g. 'React' | 'TypeScript' | 'Behavioural' | 'System Design' | 'General'
//   created_at  timestamptz   auto-set by Supabase
//   updated_at  timestamptz   auto-set by Supabase

export interface PrepNote {
  id: string;
  user_id: string;
  question: string;
  answer: string;
  category: string;
  created_at: string;
  updated_at: string;
}
