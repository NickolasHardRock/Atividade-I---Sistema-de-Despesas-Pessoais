import categoryController from "../controller/categoryController.js";

class CategoryView{

    async getCategory(req,res) {
        const {id,name} = req.query

        try {
            if(id){
                const result = await categoryController.getById(Number(id))
                return res.status(200).json({
                    message: "Categoria por ID",
                    data: result,
                    links:[
                        {
                            rel: "self",
                            method: "GET",
                            href: "http://localhost:3000/api/v1/categoria/?id=?"
                        },
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/categoria/?name=?"
                        }
                        ,
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/despesas/"
                        }
                    ]
                })
            }
            if(name){
                const result = await categoryController.getByName(name)
                return res.status(200).json({
                    message: "Categoria por Nome",
                    data: result,
                    links:[
                        {
                            rel: "self",
                            method: "GET",
                            href: "http://localhost:3000/api/v1/categoria/?name=?"
                        },
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/categoria/?id=?"
                        }
                        ,
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/despesas/"
                        }
                    ]
                })
            }
            
            const result = await categoryController.getAll()
            return await res.status(200).json({
                message: "Todas as Categorias",
                data: result,
                links:[
                    {
                            rel: "self",
                            method: "GET",
                            href: "http://localhost:3000/api/v1/categoria/"
                        },
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/categoria/?id=?"
                        }
                        ,
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/despesas/?name=?"
                        }
                ]
            })
            
        } catch (error) {
            if(id){
                return res.status(404).json({error: error.message});
            }
            if(name){
                return res.status(404).json({error: error.message})
            }

            return res.status(400).json({error: error.message})
        }
    }

    async createCategory(req,res) {
        try {
            const { name,description} = req.body; 
            const newCategory = await categoryController.create(name,description)
            res.status(201).json({
                message: "Categoria criada",
                data: newCategory,
                links:[
                    {
                        rel: "self",
                        method: "POST",
                        href: "http://localhost:3000/api/v1/categoria/"
                    },
                    {
                        method: "PUT",
                        href: "http://localhost:3000/api/v1/categoria/?id="
                    },
                    {

                        method: "DELETE",
                        href: "http://localhost:3000/api/v1/categoria/?id="
                    },
                    {
                        method: "GET",
                        href: "http://localhost:3000/api/v1/categoria/?id="
                    }
                ]
            })
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }

    async updateCategory(req,res) {
        try {
            const id = Number(req.params.id)
            const {name,description} = req.body
            const categoryUpdate = await categoryController.update(id,name,description)
            res.status(201).json({
                message: "Categoria Atualizada",
                data: categoryUpdate,
                links:[
                    {
                        rel: "self",
                        method: "PUT",
                        href: "http://localhost:3000/api/v1/categoria/?id="
                    },
                    {
                        method: "DELETE",
                        href: "http://localhost:3000/api/v1/categoria/?id="
                    },
                    {
                        method: "GET",
                        href: "http://localhost:3000/api/v1/categoria/?id="
                    }
                ]
            })
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }

    async deleteCategory(req,res){
        try {
            const categoryDelete = await categoryController.delete(Number(req.params.id))
            res.status(204).json({
                message: "Categoria Deletada",
                data: categoryDelete,
                links: [
                    {
                        rel: "self",
                        method: "DELETE",
                        href: "http://localhost:3000/api/v1/categoria/?id=?"
                    },
                    {
                        method: "PUT",
                        href: "http://localhost:3000/api/v1/despesas/?id=?"
                    },
                    {
                        method: "GET",
                        href: "http://localhost:3000/api/v1/despesas/?id=?"
                    }
                ]
            })
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }
}
    export default new CategoryView()
