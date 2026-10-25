import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let borderClass = 'border-blue-200';
        let bgClass = 'bg-white';
        let icon = <Info className="w-5 h-5 text-[#2563EB] shrink-0" />;

        if (toast.type === 'success') {
          borderClass = 'border-emerald-200';
          icon = <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />;
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-200';
          icon = <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0" />;
        } else if (toast.type === 'error') {
          borderClass = 'border-red-200';
          icon = <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border ${borderClass} ${bgClass} transform transition-all duration-300 animate-in slide-in-from-bottom-5`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              {toast.title && (
                <p className="text-sm font-bold text-[#0F172A] leading-tight">
                  {toast.title}
                </p>
              )}
              <p className="text-xs text-[#475569] mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
