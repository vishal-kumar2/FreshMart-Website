import { Router } from "express";
import {
  Register,
  Login,
  logoutUser,
  getProfile,
  getAllUsers,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = Router();

/* ================= PUBLIC ROUTES ================= */
router.post("/register", Register);
router.post("/login", Login);

/* ================= PROTECTED ROUTES ================= */
// authMiddleware runs BEFORE logoutUser
router.post("/logout", authMiddleware, logoutUser);
router.get('/profile',authMiddleware,getProfile)

router.get("/", authMiddleware, adminMiddleware, getAllUsers);

export const users= router;
