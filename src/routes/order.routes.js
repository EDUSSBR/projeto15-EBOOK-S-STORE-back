import { Router } from "express";
import { getOrder, order } from "../controllers/order.controller.js";


const orderRouter = Router()

orderRouter.post("/order", order)
orderRouter.get("/order",getOrder)

export default orderRouter
