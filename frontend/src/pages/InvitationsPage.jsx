import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import InvitationCard from '../components/cards/InvitationCard';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { Inbox, Send, Users, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const InvitationsPage = () => {
  const { invitations, team } = useApp();
  const [activeTab, setActiveTab] = useState('received'); // 'received' | 'sent'

  const receivedList = invitations.received || [];
  const sentList = invitations.sent || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Team invitations
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Review invitations from other hackathon squads and track invitations you have dispatched.
          </p>
        </div>

        <Link to="/find-teammates">
          <Button variant="primary" size="md" icon={Users}>
            Find More Teammates
          </Button>
        </Link>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('received')}
          className={`pb-3 px-4 text-sm font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
            activeTab === 'received'
              ? 'text-[#2563EB]'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Received Invitations</span>
          {receivedList.length > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-[#2563EB]">
              {receivedList.length}
            </span>
          )}
          {activeTab === 'received' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sent')}
          className={`pb-3 px-4 text-sm font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
            activeTab === 'sent'
              ? 'text-[#2563EB]'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Sent Invitations</span>
          {sentList.length > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-[#475569]">
              {sentList.length}
            </span>
          )}
          {activeTab === 'sent' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
          )}
        </button>
      </div>

      {/* Received Tab Content */}
      {activeTab === 'received' && (
        <div className="space-y-4">
          {receivedList.length > 0 ? (
            receivedList.map((inv) => (
              <InvitationCard key={inv.id} invitation={inv} type="received" />
            ))
          ) : (
            <EmptyState
              icon={Inbox}
              title="No pending invitations"
              description="You have reviewed all incoming team invitations. When teams invite you to join their hackathon squad, they will appear here."
              actionText="Explore Hackathons"
              onAction={() => {}}
            />
          )}
        </div>
      )}

      {/* Sent Tab Content */}
      {activeTab === 'sent' && (
        <div className="space-y-4">
          {sentList.length > 0 ? (
            sentList.map((inv) => (
              <InvitationCard key={inv.id} invitation={inv} type="sent" />
            ))
          ) : (
            <EmptyState
              icon={Send}
              title="No sent invitations"
              description="You haven't sent any invitations yet. Browse candidates to invite students who complete your team's skill set."
              actionText="Find Candidates"
              onAction={() => {}}
            />
          )}
        </div>
      )}

      {/* Return to Team Nova Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            TN
          </div>
          <div>
            <p className="text-sm font-bold text-[#0F172A]">
              Team Nova: {team.members.length} / {team.targetMembers} Members Active
            </p>
            <p className="text-xs text-[#2563EB]">
              Current Skill Coverage: <strong>{team.overallCoverage}%</strong> · {team.eligibilityStatus.statusText}
            </p>
          </div>
        </div>

        <Link to="/teams/team-nova">
          <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
            Return to Team Nova
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InvitationsPage;
