'use client';

import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';

const emptyEmployee = {
  employeeCode: '',
  personal: { firstName: '', lastName: '', email: '' },
  job: { designation: '', department: '' },
  salary: { monthlyGross: 0 },
  dynamicFields: {}
};

export default function AdminPage() {
  const [dashboard, setDashboard] = useState(null);
  const [config, setConfig] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [employeeForm, setEmployeeForm] = useState(emptyEmployee);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  const dynamicFieldDefs = useMemo(() => config?.dynamicEmployeeFields || [], [config]);

  const loadAll = async () => {
    const [d, c, e, p] = await Promise.all([
      api.get('/dashboard'),
      api.get('/config'),
      api.get('/employees'),
      api.get('/payroll')
    ]);
    setDashboard(d.data);
    setConfig(c.data);
    setEmployees(e.data);
    setPayroll(p.data);
  };

  useEffect(() => {
    loadAll().catch(() => {});
  }, []);

  const createEmployee = async (e) => {
    e.preventDefault();
    await api.post('/employees', employeeForm);
    setEmployeeForm(emptyEmployee);
    await loadAll();
  };

  const runPayroll = async () => {
    await api.post('/payroll/run', { month });
    await loadAll();
  };

  return (
    <main className="p-6 md:p-8 space-y-8">
      <h1 className="text-2xl font-bold">Company HRMS Dashboard</h1>

      <section className="grid md:grid-cols-3 gap-4">
        <Card title="Total Employees" value={dashboard?.totalEmployees ?? 0} />
        <Card title="Latest Payroll Gross" value={dashboard?.payrollSummary?.totalGross ?? 0} />
        <Card title="Attendance Rate" value={`${dashboard?.attendance?.attendanceRate ?? 0}%`} />
      </section>

      <section className="bg-white rounded-xl shadow p-5 space-y-3">
        <h2 className="font-semibold text-lg">Dynamic Employee Form Builder</h2>
        <form onSubmit={createEmployee} className="grid md:grid-cols-3 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Employee Code" value={employeeForm.employeeCode} onChange={(e) => setEmployeeForm((p) => ({ ...p, employeeCode: e.target.value }))} required />
          <input className="border rounded px-3 py-2" placeholder="First Name" value={employeeForm.personal.firstName} onChange={(e) => setEmployeeForm((p) => ({ ...p, personal: { ...p.personal, firstName: e.target.value } }))} required />
          <input className="border rounded px-3 py-2" placeholder="Last Name" value={employeeForm.personal.lastName} onChange={(e) => setEmployeeForm((p) => ({ ...p, personal: { ...p.personal, lastName: e.target.value } }))} />
          <input className="border rounded px-3 py-2" placeholder="Email" value={employeeForm.personal.email} onChange={(e) => setEmployeeForm((p) => ({ ...p, personal: { ...p.personal, email: e.target.value } }))} />
          <input className="border rounded px-3 py-2" placeholder="Designation" value={employeeForm.job.designation} onChange={(e) => setEmployeeForm((p) => ({ ...p, job: { ...p.job, designation: e.target.value } }))} />
          <input className="border rounded px-3 py-2" type="number" placeholder="Monthly Gross" value={employeeForm.salary.monthlyGross} onChange={(e) => setEmployeeForm((p) => ({ ...p, salary: { ...p.salary, monthlyGross: Number(e.target.value) } }))} />
          {dynamicFieldDefs.map((field) => (
            <input
              key={field.key}
              className="border rounded px-3 py-2"
              placeholder={field.label}
              value={employeeForm.dynamicFields[field.key] || ''}
              onChange={(e) => setEmployeeForm((p) => ({
                ...p,
                dynamicFields: { ...p.dynamicFields, [field.key]: e.target.value }
              }))}
            />
          ))}
          <button className="bg-emerald-600 text-white rounded py-2 px-3">Add Employee</button>
        </form>
      </section>

      <section className="bg-white rounded-xl shadow p-5 space-y-3">
        <h2 className="font-semibold text-lg">Payroll Engine</h2>
        <div className="flex gap-3">
          <input className="border rounded px-3 py-2" type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
          <button className="bg-blue-600 text-white rounded py-2 px-3" onClick={runPayroll}>Run Payroll</button>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b"><th>Month</th><th>Employees</th><th>Total Gross</th><th>Total Net</th></tr>
            </thead>
            <tbody>
              {payroll.map((row) => (
                <tr key={row._id} className="border-b"><td>{row.month}</td><td>{row.summary.totalEmployees}</td><td>{row.summary.totalGross}</td><td>{row.summary.totalNet}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow p-5">
        <h2 className="font-semibold text-lg mb-3">Employee Directory</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {employees.map((emp) => (
            <article key={emp._id} className="border rounded-lg p-3">
              <p className="font-semibold">{emp.personal?.firstName} {emp.personal?.lastName}</p>
              <p className="text-xs text-slate-500">{emp.employeeCode} · {emp.job?.designation}</p>
              <p className="text-xs">Dynamic: {JSON.stringify(emp.dynamicFields || {})}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Card({ title, value }) {
  return (
    <article className="bg-white rounded-xl shadow p-4">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </article>
  );
}
