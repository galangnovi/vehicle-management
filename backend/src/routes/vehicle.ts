import express from "express";
import { authenticateMiddlewares } from "../middlewares/auth";
import { handlerGetAllVehicle, handlerGetDetailVehicle } from "../controllers/vehicle";
import { limiter } from "../middlewares/limiter";

const router = express.Router();

router.get("/all-vehicle", limiter, authenticateMiddlewares, handlerGetAllVehicle);
router.get("/:id", limiter, authenticateMiddlewares, handlerGetDetailVehicle);

export default router;
