import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { AuthProvider } from "./Context-API/Auth.jsx";
import { SearchProvider } from "./Context-API/SearchAuth.jsx";
import { CartProvider } from "./Context-API/CartAuth.jsx";
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <SearchProvider>
      <CartProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CartProvider>
    </SearchProvider>
);
