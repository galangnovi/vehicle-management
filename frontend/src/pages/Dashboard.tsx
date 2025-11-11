import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "@/api/api"
import { Car, Calendar, Eye, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { showSuccessMessage, showErrorMessage } from "@/utils/swalUtils"



interface Vehicle {
    id: number
    name: string
    lisensePlate: string
    type: string
    route: string
    status: string
    lastPosition: string
    updatedAt: string
    user?: {
        name: string
        email: string
    }
}


export default function Dashboard() {
    
    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState<Date | null>()
    const [error, setError] = useState("")

    const fetchVehicles = async () => {
        try {
            setIsLoading(true)
            setError("")
            console.log("filter:", filter)         
            const res = await api.get(`/vehicle/all-vehicle?${filter ? `filter=${filter.toISOString()}` : ""}&page=${page}`,{ withCredentials: true })

            if(!res) throw new Error("gagal Fetch Data")
                setVehicles(res.data.data.data)
                setTotalPages(res.data.data.pagination.totalPages)
            
        } catch (err: any) {
            const msg = err.response?.data?.message || "Gagal fetch data Dashboard"
            showErrorMessage("Gagal Memperbarui User", msg)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchVehicles()
    }, [page, filter])

    const handleVehicleClick = async (id:number) => {
        navigate(`/detail-vehicle/${id}`)
    }

    if (error) return <div className="p-6 text-red-600">{error}</div>

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-center">
                <div className="flex items-center space-x-3 mb-8">
                <Car className="h-10 w-10 text-blue-600" />
                <h1 className="text-4xl font-bold text-gray-800">Dashboard Kendaraan</h1>
            </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:shadow-md">
                <div className="flex flex-wrap items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <label className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">Filter Tanggal:</span>
                        <input
                            type="date"
                            value={filter ? filter.toISOString().split("T")[0] : ""}
                            onChange={(e) => {
                                setFilter(new Date(e.target.value))
                            }}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </label>
                </div>
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
                                {vehicles.map((v, index) => (
                                    <div
                                        key={v.id}
                                        onClick={() => handleVehicleClick(v.id)}
                                        className="cursor-pointer hover:bg-blue-50 transition-all duration-200 p-4"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{v.name}</h3>
                                                <p className="text-sm text-gray-600">ID: {v.id}</p>
                                            </div>
                                            <span
                                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                                                    v.status === "running"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                <div className={`w-2 h-2 rounded-full mr-1 ${
                                                    v.status === "running" ? "bg-green-500" : "bg-red-500"
                                                }`} />
                                                {v.status}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-2">
                                            <p>Tipe: {v.type}</p>
                                            <p>Diperbarui: {new Date(v.updatedAt).toLocaleDateString('id-ID')}</p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleVehicleClick(v.id)
                                            }}
                                            className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md"
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            Detail
                                        </button>
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
                                        <th className="py-4 px-6 font-semibold">Tipe</th>
                                        <th className="py-4 px-6 font-semibold">Status</th>
                                        <th className="py-4 px-6 font-semibold">Terakhir Diperbarui</th>
                                        <th className="py-4 px-6 font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {vehicles.map((v, index) => (
                                        <tr
                                            key={v.id}
                                            onClick={() => handleVehicleClick(v.id)}
                                            className="cursor-pointer hover:bg-blue-50 transition-all duration-200 transform hover:scale-[1.01] group"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <td className="py-4 px-6 text-gray-900 font-medium">{v.id}</td>
                                            <td className="py-4 px-6 text-gray-900">{v.name}</td>
                                            <td className="py-4 px-6 text-gray-700">{v.type}</td>
                                            <td className="py-4 px-6">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                                                        v.status === "running"
                                                            ? "bg-green-100 text-green-800 border border-green-200"
                                                            : "bg-red-100 text-red-800 border border-red-200"
                                                    }`}
                                                >
                                                    <div className={`w-2 h-2 rounded-full mr-2 ${
                                                        v.status === "running" ? "bg-green-500" : "bg-red-500"
                                                    }`} />
                                                    {v.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">
                                                {new Date(v.updatedAt).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleVehicleClick(v.id)
                                                    }}
                                                    className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md group/btn"
                                                >
                                                    <Eye className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                                    Detail
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex flex-col items-center justify-center space-x-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4 transition-all duration-300">
                    <div className="flex justify-center items-center">
                        <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <div className="flex space-x-1">
                            {Array.from({ length: totalPages }).map((_, i) => {
                                const pageNum = i + 1
                                const isCurrentPage = page === pageNum
                                const isNearCurrent = Math.abs(page - pageNum) <= 2

                                if (totalPages <= 7 || isNearCurrent || pageNum === 1 || pageNum === totalPages) {
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setPage(pageNum)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                                isCurrentPage
                                                    ? "bg-blue-600 text-white shadow-md"
                                                    : "hover:bg-gray-100 border border-gray-300"
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    )
                                } else if (pageNum === 2 && page > 4) {
                                    return <span key={i} className="px-2 py-2">...</span>
                                } else if (pageNum === totalPages - 1 && page < totalPages - 3) {
                                    return <span key={i} className="px-2 py-2">...</span>
                                }
                                return null
                            })}
                        </div>

                        <button
                            onClick={() => setPage(Math.min(totalPages, page + 1))}
                            disabled={page === totalPages}
                            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>

                    </div>
                    
                    <span className="mt-4 text-sm text-gray-600 font-medium">
                        Halaman {page} dari {totalPages}
                    </span>
                </div>
            )}
        </div>
    )
}
