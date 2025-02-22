import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../useCases/CreateUserUseCase'; // ajuste o caminho conforme necessário
import UserRepository from '../../infrastructures/repositories/UserRepository'; // Ajuste o caminho conforme necessário
import { MessagingService } from '../../core/services/MessagingService';

class UserController {
  private createUserUseCase: CreateUserUseCase;
  private userRepository = new UserRepository();

  constructor() {
    // Caso não esteja usando injeção de dependência, instancie o caso de uso
    const messagingService = new MessagingService();
    this.createUserUseCase = new CreateUserUseCase(this.userRepository, messagingService);
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.createUserUseCase.execute(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userRepository.getUserById(req.params.id);
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
      const user = await this.userRepository.getUserByEmail(req.params.email);
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
      const [updated] = await this.userRepository.updateUser(req.params.id, req.body);
      if (updated) {
        const updatedUser = await this.userRepository.getUserById(req.params.id);
        return res.status(200).json(updatedUser);
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.userRepository.deleteUser(req.params.id);
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