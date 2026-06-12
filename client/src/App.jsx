import Navbar from './components/Navbar';
import AppRouter from './router';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}
