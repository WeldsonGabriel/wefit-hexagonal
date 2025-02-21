import { UserRepository } from '../'; // Ensure this path is correct and the file exists
import { MessagingService } from '../services/MessagingService';

export class User {
  id_usuario: any;
    name_usuario: string;
    cpf: string;
    email: string;
  constructor(id_usuario: string, name_usuario: string, cpf: string, email: string) {
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
