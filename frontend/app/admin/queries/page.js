'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { authApi } from '@/lib/api';

export default function QueriesPage() {
  const [queries, setQueries] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('staffexToken') : null;

  useEffect(() => {
    if (!token) return;
    authApi(token).get('/admin/queries').then((res) => setQueries(res.data));
  }, []);

  return (
    <AdminLayout>
      <div className="bg-white border rounded p-5">
        <h2 className="text-2xl font-bold mb-4">Contact Queries</h2>
        <div className="space-y-3">
          {queries.map((query) => (
            <div key={query._id} className="border rounded p-3">
              <p className="font-semibold">{query.name} ({query.email})</p>
              <p className="text-sm">{query.subject}</p>
              <p className="text-sm text-slate-600">{query.message}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
