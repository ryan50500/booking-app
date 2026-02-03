import { Router } from "express";
// import { verifyToken } from "../middleware/auth";
// Import controller functions once they're implemented:
// import { createAppointment, getAppointmentById, getUserAppointments, getDoctorAppointments, updateAppointmentStatus, cancelAppointment } from "../controllers/appointmentController";

const router = Router();

// ALL APPOINTMENT ROUTES ARE PROTECTED (authentication required)
// Users must be logged in to manage appointments

// router.post("/", verifyToken, createAppointment); // POST /api/appointments → Create new appointment (protected)
// router.get("/:id", verifyToken, getAppointmentById); // GET /api/appointments/123 → Get specific appointment (protected)
// router.get("/user/:userId", verifyToken, getUserAppointments); // GET /api/appointments/user/456 → Get all appointments for a user (protected)
// router.get("/doctor/:doctorId", verifyToken, getDoctorAppointments); // GET /api/appointments/doctor/789 → Get all appointments for a doctor (protected)
// router.put("/:id", verifyToken, updateAppointmentStatus); // PUT /api/appointments/123 → Update appointment status (protected)
// router.delete("/:id", verifyToken, cancelAppointment); // DELETE /api/appointments/123 → Cancel appointment (protected)

export default router;
