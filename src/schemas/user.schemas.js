import joi from "joi"

export const userSchema = joi.object({
    name: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).max(200).required(),
    isAdmin: joi.boolean().optional()
})

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).max(200).required()
})

