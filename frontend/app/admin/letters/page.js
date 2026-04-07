'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { authApi } from '@/lib/api';

const types = ['showCause', 'firstWarning', 'secondWarning', 'finalWarning', 'termination'];

export default function LettersPage() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [type, setType] = useState(types[0]);
  const [reason, setReason] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('staffexToken') : null;

  useEffect(() => {
    if (!token) return;
    authApi(token).get('/employees').then((res) => setEmployees(res.data));
  }, []);

  const generate = async () => {
    const response = await authApi(token).post('/letters/generate', { employeeId, type, reason }, { responseType: 'blob' });
    const url = URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}.pdf`;
    a.click();
  };

  return (
    <AdminLayout>
      <div className="bg-white border rounded p-5 space-y-3">
        <h2 className="text-2xl font-bold">Letter Generator</h2>
        <select className="border p-2 rounded w-full" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
          <option value="">Select employee</option>
          {employees.map((emp) => <option key={emp._id} value={emp._id}>{emp.employeeName} ({emp.employeeNumber})</option>)}
        </select>
        <select className="border p-2 rounded w-full" value={type} onChange={(e) => setType(e.target.value)}>
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
        <textarea className="border p-2 rounded w-full" rows="5" placeholder="Reason" value={reason} onChange={(e) => setReason(e.target.value)} />
        <button onClick={generate} className="bg-primary text-white px-4 py-2 rounded">Generate PDF Letter</button>
      </div>
    </AdminLayout>
  );
}
