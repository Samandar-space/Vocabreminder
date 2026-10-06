import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Coins, Gift, Crown, ArrowLeft, Star, 
  Smartphone, CreditCard, BookOpen, CheckCircle2, History, X 
} from 'lucide-react';

export const MarketView = ({ onBack }) => {
  const { user, setUser, coins, spendCoins, orders, addCoins, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('market'); // 'market' | 'tasks' | 'orders'
  const [selectedItem, setSelectedItem] = useState(null);
  const [targetContact, setTargetContact] = useState('');

  // Daily Tasks List (Ways to earn coins)
  const tasks = [
    { id: 'daily_lesson', title: 'Kunlik darsni yakunlash', reward: 10, completed: true },
    { id: 'streak_7', title: '7 kunlik uzluksiz streak', reward: 50, completed: false },
    { id: 'writing_check', title: 'Writing insho tekshirish', reward: 15, completed: false },
    { id: 'referral', title: 'Do\'stingizga tavsiya qilish', reward: 100, completed: false, isReferral: true }
  ];

  // Standard Market Items
  const standardItems = [
    { id: 'stars_50', title: '50 Telegram Stars', cost: 250, icon: Star, type: 'stars', desc: 'Telegram hisobingizga tashlab beriladi' },
    { id: 'balance_5k', title: '5 000 so\'m Telefon balansi', cost: 400, icon: Smartphone, type: 'phone', desc: 'Ucell, Beeline, Mobiuz yoki Uztelecom' },
    { id: 'balance_10k', title: '10 000 so\'m Telefon balansi', cost: 750, icon: Smartphone, type: 'phone', desc: 'Istalgan O\'zbekiston raqamiga' },
    { id: 'card_20k', title: '20 000 so\'m Karta o\'tkazmasi', cost: 1400, icon: CreditCard, type: 'card', desc: 'Uzcard yoki Humo kartangizga' }
  ];

  // VIP PRO Market Items
  const vipItems = [
    { id: 'pro_stars_150', title: '150 Telegram Stars (VIP)', cost: 600, icon: Star, type: 'stars', desc: 'Maxsus arzonlashtirilgan VIP kurs' },
    { id: 'pro_card_50k', title: '50 000 so\'m Karta o\'tkazmasi', cost: 2500, icon: CreditCard, type: 'card', desc: 'To\'g\'ridan-to\'g\'ri bank kartangizga' },
    { id: 'pro_voucher', title: 'IELTS Mock Test Vauchyer', cost: 500, icon: BookOpen, type: 'voucher', desc: 'Haqiqiy imtihon sinov kuponi' }
  ];

  // Redeem Order
  const handleConfirmRedeem = (e) => {
    e.preventDefault();
    if (!targetContact.trim()) {
      showToast('Iltimos, qabul qiluvchi ma\'lumotlarini kiriting!', 'error');
      return;
    }

    const success = spendCoins(selectedItem.cost, selectedItem.title, targetContact);
    if (success) {
      setSelectedItem(null);
      setTargetContact('');
    }
  };

  // Referral Invite Copy
  const handleCopyReferral = () => {
    const inviteLink = `https://t.me/share/url?url=https://vocabreminder.uz?ref=${user.email || 'user'}&text=VocabReminder orqali ingliz tilini o'rganing va coinlar ishlab pul toping!`;
    navigator.clipboard?.writeText(inviteLink);
    addCoins(100, 'Referral taklif qilindi (+100 coin)');
    showToast('Taklif havolasi nusxalandi! Do\'stlaringizga yuboring (+100 coin)', 'success');
  };

  return (
    <div style={{ padding: '20px', minHeight: '85vh', position: 'relative' }}>
      
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <button
          onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}
        >
          <ArrowLeft size={20} /> Orqaga
        </button>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
          Market & Rag'bat
        </h2>
        <button
          onClick={() => setActiveTab('orders')}
          title="Buyurtmalar tarixi"
          style={{ padding: '6px', color: 'var(--text-tertiary)' }}
        >
          <History size={18} />
        </button>
      </div>

      {/* Coin Balance Card (Gold Gradient) */}
      <div style={{
        borderRadius: 'var(--radius-lg)',
        background: 'var(--gold-gradient)',
        color: '#FFFFFF',
        padding: '24px 20px',
        boxShadow: 'var(--gold-glow)',
        marginBottom: '18px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: '12px', opacity: 0.9, fontWeight: 600 }}>Sizning balansingiz</div>
          <div style={{ fontSize: '36px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Coins size={32} />
            <span>{coins}</span>
          </div>
          <div style={{ fontSize: '12px', opacity: 0.85 }}>
            Vazifalar bajarib yana coin to'plang
          </div>
        </div>

        <button
          onClick={() => setActiveTab('tasks')}
          style={{
            padding: '10px 16px',
            borderRadius: 'var(--radius-full)',
            background: '#FFFFFF',
            color: 'var(--gold-dark)',
            fontWeight: 800,
            fontSize: '13px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          + Coin ishlash
        </button>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        background: 'var(--bg-subtle)',
        padding: '4px',
        borderRadius: 'var(--radius-md)',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => setActiveTab('market')}
          style={{
            padding: '8px',
            borderRadius: 'var(--radius-sm)',
            background: activeTab === 'market' ? 'var(--bg-surface)' : 'transparent',
            color: activeTab === 'market' ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '12px'
          }}
        >
          Do'kon
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          style={{
            padding: '8px',
            borderRadius: 'var(--radius-sm)',
            background: activeTab === 'tasks' ? 'var(--bg-surface)' : 'transparent',
            color: activeTab === 'tasks' ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '12px'
          }}
        >
          Vazifalar
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '8px',
            borderRadius: 'var(--radius-sm)',
            background: activeTab === 'orders' ? 'var(--bg-surface)' : 'transparent',
            color: activeTab === 'orders' ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '12px'
          }}
        >
          Buyurtmalar ({orders.length})
        </button>
      </div>

      {/* 1. DO'KON TAB */}
      {activeTab === 'market' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* PRO Upgrade Card */}
          <div style={{
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-gradient)',
            color: '#FFFFFF',
            padding: '16px',
            boxShadow: 'var(--shadow-primary)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px', fontWeight: 800 }}>
                <Crown size={18} color="#FBBF24" />
                <span>{user.isPro ? 'Siz PRO foydalanuvchisiz' : 'PRO Obuna bilan 2x tezroq!'}</span>
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9, marginTop: '2px' }}>
                VIP Market, cheksiz AI tahlil va har bir so'zga 2x ko'p coin.
              </div>
            </div>
            {!user.isPro && (
              <button
                onClick={() => {
                  setUser(prev => ({ ...prev, isPro: true }));
                  showToast('Tabriklaymiz, PRO maqomi faollashtirildi!', 'success');
                }}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: '#FFFFFF',
                  color: 'var(--primary-700)',
                  fontWeight: 800,
                  fontSize: '12px',
                  whiteSpace: 'nowrap'
                }}
              >
                PRO ga o'tish
              </button>
            )}
          </div>

          {/* Standard Items Section */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '10px' }}>
              SOVG'ALAR (ODDIY FOYDALANUVCHILAR UCHUN)
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              {standardItems.map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-sm)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'var(--gold-light)',
                        color: 'var(--gold-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--gold-light)',
                      color: 'var(--gold-dark)',
                      fontWeight: 800,
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Coins size={14} />
                      <span>{item.cost}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* VIP PRO Market Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px', marginBottom: '10px' }}>
              <Crown size={16} />
              <span>👑 VIP PRO MARKET (MAXSUS SOVRINLAR)</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              {vipItems.map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (!user.isPro) {
                        showToast('VIP Market faqat PRO obunachilar uchun!', 'info');
                      } else {
                        setSelectedItem(item);
                      }
                    }}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-surface)',
                      border: '1.5px solid var(--primary-200)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-sm)',
                      cursor: 'pointer',
                      opacity: user.isPro ? 1 : 0.8
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'var(--primary-100)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--primary-100)',
                      color: 'var(--primary)',
                      fontWeight: 800,
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Coins size={14} />
                      <span>{item.cost}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* 2. VAZIFALAR TAB (Earn Coins) */}
      {activeTab === 'tasks' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Vazifalarni bajaring va har kuni o'z mehnatingiz bilan coin to'plang:
          </div>

          {tasks.map(task => (
            <div
              key={task.id}
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {task.title}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--gold-dark)', fontWeight: 700 }}>
                  +{task.reward} coin
                </div>
              </div>

              {task.isReferral ? (
                <button
                  onClick={handleCopyReferral}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gold-gradient)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '12px',
                    boxShadow: 'var(--gold-glow)'
                  }}
                >
                  Ulashish
                </button>
              ) : task.completed ? (
                <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={16} /> Bajarildi
                </span>
              ) : (
                <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                  Jarayonda
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 3. BUYURTMALAR TAB (Orders History) */}
      {activeTab === 'orders' && (
        <div className="animate-fade">
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
              Hozircha buyurtmalar yo'q. Coin to'plab sovg'alar buyurtma qiling!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {orders.map(ord => (
                <div
                  key={ord.id}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800 }}>{ord.item}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                      {ord.date} — {ord.details}
                    </div>
                  </div>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gold-light)',
                    color: 'var(--gold-dark)',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {ord.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* REDEEM CONFIRMATION MODAL */}
      {selectedItem && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div 
            className="animate-slide-up"
            style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              width: '100%',
              maxWidth: '360px',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Sovg'ani olish</h3>
              <button onClick={() => setSelectedItem(null)} style={{ color: 'var(--text-tertiary)' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>
                {selectedItem.title}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Narxi: <strong>{selectedItem.cost} coin</strong>
              </div>
            </div>

            <form onSubmit={handleConfirmRedeem} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  {selectedItem.type === 'stars' ? 'Telegram @username kiriting:' : selectedItem.type === 'card' ? 'Uzcard / Humo karta raqamingiz:' : 'Telefon raqamingiz (+998...):'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={selectedItem.type === 'stars' ? '@username' : selectedItem.type === 'card' ? '8600 0000 0000 0000' : '+998 90 123 45 67'}
                  value={targetContact}
                  onChange={(e) => setTargetContact(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--border-subtle)',
                    background: 'var(--bg-subtle)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
                Buyurtmangiz administratorga yuboriladi va tez orada hisobingizga o'tkazib beriladi.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', fontWeight: 600 }}
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--gold-gradient)', color: '#FFFFFF', fontWeight: 800, boxShadow: 'var(--gold-glow)' }}
                >
                  Tasdiqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
