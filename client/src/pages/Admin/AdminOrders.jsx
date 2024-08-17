import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import moment from "moment";
import { useAuth } from "../../Context-API/Auth";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [changeStatus, setChangeStatus] = useState("");
  const auth = useAuth();

  useEffect(() => {
    const fetchAdminOrders = async () => {
      try {
        const token = localStorage.getItem("auth")
          ? JSON.parse(localStorage.getItem("auth")).token
          : null;

        if (!token) {
          throw new Error("No token found");
        }

        const { data } = await axios.get(
          "http://localhost:8080/api/v1/order/admin-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.success) {
          setOrders(data.orders);
        } else {
          toast.error(data.message || "Failed to fetch admin orders");
        }
      } catch (error) {
        toast.error("Error fetching admin orders");
        console.error("Error fetching admin orders:", error);
      }
    };

    fetchAdminOrders();
  }, []);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/order/order-status/${orderId}`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("auth")
                ? JSON.parse(localStorage.getItem("auth")).token
                : ""
            }`,
          },
        }
      );

      if (data.success) {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: value } : order
        );
        setOrders(updatedOrders);
        toast.success("Order status updated successfully");
      } else {
        toast.error(data.message || "Failed to update order status");
      }
    } catch (error) {
      toast.error("Error updating order status");
      console.error("Error updating order status:", error);
    }
  };

  const status = ["Pending", "Shipped", "Delivered", "Cancelled"];

  return (
    <Layout title={"Admin Orders"}>
      <div className="flex flex-col md:flex-row mt-4 pl-6">
        <div className="w-full md:w-1/4">
          <AdminMenu />
        </div>
        <div className="w-full md:w-3/4 px-4">
          <h1 className="text-center text-4xl mb-4">All Orders</h1>
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Product Name</th>
                    <th className="py-2 px-4 text-left">Product Image</th>
                    <th className="py-2 px-4 text-left">Product Price</th>
                    <th className="py-2 px-4 text-left">Quantity</th>
                    <th className="py-2 px-4 text-left">Amount</th>
                    <th className="py-2 px-4 text-left">Payment Status</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Address</th>
                    <th className="py-2 px-4 text-left">Transaction ID</th>
                    <th className="py-2 px-4 text-left">User</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="py-2 px-4">
                        <ul>
                          {order.products.map((product, index) => (
                            <li key={index}>
                              <strong>{product.product.name}</strong>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-2 px-4">
                        <ul>
                          {order.products.map((product, index) => (
                            <li key={index}>
                              <img
                                src={`http://localhost:8080/api/v1/products/productphoto/${product.product._id}`}
                                alt={product.product.name}
                                className="w-24 h-24 object-cover rounded"
                              />
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-2 px-4">
                        <ul>
                          {order.products.map((product, index) => (
                            <li key={index}>${product.product.price}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-2 px-4">
                        <ul>
                          {order.products.map((product, index) => (
                            <li key={index}>{product.quantity}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-2 px-4">${order.amount}</td>
                      <td className="py-2 px-4">
                        {order.paymentStatus === "Success"
                          ? "Success"
                          : "Failed"}
                      </td>
                      <td className="py-2 px-4">
                        <Select
                          bordered={false}
                          onChange={(value) => {
                            handleChange(order._id, value);
                          }}
                          defaultValue={order.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td className="py-2 px-4">
                        {moment(order.createdAt).format("MMMM Do YYYY")}
                      </td>
                      <td className="py-2 px-4">{order.address}</td>
                      <td className="py-2 px-4">{order.transaction_id}</td>
                      <td className="py-2 px-4">
                        {order.user.name} ({order.user.email})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-600">No orders found</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
