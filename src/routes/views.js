import { Router } from "express"

const routes = Router()

routes.get('/', (req,res)=>{
    res.render('index', {})
})

export default routes