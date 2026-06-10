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

    async login(email,password){
        const user = await User.getUserEmail(email);

        if(!user || user.password !== password){
            throw new Error('Credenciais inválidas')
        }

        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role},
            authConfig.jwt.secret,
            {expiresIn: authConfig.jwt.expiresIn}
        );
        return{
            token,
            user: this.mapPublicUser(user)
        };

    }
    
    async getAll() {
        return (await User.getAllUser())
        .map(u => this.mapPublicUser(u));
    }

    // getAll() {
    //     const result = getAllUser();
    //     if (result.length === 0) {
    //         throw new Error("Não dados para retornar")
    //     }
    //     return result
    // }

    async getByid(id) {
        if (!id || isNaN(id) || id == '') {
            throw new Error("Favor informar id válido");
        }
        const result = await User.getUserId(id)

        if (!result) {
            throw new Error("Usuario não encontrado");
        }

        return this.mapPublicUser(result);
    }

    async getByName(name) {
        if (!name) {
            throw new Error("Favor adicionar um parametro válido")
        }

        const result = await User.getUserName(name)

        if (!result) {
            throw new Error("Usuario não encontrado")
        }

        return this.mapPublicUser(result)

    }

    async getByEmail(email) {

        const regexEmail = new RegExp('/^[a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,}$/')
  
        if (email == regexEmail.test(email)) {
            throw new Error("Favor adicionar um email válido")
        }

        const result = await User.getUserEmail(email)

        if (!email) {
            throw new Error("Email não encontrado")
        }

        return this.mapPublicUser(result)

    }

    async create(name, email, senha,role) {
        if (!name) {
            throw new Error("Favor adicione um nome");
        }

        const regexEmail = new RegExp('/^[a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,}$/')

        if (!email && regexEmail.test(email)) {
            throw new Error("Favor adicione um email válido");
        }

        if (!senha && senha.length < 6) {
            throw new Error("Favor adicione uma senha válida")
        }

        const user = await User.createUser(name,email,senha,role);
        return {...user, password: this.replacePassword(user.password)};

    }

    update(id, name, email, senha,role) {
        if (!id) {
            throw new Error("Por favor adicione um id válido");
        }
        if (!name) {
            throw new Error("Por favor adicione um name válido")
        }
        const regexEmail = new RegExp('/^[a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,}$/')

        if (!email && regexEmail.test(email)) {
            throw new Error("Favor adicione um email válido");
        }
        if (!senha && senha.length < 6) {
            throw new Error("Favor adicione uma senha válida")
        }

        const user = await User.updateUser(id,name,email,senha,role);
        return{...user, password: this.replacePassword(user.password)};

    }

    delete(id) {
        if (!id) {
            throw new Error("Por favor adicione um id válido");
        }

        return User.deleteUser(id);
    }
}

export default new UserController();
