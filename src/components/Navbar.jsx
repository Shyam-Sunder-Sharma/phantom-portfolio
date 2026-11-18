import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCms } from '../context/CmsContext';
import PhantomIcon from './PhantomIcon';
import { Sun, Moon, Menu, X, Terminal, Cpu } from 'lucide-react';

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { profile } = useCms();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isCmsRoute = location.pathname.startsWith('/phantom-cms');

  const navLinks = [
    { name: 'FLAGSHIP', href: '/#flagship', icon: Cpu, highlight: true },
    { name: 'Projects', href: '/#projects' },
    { name: 'Telemetry', href: '/#stats' },
    { name: 'Tech Stack', href: '/#skills' },
    { name: 'Timeline', href: '/#timeline' },
    { name: 'Certifications', href: '/#certifications' },
    { name: 'Contact', href: '/#contact' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090d16]/85 dark:bg-[#090d16]/85 light:bg-white/85 border-b border-white/[0.08] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Left: Name + The Phantom Call Sign Badge */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg p-1"
          >
            <PhantomIcon className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform duration-200" glow={true} />
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-sm sm:text-base text-slate-100 dark:text-slate-100 group-hover:text-cyan-400 transition-colors">
                {profile?.name || "Shyam Sunder Sharma"}
              </span>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="tracking-widest uppercase font-semibold">
                  {profile?.callSign || "The Phantom"}
                </span>
                <span className="text-slate-500 hidden sm:inline">•</span>
                <span className="text-slate-400 hidden sm:inline text-[9px]">ENGINEER</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        {!isCmsRoute && (
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              if (link.highlight) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/50 transition-all shadow-[0_0_12px_-3px_rgba(6,182,212,0.3)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>{link.name}</span>
                  </a>
                );
              }
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-1.5 text-xs font-mono text-slate-300 dark:text-slate-300 hover:text-cyan-400 hover:bg-white/[0.04] rounded-md transition-colors"
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        )}

        {/* Right Section: Theme Toggle, and Far Top-Right Phantom Icon */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-white/[0.04] transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-500"
            title={isDark ? "Activate Light Mode" : "Activate Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* FAR TOP-RIGHT PHANTOM CORE ICON ROUTING TO /phantom-cms */}
          <Link
            to="/phantom-cms"
            aria-label="Phantom Core"
            title="Access Phantom Core CMS"
            className="relative group p-1.5 sm:p-2 rounded-lg bg-[#111827] border border-white/[0.08] hover:border-cyan-400/80 hover:bg-cyan-950/30 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            <div className="flex items-center gap-2">
              <PhantomIcon className="w-6 h-6 sm:w-7 sm:h-7" glow={true} />
              <div className="hidden xl:flex flex-col text-left">
                <span className="font-mono text-[9px] font-bold tracking-wider text-cyan-400 uppercase leading-none">
                  PHANTOM CMS
                </span>
                <span className="font-mono text-[8px] text-slate-400 leading-tight">
                  ADMIN PORTAL
                </span>
              </div>
            </div>
            {/* Tooltip on hover */}
            <span className="absolute -bottom-9 right-0 hidden group-hover:block whitespace-nowrap bg-obsidian-900 border border-cyan-500/30 font-mono text-[10px] text-cyan-300 px-2 py-0.5 rounded shadow-lg z-50">
              Phantom Core // CMS
            </span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#090d16] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="py-2 border-b border-white/[0.04] flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">NAVIGATION MENU</span>
            <span className="font-mono text-[10px] text-emerald-400">ONLINE</span>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-mono text-sm text-slate-300 hover:text-cyan-400 hover:bg-white/[0.04]"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/phantom-cms"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-500/40"
            >
              <Terminal className="w-4 h-4" />
              <span>Phantom Core CMS // Admin</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
