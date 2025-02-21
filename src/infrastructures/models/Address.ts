// src/infrastructures/models/Address.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface AddressAttributes {
  id_Address: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  isCurrent: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AddressCreationAttributes extends Optional<AddressAttributes, 'id_Address' | 'complement' | 'isCurrent' | 'isDeleted' | 'createdAt' | 'updatedAt'> {}

export class Address extends Model<AddressAttributes, AddressCreationAttributes> implements AddressAttributes {
  public id_Address!: string;
  public street!: string;
  public number!: string;
  public complement?: string;
  public district!: string;
  public city!: string;
  public state!: string;
  public cep!: string;
  public isCurrent!: boolean;
  public isDeleted!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Address.init({
  id_Address: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  complement: {
    type: DataTypes.STRING,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCurrent: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  tableName: 'Address',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

export default Address;
