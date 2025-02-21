import { User } from '../../core/entities/User';

export class UserMapper {
  static toDTO(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      userType: user.userType,
      address: user.address ? {
        street: user.address.street,
        number: user.address.number,
        complement: user.address.complement,
        district: user.address.district,
        city: user.address.city,
        state: user.address.state,
        cep: user.address.cep,
      } : null,
      companies: user.companies ? user.companies.map((company: { id: any; name: any; cnpj: any; }) => ({
        id: company.id,
        name: company.name,
        cnpj: company.cnpj,
      })) : [],
      // ...other fields
    };
  }
}
