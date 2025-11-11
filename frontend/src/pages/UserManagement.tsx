import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "@/api/api"
import CreateUserModal from "@/components/CreateUserModal"
import EditUserModal from "@/components/EditUserModal"
import { Users, UserPlus, Edit, Trash2, Loader2 } from "lucide-react"
import { useAuthStore } from "@/store/useAuth"
import { showSuccessMessage, showErrorMessage } from "@/utils/swalUtils"
import Swal from "sweetalert2"

interface User {
    id: number
    name: string
    email: string
}

export default function UserManagement() {
    const {user} = useAuthStore()

    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const [isDeleting, setIsDeleting] = useState(false)

    const fetchUsers = async () => {
        try {
            setIsLoading(true)
            setError("")
            const res = await api.get("/user/all-user", { withCredentials: true })
            if (res.status === 200 && res.data?.data) {
                setUsers(res.data.data)
            } else {
                throw new Error(res.data?.message || "Unexpected response format")
            }
        } catch (err: any) {
            console.error("Fetch users error:", err)
            setError(err.response?.data?.message || "Failed to load users")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])



    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "Konfirmasi Hapus",
            text: "Apakah Anda yakin ingin menghapus user ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus",
            cancelButtonText: "Batal"
        })

        if (result.isConfirmed) {
            setIsDeleting(true)
            try {
                await api.delete(`/user/delete-user/${id}`, { withCredentials: true })
                await showSuccessMessage("Berhasil!", "User telah dihapus.")
                fetchUsers()
            } catch (error: any) {
                console.error("Delete user failed:", error)
                const msg = error.response?.data?.message || "Gagal menghapus user"
                showErrorMessage("Gagal Menghapus User", msg)
            } finally {
                setIsDeleting(false)
            }
        }
    }

    const openEditModal = (user: User) => {
        setSelectedUser(user)
        setIsEditModalOpen(true)
    }

    if (error) return <div className="p-6 text-red-600">{error}</div>

    return (
        <div className="p-6 space-y-6">
            <div className={`flex ${user?.role!=="admin" ? "hidden" : ""} justify-between items-center`}>
                <div className="flex items-center space-x-3">
                    <Users className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-800">Manajemen User</h1>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md group"
                >
                    <UserPlus className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    Tambah User
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        <span className="ml-2 text-gray-600">Memuat data...</span>
                    </div>
                ) : (
                    <>
                        <div className="block md:hidden">
                            <div className="divide-y divide-gray-100">
                                {users?.map((u: User, index) => (
                                    <div
                                        key={u.id}
                                        className="p-4 hover:bg-blue-50 transition-all duration-200"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{u.name}</h3>
                                                <p className="text-sm text-gray-600">{u.email}</p>
                                                <p className="text-xs text-gray-500">ID: {u.id}</p>
                                            </div>
                                        </div>
                                        {user?.role === "admin" && (
                                            <div className="flex flex-col sm:flex-row gap-2 mt-3">
                                                <button
                                                    onClick={() => openEditModal(u)}
                                                    className="inline-flex items-center justify-center px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md"
                                                >
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(u.id)}
                                                    disabled={isDeleting}
                                                    className="inline-flex items-center justify-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    {isDeleting ? "Menghapus..." : "Hapus"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                                    <tr>
                                        <th className="py-4 px-6 font-semibold">ID</th>
                                        <th className="py-4 px-6 font-semibold">Nama</th>
                                        <th className="py-4 px-6 font-semibold">Email</th>
                                        <th className={`py-4 px-6 font-semibold ${user?.role!=="admin" ? "hidden" : ""}`}>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users?.map((u: User, index) => (
                                        <tr
                                            key={u.id}
                                            className="hover:bg-blue-50 transition-all duration-200 transform hover:scale-[1.01]"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <td className="py-4 px-6 text-gray-900 font-medium">{u.id}</td>
                                            <td className="py-4 px-6 text-gray-900">{u.name}</td>
                                            <td className="py-4 px-6 text-gray-700">{u.email}</td>
                                            <td className={`py-4 px-6 ${user?.role!=="admin" ? "hidden" : ""}`}>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => openEditModal(u)}
                                                        className="inline-flex items-center px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md group/btn"
                                                    >
                                                        <Edit className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(u.id)}
                                                        disabled={isDeleting}
                                                        className="inline-flex items-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                                        {isDeleting ? "Menghapus..." : "Hapus"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

            <CreateUserModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={fetchUsers}
                setError={setError}
            />

            <EditUserModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false)
                    setSelectedUser(null)
                }}
                onSuccess={fetchUsers}
                selectedUser={selectedUser}
                setError={setError}
            />
        </div>
    )
}
