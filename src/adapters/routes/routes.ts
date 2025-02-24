import { Router, Request, Response } from 'express';
import { validateCreateUser } from '../middlewares/validateCreateUser';
import UserController from '../controllers/userController';

const router = Router();
import UserRepository from '../../infrastructures/repositories/UserRepository';
import AddressRepository from '../../infrastructures/repositories/AddressRepository';
import CompanyRepository from '../../infrastructures/repositories/CompanyRepository';
import IndividualRepository from '../../infrastructures/repositories/IndividualRepository';

const userRepository = new UserRepository();
const addressRepository = new AddressRepository();
const companyRepository = new CompanyRepository();
const individualRepository = new IndividualRepository();
const userController = new UserController(userRepository, addressRepository, companyRepository, individualRepository);

// Rota para criar um usuário
router.post('/users/:register', validateCreateUser, (req: Request, res: Response) => {
  userController.createUser(req, res);
});

// Rota para obter um usuário por ID
router.get('/users/busca/:id', (req: Request, res: Response) => {
  userController.getUserById(req, res);
});

// Rota para obter um usuário por email
router.get('/users/email/:email', (req: Request, res: Response) => {
  userController.getUserByEmail(req, res);
});

// Rota para atualizar um usuário
router.put('/users/:id', (req: Request, res: Response) => {
  userController.updateUser(req, res);
});

// Rota para deletar um usuário
router.delete('/users/:id', (req: Request, res: Response) => {
  userController.deleteUser(req, res);
});

export default router;