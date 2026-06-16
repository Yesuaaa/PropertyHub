import { Link } from 'react-router-dom';

export default function Footer() {
  const columns = [
    {
      title: 'Quick Actions',
      links: [
        { label: 'Submit a Complaint', to: '/new' },
        { label: 'Track My Requests', to: '/dashboard' },
        { label: 'Create Account', to: '/register' },
      ],
    },
    {
      title: 'Request Types',
      links: [
        { label: 'Hardware Issue', to: '/new' },
        { label: 'Network Problem', to: '/new' },
        { label: 'Software Issue', to: '/new' },
        { label: 'Billing Concern', to: '/new' },
        { label: 'Safety Concern', to: '/new' },
        { label: 'Cleanliness', to: '/new' },
        { label: 'Noise / Disruption', to: '/new' },
        { label: 'Gaming Area', to: '/new' },
        { label: 'Workstation', to: '/new' },
        { label: 'Staff / Service', to: '/new' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Filing Guidelines', to: '/' },
        { label: 'Privacy Policy', to: '/privacy' },
        { label: 'Terms of Service', to: '/terms' },
        { label: 'Contact Us', to: '/' },
      ],
    },
  ];

  return (
    <footer className="bg-[#001A29] border-t border-[#001A29]/20">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 no-underline">
              <div className="w-7 h-7 border-2 border-white/80 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-white/80">
                  <path fillRule="evenodd" d="M8 1.75a.75.75 0 01.75.75v5.25h4.25a.75.75 0 010 1.5H8.75V13a.75.75 0 01-1.5 0V9H3.25a.75.75 0 010-1.5H7.25V2.5A.75.75 0 018 1.75z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-white font-bold text-sm tracking-[0.08em] uppercase">NetCafe Hub</span>
            </Link>
            <p className="text-sm leading-relaxed text-[#c8d5dd] max-w-sm">
              Report it. Track it. Resolve it. Hardware issues, network problems, billing concerns &mdash; submitted and tracked in one place.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 bg-[#e05a30]" />
                <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#e0eaf0]">{col.title}</span>
              </div>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-[#c8d5dd] hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-[#8fa3b0]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-mono tracking-[0.15em] text-[#d0dbe3]">
            &copy; {new Date().getFullYear()} NETCAFE HUB &mdash; ALL RIGHTS RESERVED
          </span>
          <div className="flex gap-6">
            <Link to="/" className="text-[10px] font-mono tracking-[0.15em] text-[#d0dbe3] hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-[10px] font-mono tracking-[0.15em] text-[#d0dbe3] hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

