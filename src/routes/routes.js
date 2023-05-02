import productsRouter from "./product.routes.js";
import userRouter from "./user.routes.js";
import { Router } from "express";
import orderRouter from "./order.routes.js";

const router = Router()

router.use(userRouter)
router.use(productsRouter)
router.use(orderRouter)

export default router