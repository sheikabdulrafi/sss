'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Careers', '/careers'],
  ['Contact', '/contact'],
  ['Admin', '/admin']
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-primary text-white">
      <div className="container-custom py-4 flex items-center justify-between">
        <h1 className="font-bold text-xl">Staffex Staffing Solutions</h1>
        <div className="flex gap-4 text-sm">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className={pathname === href ? 'text-accent' : ''}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
