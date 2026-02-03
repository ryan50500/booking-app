import { Router } from "express";
import {
  register,
  login,
  logout,
  getProfile,
} from "../controllers/authController";
// import { verifyToken } from "../middleware/auth";

const router = Router();

// Session broker routes (NOT custom auth)
// These routes call Supabase Auth and manage HTTP-only cookies

// Public routes (no authentication required)
// Each route connects a URL to a controller function from authController.ts
router.post("/register", register); // POST /api/auth/register → authController.register()
router.post("/login", login); // POST /api/auth/login → authController.login()
router.post("/logout", logout); // POST /api/auth/logout → authController.logout()

// Protected route (requires authentication)
// verifyToken middleware checks if user is logged in before calling getProfile
// router.get("/profile", verifyToken, getProfile); // GET /api/auth/profile → verifyToken → authController.getProfile()

export default router;
