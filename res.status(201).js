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
            })