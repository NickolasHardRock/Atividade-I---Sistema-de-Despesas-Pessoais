import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

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
    senha:{
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
    const user = await  user.findAll()

    return await user.find(user => user.name === name)
}

async function getUserEmail(email) {
    const user = await user.findAll()

    return await user.find(user => user.email === email)
}

async function createUser(name,email,senha,role) {
    return await user.create({name,email,senha,role});
}

async function updateUser(id,name,email,senha,role) {
    const user = await getUserId(id);

    if(!user){
        throw new Error("Usuario não encontrado");
    }

    user.name = name;
    user.email = email;
    user.senha = senha;
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
