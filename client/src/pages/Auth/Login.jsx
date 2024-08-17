import React, { useState } from "react";
import axios from "axios";
import Layout from "../../Components/Layout/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../Context-API/Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success("Login successful");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        // Navigate to the appropriate dashboard based on user role
        if (res.data.user.role === "admin") {
          navigate("/admindashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login - ECommerce App">
      <div className="register">
        <h1 className="text-3xl">Login Page</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Your E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="position-absolute end-0 top-50 translate-middle-y me-3"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <br />
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password?
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
