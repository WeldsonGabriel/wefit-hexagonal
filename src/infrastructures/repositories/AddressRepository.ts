import AddressModel, { Address } from '../models/Address'; // Ajuste o caminho conforme necessário
import { IAddressRepository } from '../../ports/out/IAddressRepository';

export default class AddressRepository implements IAddressRepository {
  /**
   * Verifica se já existe um endereço com os mesmos dados.
   * Se existir, retorna o endereço existente. Caso contrário, retorna null.
   */
  async findByAddressData(addressData: {
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    cep: string;
  }): Promise<any | null> {
    return AddressModel.findOne({
      where: {
        street: addressData.street,
        number: addressData.number,
        district: addressData.district,
        city: addressData.city,
        state: addressData.state,
        cep: addressData.cep,
      },
    });
  }

  /**
   * Cria um novo endereço, caso não exista duplicata.
   */
  async create(addressData: {
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    cep: string;
  }): Promise<any> {
    // Verifica se o endereço já existe
    const existingAddress = await this.findByAddressData(addressData);
    if (existingAddress) {
      // Retorna o endereço existente para evitar duplicação
      return existingAddress;
    }

    // Caso não exista, cria um novo endereço
    return AddressModel.create({
      street: addressData.street,
      number: addressData.number,
      complement: addressData.complement,
      district: addressData.district,
      city: addressData.city,
      state: addressData.state,
      cep: addressData.cep,
      isCurrent: true,
      isDeleted: false,
    });
  }


  async getById(id: string): Promise<Address | null> {
    return Address.findByPk(id);
  }

  async update(id: string, updateData: Partial<Address>): Promise<boolean> {
    const [numberOfAffectedRows] = await Address.update(updateData, { where: { id_Address: id }, returning: true });
    return numberOfAffectedRows > 0;
  }

  async delete(id: string): Promise<number> {
    return Address.destroy({ where: { id_Address: id } });
  }
}