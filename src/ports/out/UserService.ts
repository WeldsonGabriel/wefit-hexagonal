import UserRepository from '../../infrastructures/repositories/UserRepository';
import User from '../../infrastructures/models/User';

class UserService {
  async createUser(userData: Partial<User>): Promise<User> {
    return UserRepository.createUser(userData);
  }

  async getUserById(id: string): Promise<User | null> {
    return UserRepository.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return UserRepository.getUserByEmail(email);
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User | null> {
    const [updated] = await UserRepository.updateUser(id, updateData);
    if (updated) {
      return UserRepository.getUserById(id);
    }
    return null;
  }

  async deleteUser(id: string): Promise<boolean> {
    const deleted = await UserRepository.deleteUser(id);
    return deleted > 0;
  }
}

export default new UserService();
