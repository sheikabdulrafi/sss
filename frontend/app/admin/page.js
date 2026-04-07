'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@staffex.com');
  const [password, setPassword] = useState('Admin@123');
  const [msg, setMsg] = useState('');

  const login = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('staffexToken', data.token);
    setMsg('Login successful. Open admin modules from top navigation.');
  };

  return (
    <section className="container-custom py-12 max-w-md">
      <h2 className="text-3xl font-bold mb-6">Admin Login</h2>
      <form onSubmit={login} className="bg-white border rounded p-6 space-y-3">
        <input className="w-full border rounded p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full border rounded p-2" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <button className="bg-primary text-white px-4 py-2 rounded w-full">Login</button>
        {msg && <p className="text-green-700 text-sm">{msg}</p>}
      </form>
    </section>
  );
}
