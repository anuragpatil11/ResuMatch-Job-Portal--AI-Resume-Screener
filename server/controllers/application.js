// import textract from "textract"; // optional for .doc/.docx
import PDFParser from "pdf2json";
import User from "../models/user.js";
import Job from "../models/job.js";
import { uploadBufferToCloudinary } from "../middlewares/upload.js";
import { extractSkillsRuleBased } from "../utils/skills.js";
import { aiExtractSkills } from "../utils/aiExtract.js";
import Application from "../models/application.js";
import mongoose from "mongoose";
import { populate } from "dotenv";
import axios from "axios";
// import PDFParser from "pdf2json";
import { PDFDocument } from "pdf-lib";

// import pdfParse from "pdf-parse-fixed";
// const extractTextFromFile = async (file) => {
//   if (file.mimetype !== "application/pdf") {
//     throw new Error("Only PDF files supported currently");
//   }
//   if (!file.buffer) {
//     throw new Error("File buffer missing. Did you set multer.memoryStorage()?");
//   }
//   const pdfDoc = await PDFDocument.load(file.buffer);
//   const text = await Promise.all(
//     pdfDoc.getPages().map(async (page) => {
//       const content = await page.getTextContent();
//       return content.items.map((item) => item.str).join(" ");
//     })
//   ).then((pages) => pages.join("\n"));
//   return text || "";
// };

// Extract text from file
// export const extractTextFromFile = async (file) => {
//   try {
//     console.log(
//       "Extracting text from file:",
//       file.mimetype,
//       file.buffer?.length || "No buffer"
//     );

