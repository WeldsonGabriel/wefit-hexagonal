import { UserType } from '../../core/enums/UserType';
import { User } from '../../infrastructures/models/User';

export interface ICreateUserUseCase {
  execute(
    id_usuario: string,
    name_usuario: string,
    companies: string[],
    isDeleted: boolean,
    cpf: string,
    email: string,
    userType: UserType,
    address: string
  ): Promise<User>;
}