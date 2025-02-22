import { IUserRepository } from '../ports/out/IUserRepository'; // ou o caminho correto da interface
import { MessagingService } from '../core/services/MessagingService';
import { User } from '../infrastructures/models/User';

export class CreateUserUseCase {
  private userRepository: IUserRepository;
  private messagingService: MessagingService;

  constructor(userRepository: IUserRepository, messagingService: MessagingService) {
    this.userRepository = userRepository;
    this.messagingService = messagingService;
  }

  async execute(userData: Partial<User>): Promise<User> {
    // Cria a entidade de usuário
    const user = await this.userRepository.createUser(userData);

    // Envia notificação de criação do usuário
    this.messagingService.sendEmail('User created', `User with ID ${user.id_usuario} has been created.`);

    return user;
  }
}
