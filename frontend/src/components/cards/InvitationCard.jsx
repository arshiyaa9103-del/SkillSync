import React from 'react';
import { useApp } from '../../context/AppContext';
import Avatar from '../common/Avatar';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';
import { Check, X, Calendar, Layers, User, Trophy, ShieldCheck } from 'lucide-react';

const InvitationCard = ({ invitation, type = 'received' }) => {
  const { acceptInvitation, declineInvitation, cancelSentInvitation } = useApp();

  if (type === 'received') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md p-5 sm:p-6 transition-all space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
              {invitation.teamName ? invitation.teamName.substring(0, 2).toUpperCase() : 'TM'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                  {invitation.teamName}
                </h3>
                <StatusBadge status={invitation.status} />
              </div>
              <p className="text-xs font-semibold text-[#2563EB] flex items-center gap-1 mt-0.5">
                <Trophy className="w-3.5 h-3.5" />
                {invitation.hackathonName}
              </p>
              <p className="text-xs text-[#64748B] mt-0.5">
                Invited by <strong>{invitation.invitedBy}</strong> · {invitation.date}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="inline-block px-2.5 py-1 rounded-md bg-blue-50 text-[#2563EB] text-xs font-bold border border-blue-100">
              Role: {invitation.role}
            </span>
          </div>
        </div>

        {invitation.message && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-[#475569] italic leading-relaxed">
            "{invitation.message}"
          </div>
        )}

        {invitation.isSimulatedCandidateResponse && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Interactive Demo Action: Click <strong>Accept</strong> to add {invitation.candidateName} to Team Nova and see coverage jump to 86%!</span>
          </div>
        )}

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
          <Button
            variant="outline"
            size="sm"
            icon={X}
            onClick={() => declineInvitation(invitation.id)}
          >
            Decline
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Check}
            onClick={() => acceptInvitation(invitation)}
          >
            Accept Invitation
          </Button>
        </div>
      </div>
    );
  }

  // SENT INVITATION
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md p-5 sm:p-6 transition-all space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Avatar
            name={invitation.candidateName}
            initials={invitation.candidateAvatar}
            size="lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                {invitation.candidateName}
              </h3>
              <StatusBadge status={invitation.status} />
            </div>
            <p className="text-xs font-semibold text-[#2563EB] mt-0.5">
              Role: {invitation.role}
            </p>
            <p className="text-xs text-[#64748B] mt-0.5">
              Challenge: <strong>{invitation.hackathonName}</strong> · {invitation.date}
            </p>
          </div>
        </div>

        <div>
          <span className="text-xs text-[#64748B] bg-slate-100 px-2 py-1 rounded-md">
            Reason: {invitation.reason || 'Team skill requirement'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        {invitation.status === 'Pending' ? (
          <>
            {/* Quick action to simulate candidate accepting right from Sent tab as well! */}
            <Button
              variant="secondary"
              size="sm"
              icon={Check}
              onClick={() => acceptInvitation(invitation)}
              title="Simulate candidate accepting this invite"
            >
              Simulate Accept (Demo)
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={X}
              onClick={() => cancelSentInvitation(invitation.id)}
            >
              Cancel Invitation
            </Button>
          </>
        ) : (
          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
            <Check className="w-4 h-4" /> Invitation Accepted & Member Active
          </span>
        )}
      </div>
    </div>
  );
};

export default InvitationCard;
