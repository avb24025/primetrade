import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function Register(){
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
        const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

        useEffect(()=>{
            if (user) navigate('/');
        },[user,navigate]);

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const resp = await axios.post(`${BACKEND}/api/user/register`, { email, username, password });
            const token = resp.data?.token || resp.data;
            if (!token) throw new Error('No token returned');
            login(token);
            navigate('/');
        }catch(err){
            setError(err.response?.data?.message || err.message || 'Registration failed');
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
            <form onSubmit={handleSubmit} className="card w-96 bg-base-100 shadow-lg">
                <div className="card-body p-6">
                    <h2 className="text-center text-2xl font-bold">Sign up</h2>
                    <p className="text-center text-sm text-gray-500 mb-4">Sign Up to continue to Primetrade</p>

                    {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

                    <label className="label">Email</label>
                    <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="input input-bordered w-full mb-3" placeholder="you@example.com" />

                    <label className="label">Username</label>
                    <input value={username} onChange={e=>setUsername(e.target.value)} type="text" className="input input-bordered w-full mb-3" placeholder="Username" />

                    <label className="label">Password</label>
                    <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="input input-bordered w-full mb-2" placeholder="Password" />

                    <button disabled={loading} className="btn btn-primary w-full mt-2">{loading ? 'Signing up...' : 'Sign up'}</button>
                </div>
            </form>
        </div>
    )
}