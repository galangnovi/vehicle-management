import { useState } from "react"
import api from "@/api/api"
import { UserPlus, Mail, Lock, Loader2, X } from "lucide-react"
import { showSuccessMessage, showErrorMessage } from "@/utils/swalUtils"

interface CreateUserModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    setError: (error: string) => void
}

export default function CreateUserModal({ isOpen, onClose, onSuccess, setError }: CreateUserModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [isCreating, setIsCreating] = useState(false)

    const handleSubmit = async () => {
        if (formData.name && formData.email && formData.password) {
            setIsCreating(true)
            try {
                await api.post("/user/new-user", formData, { withCredentials: true })
                await showSuccessMessage("Berhasil!", "User baru telah ditambahkan.")
                onSuccess()
                onClose()
                setFormData({ name: "", email: "", password: "" })
            } catch (error: any) {
                console.error("Create user failed:", error)
                const msg = error.response?.data?.message || "Gagal menambahkan user"
                showErrorMessage("Gagal Menambahkan User", msg)
            } finally {
                setIsCreating(false)
            }
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md mx-4 transition-all duration-300">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
                            <UserPlus className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Tambah User Baru</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-4 sm:p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nama Lengkap
                        </label>
                        <div className="relative">
                            <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Masukkan nama lengkap"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Masukkan email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Masukkan password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-all duration-200 order-2 sm:order-1"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isCreating || !formData.name || !formData.email || !formData.password}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed flex items-center justify-center order-1 sm:order-2"
                    >
                        {isCreating ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <UserPlus className="h-4 w-4 mr-2" />
                                Tambah User
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
