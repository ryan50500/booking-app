import { Router } from "express";
import {
  register,
  login,
  logout,
  getProfile,
} from "../controllers/authController";
import { verifyToken } from "../middleware/auth";

const router = Router();

// Session broker routes (NOT custom auth)
// These routes call Supabase Auth and manage HTTP-only cookies

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Protected route
router.get("/profile", verifyToken, getProfile);

export default router;
