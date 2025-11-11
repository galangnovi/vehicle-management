import { prisma } from "../prisma/prisma";
import { createUserScema } from "../validations/user-account";
import bcrypt from "bcrypt";


export async function SeeAllUser(id:number) {
    
    try{
        const data = await prisma.user.findMany({
            where:{
                id:{
                    not:id
                }
            },
            select:{
                id:true,
                name:true,
                email:true,
                vehicle:{
                    select:{
                        name:true
                    }
                }
            }
        });
        if (!data) throw new Error ("Data User Kosong Atau Tidak Ditemukan")
        
        return data;
    } catch(err:any) {throw new Error(err.message || "Terjadi Kesalahan")}
}

export async function DetailUserLogin(id:number){
    try{
        const data = await prisma.user.findUnique({
            where:{
                id:id 
            },
            select:{
                name:true,
                email:true,
            }
        })
        if(!data) throw new Error("Gagal Memuat Data Profile")
        
        return data
    } catch(err:any) {throw new Error(err.message || "Terjadi Kesalahan")}
}

export async function CreateNewUser(email:string, password: string, name:string) {
    try{
        const {error} = createUserScema.validate({email, password, name});
        if (error) throw new Error(error.message);
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await prisma.user.create({
            data:{
                email,
                password: hashedPassword,
                name
            }
        });
        if(!data) throw new Error("Gagal Membuat Akun Baru");
        return data

    } catch(err:any) {throw new Error(err.message || "Terjadi Kesalahan")}
}

export async function editUserAccount(id:number, name?:string, email?:string, password?:string) {
    try{
        const olddata = await prisma.user.findUnique({
            where:{
                id
            },
            select:{
                name:true,
                email:true,
                password:true,
            }
        });
        
        const newName = name || olddata?.name
        const newEmail = email || olddata?.email;
        let newPassword
        if(password){
            newPassword = await bcrypt.hash(password, 10)
        } else{
            newPassword = olddata?.password
        };

        const data = await prisma.user.update({
            where:{
                id
            },
            data:{
                name:newName,
                email:newEmail,
                password:newPassword,
            }
        });
        if(!data) throw new Error ("Edit Data User Gagal")
        return data
    } catch(err:any) {throw new Error(err.message || "Terjadi Kesalahan")}
}

export async function deleteUserAccount(id:number){
    try{
        const data = await prisma.user.delete({
            where:{
                id
            }
        });
        if(!data) throw new Error("Gagal Menghapus Akun User")
    } catch(err:any) {throw new Error(err.message || "Terjadi Kesalahan")}
} 