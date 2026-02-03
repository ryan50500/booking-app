import { Router } from "express";
// import { verifyToken } from "../middleware/auth";
// Import controller functions once they're implemented:
// import { getAllDoctors, getDoctorById, getDoctorsBySpecialization, updateDoctorProfile } from "../controllers/doctorController";

const router = Router();

// PUBLIC ROUTES (no authentication required)
// Anyone can view doctor listings - useful for browsing before logging in

// router.get("/", getAllDoctors); // GET /api/doctors → Get all doctors
// router.get("/:id", getDoctorById); // GET /api/doctors/123 → Get specific doctor
// router.get("/specialization/:specialization", getDoctorsBySpecialization); // GET /api/doctors/specialization/cardiology → Filter by specialty

// PROTECTED ROUTES (authentication required)
// Only logged-in users (doctors or admins) can update profiles

// router.put("/:id", verifyToken, updateDoctorProfile); // PUT /api/doctors/123 → Update doctor profile (protected)

export default router;
