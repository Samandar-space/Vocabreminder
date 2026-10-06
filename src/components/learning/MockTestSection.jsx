import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, Clock, AlertTriangle, CheckCircle2, 
  X, BarChart3, ChevronRight, Award 
} from 'lucide-react';

export const MockTestSection = ({ onBack }) => {
  const { user, addCoins, showToast } = useApp();

  // Screen: 'overview' | 'test' | 'report'
  const [screen, setScreen] = useState('overview');
  
  // Difficulty level selection (user requested: A2, B1, B2, C1, C2 or IELTS)
  const [selectedDifficulty, setSelectedDifficulty] = useState(user.goal === 'ielts' ? 'IELTS Academic' : 'B2');
  
  // Timer state (60 minutes = 3600 seconds)
  const [timeLeft, setTimeLeft] = useState(2852); // ~47:32
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Active section in test
  const [activeSection, setActiveSection] = useState('reading'); // 'reading' | 'writing'
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(1);
  const [answers, setAnswers] = useState({});

  // Submit confirmation modal state
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Start Mock Test
  const handleStartTest = () => {
    setTimeLeft(2852);
    setIsTimerRunning(true);
    setCurrentQuestionIdx(1);
    setAnswers({});
    setScreen('test');
  };

  // Confirm Submit
  const handleFinalSubmit = () => {
    setIsTimerRunning(false);
    setShowSubmitModal(false);
    setScreen('report');
    addCoins(50, 'Mock test muvaffaqiyatli topshirildi (+50 coin)');
    showToast('Mock test topshirildi!', 'success');
  };

  const unansweredCount = 10 - Object.keys(answers).length;

  return (
    <div style={{ padding: '20px', minHeight: '85vh', position: 'relative' }}>
      
      {/* 1. OVERVIEW SCREEN (mock-test-overview) */}
      {screen === 'overview' && (
        <div className="animate-fade">
          {/* Top Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <button
              onClick={onBack}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}
            >
              <ArrowLeft size={20} /> Orqaga
            </button>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
              Mock test ({user.goal === 'ielts' ? 'IELTS' : 'CEFR'})
            </h2>
          </div>

          {/* Hero Banner */}
          <div style={{
            borderRadius: 'var(--radius-lg)',
            background: 'var(--primary-gradient)',
            color: '#FFFFFF',
            padding: '24px 20px',
            boxShadow: 'var(--shadow-primary)',
            marginBottom: '20px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>
              To'liq {user.goal === 'ielts' ? 'IELTS' : 'CEFR'} formatidagi sinov testi.
            </h3>
            <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: 1.5 }}>
              Bilimingizni haqiqiy imtihon muhitida sinab ko'ring. Barcha bo'limlar yakunlangach, to'liq hisobot va taxminiy ball taqdim etiladi.
            </p>
          </div>

          {/* Difficulty Level Selector */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '8px' }}>
              QIYINLIK DARAJASINI TANLANG
            </div>
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
              {(user.goal === 'ielts' ? ['Band 5.5 - 6.5', 'Band 7.0 - 8.0', 'Band 8.5+'] : ['A2', 'B1', 'B2', 'C1', 'C2']).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedDifficulty(lvl)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    background: selectedDifficulty === lvl ? 'var(--primary)' : 'var(--bg-subtle)',
                    color: selectedDifficulty === lvl ? '#FFFFFF' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Sections List */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '10px' }}>
              TEST BO'LIMLARI
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Reading */}
              <div style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>Reading</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>60 daqiqa, 40 ta savol</div>
                </div>
                <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', background: 'var(--success-light)', color: 'var(--success-dark)', fontSize: '12px', fontWeight: 700 }}>
                  Tayyor
                </span>
              </div>

              {/* Writing */}
              <div style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>Writing</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>60 daqiqa, 2 ta topshiriq</div>
                </div>
                <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', background: 'var(--success-light)', color: 'var(--success-dark)', fontSize: '12px', fontWeight: 700 }}>
                  Tayyor
                </span>
              </div>

              {/* Listening */}
              <div style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: 0.7
              }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>Listening</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>30 daqiqa</div>
                </div>
                <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', background: 'var(--bg-subtle)', color: 'var(--text-tertiary)', fontSize: '12px', fontWeight: 700 }}>
                  Tez kunda
                </span>
              </div>

              {/* Speaking */}
              <div style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: 0.7
              }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>Speaking</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>15 daqiqa</div>
                </div>
                <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', background: 'var(--bg-subtle)', color: 'var(--text-tertiary)', fontSize: '12px', fontWeight: 700 }}>
                  Tez kunda
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartTest}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: 'var(--shadow-primary)'
            }}
          >
            Testni boshlash
          </button>
        </div>
      )}

      {/* 2. TEST IN PROGRESS SCREEN (mock-test-in-progress) */}
      {screen === 'test' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', minHeight: '82vh', justifyContent: 'space-between' }}>
          <div>
            {/* Top Bar with Timer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: 800 }}>Reading — Bo'lim 1</div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--gold-light)',
                color: 'var(--gold-dark)',
                fontSize: '13px',
                fontWeight: 800
              }}>
                <Clock size={14} />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            </div>

            {/* Passage Text */}
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              fontSize: '13px',
              lineHeight: 1.6,
              maxHeight: '180px',
              overflowY: 'auto',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                PASSAGE 1 ({selectedDifficulty})
              </span>
              The cognitive architecture of human memory involves complex processes of encoding, consolidation, and retrieval. Recent studies suggest that active reconstruction of vocabulary through spaced intervals optimizes synaptic plasticity...
            </div>

            {/* Question */}
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border-subtle)',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '12px' }}>
                {currentQuestionIdx}. What optimizes synaptic plasticity according to the passage?
              </div>

              {['Immediate repetition', 'Active reconstruction through spaced intervals', 'Passive reading', 'Sleep deprivation'].map((opt, i) => {
                const isSelected = answers[currentQuestionIdx] === i;
                return (
                  <div
                    key={i}
                    onClick={() => setAnswers(prev => ({ ...prev, [currentQuestionIdx]: i }))}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      background: isSelected ? 'var(--primary-50)' : 'var(--bg-surface)',
                      marginBottom: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {opt}
                  </div>
                );
              })}
            </div>

            {/* Bottom 1..10 Question Navigator */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '14px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
                const isCurrent = currentQuestionIdx === num;
                const isAnswered = answers[num] !== undefined;

                return (
                  <button
                    key={num}
                    onClick={() => setCurrentQuestionIdx(num)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isCurrent ? 'var(--primary)' : isAnswered ? 'var(--primary-100)' : 'var(--bg-subtle)',
                      color: isCurrent ? '#FFFFFF' : isAnswered ? 'var(--primary)' : 'var(--text-secondary)',
                      fontWeight: 800,
                      fontSize: '12px',
                      flexShrink: 0
                    }}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: 'var(--shadow-primary)'
            }}
          >
            Topshirish
          </button>

          {/* SUBMIT CONFIRMATION MODAL (Matching design!) */}
          {showSubmitModal && (
            <div style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.65)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '24px'
            }}>
              <div 
                className="animate-slide-up"
                style={{
                  background: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px 20px',
                  width: '100%',
                  maxWidth: '340px',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <AlertTriangle size={28} color="#D97706" />
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  Topshirishni tasdiqlaysizmi?
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--danger)', fontWeight: 600, marginBottom: '24px' }}>
                  {unansweredCount > 0 ? `${unansweredCount} ta savol javobsiz qoldi.` : 'Barcha savollarga javob berildi.'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={handleFinalSubmit}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--primary-gradient)',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '14px'
                    }}
                  >
                    Topshirish
                  </button>
                  <button
                    onClick={() => setShowSubmitModal(false)}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-subtle)',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      fontSize: '14px'
                    }}
                  >
                    Bekor qilish
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. REPORT SCREEN (mock-test-report) */}
      {screen === 'report' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
              Test natijasi
            </h2>
            <button onClick={() => setScreen('overview')} style={{ color: 'var(--text-tertiary)' }}>
              <X size={20} />
            </button>
          </div>

          {/* Overall Band Score Card */}
          <div style={{
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--border-subtle)',
            padding: '24px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Taxminiy natijangiz</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Overall Band Score
              </div>
              <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 700, marginTop: '2px' }}>
                Daraja: {selectedDifficulty}
              </div>
            </div>

            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--primary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              fontWeight: 900,
              boxShadow: 'var(--shadow-primary)'
            }}>
              6.5
            </div>
          </div>

          {/* Section Bands */}
          <div style={{
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700 }}>Reading (32/40)</span>
                <strong style={{ color: 'var(--primary)' }}>Band 6.5</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--bg-subtle)', borderRadius: '3px' }}>
                <div style={{ width: '75%', height: '100%', background: 'var(--primary)', borderRadius: '3px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700 }}>Writing (2 ta topshiriq)</span>
                <strong style={{ color: 'var(--primary)' }}>Band 6.0</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--bg-subtle)', borderRadius: '3px' }}>
                <div style={{ width: '65%', height: '100%', background: 'var(--primary)', borderRadius: '3px' }} />
              </div>
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', background: 'var(--success-light)', border: '1px solid #A7F3D0' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--success-dark)', marginBottom: '6px' }}>
                Kuchli tomonlar
              </div>
              <ul style={{ fontSize: '12px', color: '#065F46', paddingLeft: '14px', lineHeight: 1.5 }}>
                <li>Detallarni tez aniqlash</li>
                <li>Sinonimlarni yaxshi tushunish</li>
              </ul>
            </div>

            <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', background: 'var(--danger-light)', border: '1px solid #FECACA' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--danger)', marginBottom: '6px' }}>
                Yaxshilash kerak
              </div>
              <ul style={{ fontSize: '12px', color: '#991B1B', paddingLeft: '14px', lineHeight: 1.5 }}>
                <li>Xulosa chiqarish tezligi</li>
                <li>Insho strukturasi</li>
              </ul>
            </div>
          </div>

          <button
            onClick={onBack}
            style={{
              padding: '15px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: 'var(--shadow-primary)',
              marginTop: '10px'
            }}
          >
            Bosh sahifaga
          </button>
        </div>
      )}

    </div>
  );
};
