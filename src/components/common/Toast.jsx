import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, X, Info, AlertTriangle, Copy, Trash2 } from 'lucide-react';

export const Toast = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => {
        let Icon = Check;
        if (toast.type === 'error') Icon = Trash2;
        if (toast.type === 'info') Icon = Info;
        if (toast.text.includes('Nusxa')) Icon = Copy;

        return (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon size={18} />
              <span>{toast.text}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'inherit',
                opacity: 0.7,
                padding: '2px'
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
