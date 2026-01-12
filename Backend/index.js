import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserRouter from './Route/UserRoute.js';
import BlogRouter from './Route/blogRoute.js';
import cors from 'cors';

dotenv.config();

const app=express();
const PORT=process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use('/api/user',UserRouter);
app.use('/api/blog',BlogRouter);

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

