import Joi from 'joi';

export const productSchema = Joi.object({
  nombre: Joi.string().required(),
  precio: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required()
});