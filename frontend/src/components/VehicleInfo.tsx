interface VehicleDetail {
    id: number
    name: string
    lisensePlate: string
    type: string
    route: string
    status: string
    lastPosition: string
    updatedAt: string
}

interface VehicleInfoProps {
    vehicle: VehicleDetail
}

export default function VehicleInfo({ vehicle }: VehicleInfoProps) {
    return (
        <div className="bg-white shadow rounded-xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Informasi Kendaraan</h2>
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between ">
                    <span className="font-semibold">ID:</span>
                    <span className="text-right sm:text-center sm:ml-2 md:bg-gray-100 md:w-100 md:rounded-lg">{vehicle.id}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-semibold">Nama:</span>
                    <span className="text-right sm:text-center sm:ml-2 md:bg-gray-100 md:w-100 md:rounded-lg">{vehicle.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-semibold">Plat Nomor:</span>
                    <span className="text-right sm:text-center sm:ml-2 md:bg-gray-100 md:w-100 md:rounded-lg">{vehicle.lisensePlate}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-semibold">Tipe:</span>
                    <span className="text-right sm:text-center sm:ml-2 md:bg-gray-100 md:w-100 md:rounded-lg">{vehicle.type}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-semibold">Rute:</span>
                    <span className="text-right sm:text-center sm:ml-2 md:bg-gray-100 md:w-100 md:rounded-lg">{vehicle.route}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-semibold">Status:</span>
                    <span className={`text-right sm:text-center sm:ml-2 md:bg-gray-100 md:w-100 md:rounded-lg font-semibold ${vehicle.status === "running" ? "text-green-600" : "text-red-600"}`}>
                        {vehicle.status}
                    </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-semibold">Posisi Terakhir:</span>
                    <span className="text-right sm:text-center sm:ml-2 md:bg-gray-100 md:w-100 md:rounded-lg">{vehicle.lastPosition}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-semibold">Terakhir Diperbarui:</span>
                    <span className="text-right sm:text-center sm:ml-2 md:bg-gray-100 md:w-100 md:rounded-lg text-sm">{new Date(vehicle.updatedAt).toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
}
