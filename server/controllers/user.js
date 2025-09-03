import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role, phone, location, dateOfBirth } =
      req.body;

    if (!fullName || !email || !phone || !password || !dateOfBirth) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled.",
      });
    }

    // check user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered with this email.",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    // create new user
    const newUser = await User.create({
      fullName,
      email,
      password: hashPassword,
      role: role || "applicant", // Default to applicant
      phone,
      location,
      dateOfBirth,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Input validation
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Email, password, and role are required" });
    }

    // Validate JWT_SECRET
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // Find user (case-insensitive email)
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Prepare user data for response
    const userData = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      location: user.location,
      phoneNumber: user.phone,
    };

    // Set cookie
    res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none", // ✅ must be "none" for cross-site cookies
      })
      .cookie("role", user.role, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none", // ✅ must be "none"
      })
      .json({
        success: true,
        message: `Welcome back ${userData.fullName}`,
        user: userData,
        token,
      });
  } catch (err) {
    console.error("Login error:", err.message); // Log for debugging
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Get userId from the request (set by auth middleware)
    const user = await User.findById(userId).select("-password"); // Exclude password from the response

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
