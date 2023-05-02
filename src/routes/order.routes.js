import { Router } from "express";
import { order } from "../controllers/order.controller.js";
import {validateToken} from "../middlewares/validateToken.js";

const orderRouter = Router()
orderRouter.post("/order", validateToken, order)

export default orderRouter