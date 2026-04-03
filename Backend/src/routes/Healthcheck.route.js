import { Router } from "express";

const router = Router();

router.get('/',(req,res)=>{
    res.send("Hi Shivendra there 😎");
})

export default router;