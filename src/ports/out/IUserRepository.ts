import { User } from '../../infrastructures/models/User'; // Ajuste o caminho conforme necessário

export interface IUserRepository {
  createUser(userData: Partial<User>): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, updateData: Partial<User>): Promise<[number, User[]]>;
  deleteUser(id: string): Promise<number>;
  findById(id: string): Promise<User | null>;
}
