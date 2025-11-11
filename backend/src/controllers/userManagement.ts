import { Request, Response } from "express";
import { CreateNewUser, deleteUserAccount, DetailUserLogin, editUserAccount, SeeAllUser } from "../services/userManagement";

export async function handlerCreateDataUser(req:Request, res:Response) {
    try{
        const {email, password, name} = req.body
        const data = await CreateNewUser(email, password, name);
        return res.status(200).json({
            code: 200,
            status: "Success",
            message: "Sukses Mendaftarkan User Baru",
            data:data
        })
    } catch(err:any){
         return res.status(500).json({
            code: 500,
            status: "error",
            message: err.message || "Gagal Mendaftarkan User Baru",
         })
        }
}

export async function handlerGetAllDataUser(req:Request, res:Response) {
    try{
        const id = (req as any).user.id
        const data = await SeeAllUser(id)
        return res.status(200).json({
            code: 200,
            status: "Success",
            message: "Data User Ditemukan",
            data:data
        })
    } catch(err:any){
         return res.status(500).json({
            code: 500,
            status: "error",
            message: err.message || "Gagal Memuat Data User",
         })
    }
}

export async function handlerDetailUserLogin(req:Request, res:Response) {
    try{
        const id = (req as any).user.id
        const data = await DetailUserLogin(id);
        return res.status(200).json({
            code: 200,
            status: "Success",
            message: "Data User Ditemukan",
            data:data
        })
    } catch(err:any){
         return res.status(500).json({
            code: 500,
            status: "error",
            message: err.message || "Gagal Memuat Data User",
         })
    }
}

export async function handlerEditDataUser(req:Request, res:Response) {
    try{
        const { name, email, password} = req.body
        const id = Number(req.params.id)
        const data = await editUserAccount(id, name, email, password);
        return res.status(200).json({
            code: 200,
            status: "Success",
            message: "Sukses Ubah Data User",
            data:data
        })
    } catch(err:any){
         return res.status(500).json({
            code: 500,
            status: "error",
            message: err.message || "Gagal Ubah Data User",
         })
    }
}

export async function handlerEditDataUserLogin(req:Request, res:Response) {
    try{
        const id = (req as any).user.id
        const { name, email, password} = req.body
        const data = await editUserAccount(id, name, email, password);
        return res.status(200).json({
            code: 200,
            status: "Success",
            message: "Sukses Ubah Data User",
            data:data
        })
    } catch(err:any){
         return res.status(500).json({
            code: 500,
            status: "error",
            message: err.message || "Gagal Ubah Data User",
         })
    }
}

export async function handlerDeleteUserAccount(req:Request, res:Response) {
    try{
        const id = Number(req.params.id)
         await deleteUserAccount(id)

        return res.status(200).json({
            code: 200,
            status: "Success",
            message: "Sukses Hapus Data User",
        })
    } catch(err:any){
         return res.status(500).json({
            code: 500,
            status: "error",
            message: err.message || "Gagal Hapus Data User",
         })
    }
}