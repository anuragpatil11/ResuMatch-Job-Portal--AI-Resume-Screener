import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // Normalize emails
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], // Basic email validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Enforce minimum length
    },
    role: {
      type: String,
      enum: ["applicant", "recruiter"],
      default: "applicant",
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Please use a valid phone number"], // Optional E.164 format
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      trim: true,
    },
    // For Applicants only
    extractedSkills: {
      type: [String],
      default: [],
    },
    resumeUrl: {
      type: String, // URL or path to stored resume (e.g., S3 link)
    },
    // For tracking
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
