import Navbar from './components/Navbar';
import AppRouter from './router';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <AppRouter />
      </main>
    </div>
  );
}
