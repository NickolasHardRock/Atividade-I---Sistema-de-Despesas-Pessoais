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
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    tableName: 'category'
});

async function getAllCategorys() {
    return await category.findAll();
}

async function getCategoryId(id) {
    return await category.findByPk(id);
}

async function getCategoryName(name) {
    return await category.findOne({where:{name}})
}

async function createCategory(name,description) {
    const validacao = category.findOne({where:{name}})

    if(name == validacao){
        throw new Error("Categoria já existente")
    }

    return await category.create({name,description})
}

async function updateCategory(id,name,description) {
    const categoryId = await getCategoryId(id);

    if(!categoryId){
        throw new Error("Categoria não encontrada");
    }

    categoryId.name = name;
    categoryId.description = description;

    await categoryId.save()
    return categoryId;

}

async function deleteCategory(id) {
    const categoryId = await getCategoryId(id);

    if(!categoryId){
        throw new Error("Adicione um id");
    }

    await categoryId.destroy();
    return null;
}

    
export default category

export{
    getAllCategorys,
    getCategoryId,
    getCategoryName,
    createCategory,
    updateCategory,
    deleteCategory
}