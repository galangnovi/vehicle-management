import { Request, Response } from "express";
import { SeeAllVehicle, DetailVehicle } from "../services/vehicle";

export async function handlerGetAllVehicle(req: Request, res: Response) {
    try {
        const { page, filter } = req.query;
        const updatedAt = filter

        const data = await SeeAllVehicle(
            Number(page), 
            updatedAt as string
        );
        return res.status(200).json({
            code: 200,
            status: "Success",
            message: "Data Vehicle Ditemukan",
            data: data
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: err.message || "Gagal Memuat Data Vehicle",
        });
    }
}

export async function handlerGetDetailVehicle(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const data = await DetailVehicle(id);
        return res.status(200).json({
            code: 200,
            status: "Success",
            message: "Data Vehicle Ditemukan",
            data: data
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: err.message || "Gagal Memuat Data Vehicle",
        });
    }
}
