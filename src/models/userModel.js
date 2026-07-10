import { sequelize } from "../config/db.js";
import { DataTypes, where } from "sequelize";

const user = sequelize.define('users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:true
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    }
})

async function getAllUser() {
    return await user.findAll();
}

async function getUserId(id) {
    return await user.findByPk(id);
}

async function getUserName(name) {
   
    return await user.findOne({where:{name}})
}

async function getUserEmail(email) {
    return await user.findOne({where:{email}})
}

async function createUser(name,email,password,role) {
    return await user.create(name,email,password,role);
}

async function updateUser(id,name,email,password,role) {
    const user = await getUserId(id);

    if(!user){
        throw new Error("Usuario não encontrado");
    }

    user.name = name;
    user.email = email;
    user.password = password;
    user.role = role;

    await user.save()
    console.log("Usuario atualizado")
    return user;
}

async function deleteUser(id) {
    const user = await getUserId(id);

    if(!user){
        throw new Error("Adicione um id");
    }
    await user.destroy();
    return null;
}

export default user

export{
    getUserId,
    getAllUser,
    getUserName,
    getUserEmail,
    createUser,
    updateUser,
    deleteUser
}
