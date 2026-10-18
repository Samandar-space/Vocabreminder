import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, X, CheckCircle2, Clock, Moon, Sparkles, Send, Play } from 'lucide-react';
import { notificationService } from '../../services/notificationService';

export const NotificationSimulator = ({ isOpen, onClose, onOpenQuickQuiz }) => {
  const { words, notificationSettings, setNotificationSettings, addCoins, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' | 'settings' | 'lockscreen'
  const [wordIndex, setWordIndex] = useState(0);
  
  // Quick question test word strictly from user's words
  const testWord = words && words.length > 0 ? words[wordIndex % words.length] : null;

  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  // Options derived strictly from user's own words
  const quickOptions = React.useMemo(() => {
    if (!testWord) return [];
    const others = words.filter(w => w.id !== testWord.id).map(w => w.translation);
    const shuffledOthers = others.sort(() => 0.5 - Math.random()).slice(0, 3);
    return [testWord.translation, ...shuffledOthers].sort(() => 0.5 - Math.random());
  }, [testWord, words]);

  if (!isOpen) return null;

  const handleNextTestWord = () => {
    setSelectedOption(null);
    setIsCorrect(false);
    setWordIndex(prev => (prev + 1) % words.length);
  };

  const handleSelect = (opt) => {
    if (!testWord || selectedOption) return;
    setSelectedOption(opt);
    const correct = opt === testWord.translation;
    setIsCorrect(correct);
    if (correct) {
      addCoins(5, 'Tezkor savol to\'g\'ri yechildi (+5 coin)');
    }
  };

  const triggerRealPush = async () => {
    if (!notificationService.isSupported()) {
      showToast('Brauzeringiz bildirishnomani qo\'llab-quvvatlamaydi', 'error');
      return;
    }

    const wordToSend = testWord || { id: 'demo', word: 'consistent', translation: 'izchil, barqaror' };
    const success = await notificationService.showWordNotification(wordToSend);
    if (success) {
      showToast('Haqiqiy bildirishnoma telefon/qurilmangizga yuborildi!', 'success');
    } else {
      showToast('Bildirishnomaga ruxsat berilmadi yoki bloklangan', 'info');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.65)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 999
    }}>
      <div 
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'var(--bg-surface)',
          borderTopLeftRadius: 'var(--radius-xl)',
          borderTopRightRadius: 'var(--radius-xl)',
          padding: '24px 20px 32px 20px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
            {activeTab === 'quiz' ? 'Tezkor savol' : activeTab === 'lockscreen' ? 'Push Bildirishnoma' : 'Eslatmalar sozlamalari'}
          </h3>
          <button
            onClick={onClose}
            style={{ padding: '6px', color: 'var(--text-tertiary)', borderRadius: '50%', background: 'var(--bg-subtle)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', background: 'var(--bg-subtle)', padding: '4px', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('quiz')}
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'quiz' ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === 'quiz' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '12px'
            }}
          >
            Tezkor test
          </button>
          <button
            onClick={() => setActiveTab('lockscreen')}
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'lockscreen' ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === 'lockscreen' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '12px'
            }}
          >
            Ekran Push
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'settings' ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === 'settings' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '12px'
            }}
          >
            Vaqtlar
          </button>
        </div>

        {/* 1. TEZKOR SAVOL MODAL */}
        {activeTab === 'quiz' && (
          <div>
            {!testWord ? (
              <div style={{ textAlign: 'center', padding: '36px 12px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--primary-100)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <Sparkles size={32} />
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Lug'atingizda hali so'zlar yo'q
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5, maxWidth: '320px', margin: '0 auto 24px auto' }}>
                  Eslatma va tezkor savollar uchun avval lug'at bo'limiga o'tib, kamida 1 ta so'z qo'shing.
                </p>
                <button
                  onClick={onClose}
                  style={{
                    padding: '12px 28px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--primary-gradient)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '14px'
                  }}
                >
                  Tushundim
                </button>
              </div>
            ) : (
              <div>
                <div style={{
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-subtle)',
                  border: '1.5px solid var(--border-subtle)',
                  padding: '24px 20px',
                  textAlign: 'center',
                  marginBottom: '20px'
                }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                    KUNLIK TAKRORLASH
                  </span>
                  <h2 style={{ fontSize: '30px', fontWeight: 800, color: 'var(--text-primary)', margin: '8px 0 4px 0' }}>
                    {testWord.word}
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    ushbu so'zning to'g'ri tarjimasini tanlang:
                  </p>
                </div>

                {/* 4 Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  {quickOptions.map((opt, i) => {
                    const isSelected = selectedOption === opt;
                    const isThisCorrect = opt === testWord.translation;

                    let border = 'var(--border-subtle)';
                    let bg = 'var(--bg-surface)';
                    let color = 'var(--text-primary)';

                    if (selectedOption) {
                      if (isThisCorrect) {
                        border = 'var(--success)';
                        bg = 'var(--success-light)';
                        color = 'var(--success-dark)';
                      } else if (isSelected && !isThisCorrect) {
                        border = 'var(--danger)';
                        bg = 'var(--danger-light)';
                        color = 'var(--danger)';
                      }
                    }

                    return (
                      <div
                        key={i}
                        onClick={() => handleSelect(opt)}
                        style={{
                          padding: '14px 18px',
                          borderRadius: 'var(--radius-md)',
                          border: `2px solid ${border}`,
                          background: bg,
                          color: color,
                          fontWeight: 600,
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: selectedOption ? 'default' : 'pointer'
                        }}
                      >
                        <span>{opt}</span>
                        {selectedOption && isThisCorrect && <CheckCircle2 size={18} color="var(--success)" />}
                      </div>
                    );
                  })}
                </div>

                {/* Success Motivation text */}
                {selectedOption && isCorrect && (
                  <div style={{ textAlign: 'center', color: 'var(--success-dark)', marginBottom: '16px' }}>
                    <strong style={{ fontSize: '15px' }}>To'g'ri!</strong>
                    <p style={{ fontSize: '13px', marginTop: '2px' }}>
                      Yaxshi natija, xotirangiz mustahkamlanmoqda.
                    </p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px' }}>
                  {words.length > 1 && (
                    <button
                      onClick={handleNextTestWord}
                      style={{
                        flex: 1,
                        padding: '14px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-subtle)',
                        color: 'var(--text-primary)',
                        fontWeight: 700,
                        fontSize: '14px',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      Boshqa so'z
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    style={{
                      flex: 1,
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--primary-gradient)',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '14px',
                      boxShadow: 'var(--shadow-primary)'
                    }}
                  >
                    Yopish
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. LOCKSCREEN NOTIFICATION SIMULATOR */}
        {activeTab === 'lockscreen' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Telefoningiz bloklangan paytda ilovadan quyidagi ko'rinishda interaktiv bildirishnoma keladi:
            </p>

            {/* Simulated Notification Card */}
            <div style={{
              borderRadius: 'var(--radius-lg)',
              background: '#1F2937',
              color: '#FFFFFF',
              padding: '16px',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bell size={10} color="#FFFFFF" />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700 }}>VocabReminder</span>
                </div>
                <span style={{ fontSize: '11px', color: '#9CA3AF' }}>hozirgina</span>
              </div>

              <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '2px' }}>
                Takrorlash vaqti keldi!
              </div>
              <div style={{ fontSize: '13px', color: '#E5E7EB', marginBottom: '14px' }}>
                "{testWord.word}" so'zining ma'nosi nima?
              </div>

              {/* Quick Action buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  onClick={() => { showToast('To\'g\'ri javob belgilandi!', 'success'); onClose(); }}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  {testWord ? testWord.translation : 'To\'g\'ri javob'}
                </button>
                <button
                  onClick={() => { showToast('Noto\'g\'ri javob', 'error'); }}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  {words.length > 1 && words.find(w => w.id !== testWord?.id) ? words.find(w => w.id !== testWord?.id).translation : 'Variant 2'}
                </button>
              </div>
            </div>

            {/* Button to test real browser push */}
            <button
              onClick={triggerRealPush}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-gradient)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-primary)'
              }}
            >
              <Send size={16} /> Haqiqiy push bildirishnomani sinash
            </button>

            {onOpenQuickQuiz && (
              <button
                onClick={() => { onClose(); onOpenQuickQuiz(); }}
                style={{
                  padding: '13px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  color: 'var(--primary)',
                  fontWeight: 700,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: '1.5px solid var(--primary-200)',
                  cursor: 'pointer'
                }}
              >
                <Play size={15} /> 🔲 Kvadrat Tezkor Savol (Ovozli / Yozma)
              </button>
            )}
          </div>
        )}

        {/* 3. NOTIFICATION SETTINGS */}
        {activeTab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)'
            }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Kunlik eslatmalar
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Kun davomida so'zlarni eslatib turish
                </div>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.enabled}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, enabled: e.target.checked }))}
                style={{ width: '20px', height: '20px', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
            </div>

            {/* Intervals */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '8px' }}>
                TAKRORLASH ORALIG'I
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { minutes: 30, label: '30 daqiqa' },
                  { minutes: 60, label: '1 soat' },
                  { minutes: 120, label: '2 soat' },
                  { minutes: 180, label: '3 soat' }
                ].map(item => (
                  <div
                    key={item.minutes}
                    onClick={() => setNotificationSettings(prev => ({ ...prev, intervalMinutes: item.minutes }))}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${notificationSettings.intervalMinutes === item.minutes ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      background: notificationSettings.intervalMinutes === item.minutes ? 'var(--primary-50)' : 'var(--bg-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>{item.label}</span>
                    <input
                      type="radio"
                      checked={notificationSettings.intervalMinutes === item.minutes}
                      readOnly
                      style={{ accentColor: 'var(--primary)' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Quiet Hours */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '8px' }}>
                TINCH VAQT (BEZOVTA QILINMASIN)
              </div>
              <div style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700 }}>Bezovta qilinmasin</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Bu vaqtda eslatmalar yuborilmaydi</div>
                </div>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-surface)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--primary)'
                }}>
                  {notificationSettings.quietStart} — {notificationSettings.quietEnd}
                </span>
              </div>
            </div>

            <button
              onClick={() => { showToast('Sozlamalar saqlandi', 'success'); onClose(); }}
              style={{
                marginTop: '10px',
                padding: '15px',
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

      </div>
    </div>
  );
};
