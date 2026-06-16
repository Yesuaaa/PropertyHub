import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="pt-16">
      <Hero />
      <Features />
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
    <section className="relative min-h-[90vh] flex items-center border-b border-[#8fa3b0]/20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-professional.jpg"
          alt=""
          className="absolute top-0 right-0 h-full w-[60%] object-cover hidden lg:block"
        />
        <div className="absolute top-0 right-0 h-full w-[60%] bg-gradient-to-l from-[#f5f3ef]/80 to-[#f5f3ef] hidden lg:block" />
      </div>
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 sm:px-10 md:px-16 w-full py-16 lg:py-0 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <SectionLabel>Internet Cafe Portal</SectionLabel>

          <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-bold text-[#1a1a1a] leading-[0.92] tracking-[-0.03em]">
            Report it.
            <br />
            <span className="text-[#8fa3b0]">Track it.</span>
            <br />
            Resolve it.
          </h1>

          <p className="text-base text-[#5a6d78] max-w-md leading-relaxed">
            Hardware issues, network problems, billing concerns &mdash; submitted and tracked in one place. Built for customers, gamers, and internet cafe staff.
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
    <div className="w-full space-y-5">
      <div className="relative border-2 border-[#1a1a1a] overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 bg-[#1a1a1a]">
          <span className="w-2.5 h-2.5 bg-[#e05a30]" />
          <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#f5f3ef]">Support Tools</span>
        </div>

        <div className="divide-y divide-[#8fa3b0]/15">
          <ToolRow icon="ticket" title="Submit a Ticket" desc="Report hardware, network, or billing issues" />
          <ToolRow icon="search" title="Track Request" desc="Check the status of your submissions" />
          <ToolRow icon="faq" title="Help Center" desc="Browse guides and frequently asked questions" />
          <ToolRow icon="chat" title="Live Chat" desc="Get real-time assistance from staff" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard value="24h" label="Avg. Response" accent />
        <StatCard value="156" label="Resolved" />
        <StatCard value="98%" label="Rate" />
      </div>
    </div>
  );
}

function ToolRow({ icon, title, desc }) {
  const icons = {
    ticket: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
        <path fillRule="evenodd" d="M4 1.75a.75.75 0 01.75.75V3h6.5v-.5a.75.75 0 011.5 0V3h.25A2.25 2.25 0 0115.25 5.25v6.5A2.25 2.25 0 0113 14H3A2.25 2.25 0 01.75 11.75v-6.5A2.25 2.25 0 013 3h.25v-.5A.75.75 0 014 1.75zM2.25 6v5.75c0 .414.336.75.75.75h10a.75.75 0 00.75-.75V6H2.25z" clipRule="evenodd" />
      </svg>
    ),
    search: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
        <path fillRule="evenodd" d="M9.5 3.5a5.5 5.5 0 016.07 7.907l3.478 3.478a.75.75 0 01-1.06 1.06l-3.478-3.478A5.5 5.5 0 119.5 3.5zm0 1.5a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
        <path d="M10 7a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg>
    ),
    faq: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
        <path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    ),
    chat: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
        <path fillRule="evenodd" d="M1 8a7 7 0 0114 0c0 1.657-.569 3.18-1.524 4.39l.89 2.46a.5.5 0 01-.635.635l-2.46-.89A6.962 6.962 0 018 15 7 7 0 011 8zm3-1a1 1 0 000 2h.01a1 1 0 100-2H4zm4 0a1 1 0 000 2h.01a1 1 0 100-2H8zm4 0a1 1 0 000 2h.01a1 1 0 100-2h-.01z" clipRule="evenodd" />
      </svg>
    ),
  };

  return (
    <div className="flex items-center gap-4 px-6 py-4 hover:bg-[#8fa3b0]/5 transition-colors cursor-pointer group">
      <div className="w-9 h-9 border-2 border-[#8fa3b0]/30 flex items-center justify-center text-[#8fa3b0] group-hover:border-[#e05a30] group-hover:text-[#e05a30] transition-colors flex-shrink-0">
        {icons[icon]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-[#1a1a1a] tracking-wide">{title}</p>
        <p className="text-[10px] text-[#8fa3b0] tracking-wide">{desc}</p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-[#8fa3b0]/50 group-hover:text-[#e05a30] group-hover:translate-x-1 transition-all flex-shrink-0">
        <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

function StatCard({ value, label, accent }) {
  return (
    <div className={`border-2 ${accent ? 'border-[#e05a30]/40' : 'border-[#8fa3b0]/20'} bg-[#f5f3ef] p-4 text-center`}>
      <span className={`text-2xl font-bold font-mono ${accent ? 'text-[#e05a30]' : 'text-[#1a1a1a]'}`}>{value}</span>
      <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#8fa3b0] mt-1">{label}</p>
    </div>
  );
}

function Features() {
  const features = [
    {
      number: '01',
      title: 'Submit Requests',
      description: 'Report hardware issues, network problems, billing concerns, and safety concerns with categorized priority levels.',
    },
    {
      number: '02',
      title: 'Track Status',
      description: 'Monitor your complaint and feedback status in real-time from submission to resolution with full transparency.',
    },
    {
      number: '03',
      title: 'Cafe Admin',
      description: 'Powerful internet cafe management tools to manage, prioritize, and resolve all incoming customer and staff requests efficiently.',
    },
  ];

  return (
    <section className="relative bg-[#0a0a0a] border-b border-[#6b8390]/40 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 12px,
          #aeaeae 14px,
          #aeaeae 15px
        )`
      }} />
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 sm:px-10 md:px-16 py-16 sm:py-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 bg-[#e05a30]" />
          <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#f5f3ef]">How It Works</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#6b8390]/40">
          {features.map((f) => (
            <div key={f.number} className="p-8 first:pl-0 md:first:pl-8 last:pr-0 md:last:pr-8">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#f5f3ef]/60">{f.number}</span>
              <h3 className="text-xl font-bold text-[#f5f3ef] mt-3 mb-3 tracking-tight">{f.title}</h3>
              <p className="text-sm text-[#f5f3ef]/75 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

