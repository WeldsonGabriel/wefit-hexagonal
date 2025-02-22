import { User } from '../models/User'; // Ajuste o caminho conforme necessário
import { UserCreationAttributes } from '../models/User';
import { IUserRepository } from '../../ports/out/IUserRepository';
import { Router, Request, Response } from 'express';
import UserController from '../../adapters/controllers/UserController'; // Ajuste o caminho conforme necessário

const router = Router();

// Rota para criar um usuário
router.post('/users', async (req: Request, res: Response) => {
  try {
    await UserController.createUser(req, res);
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter um usuário por ID
router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    await UserController.getUserById(req, res);
  } catch (error: any) {
    console.error('Erro ao obter usuário:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter um usuário por email
router.get('/users/email/:email', async (req: Request, res: Response) => {
  try {
    await UserController.getUserByEmail(req, res);
  } catch (error: any) {
    console.error('Erro ao obter usuário:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar um usuário
router.put('/users/:id', async (req: Request, res: Response) => {
  try {
    await UserController.updateUser(req, res);
  } catch (error: any) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para deletar um usuário
router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    await UserController.deleteUser(req, res);
  } catch (error: any) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: error.message });
  }
});

export { router };

export default class UserRepository implements IUserRepository {
  static createUser(body: any) {
    throw new Error('Method not implemented.');
  }
  static getUserByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  static deleteUser(id: string) {
    throw new Error('Method not implemented.');
  }
  static getUserById(id: string) {
    throw new Error('Method not implemented.');
  }
  static updateUser(id: string, body: any): [any] | PromiseLike<[any]> {
    throw new Error('Method not implemented.');
  }
  async createUser(userData: Partial<User>): Promise<User> {
    return User.create(userData as UserCreationAttributes);
  }

  async getUserById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<[number, User[]]> {
    const [numberOfAffectedRows, affectedRows] = await User.update(updateData, { where: { id_usuario: id }, returning: true });
    return [numberOfAffectedRows, affectedRows];
  }

  async deleteUser(id: string): Promise<number> {
    return User.destroy({ where: { id_usuario: id } });
  }

  async findById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }
}