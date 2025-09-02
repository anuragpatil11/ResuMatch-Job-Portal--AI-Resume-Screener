import Job from "../models/job.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import Application from "../models/application.js";
import PDFParser from "pdf2json";
import { uploadBufferToCloudinary } from "../middlewares/upload.js";
import { extractSkillsRuleBased } from "../utils/skills.js";
import { aiExtractSkills } from "../utils/aiExtract.js";

// import { populate } from "dotenv";
// import axios from "axios";
// import PDFParser from "pdf2json";
// import { PDFDocument } from "pdf-lib";

// POST /api/job/createJob
export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      employmentType,
      experienceLevel,
      salaryRange,
      skillsRequired,
      description,
      responsibilities,
      qualifications,
      deadline,
      category,
    } = req.body;

    if (
      !title ||
      !company ||
      !location ||
      !employmentType ||
      !experienceLevel ||
      !skillsRequired ||
      !description
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all required fields" });
    }
    if (req.user.role !== "recruiter") {
      return res
        .status(403)
        .json({ success: false, message: "Only recruiters can post jobs" });
    }
    const newJob = await Job.create({
      title,
      company,
      location,
      employmentType,
      experienceLevel,
      salaryRange: salaryRange || "Not Disclosed",
      skillsRequired,
      description,
      responsibilities: responsibilities || [],
      qualifications: qualifications || [],
      category: category || "General",
      postedBy: req.user.id || req.body.postedBy,
      deadline,
      status: "Open",
      applications: [],
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Create Job Error:", error.message, error.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const postedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id });
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ success: false, message: "No jobs found" });
    }

    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("Get Posted Jobs Error:", error.message, error.stack);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getJob = async (req, res) => {
  const { id } = req.params;

  // ✅ Validate first
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or missing Job ID" });
  }
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    console.error("Get Job Error:", error.message, error.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("Get All Jobs Error:", error.message, error.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// export const getJobs = async (req, res) => {
//   try {
//     const { search } = req.query; // e.g., ?search=python+pune
//     let query = { status: "Open" };
//     if (search) {
//       const searchTerms = search.toLowerCase().split("+");
//       query.$or = [
//         { title: { $regex: searchTerms.join("|"), $options: "i" } },
//         { company: { $regex: searchTerms.join("|"), $options: "i" } },
//         { location: { $regex: searchTerms.join("|"), $options: "i" } },
//         { skillsRequired: { $in: searchTerms } },
//       ];
//     }
//     const jobs = await Job.find(query).populate("postedBy", "name");
//     res.status(200).json({ success: true, jobs });
//   } catch (error) {
//     console.error("Get Jobs Error:", error.message, error.stack);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
// const calculateMatchScore = (applicantSkills, jobSkills) => {
//   const common = applicantSkills.filter((skill) => jobSkills.includes(skill));
//   return jobSkills.length ? (common.length / jobSkills.length) * 100 : 0;
// };

// export const getRecommendations = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user.extractedSkills || user.extractedSkills.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Upload resume to get recommendations",
//       });
//     }
//     const jobs = await Job.find({ status: "Open" });
//     const recommendations = jobs
//       .map((job) => ({
//         job: job,
//         score: calculateMatchScore(user.extractedSkills, job.skillsRequired),
//       }))
//       .filter((rec) => rec.score > 50) // Adjustable threshold
//       .sort((a, b) => b.score - a.score) // Highest score first
//       .map((rec) => ({ ...rec.job._doc, matchScore: rec.score })); // Include score in response

//     res.status(200).json({ success: true, recommendations });
//   } catch (error) {
//     console.error("Recommendations Error:", error.message, error.stack);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
const extractTextFromFile = async (file) => {
  if (file.mimetype !== "application/pdf") {
    throw new Error("Only PDF files supported currently");
  }
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataError", (err) =>
      reject(new Error("Failed to parse PDF: " + err.message))
    );
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      const text = pdfData.Pages.map((page) =>
        page.Texts.map((text) => decodeURIComponent(text.R[0].T)).join(" ")
      ).join(" ");
      resolve(text || "");
    });
    pdfParser.parseBuffer(file.buffer);
  });
};
export const uploadResumeAndExtract = async (req, res) => {
  try {
    // // Validate user and role
    // if (!req.user || req.user.role !== "applicant") {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Only applicants can upload resumes",
    //   });
    // }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Resume file required" });
    }

    // Upload to Cloudinary
    const uploaded = await uploadBufferToCloudinary(
      req.file.buffer,
      "resumes",
      req.user.id
    );
    const resumeUrl = uploaded.secure_url;

    // Extract text
    const rawText = await extractTextFromFile(req.file);

    // Extract skills (AI first, fallback to rule-based)
    let skills = await aiExtractSkills(rawText).catch(() => []);
    if (!skills || skills.length === 0) {
      skills = extractSkillsRuleBased(rawText);
    }

    // Update User
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { resumeUrl, extractedSkills: skills },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Resume uploaded & skills extracted",
      resumeUrl,
      extractedSkills: skills,
      user,
    });
  } catch (e) {
    console.error("Resume upload/extract error:", e.message, e.stack);
    let message = "Server error";
    if (e.message.includes("Cloudinary"))
      message = "Failed to upload resume to Cloudinary";
    else if (e.message.includes("PDF")) message = "Failed to process resume";
    return res.status(500).json({ success: false, message });
  }
};
const jaccardScore = (a = [], b = []) => {
  const A = new Set(a.map((x) => x.toLowerCase()));
  const B = new Set(b.map((x) => x.toLowerCase()));
  if (A.size === 0 || B.size === 0) return 0;
  let inter = 0;
  for (const v of A) if (B.has(v)) inter++;
  const union = new Set([...A, ...B]).size;
  return inter / union; // 0..1
};

