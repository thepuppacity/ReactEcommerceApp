import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Link } from "react-router-dom";
import { MdShoppingBag } from "react-icons/md";
import { useAuth } from "../../Context-API/Auth";
import SearchInput from "./Form/SearchInput";
import useCategory from "../../CustomHooks/useCategory";
import { useCart } from "../../Context-API/CartAuth";
import { Badge } from "antd";

const Header = () => {
  const { auth, setAuth } = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  console.log(categories); // Debugging line to check categories data

  const handleLogOut = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand flex justify-around">
          <MdShoppingBag className="mt-0 mr-1" /> E-Commerce App
        </Link>
        <SearchInput />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to={"/categories"}
              data-bs-toggle="dropdown"
            >
              Categories
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={"/categories"}>
                  All Categories
                </Link>
              </li>
              {categories?.map((c) => (
                <li key={c._id}>
                  <Link className="dropdown-item" to={`/category/${c.slug}`}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {!auth.user ? (
            <>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {auth?.user?.name}
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    to={`${
                      auth?.user?.role === "admin"
                        ? "/admindashboard"
                        : "/dashboard"
                    }`}
                    className="dropdown-item"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleLogOut}
                    to="/login"
                    className="dropdown-item"
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>
          )}
          <li className="nav-item">
            <Badge count={cart?.length} showZero className="mr-4 mt-2 pt-1">
              <NavLink to="/cart" className="nav-link mr-4">
                Cart
              </NavLink>
            </Badge>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;



