import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer pt-10">
      <h4 className="text-center mt-10">All Rights reserved @ 2024</h4>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
