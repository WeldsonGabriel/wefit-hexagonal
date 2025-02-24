import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validateCPF, validateEmail } from '../../core/domain/utils';
import { UserType } from '../../core/enums/UserType';
import Joi, { ObjectSchema, Schema } from 'joi';

export const userSchema: ObjectSchema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().required(),
  cpf: Joi.string().length(11).required(),
  email: Joi.string().email().required(),
  userType: Joi.string().valid('INDIVIDUAL', 'COMPANY').required(),
  addressData: Joi.object({
    street: Joi.string().required(),
    number: Joi.string().required(),
    neighborhood: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().length(2).required(),
    postalCode: Joi.string().length(8).required()
  }).required()
});

export const validationMiddleware = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      // Se houver pelo menos um erro do tipo 'any.required', retorna a mensagem padronizada
      const missingRequired = error.details.some((detail: { type: string; }) => detail.type === 'any.required');
      if (missingRequired) {
        return res.status(400).json({ message: "Campos obrigatórios ausentes" });
      }
      // Se houver outros erros, pode retornar os detalhes
      return res.status(400).json({ errors: error.details.map((detail: { message: any; }) => detail.message) });
    }
    next();
  };
export const validateCreateUser: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const { name, cpf, email, userType, addressData } = req.body;

  // Verifica se os campos obrigatórios estão presentes
 //if ( !name || !cpf || !email || !userType || !addressData) {
 //  res.status(400).json({ message: 'Campos obrigatórios ausentes' });
 //  return;
 //}

  // Validação de e-mail
  if (!validateEmail(email)) {
    res.status(400).json({ message: 'E-mail inválido' });
    return;
  }

  // Se for Individual, valida o CPF
  if (userType === UserType.INDIVIDUAL && !validateCPF(cpf)) {
    res.status(400).json({ message: 'CPF inválido para usuário individual' });
    return;
  }

  // Outras validações podem ser adicionadas aqui (por exemplo, formato do endereço, etc.)

  // Se todas as validações passarem, chama o próximo middleware ou handler
  next();
};