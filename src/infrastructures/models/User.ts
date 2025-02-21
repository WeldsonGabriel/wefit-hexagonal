// src/infrastructures/models/User.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface UserAttributes {
  id_usuario: string;
  name_usuario: string;
  cpf: string;
  email: string;
  emailConfirmed: boolean;
  phone?: string;
  mobile: string;
  isDeleted: boolean;
  type: 'INDIVIDUAL' | 'COMPANY';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id_usuario' | 'emailConfirmed' | 'isDeleted' | 'createdAt' | 'updatedAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id_usuario!: string;
  public name_usuario!: string;
  public cpf!: string;
  public email!: string;
  public emailConfirmed!: boolean;
  public phone?: string;
  public mobile!: string;
  public isDeleted!: boolean;
  public type!: 'INDIVIDUAL' | 'COMPANY';

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
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
    },
    phone: {
      type: DataTypes.STRING,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    type: {
      type: DataTypes.ENUM('INDIVIDUAL', 'COMPANY'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'User',
    timestamps: true,
  }
);

export default User;
