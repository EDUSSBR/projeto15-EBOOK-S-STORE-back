import { Router } from "express";
import { getOrder, order } from "../controllers/order.controller.js";
import {validateToken} from "../middlewares/validateToken.js";


const orderRouter = Router()

orderRouter.post("/order", validateToken, order)
orderRouter.get("/order",validateToken,getOrder)

export default orderRouter;