import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
} from "../controller/authController.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// Forgot Password
router.post("/forgot-password", forgotPasswordController);

// test routes (add middlewares as much as you want before testCOntroller
// and after url ("/test"))
router.get("/test", requireSignIn, isAdmin, testController);

// Protected Route Auth (user)
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected Route Auth (admin)
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfileController);

export default router;
