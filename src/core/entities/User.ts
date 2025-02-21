import { UserType } from '../enums/UserType';
import { User } from '../useCases/CreateUserUseCase';
// import { User } from '../useCases/CreateUserUseCase';
import { User as UserEntity } from './User';

export interface UserInterface {
  id: string;
  name: string;
  cpf: string;
  email: string;
  isActive: boolean;
  phone?: string;
  mobile: string;
  type: 'INDIVIDUAL' | 'COMPANY';
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class UserClass {
  id: string;
  name: string;
  email: string;
  isDeleted: boolean;
  cpf: any;
  userType: any;
  address: any;
  companies: any;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isDeleted = false;
  }

  updateUser(name: string, email: string) {
    return new UserEntity(this.id, name, this.cpf, email);
  }

  delete() {
    this.isDeleted = true;
  }
}

export interface IUserRepository {
  update(id: string, newUser: UserClass): unknown;
  delete(id: string): unknown;
  save(user: UserClass): unknown;
  create(user: UserClass): Promise<UserClass>;
  findById(id: string): Promise<UserClass | null>;
  // Outros métodos, como update, delete, etc.
}
export { User };

