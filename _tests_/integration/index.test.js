import { describe,test,expect } from '@jest/globals';
import UserController from '../../src/controller/userController.js'

import User from '../../src/models/userModel.js'

describe("Test de Integração de criar usuario", () =>{

// test("Buscar um usuario",async () =>{
//    const user = await UserController.create("Nickolas","Nickolas@lamin","dlfsdklfasdl","Admin")
//    console.log(user)
// })

test("Buscar um usuario",async () =>{
   new User()
   const user = await UserController.delete(1)
   console.log(user)
})








})