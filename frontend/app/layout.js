import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Staffex Staffing Solutions',
  description: 'Manpower supply and HR management platform'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-[75vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
