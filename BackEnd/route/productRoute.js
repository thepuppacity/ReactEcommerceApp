import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createNewProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  searchProductController,
  relatedProductController,
  updateProductController,
  productCategoryController,
} from "../controller/productController.js";
import ExpressFormidable from "express-formidable";

const router = express.Router();

// routes

// create product
router.post(
  "/createnewproduct",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createNewProductController
);

// update product
router.put(
  "/updateproduct/:slug",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  updateProductController
);

// get products
router.get("/getproduct", getProductController);

// single product
router.get("/singleproduct/:slug", getSingleProductController);

// get photo
router.get("/productphoto/:pid", productPhotoController);

// delete product
router.delete("/deleteproduct/:pid", deleteProductController);

// filter product
router.post("/productfilters", productFiltersController);

// product count
router.get("/productcount", productCountController);

// product per page
router.get("/productlist/:page", productListController);

// search product
router.get("/searchproduct/:keyword", searchProductController);

// similar product
router.get("/relatedproduct/:pid/:cid", relatedProductController);

// category wise product
router.get("/productcategory/:slug", productCategoryController)

export default router;
