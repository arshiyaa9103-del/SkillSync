import React from 'react';
import { Check } from 'lucide-react';

const SkillBadge = ({
  skill,
  isGapFill = false,
  isMatched = false,
  showIcon = true,
  size = 'md',
  className = ''
}) => {
  const skillName = typeof skill === 'string' ? skill : skill.name;
  const level = typeof skill === 'object' ? skill.level : null;

  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1';

  if (isGapFill) {
    return (
      <span
        className={`inline-flex items-center gap-1 font-semibold rounded-md bg-[#EFF6FF] text-[#2563EB] border border-blue-300/80 shadow-xs ${sizeClasses} ${className}`}
        title="Directly addresses an open team skill gap!"
      >
        {showIcon && <Check className="w-3 h-3 text-[#2563EB]" />}
        <span>{skillName}</span>
        {level && <span className="text-[10px] text-blue-500 font-normal">({level})</span>}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-md bg-slate-100 hover:bg-slate-200/80 text-[#334155] border border-slate-200 transition-colors ${sizeClasses} ${className}`}
    >
      {isMatched && showIcon && <Check className="w-3 h-3 text-emerald-600" />}
      <span>{skillName}</span>
      {level && <span className="text-[10px] text-slate-500">({level})</span>}
    </span>
  );
};

export default SkillBadge;