//     if (file.mimetype === "application/pdf") {
//       const data = await pdfParse(file.buffer);
//       console.log("PDF parsed, text length:", data.text.length);
//       return data.text || "";
//     } else if (
//       file.mimetype === "application/msword" ||
//       file.mimetype ===
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     ) {
//       const result = await mammoth.extractRawText({ buffer: file.buffer });
//       console.log("DOC/DOCX parsed, text length:", result.value.length);
//       return result.value || "";
//     } else {
//       throw new Error("Only PDF, DOC, or DOCX files are supported");
//     }
//   } catch (error) {
//     console.error("Text extraction error:", error.message);
//     throw new Error(`Failed to extract text: ${error.message}`);
//   }
// };
//-----------------------------------------------------------------------------------
// const extractTextFromFile = async (file) => {
//   if (file.mimetype !== "application/pdf") {
//     throw new Error("Only PDF files supported currently");
//   }
//   return new Promise((resolve, reject) => {
//     const pdfParser = new PDFParser();
//     pdfParser.on("pdfParser_dataError", (err) =>
//       reject(new Error("Failed to parse PDF: " + err.message))
//     );
//     pdfParser.on("pdfParser_dataReady", (pdfData) => {
//       const text = pdfData.Pages.map((page) =>
//         page.Texts.map((text) => decodeURIComponent(text.R[0].T)).join(" ")
//       ).join(" ");
//       resolve(text || "");
//     });
//     pdfParser.parseBuffer(file.buffer);
//   });
// };
//-----------------------------------------------------------------------------------------
// // POST /api/applicant/resume

// export const uploadResumeAndExtract = async (req, res) => {
//   try {
//     // Validate user and role
//     if (!req.user || !req.user.id || req.user.role !== "applicant") {
//       console.error("Auth validation failed:", req.user);
//       return res.status(403).json({
//         success: false,
//         message: "Only authenticated applicants can upload resumes",
//       });
//     }

//     if (!req.file || (!req.file.secure_url && !req.file.path)) {
//       console.error("No file or URL:", req.file);
//       return res.status(400).json({
//         success: false,
//         message: "Resume file upload failed",
//       });
//     }

//     const resumeUrl = req.file.secure_url || req.file.path;
//     console.log("Cloudinary resumeUrl:", resumeUrl);

//     // Validate URL
//     try {
//       new URL(resumeUrl);
//     } catch (error) {
//       console.error("Invalid Cloudinary URL:", resumeUrl);
//       return res.status(400).json({
//         success: false,
//         message: "Invalid resume URL from Cloudinary",
//       });
//     }

//     // Extract text (with retry and fallback)
//     let rawText = "";
//     let extractedSkills = [];
//     try {
//       let response;
//       const maxRetries = 3;
//       for (let attempt = 1; attempt <= maxRetries; attempt++) {
//         try {
//           response = await axios.get(resumeUrl, {
//             responseType: "arraybuffer",
//             timeout: 10000,
//             auth: {
//               username: process.env.CLOUDINARY_API_KEY,
//               password: process.env.CLOUDINARY_API_SECRET,
//             },
//           });
//           console.log("Axios response status:", response.status);
//           break;
//         } catch (error) {
//           console.error(`Attempt ${attempt} failed:`, error.message, error.response?.status);
//           if (attempt === maxRetries) throw error;
//           await new Promise((resolve) => setTimeout(resolve, 1000));
//         }
//       }

//       const file = {
//         buffer: response.data,
//         mimetype: req.file.mimetype,
//       };
//       rawText = await extractTextFromFile(file);
//       console.log("Extracted text sample:", rawText.slice(0, 100));
//       console.log("Full extracted text length:", rawText.length);

//       // Extract skills (AI first, fallback to rule-based)
//       extractedSkills = await aiExtractSkills(rawText).catch((error) => {
//         console.error("AI skills extraction failed:", error.message);
//         return [];
//       });
//       console.log("AI extracted skills:", extractedSkills);

//       if (!extractedSkills || extractedSkills.length === 0) {
//         extractedSkills = extractSkillsRuleBased(rawText);
//         console.log("Rule-based extracted skills:", extractedSkills);
//       }
//     } catch (error) {
//       console.error("Text extraction or fetch failed:", error.message, error.response?.status);
//       // Proceed with resumeUrl even if extraction fails
//     }

//     // Update User
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { resumeUrl, extractedSkills },
//       { new: true }
//     ).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Resume uploaded successfully",
//       resumeUrl,
//       extractedSkills,
//       user,
//     });
//   } catch (error) {
//     console.error("Resume upload/extract error:", error.message, error.stack);
//     let status = 500;
//     let message = "Server error";
//     if (error.message.includes("Cloudinary") || error.message.includes("401")) {
//       message = "Failed to access resume from Cloudinary";
//       status = 502;
//     } else if (error.message.includes("resume URL")) {
//       message = "Invalid resume URL";
//       status = 400;
//     } else if (error.message.includes("extract text") || error.message.includes("PDF")) {
//       message = "Failed to process resume";
//       status = 400;
//     } else if (error.message.includes("authenticated applicants")) {
//       status = 403;
//     }
//     return res.status(status).json({ success: false, message });
//   }
// };
// export const uploadResumeAndExtract = async (req, res) => {
//   try {
//     // Validate user and role
//     // if (!req.user || req.user.role !== "applicant") {
//     //   return res.status(403).json({
//     //     success: false,
//     //     message: "Only applicants can upload resumes",
//     //   });
//     // }

//     if (!req.file || !req.file.path) {
//       console.error("No file or path:", req.file);
//       return res.status(400).json({
//         success: false,
//         message: "Resume file upload failed",
//       });
//     }

//     const resumeUrl = req.file.secure_url || req.file.path;
//     console.log("Cloudinary resumeUrl:", resumeUrl);

//     // Validate URL
//     try {
//       new URL(resumeUrl);
//     } catch (error) {
//       console.error("Invalid Cloudinary URL:", resumeUrl);
//       return res.status(400).json({
//         success: false,
//         message: "Invalid resume URL from Cloudinary",
//       });
//     }

//     // Extract text (with fallback)
//     let rawText = "";
//     let extractedSkills = [];
//     try {
//       const response = await axios.get(resumeUrl, {
//         responseType: "arraybuffer",
//       });
//       const file = {
//         buffer: response.data,
//         mimetype: req.file.mimetype,
//       };

//       rawText = await extractTextFromFile(file);

//       // Extract skills (AI first, fallback to rule-based)
//       extractedSkills = await aiExtractSkills(rawText).catch(() => []);
//       if (!extractedSkills || extractedSkills.length === 0) {
//         extractedSkills = extractSkillsRuleBased(rawText);
//       }
//     } catch (error) {
//       console.error("Text extraction failed:", error.message);
//       // Proceed with resumeUrl even if extraction fails
//     }

//     // Update User
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { resumeUrl, extractedSkills },
//       { new: true }
//     ).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Resume uploaded successfully",
//       resumeUrl,
//       extractedSkills,
//       user,
//     });
//   } catch (error) {
//     console.error("Resume upload/extract error:", error.message, error.stack);
//     let status = 500;
//     let message = "Server error";
//     if (error.message.includes("Cloudinary")) {
//       message = "Failed to upload resume to Cloudinary";
//       status = 502;
//     } else if (error.message.includes("resume URL")) {
//       message = "Invalid resume URL";
//       status = 400;
//     } else if (
//       error.message.includes("extract text") ||
//       error.message.includes("PDF")
//     ) {
//       message = "Failed to process resume";
//       status = 400;
//     } else if (error.message.includes("Only applicants")) {
//       status = 403;
//     }
//     return res.status(status).json({ success: false, message });
//   }
// };
//-----------------------------------------------------------------------------------------------
// export const uploadResumeAndExtract = async (req, res) => {
//   try {
//     // // Validate user and role
//     // if (!req.user || req.user.role !== "applicant") {
//     //   return res.status(403).json({
//     //     success: false,
//     //     message: "Only applicants can upload resumes",
//     //   });
//     // }
//     if (!req.file) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Resume file required" });
//     }

//     // Upload to Cloudinary
//     const uploaded = await uploadBufferToCloudinary(
//       req.file.buffer,
//       "resumes",
//       req.user.id
//     );
//     const resumeUrl = uploaded.secure_url;

//     // Extract text
//     const rawText = await extractTextFromFile(req.file);

//     // Extract skills (AI first, fallback to rule-based)
//     let skills = await aiExtractSkills(rawText).catch(() => []);
//     if (!skills || skills.length === 0) {
//       skills = extractSkillsRuleBased(rawText);
//     }

//     // Update User
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { resumeUrl, extractedSkills: skills },
//       { new: true }
//     ).select("-password");

//     return res.status(200).json({
//       success: true,
//       message: "Resume uploaded & skills extracted",
//       resumeUrl,
//       extractedSkills: skills,
//       user,
//     });
//   } catch (e) {
//     console.error("Resume upload/extract error:", e.message, e.stack);
//     let message = "Server error";
//     if (e.message.includes("Cloudinary"))
//       message = "Failed to upload resume to Cloudinary";
//     else if (e.message.includes("PDF")) message = "Failed to process resume";
//     return res.status(500).json({ success: false, message });
//   }
// };
//----------------------------------------------------------------------------------------------------
// const percentMatch = (required = [], have = []) => {
//   const R = new Set((required || []).map((s) => s.toLowerCase()));
//   if (R.size === 0) return 0;
//   const H = new Set((have || []).map((s) => s.toLowerCase()));
//   let hit = 0;
//   for (const r of R) if (H.has(r)) hit++;
//   return Math.round((hit / R.size) * 100);
// };
// // POST /api/applicant/jobs/:jobId/apply
// export const applyToJob = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const jobId = req.params.jobId;
//     // check if job ID is provided
//     if (!jobId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Job ID is required" });
//     }
//     // check if user is authenticated
//     if (!req.user || req.user.role !== "applicant") {
//       return res.status(403).json({ success: false, message: "Access denied" });
//     }

//     // check if user has already applied
//     const existingApplication = await Application.findOne({
//       applicant: userId,
//       job: jobId,
//     });
//     if (existingApplication) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Already applied to this job" });
//     }
//     // check if job exists
//     const job = await Job.findById(jobId);
//     if (!job || job.status !== "Open") {
//       return res
//         .status(404)
//         .json({ success: false, message: "Job not found / Open" });
//     }
//     // create new application
//     const newApplication = await Application.create({
//       applicant: userId,
//       job: jobId,
//       matchScore: percentMatch(
//         job.skillsRequired,
//         job.applications.map((app) => app.applicant.extractedSkills || [])
//       ),
//     });
//     // update job applications
//     job.applications.push(newApplication._id);
//     await job.save();

//     return res
//       .status(201)
//       .json({ success: true, message: "Applied successfully" });
//   } catch (error) {
//     console.error("Application Error:", error.message, error.stack);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// GET /api/applicant/appliedApplications
export const getJobApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await Application.find({ applicant: userId })
      .populate("job")
      .lean();
    if (!applications) {
      return res
        .status(404)
        .json({ success: false, message: "No applications found" });
    }
    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get Applications Error:", error.message, error.stack);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// PATCH /api/applications/:applicationId/status
export const updateStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    // Validate applicationId
    if (!mongoose.isValidObjectId(applicationId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid application ID" });
    }

    // Validate status
    const validStatuses = [
      "Applied",
      "Reviewed",
      "Shortlisted",
      "Rejected",
      "Hired",
    ];
    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Status is required" });
    }
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    // Find application
    const application = await Application.findById(applicationId).populate({
      path: "applicant",
      select: "fullName email",
    });
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    // Verify job ownership
    const job = await Job.findById(application.job);
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Associated job not found" });
    }
    if (req.user.role !== "recruiter") {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized: Not your job" });
    }

    // Update status
    application.status = status;
    application.updatedAt = Date.now();
    await application.save();

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      application,
    });
  } catch (error) {
    console.error("Update Status Error:", error.message, error.stack);
    let message = "Server error";
    if (error.name === "CastError") message = "Invalid application ID format";
    return res.status(500).json({ success: false, message });
  }
};
// export const updateStatus = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
//     const { status } = req.body;

