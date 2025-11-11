import express from "express";
import handlerExportToExel from "../controllers/xlsx-generator";
import { authenticateMiddlewares } from "../middlewares/auth";
import { limiter } from "../middlewares/limiter";

const router = express.Router();
router.get("/:id", limiter, authenticateMiddlewares, handlerExportToExel)

export default router