const services = [
  {
    title: 'Manpower Supply',
    text: 'Rapid deployment of workforce across manufacturing, logistics, retail, and corporate environments.'
  },
  {
    title: 'Contract Staffing',
    text: 'Contract and project-based staffing for seasonal and long-term business demand.'
  },
  {
    title: 'Payroll Support',
    text: 'Salary processing, payslip generation, compliance support, PF/ESI, and attendance-backed payroll.'
  }
];

export default function ServicesPage() {
  return (
    <section className="container-custom py-12">
      <h2 className="text-3xl font-bold mb-8">Services</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.title} className="p-5 border rounded bg-white shadow-sm">
            <h3 className="font-semibold text-xl">{service.title}</h3>
            <p className="mt-2 text-slate-600">{service.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
