import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import PhantomIcon from './PhantomIcon';
import {
  ExternalLink,
  Sparkles,
  Layers,
  CheckCircle2,
  Cpu,
  Globe
} from 'lucide-react';
import { Github } from './BrandIcons';

export const ProjectsSection = () => {
  const { projects } = useCms();
  const [filter, setFilter] = useState('all');

  const visibleProjects = (projects || [])
    .filter(p => p.isVisible !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const filterCategories = [
    { id: 'all', label: 'All Engineered Systems' },
    { id: 'ai', label: 'AI & Agents' },
    { id: 'web', label: 'Full-Stack Web' }
  ];

  const filteredProjects = visibleProjects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'ai') {
      return p.tags?.some(t => /ai|llm|orchestrate|voice|agent/i.test(t));
    }
    if (filter === 'web') {
      return p.tags?.some(t => /react|node|flask|express|web|full-stack/i.test(t));
    }
    return true;
  });

  return (
    <section id="projects" className="py-20 bg-[#090d16] relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>SYSTEMS REPERTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineered Architectures & Projects
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Production web applications, decentralized utilities, and autonomous machine learning workflows built with clean code and high performance.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#111827] border border-white/[0.08] self-start md:self-auto overflow-x-auto">
            {filterCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-all whitespace-nowrap ${
                  filter === cat.id
                    ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-2xl bg-[#111827] border transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 ${
                project.isFlagship
                  ? 'border-cyan-500/50 hover:border-cyan-400 shadow-xl shadow-cyan-950/20'
                  : 'border-white/[0.08] hover:border-cyan-500/30 shadow-lg'
              }`}
            >
              <div>
                {/* Preview Image Frame with Gradient Overlay */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.previewImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />
                  
                  {/* Flagship Badge on top of image */}
                  {project.isFlagship && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-cyan-950/90 border border-cyan-500/50 text-cyan-300 font-mono text-[10px] font-bold flex items-center gap-1.5 backdrop-blur-md">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>FLAGSHIP SPOTLIGHT</span>
                    </div>
                  )}

                  {/* Links overlay */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-black/70 hover:bg-black text-slate-300 hover:text-white border border-white/[0.1] backdrop-blur-md transition-colors"
                        title="View Source on GitHub"
                        aria-label={`View ${project.title} source code`}
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-cyan-600/90 hover:bg-cyan-500 text-white border border-cyan-400/50 backdrop-blur-md transition-colors"
                        title="Open Live Deployment"
                        aria-label={`Open ${project.title} live demo`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="font-mono text-xs text-cyan-400/90 mt-0.5">
                        {project.subtitle}
                      </p>
                    )}
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  {project.features && project.features.length > 0 && (
                    <ul className="mb-4 space-y-1 border-t border-white/[0.04] pt-3">
                      {project.features.slice(0, 2).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-400">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(project.tags || []).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Signature Stamp & Action Buttons */}
              <div className="px-6 pb-5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                
                {/* Phantom Signature Stamp */}
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
                  <PhantomIcon className="w-3.5 h-3.5" />
                  <span className="font-semibold text-slate-300">Engineered by The Phantom</span>
                </div>

                {/* Action Link */}
                <div className="flex items-center gap-2">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-medium text-cyan-400 hover:text-cyan-300"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-medium text-slate-300 hover:text-white"
                    >
                      <span>Repository</span>
                      <Github className="w-3 h-3" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
