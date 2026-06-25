import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const category = sequelize.define('category',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    tableName: 'category'
});

    
export default category