//     const validStatuses = [
//       "Applied",
//       "Reviewed",
//       "Shortlisted",
//       "Rejected",
//       "Hired",
//     ];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     const application = await Application.findByIdAndUpdate(
//       applicationId,
//       { status, updatedAt: Date.now() },
//       { new: true }
//     ).populate("applicant", "name email");

//     if (!application)
//       return res.status(404).json({ message: "Application not found" });

//     res.status(200).json({ message: "Status updated", application });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error updating status", error: error.message });
//   }
// };

// const percentMatch = (required = [], have = []) => {
//   const R = new Set((required || []).map((s) => s.toLowerCase()));
//   if (R.size === 0) return 0;
//   const H = new Set((have || []).map((s) => s.toLowerCase()));
//   let hit = 0;
//   for (const r of R) if (H.has(r)) hit++;
//   return Math.round((hit / R.size) * 100);
// };
// GET /api/applications/job/:jobId
export const getRankedApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.isValidObjectId(jobId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid job ID" });
    }

    const job = await Job.findById(jobId)
      .populate({
        path: "applications",
        populate: {
          path: "applicant",
          select: "fullName email extractedSkills resumeUrl",
        },
      })
      .lean();

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (req.user.role !== "recruiter") {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized: Not your job" });
    }

    const ranked = (job.applications || [])
      .filter((app) => app.applicant) // ✅ Null check
      .map((app) => ({
        _id: app._id,
        applicant: {
          id: app.applicant?._id,
          name: app.applicant?.fullName,
          email: app.applicant?.email,
          extractedSkills: app.applicant?.extractedSkills || [],
          resumeUrl: app.applicant?.resumeUrl,
        },
        matchPercent: app.matchScore || 0,
        status: app.status || "Pending",
        appliedAt: app.appliedAt,
      }))
      .sort((x, y) => y.matchPercent - x.matchPercent);

    res.json({
      success: true,
      jobId: job._id,
      jobTitle: job.title,
      requiredSkills: job.skillsRequired || [],
      applications: ranked,
    });
  } catch (e) {
    console.error("Get Ranked Applicants Error:", e.message, e.stack);
    let message = "Server error";
    if (e.name === "CastError") message = "Invalid job ID format";
    return res.status(500).json({ success: false, message });
  }
};

