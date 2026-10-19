import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import MatchCard from '../components/cards/MatchCard';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import {
  Search,
  Filter,
  Users,
  Sparkles,
  ArrowUpDown,
  X,
  AlertTriangle,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

const FindTeammatesPage = () => {
  const { team, candidates } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [sortBy, setSortBy] = useState('match'); // 'match' | 'experience' | 'recent'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique roles and skills
  const availableRoles = useMemo(() => {
    const set = new Set();
    candidates.forEach((c) => set.add(c.role));
    return ['All', ...Array.from(set)];
  }, [candidates]);

  const availableSkills = useMemo(() => {
    const set = new Set();
    candidates.forEach((c) => c.skills.forEach((s) => set.add(s)));
    return ['All', ...Array.from(set)];
  }, [candidates]);

  const availableYears = ['All', 'Year 2', 'Year 3', 'Year 4'];

  // Filter & sort candidates
  const filteredCandidates = useMemo(() => {
    return candidates
      .filter((cand) => {
        // Role filter
        if (selectedRole !== 'All' && cand.role !== selectedRole) {
          return false;
        }

        // Skill filter
        if (selectedSkill !== 'All' && !cand.skills.includes(selectedSkill)) {
          return false;
        }

        // Year filter
        if (selectedYear !== 'All' && cand.year !== selectedYear) {
          return false;
        }

        // Availability filter
        if (selectedAvailability !== 'All' && cand.availability !== selectedAvailability) {
          return false;
        }

        // Search Query (name, role, skills, department)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = cand.name.toLowerCase().includes(q);
          const matchRole = cand.role.toLowerCase().includes(q);
          const matchSkills = cand.skills.some((s) => s.toLowerCase().includes(q));
          const matchDept = cand.department.toLowerCase().includes(q);
          if (!matchName && !matchRole && !matchSkills && !matchDept) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'match') {
          return b.matchPercentage - a.matchPercentage;
        }
        if (sortBy === 'experience') {
          return (b.experience.hackathons + b.experience.projects) - (a.experience.hackathons + a.experience.projects);
        }
        return b.id.localeCompare(a.id);
      });
  }, [candidates, selectedRole, selectedSkill, selectedYear, selectedAvailability, searchQuery, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRole('All');
    setSelectedSkill('All');
    setSelectedYear('All');
    setSelectedAvailability('All');
    setSortBy('match');
  };

  const hasActiveFilters = searchQuery !== '' || selectedRole !== 'All' || selectedSkill !== 'All' || selectedYear !== 'All' || selectedAvailability !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Find people who complete your team.
        </h1>
        <p className="text-sm text-[#64748B] mt-1">
          Search by skill, role, experience or availability to close your open gaps.
        </p>
      </div>

      {/* TOP STATUS BANNER (Requirements 16) */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-2xl p-5 sm:p-6 text-white shadow-lg space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          {/* Col 1: Current Team */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block">
              Current Team
            </span>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">{team.name}</h2>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium">
                {team.members.length} / {team.targetMembers} Members
              </span>
            </div>
            <p className="text-xs text-blue-200 truncate">{team.hackathonName}</p>
          </div>

          {/* Col 2: Current Skill Gaps */}
          <div className="space-y-1 sm:border-x sm:border-blue-700/60 sm:px-6">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
              Current Skill Gaps
            </span>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {team.criticalGaps.length > 0 ? (
                team.criticalGaps.map((gap, i) => (
                  <span
                    key={i}
                    onClick={() => {
                      setSelectedRole(gap === 'Data Science' ? 'Data Scientist' : gap === 'UI/UX' ? 'UI/UX Designer' : 'All');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold bg-amber-400/20 text-amber-200 border border-amber-400/40 px-2.5 py-1 rounded-lg cursor-pointer hover:bg-amber-400/30 transition-colors"
                    title="Click to filter candidates for this gap"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    {gap}
                  </span>
                ))
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 px-2.5 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  All Core Gaps Filled!
                </span>
              )}
            </div>
          </div>

          {/* Col 3: Team Coverage */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-cyan-300 uppercase tracking-wider">
                Team Coverage
              </span>
              <span className="text-lg font-black text-cyan-300">{team.overallCoverage}%</span>
            </div>
            <div className="w-full bg-blue-950/60 rounded-full h-3 overflow-hidden p-0.5 border border-blue-600/40">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${team.overallCoverage}%` }}
              />
            </div>
            <p className="text-[11px] text-blue-200">
              {team.eligibilityStatus.statusText}
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4">
        {/* Main Search Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search people, skills or roles (e.g. Neha, Python, UI/UX, Data Science)..."
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-[#475569] bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="font-semibold text-slate-600">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-[#0F172A] focus:outline-none cursor-pointer"
              >
                <option value="match">Best Match</option>
                <option value="experience">Most Experienced</option>
                <option value="recent">Recently Active</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="sm:hidden p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[#475569]"
              aria-label="Filter"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop Filter Row / Mobile Collapsible Panel */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 ${mobileFilterOpen ? 'block' : 'hidden sm:grid'}`}>
          {/* Role Filter */}
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
              Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full text-xs py-2 px-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              {availableRoles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* Skill Filter */}
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
              Key Skill
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full text-xs py-2 px-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              {availableSkills.map((skill) => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
              Academic Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full text-xs py-2 px-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
              Availability
            </label>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full text-xs py-2 px-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="All">All</option>
              <option value="Available">Available Now</option>
              <option value="Busy">Busy</option>
            </select>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 text-xs text-[#64748B] border-t border-slate-100">
            <span>
              Showing {filteredCandidates.length} candidate{filteredCandidates.length === 1 ? '' : 's'}
            </span>
            <button
              onClick={clearFilters}
              className="text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Candidates Grid */}
      {filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((cand) => (
            <MatchCard key={cand.id} candidate={cand} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="No teammates match your filters"
          description="We couldn't find any candidate profiles matching this specific combination of role, skill, and availability. Try broadening your criteria."
          actionText="Clear All Filters"
          onAction={clearFilters}
        />
      )}
    </div>
  );
};

export default FindTeammatesPage;
