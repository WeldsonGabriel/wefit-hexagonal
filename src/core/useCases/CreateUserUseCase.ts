import { IUserRepository } from '../../ports/out/IUserRepository';
import { IAddressRepository } from '../../ports/out/IAddressRepository';
import { IIndividualRepository } from '../../ports/out/IIndividualRepository';
import { ICompanyRepository } from '../../ports/out/ICompanyRepository';
import { MessagingService } from '../services/MessagingService';
import { UserType } from '../enums/UserType';
import { User, UserCreationAttributes } from '../../infrastructures/models/User';
import { Address } from '../../infrastructures/models/Address';
import Database from '../../infrastructures/config/database';
import { UserMapper } from '../../adapters/mappers/userMapper';

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private addressRepository: IAddressRepository,
    private individualRepository: IIndividualRepository,
    private companyRepository: ICompanyRepository,
    private messagingService: MessagingService
  ) {}

  async execute(
    id: string,
    name: string,
    isDeleted: boolean,
    cpf: string,
    email: string,
    userType: UserType,
    addressData: Partial<Address>
  ): Promise<User> {
    // Se a validação de entrada for feita por middleware, não é necessário repetir aqui
    const transaction = await Database.transaction();

    try {
      // Cria o endereço
      const address = await this.addressRepository.create(addressData);
      console.log("Endereço criado:", address);

      // Mapeia os dados para criação do usuário
      const userPayload: UserCreationAttributes = UserMapper.toUserCreationAttributes(
        id,
        name,
        cpf,
        email,
        userType,
        isDeleted,
        address.id_Address
      );

      // Cria o usuário
      const user = await this.userRepository.create(userPayload, { transaction });
      console.log("Usuário criado:", user);

      // Cria a entrada na tabela Individual ou Company conforme o tipo de usuário
      if (userType === UserType.INDIVIDUAL) {
        const individualPayload = UserMapper.toIndividualPayload(id, user.id_usuario, address.id_Address);
        await this.individualRepository.create(individualPayload, { transaction });
      } else if (userType === UserType.COMPANY) {
        const companyPayload = UserMapper.toCompanyPayload(id, user.id_usuario, address.id_Address, cpf);
        await this.companyRepository.create(companyPayload, { transaction });
      }

      // Confirma a transação
      await transaction.commit();

      // Envia o email de boas-vindas (fora da transação para evitar que falha no envio impacte o banco)
      await this.messagingService.sendWelcomeEmail(email);

      return user;
    } catch (error) {
      // Reverte a transação em caso de erro
      await transaction.rollback();
      if (error instanceof Error) {
        throw new Error(`Erro ao criar usuário: ${error.message}`);
      } else {
        throw new Error('Erro ao criar usuário: erro desconhecido');
      }
    }
  }
}
