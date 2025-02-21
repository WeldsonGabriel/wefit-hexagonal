import { AddressRequestStatus } from '../enums/AddressRequestStatus';

export class AddressRequest {
  id: string;
  userId: string;
  newAddress: string;
  status: AddressRequestStatus;

  constructor(id: string, userId: string, newAddress: string) {
    this.id = id;
    this.userId = userId;
    this.newAddress = newAddress;
    this.status = AddressRequestStatus.PENDING;
  }

  approve() {
    this.status = AddressRequestStatus.APPROVED;
  }

  reject() {
    this.status = AddressRequestStatus.REJECTED;
  }
}
