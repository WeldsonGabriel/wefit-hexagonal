// src/infrastructures/models/Company.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Address from './Address';

export interface CompanyAttributes {
  id_Company: string;
  cnpj: string;
  responsibleCpf: string;
  userId: string;
  addressId?: string;
}

export interface CompanyCreationAttributes extends Optional<CompanyAttributes, 'id_Company'> {}

export class Company extends Model<CompanyAttributes, CompanyCreationAttributes> implements CompanyAttributes {
  public id_Company!: string;
  public cnpj!: string;
  public responsibleCpf!: string;
  public userId!: string;
  public addressId?: string;
}

Company.init({
  id_Company: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  responsibleCpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  addressId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'Company',
  timestamps: false,
});

// Associações
Company.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
Company.belongsTo(Address, { foreignKey: 'addressId', as: 'address' });

// Para a chave única combinada, podemos usar índices:
sequelize.getQueryInterface().addIndex('Company', {
  fields: ['cnpj', 'responsibleCpf'],
  unique: true,
});

export default Company;
