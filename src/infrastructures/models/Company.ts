import { DataTypes, Model, Optional, ModelStatic } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Address from './Address';

export interface CompanyAttributes {
  id_Company: string;
  cnpj: string;
  responsibleCpf: string;
  userId: string;
  addressId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CompanyCreationAttributes extends Optional<CompanyAttributes, 'id_Company' | 'addressId' | 'createdAt' | 'updatedAt'> {}

export class Company extends Model<CompanyAttributes, CompanyCreationAttributes> implements CompanyAttributes {
  public id_Company!: string;
  public cnpj!: string;
  public responsibleCpf!: string;
  public userId!: string;
  public addressId?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  tableName: 'Company',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

Company.belongsTo(User as ModelStatic<User>, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
Company.belongsTo(Address, { foreignKey: 'addressId', as: 'address', onDelete: 'SET NULL' });

export default Company;