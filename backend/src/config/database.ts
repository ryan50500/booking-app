import { createClient } from "@supabase/supabase-js";

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Create Supabase client for server-side operations
// Note: We use the service role key here (not the anon key)
// This gives our backend full access to bypass Row Level Security (RLS)
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Function to test the Supabase connection
const connectDB = async (): Promise<void> => {
  try {
    // Simple connection test - we'll just check if we can reach Supabase
    const { error } = await supabase.from("_healthcheck").select("*").limit(1);

    // It's OK if the table doesn't exist - we just want to test connectivity
    if (error && error.code !== "PGRST116") {
      console.warn("⚠️  Supabase connection warning:", error.message);
    }

    console.log("✅ Connected to Supabase");
  } catch (error) {
    console.error("❌ Supabase connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
