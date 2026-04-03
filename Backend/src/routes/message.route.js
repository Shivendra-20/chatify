import { Router } from "express";

const router = Router();

router.get('/send',(req,res)=>{
    res.send("Hi I'm a message");
})

export default router;