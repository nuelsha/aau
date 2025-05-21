import React from "react";
import "./index.css";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PartnershipDashboard from "./pages/partnership.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Users from "./pages/users.jsx";
import AddPartnership from "./pages/add-partnership.jsx";
import Settings from "./pages/settings.jsx";
import Profile from "./pages/profile.jsx";
import Notifications from "./pages/notifications.jsx";
import NotFound from "./pages/NotFound.jsx";
import PartnershipDetail from "./features/partnership/pages/PartnershipDetails.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function Main() {
  return (
    <AuthProvider>
      <UserProvider>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#014166",
              color: "#fff",
            },
          }}
        />{" "}
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/partnership"
              element={
                <ProtectedRoute>
                  <PartnershipDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-partnership"
              element={
                <ProtectedRoute>
                  <AddPartnership />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/partnership/:id"
              element={
                <ProtectedRoute>
                  <PartnershipDetail />
                </ProtectedRoute>
              }
            />{" "}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}
