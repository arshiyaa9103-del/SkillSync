import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { Calendar, Users, Globe, Trophy, ArrowRight, Clock } from 'lucide-react';

const HackathonCard = ({ hackathon }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      <div className="p-5 sm:p-6 space-y-4">
        {/* Top Status & Prize */}
        <div className="flex items-center justify-between gap-2">
          <StatusBadge status={hackathon.status} />
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#16A34A] bg-[#F0FDF4] px-2.5 py-1 rounded-full border border-green-200">
            <Trophy className="w-3.5 h-3.5" />
            <span>{hackathon.prizePool}</span>
          </div>
        </div>

        {/* Title and tagline */}
        <div>
          <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors line-clamp-1">
            <Link to={`/hackathons/${hackathon.id}`}>
              {hackathon.title}
            </Link>
          </h3>
          <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2 leading-relaxed">
            {hackathon.tagline}
          </p>
        </div>

        {/* Metadata Details */}
        <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-[#475569]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#64748B]">
              <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
              Dates:
            </span>
            <span className="font-semibold text-[#0F172A]">{hackathon.dates}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#64748B]">
              <Users className="w-3.5 h-3.5 text-[#06B6D4]" />
              Team Size:
            </span>
            <span className="font-semibold text-[#0F172A]">{hackathon.teamSize}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#64748B]">
              <Globe className="w-3.5 h-3.5 text-[#16A34A]" />
              Mode:
            </span>
            <span className="font-semibold text-[#0F172A]">{hackathon.mode}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#64748B]">
              <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
              Registration Deadline:
            </span>
            <span className="font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded text-[11px]">
              {hackathon.registrationDeadline}
            </span>
          </div>
        </div>

        {/* Domains Badges */}
        <div className="pt-2">
          <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5">
            Domains:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {hackathon.domains.map((domain, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-[#334155] border border-slate-200"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action */}
      <div className="p-4 sm:p-5 bg-slate-50/70 border-t border-slate-100">
        <Link to={`/hackathons/${hackathon.id}`} className="block">
          <Button
            variant="outline"
            size="sm"
            className="w-full group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] transition-colors"
            icon={ArrowRight}
            iconPosition="right"
          >
            View Challenge
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HackathonCard;
