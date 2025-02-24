import { Address } from '../models/Address'; // Ajuste o caminho conforme necessário
import { AddressCreationAttributes } from '../models/Address';
import { IAddressRepository } from '../../ports/out/IAddressRepository';

export default class AddressRepository implements IAddressRepository {
  async create(addressData: Partial<Address>): Promise<Address> {
    return Address.create(addressData as AddressCreationAttributes);
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