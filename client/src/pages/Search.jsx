import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import { useSearch } from "../Context-API/SearchAuth";
import { useCart } from "../Context-API/CartAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [{ keyword, results }] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {results.length < 1
              ? "No Products Found"
              : `Found ${results.length} products for "${keyword}"`}
          </h6>
          <div className="row">
            {results.map((product) => (
              <div className="col-md-4" key={product._id}>
                <div className="block hover:shadow-lg transition-shadow duration-200">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={`http://localhost:8080/api/v1/products/productphoto/${product._id}`}
                      className="w-full h-48 object-cover"
                      alt={product.name}
                    />
                    <div className="p-4">
                      <h5 className="text-xl font-semibold">{product.name}</h5>
                      <p className="text-gray-700">
                        {product.description.substring(0, 20)}...
                      </p>
                      <p className="text-green-600 font-bold">${product.price}</p>
                      <Link to={`/product/${product.slug}`}>
                        <button className="btn btn-primary mt-2">
                          See Details
                        </button>
                      </Link>
                      <button
                        className="btn btn-success mt-2 ml-2 text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setCart([...cart, product]);
                          toast.success("Item added to Cart");
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;





