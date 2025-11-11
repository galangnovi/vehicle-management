interface UserInfoProps {
    user: {
        name: string
        email: string
    }
}

export default function UserInfo({ user }: UserInfoProps) {
    return (
        <div className="bg-white shadow rounded-xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Informasi Pengguna</h2>
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-semibold">Nama:</span>
                    <span className="text-right sm:text-center sm:ml-2 md:bg-gray-100 md:w-100 md:rounded-lg">{user.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-semibold">Email:</span>
                    <span className="text-right sm:text-center sm:ml-2 md:bg-gray-100 md:w-100 md:rounded-lg">{user.email}</span>
                </div>
            </div>
        </div>
    )
}
