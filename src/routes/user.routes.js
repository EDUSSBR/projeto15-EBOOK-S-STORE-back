import { Router } from "express";
import { getUser, login, signUp } from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginSchema, userSchema } from "../schemas/user.schemas.js";
import { validateToken } from "../middlewares/validateToken.js";

const userRouter = Router()

userRouter.post("/signup", validateSchema(userSchema),signUp)
userRouter.post("/login", validateSchema(loginSchema), login)
userRouter.post("/getuser", validateToken, getUser)

export default userRouter