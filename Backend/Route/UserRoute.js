import express from 'express';
import { UserRegister,UserLogin } from '../Controller/AuthController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router=express.Router();

router.post('/register',UserRegister);
router.post('/login',UserLogin);
router.get('/me',authMiddleware, (req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    res.status(200).json(token);
}
);

export default router;