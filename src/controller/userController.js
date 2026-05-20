import User, {
    getUserId,
    getAllUser,
    createUser,
    updateUser,
    deleteUser
} from "../models/userModel.js"

class UserController {

    getAll() {
        const result = User.getAllUser();
        if (result.length === 0) {
            throw new Error("Não dados para retornar")
        }
        return result
    }

    getByid(id) {
        if(!id || isNaN(id) || id == ''){
            throw new Error("Favor informar id válido");
        }
        const result = User.getByid(id);

        if(!result){
            throw new Error("Usuario não encontrado");
        }

        return result
    }

    










}