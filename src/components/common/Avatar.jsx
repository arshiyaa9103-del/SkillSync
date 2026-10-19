import React from 'react';

const Avatar = ({
  name = 'User',
  initials,
  src,
  size = 'md',
  status,
  className = ''
}) => {
  const displayInitials = initials || name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-12 h-12 text-base font-semibold',
    xl: 'w-16 h-16 text-xl font-bold',
    '2xl': 'w-20 h-20 text-2xl font-bold'
  };

  // Deterministic palette based on name for visual distinction
  const colors = [
    'from-blue-600 to-indigo-600 text-white',
    'from-cyan-600 to-blue-600 text-white',
    'from-blue-500 to-cyan-500 text-white',
    'from-sky-600 to-blue-700 text-white',
    'from-indigo-600 to-sky-600 text-white',
  ];
  
  const charSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorClass = colors[charSum % colors.length];

  return (
    <div className="relative inline-block shrink-0">
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full object-cover border border-white/50 shadow-xs ${className}`}
        />
      ) : (
        <div
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full bg-gradient-to-tr ${colorClass} flex items-center justify-center tracking-wider shadow-xs border border-white/80 ${className}`}
        >
          {displayInitials}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-white ${
            status === 'online' || status === 'available'
              ? 'bg-[#16A34A]'
              : status === 'busy'
              ? 'bg-[#F59E0B]'
              : 'bg-slate-400'
          } ${size === 'xl' || size === '2xl' ? 'w-4 h-4' : 'w-2.5 h-2.5'}`}
        />
      )}
    </div>
  );
};

export default Avatar;
