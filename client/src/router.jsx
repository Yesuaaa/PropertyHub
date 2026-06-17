import { Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import LandingPage from './pages/LandingPage';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import MyTickets from './pages/user/MyTickets';
import NewTicket from './pages/user/NewTicket';
import TicketDetail from './pages/user/TicketDetail';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTicketDetail from './pages/admin/AdminTicketDetail';
import SuperAdmin from './pages/admin/SuperAdmin';
import PrivateRoute from './components/PrivateRoute';
import HardwareIssue from './pages/HardwareIssue';
import SoftwareIssue from './pages/SoftwareIssue';
import NetworkProblem from './pages/NetworkProblem';
import Cleanliness from './pages/Cleanliness';
import GamingArea from './pages/GamingArea';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout><LandingPage /></UserLayout>} />
      <Route path="/login" element={<UserLayout><Login /></UserLayout>} />
      <Route path="/register" element={<UserLayout><Register /></UserLayout>} />
      <Route path="/terms" element={<UserLayout><TermsOfService /></UserLayout>} />
      <Route path="/privacy" element={<UserLayout><PrivacyPolicy /></UserLayout>} />
      <Route path="/hardware" element={<UserLayout><HardwareIssue /></UserLayout>} />
      <Route path="/software" element={<UserLayout><SoftwareIssue /></UserLayout>} />
      <Route path="/network" element={<UserLayout><NetworkProblem /></UserLayout>} />
      <Route path="/cleanliness" element={<UserLayout><Cleanliness /></UserLayout>} />
      <Route path="/gaming" element={<UserLayout><GamingArea /></UserLayout>} />
      <Route path="/admin/login" element={<AdminLayout><AdminLogin /></AdminLayout>} />
      <Route
        path="/dashboard"
        element={
          <UserLayout>
            <PrivateRoute>
              <MyTickets />
            </PrivateRoute>
          </UserLayout>
        }
      />
      <Route
        path="/new"
        element={
          <UserLayout>
            <PrivateRoute>
              <NewTicket />
            </PrivateRoute>
          </UserLayout>
        }
      />
      <Route
        path="/tickets/:id"
        element={
          <UserLayout>
            <PrivateRoute>
              <TicketDetail />
            </PrivateRoute>
          </UserLayout>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminLayout>
            <PrivateRoute adminOnly>
              <AdminDashboard />
            </PrivateRoute>
          </AdminLayout>
        }
      />
      <Route
        path="/admin/tickets/:id"
        element={
          <AdminLayout>
            <PrivateRoute adminOnly>
              <AdminTicketDetail />
            </PrivateRoute>
          </AdminLayout>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminLayout>
            <PrivateRoute superAdminOnly>
              <SuperAdmin />
            </PrivateRoute>
          </AdminLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
