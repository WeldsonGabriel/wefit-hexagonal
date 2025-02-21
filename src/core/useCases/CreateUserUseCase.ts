import { IUserRepository } from '../entities/User';
import { MessagingService } from '../services/MessagingService';

export class User {
  id: any;
  name: any;
  userType: any;
  address: any;
  companies: any;
    delete() {
        throw new Error('Method not implemented.');
    }
  id_usuario: any;
    name_usuario: string;
    cpf: string;
    email: string;
  isDeleted: boolean;
  updateUser: (name: string, email: string) => User;

  constructor(id_usuario: string, name_usuario: string, cpf: string, email: string) {
    this.isDeleted = false;
    this.updateUser = (name: string, email: string) => {
      this.name_usuario = name;
      this.email = email;
      return this;
    };
    this.id_usuario = id_usuario;
    this.name_usuario = name_usuario;
    this.cpf = cpf;
    this.email = email;
  }
}

export class CreateUserUseCase {
  private userRepository: IUserRepository;
  private messagingService: MessagingService;

  constructor(userRepository: IUserRepository, messagingService: MessagingService) {
    this.userRepository = userRepository;
    this.messagingService = messagingService;
  }

  async execute(id_usuario: string, name_usuario: string, cpf: string, email: string): Promise<User> {
    const user = new User(id_usuario, name_usuario, cpf, email);
    await this.userRepository.save(user);
    this.messagingService.sendEmail('User created', `User with ID ${user.id_usuario} has been created.`);
    return user;
  }
}
