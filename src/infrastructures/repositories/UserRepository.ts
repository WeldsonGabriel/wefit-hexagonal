import { User, UserCreationAttributes } from '../models/User'; // Ajuste o caminho conforme necessário
import { IUserRepository } from '../../ports/out/IUserRepository';

export default class UserRepository implements IUserRepository {
  async createUser(userData: UserCreationAttributes): Promise<User> {
    return User.create(userData);
  }

  async create(user: UserCreationAttributes, options?: any): Promise<User> {
      const createdUser = await User.create(user, options);
      if (!createdUser) {
        throw new Error('User creation failed');
      }
      return createdUser;
    }

  async getUserById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: { email },
      rejectOnEmpty: false
    });
  }

  async update(id: string, updateData: Partial<User>): Promise<boolean> {
    const [numberOfAffectedRows] = await User.update(updateData, { where: { id_usuario: id }, returning: true });
    return numberOfAffectedRows > 0;
  }

  async delete(id: string): Promise<number> {
    return User.destroy({ where: { id_usuario: id } });
  }

  async save(user: User): Promise<User> {
    return user.save();
  }

}
