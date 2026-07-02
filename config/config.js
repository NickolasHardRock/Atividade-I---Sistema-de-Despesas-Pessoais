
import dotenv from 'dotenv';
dotenv.config();

const parseBool = (val) => {
  if (val === undefined || val === null) return false;
  const v = String(val).toLowerCase();
  return v === 'true' || v === '1';
};

const common = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'despesasDb',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  dialect: 'mysql',
  logging: parseBool(process.env.DB_LOGGING) ? console.log : false
};

export default {
  development: { ...common },
  test: {
    ...common,
    database: process.env.DB_NAME_TEST || `${common.database}_test`,
    logging: false
  },
  production: {
    ...common,
    logging: false
  }
};
