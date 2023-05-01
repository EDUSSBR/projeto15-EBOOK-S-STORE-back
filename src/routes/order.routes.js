import { Router } from "express";
import { order } from "../controllers/order.controller.js";

const orderRouter = Router()

orderRouter.post("/order", order)

export default orderRouter