import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/useAuth"
import api from "@/api/api"
import { LogIn, Mail, Lock, Loader2 } from "lucide-react"
import { showSuccessMessage, showErrorMessage } from "@/utils/swalUtils"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const setAuth = useAuthStore((state) => state.setAuth);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        console.log("handleSubmit called");
        try {
            const res = await api.post("/auth/login",{ email, password });
            if(!res) throw new Error("Login failed")
            setAuth({ accessToken: res.data.data.accessToken, user: res.data.data.user });
            await showSuccessMessage("Login Berhasil!", `Selamat datang, ${res.data.data.user.name}!`);
            navigate("/dashboard");
        } catch (err:any) {
            console.error("Login error:", err.response.data.message);
            const msg = err.response.data.message || "Terjadi kesalahan saat login";
            showErrorMessage("Login Gagal", msg);
        } finally {
            setIsLoading(false);
        }
    }
    


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <div className="hidden md:flex w-full max-w-6xl">
                <div className="w-1/2 flex justify-center items-center bg-white">
                    <img src="/login.jpg" className="w-140 h-140" alt="" />
                </div>
                <div className="w-1/2 flex justify-center items-center p-8">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-2xl">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                Selamat Datang
                            </h2>
                            <p className="text-gray-600">
                                Masuk ke akun Anda untuk melanjutkan
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                        placeholder="Masukkan email Anda"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                        placeholder="Masukkan password Anda"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                        Masuk...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="h-5 w-5 mr-2" />
                                        Masuk
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="md:hidden w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Selamat Datang
                    </h2>
                    <p className="text-gray-600">
                        Masuk ke akun Anda untuk melanjutkan
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                placeholder="Masukkan email Anda"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                placeholder="Masukkan password Anda"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                Masuk...
                            </>
                        ) : (
                            <>
                                <LogIn className="h-5 w-5 mr-2" />
                                Masuk
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
