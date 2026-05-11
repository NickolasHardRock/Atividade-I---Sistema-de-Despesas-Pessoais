
import ExpenseController from "../controller/expenseControler.js"

class ExpenseView {


    getExpense(req, res) {
        const { id, category, date, summary } = req.query
        console.log(req.query)
        try {
            if (id) {
                return res.status(200).json(ExpenseController.getById(Number(id)), {
                    data: [
                        {
                            rel: "self",
                            method: "GET",
                            href: `http://localhost:3000/api/v1/Despesas/?id=` + id
                        },
                        {
                            rel: "update",
                            method: "PUT",
                            href: `http://localhost:3000/api/v1/Despesas/` + id
                        },
                        {
                            rel: "delete",
                            method: "DELETE",
                            href: `http://localhost:3000/api/v1/Despesas/` + id
                        }
                    ],
                    links: [
                        {
                            rel: "self",
                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesass/"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?id=?"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?category=?"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?date=YYYY-MM-DD"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?summary=true"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?category=?&summary=true"
                        }
                    ]
                })
            }
            if (category && summary === 'true') {

                return res.status(200).json(ExpenseController.summaryCategory(category), {
                    data: [
                        {
                            rel: "self",
                            method: "GET",
                            href: `http://localhost:3000/api/v1/Despesas/?category=` + category + `&summary=true`
                        }
                    ],
                    links: [
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/"
                        },
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?id=?"
                        },
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?category=?"
                        },
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?date=YYYY-MM-DD"
                        },
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?summary=true"
                        },
                        {
                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?category=?&summary=true"
                        }
                    ]
                })
            }
            if (category) {

                return res.status(200).json(ExpenseController.getByCategory(category),
                    {
                        data: [
                            {
                                rel: "self",
                                method: "GET",
                                href: `http://localhost:3000/api/v1/Despesa/?category` + category
                            }
                        ],
                        links: [
                            {
                                rel: "self",
                                method: "GET",
                                href: "http://localhost:3000/api/v1/Despesas/"
                            },
                            {

                                method: "GET",
                                href: "http://localhost:3000/api/v1/Despesas/?id=?"
                            },
                            {

                                method: "GET",
                                href: "http://localhost:3000/api/v1/Despesas/?category=?"
                            },
                            {

                                method: "GET",
                                href: "http://localhost:3000/api/v1/Despesas/?date=YYYY-MM-DD"
                            },
                            {

                                method: "GET",
                                href: "http://localhost:3000/api/v1/Despesas/?summary=true"
                            },
                            {

                                method: "GET",
                                href: "http://localhost:3000/api/v1/Despesas/?category=?&summary=true"
                            }
                        ]
                    }
                )
            }
            if (date) {
                return res.status(200).json(ExpenseController.getByDate(date), {
                    data: [
                        {
                            rel: "self",
                            method: "GET",
                            href: `http://localhost:3000/api/v1/Despesas/?category` + date
                        }
                    ],
                    links: [
                        {
                            rel: "self",
                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?id=?"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?category=?"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?date=YYYY-MM-DD"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?summary=true"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?category=?&summary=true"
                        }
                    ]
                })
            }
            if (summary === 'true') {
                return res.status(200).json(ExpenseController.summary(), {
                    data: [
                        {
                            rel: "self",
                            method: "GET",
                            href: `http://localhost:3000/api/v1/Despesas/?summary=true`
                        }
                    ],
                    links: [
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?id=?"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?category=?"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?date=YYYY-MM-DD"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?summary=true"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/Despesas/?category=?&summary=true"
                        }
                    ]
                })
            }

            return res.status(200).json(ExpenseController.getAll(), {
                links: [
                    {
                        rel: "self",
                        method: "GET",
                        href: "http://localhost:3000/api/v1/Despesass/"
                    },
                    {
                        method: "GET",
                        href: "http://localhost:3000/api/v1/Despesas/?id=?"
                    },
                    {

                        method: "GET",
                        href: "http://localhost:3000/api/v1/Despesas/?category=?"
                    },
                    {

                        method: "GET",
                        href: "http://localhost:3000/api/v1/Despesas/?date=YYYY-MM-DD"
                    },
                    {

                        method: "GET",
                        href: "http://localhost:3000/api/v1/Despesas/?summary=true"
                    },
                    {

                        method: "GET",
                        href: "http://localhost:3000/api/v1/Despesas/?category=?&summary=true"
                    }
                ]

            })


        } catch (error) {
            if(id){
                return res.status(404).json({error: error.message})
            }
            if(category && summary === 'true'){
                return res.status(404).json({error: error.message})
            }
            if(category){
                return res.status(404).json({error: error.message})
            }
            if(date){
                return res.status(404).json({error: error.message})
            }
            if(summary === 'true'){
                return res.status(404).json({error: error.message})
            }

            return res.status(400).json({ error: error.message })
        }
    }

    create(req, res) {
        try {
            const { title, amount, category, date, description } = req.body
            const newExpens = ExpenseController.create(title, amount, category, date, description)
            res.status(201).json(newExpens)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    update(req, res) {
        try {
            const id = Number(req.params.id)
            const { title, amount, category, date, description } = req.body
            console.log(req.body)
            const expenseUpdate = ExpenseController.update(id, title, amount, category, date, description)
            res.status(200).json(expenseUpdate)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    delete(req, res) {
        try {
            const expenseDelete = ExpenseController.delete(Number(req.params.id))
            res.status(204).json(expenseDelete)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

}

export default new ExpenseView()