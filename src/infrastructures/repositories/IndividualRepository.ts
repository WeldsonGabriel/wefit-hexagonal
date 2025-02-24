import { Individual, IndividualCreationAttributes } from '../models/Individual';
import { IIndividualRepository } from '../../ports/out/IIndividualRepository';

export default class IndividualRepository implements IIndividualRepository {
  async create(individual: IndividualCreationAttributes, options?: any): Promise<Individual> {
    const createdIndividual = await Individual.create(individual, options);
    if (!createdIndividual) {
      throw new Error('Failed to create Individual');
    }
    return createdIndividual;
  }

  async getById(id: string): Promise<Individual | null> {
    return Individual.findByPk(id);
  }

  async update(id: string, updateData: Partial<Individual>): Promise<boolean> {
    const [numberOfAffectedRows] = await Individual.update(updateData, { where: { id_Individual: id }, returning: true });
    return numberOfAffectedRows > 0;
  }

  async delete(id: string): Promise<number> {
    return Individual.destroy({ where: { id_Individual: id } });
  }
}