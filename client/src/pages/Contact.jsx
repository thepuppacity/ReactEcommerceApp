import React from "react";
import Layout from "../Components/Layout/Layout";
import ContactUsImage from "../Images/ContactUs.jpg";
import { BsArrowUpRight } from "react-icons/bs";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="row contactus align-items-center">
        <div className="">
          <img
            src={ContactUsImage}
            alt="Contact us"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="">
          <h2>Contact Us</h2>
          <p>
            Please reach out to us through the form or the contact information
            provided.
          </p>
          <BsArrowUpRight size={20} aria-label="Arrow pointing up right" />
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
