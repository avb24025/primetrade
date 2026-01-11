import express from 'express';
import authMiddleware from '../Middleware/authMiddleware.js';
import { createBlog ,getBlogs,deleteBlog} from '../Controller/blogController.js';
import deleteMiddleware from '../Middleware/deleteMiddleware.js';

const router=express.Router();

router.post('/create',authMiddleware,createBlog);
router.delete('/delete/:id',deleteMiddleware,deleteBlog);
router.get('/all',authMiddleware,getBlogs);

export default router;