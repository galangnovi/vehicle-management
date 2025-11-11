import  express  from "express";
import { authenticateMiddlewares } from "../middlewares/auth";
import { handlerLoginUser, handlerLogoutUser, handlerRefreshToken } from "../controllers/auth";
import { limiter } from "../middlewares/limiter";

const router = express.Router();

router.post("/login", limiter, handlerLoginUser)
router.post("/logout", limiter, authenticateMiddlewares, handlerLogoutUser)
router.post("/refresh", limiter, handlerRefreshToken)

export default router;
