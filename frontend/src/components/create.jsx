import { useState } from 'react';
import axios from 'axios';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
import { useNavigate } from 'react-router-dom';

export default function Create(){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        const token = localStorage.getItem('token');
        try{
            await axios.post(`${BACKEND}/api/blog/create`, { title, content }, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            navigate('/home');
        }catch(err){
            console.error('Create blog failed', err);
            alert(err.response?.data?.message || err.message || 'Create failed');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl p-8 border border-black rounded-md bg-white">
                <h1 className="text-2xl font-bold mb-6 text-center">Create Blog</h1>

                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    className="w-full border border-black rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter title"
                />

                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                    rows={10}
                    className="w-full border border-black rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Write your post..."
                />

                <div className="flex justify-center">
                    <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:opacity-90">Publish</button>
                </div>
            </form>
        </div>
    );
}