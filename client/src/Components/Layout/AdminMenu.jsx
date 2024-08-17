import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/admindashboard/createcategory"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/admindashboard/createproduct"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/admindashboard/products"
            className="list-group-item list-group-item-action"
          >
           Products
          </NavLink>
          <NavLink
            to="/admindashboard/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
          <NavLink
            to="/admindashboard/adminorders"
            className="list-group-item list-group-item-action"
          >
            Admin Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;







