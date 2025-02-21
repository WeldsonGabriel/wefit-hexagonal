// src/infrastructures/models/AddressRequest.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

export interface AddressRequestAttributes {
  id_Request_Address: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;
}

export interface AddressRequestCreationAttributes extends Optional<AddressRequestAttributes, 'id_Request_Address' | 'complement' | 'createdAt' | 'updatedAt'> {}

export class AddressRequest extends Model<AddressRequestAttributes, AddressRequestCreationAttributes> implements AddressRequestAttributes {
  public id_Request_Address!: string;
  public street!: string;
  public number!: string;
  public complement?: string;
  public district!: string;
  public city!: string;
  public state!: string;
  public cep!: string;
  public status!: 'PENDING' | 'APPROVED' | 'REJECTED';
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AddressRequest.init({
  id_Request_Address: {
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
  status: {
    type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
    defaultValue: 'PENDING',
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'AddressRequest',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

AddressRequest.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });

export default AddressRequest;
