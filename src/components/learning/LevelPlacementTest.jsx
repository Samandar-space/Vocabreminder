import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Award, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export const LevelPlacementTest = ({ onBack, onComplete }) => {
  const { updateUserProfile, addCoins, showToast } = useApp();

  // Screen: 'intro' | 'question' | 'result'
  const [screen, setScreen] = useState('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);

  // 10 key placement test questions covering A1 to C1
  const questions = [
    { q: 'She _______ to the store yesterday.', options: ['go', 'goes', 'went', 'going'], correct: 2 },
    { q: 'I haven\'t seen him _______ last Friday.', options: ['for', 'since', 'during', 'while'], correct: 1 },
    { q: 'If it rains tomorrow, we _______ stay home.', options: ['would', 'will', 'had', 'have'], correct: 1 },
    { q: 'The novel was written _______ a renowned author.', options: ['with', 'from', 'by', 'of'], correct: 2 },
    { q: 'By next year, they _______ the new bridge.', options: ['will complete', 'will have completed', 'completed', 'are completing'], correct: 1 },
    { q: 'He insisted _______ paying for everyone\'s meal.', options: ['on', 'in', 'at', 'with'], correct: 0 },
    { q: 'Hardly _______ the room when the lights went out.', options: ['I had entered', 'had I entered', 'did I enter', 'I entered'], correct: 1 },
    { q: 'The project proved to be more challenging than _______ expected.', options: ['initial', 'initially', 'initiative', 'initiator'], correct: 1 }
  ];

  const totalQuestions = questions.length;

  const handleStart = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setScreen('question');
  };

  const handleNextQuestion = () => {
    if (selectedOpt === questions[currentIdx].correct) {
      setScore(prev => prev + 1);
    }

    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
    } else {
      setScreen('result');
      addCoins(25, 'Daraja aniqlash testi yakunlandi (+25 coin)');
    }
  };

  // Determine CEFR level based on score
  const getLevel = () => {
    const ratio = score / totalQuestions;
    if (ratio >= 0.85) return { code: 'C1', title: 'C1 - Yuqori daraja', badge: 'Advanced', desc: 'Murakkab ilmiy va professional mavzularda erkin fikr yurita olasiz.' };
    if (ratio >= 0.65) return { code: 'B2', title: 'B2 - Yuqori o\'rta', badge: 'Upper-Intermediate', desc: 'Matnlarning asosiy mohiyatini chuqur tushunasiz va erkin muloqot qilasiz.' };
    if (ratio >= 0.45) return { code: 'B1', title: 'B1 - O\'rta daraja', badge: 'Intermediate', desc: 'Siz kundalik mavzularda, ish yoki o\'qishda erkin gaplasha olasiz. Lug\'at boyligingiz yaxshi darajada. Endi murakkab grammatik tuzilmalarni o\'rganish va so\'z boyligini kengaytirish kerak.' };
    if (ratio >= 0.25) return { code: 'A2', title: 'A2 - Boshlang\'ich', badge: 'Elementary', desc: 'Oddiy kundalik iboralar va o\'zingiz haqingizda gapira olasiz.' };
    return { code: 'A1', title: 'A1 - Boshlang\'ich', badge: 'Beginner', desc: 'Endigina ingliz tili olamiga qadam qo\'yyapsiz. Harakatni davom ettiring!' };
  };

  const calculatedLevel = getLevel();

  // Save level to user profile
  const handleSaveLevel = () => {
    updateUserProfile({ level: calculatedLevel.code });
    showToast(`Darajangiz (${calculatedLevel.code}) profilga saqlandi!`, 'success');
    onComplete();
  };

  return (
    <div style={{ padding: '20px', minHeight: '85vh' }}>
      
      {/* 1. INTRO SCREEN */}
      {screen === 'intro' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'space-between' }}>
          <div>
            <button
              onClick={onBack}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '24px' }}
            >
              <ArrowLeft size={20} /> Orqaga
            </button>

            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                background: 'var(--primary-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto'
              }}>
                <Award size={42} color="var(--primary)" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Darajani aniqlash
              </h2>
            </div>

            {/* Info Card */}
            <div style={{
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              padding: '20px',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px' }}>English Level Test</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                Bu test sizning ingliz tili darajangizni aniqlaydi. 10 ga yaqin savol, taxminan 5 daqiqa vaqt oladi.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span>Grammatika va lug'at savollari</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span>Natija tezkor va ilmiy asoslangan</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span>Istalgan vaqtda qayta topshirish imkoni</span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', textAlign: 'center' }}>
              Test yakunida sizga mos keladigan mashqlar tavsiya etiladi.
            </p>
          </div>

          <button
            onClick={handleStart}
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
            Testni boshlash
          </button>
        </div>
      )}

      {/* 2. QUESTION SCREEN */}
      {screen === 'question' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800 }}>
                Darajani aniqlash
              </h3>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)' }}>
                {currentIdx + 1} / {totalQuestions}
              </span>
            </div>

            {/* Progress bar */}
            <div style={{ width: '100%', height: '4px', background: 'var(--bg-subtle)', borderRadius: '2px', marginBottom: '24px' }}>
              <div style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%`, height: '100%', background: 'var(--primary)', borderRadius: '2px' }} />
            </div>

            {/* Question Card */}
            <div style={{
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border-subtle)',
              padding: '24px 20px',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px' }}>
                CHOOSE THE CORRECT OPTION
              </span>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
                {questions[currentIdx].q}
              </h2>
            </div>

            {/* 4 Choices */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {questions[currentIdx].options.map((opt, i) => {
                const isSelected = selectedOpt === i;
                const letters = ['A', 'B', 'C', 'D'];
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedOpt(i)}
                    style={{
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      background: isSelected ? 'var(--primary-50)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontWeight: 600,
                      fontSize: '14px',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <strong style={{ color: 'var(--primary)' }}>{letters[i]}</strong>
                      <span>{opt}</span>
                    </div>
                    {isSelected && <CheckCircle2 size={18} color="var(--primary)" />}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={selectedOpt === null}
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: selectedOpt !== null ? 'var(--primary-gradient)' : 'var(--bg-subtle)',
              color: selectedOpt !== null ? '#FFFFFF' : 'var(--text-tertiary)',
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: selectedOpt !== null ? 'var(--shadow-primary)' : 'none'
            }}
          >
            {currentIdx + 1 < totalQuestions ? 'Keyingi savol' : 'Natijani hisoblash'}
          </button>
        </div>
      )}

      {/* 3. RESULT SCREEN */}
      {screen === 'result' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <button
                onClick={onBack}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}
              >
                <ArrowLeft size={20} />
              </button>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
                Test Natijasi
              </h2>
            </div>

            <div style={{ textAlign: 'center', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Sizning darajangiz
            </div>

            {/* Level Pills Row A1..C2 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px', marginBottom: '24px' }}>
              {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(code => {
                const isActive = code === calculatedLevel.code;
                return (
                  <div
                    key={code}
                    style={{
                      flex: 1,
                      padding: '10px 0',
                      textAlign: 'center',
                      borderRadius: 'var(--radius-md)',
                      background: isActive ? 'var(--primary)' : 'var(--bg-subtle)',
                      color: isActive ? '#FFFFFF' : 'var(--text-tertiary)',
                      fontWeight: 800,
                      fontSize: '14px',
                      boxShadow: isActive ? 'var(--shadow-primary)' : 'none'
                    }}
                  >
                    {code}
                  </div>
                );
              })}
            </div>

            {/* Level Card */}
            <div style={{
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border-subtle)',
              padding: '24px 20px',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '20px'
            }}>
              <span style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary-100)',
                color: 'var(--primary)',
                fontSize: '12px',
                fontWeight: 800
              }}>
                {calculatedLevel.badge}
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '10px 0 8px 0' }}>
                {calculatedLevel.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {calculatedLevel.desc}
              </p>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', textAlign: 'center' }}>
              Natija taxminiy hisoblanadi.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            <button
              onClick={handleSaveLevel}
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
              Darajamga mos mashqlar
            </button>

            <button
              onClick={onComplete}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '14px'
              }}
            >
              Bosh sahifaga
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
