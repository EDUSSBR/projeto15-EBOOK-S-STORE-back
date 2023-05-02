import { Router } from "express";
import { login, signUp } from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginSchema, userSchema } from "../schemas/user.schemas.js";

const userRouter = Router()

userRouter.post("/signup", validateSchema(userSchema),signUp)
userRouter.post("/login", validateSchema(loginSchema), login)
// userRouter.post("/token", token)

export default userRouter