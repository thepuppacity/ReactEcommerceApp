import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = auth?.token
      ? `Bearer ${auth.token}`
      : "";
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }; // Ensure `useAuth` is exported
