import React from 'react';
import { useCms } from '../context/CmsContext';
import {
  Code,
  Layout,
  Server,
  Cpu,
  Terminal,
  CheckCircle,
  Sparkles,
  Zap
} from 'lucide-react';

export const SkillsSection = () => {
  const { skills } = useCms();

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'languages':
        return <Code className="w-5 h-5 text-cyan-400" />;
      case 'frontend':
        return <Layout className="w-5 h-5 text-sky-400" />;
      case 'backend & databases':
      case 'backend':
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 'tools & ai':
      case 'tools':
      case 'ai':
        return <Cpu className="w-5 h-5 text-amber-400" />;
      default:
        return <Terminal className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#090d16] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tech Stack & Engineering Skills
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
            A comprehensive matrix of system programming languages, modern reactive frontend frameworks, backend engines, and autonomous AI tools.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(skills || []).map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl bg-[#111827] border border-white/[0.08] p-6 shadow-xl hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06] mb-5">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {cat.category}
                    </h3>
                    <span className="font-mono text-[11px] text-slate-400">
                      {(cat.items || []).length} Specialized Skills
                    </span>
                  </div>
                </div>

                {/* Items List - Clean, elegant cards without percentages */}
                <div className="space-y-2.5">
                  {(cat.items || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#090d16] border border-white/[0.04] hover:border-cyan-500/30 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span className="text-sm text-slate-200 font-medium font-sans">
                          {item.name}
                        </span>
                      </div>
                      
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                        {item.level || 'Proficient'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Footer Status */}
              <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between font-mono text-[10px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>Production Ready</span>
                </span>
                <span>Active Core</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
