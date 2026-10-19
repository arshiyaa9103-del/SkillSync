import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon: Icon
}) => {
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3 py-1 font-semibold'
  };

  const variants = {
    default: 'bg-slate-100 text-[#475569] border border-slate-200/70',
    primary: 'bg-[#EFF6FF] text-[#2563EB] border border-blue-200/60',
    cyan: 'bg-[#ECFEFF] text-[#0891B2] border border-cyan-200/60',
    success: 'bg-[#F0FDF4] text-[#16A34A] border border-green-200/60',
    warning: 'bg-amber-50 text-[#F59E0B] border border-amber-200/60',
    danger: 'bg-red-50 text-[#EF4444] border border-red-200/60',
    match: 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-[#2563EB] border border-blue-200 font-bold',
    dark: 'bg-[#0F172A] text-white border border-slate-700'
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full ${sizeStyles[size] || sizeStyles.md} ${variants[variant] || variants.default} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      {children}
    </span>
  );
};

export default Badge;
