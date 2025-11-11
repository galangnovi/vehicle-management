import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import UserManagement from "@/pages/UserManagement";
import DetailVehicle from "@/pages/DetailVehicle";
import ProtectedRoute from "@/hooks/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

const Layout = () => (
    <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="pt-16">
            <Outlet />
        </div>
    </div>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Navigate to="/dashboard" replace /> },
            {
                path: "/dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                )
            },
            {
                path: "/user-management",
                element: (
                    <ProtectedRoute>
                        <UserManagement />
                    </ProtectedRoute>
                )
            },
            {
                path: "/detail-vehicle/:id",
                element: (
                    <ProtectedRoute>
                        <DetailVehicle />
                    </ProtectedRoute>
                )
            }
        ]
    },
    { path: "/login", element: <Login /> }
])
