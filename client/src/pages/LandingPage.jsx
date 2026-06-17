import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

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
    <div className="inline-flex items-center gap-2 border-[3px] border-[#1a1a1a] bg-[#ffd23f] px-4 py-2 shadow-[4px_4px_0_0_#1a1a1a]">
      <span className="w-2 h-2 bg-[#1a1a1a]" />
      <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#1a1a1a]">{children}</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative bg-[#f5f3ef] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.35] pointer-events-none" style={{
        backgroundImage: `radial-gradient(#1a1a1a 1px, transparent 1px)`,
        backgroundSize: '26px 26px'
      }} />
      <div className="absolute top-10 right-[-60px] w-32 h-32 bg-[#e05a30] border-[3px] border-[#1a1a1a] rotate-12 hidden lg:block shadow-[8px_8px_0_0_#1a1a1a]" />
      <div className="absolute bottom-16 left-[-40px] w-24 h-24 bg-[#ffd23f] border-[3px] border-[#1a1a1a] -rotate-6 hidden lg:block shadow-[6px_6px_0_0_#1a1a1a]" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <motion.div className="lg:col-span-7 space-y-8" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }}>
            <motion.div variants={fadeUp}>
              <SectionLabel>Internet Cafe Portal</SectionLabel>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-[2.75rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-black text-[#1a1a1a] leading-[0.9] tracking-[-0.04em] uppercase">
              Report it.
              <br />
              <span className="inline-block bg-[#e05a30] text-[#f5f3ef] border-[3px] border-[#1a1a1a] px-3 my-1 shadow-[6px_6px_0_0_#1a1a1a]">Track it.</span>
              <br />
              Resolve it.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base sm:text-lg text-[#1a1a1a] max-w-md leading-relaxed font-medium border-l-[3px] border-[#1a1a1a] pl-4 py-1">
              Hardware issues, network problems, billing concerns &mdash; submitted and tracked in one place. Built for customers, gamers, and internet cafe staff.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-5 items-center pt-2">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 text-sm font-bold tracking-wide uppercase text-[#1a1a1a] bg-[#ffd23f] border-[3px] border-[#1a1a1a] px-7 py-3.5 shadow-[6px_6px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150"
              >
                Submit a Request
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M1 8a.75.75 0 01.75-.75h10.638L9.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l3.158-2.96H1.75A.75.75 0 011 8z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                to="/login"
                className="text-sm font-bold text-[#1a1a1a] hover:text-[#e05a30] transition-colors tracking-wide uppercase border-b-[3px] border-[#1a1a1a] hover:border-[#e05a30] pb-1"
              >
                Already have an account?
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="w-full space-y-6">
      <div className="relative border-[3px] border-[#1a1a1a] bg-[#f5f3ef] shadow-[8px_8px_0_0_#1a1a1a]">
        <div className="flex items-center justify-between gap-3 px-6 py-4 bg-[#1a1a1a] border-b-[3px] border-[#1a1a1a]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-[#e05a30]" />
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#f5f3ef]">Support Tools</span>
          </div>
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#ffd23f]">v2.0</span>
        </div>

        <div className="divide-y-[3px] divide-[#1a1a1a]">
          <ToolRow icon="ticket" title="Submit a Ticket" desc="Report hardware, network, or billing issues" />
          <ToolRow icon="search" title="Track Request" desc="Check the status of your submissions" />
          <ToolRow icon="faq" title="Help Center" desc="Browse guides and frequently asked questions" />
          <ToolRow icon="chat" title="Live Chat" desc="Get real-time assistance from staff" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
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
    <div className="flex items-center gap-4 px-6 py-4 hover:bg-[#ffd23f] transition-colors cursor-pointer group">
      <div className="w-10 h-10 border-[3px] border-[#1a1a1a] bg-[#f5f3ef] flex items-center justify-center text-[#1a1a1a] group-hover:bg-[#1a1a1a] group-hover:text-[#ffd23f] transition-colors flex-shrink-0">
        {icons[icon]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#1a1a1a] tracking-wide">{title}</p>
        <p className="text-[11px] text-[#5a6d78] tracking-wide font-medium">{desc}</p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-[#1a1a1a] group-hover:translate-x-1 transition-transform flex-shrink-0">
        <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

function StatCard({ value, label, accent }) {
  return (
    <div className={`border-[3px] border-[#1a1a1a] p-4 text-center shadow-[5px_5px_0_0_#1a1a1a] ${accent ? 'bg-[#e05a30]' : 'bg-[#ffd23f]'}`}>
      <span className={`text-3xl font-black font-mono ${accent ? 'text-[#f5f3ef]' : 'text-[#1a1a1a]'}`}>{value}</span>
      <p className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-[#1a1a1a]/70 mt-1">{label}</p>
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
    <section className="relative bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 18px, #1a1a1a 18px, #1a1a1a 19px)`
      }} />
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 sm:px-10 md:px-16 py-16 sm:py-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 border-[3px] border-[#1a1a1a] bg-[#e05a30] px-4 py-2 shadow-[4px_4px_0_0_#1a1a1a] mb-6">
              <span className="w-2 h-2 bg-[#1a1a1a]" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#f5f3ef]">How It Works</span>
            </div>
            <h2 className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] font-black text-white leading-[0.95] tracking-[-0.03em] uppercase max-w-xl">
              Three steps.<br />Zero hassle.
            </h2>
          </div>
          <p className="text-sm text-white font-medium max-w-xs border-l-[3px] border-[#1a1a1a] pl-4 py-1">
            Everything you need to report, track, and resolve issues &mdash; built for speed.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.number}
              variants={fadeUp}
              className={`group relative border-[3px] border-[#1a1a1a] p-8 shadow-[8px_8px_0_0_#1a1a1a] hover:shadow-[4px_4px_0_0_#1a1a1a] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 ${i === 0 ? 'bg-[#ffd23f]' : i === 1 ? 'bg-[#f5f3ef]' : 'bg-[#000000]'}`}
            >
              <span className={`text-5xl font-black font-mono ${i === 2 ? 'text-[#ffd23f]' : 'text-[#1a1a1a]'}`}>{f.number}</span>
              <h3 className={`text-xl font-black mt-4 mb-3 tracking-tight uppercase ${i === 2 ? 'text-[#f5f3ef]' : 'text-[#1a1a1a]'}`}>{f.title}</h3>
              <p className={`text-sm leading-relaxed font-medium ${i === 2 ? 'text-[#f5f3ef]/80' : 'text-[#5a6d78]'}`}>{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

