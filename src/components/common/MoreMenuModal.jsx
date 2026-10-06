import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, Gamepad2, Award, Gift, PenTool, 
  BookOpen, BarChart3, GraduationCap, Download, 
  Settings, ChevronRight, Moon, Sun, Flame, Sparkles
} from 'lucide-react';

export const MoreMenuModal = ({ isOpen, onClose, onOpenBackup }) => {
  const { currentTab, setCurrentTab, theme, setTheme, coins, streak, user } = useApp();

  if (!isOpen) return null;

  const handleSelectTab = (tabId) => {
    setCurrentTab(tabId);
    onClose();
  };

  const menuSections = [
    {
      title: "IMTIHON VA AMALIYOT",
      items: [
        { id: 'mock', title: 'Mock Test (IELTS / CEFR)', subtitle: '60 daqiqalik to\'liq sinov imtihoni', icon: Award, color: '#EF4444', badge: 'Hot' },
        { id: 'writing', title: 'AI Writing Checker', subtitle: 'Insho tahlili va xatolarni lug\'atga olish', icon: PenTool, color: '#8B5CF6', badge: 'AI' },
        { id: 'reading', title: 'Reading Bo\'limi', subtitle: 'Matnlar, savol-javoblar va tushuntirishlar', icon: BookOpen, color: '#3B82F6' },
        { id: 'grammar', title: 'Grammatika', subtitle: 'Mavzulashtirilgan qoidalar va mashqlar', icon: GraduationCap, color: '#10B981' },
        { id: 'levelTest', title: 'Daraja Aniqlash Testi', subtitle: '20 ta savolli CEFR placement testi', icon: BarChart3, color: '#F59E0B' }
      ]
    },
    {
      title: "GAMIFIKATSIYA VA RAG'BAT",
      items: [
        { id: 'games', title: 'O\'yinlar Zonasi', subtitle: 'Word Match & Speed Quiz o\'yinlari', icon: Gamepad2, color: '#EC4899', badge: 'O\'yna' },
        { id: 'market', title: 'Bozor / Market', subtitle: 'Tangalarni telefon balansi va Stars ga almashtiring', icon: Gift, color: '#F59E0B', badge: `🪙 ${coins}` }
      ]
    },
    {
      title: "SOZLAMALAR VA ZAXIRA",
      items: [
        { id: 'profile', title: 'Profil & Maqsadlar', subtitle: 'Kunlik maqsad, xavfsizlik va sozlamalar', icon: Settings, color: '#64748B' },
        { id: 'backup', title: 'Lug\'at Zaxirasi', subtitle: 'Excel / CSV va JSON eksport va import', icon: Download, color: '#06B6D4', action: () => { onClose(); onOpenBackup(); } }
      ]
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div 
        className="animate-slide-up"
        style={{
          background: 'var(--bg-surface)',
          borderTopLeftRadius: 'var(--radius-xl)',
          borderTopRightRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '520px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--primary-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Barcha Bo'limlar
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                VocabReminder ekotizimi
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '50%',
              background: 'var(--bg-subtle)',
              color: 'var(--text-tertiary)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* User Mini Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          background: 'var(--bg-subtle)',
          fontSize: '12px',
          fontWeight: 700
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              🪙 {coins} coin
            </span>
            <span style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Flame size={14} /> {streak.count} kun streak
            </span>
          </div>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 600,
              padding: '4px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-surface)'
            }}
          >
            {theme === 'dark' ? <Sun size={14} color="#FBBF24" /> : <Moon size={14} />}
            <span>{theme === 'dark' ? 'Yorug\'' : 'Qorong\'i'}</span>
          </button>
        </div>

        {/* Scrollable List */}
        <div style={{ padding: '16px 20px 30px 20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {menuSections.map((sec, sIdx) => (
            <div key={sIdx}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.6px', marginBottom: '8px' }}>
                {sec.title}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {sec.items.map(item => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        } else {
                          handleSelectTab(item.id);
                        }
                      }}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        background: isActive ? 'var(--primary-50)' : 'var(--bg-surface)',
                        border: `1px solid ${isActive ? 'var(--primary-200)' : 'var(--border-subtle)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          background: `${item.color}15`,
                          color: item.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {item.badge && (
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-full)',
                            background: item.badge === 'Hot' ? 'var(--danger-light)' : 'var(--primary-100)',
                            color: item.badge === 'Hot' ? 'var(--danger)' : 'var(--primary)',
                            fontSize: '11px',
                            fontWeight: 800
                          }}>
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight size={16} color="var(--text-tertiary)" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
