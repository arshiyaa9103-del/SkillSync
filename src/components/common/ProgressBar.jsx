import React from 'react';

const ProgressBar = ({
  value = 0,
  max = 100,
  label,
  showValue = true,
  height = 'md',
  colorScheme = 'auto', // 'auto' | 'blue' | 'green' | 'amber' | 'red'
  className = '',
  sublabel
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
    xl: 'h-5'
  };

  const getColorClass = (pct) => {
    if (colorScheme === 'blue') return 'bg-[#2563EB]';
    if (colorScheme === 'green') return 'bg-[#16A34A]';
    if (colorScheme === 'amber') return 'bg-[#F59E0B]';
    if (colorScheme === 'red') return 'bg-[#EF4444]';

    // Auto threshold
    if (pct >= 80) return 'bg-[#16A34A]'; // Strong
    if (pct >= 50) return 'bg-[#06B6D4]'; // Good / Growing
    if (pct >= 35) return 'bg-[#F59E0B]'; // Moderate / Gap
    return 'bg-[#EF4444]'; // Critical gap
  };

  const getTextColorClass = (pct) => {
    if (pct >= 80) return 'text-[#16A34A]';
    if (pct >= 50) return 'text-[#0891B2]';
    if (pct >= 35) return 'text-[#D97706]';
    return 'text-[#DC2626]';
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            {label && <span className="text-sm font-semibold text-[#0F172A]">{label}</span>}
            {sublabel && <span className="text-xs text-[#64748B]">{sublabel}</span>}
          </div>
          {showValue && (
            <span className={`text-sm font-bold ${getTextColorClass(percentage)}`}>
              {percentage}%
            </span>
          )}
        </div>
      )}

      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightClasses[height] || heightClasses.md} p-0.5 border border-slate-200/50`}>
        <div
          className={`${heightClasses[height] || heightClasses.md} rounded-full ${getColorClass(percentage)} transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
