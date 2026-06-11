import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const FEATURES = [
  {
    title: 'Submit Tickets',
    description: 'Easily submit complaints, feedback, suggestions, or bug reports with categorized priority levels.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h12v2H3v-2zm0 4h18v2H3v-2zm0 4h12v2H3v-2z" />
      </svg>
    ),
  },
  {
    title: 'Track Progress',
    description: 'Monitor your ticket status in real-time from submission to resolution with full transparency.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  {
    title: 'Admin Dashboard',
    description: 'Powerful admin tools to manage, prioritize, and resolve all incoming tickets efficiently.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
      </svg>
    ),
  },
];

const STEPS = [
  { step: '01', title: 'Register', description: 'Create your account in seconds.' },
  { step: '02', title: 'Submit', description: 'Describe your issue with type and priority.' },
  { step: '03', title: 'Track', description: 'Follow your ticket status in real-time.' },
  { step: '04', title: 'Resolved', description: 'Get notified when your issue is handled.' },
];

export default function LandingPage() {
  return (
    <div className="pt-20">
      <Hero />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative bg-[#f0fdf4] overflow-hidden">
      <div className="min-h-screen flex items-center py-16 lg:py-0">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 uppercase leading-[0.95] tracking-tight">
              Got an
              <br />
              <span className="text-green-600">Issue?</span>
              <br />
              Tell Us.
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-500 max-w-md leading-relaxed">
              Submit complaints, feedback, and suggestions. We listen, track, and resolve every issue you raise.
            </p>
            <div className="mt-6 sm:mt-10 flex flex-wrap gap-4 items-center">
              <Link
                to="/register"
                className="group relative inline-flex items-center gap-3 bg-green-600 text-white font-bold uppercase tracking-wider text-sm px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-green-700 transition-all duration-300 hover:shadow-[0_0_30px_rgba(22,163,74,0.4)] active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
                Submit Ticket
              </Link>
              <Link
                to="/login"
                className="text-gray-600 font-medium text-sm px-6 py-4 hover:text-green-700 transition-colors underline underline-offset-4 decoration-gray-300 hover:decoration-green-600"
              >
                Already have an account?
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-center lg:justify-end">
            <RobotHead />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

function RobotHead() {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [mounted, setMounted] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const eyeOffsetX = (mouse.x - 0.5) * 6;
  const eyeOffsetY = (mouse.y - 0.5) * 4;
  const headTilt = (mouse.x - 0.5) * 3;

  return (
    <div ref={containerRef} className="w-full max-w-md lg:max-w-lg aspect-square relative">
      <svg
        viewBox="0 0 400 400"
        className={`w-full h-full transition-transform duration-100 ease-out ${mounted ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
        style={{ transform: `rotate(${headTilt}deg)` }}
      >
        <defs>
          <linearGradient id="bmoBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3dd6c8" />
            <stop offset="50%" stopColor="#22b8a9" />
            <stop offset="100%" stopColor="#1a9e91" />
          </linearGradient>
          <linearGradient id="bmoBodySide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2cc4b5" />
            <stop offset="100%" stopColor="#17968a" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a3a4a" />
            <stop offset="100%" stopColor="#0d1f2d" />
          </linearGradient>
          <linearGradient id="legGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22b8a9" />
            <stop offset="100%" stopColor="#17968a" />
          </linearGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </radialGradient>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bigGlow">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bmoShadow">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.15" />
          </filter>
          <filter id="screenGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#22c55e" floodOpacity="0.3" />
          </filter>
          <clipPath id="screenClip">
            <rect x="130" y="100" width="140" height="100" rx="8" />
          </clipPath>
        </defs>

        <g filter="url(#bmoShadow)">
          <g style={{ transform: `rotate(${(mouse.x - 0.5) * 4}deg)`, transformOrigin: '200px 75px' }}>
            <line x1="200" y1="95" x2="200" y2="65" stroke="#22b8a9" strokeWidth="6" strokeLinecap="round" />
            <circle cx="200" cy="58" r="9" fill="#22c55e" filter="url(#neonGlow)">
              <animate attributeName="r" values="9;11;9" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="58" r="4" fill="#bbf7d0" />
          </g>

          <rect x="130" y="75" width="140" height="210" rx="20" fill="url(#bmoBody)" />
          <rect x="130" y="75" width="140" height="210" rx="20" fill="none" stroke="#4dd8cb" strokeWidth="1.5" opacity="0.4" />

          <rect x="130" y="95" width="140" height="100" rx="8" fill="url(#screenGrad)" filter="url(#screenGlow)" />

          <circle cx="143" cy="108" r="2.5" fill="#1a9e91" />
          <circle cx="200" cy="108" r="2.5" fill="#22c55e" filter="url(#softGlow)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="257" cy="108" r="2.5" fill="#1a9e91" />

          <g clipPath="url(#screenClip)">
            <circle cx={178 + eyeOffsetX} cy={145 + eyeOffsetY} r="8" fill="url(#eyeGlow)" filter="url(#neonGlow)">
              <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx={178 + eyeOffsetX} cy={145 + eyeOffsetY} r="4" fill="#fff" opacity="0.9">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
            </circle>

            <circle cx={222 + eyeOffsetX} cy={145 + eyeOffsetY} r="8" fill="url(#eyeGlow)" filter="url(#neonGlow)">
              <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx={222 + eyeOffsetX} cy={145 + eyeOffsetY} r="4" fill="#fff" opacity="0.9">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
            </circle>

            <path
              d="M 185 172 Q 200 180 215 172"
              stroke="#22c55e"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              filter="url(#softGlow)"
            />
          </g>

          <rect x="148" y="215" width="30" height="30" rx="4" fill="#17968a" opacity="0.6" />
          <rect x="155" y="222" width="16" height="16" rx="2" fill="#1a9e91" />
          <rect x="148" y="215" width="30" height="30" rx="4" fill="none" stroke="#17968a" strokeWidth="1" />

          <rect x="143" y="220" width="8" height="20" rx="2" fill="#17968a" opacity="0.7" />
          <rect x="175" y="228" width="20" height="8" rx="2" fill="#17968a" opacity="0.7" />

          <circle cx="233" cy="225" r="8" fill="#ef4444" opacity="0.8">
            <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="233" cy="225" r="8" fill="none" stroke="#dc2626" strokeWidth="1" />
          <circle cx="253" cy="240" r="6" fill="#f97316" opacity="0.7" />
          <circle cx="253" cy="240" r="6" fill="none" stroke="#ea580c" strokeWidth="1" />

          <rect x="148" y="258" width="104" height="6" rx="3" fill="#17968a" opacity="0.4" />

          <rect x="115" y="130" width="18" height="55" rx="8" fill="url(#bmoBodySide)" />
          <rect x="267" y="130" width="18" height="55" rx="8" fill="url(#bmoBodySide)" />

          <rect x="112" y="160" width="8" height="22" rx="4" fill="#22b8a9" />
          <rect x="280" y="160" width="8" height="22" rx="4" fill="#22b8a9" />
        </g>

        <rect x="162" y="285" width="20" height="35" rx="6" fill="url(#legGrad)" />
        <rect x="218" y="285" width="20" height="35" rx="6" fill="url(#legGrad)" />

        <ellipse cx="200" cy="370" rx="60" ry="8" fill="#22c55e" opacity="0.08" />
        <ellipse cx="200" cy="360" rx="40" ry="5" fill="#22c55e" opacity="0.06" />

        <g className="hidden lg:block">
          <circle cx="50" cy="170" r="3" fill="#22c55e" filter="url(#bigGlow)">
            <animate attributeName="opacity" values="0;0.8;0" dur="5s" repeatCount="indefinite" begin="0s" />
          </circle>
          <circle cx="350" cy="200" r="2.5" fill="#22c55e" filter="url(#bigGlow)">
            <animate attributeName="opacity" values="0;0.6;0" dur="4s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="60" cy="280" r="2" fill="#4ade80" filter="url(#bigGlow)">
            <animate attributeName="opacity" values="0;0.7;0" dur="6s" repeatCount="indefinite" begin="2s" />
          </circle>
          <circle cx="340" cy="110" r="2" fill="#4ade80" filter="url(#bigGlow)">
            <animate attributeName="opacity" values="0;0.5;0" dur="4.5s" repeatCount="indefinite" begin="0.5s" />
          </circle>
        </g>
      </svg>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <span className="font-bold text-white text-lg uppercase tracking-wider block mb-3">
            Complaint System
          </span>
          <p className="text-sm leading-relaxed max-w-xs">
            Submit, track, and resolve complaints and feedback efficiently. We ensure every voice is heard.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-green-400 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/new" className="hover:text-green-400 transition-colors">Submit A Ticket</Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-green-400 transition-colors">My Tickets</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-green-400 transition-colors">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-green-400 transition-colors">Register</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>support@complaintsystem.com</li>
            <li>+1 (555) 123-4567</li>
            <li>123 Support Street, Web City</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <span>&copy; {new Date().getFullYear()} Complaint System. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
