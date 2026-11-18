import React from 'react';
import { useCms } from '../context/CmsContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toasts, removeToast } = useCms();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map(toast => {
        let borderClass = 'border-cyan-500/40 bg-obsidian-950/95 text-cyan-300';
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;

        if (toast.type === 'error') {
          borderClass = 'border-rose-500/50 bg-rose-950/95 text-rose-200';
          icon = <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-500/50 bg-amber-950/95 text-amber-200';
          icon = <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />;
        } else if (toast.type === 'info') {
          borderClass = 'border-cyan-500/50 bg-cyan-950/95 text-cyan-200';
          icon = <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-lg border shadow-xl backdrop-blur-md font-mono text-xs sm:text-sm animate-in slide-in-from-bottom-2 duration-200 ${borderClass}`}
          >
            <div className="flex items-center gap-3">
              {icon}
              <span className="font-medium text-slate-100">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-slate-400 hover:text-white rounded transition-colors ml-3"
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

export default Toast;
