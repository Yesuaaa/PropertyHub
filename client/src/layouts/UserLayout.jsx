import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
