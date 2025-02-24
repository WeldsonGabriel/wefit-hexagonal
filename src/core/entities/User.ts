import { UserType } from '../enums/UserType';

export interface UserInterface {
  id: string;
  name: string;
  cpf: string;
  email: string;
  isActive: boolean;
  phone?: string;
  mobile: string;
  type: UserType;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  constructor(
    public id: string,
    public name: string,
    public cpf: string,
    public email: string,
    public isActive: boolean,
    public type: UserType,
    public phone?: string,
    public mobile?: string,
    public isDeleted: boolean = false,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

  updateUser(name: string, email: string): User {
    return new User(this.id, name, this.cpf, email, this.isActive, this.type, this.phone, this.mobile, this.isDeleted, new Date(), new Date());
  }

  delete(): void {
    this.isDeleted = true;
  }
}

export interface IUserRepository {
  update(id: string, newUser: User): unknown;
  delete(id: string): unknown;
  save(user: User): unknown;
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  // Outros métodos, como update, delete, etc.
}
