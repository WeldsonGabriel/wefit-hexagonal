// src/infrastructures/models/Individual.ts
import { DataTypes, Model, ModelStatic, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Address from './Address';

export interface IndividualAttributes {
  id_Individual: string;
  userId: string;
  addressId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IndividualCreationAttributes extends Optional<IndividualAttributes, 'id_Individual' | 'addressId' | 'createdAt' | 'updatedAt'> {}

export class Individual extends Model<IndividualAttributes, IndividualCreationAttributes> implements IndividualAttributes {
  public id_Individual!: string;
  public userId!: string;
  public addressId?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Individual.init({
  id_Individual: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
  tableName: 'Individual',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

Individual.belongsTo(User as ModelStatic<User>, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
Individual.belongsTo(Address, { foreignKey: 'addressId', as: 'address', onDelete: 'SET NULL' });

export default Individual;
