import { Company, CompanyCreationAttributes } from '../../infrastructures/models/Company';

export interface ICompanyRepository {
  create(company: CompanyCreationAttributes, options?: any): Promise<Company>;
  getById(id: string): Promise<Company | null>;
  update(id: string, updateData: Partial<Company>): Promise<boolean>;
  delete(id: string): Promise<number>;
}