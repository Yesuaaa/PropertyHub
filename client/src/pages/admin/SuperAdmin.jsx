import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/axiosInstance';

const ROLES = ['guest', 'staff', 'admin'];
const STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'];

const TYPE_CATEGORIES = {
  'Hardware Issue': ['PC / Computer', 'Peripherals', 'Gaming Console', 'Printer'],
  'Software Issue': ['PC / Computer', 'Account Login'],
  'Network Problem': ['Wi-Fi', 'LAN Connection', 'Slow Speed', 'Account Login'],
  'Billing Concern': ['Hourly Rate', 'Membership', 'Load / Top-up', 'Printing Charge'],
  'Safety Concern': ['Power Outage', 'Ventilation', 'Workstation Area'],
  'Cleanliness / Comfort': ['Restrooms', 'Workstation Area', 'Gaming Area', 'VIP / Premium Room'],
  'Noise / Disruption': ['Workstation Area', 'Gaming Area', 'VIP / Premium Room'],
  'Gaming Area Concern': ['Gaming Console', 'Gaming Area', 'Peripherals'],
  'Workstation Concern': ['PC / Computer', 'Peripherals', 'Workstation Area', 'Printer'],
  'General Feedback': ['Workstation Area', 'Gaming Area', 'VIP / Premium Room', 'Hourly Rate', 'Membership'],
  'Staff / Service': ['Workstation Area', 'Gaming Area', 'VIP / Premium Room', 'Hourly Rate']
};

