import { Router } from "express";
import { createProductController } from "../controllers/product.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { productSchema } from "../schemas/product.schemas.js";

const productsRouter = Router();

productsRouter.post('/product', validateSchema(productSchema),createProductController);

export default productsRouter;