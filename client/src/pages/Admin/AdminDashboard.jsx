import React from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { useAuth } from "../../Context-API/Auth.jsx";

const AdminDashboard = () => {
  const { auth } = useAuth();

  return (
    <Layout title="Admin Dashboard - E-Commerce App">
      <div className="">
        <div className="flex mt-4 pl-6">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 text-4xl">
              <h1>Admin Name: {auth?.user?.name}</h1>
              <h2>Email: {auth?.user?.email}</h2>
              <h3>Phone: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

