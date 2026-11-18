import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import {
  Award,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Cloud,
  Code2,
  Lock
} from 'lucide-react';

export const CertificationsSection = () => {
  const { certifications } = useCms();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Development', 'AI & Cloud', 'Cybersecurity'];

  const filteredCerts = (certifications || []).filter(c => {
    if (selectedCategory === 'All') return true;
    return c.category === selectedCategory;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'AI & Cloud':
        return <Cloud className="w-4 h-4 text-cyan-400" />;
      case 'Cybersecurity':
        return <Lock className="w-4 h-4 text-emerald-400" />;
      case 'Development':
      default:
        return <Code2 className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <section id="certifications" className="py-20 bg-[#090d16] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>ACCREDITED EXCELLENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Certifications & Industry Credentials Vault
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Verified certifications from IIT Madras/NPTEL, IBM, and global technology simulations demonstrating competence across system domains.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#111827] border border-white/[0.08] overflow-x-auto self-start md:self-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => {
            const isTopTopper = cert.badge?.includes('Top 2%') || cert.badge?.includes('Topper');

            return (
              <div
                key={cert.id}
                className={`rounded-2xl bg-[#111827] border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isTopTopper
                    ? 'border-emerald-500/50 shadow-lg shadow-emerald-950/20 hover:border-emerald-400'
                    : 'border-white/[0.08] hover:border-cyan-500/40 shadow-md'
                }`}
              >
                <div>
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                      {getCategoryIcon(cert.category)}
                      <span>{cert.category}</span>
                    </span>

                    {cert.badge && (
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 ${
                        isTopTopper
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {isTopTopper && <Sparkles className="w-3 h-3 text-emerald-400" />}
                        <span>{cert.badge}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="font-mono text-xs text-cyan-400 font-medium mt-1">
                    Issuer: {cert.issuer} {cert.issueDate ? `• ${cert.issueDate}` : ''}
                  </div>

                  {/* Description */}
                  {cert.description && (
                    <p className="mt-3 text-xs text-slate-300 leading-relaxed font-sans">
                      {cert.description}
                    </p>
                  )}
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verified Credential</span>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-medium text-cyan-400 hover:text-cyan-300"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
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

export default CertificationsSection;
