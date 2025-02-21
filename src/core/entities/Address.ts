export class Address {
  id: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isCurrent: boolean;
  isDeleted: boolean;

  constructor(id: string, street: string, number: string, neighborhood: string, city: string, state: string, zipCode: string) {
    this.id = id;
    this.street = street;
    this.number = number;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.isCurrent = true;
    this.isDeleted = false;
  }

  updateAddress(street: string, number: string, neighborhood: string, city: string, state: string, zipCode: string) {
    this.isCurrent = false;
    return new Address(this.id, street, number, neighborhood, city, state, zipCode);
  }

  delete() {
    this.isDeleted = true;
  }
}
