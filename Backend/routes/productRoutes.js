import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { upload } from "../middleware/uploadMiddleWare.js";


const router = Router();

/* ================= PUBLIC ROUTES ================= */
router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);

/* ================= ADMIN ROUTES ================= */
router.post(
  "/products/add",
  authMiddleware,
  adminMiddleware,
  upload.single("image"), // 🔥 THIS LINE IS REQUIRED
  createProduct
);


router.put(
  "/products/:id",
  authMiddleware,
  adminMiddleware,
  updateProduct
);

router.delete(
  "/products/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);

export const products= router;
