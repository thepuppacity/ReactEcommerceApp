import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import mongoose from "mongoose";

// create order

export const createOrderController = async (req, res) => {
  try {
    const { products, transaction_id, amount, address } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Products are required and should be a non-empty array",
      });
    }

    const validProducts = await Promise.all(
      products.map(async (item) => {
        const trimmedName = item.name.trim();
        const product = await Product.findOne({
          name: new RegExp(`^${trimmedName}$`, "i"),
        }).populate("category");
        if (!product) {
          throw new Error(`Product with name ${item.name} not found`);
        }
        const category = await Category.findById(product.category._id);
        return {
          product: product._id,
          name: product.name,
          quantity: item.quantity,
          category: product.category._id,
          categoryName: category.name,
        };
      })
    );

    const order = new Order({
      products: validProducts,
      transaction_id,
      amount,
      address,
      user: req.user._id, // Use req.user._id from the requireSignIn middleware
      paymentStatus: "Success", // Set paymentStatus to "Success"
    });
    await order.save();

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};

// User Orders

export const getUserOrdersController = async (req, res) => {
  try {
    // Check if req.user._id is already a valid ObjectId
    const userId = mongoose.Types.ObjectId.isValid(req.user._id)
      ? new mongoose.Types.ObjectId(req.user._id)
      : req.user._id;

    console.log("Fetching orders for user:", userId);

    const orders = await Order.find({ user: userId })
      .populate("products.product", "name price photo") // Populate with product photo
      .populate("products.category", "name");

    console.log("Orders found:", orders);

    if (orders.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No orders found", orders: [] });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching orders", error });
  }
};

// Admin Orders

export const getAdminOrdersController = async (req, res) => {
  try {
    const ordersQuery = Order.find({});
    console.log("Orders Query:", ordersQuery); // Log the query object

    const testOrders = await Order.find({}).exec();
    console.log("Test Orders:", testOrders);

    const orders = await ordersQuery
      .populate("products.product", "name price photo")
      .populate("products.category", "name")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    console.log("Fetched Orders:", orders); // Log the fetched orders

    if (!orders.length) {
      return res.status(200).json({
        success: true,
        message: "No orders found",
        orders: [],
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// order status update

export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate the status if necessary
    const validStatuses = ["Pending", "Shipped", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Return the updated document
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Error while updating order status",
      error: error.message,
    });
  }
};

