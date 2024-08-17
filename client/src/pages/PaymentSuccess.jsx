import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import { useCart } from "../Context-API/CartAuth";
import { useAuth } from "../Context-API/Auth"; // Import useAuth hook
import axios from "axios";

const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [orderCreated, setOrderCreated] = useState(false);
  const { auth } = useAuth(); // Access auth object

  useEffect(() => {
    const createOrder = async () => {
      const user = auth?.user?._id; // Ensure the correct user ID is passed here
      console.log("User ID in PaymentSuccess:", user);

      // Exit if order is already created or sessionId is missing
      if (orderCreated || !sessionId) return;

      try {
        const { data } = await axios.post(
          "http://localhost:8080/api/v1/order/createorder",
          {
            products: cart.map((item) => ({
              product: item._id,
              name: item.name,
              quantity: item.quantity,
              category: item.category._id,
              categoryName: item.category.name,
            })),
            transaction_id: sessionId,
            amount: cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ),
            address: auth?.user?.address || "Address not available", // Use address from auth
            user: user, // Pass the correct user ID here
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`, // Corrected Authorization header syntax
            },
          }
        );

        console.log("Order created:", data);

        setOrderCreated(true);
        setCart([]);
        localStorage.removeItem("cart");

        setTimeout(() => {
          navigate("/dashboard/orders");
        }, 7000);
      } catch (error) {
        console.error("Error creating order:", error);
      }
    };

    createOrder();
  }, [navigate, setCart, cart, sessionId, orderCreated, auth]); // Add auth to dependencies

  return (
    <Layout>
      <h1 className="text-3xl">Payment Successful</h1>
      <p>Your payment was successful. Your session ID is {sessionId}.</p>
      <p>You'll be directed to the Orders page after 7 seconds.</p>
      <button
        className="btn btn-primary"
        onClick={() => navigate("/dashboard/orders")}
      >
        View Orders
      </button>
    </Layout>
  );
};

export default PaymentSuccess;
