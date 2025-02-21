import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../core/useCases/CreateUserUseCase';
import { UpdateUserUseCase } from '../../core/useCases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../../core/useCases/DeleteUserUseCase';
import { UserMapper } from '../mappers/UserMapper';
import { User } from '../../core/entities/User';

export class UserController {
  userRepository: any;
    messagingService: any;
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase
  ) {}

  // Criação de usuário
  async create(req: Request, res: Response): Promise<Response> {
    try {
      // O corpo da requisição já deve ter sido validado anteriormente via middleware
      const userData = req.body;
      const { id_usuario, name_usuario, cpf, email } = userData;
      const createdUser = await this.createUserUseCase.execute(id_usuario, name_usuario, cpf, email);
      const userDTO = UserMapper.toDTO(createdUser);
      return res.status(201).json(userDTO);
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  // Atualização de usuário
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const existingUser = await this.findUserById(id);
      const user = await this.updateUserUseCase.execute(existingUser, updateData);
      const userDTO = UserMapper.toDTO(user);
      return res.status(200).json(userDTO);
    } catch (error: any) {
      console.error('Erro ao atualizar usuário:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  // Deleção lógica de usuário
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deleteUserUseCase.execute({
          id,
          name: undefined,
          userType: undefined,
          address: undefined,
          companies: undefined,
          delete: function (): void {
              throw new Error('Function not implemented.');
          },
          id_usuario: undefined,
          name_usuario: '',
          cpf: '',
          email: '',
          isDeleted: false,
          updateUser: function (name: string, email: string): User {
              throw new Error('Function not implemented.');
          }
      });
      return res.status(204).send(); // 204 No Content
    } catch (error: any) {
      console.error('Erro ao deletar usuário:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async execute(user: User, newUser: User): Promise<User> {
    const updatedUser: User = await this.userRepository.update(user.id, newUser);
    this.messagingService.sendEmail('User updated', `User with ID ${updatedUser.id} has been updated.`);
    return updatedUser;
  }
}


