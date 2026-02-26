import { Request, Response } from "express";
import { supabase } from "../config/database";

/**
 * ============================================================================
 * AUTH CONTROLLER - Session Broker Pattern
 * ============================================================================
 * 
 * What this file does:
 * - Acts as a "middleman" between your frontend and Supabase Auth
 * - Does NOT handle passwords or create JWTs itself
 * - Calls Supabase to do the authentication
 * - Stores the JWT token from Supabase in an HTTP-only cookie (secure!)
 *
 * Why HTTP-only cookies?
 * - JavaScript cannot access them (prevents XSS attacks)
 * - Browser sends them automatically with every request
 * - More secure than storing tokens in localStorage
 *
 *
 * SETUP CHECKLIST:
 * ✅ 1. Create a Supabase account at https://supabase.com
 * ✅ 2. Create a new project
 * ✅ 3. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your .env file
 * ✅ 4. Uncomment the supabase import above
 *
 * NEXT STEPS:
 * ✅ 5. Enable Email Auth in Supabase
 *      Why: Allow users to register/login with email and password (no OAuth for now)
 * 
 * ⬜ 6. Implement the register() function below
 *       Why: Let new users create accounts (calls Supabase, sets cookie)
 * 
 * ⬜ 7. Implement the login() function below
 *       Why: Let existing users sign in (verifies credentials, sets cookie)
 * 
 * ⬜ 8. Test with Postman or your frontend
 *       Why: Verify register/login work before building more features
 * 
 * ⬜ 9. Implement getProfile() function
 *       Why: Let logged-in users fetch their account info
 * 
 * ⬜ 10. Set up cookie options for production
 *       Why: Add secure flags (HTTPS-only, strict SameSite) for deployed app
 * 
 * ⬜ 11. Implement auth middleware (middleware/auth.ts)
 *       Why: Protect routes that require authentication (appointments, doctors, getProfile)
 *       Note: register() and login() stay public - middleware is for OTHER routes
 *
 * ============================================================================
 *

/**
 * REGISTER 📝 - Create a new user account
 * POST /api/auth/register
 *
 * 🔧 What happens 🔧:
 * 1. Frontend sends: { email, password, name, role }
 * 2. Backend calls Supabase: "Hey Supabase, create this user"
 * 3. Supabase creates user and returns a JWT token
 * 4. Backend stores JWT in HTTP-only cookie
 * 5. Frontend receives success message (but never sees the token!)
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // ✅ Log the request for learning/debugging
    console.log("Register endpoint called with:", req.body);

    // ============================================================
    // STEP 1: EXTRACT DATA FROM REQUEST BODY
    // ============================================================
    // When frontend sends JSON like: { "email": "test@test.com", "password": "abc123", "name": "John" }
    // This destructuring pulls out those specific properties
    const { email, password, name, role } = req.body;

    // ============================================================
    // STEP 2: VALIDATE REQUIRED FIELDS
    // ============================================================
    // Check if any required field is missing, undefined, null, or empty string
    // The || (OR) operator means "if ANY of these are falsy, the condition is true"
    if (!email || !password || !name) {
      // Send 400 Bad Request status (client sent invalid data)
      res.status(400).json({
        error: "Missing required fields",
        message: "Email, password, and name are required",
      });
      return; // IMPORTANT: Stop execution here - don't continue
    }

    // ============================================================
    // STEP 3: BASIC EMAIL FORMAT VALIDATION
    // ============================================================
    // Simple regex to check if email looks valid (has @ and a domain)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        error: "Invalid email",
        message: "Please provide a valid email address",
      });
      return;
    }

    // ============================================================
    // STEP 4: PASSWORD LENGTH VALIDATION
    // ============================================================
    // Supabase requires minimum 6 characters by default
    if (password.length < 6) {
      res.status(400).json({
        error: "Weak password",
        message: "Password must be at least 6 characters long",
      });
      return;
    }

    // ✅ If we reach this point, all validation passed!
    console.log("✅ Validation passed for:", email);

    // ============================================================
    // NEXT STEP: Call Supabase (we'll add this in the next step)
    // ============================================================
    res.status(501).json({
      message: "Registration endpoint - validation works! Next: call Supabase",
      receivedData: { email, name, role: role || "patient" },
    });
  } catch (error) {
    // ============================================================
    // CATCH BLOCK: Handles ANY unexpected errors
    // ============================================================
    // This prevents the entire server from crashing if something goes wrong
    console.error("❌ Registration error:", error);
    res.status(500).json({
      error: "Server error",
      message: "Failed to register user",
    });
  }
};

/**
 * LOGIN 🔐 - Authenticate existing user
 * POST /api/auth/login
 *
 * 🔧 What happens 🔧:
 * 1. Frontend sends: { email, password }
 * 2. Backend asks Supabase: "Is this password correct?"
 * 3. Supabase verifies and returns JWT token
 * 4. Backend stores JWT in HTTP-only cookie
 * 5. Frontend receives success message
 *
 * The frontend never touches the token - it's safely stored in a cookie!
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  // TODO: Implement when Supabase is set up
  res.status(501).json({
    message: "Login endpoint - not yet implemented",
    todo: "Set up Supabase account and add credentials to .env",
  });
};

/**
 * LOGOUT 🚪 - Clear user session
 * POST /api/auth/logout
 *
 * 🔧 What happens 🔧:
 * 1. Frontend sends logout request
 * 2. Backend tells Supabase: "This user is logging out"
 * 3. Backend clears the HTTP-only cookies
 * 4. User is now logged out
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  // For now, just clear cookies (no Supabase needed)
  res.clearCookie("sb-access-token");
  res.clearCookie("sb-refresh-token");

  res.status(200).json({ message: "Logout successful" });
};

/**
 * GET PROFILE 👤 - Get current logged-in user info
 * GET /api/auth/profile
 *
 * NOTE: This is different from middleware/auth.ts verifyToken()
 * - verifyToken() = Security checkpoint (used before other routes)
 * - getProfile() = Endpoint destination (returns user data)
 *
 * 🔧 What happens 🔧:
 * 1. Browser automatically sends cookie with request
 * 2. Backend extracts JWT from cookie
 * 3. Backend asks Supabase: "Is this token valid? Who is this user?"
 * 4. Supabase returns user info
 * 5. Backend sends user info to frontend
 */
export const getProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // TODO: Implement when Supabase is set up
  res.status(501).json({
    message: "Profile endpoint - not yet implemented",
    todo: "Set up Supabase account and add credentials to .env",
  });
};
