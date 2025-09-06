import { Navigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext); // user = { role: "applicant", token: "..." }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user)) {
    // Redirect to correct dashboard
    
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default ProtectedRoute;
