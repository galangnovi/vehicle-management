import { useState } from "react"
import { useAuthStore } from "@/store/useAuth"
import { useNavigate } from "react-router-dom"
import { Car, LayoutDashboard, Users, LogOut, User, Menu, X } from "lucide-react"

export default function Navbar() {
    const { logout, user } = useAuthStore()
    const navigate = useNavigate()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleLogout = async () => {
        try {
            await logout()
            navigate("/login")
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    if (!user) {
        return null
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg backdrop-blur-sm bg-opacity-95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Car className="h-8 w-8 text-blue-200" />
                            <h1 className="text-lg sm:text-xl font-bold tracking-tight">Dashboard Kendaraan</h1>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-1">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-200 group"
                        >
                            <LayoutDashboard className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Dashboard</span>
                        </button>
                        <button
                            onClick={() => navigate("/user-management")}
                            className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-200 group"
                        >
                            <Users className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Manajemen User</span>
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
                            <User className="h-4 w-4" />
                            <span className="text-sm font-medium">Halo, {user?.name}</span>
                        </div>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>

                        <button
                            onClick={handleLogout}
                            className="hidden sm:flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg group"
                        >
                            <LogOut className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-white/10 py-4">
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg mb-2">
                                <User className="h-4 w-4" />
                                <span className="text-sm font-medium">Halo, {user?.name}</span>
                            </div>

                            <button
                                onClick={() => {
                                    navigate("/dashboard")
                                    setIsMobileMenuOpen(false)
                                }}
                                className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-200 text-left"
                            >
                                <LayoutDashboard className="h-5 w-5" />
                                <span className="font-medium">Dashboard</span>
                            </button>

                            <button
                                onClick={() => {
                                    navigate("/user-management")
                                    setIsMobileMenuOpen(false)
                                }}
                                className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-200 text-left"
                            >
                                <Users className="h-5 w-5" />
                                <span className="font-medium">Manajemen User</span>
                            </button>

                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-left"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
