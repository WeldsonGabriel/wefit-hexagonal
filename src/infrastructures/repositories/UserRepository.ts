import User, { UserCreationAttributes } from '../models/User';

class UserRepository {
  async createUser(userData: Partial<User>): Promise<User> {
    return User.create(userData as UserCreationAttributes);
  }

  async getUserById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<[number]> {
    return User.update(updateData, { where: { id_usuario: id } });
  }

  async deleteUser(id: string): Promise<number> {
    return User.destroy({ where: { id_usuario: id } });
  }
}

export default new UserRepository();
