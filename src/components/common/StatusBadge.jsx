import React from 'react';

const StatusBadge = ({ status, className = '' }) => {
  const normalized = (status || '').toLowerCase();

  let dotColor = 'bg-slate-400';
  let badgeClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (normalized === 'open' || normalized === 'active' || normalized === 'available' || normalized === 'ready' || normalized === 'accepted') {
    dotColor = 'bg-[#16A34A]';
    badgeClasses = 'bg-[#F0FDF4] text-[#16A34A] border-green-200/80';
  } else if (normalized === 'building' || normalized === 'upcoming' || normalized === 'pending') {
    dotColor = 'bg-[#F59E0B]';
    badgeClasses = 'bg-amber-50 text-[#D97706] border-amber-200/80';
  } else if (normalized === 'completed' || normalized === 'closed') {
    dotColor = 'bg-slate-400';
    badgeClasses = 'bg-slate-100 text-slate-600 border-slate-200';
  } else if (normalized === 'critical' || normalized === 'declined' || normalized === 'missing') {
    dotColor = 'bg-[#EF4444]';
    badgeClasses = 'bg-red-50 text-[#DC2626] border-red-200/80';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClasses} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
      {status}
    </span>
  );
};

export default StatusBadge;
