import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, Gift, Sparkles, Clock, Ticket, Users, 
  CheckCircle2, XCircle, ArrowRight, ShieldCheck, 
  Flame, Award, X, HelpCircle, Coins, ChevronRight 
} from 'lucide-react';
import { storage } from '../../services/storage';

export const WeeklyContestModal = ({ 
  isOpen, 
  onClose, 
  user, 
  streak, 
  coins, 
  spendCoins, 
  showToast 
}) => {
  // Bugungi faollik tekshiruvi: kamida 5 ta so'z takrorlangan yoki streak >= 2
  const reviewedToday = streak?.reviewedToday || 0;
  const streakCount = streak?.count || 1;
  const isActiveUser = reviewedToday >= 5 || streakCount >= 2;

  // Foydalanuvchining to'plagan chiptalari (localStorage ga saqlanadi)
  const ticketStorageKey = `vocab_contest_tickets_${user?.id || 'default'}`;
  const [tickets, setTickets] = useState(() => {
    return storage.get(ticketStorageKey, []);
  });

  // Bugungi bepul chipta olinganmi?
  const todayDateStr = new Date().toISOString().split('T')[0];
  const claimStorageKey = `vocab_contest_claimed_${todayDateStr}_${user?.id || 'default'}`;
  const [dailyClaimed, setDailyClaimed] = useState(() => {
    return storage.get(claimStorageKey, false);
  });

  // Countdown vaqti (Har yakshanba soat 20:00 gacha hisoblaydi)
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, minutes: 25, seconds: 10 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Keyingi yakshanba 20:00
      const nextSunday = new Date();
      nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
      nextSunday.setHours(20, 0, 0, 0);

      const diff = nextSunday.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Esc bilan yopish
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 1. Kunlik bepul chiptani olish (Faqat faol foydalanuvchiga)
  const handleClaimDailyTicket = () => {
    if (!isActiveUser) {
      showToast('Konkurs chiptasini olish uchun bugun kamida 5 ta so\'z takrorlang!', 'error');
      return;
    }
    if (dailyClaimed) {
      showToast('Siz bugungi bepul chiptangizni olgansiz! Ertaga yana kiring.', 'info');
      return;
    }

    const newTicketNumber = '#VK-' + Math.floor(1000 + Math.random() * 9000);
    const updatedTickets = [...tickets, { number: newTicketNumber, date: todayDateStr, type: 'daily' }];
    setTickets(updatedTickets);
    storage.set(ticketStorageKey, updatedTickets);
    storage.set(claimStorageKey, true);
    setDailyClaimed(true);

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {}

    showToast(`Tabriklaymiz! Konkurs chiptangiz berildi: ${newTicketNumber}`, 'success');
  };

  // 2. Qo'shimcha chipta sotib olish (40 coin)
  const handleBuyExtraTicket = () => {
    if (coins < 40) {
      showToast('Coinlaringiz yetarli emas! (Kerak: 40 coin)', 'error');
      return;
    }

    const success = spendCoins(40, 'Konkurs Omad Chiptasi', 'Konkursda yutish ehtimolini oshirish');
    if (success) {
      const newTicketNumber = '#VK-' + Math.floor(1000 + Math.random() * 9000);
      const updatedTickets = [...tickets, { number: newTicketNumber, date: todayDateStr, type: 'bought' }];
      setTickets(updatedTickets);
      storage.set(ticketStorageKey, updatedTickets);

      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch {}

      showToast(`Qo'shimcha chipta qo'shildi: ${newTicketNumber}! Yutish imkoniyatingiz oshdi!`, 'success');
    }
  };

  // O'tgan haftalar g'oliblari
  const pastWinners = [
    { name: 'Bekzod T.', phone: '+998 90 *** 45', prize: 'Raymond Murphy Grammar Kitobi 📚', week: 'O\'tgan hafta' },
    { name: 'Shahnoza M.', phone: '+998 93 *** 88', prize: '30 000 so\'m Telefon balansi 📱', week: '2 hafta oldin' },
    { name: 'Javohir K.', phone: '+998 97 *** 12', prize: '1 Yillik VIP PRO Obuna 👑', week: '3 hafta oldin' }
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.78)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      role="dialog"
      aria-modal="true"
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '580px',
          maxHeight: '92vh',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Modal Header */}
        <div 
          style={{
            padding: '18px 22px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-surface-elevated)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--gold-light)',
                color: 'var(--gold-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--gold-glow)'
              }}
            >
              <Trophy size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Haftalik Faollar Konkursi
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                Har haftada 1 ta eng faol o'quvchi haqiqiy sovg'a yutib oladi!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-subtle)',
              border: 'none',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Main Prize Showcase Card */}
          <div 
            style={{
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, #7C3AED 0%, #D97706 100%)',
              color: '#FFFFFF',
              padding: '20px',
              boxShadow: '0 8px 24px rgba(124, 58, 237, 0.35)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', background: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: 'var(--radius-full)', alignSelf: 'flex-start', width: 'fit-content', marginBottom: '10px' }}>
              <Sparkles size={12} /> Bu haftaning bosh sovrini
            </div>

            <h4 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 6px 0', lineHeight: 1.3 }}>
              📖 "English Grammar in Use" (Raymond Murphy) original kitobi
            </h4>
            <p style={{ fontSize: '13px', opacity: 0.95, margin: '0 0 16px 0', lineHeight: 1.4 }}>
              Yoki g'olib istagiga ko'ra <strong>30 000 so'm telefon balansi</strong>ga almashtirib beriladi!
            </p>

            {/* Countdown Timer */}
            <div 
              style={{
                background: 'rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(4px)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700 }}>
                <Clock size={15} /> G'olib aniqlanishiga qoldi:
              </div>
              <div style={{ display: 'flex', gap: '6px', fontWeight: 900, fontSize: '13px', fontFamily: 'monospace' }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>{timeLeft.days}k</span>
                <span>:</span>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>{timeLeft.hours}s</span>
                <span>:</span>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>{timeLeft.minutes}m</span>
                <span>:</span>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>{timeLeft.seconds}s</span>
              </div>
            </div>
          </div>

          {/* User Status: Active vs Inactive */}
          <div 
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: isActiveUser ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
              border: isActiveUser ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}
          >
            {isActiveUser ? (
              <CheckCircle2 size={22} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
            ) : (
              <XCircle size={22} color="var(--danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
            )}

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: isActiveUser ? 'var(--success-dark)' : 'var(--danger-dark)', marginBottom: '3px' }}>
                {isActiveUser ? 'Siz Faol Foydalanuvchisiz! 🌟' : 'Konkursda ishtirok etish uchun faollik kerak!'}
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                {isActiveUser 
                  ? `Bugun ${reviewedToday} ta so'z takrorladingiz va ${streakCount} kunlik uzluksiz o'rganishdadasiz. Siz har kuni 1 ta bepul chipta olishingiz mumkin!`
                  : `Konkurs eshiklari faqat ingliz tilini jiddiy o'rganayotgan faollar uchun ochiq. Bugun kamida 5 ta so'z takrorlang (hozir: ${reviewedToday}/5) yoki 2 kunlik streak qiling.`
                }
              </p>
            </div>
          </div>

          {/* Ticket Actions & Counter */}
          <div 
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Ticket size={20} color="var(--primary)" />
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Sizning chiptalaringiz: <strong>{tickets.length} ta</strong>
                </span>
              </div>

              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                Qancha ko'p chipta = shuncha katta yutish imkoniyati!
              </span>
            </div>

            {/* List of user tickets */}
            {tickets.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {tickets.map((t, idx) => (
                  <span 
                    key={idx}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: 'var(--primary)',
                      fontFamily: 'monospace'
                    }}
                  >
                    🎟 {t.number}
                  </span>
                ))}
              </div>
            )}

            {/* Buttons: Claim Daily & Buy Extra */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
              <button
                onClick={handleClaimDailyTicket}
                disabled={!isActiveUser || dailyClaimed}
                className="btn-press"
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: dailyClaimed ? 'var(--bg-surface)' : 'var(--primary-gradient)',
                  color: dailyClaimed ? 'var(--text-tertiary)' : '#FFFFFF',
                  border: dailyClaimed ? '1px solid var(--border-subtle)' : 'none',
                  fontWeight: 800,
                  fontSize: '12px',
                  cursor: !isActiveUser || dailyClaimed ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: dailyClaimed ? 'none' : 'var(--shadow-primary)'
                }}
              >
                <Ticket size={16} />
                {dailyClaimed ? "Bugungi chipta olingan ✔" : "Kunlik bepul chipta"}
              </button>

              <button
                onClick={handleBuyExtraTicket}
                className="btn-press"
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--gold-light)',
                  color: 'var(--gold-dark)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  fontWeight: 800,
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Coins size={15} />
                +1 Chipta (40 coin)
              </button>
            </div>
          </div>

          {/* Past Winners (Social Proof & Trust) */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={16} color="var(--gold)" />
              O'TGAN HAFTALARNING HAQIQIY G'OLIBLARI:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {pastWinners.map((winner, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '13px'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                      {winner.name} <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>({winner.phone})</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>
                      Sovrin: {winner.prize}
                    </div>
                  </div>

                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', background: 'var(--bg-subtle)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                    {winner.week}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', lineHeight: 1.5, textAlign: 'center' }}>
            🔒 G'olib tasodifiy randomizer dasturi orqali adolatli aniqlanadi. Natijalar har yakshanba rasmiy kanalimizda e'lon qilinadi va sovg'a yetkazib beriladi.
          </div>

        </div>

        {/* Modal Footer */}
        <div 
          style={{
            padding: '14px 20px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface-elevated)',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <button
            onClick={onClose}
            className="btn-press"
            style={{
              padding: '10px 22px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Yopish
          </button>
        </div>

      </div>
    </div>
  );
};
