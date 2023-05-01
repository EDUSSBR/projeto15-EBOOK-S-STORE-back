import { order } from "../controllers/order.controller.js";
import productsRouter from "./product.routes.js";
import userRouter from "./user.routes.js";
import { Router } from "express";

const router = Router()

router.use(userRouter)
router.use(productsRouter)
router.use(order)

export default router