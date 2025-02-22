import { Request, Response } from 'express';
import UserRepository from '../../infrastructures/repositories/UserRepository';

class UserController {
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserRepository.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserRepository.getUserById(req.params.id);
      if (user !== null) {
        return res.status(200).json(user);
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserRepository.getUserByEmail(req.params.email);
      if (user !== null) {
        return res.status(200).json(user);
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const [updated] = await UserRepository.updateUser(req.params.id, req.body);
      if (updated > 0) {
        const updatedUser = await UserRepository.getUserById(req.params.id);
        return res.status(200).json(updatedUser);
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      // Chama o método deleteUser passando o id e espera um número como resultado
      const result = await UserRepository.deleteUser(req.params.id);
      if (result > 0) {
        return res.status(200).json({ message: 'User deleted successfully' });
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new UserController();
