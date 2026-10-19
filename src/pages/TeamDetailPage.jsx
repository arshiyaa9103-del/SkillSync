import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { databaseService } from '../services/databaseService';
import Avatar from '../components/common/Avatar';
import StatusBadge from '../components/common/StatusBadge';
import ProgressBar from '../components/common/ProgressBar';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import {
  Users,
  Trophy,
  Shield,
  Layers,
  UserPlus,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  LayoutGrid,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

const TeamDetailPage = () => {
  const { id } = useParams();
  const { team: activeTeamNova, dbTeams } = useApp();
  const navigate = useNavigate();

  const [customTeam, setCustomTeam] = useState(null);
  const [loading, setLoading] = useState(false);

  const isTeamNova = !id || id === 'team-nova' || id === activeTeamNova.id;

  useEffect(() => {
    if (!isTeamNova && id) {
      // Look up in dbTeams or databaseService
      const foundInContext = dbTeams.find((t) => t.id === id);
      if (foundInContext) {
        setCustomTeam(foundInContext);
      } else {
        setLoading(true);
        databaseService.getTeamById(id).then((res) => {
          if (res.data) {
            setCustomTeam(res.data);
          }
          setLoading(false);
        });
      }
    }
  }, [id, isTeamNova, dbTeams]);

  // If loading
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-sm text-[#64748B]">
        Loading team details...
      </div>
    );
  }

  // If custom team is not found
  if (!isTeamNova && !customTeam) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          icon={Layers}
          title="Team Not Found"
          description="The requested team does not exist or has been removed."
          actionText="View All Teams"
          onAction={() => navigate('/teams')}
        />
      </div>
    );
  }

  // Display Team Nova
  if (isTeamNova) {
    const team = activeTeamNova;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
          <Link to="/teams" className="hover:text-[#2563EB]">Teams</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0F172A]">{team.name}</span>
        </nav>

        {/* Team Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
                TN
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                    {team.name}
                  </h1>
                  <StatusBadge status={team.status} />
                </div>
                <p className="text-sm font-semibold text-[#2563EB] flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-[#2563EB]" />
                  {team.hackathonName}
                </p>
                <p className="text-xs text-[#64748B]">
                  Team Lead: <strong className="text-[#0F172A]">{team.teamLead}</strong> · Target: <strong>{team.targetMembers} Members</strong> (Min {team.minMembers})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/find-teammates">
                <Button variant="primary" size="md" icon={UserPlus} className="shadow-md">
                  Find Teammates
                </Button>
              </Link>
              <Link to={`/hackathons/${team.hackathonId || 'technova-2026'}`}>
                <Button variant="outline" size="md">
                  View Hackathon
                </Button>
              </Link>
            </div>
          </div>

          {/* Top Summary Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                Active Roster
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#0F172A]">
                  {team.members.length} / {team.targetMembers}
                </span>
                <span className="text-xs text-[#64748B]">Members</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
                Skill Coverage
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#2563EB]">
                  {team.overallCoverage}%
                </span>
                <span className="text-xs text-blue-700 font-semibold">
                  {team.overallCoverage >= 85 ? 'Strong Balance' : 'Needs Gaps Filled'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-1">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                Open Positions
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-amber-900">
                  {team.openPositions.length}
                </span>
                <span className="text-xs text-amber-700 font-semibold">
                  {team.openPositions.length === 0 ? 'Full Team' : 'Critical Gaps'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Roster & Open Positions (7 Cols) and Skill Map (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Members & Open Positions */}
          <div className="lg:col-span-7 space-y-8">
            {/* Active Members Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#2563EB]" />
                  Team Members ({team.members.length})
                </h2>
                <span className="text-xs font-semibold text-[#16A34A] bg-[#F0FDF4] px-2.5 py-1 rounded-full border border-green-200">
                  {team.members.length >= 3 ? '✓ Minimum Size Met' : 'Needs Min 3'}
                </span>
              </div>

              <div className="space-y-3">
                {team.members.map((member, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar name={member.name} initials={member.avatar} size="md" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-[#0F172A]">
                            {member.name}
                          </h3>
                          {member.isLead && (
                            <span className="text-[10px] font-bold text-white bg-[#2563EB] px-2 py-0.5 rounded-full">
                              Team Lead
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-[#2563EB]">{member.role}</p>
                        <p className="text-[11px] text-[#64748B]">{member.department}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 sm:justify-end">
                      {member.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-[#475569]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Positions Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Open Positions ({team.openPositions.length})
                </h2>
                {team.openPositions.length > 0 && (
                  <Link to="/find-teammates">
                    <Button variant="primary" size="sm" icon={UserPlus}>
                      Find Teammates
                    </Button>
                  </Link>
                )}
              </div>

              {team.openPositions.length > 0 ? (
                <div className="space-y-3">
                  {team.openPositions.map((pos, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#0F172A]">{pos.role}</span>
                          <span className="text-[10px] font-bold text-[#DC2626] bg-red-100 px-2 py-0.5 rounded">
                            {pos.urgency}
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B] mt-0.5">{pos.reason}</p>
                      </div>

                      <Link to="/find-teammates">
                        <Button variant="outline" size="sm" className="bg-white whitespace-nowrap">
                          Match Candidates
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">All positions filled!</h4>
                  <p className="text-xs text-emerald-700">Team Nova is complete with 6/6 members and optimal skill coverage.</p>
                </div>
              )}
            </div>

            {/* Section 22: Team Composition Visual Diagram */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-[#2563EB]" />
                  Team Composition Layout
                </h2>
                <span className="text-xs text-[#64748B]">Functional role distribution</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block">FRONTEND</span>
                  <p className="text-sm font-bold text-[#0F172A] mt-1">Aarav Mehta</p>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-semibold">Filled</span>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block">BACKEND</span>
                  <p className="text-sm font-bold text-[#0F172A] mt-1">Riya Shah</p>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-semibold">Filled</span>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block">RESEARCH</span>
                  <p className="text-sm font-bold text-[#0F172A] mt-1">Kabir Joshi</p>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-semibold">Filled</span>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider block">PRODUCT</span>
                  <p className="text-sm font-bold text-[#0F172A] mt-1">Mehul Jain</p>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-semibold">Filled</span>
                </div>

                {/* Data Science Role slot */}
                {team.members.some((m) => m.role.includes('Data') || m.name.includes('Neha')) ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">DATA SCIENCE</span>
                    <p className="text-sm font-bold text-[#0F172A] mt-1">
                      {team.members.find((m) => m.role.includes('Data') || m.name.includes('Neha'))?.name}
                    </p>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-semibold">✓ Covered</span>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-dashed border-amber-300">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">DATA SCIENCE</span>
                    <p className="text-sm font-bold text-amber-700 mt-1">OPEN POSITION</p>
                    <Link to="/find-teammates" className="text-[10px] text-[#2563EB] font-bold hover:underline block mt-0.5">
                      + Invite Neha
                    </Link>
                  </div>
                )}

                {/* UI/UX Role slot */}
                {team.members.some((m) => m.role.includes('UI/UX') || m.name.includes('Rohan')) ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">UI/UX</span>
                    <p className="text-sm font-bold text-[#0F172A] mt-1">
                      {team.members.find((m) => m.role.includes('UI/UX') || m.name.includes('Rohan'))?.name}
                    </p>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-semibold">✓ Covered</span>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-dashed border-amber-300">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">UI/UX DESIGN</span>
                    <p className="text-sm font-bold text-amber-700 mt-1">OPEN POSITION</p>
                    <Link to="/find-teammates" className="text-[10px] text-[#2563EB] font-bold hover:underline block mt-0.5">
                      + Invite Rohan
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Section 21: TEAM SKILL MAP */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-[#0F172A]">
                  Team Skill Map
                </h2>
                <p className="text-xs text-[#64748B]">
                  Balanced distribution of capabilities
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#64748B] block">Overall</span>
                <span className="text-2xl font-black text-[#2563EB]">
                  {team.overallCoverage}%
                </span>
              </div>
            </div>

            {/* Clean Horizontal Bars */}
            <div className="space-y-4">
              {team.skillMap.map((skill, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#0F172A]">{skill.name}</span>
                    <span
                      className={`font-black ${
                        skill.coverage >= 80
                          ? 'text-[#16A34A]'
                          : skill.coverage >= 50
                          ? 'text-[#0891B2]'
                          : 'text-[#EF4444]'
                      }`}
                    >
                      {skill.coverage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/40 p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        skill.coverage >= 80
                          ? 'bg-[#16A34A]'
                          : skill.coverage >= 50
                          ? 'bg-[#06B6D4]'
                          : 'bg-[#EF4444]'
                      }`}
                      style={{ width: `${skill.coverage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* "Your biggest opportunities" Callout */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 space-y-3">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
                Your biggest opportunities
              </span>
              {team.criticalGaps.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs text-[#334155] leading-relaxed">
                    Filling the <strong>{team.criticalGaps.join(' and ')}</strong> positions will increase Team Nova's total readiness to <strong>86%+</strong> and unlock full hackathon eligibility.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {team.criticalGaps.map((gap, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-white border border-amber-300 text-amber-800 text-xs font-bold"
                      >
                        ⚠ {gap}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                  Outstanding! All core positions and skill verticals are covered. Your team is fully primed for high execution.
                </p>
              )}

              <div className="pt-2">
                <Link to="/find-teammates" className="block">
                  <Button variant="primary" size="md" className="w-full" icon={UserPlus}>
                    Find Teammates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Display Custom / Newly Created Team
  const team = customTeam;
  const members = team.members || [];
  const requiredRoles = team.required_roles || [];
  const requiredSkills = team.required_skills || [];
  const coverage = team.overall_coverage || 60;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
        <Link to="/teams" className="hover:text-[#2563EB]">Teams</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#0F172A]">{team.name}</span>
      </nav>

      {/* Team Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
              {team.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase()}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                  {team.name}
                </h1>
                <StatusBadge status={team.status || 'Building'} />
              </div>
              <p className="text-sm font-semibold text-[#2563EB] flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-[#2563EB]" />
                {team.hackathon_name || 'Hackathon Challenge'}
              </p>
              <p className="text-xs text-[#64748B]">
                Team Leader: <strong className="text-[#0F172A]">{team.leader_name}</strong> · Target: <strong>{team.max_team_size || 6} Members</strong> (Min {team.min_team_size || 3})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/find-teammates">
              <Button variant="primary" size="md" icon={UserPlus} className="shadow-md">
                Find Teammates
              </Button>
            </Link>
            {team.hackathon_id && (
              <Link to={`/hackathons/${team.hackathon_id}`}>
                <Button variant="outline" size="md">
                  View Hackathon
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Top Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
              Active Roster
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#0F172A]">
                {members.length} / {team.max_team_size || 6}
              </span>
              <span className="text-xs text-[#64748B]">Members</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1">
            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
              Estimated Readiness
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#2563EB]">
                {coverage}%
              </span>
              <span className="text-xs text-blue-700 font-semibold">
                Building Team
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-1">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
              Desired Roles
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-900">
                {requiredRoles.length}
              </span>
              <span className="text-xs text-amber-700 font-semibold">
                Open
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Members & Roles (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Members */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2563EB]" />
                Team Members ({members.length})
              </h2>
            </div>

            <div className="space-y-3">
              {members.map((m, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={m.name} initials={m.avatar || 'M'} size="md" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#0F172A]">{m.name}</h3>
                        {m.is_lead && (
                          <span className="text-[10px] font-bold text-white bg-[#2563EB] px-2 py-0.5 rounded-full">
                            Team Lead
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#2563EB] font-semibold">{m.role || 'Member'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Roles Required */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Open Positions Needed ({requiredRoles.length})
              </h2>
            </div>

            <div className="space-y-3">
              {requiredRoles.map((role, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-sm font-bold text-[#0F172A]">{role}</span>
                    <p className="text-xs text-[#64748B]">Required role to complete team composition</p>
                  </div>
                  <Link to="/find-teammates">
                    <Button variant="outline" size="sm" className="bg-white">
                      Match Candidates
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Team Description & Stack (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#0F172A] pb-2 border-b border-slate-100">
              About Project
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              {team.description}
            </p>

            {requiredSkills.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-2">
                  Target Tech Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {requiredSkills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#2563EB] text-xs font-semibold border border-blue-100"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailPage;
