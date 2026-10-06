import React from 'react';
import { useApp } from '../../context/AppContext';
import { WifiOff } from 'lucide-react';

export const OfflineBanner = () => {
  const { isOffline } = useApp();

  if (!isOffline) return null;

  return (
    <div style={{
      background: '#FFFBEB',
      color: '#B45309',
      borderBottom: '1px solid #FDE68A',
      padding: '8px 16px',
      fontSize: '12px',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      zIndex: 60
    }}>
      <WifiOff size={15} />
      <span>Internet yo'q. Mavjud so'zlaringiz ko'rsatilmoqda.</span>
    </div>
  );
};
