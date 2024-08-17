import React, { useState } from "react";
import axios from "axios";
import Layout from "../../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success("Login successful");
        navigate(location.state || "/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password - ECOmmerce App"}>
      <div className="register">
        <h1 className="text-3xl">Reset Password</h1>
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
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Favourite Pornstar Name"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter Your Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
