import React, { useState } from "react";
import { useCart } from "../Context-API/CartAuth";
import { useAuth } from "../Context-API/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Components/Layout/Layout";

const Cart = () => {
  const { auth } = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [showToken, setShowToken] = useState(false);

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete items from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // handle checkout
  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/payment/stripe-payment",
        {
          items: cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: 1, // Set the quantity, you can customize as needed
          })),
        }
      );
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          {/* Admin name and Token  */}
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <button
              className="btn btn-primary ms-1"
              onClick={() => setShowToken(!showToken)}
            >
              Click the Toggle button to see Details of JSON Web Token
            </button>
            <br />
            <br />
            {showToken && <div className="text-center">{auth?.token}</div>}
            <h1 className="text-center">
              {cart?.length
                ? `You have ${cart?.length} items in your cart ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : "Your cart is empty"}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {/* items shown and remove from cart  */}
            <div className="row">
              {cart?.map((p) => (
                <div className="row mb-2 card flex-row" key={p._id}>
                  <div className="col-md-6">
                    <img
                      src={`http://localhost:8080/api/v1/products/productphoto/${p._id}`}
                      className="w-full h-48 object-cover"
                      alt={p.name}
                      width="100px"
                      height="100px"
                    />
                  </div>
                  <div className="col-md-6">
                    <h4>{p.name}</h4>
                    <p className="text-gray-700">
                      {p.description.substring(0, 30)}
                    </p>
                    <p className="text-green-600 font-bold">${p.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Cart Summary  */}
          <div className="col-md-4">
            <br />
            <h1 className="text-3xl">Cart Summary</h1>
            <br />
            <hr />
            <br />
            <p className="text-2xl">Total | Checkout | Payment</p>
            <br />
            <p className="text-xl">Total : {totalPrice()} </p>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address : {auth?.user?.address} </h4>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate(`/dashboard/profiles`)}
                  >
                    Update Address
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate(`/dashboard/profiles`)}
                    >
                      Update
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate(`/login`, { state: "/cart" })}
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
