import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-blue-900 text-white py-20">
      <div className="container-custom">
        <h2 className="text-4xl font-bold max-w-2xl">Your Trusted Partner for Workforce and HR Excellence</h2>
        <p className="mt-4 max-w-xl text-slate-200">
          Staffex Staffing Solutions delivers quality manpower, scalable staffing operations, and dependable payroll support for modern businesses.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/contact" className="bg-accent text-slate-900 px-4 py-2 rounded font-semibold">Get Started</Link>
          <Link href="/careers" className="border border-white px-4 py-2 rounded">Apply for Jobs</Link>
        </div>
      </div>
    </section>
  );
}
