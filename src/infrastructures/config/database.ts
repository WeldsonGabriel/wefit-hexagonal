// src/infrastructures/database.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'default_db_name',
  process.env.MYSQL_USER || 'default_db_user',
  process.env.MYSQL_PASSWORD || 'default_db_password',
  {
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQLDB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

export default sequelize;