// const extractTextFromFile = async (file) => {
//   console.log("DEBUG file:", file);

//   if (file.mimetype === "application/pdf") {
//     if (!file.buffer) {
//       throw new Error(
//         "File buffer missing. Did you set multer.memoryStorage()?"
//       );
//     }
//     const data = await pdfParse(file.buffer);
//     return data.text || "";
//   }
//   return "";
// };

// DOC/DOCX:
// return new Promise((resolve, reject) => {
//   textract.fromBufferWithMime(file.mimetype, file.buffer, (err, text) => {
//     if (err) return reject(err);
//     resolve(text || "");
//   });
// });
// };

// POST /api/applicant/resume
// export const uploadResumeAndExtract = async (req, res) => {
//   try {
//     if (!req.file)
//       return res.status(400).json({ success: false, message: "No file" });

//     // 1) upload to cloudinary
//     const uploaded = await uploadBufferToCloudinary(req.file.buffer, "resumes");
//     const resumeUrl = uploaded.secure_url;

//     // 2) extract text
//     const rawText = await extractTextFromFile(req.file);

//     // 3) extract skills (AI first fallback to rule-based)
//     let skills = await aiExtractSkills(rawText);
//     // if (!skills || skills.length === 0) {
//     //   skills = extractSkillsRuleBased(rawText);
//     // }

//     // 4) save to user
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { resumeUrl, extractedSkills: skills },
//       { new: true }
//     ).select("-password");

//     return res.status(200).json({
//       success: true,
//       message: "Resume uploaded & skills extracted",
//       resumeUrl,
//       extractedSkills: skills,
//       user,
//     });
//   } catch (e) {
//     console.error("Resume upload/extract error:", e);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };
