export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-12">
      <div className="container-custom py-6 text-sm flex flex-col md:flex-row justify-between gap-2">
        <p>© {new Date().getFullYear()} Staffex Staffing Solutions</p>
        <p>Manpower Supply | Contract Staffing | Payroll Support</p>
      </div>
    </footer>
  );
}
