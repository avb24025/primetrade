import jwt from 'jsonwebtoken';
import User from '../Model/User.js';
import Blog from '../Model/Blog.js';

export default async function deleteMiddleware(req,res,next){
    try {
    const token = req.headers.authorization?.split(" ")[1];
    const y=await Blog.find({_id:req.params.id});
    const blog_username=y[0].username;
    console.log("blog username:",blog_username);
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded:",decoded);    
    req.user = decoded; // attach user data to request object
    const x=await User.find({_id:req.user.userId});
    const username=x[0].username;
    console.log("requesting username:",username);
    if(username!==blog_username && x[0].role!=='admin'){
        return res.status(401).json({ message: "Access denied. You are not authorized to delete this blog." });
    }
    next(); // allow API to continue
  }
    catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  } 
}


