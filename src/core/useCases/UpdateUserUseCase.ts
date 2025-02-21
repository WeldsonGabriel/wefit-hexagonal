import { User } from '../entities/User';
import { IUserRepository } from '../entities/User';
import { MessagingService } from '../services/MessagingService';

export class UpdateUserUseCase {
  private userRepository: IUserRepository;
  private messagingService: MessagingService;

  constructor(userRepository: IUserRepository, messagingService: MessagingService) {
    this.userRepository = userRepository;
    this.messagingService = messagingService;
  }

  async execute(user: User, newUser: User): Promise<User> {
    const updatedUser = await this.userRepository.update(user.id, newUser);
    this.messagingService.sendEmail('User updated', `User with ID ${updatedUser.id} has been updated.`);
    return updatedUser;
  }
}
