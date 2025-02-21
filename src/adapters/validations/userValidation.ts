import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  cpf: Joi.string().pattern(/^\d{11}$/).optional(), // CPF no formato 12345678901
  userType: Joi.string().valid('INDIVIDUAL', 'COMPANY').required(),
  address: Joi.object({
    street: Joi.string().required(),
    number: Joi.string().required(),
    complement: Joi.string().optional(),
    district: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    cep: Joi.string().pattern(/^\d{5}-?\d{3}$/).required(), // CEP no formato 12345-678 ou 12345678
  }).required(),
  companies: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    cnpj: Joi.string().pattern(/^\d{14}$/).required(), // CNPJ no formato 12345678000195
  })).optional(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  cpf: Joi.string().pattern(/^\d{11}$/).optional(), // CPF no formato 12345678901
  userType: Joi.string().valid('INDIVIDUAL', 'COMPANY').optional(),
  address: Joi.object({
    street: Joi.string().optional(),
    number: Joi.string().optional(),
    complement: Joi.string().optional(),
    district: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    cep: Joi.string().pattern(/^\d{5}-?\d{3}$/).optional(), // CEP no formato 12345-678 ou 12345678
  }).optional(),
  companies: Joi.array().items(Joi.object({
    name: Joi.string().optional(),
    cnpj: Joi.string().pattern(/^\d{14}$/).optional(), // CNPJ no formato 12345678000195
  })).optional(),
});
