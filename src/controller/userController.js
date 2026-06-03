import e from "express";
import jwt from  "jsonwebtoken";
import authConfig from '../config/auth.js'
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

    replacePassword(password){
        return '*'.repeat(password.length);
    }

    mapUser(user){
        const userData = user.dataValues || user;

        return{
            ...userData,
            password: this.replacePassword(userData.password)
        }
    }

    mapPublicUser(user){
        const mapped = this.mapUser(user);

        return{
            id: mapped.id,
            name: mapped.name,
            email: mapped.email,
        }
    }
    
    async getAll() {
        return (await User.getAllUser()).map(
            u => this.mapUser(u))
    }
    getAll() {
        const result = getAllUser();
        if (result.length === 0) {
            throw new Error("Não dados para retornar")
        }
        return result
    }

    getByid(id) {
        if (!id || isNaN(id) || id == '') {
            throw new Error("Favor informar id válido");
        }
        const result = getUserId(id);

        if (!result) {
            throw new Error("Usuario não encontrado");
        }

        return result
    }

    getByName(name) {
        if (!name) {
            throw new Error("Favor adicionar um parametro válido")
        }

        const result = getUserName(name)

        if (!result) {
            throw new Error("Usuario não encontrado")
        }

        return result

    }

    getByEmail(email) {

        const regexEmail = new RegExp(/^[a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,}$/)

        if (email == regexEmail.test(email)) {
            throw new Error("Favor adicionar um email válido")
        }

        const result = getUserEmail(email)

        if (!email) {
            throw new Error("Email não encontrado")
        }

        return result

    }

    create(name, email, senha) {
        if (!name) {
            throw new Error("Favor adicione um nome");
        }

        const regexEmail = new RegExp('/^[a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,}$/')

        if (!email && regexEmail.test(email)) {
            throw new Error("Favor adicione um email válido");
        }

        if (!senha) {
            throw new Error("Favor adicione uma senha")
        }

        return createUser(name, email, senha)

    }

    update(id, name, email, senha) {
        if (!id) {
            throw new Error("Por favor adicione um id válido");
        }
        if (!name) {
            throw new Error("Por favor adicione um name válido")
        }
        if (!email) {
            throw new Error("Por favor adicione um email válido")
        }
        if (!senha) {
            throw new Error("Por favor adicione uma senha válida")
        }

        return updateUser(id, name, email, senha);

    }

    delete(id) {
        if (!id) {
            throw new Error("Por favor adicione um id válido");
        }

        return deleteUser(id)
    }
}

export default new UserController();
