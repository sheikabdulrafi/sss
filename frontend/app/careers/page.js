'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function CareersPage() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', position: '', experience: '', message: '' });
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (resume) fd.append('resume', resume);
    await api.post('/public/careers/apply', fd);
    setStatus('Application submitted successfully');
    setForm({ fullName: '', email: '', phone: '', position: '', experience: '', message: '' });
    setResume(null);
  };

  return (
    <section className="container-custom py-12 max-w-2xl">
      <h2 className="text-3xl font-bold mb-6">Careers</h2>
      <form onSubmit={submit} className="bg-white border rounded p-6 space-y-3">
        {['fullName', 'email', 'phone', 'position', 'experience'].map((field) => (
          <input key={field} className="w-full border rounded p-2" placeholder={field} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} required={field !== 'experience'} />
        ))}
        <textarea className="w-full border rounded p-2" rows="4" placeholder="Tell us about yourself" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResume(e.target.files?.[0])} required />
        <button className="bg-primary text-white px-4 py-2 rounded">Apply Now</button>
        {status && <p className="text-green-700">{status}</p>}
      </form>
    </section>
  );
}
