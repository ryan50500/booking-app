import { Request, Response, NextFunction } from "express";
// import { supabase } from "../config/database";

/**
 * ============================================================================
 * AUTH MIDDLEWARE - verifyToken
 * ============================================================================
 *
 * What this file does:
 * - Acts as a "security checkpoint" for protected routes
 * - Runs BEFORE controller functions (appointments, doctors, getProfile)
 * - Extracts JWT token from HTTP-only cookie
 * - Verifies token with Supabase
 * - Either allows request to continue OR blocks it with 401 error
 *
 * How it's used in routes:
 * router.post("/appointments", verifyToken, createAppointment);
 *                              ↑ runs first  ↑ runs if token is valid
 *
 * ============================================================================
 */

/**
 * VERIFY TOKEN MIDDLEWARE
 * Checks if user is authenticated before allowing access to protected routes
 *
 * Flow:
 * 1. Extract JWT token from cookie (browser sends automatically)
 * 2. Ask Supabase: "Is this token valid? Who is this user?"
 * 3. If valid → Attach user info to req.user → Call next() → Controller runs
 * 4. If invalid → Return 401 error → Controller never runs
 */
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Step 1: Get the token from the HTTP-only cookie
    // The cookie was set by register() or login() in authController
    const token = req.cookies["sb-access-token"];

    // Step 2: Check if token exists
    if (!token) {
      res.status(401).json({
        error: "No authentication token found",
        message: "Please log in to access this resource",
      });
      return;
    }

    // Step 3: Verify token with Supabase
    // TODO: Uncomment when Supabase is set up
    // const { data: { user }, error } = await supabase.auth.getUser(token);

    // Step 4: Check if verification failed
    // TODO: Uncomment when Supabase is set up
    // if (error || !user) {
    //   res.status(401).json({
    //     error: "Invalid or expired token",
    //     message: "Please log in again"
    //   });
    //   return;
    // }

    // Step 5: Attach user info to request object
    // Now the controller function can access req.user
    // TODO: Uncomment when Supabase is set up
    // req.user = user;

    // Step 6: Allow request to continue to the controller
    // TODO: Uncomment when Supabase is set up
    // next();

    // TEMPORARY: For now, just block everything (not implemented yet)
    res.status(501).json({
      message: "Auth middleware not yet implemented",
      todo: "Set up Supabase and uncomment the code above",
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({
      error: "Server error during authentication",
      message: "Please try again later",
    });
  }
};
