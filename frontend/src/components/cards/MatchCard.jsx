import React from 'react';
import { useApp } from '../../context/AppContext';
import Avatar from '../common/Avatar';
import SkillBadge from '../common/SkillBadge';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { CheckCircle2, Sparkles, UserPlus, Eye, Clock, Award, FolderGit2 } from 'lucide-react';

const MatchCard = ({ candidate }) => {
  const {
    team,
    invitations,
    setActiveProfileCandidate,
    setInviteModalCandidate,
    requireAuth
  } = useApp();

  const isAlreadyMember = team.members.some(
    (m) => m.name.toLowerCase() === candidate.name.toLowerCase()
  );

  const isPendingInvite = invitations.sent.some(
    (inv) =>
      inv.candidateName.toLowerCase() === candidate.name.toLowerCase() &&
      inv.status === 'Pending'
  );

  // Check if candidate matches any critical gaps
  const matchesGap = team.criticalGaps.some((gap) =>
    candidate.role.toLowerCase().includes(gap.toLowerCase()) ||
    candidate.skills.some((s) => s.toLowerCase().includes(gap.toLowerCase()))
  );

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
      matchesGap ? 'border-blue-200/80 shadow-md hover:shadow-lg hover:border-blue-300' : 'border-slate-200/80 shadow-sm hover:shadow-md'
    }`}>
      {/* Top Banner if candidate fills a critical gap */}
      {matchesGap && !isAlreadyMember && (
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1.5 text-xs font-bold flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            Top Skill Gap Match for Team Nova
          </span>
          <span className="text-[11px] bg-white/20 px-1.5 py-0.5 rounded font-mono">
            +{candidate.matchPercentage}% Compatibility
          </span>
        </div>
      )}

      <div className="p-5 sm:p-6 space-y-4">
        {/* Header: Avatar, Name, Match Score, Availability */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar
              name={candidate.name}
              initials={candidate.avatar}
              size="lg"
              status={candidate.availability === 'Available' ? 'available' : 'busy'}
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] hover:text-[#2563EB] cursor-pointer transition-colors"
                  onClick={() => setActiveProfileCandidate(candidate)}
                >
                  {candidate.name}
                </h3>
              </div>
              <p className="text-xs font-semibold text-[#2563EB]">{candidate.role}</p>
              <p className="text-xs text-[#64748B]">
                {candidate.department} · {candidate.year}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="inline-flex flex-col items-end">
              <span className="text-lg sm:text-xl font-extrabold text-[#2563EB] tracking-tight">
                {candidate.matchPercentage}%
              </span>
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                Match Score
              </span>
            </div>
          </div>
        </div>

        {/* Experience & Availability Strip */}
        <div className="grid grid-cols-2 gap-2 text-xs py-2 px-3 bg-slate-50/80 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 text-[#475569]">
            <Award className="w-3.5 h-3.5 text-[#2563EB]" />
            <span><strong>{candidate.experience.hackathons}</strong> Hackathons</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#475569]">
            <FolderGit2 className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span><strong>{candidate.experience.projects}</strong> Projects</span>
          </div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">
            Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {candidate.skills.map((skill, idx) => {
              const isGap = team.criticalGaps.some((g) =>
                g.toLowerCase() === skill.toLowerCase() ||
                (g === 'Data Science' && ['Python', 'Machine Learning', 'Pandas'].includes(skill)) ||
                (g === 'UI/UX' && ['Figma', 'UI/UX', 'Design Systems'].includes(skill))
              );
              return (
                <SkillBadge
                  key={idx}
                  skill={skill}
                  isGapFill={isGap}
                  showIcon={isGap}
                  size="sm"
                />
              );
            })}
          </div>
        </div>

        {/* "Why this candidate?" */}
        {candidate.whyReasons && candidate.whyReasons.length > 0 && (
          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1.5">
            <p className="text-xs font-bold text-[#2563EB]">
              Why this candidate?
            </p>
            <ul className="space-y-1 text-xs text-[#334155]">
              {candidate.whyReasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-1.5 leading-snug">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div className="p-4 sm:p-5 bg-slate-50/60 border-t border-slate-100 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          icon={Eye}
          onClick={() => setActiveProfileCandidate(candidate)}
        >
          View Profile
        </Button>

        {isAlreadyMember ? (
          <Button
            variant="success"
            size="sm"
            className="flex-1 cursor-default opacity-90"
            disabled
          >
            ✓ On Team Nova
          </Button>
        ) : isPendingInvite ? (
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            disabled
          >
            Invitation Sent
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            icon={UserPlus}
            onClick={() => {
              if (requireAuth(() => setInviteModalCandidate(candidate), `invite ${candidate.name} to join ${team.name}`, '/find-teammates')) {
                setInviteModalCandidate(candidate);
              }
            }}
          >
            Invite
          </Button>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
