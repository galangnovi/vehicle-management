import { prisma } from "../prisma/prisma";
import { startOfDay, endOfDay } from "date-fns";

export async function SeeAllVehicle(
    page?: number,
    updatedAt?: string
) {
    try {
        let where: any = {};
        
        if (updatedAt) {
        const targetDate = new Date(updatedAt);
        const start = startOfDay(targetDate);
        const end = endOfDay(targetDate);

        where = {
            updatedAt: {
            gte: start,
            lte: end,
            },
        };
        }
        const limit = 10
        const pagination = page || 1
        const skip = (pagination - 1) * limit;
        

        const data = await prisma.vehicle.findMany({
            where,
            select: {
                id: true,
                name: true,
                lisensePlate: true,
                type: true,
                route: true,
                status: true,
                lastPosition: true,
                updatedAt: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            },
            skip,
            take: limit,
            orderBy: {
                updatedAt: 'desc'
            }
        });

        const total = await prisma.vehicle.count({ where });

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    } catch (err: any) {
        throw new Error(err.message || "Terjadi Kesalahan");
    }
}

export async function DetailVehicle(id: number) {
    try {
        const data = await prisma.vehicle.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                lisensePlate: true,
                type: true,
                route: true,
                status: true,
                lastPosition: true,
                updatedAt: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                vehicleStatuses: {
                    select: {
                        id: true,
                        status: true,
                        dateTime: true,
                        position: true,
                        information: true,
                        updatedAt: true
                    },
                    orderBy: {
                        dateTime: 'desc'
                    }
                }
            }
        });

        if (!data) throw new Error("Data Vehicle Tidak Ditemukan");

        return data;
    } catch (err: any) {
        throw new Error(err.message || "Terjadi Kesalahan");
    }
}
