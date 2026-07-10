import category,{
    getAllCategorys,
    getCategoryId,
    getCategoryName,
    createCategory,
    updateCategory,
    deleteCategory
} from "../models/categoryModel.js";

class CategoryController{

    async getAll(){
        const result = await getAllCategorys();
        return result;
    }

    async getById(id){
        if (!id || isNaN(id) || id == '') {
            throw new Error("Favor informar id válido");
        }

        const result = await getCategoryId(id)

        if(!result){
            throw new Error("Categoria não encontrado");
        }

        return result;

    }

    async getByName(name){
        const result = await getCategoryName();
        return result;
    }

    async create(name,description){

        if(!name){
            throw new Error("Favor adicione um nome");
        }

        const result = await createCategory(name,description)

        return result

    }

    async update(id,name,description){
        if(!id){
            return new Error("Por favor adicione um id valido");    
        }

        if(!name){
            return new Error("Por favor adicione um nome valido");
        }

        const result = await updateCategory(id,name,description)
        return result
    }

    async delete(id){
        if(!id){
            return new Error("Por favor adicione um id valido");
        }

        const result = await deleteCategory(id)
        return result
    }

}

export default new CategoryController();