export default function SuperAdmin() {
  const [tab, setTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [userPage, setUserPage] = useState(1);
  const [userTotalPages, setUserTotalPages] = useState(1);
  const [userTotal, setUserTotal] = useState(0);

  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '', role: 'guest' });
  const [formError, setFormError] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const allCategories = useMemo(() => {
    const seen = new Set();
    Object.values(TYPE_CATEGORIES).flat().forEach((c) => seen.add(c));
    return [...seen];
  }, []);

  const filteredCategories = useMemo(() => {
    if (!filterType) return allCategories;
    return TYPE_CATEGORIES[filterType] || [];
  }, [filterType, allCategories]);

  useEffect(() => {
    if (filterType && filterCategory && !TYPE_CATEGORIES[filterType]?.includes(filterCategory)) {
      setFilterCategory('');
    }
  }, [filterType, filterCategory]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      if (filterType && t.type !== filterType) return false;
      if (filterCategory && t.category !== filterCategory) return false;
      return true;
    });
  }, [tickets, filterType, filterCategory]);

  const statusDisplay = {
    'open': 'Open',
    'in_progress': 'In Progress',
    'resolved': 'Resolved',
    'closed': 'Closed'
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, ticketsRes] = await Promise.all([
        api.get(`/superadmin/users?page=${userPage}`),
        api.get('/superadmin/tickets')
      ]);
      setUsers(usersRes.data.users);
      setUserTotalPages(usersRes.data.totalPages);
      setUserTotal(usersRes.data.total);
      setTickets(ticketsRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [userPage]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSubmitting(true);
    try {
      const { data } = await api.post('/superadmin/users', form);
      if (data.success) {
        setForm({ first_name: '', last_name: '', email: '', password: '', role: 'guest' });
        setShowAdd(false);
        setUserPage(1);
        await fetchData();
      }
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/superadmin/users/${id}`);
      setConfirmDelete(null);
      if (users.length <= 1 && userPage > 1) setUserPage((p) => p - 1);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await api.patch(`/superadmin/users/${id}/active`);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await api.patch(`/superadmin/users/${id}/role`, { role });
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update role');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/superadmin/tickets/${id}/status`, { status });
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  const [confirmDeleteTicket, setConfirmDeleteTicket] = useState(null);

  const handleDeleteTicket = async (id) => {
    try {
      await api.delete(`/superadmin/tickets/${id}`);
      setConfirmDeleteTicket(null);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete ticket');
    }
  };

  const inputClass = 'w-full border-2 border-[#8fa3b0]/25 bg-transparent text-[#1a1a1a] px-4 py-3 text-sm focus:outline-none focus:border-[#1a1a1a] transition-colors duration-200 placeholder:text-[#8fa3b0]/50';
  const selectClass = 'border-2 border-[#8fa3b0]/25 bg-transparent text-sm text-[#1a1a1a] px-3 py-1.5 focus:outline-none focus:border-[#1a1a1a] cursor-pointer appearance-none font-mono text-xs tracking-wider uppercase';

  if (loading) {
    return <p className="text-center pt-24 text-[10px] font-mono tracking-[0.2em] uppercase text-[#8fa3b0]">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto pt-24 pb-16 px-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-2 h-2 bg-[#e05a30]" />
        <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">Super Admin</span>
      </div>
      <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8 tracking-tight">System Management</h2>

      {error && (
        <div className="border-2 border-[#e05a30]/30 bg-[#e05a30]/5 px-4 py-3 mb-6">
          <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#e05a30]">Error</span>
          <p className="text-sm text-[#1a1a1a] mt-0.5">{error}</p>
          <button onClick={() => setError('')} className="mt-2 text-xs text-[#e05a30] underline cursor-pointer">Dismiss</button>
        </div>
      )}

      <div className="flex gap-1 mb-8 border-b-2 border-[#1a1a1a]">
        {[
          { key: 'users', label: 'Users' },
          { key: 'tickets', label: 'Tickets' }
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`text-xs font-semibold tracking-[0.1em] uppercase px-6 py-3 cursor-pointer transition-colors border-b-2 -mb-[2px] ${
              tab === t.key
                ? 'border-[#1a1a1a] text-[#1a1a1a]'
                : 'border-transparent text-[#8fa3b0] hover:text-[#1a1a1a]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'users' && (
        <>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => { setShowAdd(!showAdd); setFormError(''); }}
              className="text-xs font-semibold tracking-[0.1em] uppercase text-[#f5f3ef] bg-[#1a1a1a] border-2 border-[#1a1a1a] px-6 py-2.5 hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-200 cursor-pointer"
            >
              {showAdd ? 'Cancel' : 'Add User'}
            </button>
          </div>

          {showAdd && (
            <div className="border-2 border-[#1a1a1a] bg-[#f5f3ef] p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-[#e05a30]" />
                <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">New User</span>
              </div>
              {formError && (
                <div className="border-2 border-[#e05a30]/30 bg-[#e05a30]/5 px-4 py-3 mb-6">
                  <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#e05a30]">Error</span>
                  <p className="text-sm text-[#1a1a1a] mt-0.5">{formError}</p>
                </div>
              )}
              <form onSubmit={handleAdd}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">First Name</label>
                    <input type="text" value={form.first_name} onChange={(e) => setForm((f) => ({ ...f, first_name: e.target.value }))} required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">Last Name</label>
                    <input type="text" value={form.last_name} onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value }))} required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">Password</label>
                    <input type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">Role</label>
                    <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className={`${inputClass} cursor-pointer appearance-none`}>
                      {ROLES.map((r) => (<option key={r} value={r}>{r}</option>))}
                    </select>
                  </div>
                </div>
                <button type="submit" disabled={formSubmitting} className="text-xs font-semibold tracking-[0.1em] uppercase text-[#f5f3ef] bg-[#1a1a1a] border-2 border-[#1a1a1a] px-8 py-3 hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-200 cursor-pointer disabled:opacity-40">
                  {formSubmitting ? 'Creating...' : 'Create User'}
                </button>
              </form>
            </div>
          )}

          {users.length === 0 ? (
            <div className="border-2 border-[#8fa3b0]/20 p-12 text-center"><p className="text-sm text-[#5a6d78]">No users found.</p></div>
          ) : (
            <div className="border-2 border-[#1a1a1a] overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-[#1a1a1a]">
                    <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">ID</th>
                    <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Name</th>
                    <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Email</th>
                    <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Role</th>
                    <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Status</th>
                    <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Joined</th>
                    <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8fa3b0]/15">
                  {users.map((u) => (
                    <tr key={u.user_id} className="hover:bg-[#8fa3b0]/5 transition-colors">
                      <td className="px-5 py-4 text-sm font-mono text-[#8fa3b0]">#{u.user_id}</td>
                      <td className="px-5 py-4 text-sm text-[#1a1a1a] font-medium">
                        {u.first_name} {u.last_name}
                        {u.role === 'superadmin' && <span className="ml-2 text-[8px] font-mono tracking-[0.2em] uppercase text-[#e05a30] border border-[#e05a30]/30 px-1.5 py-0.5">YOU</span>}
                      </td>
                      <td className="px-5 py-4 text-sm text-[#5a6d78] font-mono">{u.email}</td>
                      <td className="px-5 py-4">
                        {u.role === 'superadmin' ? (
                          <span className="text-[10px] font-mono font-semibold tracking-[0.15em] uppercase text-[#5a6d78]">{u.role}</span>
                        ) : (
                          <select value={u.role} onChange={(e) => handleRoleChange(u.user_id, e.target.value)} className={selectClass}>
                            {ROLES.map((r) => (<option key={r} value={r}>{r}</option>))}
                          </select>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <button onClick={() => handleToggleActive(u.user_id)} className={`text-[10px] font-mono font-semibold tracking-[0.15em] uppercase border px-2.5 py-1 cursor-pointer transition-colors ${u.is_active ? 'text-green-700 border-green-700/40 hover:bg-green-50' : 'text-[#8fa3b0] border-[#8fa3b0]/40 hover:bg-[#8fa3b0]/10'}`}>
                          {u.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-xs text-[#8fa3b0] font-mono">{new Date(u.created_at).toLocaleDateString()}</td>
                      <td className="px-5 py-4">
                        {u.role === 'superadmin' ? <span className="text-[10px] font-mono text-[#8fa3b0]/40">&mdash;</span> : confirmDelete === u.user_id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-[#e05a30]">Confirm?</span>
                            <button onClick={() => handleDeleteUser(u.user_id)} className="text-[10px] font-mono font-semibold tracking-wider uppercase text-[#e05a30] border border-[#e05a30]/40 px-2 py-1 hover:bg-[#e05a30]/10 cursor-pointer transition-colors">Delete</button>
                            <button onClick={() => setConfirmDelete(null)} className="text-[10px] font-mono tracking-wider uppercase text-[#5a6d78] border border-[#8fa3b0]/25 px-2 py-1 hover:bg-[#8fa3b0]/10 cursor-pointer transition-colors">Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => setConfirmDelete(u.user_id)} className="text-[10px] font-mono font-semibold tracking-[0.1em] uppercase text-[#5a6d78] border border-[#8fa3b0]/25 px-3 py-1 hover:text-[#e05a30] hover:border-[#e05a30]/40 transition-colors cursor-pointer">Delete</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {userTotalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <span className="text-[10px] font-mono text-[#8fa3b0] tracking-wider uppercase">
                {userTotal} users &middot; Page {userPage} of {userTotalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setUserPage((p) => p - 1)}
                  disabled={userPage <= 1}
                  className="text-[10px] font-mono font-semibold tracking-[0.1em] uppercase border border-[#8fa3b0]/25 px-3 py-1.5 text-[#5a6d78] hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: userTotalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setUserPage(p)}
                    className={`w-8 h-8 text-[10px] font-mono font-semibold tracking-wider cursor-pointer transition-colors border ${
                      p === userPage
                        ? 'border-[#1a1a1a] bg-[#1a1a1a] text-[#f5f3ef]'
                        : 'border-[#8fa3b0]/25 text-[#5a6d78] hover:text-[#1a1a1a] hover:border-[#1a1a1a]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setUserPage((p) => p + 1)}
                  disabled={userPage >= userTotalPages}
                  className="text-[10px] font-mono font-semibold tracking-[0.1em] uppercase border border-[#8fa3b0]/25 px-3 py-1.5 text-[#5a6d78] hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {tab === 'tickets' && (
        <>
          <div className="flex flex-wrap items-end gap-4 mb-8">
            <div>
              <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-1.5">Filter by Type</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className={selectClass}>
                <option value="">All Types</option>
                {Object.keys(TYPE_CATEGORIES).map((t) => (<option key={t} value={t}>{t}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-1.5">Filter by Category</label>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className={selectClass}>
                <option value="">All Categories</option>
                {filteredCategories.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
          </div>

          {filteredTickets.length === 0 ? (
            <div className="border-2 border-[#8fa3b0]/20 p-12 text-center"><p className="text-sm text-[#5a6d78]">{tickets.length === 0 ? 'No tickets found.' : 'No tickets match the current filters.'}</p></div>
          ) : (
            <div className="border-2 border-[#1a1a1a] overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-[#1a1a1a]">
                    <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">ID</th>
                    <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">User</th>
                    <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Type</th>
                    <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Category</th>
                    <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Priority</th>
                    <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Status</th>
                    <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Date</th>
                    <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]"></th>
                    <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8fa3b0]/15">
                  {filteredTickets.map((t) => (
                    <tr key={t.id} className="hover:bg-[#8fa3b0]/5 transition-colors">
                      <td className="px-5 py-4 text-sm font-mono text-[#8fa3b0]">#{t.id}</td>
                      <td className="px-5 py-4 text-sm text-[#1a1a1a] font-medium">{t.user_name}</td>
                      <td className="px-5 py-4 text-sm text-[#5a6d78]">{t.type}</td>
                      <td className="px-5 py-4 text-sm text-[#5a6d78]">{t.category}</td>
                      <td className="px-5 py-4 text-sm text-[#5a6d78]">{t.priority}</td>
                      <td className="px-5 py-4">
                        <select value={statusDisplay[t.status] || t.status} onChange={(e) => handleStatusChange(t.id, e.target.value)} className={selectClass}>
                          {STATUSES.map((s) => (<option key={s} value={s}>{s}</option>))}
                        </select>
                      </td>
                      <td className="px-5 py-4 text-xs text-[#8fa3b0] font-mono">{new Date(t.created_at).toLocaleDateString()}</td>
                      <td className="px-5 py-4">
                        <Link to={`/admin/tickets/${t.id}`} className="text-xs font-semibold tracking-[0.1em] uppercase text-[#1a1a1a] underline underline-offset-4 decoration-[#8fa3b0]/30 hover:decoration-[#1a1a1a] transition-colors">View</Link>
                      </td>
                      <td className="px-5 py-4">
                        {confirmDeleteTicket === t.id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-[#e05a30]">Confirm?</span>
                            <button onClick={() => handleDeleteTicket(t.id)} className="text-[10px] font-mono font-semibold tracking-wider uppercase text-[#e05a30] border border-[#e05a30]/40 px-2 py-1 hover:bg-[#e05a30]/10 cursor-pointer transition-colors">Delete</button>
                            <button onClick={() => setConfirmDeleteTicket(null)} className="text-[10px] font-mono tracking-wider uppercase text-[#5a6d78] border border-[#8fa3b0]/25 px-2 py-1 hover:bg-[#8fa3b0]/10 cursor-pointer transition-colors">Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => setConfirmDeleteTicket(t.id)} className="text-[10px] font-mono font-semibold tracking-[0.1em] uppercase text-[#5a6d78] border border-[#8fa3b0]/25 px-3 py-1 hover:text-[#e05a30] hover:border-[#e05a30]/40 transition-colors cursor-pointer">Delete</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
