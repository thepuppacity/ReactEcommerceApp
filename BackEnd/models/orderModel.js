// orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        },
        categoryName: { type: String, required: true },
      },
    ],
    transaction_id: { type: String, required: true },
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    status: {
      type: String,
      default: "Not Processed",
      enum: ["Not Processed", "Processed", "Shipped", "Delivered", "Cancelled"],
    },
    paymentStatus: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Success", "Failed"],
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
