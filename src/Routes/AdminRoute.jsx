import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProviders";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";

const AdminRoute = ({ children }) => {
  const { user, role } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role !== "Admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
