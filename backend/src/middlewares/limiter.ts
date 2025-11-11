import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 60*1000, 
    max: 100, 
    message: "request terlalu bnayak silahkan coba lagi nanti"
})