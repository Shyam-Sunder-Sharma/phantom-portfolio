import React from 'react';
import { useCms } from '../context/CmsContext';
import PhantomIcon from './PhantomIcon';
import {
  MapPin,
  Sparkles,
  Terminal,
  ExternalLink,
  Code2,
  Mail,
  ArrowRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { formatExternalUrl } from '../utils/urlHelper';

export const HeroSection = () => {
  const { profile } = useCms();

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-grid-pattern">
      {/* Background ambient radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges Row: Availability + Call Sign */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          
          {/* Live Availability Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111827] border border-emerald-500/30 text-emerald-300 font-mono text-xs shadow-sm shadow-emerald-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium tracking-tight">
              {profile?.availabilityStatus || "Available for High-Impact Projects & Roles"}
            </span>
          </div>

          {/* Builder Call Sign Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono text-xs shadow-sm">
            <PhantomIcon className="w-3.5 h-3.5" />
            <span className="font-semibold tracking-wider">CALL SIGN:</span>
            <span className="text-white font-bold">{profile?.callSign || "The Phantom"}</span>
          </div>

          {/* Location Badge */}
          <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#111827] border border-white/[0.08] text-slate-400 font-mono text-xs">
            <MapPin className="w-3 h-3 text-cyan-400" />
            <span>{profile?.location || "Kanpur, Uttar Pradesh, India"}</span>
          </div>
        </div>

        {/* Main Grid: Hero Details & Terminal HUD Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Name, Bio, CTAs, Socials */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <div className="font-mono text-xs sm:text-sm text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-4 h-px bg-cyan-400" />
                SYSTEMS ARCHITECT & AUTONOMOUS AGENTS
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 font-sans leading-none sm:leading-tight">
                {profile?.name || "Shyam Sunder Sharma"}
              </h1>
              <p className="mt-3 text-lg sm:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
                {profile?.headline || "Full-Stack Developer • AI & Systems Builder • CS Undergrad (UPTTI '28)"}
              </p>
            </div>

            {/* Bio */}
            <p className="text-slate-300 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {profile?.bio || "Engineering end-to-end web applications, developer tools, and autonomous local AI systems under the call sign The Phantom."}
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#flagship"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-xs sm:text-sm font-semibold tracking-wide hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Cpu className="w-4 h-4 text-white" />
                <span>Explore Flagship ATOM</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111827] text-slate-200 border border-white/[0.1] hover:border-cyan-500/40 hover:text-cyan-300 font-mono text-xs sm:text-sm font-semibold tracking-wide transition-all"
              >
                <span>View All Projects</span>
              </a>
            </div>

            {/* Social Channels Bar */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-4">
              <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">
                Direct Channels:
              </span>
              <div className="flex items-center gap-2">
                {profile?.socials?.github && (
                  <a
                    href={formatExternalUrl(profile.socials.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-[#111827] border border-white/[0.08] text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
                    aria-label="GitHub Profile"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {profile?.socials?.linkedin && (
                  <a
                    href={formatExternalUrl(profile.socials.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-[#111827] border border-white/[0.08] text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
                    aria-label="LinkedIn Profile"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {profile?.socials?.leetcode && (
                  <a
                    href={formatExternalUrl(profile.socials.leetcode)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-[#111827] border border-white/[0.08] text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
                    aria-label="LeetCode Profile"
                    title="LeetCode"
                  >
                    <Code2 className="w-4 h-4" />
                  </a>
                )}
                {profile?.contactEmail && (
                  <a
                    href={`mailto:${profile.contactEmail}`}
                    className="p-2.5 rounded-lg bg-[#111827] border border-white/[0.08] text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
                    aria-label="Send Email"
                    title={profile.contactEmail}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Telemetry & Phantom Core HUD Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#111827] border border-white/[0.08] p-5 sm:p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
              
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] font-mono text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-400">phantom-core://telemetry</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-semibold">
                  STATUS: OPTIMAL
                </span>
              </div>

              {/* Terminal Body */}
              <div className="mt-4 space-y-3 font-mono text-xs">
                
                {/* Console Log line */}
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-slate-300">
                  <span className="text-cyan-400">$ </span>
                  <span className="text-slate-400">phantom.inspect_subsystems()</span>
                </div>

                <div className="space-y-2 text-slate-400 text-[11px] pt-1">
                  <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Security Identity
                    </span>
                    <span className="text-emerald-400 font-semibold">Verified // The Phantom</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                      Flagship Model
                    </span>
                    <span className="text-cyan-300 font-semibold">ATOM (Personal Local AI)</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Terminal className="w-3.5 h-3.5 text-sky-400" />
                      Institution
                    </span>
                    <span className="text-slate-200">UPTTI Kanpur (B.Tech '28)</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Academic Benchmark
                    </span>
                    <span className="text-amber-300 font-semibold">NPTEL DBMS Top 2% (80%)</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      CMS Engine
                    </span>
                    <span className="text-slate-200">Phantom Dual Persistence Active</span>
                  </div>
                </div>

                {/* Signature Banner Box */}
                <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-emerald-950/60 border border-cyan-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <PhantomIcon className="w-6 h-6" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold">
                        ORIGIN VERIFICATION
                      </div>
                      <div className="text-xs text-white font-semibold">
                        "Engineered by The Phantom"
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-bold px-2 py-1 rounded bg-emerald-950/80 border border-emerald-500/30">
                    AUTHENTIC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
