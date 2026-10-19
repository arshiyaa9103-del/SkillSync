import React from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import Avatar from '../common/Avatar';
import SkillBadge from '../common/SkillBadge';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';
import { Trophy, FolderGit2, UserPlus, CheckCircle2, Github, Linkedin, ExternalLink, Sparkles } from 'lucide-react';

const CandidateProfileModal = () => {
  const {
    activeProfileCandidate,
    setActiveProfileCandidate,
    setInviteModalCandidate,
    team,
    invitations,
    requireAuth
  } = useApp();

  if (!activeProfileCandidate) return null;

  const candidate = activeProfileCandidate;

  const isAlreadyMember = team.members.some(
    (m) => m.name.toLowerCase() === candidate.name.toLowerCase()
  );

  const isPendingInvite = invitations.sent.some(
    (inv) =>
      inv.candidateName.toLowerCase() === candidate.name.toLowerCase() &&
      inv.status === 'Pending'
  );

  const handleInvite = () => {
    if (!requireAuth(null, `invite ${candidate.name} to join ${team.name}`, '/find-teammates')) {
      return;
    }
    setActiveProfileCandidate(null);
    setInviteModalCandidate(candidate);
  };

  return (
    <Modal
      isOpen={Boolean(activeProfileCandidate)}
      onClose={() => setActiveProfileCandidate(null)}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Top Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <Avatar
              name={candidate.name}
              initials={candidate.avatar}
              size="xl"
              status={candidate.availability === 'Available' ? 'available' : 'busy'}
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                  {candidate.name}
                </h2>
                <StatusBadge status={candidate.availability} />
              </div>
              <p className="text-sm font-semibold text-[#2563EB] mt-0.5">
                {candidate.role}
              </p>
              <p className="text-xs text-[#64748B]">
                {candidate.department} · {candidate.year} · {candidate.university}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center p-3 rounded-xl bg-blue-50/80 border border-blue-100">
            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
              Compatibility
            </span>
            <span className="text-2xl font-black text-[#2563EB]">
              {candidate.matchPercentage}%
            </span>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
            About
          </h4>
          <p className="text-sm text-[#475569] leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            "{candidate.bio}"
          </p>
        </div>

        {/* Skills Section */}
        <div>
          <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2.5">
            Skills & Competencies
          </h4>
          <div className="flex flex-wrap gap-2">
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
                  size="md"
                />
              );
            })}
          </div>
        </div>

        {/* Experience & Preferred Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Experience
            </h4>
            <div className="flex items-center gap-4 text-xs text-[#334155]">
              <span className="flex items-center gap-1.5 font-medium">
                <Trophy className="w-4 h-4 text-[#2563EB]" />
                <strong>{candidate.experience.hackathons}</strong> Hackathons
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <FolderGit2 className="w-4 h-4 text-[#06B6D4]" />
                <strong>{candidate.experience.projects}</strong> Projects
              </span>
            </div>
            {candidate.highlights && (
              <ul className="pt-2 border-t border-slate-100 text-xs text-[#64748B] space-y-1">
                {candidate.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Preferred Roles
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {candidate.preferredRoles.map((role, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-50 text-[#2563EB] border border-blue-100"
                >
                  {role}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-[#64748B] pt-1">
              Availability: <strong className="text-emerald-700">{candidate.availability}</strong> for sprint work.
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
            Social & Code Profiles
          </h4>
          <div className="flex items-center gap-3 text-xs text-[#475569]">
            {candidate.socials.github && (
              <a
                href={`https://${candidate.socials.github}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-[#0F172A] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>{candidate.socials.github}</span>
              </a>
            )}
            {candidate.socials.linkedin && (
              <a
                href={`https://${candidate.socials.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-[#0F172A] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setActiveProfileCandidate(null)}
          >
            Close
          </Button>

          {isAlreadyMember ? (
            <Button variant="success" disabled>
              ✓ Already in Team Nova
            </Button>
          ) : isPendingInvite ? (
            <Button variant="secondary" disabled>
              Invitation Pending
            </Button>
          ) : (
            <Button
              variant="primary"
              icon={UserPlus}
              onClick={handleInvite}
            >
              Invite to Team Nova
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CandidateProfileModal;
