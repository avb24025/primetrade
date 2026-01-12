import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function Manage(){
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(()=>{
            let mounted = true;
            setLoading(true);
                const token = localStorage.getItem('token');
                axios.get(`${BACKEND}/api/blog/all`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                })
                    .then(resp => {
                        if (!mounted) return;
                        const data = resp.data;
                        setPosts(Array.isArray(data) ? data : (data.posts || []));
                        console.log("posts:", posts);
                        setError(null);
                    })
                    .catch(err => {
                        if (!mounted) return;
                        setError(err.response?.data?.message || err.message || 'Failed to load posts');
                        setPosts([]);
                    })
                    .finally(()=>{
                        if (!mounted) return;
                        setLoading(false);
                    });

            return ()=>{ mounted = false };
        },[]);

        return (
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>

                {loading && <div className="text-center py-8">Loading posts…</div>}
                {error && <div className="text-center py-4 text-red-600">{error}</div>}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.length === 0 && (
                            <div className="col-span-full text-center text-gray-500">No posts yet.</div>
                        )}
                        {posts.map((post) => {
                            const postId = post._id || post.id;
                            return (
                                <div key={postId || Math.random()} className="w-full">
                                    <Card id={postId} title={post.title || post.heading || 'Untitled'} content={post.content || post.excerpt || 'No description.'} onDelete={(id)=>{ setPosts(prev => prev.filter(p => ((p._id || p.id) !== id))); }} />
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        )
    }