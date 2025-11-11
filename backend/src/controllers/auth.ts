import { Request, Response } from "express";
import { loginUser } from "../services/auth";
import { verifyToken, signEncToken } from "../utils/jwt-utils";

export async function handlerLoginUser(req:Request, res:Response) {
    try{
        const { email, password } = req.body;
        const response = await loginUser(email, password);
        const data ={accessToken: response.accessToken, user: response.user};
        res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        secure: false, 
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        });

       
    return res.status(200).json({
            code: 200,
            status: "success",
            message: "Login successful.",
            data,
        
    })
    } catch (err:any)  {
        return res.status(500).json({
                code: 500,
                status: "error",
                message: err.message || "Gagal Login",
        })
    }
}

export async function handlerLogoutUser(req: Request, res: Response) {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Logout berhasil",
    });

  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      status: "error",
      message: err.message || "Gagal logout",
    });
  }
}

export async function handlerRefreshToken(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        code: 401,
        status: "error",
        message: "Refresh token not found",
      });
    }

    const payload = verifyToken(refreshToken);
    const newAccessToken = signEncToken(payload);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Access token refreshed successfully",
      data: { accessToken: newAccessToken },
    });
  } catch (err: any) {
    return res.status(403).json({
      code: 403,
      status: "error",
      message: err.message || "Invalid refresh token",
    });
  }
}
