import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, BookOpen, RotateCw, Gamepad2, Grid } from 'lucide-react';

export const BottomNav = ({ onOpenMoreMenu }) => {
  const { currentTab, setCurrentTab, words } = useApp();

  // Count words due for review today
  const dueCount = words.filter(w => new Date(w.nextReviewDate) <= new Date()).length;

  const navItems = [
    { id: 'home', label: 'Bosh sahifa', icon: Home },
    { id: 'words', label: 'Lug\'at', icon: BookOpen },
    { id: 'review', label: 'Takrorlash', icon: RotateCw, badge: dueCount > 0 ? dueCount : null },
    { id: 'games', label: 'O\'yinlar', icon: Gamepad2 },
    { id: 'more', label: 'Menyu', icon: Grid, isAction: true, onClick: onOpenMoreMenu }
  ];

  return (
    <nav className="bottom-nav-mobile" style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 8px 12px 8px',
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)',
      position: 'sticky',
      bottom: 0,
      zIndex: 50,
      boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.05)'
    }}>
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.isAction && item.onClick) {
                item.onClick();
              } else {
                setCurrentTab(item.id);
              }
            }}
            className="btn-press"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-lg)',
              background: isActive ? 'var(--primary-100)' : 'transparent',
              color: isActive ? 'var(--primary)' : 'var(--text-tertiary)',
              transition: 'all var(--transition-normal)',
              position: 'relative',
              flex: 1,
              transform: isActive ? 'translateY(-1px)' : 'none'
            }}
          >
            <div style={{ position: 'relative' }}>
              <Icon size={21} strokeWidth={isActive ? 2.5 : 1.9} />
              {item.badge && (
                <span 
                  className="pulse-badge"
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-9px',
                    background: 'var(--danger)',
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: 900,
                    minWidth: '17px',
                    height: '17px',
                    padding: '0 4px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>

            <span style={{ 
              fontSize: '11px', 
              fontWeight: isActive ? 800 : 600,
              letterSpacing: '-0.2px'
            }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
