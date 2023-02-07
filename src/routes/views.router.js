import {Router} from 'express';

const router = Router();

router.get('/',async(req,res)=>{
    res.render('login')
});

router.get('/chat',async(req,res)=>{
    res.render('chat')
});

export default router