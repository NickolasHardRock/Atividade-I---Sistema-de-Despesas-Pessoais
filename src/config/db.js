import { Sequelize } from 'sequelize';
import dotenv from "dotenv"

dotenv.config()

const name = process.env.DB_NAME || 'despesasDb'
const user = process.env.DB_USER || 'root'
const password = process.env.DB_PASSWORD || '210400'
const host = process.env.DB_HOST || 'localhost'

const sequelize = new Sequelize(name, user , password, {
    host ,
    dialect:'mysql'
});

export { sequelize }