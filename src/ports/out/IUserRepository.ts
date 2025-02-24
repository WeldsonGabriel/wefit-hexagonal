import { User, UserCreationAttributes } from '../../infrastructures/models/User';

export interface IUserRepository {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<boolean>;
  delete(id: string): Promise<number>;
  save(user: User): Promise<User>;
  create(user: UserCreationAttributes, options?: { transaction?: any }): Promise<User>;
}