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
 * ⚠️ 6. Review and understand the register() function below
 *       Why: Learn how validation works, status codes, and error handling before calling Supabase
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
 */

import { Request, Response } from "express";
import { supabase } from "../config/database";

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
    const { email, password, name, role } = req.body;

    // ============================================================
    // STEP 2: VALIDATE REQUIRED FIELDS
    // ============================================================
    if (!email || !password || !name) {
      // NOTE: You can name these keys anything (error, message, errorType, etc.)
      // NOTE: You can use any 4xx status code, but 400 = "Bad Request" is standard for validation errors
      res.status(400).json({
        error: "Missing required fields",
        message: "Email, password, and name are required",
      });
      return;
    }

    // ============================================================
    // STEP 3: BASIC EMAIL FORMAT VALIDATION
    // ============================================================
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      // NOTE: Keys can be named anything - "error" and "message" is just our convention
      // NOTE: 400 status means "client sent bad data" (vs 500 = "server broke")
      res.status(400).json({
        error: "Invalid email",
        message: "Please provide a valid email address",
      });
      return;
    }

    // ============================================================
    // STEP 4: PASSWORD LENGTH VALIDATION
    // ============================================================
    if (password.length < 6) {
      // NOTE: Consistency matters - use same key names across all endpoints
      // NOTE: Status codes are semantic hints (400 = client error, not server error)
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
    // NOTE: 501 = "Not Implemented" - perfect for placeholder endpoints
    // NOTE: JSON keys are flexible - could be "msg", "info", "status", etc.
    res.status(501).json({
      message: "Registration endpoint - validation works! Next: call Supabase",
      receivedData: { email, name, role: role || "patient" },
    });
  } catch (error) {
    // ============================================================
    // CATCH BLOCK: Handles ANY unexpected errors
    // ============================================================
    console.error("❌ Registration error:", error);
    // NOTE: 500 = "Internal Server Error" - use when YOUR code breaks (not client's fault)
    // NOTE: Could use keys like "errorType", "details", "errorMessage" - just be consistent!
    res.status(500).json({
      error: "Server error",
      message: "Failed to register user",
    });
  }
};

/**
 * LOGIN 🔐 - Authenticate existing user
 * POST /api/auth/login
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  console.log("Login endpoint called");

  // NOTE: 501 status code can be anything (200, 400, 418 "I'm a teapot"), but 501 means "not coded yet"
  // NOTE: Response body keys are totally flexible - name them whatever makes sense!
  res.status(501).json({
    message: "Login endpoint - not yet implemented",
  });
};

/**
 * GET PROFILE 👤 - Fetch current user's profile
 * GET /api/auth/profile
 */
export const getProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  console.log("Get profile endpoint called");

  // NOTE: Could use 503 (Service Unavailable) or 501 (Not Implemented) - they're just conventions
  // NOTE: Could structure as { "data": null, "status": "pending" } - whatever your frontend expects!
  res.status(501).json({
    message: "Get profile endpoint - not yet implemented",
  });
};

/**
 * LOGOUT 🚪 - Clear user session
 * POST /api/auth/logout
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  console.log("Logout endpoint called");

  // NOTE: Status codes are semantic (501 = "I haven't built this yet")
  // NOTE: JSON body structure is YOUR choice - just keep it consistent across your API
  res.status(501).json({
    message: "Logout endpoint - not yet implemented",
  });
};
