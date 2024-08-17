import React from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";
import { useAuth } from "../../Context-API/Auth";

const Dashboard = () => {
  const { auth } = useAuth(); // Correctly destructuring the auth context

  return (
    <Layout title={"Dashboard - ECOmmerce App"}>
      <div className=" m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 text-4xl">
              <h1>User Name: {auth?.user?.name}</h1>
              <h2>Email: {auth?.user?.email}</h2>
              <h3>Address: {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
