import User from '../Model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function UserRegister(req,res){
    const {username,password,role}=req.body;
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    try{
        const user=new User({
            username,
            password:hashedPassword,
            role
        });
        await user.save();

        const token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET || process.env.jwt_secret,{expiresIn:'1h'});
        res.status(201).json({message:"User registered successfully",token});
    }catch(error){
        res.status(500).json({message:"Error registering user",error});
    }
}

export async function UserLogin(req,res){
    const {username,password,role}=req.body;
    try{
        const user=await User.findOne({username});
        if(!user){
            return  res.status(400).json({message:"Invalid credentials"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        const isrole=(role===user.role);
        if(!isrole){
            return res.status(400).json({message:"Invalid credentials"});
        }
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET || process.env.jwt_secret,{expiresIn:'1h'});
        res.status(200).json({message:"Login successful",token});
    }catch(error){
        res.status(500).json({message:"Error logging in",error});
    }   
}

