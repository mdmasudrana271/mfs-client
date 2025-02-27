import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProviders";

const AgentRoute = ({ children }) => {
  const { user, role } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role !== "Agent") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AgentRoute;
