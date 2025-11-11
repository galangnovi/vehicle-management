interface VehicleStatus {
    id: number
    status: string
    dateTime: string
    position: string
    information: string
    updatedAt: string
}

interface VehicleStatusHistoryProps {
    vehicleStatuses: VehicleStatus[]
}

export default function VehicleStatusHistory({ vehicleStatuses }: VehicleStatusHistoryProps) {
    return (
        <div className="bg-white shadow rounded-xl overflow-hidden">
            <h2 className="text-xl font-bold p-4 sm:p-6 pb-0">Riwayat Status</h2>

            <div className="block md:hidden">
                <div className="divide-y divide-gray-100">
                    {vehicleStatuses?.map((status) => (
                        <div key={status.id} className="p-4 hover:bg-gray-50">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {new Date(status.dateTime).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                    <p className={`text-sm font-medium ${status.status === "running" ? "text-green-600" : "text-red-600"}`}>
                                        {status.status}
                                    </p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p><span className="font-medium">Posisi:</span> {status.position}</p>
                                <p><span className="font-medium">Info:</span> {status.information}</p>
                                <p><span className="font-medium">Diperbarui:</span> {new Date(status.updatedAt).toLocaleDateString('id-ID')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-3 px-4">Tanggal & Waktu</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Posisi</th>
                            <th className="py-3 px-4">Informasi</th>
                            <th className="py-3 px-4">Diperbarui</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleStatuses?.map((status) => (
                            <tr key={status.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4">{new Date(status.dateTime).toLocaleString()}</td>
                                <td className={`py-2 px-4 font-semibold ${status.status === "running" ? "text-green-600" : "text-red-600"}`}>
                                    {status.status}
                                </td>
                                <td className="py-2 px-4">{status.position}</td>
                                <td className="py-2 px-4">{status.information}</td>
                                <td className="py-2 px-4">{new Date(status.updatedAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
