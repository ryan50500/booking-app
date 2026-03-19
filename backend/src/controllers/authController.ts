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
 * ✅ 6. Review and understand the register() function below
 *       Why: Learn how validation works, status codes, and error handling before implementing the Supabase call
 *
 * ✅ 7. Implement the Supabase call inside register()
 *       Why: Actually create the user, get the session token, and move beyond the placeholder response
 *
 * ⬜ 8. Test register() with curl (no Postman needed)
 *       Why: Verify register() works before building login() on top of it
 *
 *       Step 1 - Start the backend server (in terminal):
 *         cd /workspaces/booking-app/backend && npm run dev
 *
 *       Step 2 - Send a test registration request (in a second terminal):
 *         curl -X POST http://localhost:5000/api/auth/register \
 *           -H "Content-Type: application/json" \
 *           -d '{"email": "test@example.com", "password": "password123", "name": "Test User", "role": "patient"}'
 *
 *       Expected response:
 *         { "message": "Registration successful! You are now logged in.", "user": { ... } }
 *
 *       Also check: Supabase Dashboard → Authentication → Users → confirm user appeared there
 *
 * ⬜ 9. Implement the login() function below
 *       Why: Let existing users sign in (verifies credentials, sets cookie)
 *
 * ⬜ 10. Implement getProfile() function
 *       Why: Let logged-in users fetch their account info
 *
 * ⬜ 11. Set up cookie options for production
 *       Why: Add secure flags (HTTPS-only, strict SameSite) for deployed app
 *
 * ⬜ 12. Implement auth middleware (middleware/auth.ts)
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
    // STEP 5: SANITIZE THE ROLE VALUE
    // ============================================================
    // We only allow two roles: "patient" or "doctor"
    // If the frontend sends anything else (or nothing), we default to "patient"
    // This prevents someone from sending role: "admin" and getting elevated access
    const userRole = role === "doctor" ? "doctor" : "patient";

    // ============================================================
    // STEP 6: CALL SUPABASE TO CREATE THE USER
    // ============================================================
    // supabase.auth.signUp() does three things for us:
    //   1. Creates a new user in Supabase's auth system (stores email + hashed password)
    //   2. Stores any extra info we pass in "options.data" as user_metadata
    //   3. Returns { data, error } - we always get one or the other
    //
    // NOTE: We are NOT storing the password ourselves - Supabase handles that securely
    // NOTE: options.data = extra profile info attached to the user (not the password)
    const { data, error } = await supabase.auth.signUp({
      email,       // ← we are SENDING this TO Supabase
      password,    // ← we are SENDING this TO Supabase
      options: {
        data: {    // ← this inner "data" is also sent TO Supabase (metadata)
          name,
          role: userRole,
        },
      },
    });

    // ============================================================
    // STEP 7: HANDLE SUPABASE ERRORS
    // ============================================================
    // If Supabase returned an error (e.g. email already registered,
    // password too short according to Supabase settings, etc.)
    // we send a 400 response back to the frontend with the error message
    if (error) {
      console.error("❌ Supabase sign-up error:", error.message);
      res.status(400).json({
        error: "Registration failed",
        message: error.message, // e.g. "User already registered"
      });
      return;
    }

    // ============================================================
    // STEP 8: HANDLE THE CASE WHERE NO USER WAS CREATED
    // ============================================================
    // This is a rare edge case - Supabase returned no error but also no user
    // We treat this as an unexpected server problem (500 = our fault, not client's)
    if (!data.user) {
      console.error("❌ Supabase returned no user and no error");
      res.status(500).json({
        error: "Server error",
        message: "Something went wrong. Please try again.",
      });
      return;
    }

    // ============================================================
    // STEP 9: SET THE AUTH COOKIE (IF SUPABASE GAVE US A SESSION)
    // ============================================================
    // After sign-up, Supabase may or may not return a session immediately:
    //
    //   - If email confirmation is DISABLED → session is returned right away
    //     → We set the cookie so the user is logged in immediately
    //
    //   - If email confirmation is ENABLED → session is null (user must verify email first)
    //     → We skip setting the cookie for now
    //
    // The cookie stores the JWT token SECURELY:
    //   httpOnly: true   → JavaScript cannot read this cookie (prevents XSS attacks)
    //   secure: true     → Only sent over HTTPS in production (not needed in dev)
    //   sameSite: "lax"  → Protects against CSRF attacks
    //   maxAge           → Cookie expires after 1 hour (1000ms × 60s × 60m)
    if (data.session?.access_token) {
      res.cookie("auth-token", data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60, // 1 hour in milliseconds
      });
      console.log("✅ Auth cookie set for:", email);
    }

    // ============================================================
    // STEP 10: SEND SUCCESS RESPONSE TO FRONTEND
    // ============================================================
    // We send back:
    //   - A message explaining what happened
    //   - Safe user info (id, email, name, role) that the frontend can use
    //
    // We do NOT send back:
    //   - The password (never!)
    //   - The raw JWT token in the JSON body (it's in the cookie instead)
    //
    // 201 = "Created" - the standard status code for successfully creating a resource
    console.log("✅ User registered successfully:", email);
    res.status(201).json({
      message: data.session
        ? "Registration successful! You are now logged in."
        : "Registration successful! Please check your email to verify your account.",
      user: {
        id: data.user.id,           // Supabase-generated unique user ID
        email: data.user.email,     // The email they registered with
        name: data.user.user_metadata.name,   // From options.data above
        role: data.user.user_metadata.role,   // From options.data above
      },
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
