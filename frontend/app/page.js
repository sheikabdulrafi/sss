import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <section className="container-custom py-12 grid md:grid-cols-3 gap-6">
        {[
          ['Manpower Supply', 'Skilled and unskilled workforce deployment tailored to your business needs.'],
          ['Contract Staffing', 'Flexible staffing models with compliance and performance assurance.'],
          ['Payroll Support', 'End-to-end payroll processing, statutory filings, and reporting.']
        ].map(([title, text]) => (
          <article key={title} className="bg-white p-5 rounded shadow-sm border">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm mt-2 text-slate-600">{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
