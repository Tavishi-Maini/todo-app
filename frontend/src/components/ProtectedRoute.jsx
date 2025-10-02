import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Redirect to login if user is not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Else render children (Dashboard)
  return children;
}
