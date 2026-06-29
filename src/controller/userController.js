import e from "express";
import jwt from  "jsonwebtoken";
import authConfig from '../config/auth.js'
import bcrypt, { hash } from "bcrypt"
import User, {
    getUserId,
    getAllUser,
    getUserName,
    getUserEmail,
    createUser,
    updateUser,
    deleteUser
} from "../models/userModel.js"

const saltRounds = 10;

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
            password: mapped.password
        }
    }

    async login(email,password){
        const user = await getUserEmail(email);

        if(!user.name){
            throw new Error('Usuário não encontrado');
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            throw new Error('Senha inválida')
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

        const usersAll = await getAllUser();
        const result = usersAll.map(u => this.mapPublicUser(u));

        return result
    }

    async getByid(id) {
        if (!id || isNaN(id) || id == '') {
            throw new Error("Favor informar id válido");
        }
        const result = await getUserId(id)

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

    async create(name, email, password, role) {
        if (!name) {
            throw new Error("Favor adicione um nome");
        }

         if (email.length < 5 || !email.includes('@')) {
            throw new Error('O email deve conter pelo menos 5 caracteres e incluir um "@"');
        }

        if (!password || password.length < 6) {
            throw new Error("Favor adicione uma senha válida")
        }
        if(role !== "Admin" && role !== "user"){
            throw new Error("Escolha um perfil válido (Admin / user)")
        }

        const hashedPassword = await bcrypt.hash(password,saltRounds);

        console.log(hashedPassword)

        const { dataValues: user } = await createUser( name,email,hashedPassword,role );
        return {...user, password: this.replacePassword(user.password)};

    }

    async update(id, name, email, password,role) {
        if (!id) {
            throw new Error("Por favor adicione um id válido");
        }
        if (!name) {
            throw new Error("Por favor adicione um name válido")
        }
        const regexEmail = new RegExp(/^[a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,}$/)

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
