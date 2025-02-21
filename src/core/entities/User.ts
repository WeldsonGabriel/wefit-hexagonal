import { UserType } from '../enums/UserType';

export interface IUser {
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

export class User {
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
    return new User(this.id, name, email);
  }

  delete() {
    this.isDeleted = true;
  }
}

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  // Outros métodos, como update, delete, etc.
}
