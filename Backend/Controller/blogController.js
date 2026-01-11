import Blog from '../Model/Blog.js';
import User from '../Model/User.js';

export async function createBlog(req,res){
    const {title,content}=req.body;
    const x=await User.find({_id:req.user.userId});
    console.log(x);
    const username=x[0].username;
    console.log(username);
    const blog=new Blog({
        title,
        content,
        username
    });
    blog.save().then(()=>{
        res.status(201).json({message:"Blog created successfully"});
    }).catch((error)=>{
        res.status(500).json({message:"Error creating blog",error});
    });
}

export async function deleteBlog(req,res){
    const blogId=req.params.id;
    Blog.findByIdAndDelete(blogId).then(()=>{
        res.status(200).json({message:"Blog deleted successfully"});
    }
    ).catch((error)=>{
        res.status(500).json({message:"Error deleting blog",error});
    });
}

export async function getBlogs(req,res){
    try{
        const blogs=await Blog.find();
        res.status(200).json(blogs);
    }catch(error){
        res.status(500).json({message:"Error fetching blogs",error});
    }
}



