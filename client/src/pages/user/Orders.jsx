import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../Context-API/Auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("auth")
          ? JSON.parse(localStorage.getItem("auth")).token
          : null;
        if (!token) throw new Error("No token found");

        const { data } = await axios.get(
          "http://localhost:8080/api/v1/order/user-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.success) {
          setOrders(data.orders);
        } else {
          console.error("Failed to fetch orders:", data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout title={"Your Orders"}>
      <div className="m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-2xl">All Orders</h1>
            <br />
            <br />
            {orders.length > 0 ? (
              <div className="table-responsive w-100">
                <table className="table table-bordered w-50 h-50">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Product Image</th>
                      <th>Product Price</th>
                      <th>Product Quantity</th>
                      <th>Amount</th>
                      <th>Payment Status</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Address</th>
                      <th>Order ID</th>
                      <th>Transaction ID</th>
                      <th>Your ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>
                          <ul>
                            {order.products.map((product, index) => (
                              <li key={index}>
                                <strong>{product.product.name}</strong>
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {order.products.map((product, index) => (
                              <li key={index}>
                                <img
                                  src={`http://localhost:8080/api/v1/products/productphoto/${product.product._id}`}
                                  alt={product.product.name}
                                  width="100px"
                                  height="100px"
                                />
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {order.products.map((product, index) => (
                              <li key={index}>${product.product.price}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {order.products.map((product, index) => (
                              <li key={index}>{product.quantity}</li>
                            ))}
                          </ul>
                        </td>
                        <td>${order.amount}</td>
                        <td>
                          {order.paymentStatus === "Success"
                            ? "Success"
                            : "Failed"}
                        </td>
                        <td>{order.status}</td>
                        <td>
                          {moment(order.createdAt).format("MMMM Do YYYY")}
                        </td>
                        <td>{moment(order.createdAt).format("h:mm:ss a")}</td>
                        <td>{order.address}</td>
                        <td>{order._id}</td>
                        <td>{order.transaction_id}</td>
                        <td>{order.user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No orders found</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;














// import React, { useEffect, useState } from "react";
// import Layout from "../../Components/Layout/Layout";
// import UserMenu from "../../Components/Layout/UserMenu";
// import axios from "axios";
// import moment from "moment";
// import { useAuth } from "../../Context-API/Auth";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const auth = useAuth();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("auth")
//           ? JSON.parse(localStorage.getItem("auth")).token
//           : null;
//         if (!token) throw new Error("No token found");

//         const { data } = await axios.get(
//           "http://localhost:8080/api/v1/order/user-orders",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (data.success) {
//           setOrders(data.orders);
//         } else {
//           console.error("Failed to fetch orders:", data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <Layout title={"Your Orders"}>
//       <div className="m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <UserMenu />
//           </div>
//           <div className="col-md-9">
//             <h1 className="text-2xl">All Orders</h1>
//             <br />
//             <br />
//             {orders.length > 0 ? (
//               <div className="table-responsive w-100">
//                 <table className="table table-bordered w-50 h-50">
//                   <thead>
//                     <tr>
//                       <th>Product Name</th>
//                       <th>Product Image</th>
//                       <th>Product Price</th>
//                       <th>Product Quantity</th>
//                       <th>Amount</th>
//                       <th>Payment Status</th>
//                       <th>Status</th>
//                       <th>Date</th>
//                       <th>Time</th>
//                       <th>Address</th>
//                       <th>Order ID</th>
//                       <th>Transaction ID</th>
//                       <th>Your ID</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {orders.map((order) => (
//                       <tr key={order._id}>
//                         <td>
//                           <ul>
//                             {order.products.map((product, index) => (
//                               <li key={index}>
//                                 <strong>{product.product.name}</strong>
//                               </li>
//                             ))}
//                           </ul>
//                         </td>
//                         <td>
//                           <ul>
//                             {order.products.map((product, index) => (
//                               <li key={index}>
//                                 <img
//                                   src={`http://localhost:8080/api/v1/products/productphoto/${product.product._id}`}
//                                   alt={product.product.name}
//                                   className=""
//                                   width="100px"
//                                   height="100px"
//                                 />
//                               </li>
//                             ))}
//                           </ul>
//                         </td>
//                         <td>
//                           <ul>
//                             {order.products.map((product, index) => (
//                               <li key={index}>${product.product.price}</li>
//                             ))}
//                           </ul>
//                         </td>
//                         <td>
//                           <ul>
//                             {order.products.map((product, index) => (
//                               <li key={index}>{product.quantity}</li>
//                             ))}
//                           </ul>
//                         </td>
//                         <td>${order.amount}</td>
//                         <td>
//                           {order.paymentStatus === "Success"
//                             ? "Success"
//                             : "Failed"}
//                         </td>
//                         <td>{order.status}</td>
//                         <td>
//                           {moment(order.createdAt).format("MMMM Do YYYY")}
//                         </td>
//                         <td>{moment(order.createdAt).format("h:mm:ss a")}</td>
//                         <td>{order.address}</td>
//                         <td>{order._id}</td>
//                         <td>{order.transaction_id}</td>
//                         <td>{order.user}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p>No orders found</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Orders;
