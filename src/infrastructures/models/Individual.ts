// src/infrastructures/models/Individual.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Address from './Address';

export interface IndividualAttributes {
  id_Individual: string;
  userId: string;
  addressId?: string;
}

export interface IndividualCreationAttributes extends Optional<IndividualAttributes, 'id_Individual'> {}

export class Individual extends Model<IndividualAttributes, IndividualCreationAttributes> implements IndividualAttributes {
  public id_Individual!: string;
  public userId!: string;
  public addressId?: string;
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
    unique: true,
  },
  addressId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'Individual',
  timestamps: false,
});

// Associações
Individual.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
Individual.belongsTo(Address, { foreignKey: 'addressId', as: 'address' });

export default Individual;
