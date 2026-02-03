import { Request, Response } from "express";
// import { supabase } from "../config/database"; // TODO: Uncomment when Supabase is set up

/**
 * ============================================================================
 * AUTH CONTROLLER - Session Broker Pattern
 * ============================================================================
 *
 * RELATIONSHIP TO OTHER FILES:
 *
 * authRoutes.ts (routes/authRoutes.ts)
 *   → Defines the URL endpoints and connects them to these functions
 *   → Example: router.post("/login", login) creates POST /api/auth/login
 *
 * authController.ts (THIS FILE)
 *   → Contains the actual logic that runs when those endpoints are hit
 *   → Calls Supabase, sets cookies, sends responses
 *
 * auth.ts (middleware/auth.ts)
 *   → Security checkpoint used BEFORE protected routes
 *   → Verifies token is valid before allowing access
 *   → Different from getProfile() which is a destination endpoint
 *
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
 * TODO: Before using these functions, you need to:
 * 1. Create a Supabase account at https://supabase.com
 * 2. Create a new project
 * 3. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your .env file
 * 4. Uncomment the supabase import above
 * ============================================================================
 */

/**
 * REGISTER - Create a new user account
 * POST /api/auth/register
 *
 * What happens:
 * 1. Frontend sends: { email, password, name, role }
 * 2. Backend calls Supabase: "Hey Supabase, create this user"
 * 3. Supabase creates user and returns a JWT token
 * 4. Backend stores JWT in HTTP-only cookie
 * 5. Frontend receives success message (but never sees the token!)
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  // ✅ Log the request for learning/debugging
  console.log("Register endpoint called with:", req.body);

  // TODO: Implement when Supabase is set up
  res.status(501).json({
    message: "Registration endpoint - not yet implemented",
    todo: "Set up Supabase account and add credentials to .env",
  });
};

/**
 * LOGIN - Authenticate existing user
 * POST /api/auth/login
 *
 * What happens:
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
 * LOGOUT - Clear user session
 * POST /api/auth/logout
 *
 * What happens:
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
 * GET PROFILE - Get current logged-in user info
 * GET /api/auth/profile
 *
 * NOTE: This is different from middleware/auth.ts verifyToken()
 * - verifyToken() = Security checkpoint (used before other routes)
 * - getProfile() = Endpoint destination (returns user data)
 *
 * What happens:
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
