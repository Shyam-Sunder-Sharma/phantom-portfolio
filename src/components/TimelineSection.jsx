import React from 'react';
import { useCms } from '../context/CmsContext';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  Sparkles,
  CheckCircle2,
  GitCommit
} from 'lucide-react';

export const TimelineSection = () => {
  const { timeline } = useCms();

  const sortedTimeline = (timeline || []).sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="timeline" className="py-20 bg-[#090d16] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">
            <GitCommit className="w-3.5 h-3.5" />
            <span>PROGRESSION CHRONICLE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience & Education Timeline
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
            Key academic milestones, engineering internships, and leadership roles shaping systems engineering proficiency.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative border-l-2 border-cyan-500/20 ml-4 sm:ml-8 space-y-10">
          {sortedTimeline.map((item, idx) => {
            const isEducation = item.type === 'Education';

            return (
              <div key={item.id} className="relative pl-6 sm:pl-10 group">
                
                {/* Node marker icon */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#111827] border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-500/20 group-hover:scale-110 group-hover:border-emerald-400 transition-all">
                  {isEducation ? (
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                  )}
                </div>

                {/* Card */}
                <div className="rounded-2xl bg-[#111827] border border-white/[0.08] p-6 shadow-xl hover:border-cyan-500/40 transition-all">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06] mb-4">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-white/[0.04] text-cyan-400 border border-white/[0.08] mb-1.5">
                        {item.type || 'Milestone'}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {item.role}
                      </h3>
                      <div className="text-sm text-slate-300 font-medium mt-0.5">
                        {item.organization}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-500/30 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Highlights list */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.04]">
                      {item.highlights.map((hl, hIdx) => (
                        <div
                          key={hIdx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-black/40 text-emerald-300 border border-emerald-500/20"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TimelineSection;
