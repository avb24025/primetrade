import mongoose from 'mongoose';

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

const Blog=new mongoose.model('Blog',blogSchema);

export default Blog;