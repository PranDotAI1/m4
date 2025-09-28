import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("x_token"); // Or whatever token/key you're using

  return isAuthenticated ? element : <Navigate to="/login-ABHA" replace />;
};


const ProtectedRoutesbyCampus = ({ children }) => {
  const token = localStorage.getItem("jwtTokenbycampus");
  return token ? children : <Navigate to="/" replace />;
};

export { ProtectedRoute, ProtectedRoutesbyCampus };