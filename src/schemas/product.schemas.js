import joi from "joi";

export const productSchema = joi.object({
    name: joi.string().min(3).max(100).required(),
    description: joi.string().min(3).max(500).required(),
    price: joi.number().positive().required(),
    stockQuantity: joi.number().positive().required(),
    category: joi.string().min(3).max(100).required(),
    imageUrl: joi.string().pattern(/\bhttps?:\/\/\S+\.(jpg|jpeg|png|gif)\b/, { name: 'imageUrl'}),
});
