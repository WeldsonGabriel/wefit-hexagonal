import { Company, CompanyCreationAttributes } from '../models/Company';
import { ICompanyRepository } from '../../ports/out/ICompanyRepository';

export default class CompanyRepository implements ICompanyRepository {
  async create(company: CompanyCreationAttributes, options?: any): Promise<Company> {
    const createdCompany = await Company.create(company, options);
    if (!createdCompany) {
      throw new Error('Company creation failed');
    }
    return createdCompany;
  }

  async getById(id: string): Promise<Company | null> {
    return Company.findByPk(id);
  }

  async update(id: string, updateData: Partial<Company>): Promise<boolean> {
    const [numberOfAffectedRows] = await Company.update(updateData, { where: { id_Company: id }, returning: true });
    return numberOfAffectedRows > 0;
  }

  async delete(id: string): Promise<number> {
    return Company.destroy({ where: { id_Company: id } });
  }
}