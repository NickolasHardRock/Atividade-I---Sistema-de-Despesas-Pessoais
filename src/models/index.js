import Sequelize from "sequelize";
import {sequelize} from "../config/db.js";
import expense from "./expenseModel.js";
import user from "./userModel.js";
import category from "./categoriaModel.js";

const initModels = () => {

    expense.belongsTo(category,{
        foreignKey:'fkCategoryId',
        as:'category'
    })
    category.hasMany(expense,{
        foreignKey:'fkCategoryId',
        as:'expense'
    })
    

    user.hasMany(expense,{
        foreignKey:'fkUsuarioId',
        as:'expense'
    });

    expense.belongsTo(user, {
        as:'user'
    })

    

    return sequelize;

};

export {expense,user,category,initModels}
