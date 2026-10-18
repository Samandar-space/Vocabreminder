import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { storage } from '../../services/storage';
import confetti from 'canvas-confetti';
import { 
  Coins, Gift, Crown, ArrowLeft, Star, 
  Smartphone, BookOpen, CheckCircle2, History, X, 
  ShieldCheck, FileText, Award, Sparkles, Trophy, 
  Flame, Download, Palette, Lock
} from 'lucide-react';
import { WeeklyContestModal } from './WeeklyContestModal';

export const MarketView = ({ onBack }) => {
  const { user, setUser, coins, spendCoins, orders, addCoins, showToast, streak } = useApp();

  const [activeTab, setActiveTab] = useState('market'); // 'market' | 'contest' | 'tasks' | 'orders'
  const [selectedItem, setSelectedItem] = useState(null);
  const [targetContact, setTargetContact] = useState('');
  const [isContestModalOpen, setIsContestModalOpen] = useState(false);
  const [purchasedPdfModal, setPurchasedPdfModal] = useState(null);

  const [referralClaimed, setReferralClaimed] = useState(() => {
    return storage.get(`vocab_referral_claimed_${user.id || 'default'}`, false);
  });

  // Daily Tasks List (Ways to earn coins - balanced)
  const tasks = [
    { id: 'daily_lesson', title: 'Kunlik darsni yakunlash', reward: 5, completed: true },
    { id: 'streak_7', title: '7 kunlik uzluksiz streak', reward: 25, completed: (streak?.count || 1) >= 7 },
    { id: 'writing_check', title: 'Writing insho tekshirish', reward: 10, completed: false },
    { id: 'grammar_quiz', title: 'Grammatika mavzusini o\'rganish', reward: 5, completed: false },
    { id: 'referral', title: 'Do\'stingizga tavsiya qilish', reward: 30, completed: referralClaimed, isReferral: true }
  ];

  // 1. DIGITAL IN-APP PERKS (0 so'm xarajat, yuqori qiymat)
  const digitalPerks = [
    { 
      id: 'shield_freeze', 
      title: '🛡️ Streak Freeze (Muzlatgich)', 
      cost: 350, 
      icon: ShieldCheck, 
      type: 'freeze', 
      badge: 'Eng ommabop',
      badgeColor: '#10B981',
      desc: '1 kun dars qila olmasangiz ham, to\'plagan streak-ingiz kuyib ketmaydi' 
    },
    { 
      id: 'pro_sub_7d', 
      title: '👑 7 Kunlik VIP PRO Obuna', 
      cost: 1200, 
      icon: Crown, 
      type: 'pro', 
      badge: 'Super Taklif',
      badgeColor: '#7C3AED',
      desc: 'Writing AI limitsiz tekshiruv, audio ovozlar va VIP nishon' 
    },
    { 
      id: 'gold_avatar_theme', 
      title: '✨ Oltin Toj Profil Ramkasi', 
      cost: 500, 
      icon: Palette, 
      type: 'theme', 
      desc: 'Profilingiz uchun oltin toj va VIP binafsha kiberpank ramkasi' 
    }
  ];

  // 2. EXCLUSIVE EDUCATIONAL VAULT (PDF kitoblar va sertifikatlar)
  const educationalItems = [
    { 
      id: 'vault_ielts_8', 
      title: '📚 IELTS Band 8+ Vocabulary Vault', 
      cost: 800, 
      icon: BookOpen, 
      type: 'pdf', 
      badge: 'PDF Kitob',
      badgeColor: '#F59E0B',
      desc: '1000 ta saralangan akademik so\'z, kollokatsiyalar va insho namunalari' 
    },
    { 
      id: 'vault_oxford_3k', 
      title: '📑 Oxford 3000 eng muhim so\'zlar', 
      cost: 600, 
      icon: FileText, 
      type: 'pdf', 
      desc: 'Ingliz tilida eng ko\'p ishlatiladigan 3000 ta so\'zning to\'liq lug\'ati' 
    },
    { 
      id: 'cefr_certificate_qr', 
      title: '🎓 Shaxsiy CEFR Diplomi (QR-kodli)', 
      cost: 1500, 
      icon: Award, 
      type: 'cert', 
      desc: 'Ilova nomidan darajangizni tasdiqlovchi rasmiy PDF elektron sertifikat' 
    }
  ];

  // 3. ULTRA-HARD REAL SOVRIN (Faqat 1 ta, qimmat marra)
  const realPrizeItems = [
    { 
      id: 'balance_5k_hard', 
      title: '📱 5 000 so\'m Telefon balansi', 
      cost: 4500, 
      icon: Smartphone, 
      type: 'phone', 
      badge: 'Oylik Marraga yetganlarga',
      badgeColor: '#EC4899',
      desc: 'Ucell, Beeline, Mobiuz yoki Uztelecom raqamingiz hisobiga tushirib beriladi' 
    }
  ];

  // Redeem Order
  const handleConfirmRedeem = (e) => {
    e.preventDefault();

    // Instant digital perks
    if (selectedItem.type === 'pro') {
      const success = spendCoins(selectedItem.cost, selectedItem.title, 'VIP PRO faollashtirildi');
      if (success) {
        setUser(prev => ({ ...prev, isPro: true }));
        try { confetti({ particleCount: 60, spread: 70 }); } catch {}
        showToast('Tabriklaymiz! 7 kunlik VIP PRO faollashtirildi!', 'success');
        setSelectedItem(null);
      }
      return;
    }

    if (selectedItem.type === 'freeze') {
      const success = spendCoins(selectedItem.cost, selectedItem.title, 'Streak Freeze xarid qilindi');
      if (success) {
        const currentFreezes = storage.get(`vocab_freezes_${user.id || 'default'}`, 0);
        storage.set(`vocab_freezes_${user.id || 'default'}`, currentFreezes + 1);
        try { confetti({ particleCount: 40 }); } catch {}
        showToast('Uzluksizlik Muzlatgichi (Streak Freeze) qo\'shildi!', 'success');
        setSelectedItem(null);
      }
      return;
    }

    if (selectedItem.type === 'pdf') {
      const success = spendCoins(selectedItem.cost, selectedItem.title, 'PDF material xarid qilindi');
      if (success) {
        setSelectedItem(null);
        setPurchasedPdfModal(selectedItem);
        try { confetti({ particleCount: 50 }); } catch {}
        showToast(`"${selectedItem.title}" muvaffaqiyatli xarid qilindi!`, 'success');
      }
      return;
    }

    if (selectedItem.type === 'theme') {
      const success = spendCoins(selectedItem.cost, selectedItem.title, 'Oltin toj profil ramkasi');
      if (success) {
        storage.set(`vocab_avatar_frame_${user.id || 'default'}`, 'gold_crown');
        showToast('Oltin Toj ramkasi profilingizga o\'rnatildi!', 'success');
        setSelectedItem(null);
      }
      return;
    }

    // Phone balance requires phone number
    if (selectedItem.type === 'phone' || selectedItem.type === 'cert') {
      if (!targetContact.trim()) {
        showToast('Iltimos, ma\'lumotlarni kiriting!', 'error');
        return;
      }

      const success = spendCoins(selectedItem.cost, selectedItem.title, targetContact);
      if (success) {
        setSelectedItem(null);
        setTargetContact('');
      }
    }
  };

  // Referral Invite Copy (Bonus awarded only once)
  const handleCopyReferral = () => {
    const inviteLink = `https://t.me/share/url?url=https://vocabreminder.uz?ref=${user.email || 'user'}&text=VocabReminder orqali ingliz tilini o'rganing va haftalik konkurslarda kitoblar yutib oling!`;
    navigator.clipboard?.writeText(inviteLink);
    
    if (!referralClaimed) {
      addCoins(30, 'Referral taklif qilindi (+30 coin)');
      storage.set(`vocab_referral_claimed_${user.id || 'default'}`, true);
      setReferralClaimed(true);
      showToast('Taklif havolasi nusxalandi! Do\'stlaringizga yuboring (+30 coin)', 'success');
    } else {
      showToast('Taklif havolasi nusxalandi! Do\'stlaringizga ulashing.', 'info');
    }
  };

  return (
    <div style={{ padding: '20px', minHeight: '85vh', maxWidth: '840px', margin: '0 auto', position: 'relative' }}>
      
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <button
          onClick={onBack}
          className="btn-press"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <ArrowLeft size={20} /> Orqaga
        </button>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
          Bozor & Rag'bat
        </h2>
        <button
          onClick={() => setActiveTab('orders')}
          title="Buyurtmalar tarixi"
          style={{ padding: '6px', color: 'var(--text-tertiary)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <History size={18} />
        </button>
      </div>

      {/* Coin Balance Card (Gold Gradient) */}
      <div style={{
        borderRadius: 'var(--radius-lg)',
        background: 'var(--gold-gradient)',
        color: '#FFFFFF',
        padding: '22px 20px',
        boxShadow: 'var(--gold-glow)',
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ fontSize: '12px', opacity: 0.9, fontWeight: 600 }}>Sizning balansingiz</div>
          <div style={{ fontSize: '34px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Coins size={30} />
            <span>{coins}</span>
          </div>
          <div style={{ fontSize: '12px', opacity: 0.85 }}>
            Darslar va takrorlash orqali halol coin to'plang
          </div>
        </div>

        <button
          onClick={() => setActiveTab('tasks')}
          className="btn-press"
          style={{
            padding: '10px 18px',
            borderRadius: 'var(--radius-full)',
            background: '#FFFFFF',
            color: 'var(--gold-dark)',
            border: 'none',
            fontWeight: 800,
            fontSize: '13px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            cursor: 'pointer'
          }}
        >
          + Coin ishlash
        </button>
      </div>

      {/* EXCLUSIVE VIRAL CONTEST BANNER */}
      <div 
        onClick={() => setIsContestModalOpen(true)}
        className="btn-press"
        style={{
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, #7C3AED 0%, #D97706 100%)',
          color: '#FFFFFF',
          padding: '16px 20px',
          boxShadow: '0 6px 20px rgba(124, 58, 237, 0.3)',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div 
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Trophy size={24} color="#FBBF24" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, background: 'rgba(0,0,0,0.25)', padding: '2px 8px', borderRadius: 'var(--radius-full)', textTransform: 'uppercase' }}>
                Haftalik Konkurs 🔥
              </span>
              <span style={{ fontSize: '12px', opacity: 0.9 }}>Barcha faol o'quvchilar uchun!</span>
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, marginTop: '2px' }}>
              "English Grammar in Use" kitobi yoki 30 000 so'm sovg'a!
            </div>
          </div>
        </div>

        <button 
          style={{
            padding: '8px 14px',
            borderRadius: 'var(--radius-full)',
            background: '#FFFFFF',
            color: 'var(--primary)',
            fontWeight: 800,
            fontSize: '12px',
            border: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          Ishtirok etish 🎟
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
            border: 'none',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer'
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
            border: 'none',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer'
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
            border: 'none',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          Buyurtmalar ({orders.length})
        </button>
      </div>

      {/* 1. DO'KON TAB */}
      {activeTab === 'market' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* SECTION 1: IN-APP DIGITAL PERKS */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={15} color="var(--primary)" />
              ILOVADA ISHLATILADIGAN QULAYLIKLAR (DIGITAL PERKS)
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              {digitalPerks.map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="btn-press"
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-sm)',
                      cursor: 'pointer',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'rgba(124, 58, 237, 0.1)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {item.title}
                          </span>
                          {item.badge && (
                            <span style={{ fontSize: '10px', fontWeight: 800, color: item.badgeColor, background: `${item.badgeColor}15`, padding: '2px 6px', borderRadius: 'var(--radius-sm)' }}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--gold-light)',
                      color: 'var(--gold-dark)',
                      fontWeight: 800,
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      flexShrink: 0
                    }}>
                      <Coins size={14} />
                      <span>{item.cost}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: EXCLUSIVE EDUCATIONAL VAULT */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={15} color="var(--gold-dark)" />
              EKSKLYUZIV TA'LIMIY TO'PLAMLAR & SERTIFIKATLAR
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              {educationalItems.map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="btn-press"
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-sm)',
                      cursor: 'pointer',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'rgba(245, 158, 11, 0.12)',
                        color: 'var(--gold-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {item.title}
                          </span>
                          {item.badge && (
                            <span style={{ fontSize: '10px', fontWeight: 800, color: item.badgeColor, background: `${item.badgeColor}15`, padding: '2px 6px', borderRadius: 'var(--radius-sm)' }}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--gold-light)',
                      color: 'var(--gold-dark)',
                      fontWeight: 800,
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      flexShrink: 0
                    }}>
                      <Coins size={14} />
                      <span>{item.cost}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: ULTRA-HARD REAL PRIZES */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Flame size={15} color="#EC4899" />
              KATTA MEHNAT MEVALARI (HAQIQIY SOVRINLAR)
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              {realPrizeItems.map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="btn-press"
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-surface)',
                      border: '1.5px solid rgba(236, 72, 153, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-sm)',
                      cursor: 'pointer',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'rgba(236, 72, 153, 0.1)',
                        color: '#EC4899',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                            {item.title}
                          </span>
                          {item.badge && (
                            <span style={{ fontSize: '10px', fontWeight: 800, color: item.badgeColor, background: `${item.badgeColor}15`, padding: '2px 6px', borderRadius: 'var(--radius-sm)' }}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(236, 72, 153, 0.12)',
                      color: '#EC4899',
                      fontWeight: 800,
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      flexShrink: 0
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                  className="btn-press"
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gold-gradient)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '12px',
                    boxShadow: 'var(--gold-glow)',
                    cursor: 'pointer'
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
        <div>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
              Hozircha buyurtmalar yo'q. Coin to'plab sovg'alar xarid qiling!
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
                    background: ord.status === 'Bajarildi' ? 'var(--success-light)' : 'var(--gold-light)',
                    color: ord.status === 'Bajarildi' ? 'var(--success-dark)' : 'var(--gold-dark)',
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
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div 
            style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              width: '100%',
              maxWidth: '380px',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Sovg'ani olish</h3>
              <button onClick={() => setSelectedItem(null)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>
                {selectedItem.title}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Narxi: <strong>{selectedItem.cost} coin</strong> (Balansingizda: {coins} coin)
              </div>
            </div>

            <form onSubmit={handleConfirmRedeem} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Only ask contact for phone balance and certificate */}
              {selectedItem.type === 'phone' && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Telefon raqamingiz (+998...):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+998 90 123 45 67"
                    value={targetContact}
                    onChange={(e) => setTargetContact(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--border-subtle)',
                      background: 'var(--bg-subtle)',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              )}

              {selectedItem.type === 'cert' && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Sertifikatda yoziladigan to'liq ism-familiyangiz:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Sardor Karimov"
                    value={targetContact}
                    onChange={(e) => setTargetContact(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--border-subtle)',
                      background: 'var(--bg-subtle)',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              )}

              {(selectedItem.type === 'pro' || selectedItem.type === 'freeze' || selectedItem.type === 'pdf' || selectedItem.type === 'theme') && (
                <div style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--primary-50)', color: 'var(--primary)', fontSize: '12px', lineHeight: 1.45 }}>
                  ⚡ Ushbu sovg'a sotib olinishi bilanoq darhol profilingizda faollashadi!
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="btn-press"
                  style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="btn-press"
                  style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--gold-gradient)', color: '#FFFFFF', border: 'none', fontWeight: 800, boxShadow: 'var(--gold-glow)', cursor: 'pointer' }}
                >
                  Tasdiqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF VAULT DOWNLOAD VIEWER MODAL */}
      {purchasedPdfModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001,
          padding: '20px'
        }}>
          <div 
            style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              width: '100%',
              maxWidth: '440px',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center'
            }}
          >
            <div 
              style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--gold-light)',
                color: 'var(--gold-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px auto'
              }}
            >
              <BookOpen size={28} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              {purchasedPdfModal.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '18px' }}>
              To'plam muvaffaqiyatli xarid qilindi! Ushbu material doimiy profilingizda saqlanadi. Uni bemalol ochib o'rganishingiz mumkin.
            </p>

            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', marginBottom: '18px', fontSize: '12px', color: 'var(--text-primary)', textAlign: 'left', lineHeight: 1.6 }}>
              <strong>To'plam ichida:</strong><br />
              • Eng ko'p uchraydigan 1000 ta akademik so'z va kollokatsiyalar<br />
              • IELTS insholari uchun tayyor grammatik konstruksiyalar<br />
              • O'zbekcha sharhlar va misollar
            </div>

            <button
              onClick={() => {
                showToast('Material ochilmoqda...', 'info');
                setPurchasedPdfModal(null);
              }}
              className="btn-press"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-gradient)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Download size={18} /> Qo'llanmani o'qish (PDF)
            </button>
          </div>
        </div>
      )}

      {/* WEEKLY CONTEST MODAL */}
      <WeeklyContestModal
        isOpen={isContestModalOpen}
        onClose={() => setIsContestModalOpen(false)}
        user={user}
        streak={streak}
        coins={coins}
        spendCoins={spendCoins}
        showToast={showToast}
      />

    </div>
  );
};
