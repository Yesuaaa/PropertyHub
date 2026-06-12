import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="pt-16">
      <Hero />
      <Features />
      <Steps />
      <Footer />
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-2 h-2 bg-[#e05a30] rounded-none" />
      <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">{children}</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center border-b border-[#8fa3b0]/20">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 w-full py-20 lg:py-0 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <SectionLabel>Property Management Portal</SectionLabel>

          <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-bold text-[#1a1a1a] leading-[0.92] tracking-[-0.03em]">
            Report it.
            <br />
            <span className="text-[#8fa3b0]">Track it.</span>
            <br />
            Resolve it.
          </h1>

          <p className="text-base text-[#5a6d78] max-w-md leading-relaxed">
            Maintenance issues, noise complaints, lease disputes &mdash; submitted and tracked in one place. Built for tenants, owners, and property managers.
          </p>

          <div className="flex flex-wrap gap-4 items-center pt-2">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase text-[#1a1a1a] border-2 border-[#1a1a1a] px-8 py-3.5 hover:bg-[#1a1a1a] hover:text-[#f5f3ef] transition-all duration-200"
            >
              Submit a Request
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M1 8a.75.75 0 01.75-.75h10.638L9.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l3.158-2.96H1.75A.75.75 0 011 8z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              to="/login"
              className="text-xs font-medium text-[#8fa3b0] hover:text-[#1a1a1a] transition-colors tracking-wider uppercase underline underline-offset-4 decoration-[#8fa3b0]/30 hover:decoration-[#1a1a1a]"
            >
              Already have an account?
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 hidden lg:block">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="w-full">
      <div className="border-2 border-[#1a1a1a] bg-[#f5f3ef] p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#8fa3b0]/20">
          <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">Recent Requests</span>
          <span className="text-[10px] font-mono tracking-[0.15em] text-[#5a6d78]">03</span>
        </div>

        <div className="space-y-0 divide-y divide-[#8fa3b0]/15">
          <VisualCard
            number="01"
            title="Maintenance Request"
            desc="Plumbing issue in Unit 4B"
            status="In Progress"
          />
          <VisualCard
            number="02"
            title="Security Report"
            desc="Broken gate camera &mdash; Lot C"
            status="Open"
          />
          <VisualCard
            number="03"
            title="Lease Dispute"
            desc="Parking allocation conflict"
            status="Resolved"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="border-2 border-[#8fa3b0]/20 bg-[#f5f3ef] p-5">
          <span className="text-3xl font-bold text-[#1a1a1a] font-mono">24h</span>
          <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8fa3b0] mt-1">Avg. Response</p>
        </div>
        <div className="border-2 border-[#8fa3b0]/20 bg-[#f5f3ef] p-5">
          <span className="text-3xl font-bold text-[#1a1a1a] font-mono">98%</span>
          <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8fa3b0] mt-1">Resolution Rate</p>
        </div>
      </div>
    </div>
  );
}

function VisualCard({ number, title, desc, status }) {
  return (
    <div className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
      <span className="text-[10px] font-mono font-bold text-[#8fa3b0] mt-0.5">{number}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-[#1a1a1a] tracking-wide">{title}</div>
        <div className="text-xs text-[#5a6d78] mt-0.5">{desc}</div>
      </div>
      <span className="text-[10px] font-mono font-semibold tracking-[0.15em] uppercase text-[#8fa3b0] mt-0.5">{status}</span>
    </div>
  );
}

function Features() {
  const features = [
    {
      number: '01',
      title: 'Submit Requests',
      description: 'Report maintenance issues, noise complaints, lease disputes, and safety concerns with categorized priority levels.',
    },
    {
      number: '02',
      title: 'Track Maintenance',
      description: 'Monitor your maintenance and complaint status in real-time from submission to resolution with full transparency.',
    },
    {
      number: '03',
      title: 'Property Admin',
      description: 'Powerful property management tools to manage, prioritize, and resolve all incoming maintenance and tenant requests efficiently.',
    },
  ];

  return (
    <section className="border-b border-[#8fa3b0]/20">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 py-24">
        <SectionLabel>How It Works</SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#8fa3b0]/20">
          {features.map((f) => (
            <div key={f.number} className="p-8 first:pl-0 md:first:pl-8 last:pr-0 md:last:pr-8">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#8fa3b0]">{f.number}</span>
              <h3 className="text-xl font-bold text-[#1a1a1a] mt-3 mb-3 tracking-tight">{f.title}</h3>
              <p className="text-sm text-[#5a6d78] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  const steps = [
    { step: '01', title: 'Register', description: 'Create your tenant or owner account.' },
    { step: '02', title: 'Submit', description: 'Describe your property issue with type and priority.' },
    { step: '03', title: 'Track', description: 'Follow your maintenance request status in real-time.' },
    { step: '04', title: 'Resolved', description: 'Get notified when your property issue is handled.' },
  ];

  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 py-24">
        <SectionLabel>Getting Started</SectionLabel>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#8fa3b0]/20">
          {steps.map((s) => (
            <div key={s.step} className="p-8 first:pl-0 last:pr-0">
              <span className="text-5xl font-bold font-mono text-[#8fa3b0]/20 leading-none">{s.step}</span>
              <h3 className="text-lg font-bold text-[#1a1a1a] mt-4 mb-2 tracking-tight">{s.title}</h3>
              <p className="text-sm text-[#5a6d78]">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const columns = [
    {
      title: 'Product',
      links: [
        { label: 'Submit a Request', to: '/new' },
        { label: 'My Requests', to: '/dashboard' },
        { label: 'Admin Panel', to: '/admin' },
        { label: 'Register', to: '/register' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', to: '/' },
        { label: 'API Reference', to: '/' },
        { label: 'Guidelines', to: '/' },
        { label: 'Status Page', to: '/' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', to: '/' },
        { label: 'Careers', to: '/' },
        { label: 'Privacy Policy', to: '/' },
        { label: 'Terms of Service', to: '/' },
      ],
    },
  ];

  return (
    <footer className="border-t border-[#8fa3b0]/20">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 no-underline">
              <div className="w-7 h-7 border-2 border-[#1a1a1a] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-[#1a1a1a]">
                  <path fillRule="evenodd" d="M8 1.75a.75.75 0 01.75.75v5.25h4.25a.75.75 0 010 1.5H8.75V13a.75.75 0 01-1.5 0V9H3.25a.75.75 0 010-1.5H7.25V2.5A.75.75 0 018 1.75z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-[#1a1a1a] font-bold text-sm tracking-[0.08em] uppercase">PropertyHub</span>
            </Link>
            <p className="text-sm leading-relaxed text-[#5a6d78] max-w-sm">
              Submit, track, and resolve property complaints and maintenance requests efficiently. Every tenant's voice heard, every issue resolved.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 bg-[#e05a30]" />
                <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">{col.title}</span>
              </div>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-[#5a6d78] hover:text-[#1a1a1a] transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-[#8fa3b0]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-mono tracking-[0.15em] text-[#8fa3b0]">
            &copy; {new Date().getFullYear()} PROPERTYHUB &mdash; ALL RIGHTS RESERVED
          </span>
          <div className="flex gap-6">
            <span className="text-[10px] font-mono tracking-[0.15em] text-[#8fa3b0] hover:text-[#1a1a1a] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-[10px] font-mono tracking-[0.15em] text-[#8fa3b0] hover:text-[#1a1a1a] cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
