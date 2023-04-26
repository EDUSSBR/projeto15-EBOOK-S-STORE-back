import { Router } from "express";
import { createProductController, getProductController } from "../controllers/product.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { productSchema } from "../schemas/product.schemas.js";

const productsRouter = Router();

productsRouter.get('/product', getProductController);
productsRouter.post('/product', validateSchema(productSchema),createProductController);

export default productsRouter;