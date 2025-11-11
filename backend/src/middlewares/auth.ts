import { Request, Response, NextFunction } from "express";
import { verifyToken, userPayLoad } from "../utils/jwt-utils"; 

export interface AuthRequest extends Request {
  user?: userPayLoad; 
}

export const authenticateMiddlewares = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
