import { Router } from "express";
// import { verifyToken } from "../middleware/auth";
// import { createPrepNote, getPrepNotes, getPrepNoteById, updatePrepNote, deletePrepNote } from "../controllers/prepNoteController";

const router = Router();

// ALL PREP NOTE ROUTES ARE PROTECTED (requires login)

// router.post("/", verifyToken, createPrepNote);       // POST   /api/prep-notes
// router.get("/", verifyToken, getPrepNotes);          // GET    /api/prep-notes
// router.get("/:id", verifyToken, getPrepNoteById);    // GET    /api/prep-notes/:id
// router.put("/:id", verifyToken, updatePrepNote);     // PUT    /api/prep-notes/:id
// router.delete("/:id", verifyToken, deletePrepNote);  // DELETE /api/prep-notes/:id

export default router;
