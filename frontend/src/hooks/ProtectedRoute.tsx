import { useAuthStore } from "@/store/useAuth"
import { Navigate } from "react-router-dom"


interface ProtectedRouteProps {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const {accessToken} = useAuthStore()
 
    if (!accessToken) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}
