
export class Company {
  constructor(
    public id_Company: string,
    public cnpj: string,
    public responsibleCpf: string,
    public userId: string,
    public addressId?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
