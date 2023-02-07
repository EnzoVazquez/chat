import { Router } from "express";
import context from "../contexts/userContext.js"

const utilidades = new context();
const router = Router();

router.post('/',async(req,res)=>{
    console.log(req.body);
    const data = {
        "email" : req.body.email,
        "nombre": req.body.nombre,
        "apellido": req.body.apellido,
        "edad": req.body.edad,
        "alias": req.body.alias,
        "avatar": req.body.avatar
    };
    let user = JSON.stringify(data)
    await utilidades.save(user);
    res.send(`USUARIO AGREGADO ${user}`)
});

router.get('/', async(req,res)=>{
    try {
        let users = await utilidades.getUsers();
        return users
    } catch (error) {
        console.log(error)
    }
})

export default router