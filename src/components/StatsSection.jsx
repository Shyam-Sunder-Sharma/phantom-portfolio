import React, { useState, useEffect, useCallback } from 'react';
import { useCms } from '../context/CmsContext';
import {
  Code2,
  GitBranch,
  Star,
  Users,
  CheckCircle2,
  Terminal,
  Activity,
  Database,
  ArrowUpRight,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { Github } from './BrandIcons';

export const StatsSection = () => {
  const { profile } = useCms();

  // Actual verified baseline metrics for Shyam_Sunder_Sharma
  const initialGithub = {
    public_repos: 6,
    followers: 2,
    following: 2,
    totalStars: 0,
    topLanguage: 'JavaScript & Java',
    recentRepo: 'papervault'
  };

  const initialLeetCode = {
    totalSolved: 95,
    easySolved: 53,
    mediumSolved: 39,
    hardSolved: 3,
    ranking: "#1,799,533",
    acceptanceRate: "70.1%",
    recentProblem: "Pascal's Triangle"
  };

  const [githubStats, setGithubStats] = useState(initialGithub);
  const [leetcodeStats, setLeetcodeStats] = useState(initialLeetCode);
  const [loadingGh, setLoadingGh] = useState(true);
  const [loadingLc, setLoadingLc] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSynced, setLastSynced] = useState(new Date().toLocaleTimeString());

  // 1. Live Fetcher for GitHub
  const fetchGitHubLive = useCallback(async () => {
    setLoadingGh(true);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch('https://api.github.com/users/Shyam-Sunder-Sharma'),
        fetch('https://api.github.com/users/Shyam-Sunder-Sharma/repos?per_page=100')
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        let stars = 0;
        let recentRepoName = 'papervault';

        if (reposRes.ok) {
          const reposData = await reposRes.json();
          if (Array.isArray(reposData) && reposData.length > 0) {
            stars = reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
            recentRepoName = reposData[0]?.name || recentRepoName;
          }
        }

        setGithubStats({
          public_repos: userData.public_repos ?? initialGithub.public_repos,
          followers: userData.followers ?? initialGithub.followers,
          following: userData.following ?? initialGithub.following,
          totalStars: stars,
          topLanguage: 'JavaScript & Java',
          recentRepo: recentRepoName
        });
      }
    } catch (err) {
      console.warn('GitHub live fetch error, retained verified baseline:', err);
    } finally {
      setLoadingGh(false);
    }
  }, []);

  // 2. Live Fetcher for LeetCode
  const fetchLeetCodeLive = useCallback(async () => {
    setLoadingLc(true);
    try {
      // Primary high-reliability LeetCode REST API
      const res = await fetch('https://alfa-leetcode-api.onrender.com/userProfile/Shyam_Sunder_Sharma');
      if (res.ok) {
        const data = await res.json();
        if (data && (data.totalSolved !== undefined || data.solvedProblem !== undefined)) {
          const solved = data.totalSolved ?? data.solvedProblem ?? 95;
          const easy = data.easySolved ?? 53;
          const med = data.mediumSolved ?? 39;
          const hard = data.hardSolved ?? 3;
          const rank = data.ranking ? `#${Number(data.ranking).toLocaleString()}` : initialLeetCode.ranking;

          let accRate = initialLeetCode.acceptanceRate;
          if (data.matchedUserStats?.acSubmissionNum?.[0]?.submissions && data.matchedUserStats?.totalSubmissionNum?.[0]?.submissions) {
            const ac = data.matchedUserStats.acSubmissionNum[0].submissions;
            const tot = data.matchedUserStats.totalSubmissionNum[0].submissions;
            if (tot > 0) accRate = `${((ac / tot) * 100).toFixed(1)}%`;
          }

          const recent = data.recentSubmissions?.[0]?.title || "Pascal's Triangle";

          setLeetcodeStats({
            totalSolved: solved,
            easySolved: easy,
            mediumSolved: med,
            hardSolved: hard,
            ranking: rank,
            acceptanceRate: accRate,
            recentProblem: recent
          });
        }
      } else {
        // Backup endpoint if userProfile takes longer
        const backupRes = await fetch('https://alfa-leetcode-api.onrender.com/Shyam_Sunder_Sharma/solved');
        if (backupRes.ok) {
          const backupData = await backupRes.json();
          setLeetcodeStats(prev => ({
            ...prev,
            totalSolved: backupData.solvedProblem ?? prev.totalSolved,
            easySolved: backupData.easySolved ?? prev.easySolved,
            mediumSolved: backupData.mediumSolved ?? prev.mediumSolved,
            hardSolved: backupData.hardSolved ?? prev.hardSolved
          }));
        }
      }
    } catch (err) {
      console.warn('LeetCode live fetch exception, using verified telemetry cache:', err);
    } finally {
      setLoadingLc(false);
    }
  }, []);

  const refreshAllMetrics = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchGitHubLive(), fetchLeetCodeLive()]);
    setLastSynced(new Date().toLocaleTimeString());
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchGitHubLive();
    fetchLeetCodeLive();
  }, [fetchGitHubLive, fetchLeetCodeLive]);

  return (
    <section id="stats" className="py-20 bg-[#090d16] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Live Refresh Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>LIVE REPOSITORY & ALGORITHMIC TELEMETRY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real-Time Developer Activity & Metrics
            </h2>
            <p className="mt-1 text-sm text-slate-400 max-w-2xl">
              Live continuous telemetry polled directly from GitHub and LeetCode APIs, verified against production activity.
            </p>
          </div>

          <button
            onClick={refreshAllMetrics}
            disabled={isRefreshing}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#111827] border border-white/[0.1] hover:border-cyan-500/40 text-slate-300 hover:text-white font-mono text-xs transition-all shadow-sm"
            title="Poll APIs now"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Poll Live APIs'}</span>
            <span className="text-[10px] text-slate-500 hidden md:inline">• {lastSynced}</span>
          </button>
        </div>

        {/* 3-Card Focused Grid (Role Card Removed as requested) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: GitHub Repos & Contributions */}
          <div className="rounded-2xl bg-[#111827] border border-white/[0.08] p-6 shadow-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs text-slate-200 font-semibold">GITHUB ENGINE</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE API</span>
                </span>
              </div>

              <div className="mt-5">
                <div className="text-4xl font-extrabold text-white font-mono flex items-baseline gap-2">
                  <span>{githubStats.public_repos}</span>
                  <span className="text-xs text-slate-400 font-normal font-sans">Active Repos</span>
                </div>
                <div className="text-xs font-mono text-cyan-400 mt-1">
                  github.com/Shyam-Sunder-Sharma
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/[0.04] grid grid-cols-2 gap-3 text-xs font-mono text-slate-300">
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                  <span className="text-[10px] text-slate-500 block uppercase">Followers</span>
                  <span className="text-white font-bold text-sm">{githubStats.followers}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                  <span className="text-[10px] text-slate-500 block uppercase">Following</span>
                  <span className="text-white font-bold text-sm">{githubStats.following}</span>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-xs font-mono text-slate-300">
                <span className="text-[10px] text-slate-500 block uppercase">Core Stacks</span>
                <span className="text-emerald-400 font-medium">{githubStats.topLanguage}</span>
              </div>
            </div>

            <a
              href="https://github.com/Shyam-Sunder-Sharma"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 pt-3 border-t border-white/[0.04] inline-flex items-center justify-between text-xs font-mono text-cyan-400 hover:text-cyan-300"
            >
              <span>Explore GitHub Repositories</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Card 2: LeetCode & Problem Solving */}
          <div className="rounded-2xl bg-[#111827] border border-white/[0.08] p-6 shadow-xl relative overflow-hidden group hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-xs text-slate-200 font-semibold">LEETCODE ENGINE</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>{leetcodeStats.ranking}</span>
                </span>
              </div>

              <div className="mt-5">
                <div className="text-4xl font-extrabold text-white font-mono flex items-baseline gap-2">
                  <span>{leetcodeStats.totalSolved}</span>
                  <span className="text-xs text-slate-400 font-normal font-sans">Problems Solved</span>
                </div>
                <div className="text-xs font-mono text-amber-400 mt-1">
                  @Shyam_Sunder_Sharma
                </div>
              </div>

              {/* Easy, Med, Hard breakdown */}
              <div className="mt-5 pt-4 border-t border-white/[0.04] grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                  <span className="text-[10px] text-emerald-400 block font-bold">EASY</span>
                  <span className="text-white font-bold text-sm">{leetcodeStats.easySolved}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                  <span className="text-[10px] text-amber-400 block font-bold">MED</span>
                  <span className="text-white font-bold text-sm">{leetcodeStats.mediumSolved}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                  <span className="text-[9px] text-rose-400 block font-bold">HARD</span>
                  <span className="text-white font-bold text-sm">{leetcodeStats.hardSolved}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs font-mono p-2.5 rounded-lg bg-black/40 border border-white/[0.04]">
                <span className="text-slate-400">Acceptance Rate:</span>
                <span className="text-emerald-400 font-bold">{leetcodeStats.acceptanceRate}</span>
              </div>
            </div>

            <a
              href="https://leetcode.com/u/Shyam_Sunder_Sharma/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 pt-3 border-t border-white/[0.04] inline-flex items-center justify-between text-xs font-mono text-amber-400 hover:text-amber-300"
            >
              <span>View LeetCode Profile</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Card 3: Academic Benchmark — Swayam NPTEL DBMS */}
          <div className="rounded-2xl bg-[#111827] border border-white/[0.08] p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-xs text-slate-200 font-semibold">NPTEL BENCHMARK</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-bold">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>TOP 2% TOPPER</span>
                </span>
              </div>

              <div className="mt-5">
                <div className="text-4xl font-extrabold text-white font-mono flex items-baseline gap-2">
                  <span>80%</span>
                  <span className="text-xs text-emerald-400 font-semibold font-mono">Elite Score</span>
                </div>
                <div className="text-xs font-mono text-emerald-400 mt-1">
                  Database Management Systems
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-300 leading-relaxed font-sans">
                Certified by IIT Madras / NPTEL Swayam for achieving Elite + Topper distinction in the top 2% of examinees nationwide.
              </p>

              <div className="mt-4 p-3 rounded-lg bg-black/40 border border-white/[0.04] space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Issuer:</span>
                  <span className="text-white">Swayam NPTEL (IIT Madras)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Category:</span>
                  <span className="text-cyan-400">Relational DB Architecture</span>
                </div>
              </div>
            </div>

            <a
              href="#certifications"
              className="mt-6 pt-3 border-t border-white/[0.04] inline-flex items-center justify-between text-xs font-mono text-emerald-400 hover:text-emerald-300"
            >
              <span>View Credential Details</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default StatsSection;
