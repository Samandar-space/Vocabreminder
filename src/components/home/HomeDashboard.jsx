import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  RotateCw, Plus, CheckCircle2, Flame, Award, 
  PenTool, BookOpen, BarChart3, GraduationCap, 
  Gamepad2, Gift, ChevronRight, AlertTriangle, 
  Sparkles, Zap, Trophy, Coins, Target 
} from 'lucide-react';

export const HomeDashboard = ({ onOpenAddModal, onStartReview, onStartMiniTest, onStartQuickQuiz }) => {
  const { user, words, streak, setCurrentTab, coins } = useApp();

  // Words due for Leitner review
  const dueWords = words.filter(w => new Date(w.nextReviewDate) <= new Date());
  const dueCount = dueWords.length;

  // Stats
  const totalReviewed = words.reduce((acc, w) => acc + (w.reviewCount || 0), 0);
  const totalCorrect = words.reduce((acc, w) => acc + (w.correctCount || 0), 0);
  const accuracy = totalReviewed > 0 ? Math.round((totalCorrect / totalReviewed) * 100) : 100;
  const targetWords = user.dailyGoal || 20;
  const todayReviewed = streak?.reviewedToday || 0;
  const progressPercent = targetWords > 0 
    ? Math.min(100, Math.round((todayReviewed / targetWords) * 100))
    : 0;

  // Leitner Boxes Distribution
  const boxCounts = [1, 2, 3, 4, 5].map(boxNum => words.filter(w => (w.box || 1) === boxNum).length);

  // Daily Quests items
  const quests = [
    { title: 'Yangi so\'z qo\'shish', reward: '+5 coin', completed: words.length > 0 },
    { title: 'Oraliq takrorlash qilish', reward: '+10 coin', completed: totalReviewed > 0 },
    { title: 'O\'yinlar zonasida o\'ynash', reward: '+25 coin', completed: false },
    { title: 'Writing insho tekshirish', reward: '+15 coin', completed: false }
  ];

  return (
    <div className="dashboard-content" style={{ padding: '20px 24px 80px 24px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* 1. WELCOME EMPTY VOCAB HERO BANNER (When user has 0 words) */}
      {words.length === 0 && (
        <div style={{
          padding: '24px',
          borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%)',
          border: '1.5px dashed var(--primary-500)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: 'var(--shadow-primary)'
          }}>
            <Sparkles size={28} />
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
              VocabReminder ga xush kelibsiz!
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.5 }}>
              Bu yerda faqat <strong>siz o'rganmoqchi bo'lgan shaxsiy so'zlar</strong> saqlanadi. 
              Birinchi so'zingizni qo'shing yoki quyidagi tayyor interaktiv sinov bo'limlarini o'rganing!
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '4px' }}>
            <button
              onClick={onOpenAddModal}
              style={{
                padding: '12px 24px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary-gradient)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-primary)'
              }}
            >
              <Plus size={18} strokeWidth={2.5} /> Birinchi so'zni qo'shish
            </button>

            <button
              onClick={() => setCurrentTab('levelTest')}
              style={{
                padding: '12px 20px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <BarChart3 size={16} color="var(--primary)" /> Daraja testini topshirish
            </button>
          </div>
        </div>
      )}

      {/* 2. HERO PROGRESS CARD (Bugungi Maqsad & Takrorlash) */}
      <div style={{
        borderRadius: 'var(--radius-xl)',
        background: 'var(--primary-gradient)',
        color: '#FFFFFF',
        padding: '24px 28px',
        boxShadow: 'var(--shadow-primary)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          right: '120px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.06)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', opacity: 0.9, fontWeight: 600 }}>
                Bugungi Maqsad ({user.level || 'B1'})
              </span>
              <span style={{
                fontSize: '10px',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.2)',
                fontWeight: 800
              }}>
                {user.goal === 'ielts' ? 'IELTS REJIMI' : 'CEFR REJIMI'}
              </span>
            </div>

            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '30px', fontWeight: 900, marginBottom: '16px' }}>
              {words.length === 0 ? '0 / 20 so\'z' : `${words.length - dueCount} / ${words.length} so'z`}
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={words.length === 0 ? onOpenAddModal : onStartReview}
                style={{
                  padding: '10px 22px',
                  background: '#FFFFFF',
                  color: 'var(--primary-700)',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 800,
                  fontSize: '13px',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {words.length === 0 ? (
                  <>
                    <Plus size={16} /> So'z qo'shish
                  </>
                ) : dueCount > 0 ? (
                  <>
                    <RotateCw size={16} /> Takrorlashni boshlash ({dueCount})
                  </>
                ) : (
                  <>
                    <RotateCw size={16} /> Qayta takrorlash
                  </>
                )}
              </button>

              {words.length >= 2 && (
                <button
                  onClick={onStartMiniTest}
                  style={{
                    padding: '10px 18px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: '#FFFFFF',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700,
                    fontSize: '13px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Award size={16} /> Tezkor test
                </button>
              )}

              {words.length >= 1 && onStartQuickQuiz && (
                <button
                  onClick={onStartQuickQuiz}
                  style={{
                    padding: '10px 18px',
                    background: 'rgba(255, 255, 255, 0.22)',
                    color: '#FFFFFF',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700,
                    fontSize: '13px',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Sparkles size={16} /> 🔲 Kvadrat Tezkor Savol
                </button>
              )}
            </div>
          </div>

          {/* Progress Circular Widget */}
          <div style={{
            position: 'relative',
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            background: `conic-gradient(#FFFFFF ${progressPercent * 3.6}deg, rgba(255, 255, 255, 0.25) 0deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'var(--primary-600)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900
            }}>
              <span style={{ fontSize: '16px' }}>{progressPercent}%</span>
              <span style={{ fontSize: '9px', opacity: 0.8, textTransform: 'uppercase' }}>Bajarildi</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DUE REVIEWS BANNER (If words are due) */}
      {dueCount > 0 && (
        <div
          onClick={onStartReview}
          style={{
            padding: '14px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--gold-light)',
            border: '1.5px solid rgba(245, 158, 11, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#F59E0B20',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertTriangle size={20} color="#D97706" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--gold-dark)' }}>
                {dueCount} ta so'z oraliq takrorlashga tayyor!
              </div>
              <div style={{ fontSize: '12px', color: 'var(--gold-dark)', opacity: 0.85 }}>
                Leitner tizimi bo'yicha mustahkamlab oling
              </div>
            </div>
          </div>
          <button style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--gold-dark)',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '12px'
          }}>
            Takrorlash
          </button>
        </div>
      )}

      {/* 4. STATS 4-GRID (Desktop & Laptop layout) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '12px'
      }}>
        {/* Total Words */}
        <div style={{
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <BookOpen size={16} color="var(--primary)" />
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 600 }}>So'zlar</span>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)' }}>
            {words.length}
          </div>
        </div>

        {/* Reviewed */}
        <div style={{
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <RotateCw size={16} color="#8B5CF6" />
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Takrorlandi</span>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)' }}>
            {totalReviewed}
          </div>
        </div>

        {/* Accuracy */}
        <div style={{
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <CheckCircle2 size={16} color="var(--success)" />
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Aniqlik</span>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)' }}>
            {accuracy}%
          </div>
        </div>

        {/* Streak */}
        <div style={{
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Flame size={16} color="var(--danger)" />
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 600 }}>Streak</span>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--danger)' }}>
            {streak.count} kun
          </div>
        </div>
      </div>

      {/* 5. ALL CORE MODULES (PROMINENT CARDS - MOCK, GAMES, MARKET, WRITING, READING, GRAMMAR) */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '14px'
        }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Asosiy Bo'limlar & Imkoniyatlar
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
              O'rganish, imtihon sinovlari va o'yinlar
            </span>
          </div>
        </div>

        {/* Multi-column grid on desktop/laptop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '14px'
        }}>
          {/* 1. MOCK TESTLAR (HOT) */}
          <div
            onClick={() => setCurrentTab('mock')}
            className="card-interactive btn-press"
            style={{
              padding: '18px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border-subtle)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '130px',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#EF444415',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Award size={24} />
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--danger-light)',
                color: 'var(--danger)'
              }}>
                60 daqiqa
              </span>
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2px' }}>
                Mock Testlar
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                IELTS & CEFR standartidagi to'liq sinov imtihoni
              </div>
            </div>
          </div>

          {/* 2. O'YINLAR ZONASI */}
          <div
            onClick={() => setCurrentTab('games')}
            className="card-interactive btn-press"
            style={{
              padding: '18px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border-subtle)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '130px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#EC489915',
                color: '#EC4899',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Gamepad2 size={24} />
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                background: '#FDF2F8',
                color: '#EC4899'
              }}>
                O'yna
              </span>
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2px' }}>
                O'yinlar Zonasi
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Word Match va Speed Quiz orqali o'ynab o'rganing
              </div>
            </div>
          </div>

          {/* 3. BOZOR / MARKET */}
          <div
            onClick={() => setCurrentTab('market')}
            className="card-interactive btn-press"
            style={{
              padding: '18px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border-subtle)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '130px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#F59E0B15',
                color: '#F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Gift size={24} />
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--gold-light)',
                color: 'var(--gold-dark)'
              }}>
                🪙 {coins} coin
              </span>
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2px' }}>
                Bozor & Rag'bat
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Tangalarni telefon balansi va Stars ga almashtiring
              </div>
            </div>
          </div>

          {/* 4. AI WRITING CHECKER */}
          <div
            onClick={() => setCurrentTab('writing')}
            className="card-interactive btn-press"
            style={{
              padding: '18px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border-subtle)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '130px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--primary-100)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <PenTool size={24} />
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary-50)',
                color: 'var(--primary)'
              }}>
                AI Tahlil
              </span>
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2px' }}>
                AI Writing Checker
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Insho tahlili va xatolarni to'g'ridan-to'g'ri lug'atga olish
              </div>
            </div>
          </div>

          {/* 5. READING */}
          <div
            onClick={() => setCurrentTab('reading')}
            className="card-interactive btn-press"
            style={{
              padding: '18px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border-subtle)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '130px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#3B82F615',
                color: '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BookOpen size={24} />
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                background: '#EFF6FF',
                color: '#3B82F6'
              }}>
                A2-C1
              </span>
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2px' }}>
                Reading Bo'limi
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Matnlar, savollar va tushuntirishlar
              </div>
            </div>
          </div>

          {/* 6. GRAMMAR & LEVEL TEST */}
          <div
            onClick={() => setCurrentTab('grammar')}
            className="card-interactive btn-press"
            style={{
              padding: '18px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border-subtle)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '130px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#10B98115',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <GraduationCap size={24} />
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--success-light)',
                color: 'var(--success)'
              }}>
                Qoidalar
              </span>
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2px' }}>
                Grammatika
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Qoidalar, namunalar va amaliy mashqlar
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. DAILY QUESTS & LEITNER BOXES (2-column layout on desktop) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px'
      }}>
        {/* Daily Quests Widget */}
        <div style={{
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} color="var(--primary)" />
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Kunlik Vazifalar (Quests)
              </h4>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--gold-dark)', fontWeight: 800 }}>
              +55 coin gacha
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {quests.map((q, idx) => (
              <div key={idx} style={{
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: `1.5px solid ${q.completed ? 'var(--success)' : 'var(--border-strong)'}`,
                    background: q.completed ? 'var(--success)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}>
                    {q.completed && <CheckCircle2 size={14} />}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {q.title}
                  </span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--gold-dark)' }}>
                  {q.reward}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Leitner Boxes Progress Distribution */}
        <div style={{
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={18} color="var(--primary)" />
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Leitner 5-Quti Taqsimoti
              </h4>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 600 }}>
              Spaced Repetition
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { num: 1, label: '1-Quti (Har kuni)', days: '1 kun' },
              { num: 2, label: '2-Quti (Oraliq)', days: '3 kun' },
              { num: 3, label: '3-Quti (Haftalik)', days: '7 kun' },
              { num: 4, label: '4-Quti (2 haftalik)', days: '14 kun' },
              { num: 5, label: '5-Quti (O\'zlashtirildi)', days: '30 kun' }
            ].map(b => {
              const count = boxCounts[b.num - 1] || 0;
              const percent = words.length > 0 ? Math.round((count / words.length) * 100) : 0;

              return (
                <div 
                  key={b.num}
                  onClick={() => setCurrentTab('words')}
                  className="btn-press"
                  title="Lug'atda ko'rish"
                  style={{
                    padding: '6px 8px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                      {b.label}
                    </span>
                    <span style={{ color: 'var(--text-tertiary)', fontWeight: 600 }}>
                      <strong>{count}</strong> ta so'z ({b.days})
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--bg-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${percent}%`,
                      height: '100%',
                      background: b.num === 5 ? 'var(--success)' : 'var(--primary-gradient)',
                      borderRadius: '3px',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};
