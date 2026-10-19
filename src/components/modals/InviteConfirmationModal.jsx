import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import { Send, AlertCircle, Sparkles } from 'lucide-react';

const InviteConfirmationModal = () => {
  const {
    inviteModalCandidate,
    setInviteModalCandidate,
    sendInvitation,
    team
  } = useApp();

  const [customNote, setCustomNote] = useState('');

  if (!inviteModalCandidate) return null;

  const candidate = inviteModalCandidate;

  const handleSend = () => {
    sendInvitation(candidate, customNote);
    setCustomNote('');
  };

  return (
    <Modal
      isOpen={Boolean(inviteModalCandidate)}
      onClose={() => setInviteModalCandidate(null)}
      title={`Invite ${candidate.name} to ${team.name}?`}
      subtitle="Send a direct hackathon team invitation."
      maxWidth="max-w-md"
    >
      <div className="space-y-5">
        {/* Candidate & Team Summary Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center gap-3">
            <Avatar
              name={candidate.name}
              initials={candidate.avatar}
              size="md"
            />
            <div>
              <p className="text-sm font-bold text-[#0F172A]">{candidate.name}</p>
              <p className="text-xs text-[#2563EB] font-semibold">{candidate.role}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 text-xs text-[#475569] space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Hackathon:</span>
              <span className="font-semibold text-[#0F172A]">{team.hackathonName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Proposed Role:</span>
              <span className="font-semibold text-[#2563EB]">{candidate.role}</span>
            </div>
          </div>
        </div>

        {/* Why Reason Callout */}
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
          <div className="text-xs text-[#1E3A8A] leading-relaxed">
            <strong>Why this match:</strong> Your team currently has an open{' '}
            <strong>{candidate.role}</strong> skill gap. Inviting {candidate.name} will significantly improve Team Nova's readiness and eligibility.
          </div>
        </div>

        {/* Optional Custom Note */}
        <div>
          <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
            Add a personal note (optional)
          </label>
          <textarea
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            rows={3}
            placeholder={`Hey ${candidate.name}, we'd love to have you lead our ${candidate.role} on Team Nova for ${team.hackathonName}!`}
            className="w-full text-xs rounded-xl border border-slate-200 p-3 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
          <Button
            variant="outline"
            size="md"
            onClick={() => setInviteModalCandidate(null)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Send}
            onClick={handleSend}
          >
            Send Invitation
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default InviteConfirmationModal;
