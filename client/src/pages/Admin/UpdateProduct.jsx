import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [productId, setProductId] = useState("");

  // get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/singleproduct/${params.slug}`
      );
      const product = data.product;
      setProductId(product._id); // Set product ID
      setName(product.name);
      setCategory(product.category._id);
      setDescription(product.description);
      setPrice(product.price);
      setQuantity(product.quantity);
      setShipping(product.shipping ? "1" : "0");
      setPhotoUrl(
        `http://localhost:8080/api/v1/products/productphoto/${product._id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/categories`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // update handle
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/products/updateproduct/${params.slug}`,
        productData
      );
      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/admindashboard/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Delete Product
  const handleUDelete = async () => {
    try {
      let answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/products/deleteproduct/${productId}`
      );
      if (data?.success) {
        toast.success("Product Deleted successfully");
        navigate("/admindashboard/products");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="flex mt-4 pl-6">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="pl-6 text-4xl">Update Product</h1>
          {/* mapping categories option  */}
          <div className="m-1 w-75">
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              value={category}
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            {/* images  */}
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            {/* Photo preview  */}
            <div className="mb-3">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product Photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={photoUrl}
                    alt="Product Photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Write a Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={description}
                placeholder="Write a Description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={price}
                placeholder="Write a Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={quantity}
                placeholder="Write a Quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <h1>Shipping?</h1>
              <Select
                value={shipping}
                placeholder="Select Shipping"
                className="form-control p-4"
                onChange={(value) => setShipping(value)}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update Product
              </button>
            </div>
            <div className="mb-3">
              <button className="btn btn-danger" onClick={handleUDelete}>
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
