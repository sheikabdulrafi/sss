import './globals.css';

export const metadata = {
  title: 'HRMS Payroll SaaS',
  description: 'Multi-tenant HRMS and payroll platform'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
