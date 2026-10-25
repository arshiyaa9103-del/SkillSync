import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import HackathonCard from '../components/cards/HackathonCard';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { Search, Filter, Trophy, Calendar, Sparkles, X } from 'lucide-react';

const HackathonsPage = () => {
  const { hackathons, setIsCreateTeamOpen } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All'); // All | Open | Upcoming | Completed
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');

  // Extract all unique domains
  const allDomains = useMemo(() => {
    const set = new Set();
    hackathons.forEach((h) => h.domains.forEach((d) => set.add(d)));
    return ['All', ...Array.from(set)];
  }, [hackathons]);

  const filteredHackathons = useMemo(() => {
    return hackathons.filter((h) => {
      // Status tab filter
      if (activeTab !== 'All' && h.status.toLowerCase() !== activeTab.toLowerCase()) {
        return false;
      }

      // Domain filter
      if (selectedDomain !== 'All' && !h.domains.includes(selectedDomain)) {
        return false;
      }

      // Mode filter
      if (selectedMode !== 'All' && h.mode.toLowerCase() !== selectedMode.toLowerCase()) {
        return false;
      }

      // Search query (title, tagline, domains, location)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = h.title.toLowerCase().includes(query);
        const matchesTagline = h.tagline.toLowerCase().includes(query);
        const matchesDomain = h.domains.some((d) => d.toLowerCase().includes(query));
        const matchesMode = h.mode.toLowerCase().includes(query);
        if (!matchesTitle && !matchesTagline && !matchesDomain && !matchesMode) {
          return false;
        }
      }

      return true;
    });
  }, [hackathons, activeTab, selectedDomain, selectedMode, searchQuery]);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveTab('All');
    setSelectedDomain('All');
    setSelectedMode('All');
  };

  const hasActiveFilters = searchQuery !== '' || activeTab !== 'All' || selectedDomain !== 'All' || selectedMode !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Discover your next challenge.
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Find hackathons that match your interests, skills and ambitions.
          </p>
        </div>

        <Link to="/create-team">
          <Button
            variant="primary"
            size="md"
            icon={Sparkles}
            className="shadow-md"
          >
            Create New Team
          </Button>
        </Link>
      </div>

      {/* Search & Tabs Controls */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 overflow-x-auto">
          {['All', 'Open', 'Upcoming', 'Completed'].map((tab) => {
            const count = tab === 'All'
              ? hackathons.length
              : hackathons.filter((h) => h.status.toLowerCase() === tab.toLowerCase()).length;
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'text-[#475569] hover:bg-slate-100 hover:text-[#0F172A]'
                }`}
              >
                <span>{tab}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & Secondary Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Search input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hackathons, domains or technologies..."
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-slate-50/50"
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

          {/* Domain Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="All">All Domains</option>
              {allDomains.filter((d) => d !== 'All').map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          {/* Mode Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50/50 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="All">All Modes</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Online">Online</option>
              <option value="In-Person">In-Person</option>
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 text-xs text-[#64748B]">
            <span>Showing {filteredHackathons.length} result{filteredHackathons.length === 1 ? '' : 's'}</span>
            <button
              onClick={clearFilters}
              className="text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Hackathons Cards Grid */}
      {filteredHackathons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((h) => (
            <HackathonCard key={h.id} hackathon={h} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Trophy}
          title="No hackathons found"
          description="We couldn't find any challenges matching your search and filter criteria. Try adjusting your query or filters."
          actionText="Reset All Filters"
          onAction={clearFilters}
        />
      )}
    </div>
  );
};

export default HackathonsPage;
