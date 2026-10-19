import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import ProgressBar from '../components/common/ProgressBar';
import Avatar from '../components/common/Avatar';
import EmptyState from '../components/common/EmptyState';
import {
  Layers,
  Users,
  Trophy,
  Search,
  Plus,
  ArrowRight,
  Filter,
  CheckCircle2,
  Sparkles,
  Shield
} from 'lucide-react';

const TeamsPage = () => {
  const { team, dbTeams, currentUser, authState, openCreateTeamModal } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const filterParam = searchParams.get('filter');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(filterParam === 'my-teams' ? 'my-teams' : 'all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Build combined list of teams
  // 1. Team Nova is the base demo team
  const baseTeamNova = {
    id: team.id || 'team-nova',
    name: team.name || 'Team Nova',
    description: team.description || 'Building a comprehensive AI & Web solution for TechNova Challenge.',
    hackathon_id: team.hackathonId || 'technova-2026',
    hackathon_name: team.hackathonName || 'TechNova Challenge 2026',
    leader_name: team.teamLead || 'Aarav Mehta',
    leader_id: 'aarav-demo',
    min_team_size: team.minMembers || 3,
    max_team_size: team.targetMembers || 6,
    member_count: team.members.length,
    members: team.members,
    overall_coverage: team.overallCoverage,
    status: team.status || 'Building',
    required_roles: team.openPositions ? team.openPositions.map((p) => p.role) : ['Data Scientist', 'UI/UX Designer'],
    required_skills: ['Python', 'Pandas', 'Figma', 'UI/UX']
  };

  // Combine dbTeams (excluding duplicate id if team-nova is already in db)
  const otherTeams = dbTeams.filter((t) => t.id !== baseTeamNova.id);
  const allTeams = [baseTeamNova, ...otherTeams];

  // Filtering
  const filteredTeams = allTeams.filter((t) => {
    // Search query
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      t.name.toLowerCase().includes(query) ||
      (t.hackathon_name || '').toLowerCase().includes(query) ||
      (t.required_roles || []).some((r) => r.toLowerCase().includes(query)) ||
      (t.required_skills || []).some((s) => s.toLowerCase().includes(query));

    // Tab filter
    let matchesTab = true;
    if (activeTab === 'my-teams') {
      const isLead =
        t.leader_id === authState.userId ||
        t.leader_name?.toLowerCase() === currentUser.name?.toLowerCase() ||
        t.id === 'team-nova';
      const isMember = (t.members || []).some(
        (m) =>
          m.user_id === authState.userId ||
          m.name?.toLowerCase() === currentUser.name?.toLowerCase()
      );
      matchesTab = isLead || isMember;
    }

    // Status filter
    let matchesStatus = true;
    if (statusFilter !== 'all') {
      matchesStatus = t.status.toLowerCase() === statusFilter.toLowerCase();
    }

    return matchesQuery && matchesTab && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Hackathon Team Directory</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Hackathon Teams
          </h1>
          <p className="text-sm text-[#475569] mt-1">
            Browse registered teams, discover open roles, or assemble your own hackathon squad.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/create-team">
            <Button variant="primary" size="md" icon={Plus} className="shadow-md">
              Create Team
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search teams by name, hackathon, role, or skill..."
              className="w-full text-sm rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          {/* Tab buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-[#2563EB] shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              All Teams ({allTeams.length})
            </button>
            <button
              onClick={() => setActiveTab('my-teams')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'my-teams'
                  ? 'bg-white text-[#2563EB] shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              My Teams
            </button>
          </div>

          {/* Status selector */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#64748B] shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs rounded-xl border border-slate-200 px-3 py-2 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="all">All Statuses</option>
              <option value="building">Building</option>
              <option value="ready">Ready</option>
            </select>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      {filteredTeams.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="No teams match your search"
          description="Try clearing your filters or create a new team to begin recruiting teammates."
          actionText="Create New Team"
          onAction={() => navigate('/create-team')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((t) => {
            const isBaseNova = t.id === 'team-nova';
            const memberCount = t.member_count || (t.members ? t.members.length : 1);
            const targetMembers = t.max_team_size || 6;
            const coverage = t.overall_coverage || 65;

            return (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-200 transition-all p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Top card bar */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] text-white flex items-center justify-center font-black text-sm shadow-xs">
                        {t.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .substring(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-[#0F172A] leading-tight">
                          {t.name}
                        </h2>
                        <p className="text-xs text-[#64748B] mt-0.5">
                          Lead: <strong className="text-[#0F172A]">{t.leader_name}</strong>
                        </p>
                      </div>
                    </div>

                    <StatusBadge status={t.status || 'Building'} />
                  </div>

                  {/* Hackathon badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-[#2563EB] text-xs font-semibold border border-blue-100/80">
                    <Trophy className="w-3.5 h-3.5" />
                    <span className="truncate">{t.hackathon_name}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>

                  {/* Skill Coverage bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#64748B]">Team Coverage</span>
                      <span className="font-bold text-[#2563EB]">{coverage}%</span>
                    </div>
                    <ProgressBar value={coverage} showValue={false} height="sm" />
                  </div>

                  {/* Open Positions / Required Roles */}
                  {t.required_roles && t.required_roles.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
                        Open Roles ({t.required_roles.length}):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {t.required_roles.slice(0, 3).map((role, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200"
                          >
                            {role}
                          </span>
                        ))}
                        {t.required_roles.length > 3 && (
                          <span className="text-[11px] text-[#64748B] self-center">
                            +{t.required_roles.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer and Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="text-xs text-[#64748B] flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>
                      <strong className="text-[#0F172A]">{memberCount}</strong> / {targetMembers} Members
                    </span>
                  </div>

                  <Link to={`/teams/${t.id}`}>
                    <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
