import { useEffect, useState } from "react";
import { useAuth } from "../../../Context-API/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../../../Spinner";
import AdminDashboard from "../../../pages/Admin/AdminDashboard";

export default function AdminRoute() {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/admin-auth");
        if (res.data.ok && auth?.user?.role === "admin") {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        setOk(false);
      } finally {
        setLoading(false);
      }
    };
    if (auth?.token) {
      authCheck();
    } else {
      setLoading(false);
    }
  }, [auth?.token]);

  if (loading) {
    return <Spinner />;
  }

  return ok ? <Outlet /> : <AdminDashboard />;
}
