import { User } from '../entities/User';
import { MessagingService } from './MessagingService';

export class UserService {
  private messagingService: MessagingService;

  constructor(messagingService: MessagingService) {
    this.messagingService = messagingService;
  }

  createUser(user: User) {
    // Logic to create user
    this.messagingService.sendEmail('User created', `User with ID ${user.id} has been created.`);
  }

  updateUser(user: User, newUser: User) {
    // Logic to update user
    this.messagingService.sendEmail('User updated', `User with ID ${user.id} has been updated.`);
  }

  deleteUser(user: User) {
    user.delete();
    this.messagingService.sendEmail('User deleted', `User with ID ${user.id} has been deleted.`);
  }
}
