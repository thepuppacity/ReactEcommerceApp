import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(""); // Initialize as empty string
  const [photo, setPhoto] = useState("");

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

  // create handle

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        `http://localhost:8080/api/v1/products/createnewproduct`,
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

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="flex mt-4 pl-6">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="pl-6 text-4xl">Create Product</h1>
          {/* mapping categories option  */}
          <div className="m-1 w-75">
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
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
            {/* image preview  */}
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
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
              <button className="btn btn-primary" onClick={handleCreate}>
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
