import { useContext } from "react";
import { Navigate } from "react-router-dom";
import employeeContext from "../context/context";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(employeeContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
