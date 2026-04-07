'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/public/contact', form);
    setStatus('Query submitted successfully');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <section className="container-custom py-12 max-w-2xl">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
      <form onSubmit={submit} className="bg-white border rounded p-6 space-y-3">
        {['name', 'email', 'phone', 'subject'].map((field) => (
          <input key={field} className="w-full border rounded p-2" placeholder={field} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} required={field !== 'phone'} />
        ))}
        <textarea className="w-full border rounded p-2" placeholder="message" rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
        <button className="bg-primary text-white px-4 py-2 rounded">Submit</button>
        {status && <p className="text-green-700">{status}</p>}
      </form>
    </section>
  );
}
