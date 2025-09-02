import express from "express";
import {
  getJobApplications,
  getRankedApplicants,
  updateStatus,
} from "../controllers/application.js";
import {
  ensureApplicant,
  ensureRecruiter,
  isAuthenticate,
} from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// // Applicant: Upload resume & extract
// router.post(
//   "/upload/resume",
//   isAuthenticate,
//   upload.single("resume"),
//   uploadResumeAndExtract
// );

// Applicant: View applied applications (only their own)
router.get(
  "/myApplications",
  isAuthenticate,
  ensureApplicant,
  getJobApplications
);

// Recruiter: Get ranked applicants for a job
router.get(
  "/rankedApplicants/:jobId",
  isAuthenticate,
  ensureRecruiter,
  getRankedApplicants
);

// Recruiter: Update application status
router.put(
  "/updateStatus/:applicationId",
  isAuthenticate,
  ensureRecruiter,
  updateStatus
);

export default router;
