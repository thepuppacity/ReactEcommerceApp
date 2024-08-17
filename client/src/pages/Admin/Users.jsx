import React from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";

const User = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="flex mt-4 pl-6">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>All Users</h1>
        </div>
      </div>
    </Layout>
  );
};

export default User;
