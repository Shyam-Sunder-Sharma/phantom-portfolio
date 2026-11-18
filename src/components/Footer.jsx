import React from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../context/CmsContext';
import PhantomIcon from './PhantomIcon';
import { Terminal, Shield, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const { profile, storageLabel } = useCms();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090d16] border-t border-white/[0.08] pt-14 pb-10 text-slate-400 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/[0.06]">
          
          {/* Col 1: Identity & Call Sign */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <PhantomIcon className="w-8 h-8" glow={true} />
              <div>
                <span className="font-bold text-white text-base">
                  {profile?.name || "Shyam Sunder Sharma"}
                </span>
                <div className="font-mono text-xs text-cyan-400">
                  Call Sign: <span className="text-white font-bold">{profile?.callSign || "The Phantom"}</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Engineering autonomous local AI systems, distributed web architectures, and resilient developer tools with zero compromises.
            </p>

            {/* Signature Stamp Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111827] border border-white/[0.08] text-xs font-mono">
              <PhantomIcon className="w-3.5 h-3.5" />
              <span className="text-slate-200 font-semibold">Engineered by The Phantom</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-slate-300 font-bold uppercase tracking-wider mb-2">
              Architectures
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#flagship" className="hover:text-cyan-400 transition-colors">
                  ATOM Flagship AI Assistant
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">
                  Projects & Systems
                </a>
              </li>
              <li>
                <a href="#stats" className="hover:text-cyan-400 transition-colors">
                  Developer Telemetry
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-400 transition-colors">
                  Technical Stack
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-cyan-400 transition-colors">
                  Career Progression
                </a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-cyan-400 transition-colors">
                  Certifications Vault
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: CMS & System Telemetry */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-slate-300 font-bold uppercase tracking-wider mb-2">
              Phantom Engine
            </div>
            <div className="p-3 rounded-xl bg-[#111827] border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Persistence:</span>
                <span className="text-cyan-400 font-semibold">Dual Engine</span>
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {storageLabel}
              </div>
              <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between">
                <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
                <Link
                  to="/phantom-cms"
                  className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-white font-semibold"
                >
                  <Terminal className="w-3 h-3" />
                  <span>Admin CMS &gt;</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {profile?.name || "Shyam Sunder Sharma"}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Call Sign: The Phantom</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
