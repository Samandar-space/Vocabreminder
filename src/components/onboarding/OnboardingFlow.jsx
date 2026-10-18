import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Check, Sparkles } from 'lucide-react';

export const OnboardingFlow = ({ onFinish }) => {
  const [step, setStep] = useState(1);
  const { user, updateUserProfile, showToast } = useApp();

  const [selectedGoal, setSelectedGoal] = useState(user.goal || 'cefr');
  const [selectedDaily, setSelectedDaily] = useState(user.dailyGoal || 20);
  const [notificationsAllowed, setNotificationsAllowed] = useState(true);

  // Step 1: Goals
  const goals = [
    {
      id: 'ielts',
      title: 'IELTS imtihoni',
      desc: 'Akademik yoki umumiy imtihon maqsadlari uchun (Band 0-9)'
    },
    {
      id: 'cefr',
      title: 'CEFR daraja olish',
      desc: 'B1, B2 yoki C1 sertifikati talablari va 4 ta mezon doirasida'
    },
    {
      id: 'general',
      title: 'Umumiy ingliz tili',
      desc: 'Kundalik muloqot va so\'z boyligini kengaytirish'
    }
  ];

  // Step 2: Daily Targets
  const dailyOptions = [
    { count: 10, time: 'Kuniga 5 daqiqa', badge: 'Yengil' },
    { count: 20, time: 'Kuniga 10 daqiqa', badge: 'O\'rtacha' },
    { count: 30, time: 'Kuniga 15 daqiqa', badge: 'Jiddiy' },
    { count: 50, time: 'Kuniga 25 daqiqa', badge: 'Intensiv' }
  ];

  // Request native browser notifications if supported
  const enableNotifications = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          showToast('Eslatmalar muvaffaqiyatli yoqildi!', 'success');
        } else {
          showToast('Bildirishnomalar taqiqlandi (Sozlamalardan yoqishingiz mumkin)', 'info');
        }
      });
    }
    finishOnboarding();
  };

  const finishOnboarding = () => {
    updateUserProfile({
      goal: selectedGoal,
      dailyGoal: selectedDaily,
      isOnboarded: true
    });
    showToast('Dastur sizning maqsadingizga moslashtirildi!', 'success');
    onFinish();
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 24px 32px 24px',
      background: 'var(--bg-surface)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      {/* Top 3-dot step indicators */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
          {[1, 2, 3].map(i => (
            <div
              key={i}
              style={{
                width: step === i ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: step === i ? 'var(--primary)' : 'var(--border-strong)',
                transition: 'all var(--transition-fast)'
              }}
            />
          ))}
        </div>

        {/* STEP 1: Maqsadingiz nima? */}
        {step === 1 && (
          <div className="animate-fade">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Maqsadingiz nima?
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Biz sizga mos dasturni yaratishimiz uchun tanlang
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {goals.map(g => {
                const isSelected = selectedGoal === g.id;
                return (
                  <div
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      background: isSelected ? 'var(--primary-50)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: isSelected ? 'var(--primary)' : 'var(--text-primary)', marginBottom: '4px' }}>
                        {g.title}
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {g.desc}
                      </div>
                    </div>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-strong)'}`,
                      background: isSelected ? 'var(--primary)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginLeft: '12px'
                    }}>
                      {isSelected && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Kunlik maqsad */}
        {step === 2 && (
          <div className="animate-fade">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Kunlik maqsad
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Har kuni yangi so'zlarni takrorlash me'yorini belgilang
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {dailyOptions.map(opt => {
                const isSelected = selectedDaily === opt.count;
                return (
                  <div
                    key={opt.count}
                    onClick={() => setSelectedDaily(opt.count)}
                    style={{
                      padding: '16px 20px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      background: isSelected ? 'var(--primary-50)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: isSelected ? 'var(--primary)' : 'var(--text-primary)' }}>
                        {opt.count} ta so'z
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                        {opt.time}
                      </div>
                    </div>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      background: isSelected ? 'var(--primary)' : 'var(--bg-subtle)',
                      color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                      fontSize: '12px',
                      fontWeight: 700
                    }}>
                      {opt.badge}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Eslatmalar */}
        {step === 3 && (
          <div className="animate-fade" style={{ textAlign: 'center' }}>
            <div style={{
              width: '88px',
              height: '88px',
              borderRadius: '50%',
              background: 'var(--primary-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '20px auto 24px auto'
            }}>
              <Bell size={42} color="var(--primary)" />
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Eslatmalar
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px', maxWidth: '300px', margin: '0 auto 28px auto' }}>
              Yangi so'zlarni muntazam takrorlab turishni unutmang
            </p>

            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              textAlign: 'left',
              marginBottom: '20px'
            }}>
              💡 <strong>Kun davomida tasodifiy savollar yuboramiz</strong> — Telegram yoki Instagram ko'rayotganingizda ham bir chimdim so'z o'rganasiz.
            </div>
          </div>
        )}
      </div>

      {/* Bottom navigation buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', marginTop: '24px' }}>
        {step < 3 ? (
          <>
            <button
              onClick={() => setStep(step + 1)}
              style={{
                padding: '15px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-gradient)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '15px',
                boxShadow: 'var(--shadow-primary)'
              }}
            >
              Keyingisi
            </button>
            <button
              onClick={() => setStep(step + 1)}
              style={{
                color: 'var(--text-tertiary)',
                fontSize: '14px',
                fontWeight: 600,
                padding: '8px'
              }}
            >
              O'tkazib yuborish
            </button>
          </>
        ) : (
          <>
            <button
              onClick={enableNotifications}
              style={{
                padding: '15px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-gradient)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '15px',
                boxShadow: 'var(--shadow-primary)'
              }}
            >
              Eslatmalarni yoqish
            </button>
            <button
              onClick={finishOnboarding}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
                fontWeight: 600,
                padding: '8px'
              }}
            >
              Keyinroq
            </button>
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textAlign: 'center' }}>
              Xohlagan vaqtingizda sozlamalardan o'zgartirishingiz mumkin.
            </span>
          </>
        )}
      </div>
    </div>
  );
};
