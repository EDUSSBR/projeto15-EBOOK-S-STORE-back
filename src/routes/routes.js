import productsRouter from "./product.routes.js";
import userRouter from "./user.routes.js";
import { Router } from "express";

const router = Router()

router.use(userRouter)
router.use(productsRouter)

export default router