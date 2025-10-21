import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toasts: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

export const toast = {
  success: (message: string) => addToast(message, 'success'),
  error: (message: string) => addToast(message, 'error'),
  info: (message: string) => addToast(message, 'info'),
};

function addToast(message: string, type: Toast['type']) {
  const id = Math.random().toString(36).substring(7);
  toasts = [...toasts, { id, message, type }];
  listeners.forEach(listener => listener(toasts));
  
  setTimeout(() => {
    removeToast(id);
  }, 5000);
}

function removeToast(id: string) {
  toasts = toasts.filter(t => t.id !== id);
  listeners.forEach(listener => listener(toasts));
}

export function Toaster() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (newToasts: Toast[]) => setCurrentToasts(newToasts);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-[#4ade80]" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBorderColor = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'border-[#4ade80]';
      case 'error':
        return 'border-red-500';
      case 'info':
        return 'border-blue-500';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {currentToasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-[#1a1a1a] border ${getBorderColor(toast.type)} rounded-lg p-4 shadow-lg min-w-[300px] max-w-[400px] flex items-center gap-3 animate-in slide-in-from-right`}
        >
          {getIcon(toast.type)}
          <p className="text-white flex-1" style={{ fontSize: '14px' }}>
            {toast.message}
          </p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
