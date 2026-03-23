import { Router } from "express";
// import { verifyToken } from "../middleware/auth";
// import { createApplication, getApplications, getApplicationById, updateApplication, deleteApplication } from "../controllers/applicationController";

const router = Router();

// ALL APPLICATION ROUTES ARE PROTECTED (requires login)

// router.post("/", verifyToken, createApplication);        // POST   /api/applications
// router.get("/", verifyToken, getApplications);           // GET    /api/applications
// router.get("/:id", verifyToken, getApplicationById);     // GET    /api/applications/:id
// router.put("/:id", verifyToken, updateApplication);      // PUT    /api/applications/:id
// router.delete("/:id", verifyToken, deleteApplication);   // DELETE /api/applications/:id

export default router;
