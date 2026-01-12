import jwt from 'jsonwebtoken';
import User from '../Model/User.js';
import Blog from '../Model/Blog.js';

export default async function deleteMiddleware(req,res,next){
    try {
    const token = req.headers.authorization?.split(" ")[1];
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    const blog_username = blog.username;
    console.log("blog username:", blog_username);
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
    // Verify token (support either env var name)
    const secret = process.env.JWT_SECRET || process.env.jwt_secret;
    const decoded = jwt.verify(token, secret);
    console.log("decoded:", decoded);
    req.user = decoded; // attach user data to request object
    const x = await User.findById(req.user.userId);
    if (!x) return res.status(401).json({ message: 'User not found' });
    const username = x.username;
    console.log("requesting username:", username);
    if (username !== blog_username && x.role !== 'admin') {
      return res.status(401).json({ message: "Access denied. You are not authorized to delete this blog." });
    }
    next(); // allow API to continue
  }
    catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  } 
}


