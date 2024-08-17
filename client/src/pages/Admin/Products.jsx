import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/products/getproduct"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // life cycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard - All Products"}>
      <div className="flex mt-4 pl-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4 px-4">
            <h1 className="text-center text-4xl mb-4">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products?.map((p) => (
                <Link
                  to={`/admindashboard/updateproduct/${p.slug}`}
                  key={p._id}
                  className="block hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={`http://localhost:8080/api/v1/products/productphoto/${p._id}`}
                      className="w-full h-48 object-cover"
                      alt={p.name}
                    />
                    <div className="p-4">
                      <h5 className="text-xl font-semibold">{p.name}</h5>
                      <p className="text-gray-700">{p.description}</p>
                      <p className="text-green-600 font-bold">${p.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
