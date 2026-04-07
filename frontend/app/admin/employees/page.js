'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { authApi } from '@/lib/api';

const initial = {
  employeeNumber: '',
  employeeName: '',
  department: '',
  designation: '',
  joiningDate: '',
  employeeStatus: '',
  email: '',
  mobileNumber: '',
  fixedGross: '',
  newFixedGross: '',
  basic: '',
  hra: '',
  specialAllowance: '',
  location: '',
  remarks: ''
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(initial);
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('staffexToken') : null;

  const load = async () => {
    if (!token) return;
    const { data } = await authApi(token).get('/employees', { params: { search } });
    setEmployees(data);
  };

  useEffect(() => {
    load();
  }, [search]);

  const submit = async (e) => {
    e.preventDefault();
    if (editId) {
      await authApi(token).put(`/employees/${editId}`, form);
    } else {
      await authApi(token).post('/employees', form);
    }
    setForm(initial);
    setEditId(null);
    load();
  };

  const remove = async (id) => {
    await authApi(token).delete(`/employees/${id}`);
    load();
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Employee Management</h2>
        <form onSubmit={submit} className="grid md:grid-cols-3 gap-2 bg-white border rounded p-4">
          {Object.keys(initial).map((field) => (
            <input key={field} className="border p-2 rounded text-sm" placeholder={field} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} required={['employeeNumber', 'employeeName'].includes(field)} />
          ))}
          <button className="bg-primary text-white px-3 py-2 rounded">{editId ? 'Update Employee' : 'Add Employee'}</button>
        </form>

        <div className="flex gap-2">
          <input className="border rounded p-2" placeholder="Search employees" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button
            className="bg-accent px-3 py-2 rounded"
            onClick={async () => {
              const res = await authApi(token).get('/employees/export/excel', { responseType: 'blob' });
              const url = URL.createObjectURL(new Blob([res.data]));
              const a = document.createElement('a');
              a.href = url;
              a.download = 'employees.xlsx';
              a.click();
            }}
          >
            Export Excel
          </button>
        </div>

        <div className="overflow-auto bg-white border rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-2 text-left">Emp #</th><th className="p-2 text-left">Name</th><th className="p-2 text-left">Dept</th><th className="p-2 text-left">Status</th><th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id} className="border-t">
                  <td className="p-2">{emp.employeeNumber}</td>
                  <td className="p-2">{emp.employeeName}</td>
                  <td className="p-2">{emp.department}</td>
                  <td className="p-2">{emp.employeeStatus}</td>
                  <td className="p-2 text-center space-x-2">
                    <button className="text-blue-600" onClick={() => { setForm({ ...initial, ...emp }); setEditId(emp._id); }}>Edit</button>
                    <button className="text-red-600" onClick={() => remove(emp._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
