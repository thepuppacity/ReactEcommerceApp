import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./route/authRoute.js";
import categoryRoutes from "./route/categoryRoute.js";
import productRoutes from "./route/productRoute.js";
import cors from "cors";
import stripeRoutes from "../BackEnd/route/stripeRoute.js";
import orderRoutes from "../BackEnd/route/orderRoute.js";

// configure env
dotenv.config();

// config or connect database
connectDB();

// rest object
const app = express();

// configure morgan / middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/payment", stripeRoutes);
app.use("/api/v1/order", orderRoutes);

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to E-Commerce App MERN stack project</h1>");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Server Error",
  });
});

// port

// React port => 3000
// Angular port => 4200
// Node port => 8000 / 8080

const { PORT, NODE_ENV } = process.env;

// run listen
app.listen(PORT, () => {
  console.log(
    `Server running in ${NODE_ENV} mode on http://localhost:${PORT}`.bgCyan
      .white
  );
});