// GET /api/applicant/recommendations
export const getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("extractedSkills");
    const userSkills = user?.extractedSkills || [];
    const applications = await Application.find({
      applicant: req.user.id,
    }).select("job");
    const appliedJobIds = applications.map((app) => app.job.toString());

    const jobs = await Job.find({ status: "Open" }).lean();
    const scored = jobs
      .map((j) => {
        const score = jaccardScore(userSkills, j.skillsRequired || []);
        const percent = Math.round(score * 100);
        return { ...j, matchPercent: percent, appliedJobIds };
      })
      .sort((a, b) => b.matchPercent - a.matchPercent);

    res.json({
      success: true,
      count: scored.length,
      jobs: scored,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const percentMatch = (required = [], have = []) => {
  const R = new Set((required || []).map((s) => s.toLowerCase()));
  if (R.size === 0) return 0;
  const H = new Set((have || []).map((s) => s.toLowerCase()));
  let hit = 0;
  for (const r of R) if (H.has(r)) hit++;
  return Math.round((hit / R.size) * 100);
};
// POST /api/applicant/jobs/:jobId/apply
export const applyToJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.jobId;
    // check if job ID is provided
    if (!jobId) {
      return res
        .status(400)
        .json({ success: false, message: "Job ID is required" });
    }
    // check if user has already applied
    const existingApplication = await Application.findOne({
      applicant: userId,
      job: jobId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ success: false, message: "Already applied to this job" });
    }
    // check if job exists
    const job = await Job.findById(jobId).populate({
      path: "applications",
      populate: {
        path: "applicant",
        select: "extractedSkills",
      },
    });
    if (!job || job.status !== "Open") {
      return res
        .status(404)
        .json({ success: false, message: "Job not found / Open" });
    }
    // create new application
    const applicantSkills = job.applications
      .map((app) => app.applicant?.extractedSkills || [])
      .flat();

    const newApplication = await Application.create({
      applicant: userId,
      job: jobId,
      matchScore: percentMatch(job.skillsRequired, applicantSkills),
    });
    // update job applications
    job.applications.push(newApplication._id);
    await job.save();

    return res
      .status(201)
      .json({ success: true, message: "Applied successfully" });
  } catch (error) {
    console.error("Application Error:", error.message, error.stack);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
