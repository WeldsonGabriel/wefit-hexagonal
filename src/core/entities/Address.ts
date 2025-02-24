export class Address {
  constructor(
    public id_Address: string,
    public street: string,
    public number: string,
    public district: string,
    public city: string,
    public state: string,
    public cep: string,
    public isCurrent: boolean = true,
    public isDeleted: boolean = false,
    public complement?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
