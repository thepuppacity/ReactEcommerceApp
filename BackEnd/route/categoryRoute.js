import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controller/categoryController.js";

const router = express.Router();

// // Routes

// Create Category
router.post(
  "/createcategory",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// Update Category
router.put(
  "/updatecategory/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// Get All Categories
router.get("/categories", categoryController);

// single category
router.get("/singlecategory/:slug", singleCategoryController);

// delete category
router.delete(
  "/deletecategory/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
