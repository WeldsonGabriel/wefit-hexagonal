import Joi from 'joi';

export const createAddressSchema = Joi.object({
  street: Joi.string().required(),
  number: Joi.string().required(),
  complement: Joi.string().optional(),
  district: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  cep: Joi.string().pattern(/^\d{5}-?\d{3}$/).required(), // exemplo: CEP no formato 12345-678 ou 12345678
});
