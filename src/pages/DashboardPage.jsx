import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/common/ProgressBar';
import Button from '../components/common/Button';
import Avatar from '../components/common/Avatar';
import StatusBadge from '../components/common/StatusBadge';
import MatchCard from '../components/cards/MatchCard';
import {
  Trophy,
  Users,
  TrendingUp,
  Inbox,
  AlertTriangle,
  ArrowRight,
  UserPlus,
  Sparkles,
  Layers,
  CheckCircle2,
  Calendar,
  ExternalLink
} from 'lucide-react';

const DashboardPage = () => {
  const {
    currentUser,
    team,
    candidates,
    invitations,
    dbTeams,
    setActiveProfileCandidate,
    setInviteModalCandidate
  } = useApp();

  const navigate = useNavigate();

  // Top 3 recommended candidates for the dashboard
  const topRecommendations = candidates.slice(0, 3);
  const pendingInvitesCount = invitations.sent.filter((i) => i.status === 'Pending').length + invitations.received.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Good afternoon, {currentUser.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Here's what needs your attention today.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link to="/find-teammates">
            <Button variant="primary" size="md" icon={UserPlus}>
              Find Teammates
            </Button>
          </Link>
          <Link to="/hackathons">
            <Button variant="outline" size="md" icon={Trophy}>
              Browse Hackathons
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Stat 1: Active Hackathons */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Active Hackathons
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0F172A]">2</span>
            <span className="text-xs font-semibold text-[#16A34A] bg-[#F0FDF4] px-1.5 py-0.5 rounded">
              Registered
            </span>
          </div>
        </div>

        {/* Stat 2: Team Members */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Team Members
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-[#0891B2] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0F172A]">
              {team.members.length} <span className="text-lg text-[#64748B] font-medium">/ {team.targetMembers}</span>
            </span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
              {team.targetMembers - team.members.length > 0 ? `${team.targetMembers - team.members.length} Open` : 'Full'}
            </span>
          </div>
        </div>

        {/* Stat 3: Skill Coverage */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Skill Coverage
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#16A34A] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#2563EB]">
              {team.overallCoverage}%
            </span>
            <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
              team.overallCoverage >= 85 ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-[#2563EB]'
            }`}>
              {team.overallCoverage >= 85 ? 'High Readiness' : 'Building'}
            </span>
          </div>
        </div>

        {/* Stat 4: Pending Invites */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Pending Invites
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0F172A]">
              {pendingInvitesCount}
            </span>
            <Link to="/invitations" className="text-xs font-semibold text-[#2563EB] hover:underline">
              View All
            </Link>
          </div>
        </div>
      </div>

      {/* Main Team Overview & Skill Gap Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: TEAM NOVA CARD (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] text-white flex items-center justify-center font-black text-sm shadow-xs">
                  TN
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#0F172A] tracking-tight">
                    {team.name}
                  </h2>
                  <p className="text-xs text-[#2563EB] font-semibold">
                    {team.hackathonName}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <StatusBadge status={team.status} />
              <span className="text-xs font-bold text-[#64748B] bg-slate-100 px-2.5 py-1 rounded-full">
                Members: {team.members.length} / {team.targetMembers}
              </span>
            </div>
          </div>

          {/* Team Progress Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#0F172A]">Overall Team Readiness</span>
              <span className="font-bold text-[#2563EB]">{team.overallCoverage}%</span>
            </div>
            <ProgressBar value={team.overallCoverage} showValue={false} height="lg" />
            <p className="text-[11px] text-[#64748B]">
              {team.eligibilityStatus.statusText} — target is 90%+ skill coverage with all core roles covered.
            </p>
          </div>

          {/* Active Members Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Current Roster ({team.members.length})
              </span>
              <span className="text-xs text-[#64748B]">Team Lead: {team.teamLead}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {team.members.map((member, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar name={member.name} initials={member.avatar} size="sm" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#0F172A] truncate">
                        {member.name} {member.isLead && <span className="text-[10px] text-blue-600 font-semibold">(Lead)</span>}
                      </p>
                      <p className="text-[11px] text-[#2563EB] truncate font-medium">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Link to="/teams/team-nova" className="w-full sm:w-auto flex-1">
              <Button variant="outline" size="md" className="w-full" icon={Layers}>
                Manage Team
              </Button>
            </Link>
            <Link to="/find-teammates" className="w-full sm:w-auto flex-1">
              <Button variant="primary" size="md" className="w-full" icon={UserPlus}>
                Find Teammates
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT: TEAM SKILL MAP & GAPS (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">
                Your team's skill map
              </h3>
              <p className="text-xs text-[#64748B]">
                Live balance of tech stack coverage
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                {team.overallCoverage}%
              </span>
            </div>
          </div>

          {/* Skill Map Horizontal Bars */}
          <div className="space-y-3.5">
            {team.skillMap.map((skill, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#0F172A]">{skill.name}</span>
                  <span className={`font-bold ${
                    skill.coverage >= 80 ? 'text-[#16A34A]' : skill.coverage >= 50 ? 'text-[#0891B2]' : 'text-[#EF4444]'
                  }`}>
                    {skill.coverage}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/40">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      skill.coverage >= 80 ? 'bg-[#16A34A]' : skill.coverage >= 50 ? 'bg-[#06B6D4]' : 'bg-[#EF4444]'
                    }`}
                    style={{ width: `${skill.coverage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Critical Gaps Banner */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                {team.criticalGaps.length} critical {team.criticalGaps.length === 1 ? 'gap' : 'gaps'} detected
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {team.criticalGaps.length > 0 ? (
                team.criticalGaps.map((gap, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white text-[#DC2626] border border-red-200 shadow-xs flex items-center gap-1"
                  >
                    ⚠ {gap}
                  </span>
                ))
              ) : (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  All critical team roles covered!
                </span>
              )}
            </div>

            <div className="pt-2">
              <Link to="/find-teammates">
                <Button variant="primary" size="sm" className="w-full bg-[#D97706] hover:bg-[#B45309]">
                  Find people for these gaps
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CREATED & MANAGED TEAMS (Persistent Database Records) */}
      {dbTeams.filter((t) => t.id !== 'team-nova').length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#2563EB]" />
                Your Additional Created Teams ({dbTeams.filter((t) => t.id !== 'team-nova').length})
              </h2>
              <p className="text-xs text-[#64748B]">
                Active teams saved in database storage
              </p>
            </div>
            <Link to="/create-team">
              <Button variant="outline" size="sm" icon={UserPlus}>
                Create Another Team
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dbTeams
              .filter((t) => t.id !== 'team-nova')
              .map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#0F172A]">{t.name}</h3>
                      <StatusBadge status={t.status || 'Building'} />
                    </div>
                    <p className="text-xs text-[#2563EB] font-medium flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5" />
                      {t.hackathon_name}
                    </p>
                    <p className="text-xs text-[#64748B] line-clamp-2">
                      {t.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-xs text-[#64748B]">
                      {t.member_count || (t.members ? t.members.length : 1)} / {t.max_team_size || 6} Members
                    </span>
                    <Link to={`/teams/${t.id}`}>
                      <Button variant="primary" size="sm">
                        View Team
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* RECOMMENDED TEAMMATES SECTION */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
              Recommended teammates
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              People who could strengthen Team Nova based on skill complementarity.
            </p>
          </div>

          <Link to="/find-teammates">
            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
              View All Candidates
            </Button>
          </Link>
        </div>

        {/* Candidate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRecommendations.map((cand) => (
            <MatchCard key={cand.id} candidate={cand} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
