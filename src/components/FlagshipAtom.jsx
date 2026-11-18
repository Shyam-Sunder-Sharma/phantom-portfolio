import React from 'react';
import { useCms } from '../context/CmsContext';
import PhantomIcon from './PhantomIcon';
import {
  Cpu,
  Activity,
  Terminal,
  Shield,
  Search,
  ExternalLink,
  CheckCircle2,
  Radio,
  Server,
  Database,
  Lock,
  Layers,
  Zap,
  HardDrive
} from 'lucide-react';
import { Github } from './BrandIcons';
import { formatExternalUrl } from '../utils/urlHelper';

export const FlagshipAtom = () => {
  const { projects } = useCms();
  const atomProject = projects.find(p => p.id === 'atom-flagship' || p.isFlagship) || projects[0];

  const defaultPipelines = [
    {
      stage: "01. QUERY DISPATCH",
      title: "Local Command Stream & Async Pipe",
      desc: "Instant command orchestration via asynchronous system pipes with zero outbound cloud latency.",
      badge: "Local Pipe"
    },
    {
      stage: "02. PRIVACY BUFFER",
      title: "Context Window & Tokenizer Engine",
      desc: "High-efficiency local tokenizer maintaining contextual memory buffers securely on device.",
      badge: "Air-Gapped"
    },
    {
      stage: "03. COGNITIVE REASONING",
      title: "On-Device Quantized LLM Core",
      desc: "Private local inference powering natural language reasoning, code synthesis, and task decisions.",
      badge: "Zero-Cloud"
    },
    {
      stage: "04. TELEMETRY & TOOLS",
      title: "System Hardware Daemon & Search Engine",
      desc: "Direct polling of CPU thermals, RAM heap, and autonomous multi-source real-time web retrieval.",
      badge: "Kernel Polling"
    }
  ];

  const architecturalPipelines = atomProject?.pipelines && atomProject.pipelines.length > 0
    ? atomProject.pipelines
    : defaultPipelines;

  const specs = atomProject?.specs || {
    privacy: "100% Local / Zero Cloud",
    latency: "< 250ms Pipeline",
    hardware: "CPU, Thermals, RAM",
    orchestration: "AsyncIO Multi-Task"
  };

  return (
    <section id="flagship" className="py-20 bg-[#090d16] relative overflow-hidden">
      {/* Background neon ambient gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Flagship Spotlight Banner Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
                FLAGSHIP SPOTLIGHT // AUTONOMOUS AI
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                100% LOCAL EXECUTION
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Zero Cloud Dependency • Private LLM Core</span>
          </div>
        </div>

        {/* Hero Spotlight Card */}
        <div className="rounded-2xl bg-gradient-to-b from-[#111827] to-[#0c121e] border border-cyan-500/30 p-6 sm:p-10 shadow-2xl shadow-cyan-950/30 relative">
          
          {/* Top Stamp Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                <PhantomIcon className="w-8 h-8" glow={true} />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                  <span>{atomProject?.title || "ATOM"}</span>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    {atomProject?.version || "v2.4"}
                  </span>
                </h2>
                <p className="text-sm font-mono text-cyan-400 mt-0.5">
                  {atomProject?.subtitle || "Personal Local AI Assistant"}
                </p>
              </div>
            </div>

            {/* Signature Stamp Badge */}
            {atomProject?.engineeredByPhantom !== false && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-black/60 border border-white/[0.12] text-xs font-mono">
                <PhantomIcon className="w-4 h-4" />
                <span className="text-slate-300 font-semibold">Engineered by The Phantom</span>
              </div>
            )}
          </div>

          {/* Grid Layout: Description & Capabilities + System Architecture HUD */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 6 cols: Deep Architectural Breakdown */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {atomProject?.description || "Personal Local AI Assistant engineered for private on-device execution, real-time web search, system hardware telemetry monitoring, and autonomous task execution. Built to operate without third-party cloud dependencies, featuring hands-free system commands and an intelligent contextual memory buffer."}
              </p>

              {/* Architectural Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {(atomProject?.features || [
                  "100% Private On-Device LLM Inference",
                  "Real-time Hardware Telemetry (CPU, GPU, RAM, Thermals)",
                  "Autonomous Web Scraping & Multi-Source Search",
                  "Low-Latency Execution & Intelligent Context Buffer"
                ]).map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#090d16]/80 border border-white/[0.06] flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 font-sans font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div>
                <span className="block font-mono text-xs uppercase tracking-wider text-slate-400 mb-2">
                  Engineered Subsystems:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(atomProject?.tags || ["Python", "Local LLM", "Autonomous AI", "System Telemetry", "AsyncIO", "GGUF"]).map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Terminal Quick-Launch Instruction */}
              <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-xs">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>TERMINAL DEPLOYMENT</span>
                  <span className="text-cyan-400 font-semibold">STANDALONE CLI</span>
                </div>
                <div className="text-cyan-300 truncate">
                  <span className="text-slate-500">$ </span>
                  {atomProject?.cloneCmd || "git clone https://github.com/Shyam-Sunder-Sharma/atom-ai-assistant.git"}
                </div>
                <div className="text-slate-300 mt-1 truncate">
                  <span className="text-slate-500">$ </span>
                  {atomProject?.runCmd || "python -m atom.core --local-inference --telemetry"}
                </div>
              </div>

              {/* Repo & Demo Links */}
              <div className="flex items-center gap-3 pt-2">
                {atomProject?.githubUrl && (
                  <a
                    href={formatExternalUrl(atomProject.githubUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111827] text-white border border-white/[0.12] hover:border-cyan-400 hover:text-cyan-300 font-mono text-xs font-medium transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>Explore ATOM Repository</span>
                  </a>
                )}
                {atomProject?.liveUrl && (
                  <a
                    href={formatExternalUrl(atomProject.liveUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 text-white hover:bg-cyan-500 font-mono text-xs font-medium transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Console</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right 6 cols: ATOM System Architecture HUD */}
            <div className="lg:col-span-6">
              <div className="rounded-xl bg-[#090d16] border border-cyan-500/30 p-5 sm:p-6 shadow-xl space-y-4">
                
                {/* HUD Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span className="text-slate-300 font-semibold">ATOM ARCHITECTURE PIPELINE</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-500/20">
                    AIR-GAPPED
                  </span>
                </div>

                {/* Pipeline Stages */}
                <div className="space-y-3 font-mono text-xs">
                  {architecturalPipelines.map((pipe, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#111827] border border-white/[0.06] hover:border-cyan-500/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-cyan-400 font-bold">{pipe.stage}</span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-black/40 text-emerald-400 border border-emerald-500/20">
                          {pipe.badge}
                        </span>
                      </div>
                      <div className="text-white font-semibold text-xs font-sans">
                        {pipe.title}
                      </div>
                      <p className="text-slate-400 text-[11px] font-sans mt-0.5">
                        {pipe.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Technical Specifications Matrix */}
                <div className="pt-3 border-t border-white/[0.08] grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                  <div className="p-2 rounded bg-black/30 border border-white/[0.04]">
                    <span className="text-slate-500 block text-[9px]">PRIVACY MODEL</span>
                    <span className="text-white font-medium">{specs.privacy}</span>
                  </div>
                  <div className="p-2 rounded bg-black/30 border border-white/[0.04]">
                    <span className="text-slate-500 block text-[9px]">RESPONSE LATENCY</span>
                    <span className="text-cyan-400 font-medium">{specs.latency}</span>
                  </div>
                  <div className="p-2 rounded bg-black/30 border border-white/[0.04]">
                    <span className="text-slate-500 block text-[9px]">HARDWARE MONITOR</span>
                    <span className="text-white font-medium">{specs.hardware}</span>
                  </div>
                  <div className="p-2 rounded bg-black/30 border border-white/[0.04]">
                    <span className="text-slate-500 block text-[9px]">ORCHESTRATION</span>
                    <span className="text-emerald-400 font-medium">{specs.orchestration}</span>
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

export default FlagshipAtom;
