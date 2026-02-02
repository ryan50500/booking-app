import { Request, Response } from "express";
import { supabase } from "../config/database";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // HTTPS only in production
  sameSite:
    process.env.NODE_ENV === "production"
      ? ("strict" as const)
      : ("lax" as const),
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
};

/**
 * Register a new user
 * POST /api/auth/register
 *
 * Session Broker Pattern:
 * - Calls Supabase Auth (does NOT handle passwords itself)
 * - Receives JWT from Supabase
 * - Stores token in HTTP-only cookie
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, role } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // Create user with Supabase Auth (NOT custom auth)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: role || "patient", // Default to patient role
        },
      },
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    if (!data.session) {
      // Email confirmation required
      res.status(200).json({
        message:
          "Registration successful. Please check your email to confirm your account.",
      });
      return;
    }

    // Set HTTP-only cookies (secure token storage)
    res.cookie("sb-access-token", data.session.access_token, COOKIE_OPTIONS);
    res.cookie("sb-refresh-token", data.session.refresh_token, COOKIE_OPTIONS);

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: data.user?.id,
        email: data.user?.email,
        name: data.user?.user_metadata?.name,
        role: data.user?.user_metadata?.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

/**
 * Login user
 * POST /api/auth/login
 *
 * Session Broker Pattern:
 * - Calls Supabase Auth to verify credentials
 * - Receives JWT from Supabase
 * - Stores token in HTTP-only cookie
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // Sign in with Supabase (NOT custom password verification)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    if (!data.session) {
      res.status(401).json({ error: "Login failed" });
      return;
    }

    // Set HTTP-only cookies (secure token storage)
    res.cookie("sb-access-token", data.session.access_token, COOKIE_OPTIONS);
    res.cookie("sb-refresh-token", data.session.refresh_token, COOKIE_OPTIONS);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
        role: data.user.user_metadata?.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

/**
 * Logout user
 * POST /api/auth/logout
 *
 * Clears HTTP-only cookies
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.cookies?.["sb-access-token"];

    if (token) {
      // Sign out from Supabase
      await supabase.auth.signOut();
    }

    // Clear cookies
    res.clearCookie("sb-access-token");
    res.clearCookie("sb-refresh-token");

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Logout failed" });
  }
};

/**
 * Get current user profile
 * GET /api/auth/profile
 *
 * Verifies Supabase JWT from cookie
 */
export const getProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const token = req.cookies?.["sb-access-token"];

    if (!token) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    // Verify with Supabase (NOT custom JWT verification)
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    res.status(200).json({
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
        role: data.user.user_metadata?.role,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Failed to get profile" });
  }
};
