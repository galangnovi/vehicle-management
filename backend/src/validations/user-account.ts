import Joi from "joi";

export const createUserScema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required()
})

export const loginScema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})