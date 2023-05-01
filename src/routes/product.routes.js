import { Router } from "express";
import { createProductController, deleteProductForId, getProductController, getProductForId, putProductForId } from "../controllers/product.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { productSchema } from "../schemas/product.schemas.js";

const productsRouter = Router();

productsRouter.get('/product', getProductController);
productsRouter.post('/product', validateSchema(productSchema),createProductController);
productsRouter.get('/product/:id', getProductForId);
productsRouter.delete('/product/:id', deleteProductForId)
productsRouter.put('/product/:id',validateSchema(productSchema), putProductForId)

export default productsRouter;