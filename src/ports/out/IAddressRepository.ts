import { Address } from '../../infrastructures/models/Address';

export interface IAddressRepository {
  create(address: Partial<Address>): Promise<Address>;
  getById(id: string): Promise<Address | null>;
  update(id: string, address: Partial<Address>): Promise<boolean>;
  delete(id: string): Promise<number>;
}