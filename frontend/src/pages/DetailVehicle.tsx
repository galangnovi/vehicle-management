import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "@/api/api"
import VehicleInfo from "@/components/VehicleInfo"
import UserInfo from "@/components/UserInfo"
import VehicleStatusHistory from "@/components/VehicleStatusHistory"
import { showSuccessMessage, showErrorMessage } from "@/utils/swalUtils"

interface VehicleDetail {
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
    vehicleStatuses: {
        id: number
        status: string
        dateTime: string
        position: string
        information: string
        updatedAt: string
    }[]
}

export default function DetailVehicle() {
    const navigate = useNavigate()
    const  id  = Number(useParams().id)


    const [vehicle, setVehicle] = useState<VehicleDetail | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchVehicleDetail = async () => {
        if (!id) return

        try {
            setIsLoading(true)
            setError("")
            const res = await api.get(`/vehicle/${id}`, { withCredentials: true })

            if (res.status === 200 && res.data?.data) {
                setVehicle(res.data.data)
            } else {
                throw new Error(res.data?.message || "Unexpected response format")
            }
        } catch (err: any) {
            console.error("Fetch vehicle detail error:", err)
            setError(err.response?.data?.message || "Failed to load vehicle detail")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchVehicleDetail()
    }, [id])

    const handleDownloadExcel = async () => {
        if (!id) return

        try {
            const res = await api.get(`/download-xlsx/${id}`, {
            responseType: "blob",
            withCredentials: true,
            });

            const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `vehicle-${id}.xlsx`;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (err: any) {
            console.error("Download excel error:", err)
            showErrorMessage("Gagal Mengunduh", "Terjadi kesalahan saat mengunduh file Excel.")
        }
    }

    if (error) return <div className="p-6 text-red-600">{error}</div>

    if (isLoading) return <div className="p-6">Loading...</div>

    if (!vehicle) return <div className="p-6">Vehicle not found</div>

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">🚘 Detail Kendaraan</h1>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button
                        onClick={handleDownloadExcel}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
                    >
                        📊 Unduh Excel
                    </button>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
                    >
                        ← Kembali
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <VehicleInfo vehicle={vehicle} />

                {vehicle.user && (
                    <UserInfo user={vehicle.user} />
                )}
            </div>

            <VehicleStatusHistory vehicleStatuses={vehicle.vehicleStatuses} />
        </div>
    )
}
