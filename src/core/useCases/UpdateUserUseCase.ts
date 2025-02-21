import { User } from '../entities/User';
import { MessagingService } from '../services/MessagingService';

export interface IUserRepository {
  update(id: string, user: User): Promise<User>;
}

export class UpdateUserUseCase {
  private userRepository: IUserRepository;
  private messagingService: MessagingService;

  constructor(userRepository: IUserRepository, messagingService: MessagingService) {
    this.userRepository = userRepository;
    this.messagingService = messagingService;
  }

  async execute(user: User, newUser: User): Promise<User> {
    const updatedUser: User = await this.userRepository.update(user.id, newUser);
    this.messagingService.sendEmail('User updated', `User with ID ${updatedUser.id} has been updated.`);
    return updatedUser;
  }
}
