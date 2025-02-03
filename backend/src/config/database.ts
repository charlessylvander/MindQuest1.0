import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Explicitly type the sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
});

export { sequelize }; // Named export instead of default