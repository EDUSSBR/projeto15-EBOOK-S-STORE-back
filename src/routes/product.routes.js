import { Router } from "express";
import { createProductController, getProductController, getProductForId } from "../controllers/product.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { productSchema } from "../schemas/product.schemas.js";

const productsRouter = Router();

productsRouter.get('/product', getProductController);
productsRouter.post('/product', validateSchema(productSchema),createProductController);
productsRouter.get('/product/:id', getProductForId);
productsRouter.delete('/product/:id')

export default productsRouter;