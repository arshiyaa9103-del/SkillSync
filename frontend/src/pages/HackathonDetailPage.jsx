import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/common/StatusBadge';
import ProgressBar from '../components/common/ProgressBar';
import Button from '../components/common/Button';
import Avatar from '../components/common/Avatar';
import EmptyState from '../components/common/EmptyState';
import {
  Calendar,
  Users,
  Globe,
  Trophy,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
  Layers,
  Award,
  ChevronRight,
  UserPlus,
  Bookmark
} from 'lucide-react';

const HackathonDetailPage = () => {
  const { id } = useParams();
  const { hackathons, team, requireAuth, savedHackathons, toggleSaveHackathon } = useApp();
  const navigate = useNavigate();

  const hackathon = hackathons.find((h) => h.id === id) || hackathons[0];

  if (!hackathon) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          icon={Trophy}
          title="Hackathon Not Found"
          description="The requested challenge could not be located in our catalog."
          actionText="Browse All Hackathons"
          onAction={() => navigate('/hackathons')}
        />
      </div>
    );
  }

  const isCurrentTeamTarget = team.hackathonId === hackathon.id || team.hackathonName === hackathon.title;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
        <Link to="/hackathons" className="hover:text-[#2563EB]">
          Hackathons
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#0F172A]">{hackathon.title}</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3 flex-wrap">
              <StatusBadge status={hackathon.status} />
              <span className="text-xs font-semibold text-[#64748B] bg-slate-100 px-2.5 py-0.5 rounded-full">
                {hackathon.mode} Hackathon
              </span>
              <span className="text-xs font-bold text-[#16A34A] bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                Prize Pool: {hackathon.prizePool}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              {hackathon.title}
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              {hackathon.tagline}
            </p>

            {/* Quick Metadata Bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-[#475569]">
              <div className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-[#2563EB]" />
                <span><strong>Dates:</strong> {hackathon.dates}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Users className="w-4 h-4 text-[#06B6D4]" />
                <span><strong>Team Size:</strong> {hackathon.teamSize}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Globe className="w-4 h-4 text-[#16A34A]" />
                <span><strong>Location:</strong> {hackathon.location}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#F59E0B]" />
                <span><strong>Deadline:</strong> {hackathon.registrationDeadline}</span>
              </div>
            </div>

            {/* Domains */}
            <div className="flex flex-wrap gap-2 pt-2">
              {hackathon.domains.map((dom, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#2563EB] text-xs font-semibold border border-blue-100"
                >
                  {dom}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link to="/find-teammates">
              <Button variant="primary" size="lg" className="w-full shadow-md" icon={UserPlus}>
                Find Teammates
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full bg-blue-50/50 hover:bg-blue-50 text-[#2563EB] border-blue-200"
              icon={Layers}
              onClick={() => {
                const targetUrl = `/create-team?hackathon=${encodeURIComponent(hackathon.id)}`;
                if (requireAuth(() => navigate(targetUrl), `register a team for ${hackathon.title}`, targetUrl)) {
                  navigate(targetUrl);
                }
              }}
            >
              Register Team
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`w-full ${savedHackathons?.includes(hackathon.id) ? 'text-[#2563EB] bg-blue-50 border-blue-200' : 'text-[#64748B]'}`}
              icon={Bookmark}
              onClick={() => toggleSaveHackathon(hackathon.id)}
            >
              {savedHackathons?.includes(hackathon.id) ? 'Saved' : 'Save Hackathon'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content & Team Readiness Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Hackathon Detailed Sections (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section: Overview */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] pb-2 border-b border-slate-100">
              Overview
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed">
              {hackathon.overview}
            </p>
          </div>

          {/* Section: Problem Domains */}
          {hackathon.problemDomains && (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-[#0F172A] pb-2 border-b border-slate-100">
                Problem Domains & Challenge Tracks
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hackathon.problemDomains.map((domain, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <h3 className="text-sm font-bold text-[#0F172A]">{domain.title}</h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">{domain.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Prizes */}
          {hackathon.prizes && (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-[#0F172A] pb-2 border-b border-slate-100">
                Prizes & Awards (Total {hackathon.prizePool})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hackathon.prizes.map((prize, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-xs flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
                      <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">{prize.rank}</p>
                      <p className="text-lg font-black text-[#0F172A] text-emerald-600">{prize.amount}</p>
                      <p className="text-xs text-[#64748B] mt-0.5">{prize.perks}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Timeline */}
          {hackathon.timeline && (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-[#0F172A] pb-2 border-b border-slate-100">
                Event Schedule & Timeline
              </h2>
              <div className="relative pl-6 border-l-2 border-blue-200 space-y-6 my-2">
                {hackathon.timeline.map((item, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#2563EB] ring-4 ring-blue-50" />
                    <p className="text-xs font-bold text-[#2563EB]">{item.date}</p>
                    <p className="text-sm font-semibold text-[#0F172A] mt-0.5">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Eligibility & Rules */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#0F172A] pb-2 border-b border-slate-100">
              Eligibility & Guidelines
            </h2>
            <ul className="space-y-2 text-xs text-[#475569]">
              {hackathon.eligibility.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: TEAM READINESS & ELIGIBILITY (4 Cols) */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-200/80 shadow-md space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                  Eligibility Tracker
                </span>
                <h3 className="text-lg font-bold text-[#0F172A]">
                  Team Readiness
                </h3>
              </div>
              <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                {team.name}
              </span>
            </div>

            {/* Members & Coverage Stats */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-[#64748B] block">Members</span>
                <span className="text-xl font-black text-[#0F172A]">
                  {team.members.length} / {team.targetMembers}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                <span className="text-xs text-[#2563EB] block">Skill Coverage</span>
                <span className="text-xl font-black text-[#2563EB]">
                  {team.overallCoverage}%
                </span>
              </div>
            </div>

            {/* Coverage Progress Bar */}
            <div className="space-y-1.5">
              <ProgressBar value={team.overallCoverage} showValue={false} height="md" />
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#0F172A]">Readiness Status:</span>
                <span className={`font-bold ${team.members.length >= team.targetMembers ? 'text-[#16A34A]' : 'text-amber-700'}`}>
                  {team.eligibilityStatus.statusText}
                </span>
              </div>
            </div>

            {/* Requirements Checklist */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <p className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                Requirements Checklist:
              </p>
              <ul className="space-y-2 text-xs">
                {team.eligibilityStatus.checklist.map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2 p-2 rounded-lg ${
                      item.passed
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-100'
                        : 'bg-amber-50 text-amber-900 border border-amber-200'
                    }`}
                  >
                    {item.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <span className="font-medium leading-tight">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <Link to="/find-teammates" className="block">
                <Button variant="primary" size="lg" className="w-full" icon={UserPlus}>
                  Complete Team
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Roster Snippet */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#0F172A]">Roster ({team.members.length})</span>
              <Link to="/teams/team-nova" className="text-[#2563EB] hover:underline font-semibold">
                Manage
              </Link>
            </div>
            <div className="space-y-2">
              {team.members.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <Avatar name={m.name} initials={m.avatar} size="xs" />
                  <span className="font-semibold text-[#0F172A] truncate flex-1">{m.name}</span>
                  <span className="text-[11px] text-[#64748B]">{m.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetailPage;
