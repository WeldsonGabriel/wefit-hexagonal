import { User } from './User';

export class Individual {
  userId: string;
  addressId?: string;

  constructor(userId: string, addressId?: string) {
    this.userId = userId;
    this.addressId = addressId;
  }
}
