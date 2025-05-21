import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { user: contextUser } = useUser();
  const { user: authUser, loading: authLoading } = useAuth();

  // Check if either auth system is still loading
  if (authLoading) {
    return <LoadingSpinner />;
  }

  // Check if the user is authenticated in either system
  // This helps with the transition from the old system to Supabase
  if (!contextUser && !authUser) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/" replace />;
  }

  // Render the protected component if user is authenticated
  return children;
};

export default ProtectedRoute;
