import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Context-API/Auth";
import axios from "axios";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context-API/CartAuth";
import toast from "react-hot-toast";

const HomePage = () => {
  const { auth, setAuth } = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [showHomePageData, setShowHomePageData] = useState(false);
  const [showCategoryId, setShowCategoryId] = useState(false);
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    }
  };

  // get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/productcount`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get all products with Pagination
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/productlist/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // life cycle of checked and radio
  useEffect(() => {
    if (checked.length === 0 && radio.length === 0) {
      getAllProducts();
    }
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length > 0 || radio.length > 0) {
      filteredProducts();
    }
  }, [checked, radio]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/productlist/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter handle
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // filtered products
  const filteredProducts = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/products/productfilters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      <br />
      <button
        className="btn btn-primary ms-1"
        onClick={() => setShowHomePageData(!showHomePageData)}
      >
        Click the Toggle button to see HomePage Data
      </button>
      <br />
      {showHomePageData && <pre>{JSON.stringify(auth, null, 4)}</pre>}

      <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Category filter */}
        <div className="col-span-1">
          <h6 className="text-center text-xl">Filter by Category</h6>
          {categories?.map((c) => (
            <Checkbox
              className="pl-28"
              key={c._id}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
            >
              {c.name}
            </Checkbox>
          ))}
          <button
            className="btn btn-primary ms-1 mt-2"
            onClick={() => setShowCategoryId(!showCategoryId)}
          >
            Toggle Category ID
          </button>
          {showCategoryId && (
            <div className="text-center mt-2">
              Category Id : {JSON.stringify(checked, null, 4)}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="col-span-1">
          <h6 className="text-center text-xl">Filter by Price</h6>
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices?.map((p) => (
              <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
          <button
            className="btn btn-primary ms-1 mt-2"
            onClick={() => setShowPriceRange(!showPriceRange)}
          >
            Toggle Price Range
          </button>
          {showPriceRange && (
            <div className="text-center mt-2">
              Price Range : {JSON.stringify(radio, null, 4)}
            </div>
          )}
        </div>
        <br />
        <div className="col-span-4">
          <button
            className="btn btn-danger ml-1"
            onClick={() => window.location.reload()}
          >
            Reset Filters
          </button>
          <h1 className="text-center text-4xl mb-4">All Products</h1>
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
                      className="btn btn-info mt-2 ml-2 text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/admindashboard/updateproduct/${p.slug}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-success mt-2 ml-2 text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
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
      </div>

      <div className="m-2 p-3">
        {products && products.length < total && (
          <button
            className="btn btn-warning"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            {loading ? "Loading ..." : "Load More"}
          </button>
        )}
      </div>
      {/* Total Count / Number of Products */}
      <div>
        <br />
        <h1 className="text-3xl">Total Number of Products : {total}</h1>
      </div>
    </Layout>
  );
};

export default HomePage;
