import User, {
    getUserId,
    getAllUser,
    getUserName,
    getUserEmail,
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
        if (!id || isNaN(id) || id == '') {
            throw new Error("Favor informar id válido");
        }
        const result = User.getByid(id);

        if (!result) {
            throw new Error("Usuario não encontrado");
        }

        return result
    }

    getByName(name) {
        if (!name) {
            throw new Error("Favor adicionar um parametro válido")
        }

        const result = User.getUserName(name)

        if (!result) {
            throw new Error("Usuario não encontrado")
        }

        return result

    }

    getByEmail(email) {

        const regexEmail = new RegExp('/^[a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,}$/')

        if (email == regexEmail) {
            throw new Error("Favor adicionar um email válido")
        }

        const result = User.getByEmail(email)

        if (!email) {
            throw new Error("Email não encontrado")
        }

        return result

    }

    create(name, email, senha) {
        if (!name) {
            return new Error("Favor adicione um nome");
        }

        const regexEmail = new RegExp('/^[a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,}$/')

        if (!email && regexEmail.test) {
            return new Error("Favor adicione um email válido");
        }

        if (!senha) {
            return new Error("Favor adicione uma senha")
        }

        return User.createUser(name, email, senha)

    }

    update(id,name,email,senha){
        if(!id){
        return new Error("Por favor adicione um id válido");
        }
        if(!name){
            return new Error("Por favor adicione um name válido")
        }
        if(!email){
            return new Error("Por favor adicione um email válido")
        }
        if(!senha){
            return new Error("Por favor adicione uma senha válida")
        }

        return User.updateUser(id,name,email,senha);

    }

    delete(id){
        if(!id){
        return new Error("Por favor adicione um id válido");
        }
        
        return User.deleteUser(id)
    }
}

    export default new UserController();
