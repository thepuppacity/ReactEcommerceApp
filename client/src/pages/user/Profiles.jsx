import React, { useState, useEffect } from "react";
import UserMenu from "../../Components/Layout/UserMenu";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../Context-API/Auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profiles = () => {
  // context
  const { auth, setAuth } = useAuth(); // Destructure correctly

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get user data
  useEffect(() => {
    if (auth?.user) {
      const { name, email, phone, address } = auth.user;
      setName(name || "");
      setEmail(email || "");
      setPhone(phone || "");
      setAddress(address || "");
    }
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/auth/profile`, // Ensure this endpoint matches your backend route
        {
          name,
          email,
          password,
          phone,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`, // Ensure token is included in headers if needed
          },
        }
      );

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data.updatedUser });
        let localStorageData = localStorage.getItem("auth");
        localStorageData = JSON.parse(localStorageData);
        localStorageData.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(localStorageData));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="register">
            <br />
            <h1 className="text-3xl">User Profile</h1>
            <br />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Your E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mb-14">
                Update
              </button>
              <br />
              <br />
              <br />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profiles;
