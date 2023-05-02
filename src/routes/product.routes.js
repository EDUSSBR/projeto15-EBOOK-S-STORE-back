import { Router } from "express";
import { createProductController, deleteProductForId, getProductController, getProductForId, putProductForId } from "../controllers/product.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { productSchema } from "../schemas/product.schemas.js";
import { validateToken } from "../middlewares/validateToken.js";
import { validateAdmin } from "../middlewares/validateAdmin.js";

const productsRouter = Router();

productsRouter.get('/product', getProductController);
productsRouter.post('/product', validateToken, validateAdmin,validateSchema(productSchema),createProductController);
productsRouter.get('/product/:id', getProductForId);
productsRouter.delete('/product/:id', validateToken, validateAdmin, deleteProductForId)
productsRouter.put('/product/:id',validateToken, validateAdmin,validateSchema(productSchema), putProductForId)

export default productsRouter;