import { UserCreationAttributes } from '../../infrastructures/models/User';
import { UserType } from '../../core/enums/UserType';

export class UserMapper {
  static toUserCreationAttributes(
    id: string,
    name: string,
    cpf: string,
    email: string,
    userType: UserType,
    isDeleted: boolean,
    addressId: string
  ): UserCreationAttributes {
    return {
      id_usuario: id,
      name_usuario: name,
      cpf,
      email,
      emailConfirmed: false,
      type: userType,
      isDeleted,
      addressId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  static toIndividualPayload(
    id: string,
    userId: string,
    addressId: string
  ): any {
    return {
      id_Individual: id,
      userId,
      addressId
    };
  }

  static toCompanyPayload(
    id: string,
    userId: string,
    addressId: string,
    cpf: string // usaremos o CPF para responsável, conforme exemplo
  ): any {
    return {
      id_Company: id,
      userId,
      addressId,
      cnpj: '',
      responsibleCpf: cpf
    };
  }
}