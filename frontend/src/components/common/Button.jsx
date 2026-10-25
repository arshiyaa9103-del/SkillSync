import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
    xl: 'text-base px-6 py-3 gap-3 font-semibold'
  };

  const variants = {
    primary: 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm hover:shadow focus:ring-[#2563EB]',
    secondary: 'bg-[#EFF6FF] text-[#2563EB] hover:bg-[#DBEAFE] border border-blue-200/80 focus:ring-[#2563EB]',
    cyan: 'bg-[#06B6D4] hover:bg-[#0891B2] text-white shadow-sm focus:ring-[#06B6D4]',
    outline: 'border border-[#E2E8F0] bg-white text-[#475569] hover:bg-slate-50 hover:text-[#0F172A] hover:border-slate-300 focus:ring-slate-400',
    ghost: 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 focus:ring-slate-300',
    success: 'bg-[#16A34A] hover:bg-[#15803D] text-white shadow-sm focus:ring-[#16A34A]',
    danger: 'bg-red-50 text-[#EF4444] hover:bg-red-100 border border-red-200 focus:ring-red-400',
    white: 'bg-white text-[#2563EB] hover:bg-slate-50 shadow-md font-semibold focus:ring-white'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
};

export default Button;
