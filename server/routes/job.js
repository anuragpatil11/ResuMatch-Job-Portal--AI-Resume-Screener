import express from "express";
import {
  applyToJob,
  createJob,
  getAllJobs,
  getJob,
  getRecommendations,
  postedJobs,
  uploadResumeAndExtract,
} from "../controllers/job.js";
import {
  ensureApplicant,
  ensureRecruiter,
  isAuthenticate,
} from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";
const router = express.Router();

router.get("/allJob", getAllJobs);
router.get("/postedJobs", isAuthenticate, postedJobs);
router.post("/createJob", isAuthenticate, ensureRecruiter, createJob);
router.get("/recommendation", isAuthenticate, getRecommendations);
// Applicant: Upload resume & extract
router.post(
  "/upload/resume",
  isAuthenticate,
  upload.single("resume"),
  uploadResumeAndExtract
);
router.get("/:id", isAuthenticate, ensureApplicant, getJob);
router.post("/apply/:jobId", isAuthenticate, ensureApplicant, applyToJob);

export default router;
