import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import slugify from "slugify";

// Create New Product
export const createNewProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    if (!name) return res.status(400).send({ error: "Name is required" });
    if (!description)
      return res.status(400).send({ error: "Description is required" });
    if (!price) return res.status(400).send({ error: "Price is required" });
    if (!category)
      return res.status(400).send({ error: "Category is required" });
    if (!quantity)
      return res.status(400).send({ error: "Quantity is required" });
    if (shipping === undefined)
      return res.status(400).send({ error: "Shipping is required" });
    if (photo && photo.size > 1000000)
      return res.status(400).send({ error: "Photo should be less than 1MB" });

    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in creating Product",
      error: error.message,
    });
  }
};

// Update Product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    if (!name) return res.status(400).send({ error: "Name is required" });
    if (!description)
      return res.status(400).send({ error: "Description is required" });
    if (!price) return res.status(400).send({ error: "Price is required" });
    if (!category)
      return res.status(400).send({ error: "Category is required" });
    if (!quantity)
      return res.status(400).send({ error: "Quantity is required" });
    if (shipping === undefined)
      return res.status(400).send({ error: "Shipping is required" });
    if (photo && photo.size > 1000000)
      return res.status(400).send({ error: "Photo should be less than 1MB" });

    const product = await productModel.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      product, // this goes to the database MongoDB file
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in updating Product",
      error: error.message,
    });
  }
};

// Get Products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All Products",
      products, // this goes to the frontend file Products.jsx file
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

// Get Single Product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product fetched",
      product, // this goes to the frontend file Products.jsx and ProductDetails.jsx
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error: error.message,
    });
  }
};

// Get Photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product && product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    res.status(404).send({
      success: false,
      message: "Product photo not found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting Product Photo",
      error: error.message,
    });
  }
};

// Delete Product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Product",
      error: error.message,
    });
  }
};

// Product Filters
export const productFiltersController = async (req, res) => {
  const { checked = [], radio = [] } = req.body; // Ensure default values
  let argue = {};
  if (checked.length > 0) argue.category = { $in: checked }; // Use $in for arrays
  if (radio.length === 2) argue.price = { $gte: radio[0], $lte: radio[1] }; // Ensure array length is 2

  try {
    const products = await productModel.find(argue);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching products",
    });
  }
};

// Product Count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error in Product Count",
    });
  }
};

// Product list based on page ( Pagination )

export const productListController = async (req, res) => {
  try {
    const perPage = 7;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      // these are attached to Mongoose
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error per page ctrl",
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const { category } = req.query;

    let query = {
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    if (category && category !== "") {
      query.category = category;
    }

    const results = await productModel.find(query).select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error in search Product API",
    });
  }
};

// Similar Product

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error while getting Similar Products",
    });
  }
};

// get product by category wise

export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category, // goes to frontend file CategoryProduct.jsx
      products, // goes to frontend file CategoryProduct.jsx
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error while getting product by category wise",
    });
  }
};
