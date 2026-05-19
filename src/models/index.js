import sequelize from "../config/db.js";
import expense from "./expenseModel.js";
import user from "./userModel.js";

const initModels = () =>{

user.hasOne(expense,{
    foreignKey:'fk_usuarioId'
});

return sequelize;

};

export {expense,user,initModels}
