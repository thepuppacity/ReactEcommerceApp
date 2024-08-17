import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    count === 0 &&
      navigate("/login", {
        state: location.pathname,
      });

    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="text-center text-4xl">redirecting to you in {count} </h1>
      <br />
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
