import AdminNavbar from '../components/AdminNavbar';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f5f3ef]">
      <AdminNavbar />
      <main>
        {children}
      </main>
    </div>
  );
}
