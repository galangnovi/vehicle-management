import bcrypt from 'bcrypt'
import { prisma } from '../prisma/prisma'
import { signEncToken, signRefreshToken, userPayLoad } from '../utils/jwt-utils';

export async function loginUser(email:string, password:string) {
    try{
        const isUser = await prisma.user.findFirst({
            where:{
                email
            }
        });
        if(!isUser) throw new Error("Username Salah atau User Tidak Ditemukan")
        
        const isPassword = await bcrypt.compare(password, isUser.password)
        if(!isPassword) throw new Error("Password Salah")

        const payload: userPayLoad = {
        id: isUser.id,
        email: isUser.email,
        name: isUser.name,
        role: isUser.role,
    };


    const accessToken = signEncToken(payload);
    const refreshToken = signRefreshToken(payload);

    return {
        accessToken,
        refreshToken,
        user: payload,
        }
    } catch(err:any) {throw new Error(err.message || "Terjadi Kesalahan")}
}
