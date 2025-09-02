import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Example: "Software Engineer"
    },
    company: {
      type: String,
      required: true, // Example: "TCS", "Infosys"
    },
    location: {
      type: String,
      required: true, // Example: "Pune", "Bangalore"
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract"],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: [
        "Entry-level",
        "Fresher",
        "0-2 years",
        "2-4 years",
        "5+ years",
        "1-3 years",
        "3-5 years",
        "2-5 years"
      ],
      required: true,
    },
    salaryRange: {
      type: String,
      default: "Not Disclosed",
      match: /^(\₹?\d+[\-\d+]*\s*(LPA|month|year)|Not Disclosed)$/, // Basic format
    },
    skillsRequired: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one skill is required",
      },
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    qualifications: {
      type: [String],
      default: [],
    },
    category: {
      type: String, // e.g., "IT", "Finance" for better AI matching
      default: "General",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User with role 'admin'
      required: true,
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
      validate: {
        validator: (date) => !date || date > new Date(),
        message: "Deadline must be a future date",
      },
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
    applications: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Application",
      default: [],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
