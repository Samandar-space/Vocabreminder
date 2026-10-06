import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { speechService } from '../../services/speech';
import { 
  Search, X, BookOpen, Award, Gamepad2, Gift, 
  PenTool, GraduationCap, BarChart3, Plus, 
  Volume2, Download, ArrowRight, CornerDownLeft 
} from 'lucide-react';

export const GlobalSearchModal = ({ isOpen, onClose, onOpenAddModal, onOpenBackup }) => {
  const { words, setCurrentTab } = useApp();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  // Search Words
  const matchedWords = cleanQ
    ? words.filter(w => w.word.toLowerCase().includes(cleanQ) || w.translation.toLowerCase().includes(cleanQ)).slice(0, 5)
    : [];

  // Quick Navigation Commands
  const navigationCommands = [
    { title: 'Yangi so\'z qo\'shish', category: 'Harakat', icon: Plus, color: 'var(--primary)', action: () => { onClose(); onOpenAddModal(); } },
    { title: 'Mock Test (IELTS / CEFR)', category: 'Bo\'lim', icon: Award, color: '#EF4444', action: () => { setCurrentTab('mock'); onClose(); } },
    { title: 'O\'yinlar Zonasi (Word Match & Speed)', category: 'O\'yin', icon: Gamepad2, color: '#EC4899', action: () => { setCurrentTab('games'); onClose(); } },
    { title: 'Bozor / Market (Coinlar)', category: 'Rag\'bat', icon: Gift, color: '#F59E0B', action: () => { setCurrentTab('market'); onClose(); } },
    { title: 'AI Writing Checker', category: 'Bo\'lim', icon: PenTool, color: '#8B5CF6', action: () => { setCurrentTab('writing'); onClose(); } },
    { title: 'Reading (Matnlar)', category: 'Bo\'lim', icon: BookOpen, color: '#3B82F6', action: () => { setCurrentTab('reading'); onClose(); } },
    { title: 'Lug\'at zaxirasini yuklab olish', category: 'Zaxira', icon: Download, color: '#06B6D4', action: () => { onClose(); onOpenBackup(); } }
  ].filter(cmd => !cleanQ || cmd.title.toLowerCase().includes(cleanQ) || cmd.category.toLowerCase().includes(cleanQ));

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      zIndex: 1100,
      padding: '60px 16px 20px 16px'
    }}>
      <div 
        className="animate-slide-up"
        style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '560px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh'
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <Search size={20} color="var(--primary)" />
          <input
            autoFocus
            type="text"
            placeholder="So'z qidirish yoki bo'limga o'tish... (masalan: challenge, mock, o'yin)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}
          />
          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '50%',
              background: 'var(--bg-subtle)',
              color: 'var(--text-tertiary)'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ padding: '12px 16px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Matched Words */}
          {cleanQ && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.6px', marginBottom: '8px', paddingLeft: '8px' }}>
                LUG'ATDAGI SO'ZLAR ({matchedWords.length})
              </div>

              {matchedWords.length === 0 ? (
                <div style={{ padding: '12px', fontSize: '13px', color: 'var(--text-tertiary)', fontStyle: 'italic', paddingLeft: '8px' }}>
                  "{query}" so'zi lug'atingizda topilmadi
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {matchedWords.map(w => (
                    <div
                      key={w.id}
                      onClick={() => { setCurrentTab('words'); onClose(); }}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {w.word}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); speechService.speak(w.word); }}
                          style={{ color: 'var(--primary)', padding: '2px' }}
                        >
                          <Volume2 size={15} />
                        </button>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                          — {w.translation}
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)' }}>
                        Qutida {w.box || 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Navigation Commands */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.6px', marginBottom: '8px', paddingLeft: '8px' }}>
              TEZKOR BUYRUQLAR VA BO'LIMLAR
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navigationCommands.map((cmd, idx) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={idx}
                    onClick={cmd.action}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      background: 'transparent',
                      textAlign: 'left',
                      transition: 'background var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: `${cmd.color}18`,
                        color: cmd.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {cmd.title}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                          {cmd.category}
                        </div>
                      </div>
                    </div>

                    <CornerDownLeft size={14} color="var(--text-tertiary)" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer shortcuts hint */}
        <div style={{
          padding: '10px 20px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: 'var(--text-tertiary)'
        }}>
          <span>Tezkor qidiruv: <strong>Ctrl + K</strong></span>
          <span>Yopish: <strong>Esc</strong></span>
        </div>
      </div>
    </div>
  );
};
