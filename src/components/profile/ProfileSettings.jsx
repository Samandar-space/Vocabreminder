import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { BackupModal } from '../words/BackupModal';
import { 
  Bell, Target, Globe, Moon, HelpCircle, 
  LogOut, Trash2, ArrowLeft, ChevronRight, Crown, Check, AlertTriangle,
  Download, Smartphone
} from 'lucide-react';

export const ProfileSettings = ({ onOpenNotifications }) => {
  const { 
    user, updateUserProfile, theme, setTheme, 
    words, streak, deleteAccount, showToast, setUser 
  } = useApp();

  // Subview: 'main' | 'theme' | 'goal' | 'delete'
  const [subview, setSubview] = useState('main');
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Theme state
  const [tempTheme, setTempTheme] = useState(theme);

  // Daily goal state
  const [tempGoal, setTempGoal] = useState(user.dailyGoal || 20);

  // Delete confirmation text
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallPwa = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('Ilova muvaffaqiyatli o\'rnatildi!', 'success');
      }
      setDeferredPrompt(null);
    } else {
      showToast('Brauzeringiz menyusidan "Bosh ekranga qo\'shish" (Add to Home screen) ni bosing.', 'info');
    }
  };

  const initial = user.name ? user.name.trim()[0].toUpperCase() : 'F';

  // Save Theme
  const handleSaveTheme = () => {
    setTheme(tempTheme);
    setSubview('main');
  };

  // Save Goal
  const handleSaveGoal = () => {
    updateUserProfile({ dailyGoal: tempGoal });
    showToast(`Kunlik maqsad ${tempGoal} ta so'zga o'zgartirildi`, 'success');
    setSubview('main');
  };

  // Handle Delete Account
  const handleConfirmDelete = (e) => {
    e.preventDefault();
    if (deleteConfirmText.trim().toUpperCase() !== 'O\'CHIRISH') {
      showToast('Iltimos, tasdiqlash uchun aynan "O\'CHIRISH" deb yozing', 'error');
      return;
    }
    deleteAccount();
  };

  return (
    <div style={{ padding: '20px', minHeight: '85vh' }}>
      
      {/* 1. MAIN PROFILE HUB */}
      {subview === 'main' && (
        <div className="animate-fade">
          {/* User Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 800,
              boxShadow: 'var(--shadow-primary)',
              marginBottom: '12px'
            }}>
              {initial}
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2px' }}>
              {user.name || 'Foydalanuvchi'}
            </h2>
            <div style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
              {user.email || 'user@example.com'}
            </div>
            {user.isPro && (
              <span style={{
                marginTop: '6px',
                padding: '2px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--gold-light)',
                color: 'var(--gold-dark)',
                fontSize: '11px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Crown size={12} /> PRO A'zo
              </span>
            )}
          </div>

          {/* Stats 3-Row Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
            <div style={{
              padding: '14px 10px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {words.length}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>So'zlar</div>
            </div>

            <div style={{
              padding: '14px 10px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {streak.count} 🔥
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Kun streak</div>
            </div>

            <div style={{
              padding: '14px 10px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {user.level || 'B1'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Daraja</div>
            </div>
          </div>

          {/* Menu Items List */}
          <div style={{
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '20px'
          }}>
            {/* Eslatmalar */}
            <div
              onClick={onOpenNotifications}
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-subtle)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Bell size={18} color="var(--primary)" />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Eslatmalar</span>
              </div>
              <ChevronRight size={18} color="var(--text-tertiary)" />
            </div>

            {/* Kunlik maqsad */}
            <div
              onClick={() => setSubview('goal')}
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-subtle)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Target size={18} color="var(--primary)" />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Kunlik maqsad</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{user.dailyGoal || 20} ta so'z</span>
                <ChevronRight size={18} color="var(--text-tertiary)" />
              </div>
            </div>

            {/* Mavzu */}
            <div
              onClick={() => setSubview('theme')}
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-subtle)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Moon size={18} color="var(--primary)" />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Mavzu</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {theme === 'dark' ? 'Qorong\'i' : 'Yorug\''}
                </span>
                <ChevronRight size={18} color="var(--text-tertiary)" />
              </div>
            </div>

            {/* Til */}
            <div
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Globe size={18} color="var(--primary)" />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Til</span>
              </div>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>O'zbek</span>
            </div>

            {/* Lug'at Zaxirasi (Eksport / Import) */}
            <div
              onClick={() => setIsBackupOpen(true)}
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-subtle)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Download size={18} color="var(--primary)" />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Lug'at zaxirasi (Eksport/Import)</span>
              </div>
              <ChevronRight size={18} color="var(--text-tertiary)" />
            </div>

            {/* Ilovani o'rnatish (PWA) */}
            <div
              onClick={handleInstallPwa}
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-subtle)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Smartphone size={18} color="var(--primary)" />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Ilovani telefonga o'rnatish</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-50)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                PWA
              </span>
            </div>

            {/* Yordam */}
            <div
              onClick={() => showToast('Yordam uchun: @VocabReminderAdmin ga yozing', 'info')}
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <HelpCircle size={18} color="var(--primary)" />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Yordam va Aloqa</span>
              </div>
              <ChevronRight size={18} color="var(--text-tertiary)" />
            </div>
          </div>

          {/* Chiqish va Hisobni o'chirish */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => {
                setUser(prev => ({ ...prev, isAuth: false }));
                showToast('Tizimdan chiqdingiz', 'info');
              }}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--danger)',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <LogOut size={16} /> Chiqish
            </button>

            <button
              onClick={() => setSubview('delete')}
              style={{
                color: 'var(--text-tertiary)',
                fontSize: '12px',
                fontWeight: 600,
                padding: '8px'
              }}
            >
              Hisobni butunlay o'chirish
            </button>
          </div>
        </div>
      )}

      {/* 2. THEME SELECTOR SCREEN (theme-selector) */}
      {subview === 'theme' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <button onClick={() => setSubview('main')} style={{ color: 'var(--text-secondary)' }}>
                <ArrowLeft size={20} />
              </button>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
                Mavzu
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { id: 'light', title: 'Yorug\'', desc: 'Oq fon va aniq kontrastlar' },
                { id: 'dark', title: 'Qorong\'i', desc: 'Tungi rejimda ko\'zga qulay' }
              ].map(opt => {
                const isSelected = tempTheme === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setTempTheme(opt.id)}
                    style={{
                      padding: '16px 20px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      background: isSelected ? 'var(--primary-50)' : 'var(--bg-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: isSelected ? 'var(--primary)' : 'var(--text-primary)' }}>
                        {opt.title}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {opt.desc}
                      </div>
                    </div>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-strong)'}`,
                      background: isSelected ? 'var(--primary)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFFFFF' }} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleSaveTheme}
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: 'var(--shadow-primary)'
            }}
          >
            Saqlash
          </button>
        </div>
      )}

      {/* 3. DAILY GOAL SELECTOR SCREEN (daily-goal-selector) */}
      {subview === 'goal' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <button onClick={() => setSubview('main')} style={{ color: 'var(--text-secondary)' }}>
                <ArrowLeft size={20} />
              </button>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
                Kunlik maqsad
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { count: 10, title: '10 ta so\'z', badge: 'Yengil', desc: 'Boshlovchilar uchun' },
                { count: 20, title: '20 ta so\'z', badge: 'O\'rtacha', desc: 'Tavsiya etiladi' },
                { count: 30, title: '30 ta so\'z', badge: 'Jiddiy', desc: 'Tez o\'sish' },
                { count: 50, title: '50 ta so\'z', badge: 'Intensiv', desc: 'Maksimal harakat' }
              ].map(opt => {
                const isSelected = tempGoal === opt.count;
                return (
                  <div
                    key={opt.count}
                    onClick={() => setTempGoal(opt.count)}
                    style={{
                      padding: '16px 20px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      background: isSelected ? 'var(--primary-50)' : 'var(--bg-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '15px', fontWeight: 800 }}>{opt.title}</span>
                        <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', background: 'var(--bg-subtle)' }}>
                          {opt.badge}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {opt.desc}
                      </div>
                    </div>
                    {isSelected && <Check size={18} color="var(--primary)" strokeWidth={3} />}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleSaveGoal}
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: 'var(--shadow-primary)'
            }}
          >
            Saqlash
          </button>
        </div>
      )}

      {/* 4. DELETE ACCOUNT CONFIRMATION SCREEN (Exact replica from design!) */}
      {subview === 'delete' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <button onClick={() => setSubview('main')} style={{ color: 'var(--text-secondary)' }}>
                <ArrowLeft size={20} />
              </button>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
                Hisobni o'chirish
              </h2>
            </div>

            {/* Red Alert Box */}
            <div style={{
              borderRadius: 'var(--radius-md)',
              background: 'var(--danger-light)',
              border: '1.5px solid #FECACA',
              padding: '16px',
              marginBottom: '24px',
              display: 'flex',
              gap: '12px'
            }}>
              <AlertTriangle size={24} color="var(--danger)" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--danger)' }}>
                  Hisobingiz butunlay o'chiriladi.
                </div>
                <div style={{ fontSize: '12px', color: 'var(--danger-dark)', marginTop: '2px', lineHeight: 1.4 }}>
                  Bu amalni mutlaqo orqaga qaytarib bo'lmaydi.
                </div>
              </div>
            </div>

            {/* List of deleted items */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
                O'chib ketadigan ma'lumotlar:
              </div>
              <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: 1.8 }}>
                <li>Barcha so'zlaringiz va lug'atingiz</li>
                <li>So'z yodlash va takrorlash tarixi</li>
                <li>Mock test natijalari va natijalar tarixi</li>
              </ul>
            </div>

            {/* Input Confirmation */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Tasdiqlash uchun <strong>"O'CHIRISH"</strong> deb yozing:
              </label>
              <input
                type="text"
                placeholder="O'CHIRISH"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)',
                  fontSize: '15px',
                  fontWeight: 700
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '24px' }}>
            <button
              onClick={handleConfirmDelete}
              disabled={deleteConfirmText.trim().toUpperCase() !== 'O\'CHIRISH'}
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: deleteConfirmText.trim().toUpperCase() === 'O\'CHIRISH' ? 'var(--danger)' : 'var(--bg-subtle)',
                color: deleteConfirmText.trim().toUpperCase() === 'O\'CHIRISH' ? '#FFFFFF' : 'var(--text-tertiary)',
                fontWeight: 700,
                fontSize: '15px',
                cursor: deleteConfirmText.trim().toUpperCase() === 'O\'CHIRISH' ? 'pointer' : 'not-allowed'
              }}
            >
              Hisobni o'chirish
            </button>
            <button
              onClick={() => setSubview('main')}
              style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600, padding: '8px' }}
            >
              Bekor qilish
            </button>
          </div>
        </div>
      )}

      {/* Backup Modal */}
      <BackupModal
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
      />

    </div>
  );
};
