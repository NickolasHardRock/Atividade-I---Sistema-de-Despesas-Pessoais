import {describe, test,expect,beforeAll,afterAll} from "@jest/globals"
import ControllerUser from "../../src/controller/userController.js"
import { sequelize } from '../../src/config/db.js'
import { getAllUser } from "../../src/models/userModel.js";

let trasaction;

beforeAll(async() =>{
    trasaction = await sequelize.transaction()
})



describe("Teste de Integração de Usuario",() =>{

    test("Buscar todos os usuario", async() =>{
        const getAllUser = await ControllerUser.getAll()
        console.log(getAllUser)
        expect(getAllUser).toBeInstanceOf(Array)
    })

    test("Buscar um usuario por id", async() =>{
        const getUserId = await ControllerUser.getByid(1)
        console.log(getUserId)
        expect(getUserId).toBeDefined()
        expect(getUserId).toHaveProperty("id",1)
    })

    test("Buscar usuario por nome",async () => {
        const getUserName = await ControllerUser.getByName("Admin")
        console.log(getUserName)
        expect(getUserName).toBeDefined()
        expect(getUserName).toHaveProperty("name","Admin")
    })

    test("Buscar usuario por email",async () => {
        const getUserEmail = await ControllerUser.getByEmail("admin@example.com")
        console.log(getUserEmail)
        expect(getUserEmail).toBeDefined()
        expect(getUserEmail).toHaveProperty("email","admin@example.com")
    })

    test("Criar usuario", async () => {
        const name = "joao"
        const email = "nickolas@lamin.com"
        const password = "123456"
        const role = "Admin"

        const user = await ControllerUser.create(name,email,password,role,trasaction)
        console.log(user,"ta dando pau aqui")
        expect(user.name).toHaveProperty("name","joao")
        expect(user.email).toHaveProperty("email","nickolas@lamin.com")
        expect(user.password).toHaveProperty("password")
        expect(user.role).toHaveProperty("role","Admin")
        
    })


})

afterAll(async () =>{
    trasaction.rollback()
    sequelize.close()

})