import Sequelize from "sequelize";
import sequelize from "../config/db.js";
import expense from "./expenseModel.js";
import user from "./userModel.js";

const initModels = () => {

    /*user.hasMany(expense,{
        foreignKey:'fkUsuarioId',
        as:'expense'
    });

    expense.belongsTo(user, {
        as:'user'
    })
*/
    return sequelize;

};

export {expense,user,initModels}
