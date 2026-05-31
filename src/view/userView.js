import UserController from "../controller/userController.js";

class UserView {

    getUser(req, res) {
        const { id, name, email } = req.query
        console.log(req.query)
        try {
            if (id) {
                return res.status(200).json(UserController.getByid(Number(id)), {
                    data: [
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

            return res.status(200).json(UserController.getAll(), {
                data: [
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

    create(req, res) {
        try {
            const { name, email, senha } = req.body
            const NewUser = UserController.create(name, email, senha)
            res.status(201).json(NewUser), {
                message: "Usuario criada",
                data: [
                    {
                        rel: "self",
                        method: "POST",
                        href: "http://localhost:3000/api/v1/usuarios/"
                    },
                    {
                        method: "PUT",
                        href: "http://localhost:3000/api/v1/usuarios/?id=" + id
                    },
                    {

                        method: "DELETE",
                        href: "http://localhost:3000/api/v1/usuarios/?id=" + id
                    },
                    {
                        method: "GET",
                        href: "http://localhost:3000/api/v1/usuarios/?id=" + id
                    }
                ]
            }
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
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
                        href: "http://localhost:3000/api/v1/usuarios/?id=" + id
                    },
                    {
                        method: "GET",
                        href: "http://localhost:3000/api/v1/usuarios/?id=" + id
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