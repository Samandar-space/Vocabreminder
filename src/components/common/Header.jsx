import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Moon, Sun, Coins, Flame, Plus, Sparkles, Search } from 'lucide-react';

export const Header = ({ onNotificationClick, onOpenAddModal, onOpenSearch }) => {
  const { user, coins, streak, theme, setTheme, currentTab, setCurrentTab } = useApp();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const initial = user.name ? user.name.trim()[0].toUpperCase() : 'F';
  const displayName = user.name || 'Foydalanuvchi';

  // Tab Titles map
  const tabTitles = {
    home: 'Bosh sahifa',
    words: 'Shaxsiy Lug\'at',
    review: 'Leitner Takrorlash',
    profile: 'Profil & Sozlamalar',
    mock: 'Mock Testlar',
    games: 'O\'yinlar Zonasi',
    market: 'Bozor & Rag\'bat',
    writing: 'AI Writing Checker',
    reading: 'Reading Bo\'limi',
    grammar: 'Grammatika',
    levelTest: 'Daraja Aniqlash Testi'
  };

  return (
    <header className="app-header" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 24px',
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Left: Mobile user greeting / Desktop page title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Mobile greeting */}
        <div 
          onClick={() => setCurrentTab('profile')} 
          className="mobile-only"
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--primary-gradient)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '16px',
            boxShadow: 'var(--shadow-primary)',
            flexShrink: 0
          }}>
            {initial}
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>
              Salom,
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 800, lineHeight: 1.2 }}>
              {displayName}
            </div>
          </div>
        </div>

        {/* Desktop title & Breadcrumb */}
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            {tabTitles[currentTab] || 'VocabReminder'}
          </h1>
          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>•</span>
          <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: 600 }}>
            {user.level || 'B1'} Daraja ({user.goal === 'ielts' ? 'IELTS' : 'CEFR'})
          </span>
        </div>
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Desktop Global Search Bar / Ctrl+K */}
        {onOpenSearch && (
          <button
            onClick={onOpenSearch}
            className="desktop-only"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-tertiary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Search size={15} color="var(--primary)" />
            <span>Qidirish...</span>
            <kbd style={{
              fontSize: '10px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '1px 5px',
              color: 'var(--text-tertiary)',
              fontWeight: 800
            }}>Ctrl K</kbd>
          </button>
        )}

        {/* Desktop Quick Add Button */}
        {onOpenAddModal && (
          <button
            onClick={onOpenAddModal}
            className="desktop-only"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '13px',
              boxShadow: 'var(--shadow-primary)'
            }}
          >
            <Plus size={16} strokeWidth={2.5} /> So'z qo'shish
          </button>
        )}

        {/* Streak Badge */}
        <div
          title={`${streak.count} kunlik uzluksiz streak`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 12px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--danger-light)',
            color: 'var(--danger)',
            fontWeight: 800,
            fontSize: '12px'
          }}
        >
          <Flame size={15} />
          <span>{streak.count} kun</span>
        </div>

        {/* Coin Balance Pill */}
        <button
          onClick={() => setCurrentTab('market')}
          title="Bozor va Coinlar"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--gold-light)',
            color: 'var(--gold-dark)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            fontWeight: 800,
            fontSize: '13px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <Coins size={16} color="#D97706" />
          <span>{coins}</span>
        </button>

        {/* Theme Toggle (Mobile) */}
        <button
          onClick={toggleTheme}
          title="Mavzuni almashtirish"
          className="mobile-only"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-subtle)',
            color: 'var(--text-secondary)'
          }}
        >
          {theme === 'dark' ? <Sun size={17} color="#FBBF24" /> : <Moon size={17} />}
        </button>

        {/* Notification Bell */}
        <button
          onClick={onNotificationClick}
          title="Bildirishnomalar va Tezkor savol"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-subtle)',
            color: 'var(--text-secondary)',
            position: 'relative'
          }}
        >
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--primary)'
          }}></span>
        </button>
      </div>
    </header>
  );
};
