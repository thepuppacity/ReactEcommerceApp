import { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [showRelatedProductDetails, setShowRelatedProductDetails] =
    useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get single product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/singleproduct/${params.slug}`
      );
      setProduct(data?.product); // product goes to backend productController.js
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle visibility
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggleRelatedProductsDetails = () => {
    setShowRelatedProductDetails(!showRelatedProductDetails);
  };

  // Similar Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/relatedproduct/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {/* Main Div  */}
      <div className="container mx-auto mt-4 px-4">
        {/* Product Details  */}
        <div>
          <h1 className="text-4xl mb-4">Product Details</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            onClick={toggleDetails}
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
          {showDetails && <pre>{JSON.stringify(product, null, 4)}</pre>}
        </div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <img
              src={`http://localhost:8080/api/v1/products/productphoto/${product._id}`}
              className="w-full h-96 object-cover rounded"
              alt={product.name}
            />
          </div>
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-semibold mb-2">{product.name}</h2>
            {product.category && (
              <h2 className="text-xl mb-2">{product.category.name}</h2>
            )}
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-green-600 font-bold text-2xl mb-4">
              ${product.price}
            </p>
          </div>
        </div>
        {/* Similar Products  */}
        <div className="mt-8">
          <h2 className="text-2xl mb-4">Similar Products</h2>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products Found</p>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            onClick={toggleRelatedProductsDetails}
          >
            {showRelatedProductDetails ? "Hide Details" : "Show Details"}
          </button>
          {showRelatedProductDetails && (
            <pre>{JSON.stringify(relatedProducts, null, 4)}</pre>
          )}
          <div className="flex flex-wrap -mx-4">
            {relatedProducts.map((p) => (
              <Link
                to={`/product/${p.slug}`}
                key={p._id}
                className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-4"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  <img
                    src={`http://localhost:8080/api/v1/products/productphoto/${p._id}`}
                    className="w-full h-48 object-cover"
                    alt={p.name}
                  />
                  <div className="p-4">
                    <h5 className="text-xl font-semibold">{p.name}</h5>
                    <p className="text-gray-700 mb-2">
                      {p.description.substring(0, 50)}...
                    </p>
                    <p className="text-green-600 font-bold">${p.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
