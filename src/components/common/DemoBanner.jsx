import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, RotateCcw, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const DemoBanner = () => {
  const { team, resetDemoData } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const isNehaAdded = team.members.some((m) => m.name.includes('Neha'));
  const isRohanAdded = team.members.some((m) => m.name.includes('Rohan'));

  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white text-xs py-2 px-4 border-b border-blue-700/50 shadow-xs relative z-30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-[11px]">
            <Sparkles className="w-3 h-3 text-cyan-300" />
            LIVE DEMO MODE
          </span>
          <span className="hidden sm:inline text-blue-100">
            Team Nova: <strong className="text-white">{team.members.length}/{team.targetMembers} members</strong> ({team.overallCoverage}% Skill Coverage)
          </span>
          {isNehaAdded && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-200 text-[10px] font-semibold">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Neha Joined
            </span>
          )}
          {isRohanAdded && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-200 text-[10px] font-semibold">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Rohan Joined
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-cyan-200 hover:text-white inline-flex items-center gap-1 underline underline-offset-2 transition-colors cursor-pointer"
          >
            <span>{isExpanded ? 'Hide Presentation Flow' : 'View Recommended 5-Min Judge Demo Flow'}</span>
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <button
            onClick={resetDemoData}
            title="Reset data to initial demo state (4/6 members, 74% coverage)"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer border border-white/20"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="max-w-7xl mx-auto mt-2.5 pt-2.5 border-t border-blue-700/60 flex flex-wrap items-center gap-2 sm:gap-4 text-slate-200 text-[11px] animate-in fade-in duration-200">
          <span className="font-semibold text-cyan-300 uppercase tracking-wider text-[10px]">
            Recommended Pitch Sequence:
          </span>
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 bg-blue-700/80 rounded font-semibold text-white">1</span>
            <Link to="/" className="text-white hover:underline">Landing Hero</Link>
          </div>
          <ArrowRight className="w-3 h-3 text-blue-400" />
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 bg-blue-700/80 rounded font-semibold text-white">2</span>
            <Link to="/dashboard" className="text-white hover:underline">Dashboard (See 74% Coverage & Gaps)</Link>
          </div>
          <ArrowRight className="w-3 h-3 text-blue-400" />
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 bg-blue-700/80 rounded font-semibold text-white">3</span>
            <Link to="/find-teammates" className="text-white hover:underline">Find Teammates (View & Invite Neha)</Link>
          </div>
          <ArrowRight className="w-3 h-3 text-blue-400" />
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 bg-blue-700/80 rounded font-semibold text-white">4</span>
            <Link to="/invitations" className="text-white hover:underline">Invitations (Accept Neha)</Link>
          </div>
          <ArrowRight className="w-3 h-3 text-blue-400" />
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 bg-blue-700/80 rounded font-semibold text-white">5</span>
            <Link to="/teams/team-nova" className="text-white hover:underline">Team Nova (Watch Coverage Jump to 86%!)</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoBanner;
