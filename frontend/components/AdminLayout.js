'use client';

import Link from 'next/link';

const nav = [
  ['Employees', '/admin/employees'],
  ['Letters', '/admin/letters'],
  ['Applications', '/admin/applications'],
  ['Queries', '/admin/queries']
];

export default function AdminLayout({ children }) {
  return (
    <div className="container-custom py-8 grid md:grid-cols-[220px_1fr] gap-4">
      <aside className="bg-white border rounded p-4 h-fit">
        <h3 className="font-semibold mb-3">Admin Menu</h3>
        <div className="flex md:flex-col gap-2 text-sm">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-primary">
              {label}
            </Link>
          ))}
        </div>
      </aside>
      <section>{children}</section>
    </div>
  );
}
