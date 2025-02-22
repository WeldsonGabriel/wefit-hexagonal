import User from '../../infrastructures/models/User';

class UserRepository {
  static async createUser(userData: Partial<User>): Promise<User> {
    // implementation
    return {} as User; // placeholder return
  }

  static async getUserById(id: string): Promise<User | null> {
    // implementation
    return null; // placeholder return
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    // implementation
    return null; // placeholder return
  }

  static async updateUser(id: string, updateData: Partial<User>): Promise<[number, User[]]> {
    // implementation
    return [0, []]; // placeholder return
  }

  static async deleteUser(id: string): Promise<number> {
    // implementation
    return 0; // placeholder return
  }

  // existing methods
}

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