import { Individual, IndividualCreationAttributes } from '../../infrastructures/models/Individual';

export interface IIndividualRepository {
  create(individual: IndividualCreationAttributes, options?: any): Promise<Individual>;
  getById(id: string): Promise<Individual | null>;
  update(id: string, updateData: Partial<Individual>): Promise<boolean>;
  delete(id: string): Promise<number>;
}