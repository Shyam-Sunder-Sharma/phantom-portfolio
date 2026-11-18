import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import {
  Mail,
  Send,
  MapPin,
  Code2,
  Copy,
  Check,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { formatExternalUrl } from '../utils/urlHelper';

export const ContactSection = () => {
  const { profile, showToast } = useCms();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const contactEmail = profile?.contactEmail || "shyam.sunder.sharma.dev@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    showToast('Email address copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields.', 'warning');
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      showToast(`Message prepared! Opening direct dispatch to ${contactEmail}`);
      // Open mailto link with encoded subject and body
      const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(formData.subject || 'Inquiry for The Phantom')}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 bg-[#090d16] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>DISPATCH & COMMUNICATE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Initiate Contact with The Phantom
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
            Available for full-stack engineering roles, systems engineering internships, autonomous AI projects, and technical collaborations.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card with 1-click Copy */}
            <div className="rounded-2xl bg-[#111827] border border-white/[0.08] p-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                <span className="font-mono text-xs text-slate-400">PRIMARY CONTACT CHANNEL</span>
                <span className="font-mono text-[10px] text-emerald-400">FAST RESPONSE</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-mono text-slate-400">Direct Email Address</div>
                  <div className="text-sm font-mono text-white font-semibold truncate">
                    {contactEmail}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] font-mono text-xs text-slate-200 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Email'}</span>
                </button>
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Mail Direct</span>
                </a>
              </div>
            </div>

            {/* Location & Institution */}
            <div className="rounded-2xl bg-[#111827] border border-white/[0.08] p-6 shadow-xl space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{profile?.location || "Kanpur, Uttar Pradesh, India"}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 pt-2 border-t border-white/[0.04]">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>UPTTI Kanpur • B.Tech Computer Science (2024–2028)</span>
              </div>
            </div>

            {/* Social Channels List */}
            <div className="rounded-2xl bg-[#111827] border border-white/[0.08] p-6 shadow-xl">
              <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-4">
                Verified Developer Profiles
              </div>
              <div className="space-y-2 font-mono text-xs">
                {profile?.socials?.github && (
                  <a
                    href={formatExternalUrl(profile.socials.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-slate-300 hover:text-white hover:border-cyan-500/30 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-cyan-400" />
                      <span>github.com/Shyam-Sunder-Sharma</span>
                    </span>
                    <span className="text-[10px] text-slate-500">OPEN</span>
                  </a>
                )}
                {profile?.socials?.linkedin && (
                  <a
                    href={formatExternalUrl(profile.socials.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-slate-300 hover:text-white hover:border-cyan-500/30 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-sky-400" />
                      <span>linkedin.com/in/shyam-sunder-sharma-22488b371</span>
                    </span>
                    <span className="text-[10px] text-slate-500">OPEN</span>
                  </a>
                )}
                {profile?.socials?.leetcode && (
                  <a
                    href={formatExternalUrl(profile.socials.leetcode)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-slate-300 hover:text-white hover:border-cyan-500/30 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-amber-400" />
                      <span>leetcode.com/u/Shyam_Sunder_Sharma/</span>
                    </span>
                    <span className="text-[10px] text-slate-500">OPEN</span>
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#111827] border border-white/[0.08] p-6 sm:p-8 shadow-2xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Send Direct Message</h3>
                  <p className="text-xs font-mono text-cyan-400 mt-0.5">
                    Terminal Encrypted Transmission
                  </p>
                </div>
                <span className="font-mono text-[10px] px-2 py-1 rounded bg-black/40 text-slate-400 border border-white/[0.06]">
                  TLS 1.3
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Subject / Discussion Scope
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Full-Stack / Autonomous AI Collaboration"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Message Body *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your technical proposal, project scope, or opportunity..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d16] border border-white/[0.08] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase hover:opacity-95 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{sending ? 'Dispatching...' : 'Dispatch Message'}</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
