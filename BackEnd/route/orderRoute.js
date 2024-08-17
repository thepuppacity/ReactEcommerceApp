import express from "express";
import {
  createOrderController,
  getAdminOrdersController,
  getUserOrdersController,
  orderStatusController,
} from "../controller/orderController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// create order
router.post("/createorder", requireSignIn, createOrderController);

// user orders
router.get("/user-orders", requireSignIn, getUserOrdersController);

// admin orders
router.get("/admin-orders", requireSignIn, isAdmin, getAdminOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
