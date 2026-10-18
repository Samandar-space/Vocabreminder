import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, BookOpen, RotateCw, PenTool, Award, 
  Gamepad2, Gift, GraduationCap, BarChart3, 
  Settings, Download, Moon, Sun, Plus, Sparkles, 
  Flame, Coins, Crown, ChevronRight 
} from 'lucide-react';

export const Sidebar = ({ onOpenAddModal, onOpenBackup }) => {
  const { 
    currentTab, setCurrentTab, words, user, 
    coins, streak, theme, setTheme 
  } = useApp();

  const dueCount = words.filter(w => new Date(w.nextReviewDate) <= new Date()).length;
  const initial = user.name ? user.name.trim()[0].toUpperCase() : 'F';

  const menuSections = [
    {
      title: 'ASOSIY',
      items: [
        { id: 'home', label: 'Bosh sahifa', icon: Home },
        { id: 'words', label: 'Shaxsiy Lug\'at', icon: BookOpen, count: words.length },
        { id: 'review', label: 'Leitner Takrorlash', icon: RotateCw, badge: dueCount > 0 ? `${dueCount} ta` : null, badgeColor: 'var(--danger)' }
      ]
    },
    {
      title: 'IMTIHON & AMALIYOT',
      items: [
        { id: 'mock', label: 'Mock Testlar', icon: Award, badge: 'IELTS / CEFR', badgeColor: 'var(--danger)' },
        { id: 'writing', label: 'AI Writing Checker', icon: PenTool, badge: 'AI', badgeColor: 'var(--primary)' },
        { id: 'reading', label: 'Reading (O\'qish)', icon: BookOpen },
        { id: 'grammar', label: 'Grammatika', icon: GraduationCap },
        { id: 'levelTest', label: 'Daraja Testi', icon: BarChart3, badge: 'A1–C2' }
      ]
    },
    {
      title: 'O\'YINLAR & RAG\'BAT',
      items: [
        { id: 'games', label: 'O\'yinlar Zonasi', icon: Gamepad2, badge: 'O\'yna', badgeColor: '#EC4899' },
        { id: 'market', label: 'Bozor / Market', icon: Gift, badge: `🪙 ${coins}`, badgeColor: 'var(--gold-dark)' }
      ]
    },
    {
      title: 'TIZIM & SOZLAMALAR',
      items: [
        { id: 'profile', label: 'Profil & Sozlamalar', icon: Settings },
        { id: 'backup', label: 'Lug\'at Zaxirasi', icon: Download, action: onOpenBackup }
      ]
    }
  ];

  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div style={{
        padding: '20px 20px 16px 20px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'var(--primary-gradient)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-primary)',
          flexShrink: 0
        }}>
          <Sparkles size={22} />
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '18px',
            fontWeight: 900,
            color: 'var(--text-primary)',
            letterSpacing: '-0.3px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>VocabReminder</span>
            <span style={{
              fontSize: '10px',
              padding: '2px 6px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-100)',
              color: 'var(--primary)',
              fontWeight: 800
            }}>PRO</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>
            Yodlash emas, eslab qolish
          </div>
        </div>
      </div>

      {/* User Quick Widget */}
      <div 
        onClick={() => setCurrentTab('profile')}
        className="card-interactive btn-press"
        style={{
          margin: '14px 16px',
          padding: '12px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-subtle)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--primary-gradient)',
            color: '#FFFFFF',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '15px'
          }}>
            {initial}
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.name || 'Foydalanuvchi'}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>
              {user.level || 'B1'} • {user.goal === 'ielts' ? 'IELTS' : 'CEFR'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <Coins size={12} /> {coins}
          </span>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <Flame size={12} /> {streak.count}k
          </span>
        </div>
      </div>

      {/* Add Word Quick Action Button */}
      <div style={{ padding: '0 16px 10px 16px' }}>
        <button
          onClick={onOpenAddModal}
          className="btn-press"
          style={{
            width: '100%',
            padding: '11px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-gradient)',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: 'var(--shadow-primary)'
          }}
        >
          <Plus size={18} strokeWidth={2.5} /> Yangi so'z qo'shish
        </button>
      </div>

      {/* Navigation Sections */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '6px 12px' }}>
        {menuSections.map((sec, sIdx) => (
          <div key={sIdx} style={{ marginBottom: '16px' }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 800,
              color: 'var(--text-tertiary)',
              letterSpacing: '0.8px',
              padding: '0 12px 6px 12px'
            }}>
              {sec.title}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {sec.items.map(item => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      } else {
                        setCurrentTab(item.id);
                      }
                    }}
                    className="btn-press"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: isActive ? '9px 12px 9px 9px' : '9px 12px',
                      borderRadius: 'var(--radius-md)',
                      background: isActive ? 'var(--primary-100)' : 'transparent',
                      color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                      borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                      fontWeight: isActive ? 800 : 600,
                      fontSize: '13px',
                      textAlign: 'left',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={18} strokeWidth={isActive ? 2.4 : 1.8} />
                      <span>{item.label}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {typeof item.count === 'number' && (
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--bg-subtle)',
                          color: 'var(--text-tertiary)'
                        }}>
                          {item.count}
                        </span>
                      )}

                      {item.badge && (
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '2px 7px',
                          borderRadius: 'var(--radius-full)',
                          background: item.badgeColor ? `${item.badgeColor}15` : 'var(--primary-50)',
                          color: item.badgeColor || 'var(--primary)',
                          border: `1px solid ${item.badgeColor ? `${item.badgeColor}30` : 'transparent'}`
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Theme Toggle */}
      <div style={{
        padding: '14px 16px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-subtle)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {theme === 'dark' ? <Sun size={15} color="#FBBF24" /> : <Moon size={15} />}
            <span>{theme === 'dark' ? 'Yorug\'' : 'Qorong\'i'}</span>
          </button>
        </div>

        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>
          v1.2 Desktop
        </span>
      </div>
    </aside>
  );
};
