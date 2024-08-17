import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./Components/Layout/Routes/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profiles from "./pages/user/Profiles";
import { AuthProvider } from "./Context-API/Auth"; // Import AuthProvider
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import Cart from "./pages/Cart";
import PaymentSuccess from "./pages/PaymentSuccess";
import AdminOrders from "./pages/Admin/AdminOrders";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:slug" element={<CategoryProduct />} />
          <Route path="/searchproduct" element={<Search />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admindashboard" element={<AdminRoute />} />
          <Route
            path="/admindashboard/createcategory"
            element={<CreateCategory />}
          />
          <Route
            path="/admindashboard/createproduct"
            element={<CreateProduct />}
          />
          <Route
            path="/admindashboard/updateproduct/:slug"
            element={<UpdateProduct />}
          />
          <Route path="/admindashboard/products" element={<Products />} />
          <Route path="/admindashboard/users" element={<Users />} />
          <Route path="/admindashboard/adminorders" element={<AdminOrders />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/profiles" element={<Profiles />} />
          <Route path="/complete" element={<PaymentSuccess />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
