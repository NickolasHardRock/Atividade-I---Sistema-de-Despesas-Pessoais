import UserController from "../controller/userController";

class UserView{

    getUser(req,res){
        const {id,name,email} = req.query
        console.log(req.query)
        try {
            if(id){
                return res.status(200).json(UserController.getByid(Number(id)),{
                    data:[
                        {rel:"self",
                        method:"GET",
                        href: "sadfdsafas"}
                    ]
                })
            }

            if(name){
                return res.status(200).json(UserController.getByName(name),{
                    data:[{

                    }]
                })
            }
            if(email){
                return res.status(200).json(UserController.getByEmail(email),{
                    data:[{

                    }]
                })
            }

            return res.status(200).json(UserController.getAll(),{
                links:[{

                }]
            })

        } catch (error) {
            if(id){
                return res.status(404).json({message: error.message})
            }
            if(name){
                return res.status(404).json({message: error.message})
            }
            if(email){
                return res.status(404).json({message: error.message})
            }

            return res.status(400).json({message: error.message})


        }
    }

    create(req,res){
        try{
            const {name,email,senha} = req.body
            const NewUser = UserController.create(name,email,senha)
            res.status(201).json(NewUser)
        }catch(error){
            return res.status(400).json({message: error.message})
        }
    }

    update(req,res){
        try{
            const id = Number(req.params.id)
            const {name,email,senha} = req.body
            console.log(req.body)
            const UserUpdate = UserController.update(id,name,email,senha)
            res.status(200).json(UserUpdate)
        }catch(error){
            res.status(400).json({message: error.message})
        }
    }

    delete(req,res){
        try {
            const UserDelete = UserController.delete(Number(req.params.id))
            res.status(204).json(UserDelete)
        } catch (error) {
            return res.status(400).json({message: error.message})
        }
    }
}

export default new UserView()