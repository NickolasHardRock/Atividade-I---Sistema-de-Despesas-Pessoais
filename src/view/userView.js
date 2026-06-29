import UserController from "../controller/userController.js";

class UserView {

    async getUser(req, res) {
        const { id, name, email } = req.query
        const getAll = await UserController.getAll()
        try {
            if (id) {
                const getId = await UserController.getByid(Number(id))
                res.status(200).json({
                message: "Usuario id "+ id,
                data: getId,
                links: [
                        {
                            rel: "self",
                            method: "GET",
                            href: `/api/v1/usuarios/?id=` + id
                        }
                    ],
                    links: [
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/usuarios/"
                        },
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/usuarios/?name=?"
                        },
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/usuarios/?email"
                        }
                    ]
            })
            }

            if (name) {
                return res.status(200).json(UserController.getByName(name), {
                    data: [
                        {
                            rel: "self",
                            method: "GET",
                            href: "http://localhost:3000/api/v1/usuarios/?name=?"
                        }
                    ],
                    links: [
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/usuarios/"
                        },
                        {
                            method: "GET",
                            href: `/api/v1/usuarios/?id=` + id
                        },
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/usuarios/?email"
                        }
                    ]
                })
            }
            if (email) {
                return res.status(200).json(UserController.getByEmail(email), {
                    data: [
                        {
                            rel: "self",
                            method: "GET",
                            href: "http://localhost:3000/api/v1/usuarios/?email"
                        }
                    ],
                    links: [
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/usuarios/"
                        },
                        {
                            method: "GET",
                            href: `/api/v1/usuarios/?id=` + id
                        },
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/usuarios/?name=?"
                        }
                    ]
                })
            }
            
            res.status(200).json({
                message: "Usuarios da base",
                data: getAll,
                links: [
                    {
                        rel: "self",
                        method: "GET",
                        href: "http://localhost:3000/api/v1/usuarios/"
                    }
                ],
                links: [
                    {
                        method: "GET",
                        href: `/api/v1/usuarios/?id=` + id
                    },
                    {
                        method: "GET",
                        href: "http://localhost:3000/api/v1/usuarios/?email"
                    },
                    {
                        method: "GET",
                        href: "http://localhost:3000/api/v1/usuarios/?name=?"
                    }
                ]
            })

        } catch (error) {
            if (id) {
                return res.status(404).json({ message: error.message })
            }
            if (name) {
                return res.status(404).json({ message: error.message })
            }
            if (email) {
                return res.status(404).json({ message: error.message })
            }

            return res.status(400).json({ message: error.message })


        }
    }

     async createUser(req, res) {
        try {
            const { name, email, password, role } = req.body
            
            if(!name || !email || !password || !role){
                return res.status(400).json({error: 'Nome, Email, Senha e Perfil são obrigatórios'});
            }
            
            const NewUser = await UserController.create(name, email, password, role)

            res.status(201).json({
                message: "Usuario criado",
                data: NewUser,
                links: [
                    {
                        rel: "self",
                        method: "POST",
                        href: "http://localhost:3000/api/v1/usuarios/"
                    },
                    {
                        method: "PUT",
                        href: "http://localhost:3000/api/v1/usuarios/?id="
                    },
                    {

                        method: "DELETE",
                        href: "http://localhost:3000/api/v1/usuarios/?id=" 
                    },
                    {
                        method: "GET",
                        href: "http://localhost:3000/api/v1/usuarios/?id=" 
                    }
                ]
            })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    async login(req,res) {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error: 'Email e senha são obrigatórios'});
        }

        const auth = await UserController.login(email,password);
        return res.json(auth);
    }catch(error){
        console.error("Erro em login user:",error);
        return res.status(401).json({error: error.message});
    }

    update(req, res) {
        try {
            const id = Number(req.params.id)
            const { name, email, senha } = req.body
            console.log(req.body)
            const UserUpdate = UserController.update(id, name, email, senha)
            res.status(200).json(UserUpdate), {
                message: "Usuario atualizado",
                data: [
                    {
                        rel: "self",
                        method: "POST",
                        href: "http://localhost:3000/api/v1/usuarios/"
                    },
                    {
                        method: "DELETE",
                        href: "http://localhost:3000/api/v1/usuarios/?id=" 
                    },
                    {
                        method: "GET",
                        href: "http://localhost:3000/api/v1/usuarios/?id=" 
                    }
                ]
            }
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    delete(req, res) {
        try {
            const UserDelete = UserController.delete(Number(req.params.id))
            res.status(204).json(UserDelete),{
                message:"Usuario deletado "+ id,
            links:[
                {
                    rel:"self",
                    method:"DELETE",
                    href:"http://localhost:3000/api/v1/usuarios/"
                },
                {
                    method:"POST",
                    href:"http://localhost:3000/api/v1/usuarios/"
                },
                {
                    method:"PUT",
                    href:"http://localhost:3000/api/v1/usuarios/?id=?"
                },
                {
                    method:"GET",
                    href:"http://localhost:3000/api/v1/usuarios/"
                }
            ]
            }
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }
}

export default new UserView()