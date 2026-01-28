import { Router } from "express";
import { upload } from "../middleware/uploadMiddleWare.js";
import { uploadImage } from "../controllers/uploadController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = Router();

router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  uploadImage
);

export default router;
