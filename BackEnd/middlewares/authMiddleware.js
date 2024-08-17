import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Route token base

export const requireSignIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access, no token provided",
      });
    }
    const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode; // Ensure this contains _id
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Unauthorized access",
    });
  }
};

// Admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in Admin middleware",
    });
  }
};
