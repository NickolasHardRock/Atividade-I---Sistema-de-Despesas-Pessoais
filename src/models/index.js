import { BelongsTo } from "sequelize";
import sequelize from "../config/db.js";
import expense from "./expenseModel.js";
import user from "./userModel.js";

const initModels = () =>{

user.hasMany(expense,{
    foreignKey:'fk_usuarioId',
    as:'expense'
});

expense.BelongsTo,{user,
    foreignKey:'fk_usuarioId',
    as:'user'
}

return sequelize;

};

export {expense,user,initModels}
