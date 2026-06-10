import { Sequelize } from "sequelize";
import {MySqlDialect} from "@sequelize/mysql"
const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./database.sqlite'
})

export default sequelize