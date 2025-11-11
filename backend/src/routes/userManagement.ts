import  express  from "express";
import { authenticateMiddlewares } from "../middlewares/auth";
import { handlerCreateDataUser, handlerDeleteUserAccount, handlerDetailUserLogin, handlerEditDataUser, handlerEditDataUserLogin, handlerGetAllDataUser } from "../controllers/userManagement";
import { limiter } from "../middlewares/limiter";


const router = express.Router();

router.get("/all-user", limiter, authenticateMiddlewares, handlerGetAllDataUser)
router.post("/new-user", limiter, authenticateMiddlewares, handlerCreateDataUser)
router.put("/edit-user/:id", limiter, authenticateMiddlewares, handlerEditDataUser)
router.put("/edit-user-login", limiter, authenticateMiddlewares, handlerEditDataUserLogin)
router.get("/detail-loginUser", limiter, authenticateMiddlewares, handlerDetailUserLogin)
router.delete("/delete-user/:id", limiter, authenticateMiddlewares, handlerDeleteUserAccount)


export default router;