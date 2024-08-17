import express from "express";
import {
  stripePaymentController,
  paymentCompleteController,
  paymentCancelController,
} from "../controller/stripeController.js";

const router = express.Router();

// Stripe Payment
router.post("/stripe-payment", stripePaymentController);

// Payment Controller
router.get("/complete", paymentCompleteController);

// Payment Cancel
router.get("/cancel", paymentCancelController);

export default router;
