import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function Card({ id, title = 'Card Title', content = 'A card component has a figure, a body part, and inside body there are title and actions parts', onDelete }){
    const { user } = useContext(AuthContext);
    const [deleting, setDeleting] = useState(false);

    const isAdmin = user && (user.role === 'admin' || user.isAdmin || user.admin === true);

    async function handleDelete(){
        if (id === undefined || id === null) return;
        if (!confirm('Delete this post?')) return;
        setDeleting(true);
        try{
            const token = localStorage.getItem('token');
            console.log("Deleting post with id:", id);
            await axios.delete(`${BACKEND}/api/blog/delete/${id}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            if (onDelete) onDelete(id);
        }catch(err){
            console.error('Delete failed', err);
            alert(err.response?.data?.message || err.message || 'Delete failed');
        }finally{
            setDeleting(false);
        }
    }

    return (
        <div className="card card-bordered bg-base-100 w-full">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="text-sm text-gray-600">{content}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-sm">Read</button>
                    {isAdmin && (
                        <button onClick={handleDelete} disabled={deleting} className="btn btn-error btn-sm">{deleting ? 'Deleting...' : 'Delete'}</button>
                    )}
                </div>
            </div>
        </div>
    )
}