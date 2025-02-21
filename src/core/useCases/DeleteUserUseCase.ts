import { User } from '../entities/User';
import { IUserRepository } from '../entities/User';
import { MessagingService } from '../services/MessagingService';

export class DeleteUserUseCase {
  private userRepository: IUserRepository;
  private messagingService: MessagingService;

  constructor(userRepository: IUserRepository, messagingService: MessagingService) {
    this.userRepository = userRepository;
    this.messagingService = messagingService;
  }

  async execute(user: User): Promise<void> {
    await this.userRepository.delete(user.id);
    this.messagingService.sendEmail('User deleted', `User with ID ${user.id} has been deleted.`);
  }
}
