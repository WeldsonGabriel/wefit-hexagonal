import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface UserAttributes {
  id_usuario: string;
  name_usuario: string;
  cpf: string;
  email: string;
  emailConfirmed: boolean;
  type: 'INDIVIDUAL' | 'COMPANY';
  phone?: string;
  mobile?: string;
  isDeleted?: boolean;
  addressId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id_usuario' | 'createdAt' | 'updatedAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id_usuario!: string;
  public name_usuario!: string;
  public cpf!: string;
  public email!: string;
  public emailConfirmed!: boolean;
  public type!: 'INDIVIDUAL' | 'COMPANY';
  public phone?: string;
  public mobile?: string;
  public isDeleted: boolean = false;
  public addressId?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id_usuario: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  emailConfirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('INDIVIDUAL', 'COMPANY'),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  mobile: {
    type: DataTypes.STRING,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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
  tableName: 'User',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

export default User;