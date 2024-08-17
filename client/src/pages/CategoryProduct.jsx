import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context-API/CartAuth";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/productcategory/${params.slug}`
      );
      setProducts(data?.products); // products come from the backend file productController.js
      setCategory(data?.category); // category comes from the backend file productController.js
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container">
        <h1 className="text-center text-3xl mt-4 mb-4">{category?.name}</h1>
        <div className="row">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((p) => (
              <div
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
                    <p className="text-gray-700">
                      {p.description.substring(0, 20)}...
                    </p>
                    <p className="text-green-600 font-bold">${p.price}</p>
                    <Link to={`/product/${p.slug}`}>
                      <button className="btn btn-primary mt-2">
                        See Details
                      </button>
                    </Link>
                    <button
                      className="btn btn-success mt-2 ml-2 text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setCart([...cart, p]);
                        toast.success("Item added to Cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <h1 className="text-2xl">{products?.length} results found</h1>
      </div>
    </Layout>
  );
};

export default CategoryProduct;









