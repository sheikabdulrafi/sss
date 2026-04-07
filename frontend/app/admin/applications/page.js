'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { authApi } from '@/lib/api';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('staffexToken') : null;

  useEffect(() => {
    if (!token) return;
    authApi(token).get('/admin/applications').then((res) => setApplications(res.data));
  }, []);

  return (
    <AdminLayout>
      <div className="bg-white border rounded p-5">
        <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
        <div className="space-y-3">
          {applications.map((app) => (
            <div key={app._id} className="border rounded p-3">
              <p className="font-semibold">{app.fullName} - {app.position}</p>
              <p className="text-sm">{app.email} | {app.phone}</p>
              <button
                className="text-primary text-sm"
                onClick={async () => {
                  const res = await authApi(token).get(`/admin/applications/${app._id}/resume`, { responseType: 'blob' });
                  const url = URL.createObjectURL(new Blob([res.data]));
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${app.fullName}-resume`;
                  a.click();
                }}
              >
                Download Resume
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
