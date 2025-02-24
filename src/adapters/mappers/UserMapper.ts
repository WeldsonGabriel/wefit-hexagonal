import { UserCreationAttributes } from '../../infrastructures/models/User';
import { UserType } from '../../core/enums/UserType';
import { v4 as uuidv4 } from 'uuid';
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
        id_usuario: id && id.trim() !== '' ? id : uuidv4(), // Gera um novo UUID se id for vazio
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
        id_Individual: uuidv4(),
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
        id_Company: uuidv4(),
      userId,
      addressId,
      cnpj: '',
      responsibleCpf: cpf
    };
  }
}