import express from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
} from "../controllers/user.js";
import { isAuthenticate } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", isAuthenticate, getUserProfile);
export default router;
