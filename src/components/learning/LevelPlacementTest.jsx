import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, Award, CheckCircle2, XCircle, 
  ChevronRight, Sparkles, HelpCircle, RotateCcw, 
  BarChart3, Check, X, Eye, EyeOff, Target 
} from 'lucide-react';

export const LevelPlacementTest = ({ onBack, onComplete }) => {
  const { updateUserProfile, addCoins, showToast, setCurrentTab } = useApp();

  // Screen: 'intro' | 'question' | 'result'
  const [screen, setScreen] = useState('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showReview, setShowReview] = useState(false);

  // 15 Questions based exactly on user's curriculum (A1 to C2)
  const questions = [
    // 1–2: A1
    { 
      id: 1, 
      q: 'She ___ a student.', 
      options: ['am', 'is', 'are', 'be'], 
      correct: 1, 
      level: 'A1',
      explanation: '"She" olmoshi bilan "to be" fe\'lining "is" shakli ishlatiladi.'
    },
    { 
      id: 2, 
      q: 'There ___ two apples on the table.', 
      options: ['is', 'are', 'be', 'am'], 
      correct: 1, 
      level: 'A1',
      explanation: 'Ko\'plikdagi otlar ("two apples") uchun "there are" qo\'llaniladi.'
    },
    // 3–5: A2
    { 
      id: 3, 
      q: 'I ___ to the cinema yesterday.', 
      options: ['go', 'goes', 'went', 'going'], 
      correct: 2, 
      level: 'A2',
      explanation: '"Yesterday" (kecha) o\'tgan zamon belgisi bo\'lgani uchun "went" (Past Simple) to\'g\'ri.'
    },
    { 
      id: 4, 
      q: 'My brother is ___ than me.', 
      options: ['tall', 'more tall', 'taller', 'tallest'], 
      correct: 2, 
      level: 'A2',
      explanation: 'Bir bo\'g\'inli sifatlarning qiyosiy darajasiga "-er" qo\'shiladi ("taller than").'
    },
    { 
      id: 5, 
      q: 'We ___ dinner when the phone rang.', 
      options: ['had', 'were having', 'have', 'are having'], 
      correct: 1, 
      level: 'A2',
      explanation: 'O\'tgan zamonda biror ish sodir bo\'layotgan paytda boshqa qisqa ish bo\'lsa: Past Continuous ("were having") + Past Simple ("rang").'
    },
    // 6–8: B1
    { 
      id: 6, 
      q: 'If it rains tomorrow, we ___ at home.', 
      options: ['will stay', 'would stay', 'stayed', 'stay would'], 
      correct: 0, 
      level: 'B1',
      explanation: 'First Conditional (1-shart mayli): If + Present Simple, asosiy qismda "will + fe\'l".'
    },
    { 
      id: 7, 
      q: 'I have lived in this city ___ 2015.', 
      options: ['for', 'during', 'since', 'from'], 
      correct: 2, 
      level: 'B1',
      explanation: 'Harakatning boshlanish vaqtini ko\'rsatish uchun Present Perfect zamonida "since" ishlatiladi.'
    },
    { 
      id: 8, 
      q: 'The report ___ by the manager yesterday.', 
      options: ['wrote', 'was written', 'has written', 'is writing'], 
      correct: 1, 
      level: 'B1',
      explanation: 'Majhul nisbat (Passive Voice) o\'tgan zamonda: was/were + V3 ("was written").'
    },
    // 9–11: B2
    { 
      id: 9, 
      q: 'If I ___ you, I would accept the offer.', 
      options: ['am', 'was being', 'were', 'would be'], 
      correct: 2, 
      level: 'B2',
      explanation: 'Second Conditional da maslahat yoki xayoliy holat uchun "If I were you" qolipi qo\'llaniladi.'
    },
    { 
      id: 10, 
      q: 'She asked me where ___.', 
      options: ['have I been', 'I have been', 'I had been', 'had I been'], 
      correct: 2, 
      level: 'B2',
      explanation: 'O\'zlashtirma gapda (Reported Speech) to\'g\'ri so\'z tartibi (ega + kesim) bo\'ladi va zamon orqaga suriladi: Past Perfect ("I had been").'
    },
    { 
      id: 11, 
      q: 'By this time next year, I ___ my degree.', 
      options: ['will complete', 'am completing', 'will have completed', 'have completed'], 
      correct: 2, 
      level: 'B2',
      explanation: '"By this time next year" kelajakdagi aniq muddatgacha tugallanadigan ishni bildiradi: Future Perfect ("will have completed").'
    },
    // 12–13: C1
    { 
      id: 12, 
      q: 'Hardly ___ the house when it started to rain.', 
      options: ['we had left', 'had we left', 'we left', 'did we leave'], 
      correct: 1, 
      level: 'C1',
      explanation: '"Hardly" jumlasi gap boshida kelsa, inversiya hosil bo\'ladi: yordamchi fe\'l egadan oldinga chiqadi ("had we left").'
    },
    { 
      id: 13, 
      q: '"I\'m feeling a bit under the weather today." What does this mean?', 
      options: ['I am enjoying the weather', 'I am feeling slightly ill', 'I am very angry', 'I am standing outside'], 
      correct: 1, 
      level: 'C1',
      explanation: '"Under the weather" idiomatik iborasi o\'zini biroz kasal yoki lanj his qilishni bildiradi.'
    },
    // 14–15: C2
    { 
      id: 14, 
      q: 'Were it not for your help, we ___ failed.', 
      options: ['will have', 'would have', 'had', 'would'], 
      correct: 1, 
      level: 'C2',
      explanation: 'Inversiyali shart ergash gap ("Were it not for..."): natija qismida "would have + V3" ("would have failed") bo\'ladi.'
    },
    { 
      id: 15, 
      q: 'Which sentence is grammatically correct?', 
      options: [
        'Not only she won the prize, but she also broke the record.',
        'Not only did she win the prize, but she also broke the record.',
        'Not only she did win the prize, but she also broke the record.',
        'Not only won she the prize, but she also broke the record.'
      ], 
      correct: 1, 
      level: 'C2',
      explanation: '"Not only" gap boshida kelganda inversiya qo\'llanilib, yordamchi "did" egadan oldinga o\'tadi ("Not only did she win...").'
    }
  ];

  const totalQuestions = questions.length;

  const handleStart = () => {
    setCurrentIdx(0);
    setUserAnswers({});
    setSelectedOpt(null);
    setShowReview(false);
    setScreen('question');
  };

  const handleNextQuestion = () => {
    if (selectedOpt === null) return;

    const updatedAnswers = { ...userAnswers, [currentIdx]: selectedOpt };
    setUserAnswers(updatedAnswers);

    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
    } else {
      // Calculate final score
      const finalScore = Object.entries(updatedAnswers).filter(
        ([idx, ans]) => questions[Number(idx)].correct === ans
      ).length;

      setScreen('result');
      addCoins(30, 'English Level Test muvaffaqiyatli topshirildi (+30 coin)');
      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      } catch (e) {
        // ignore if confetti fails
      }
    }
  };

  // Calculate current score from answers
  const score = Object.entries(userAnswers).filter(
    ([idx, ans]) => questions[Number(idx)].correct === ans
  ).length;

  // Determine CEFR Level based on exact user rubric:
  // 0–3: A1 | 4–6: A2 | 7–9: B1 | 10–12: B2 | 13–14: C1 | 15: C2
  const getLevel = (correctCount) => {
    if (correctCount >= 15) {
      return {
        code: 'C2',
        title: 'C2 — Mukammal (Proficiency)',
        badge: 'C2 Mukammal',
        gradient: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
        desc: 'Tabriklaymiz! Siz ingliz tilini ona tili darajasida mukammal tushunasiz. Inversiyali gaplar, akademik leksika va nozik grammatik qoidalarni to\'liq egallagansiz.'
      };
    }
    if (correctCount >= 13) {
      return {
        code: 'C1',
        title: 'C1 — Ilg\'or (Advanced)',
        badge: 'C1 Ilg\'or',
        gradient: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
        desc: 'Ajoyib natija! Murakkab akademik matnlar, inversiya va inglizcha idiomalarni erkin tushunasiz. IELTS 7.5+ yoki CEFR C1 darajasiga to\'liq mos.'
      };
    }
    if (correctCount >= 10) {
      return {
        code: 'B2',
        title: 'B2 — O\'rtadan yuqori (Upper-Intermediate)',
        badge: 'B2 O\'rtadan Yuqori',
        gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
        desc: 'Mustahkam bilim! Second Conditional, Reported Speech va Future Perfect kabi murakkab mavzularda erkinsiz. Chet elliklar bilan bemalol bahslasha olasiz.'
      };
    }
    if (correctCount >= 7) {
      return {
        code: 'B1',
        title: 'B1 — O\'rta (Intermediate)',
        badge: 'B1 O\'rta',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
        desc: 'Yaxshi baza! First Conditional, Present Perfect va Passive Voice kabi tayanch qoidalarni bilasiz. Endi murakkabroq so\'z boyligi va idiomalar ustida ishlash tavsiya etiladi.'
      };
    }
    if (correctCount >= 4) {
      return {
        code: 'A2',
        title: 'A2 — Elementar (Elementary)',
        badge: 'A2 Elementar',
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        desc: 'Boshlang\'ich mustahkam bilim! Past Simple, sifat darajalari va davomli zamonlarni tushunasiz. Lug\'at boyligingizni oshirib, B1 darajaga tez ko\'tarilishingiz mumkin.'
      };
    }
    return {
      code: 'A1',
      title: 'A1 — Boshlang\'ich (Beginner)',
      badge: 'A1 Boshlang\'ich',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      desc: 'Ingliz tili olamiga ilk qadamlar! To be fe\'li, asosiy olmoshlar va sodda iboralarni muntazam takrorlab borish orqali tezda rivojlanasiz.'
    };
  };

  const calculatedLevel = getLevel(score);

  // Save level to user profile
  const handleSaveLevel = () => {
    updateUserProfile({ level: calculatedLevel.code });
    showToast(`Darajangiz (${calculatedLevel.code}) profilga saqlandi!`, 'success');
    onComplete();
  };

  const currentQuestion = questions[currentIdx];

  // Helper color for level badge
  const getLevelBadgeColor = (lvl) => {
    switch (lvl) {
      case 'A1': return { bg: '#FEF3C7', text: '#B45309' };
      case 'A2': return { bg: '#ECFDF5', text: '#047857' };
      case 'B1': return { bg: '#EFF6FF', text: '#1D4ED8' };
      case 'B2': return { bg: '#EDE9FE', text: '#6D28D9' };
      case 'C1': return { bg: '#FDF2F8', text: '#BE185D' };
      case 'C2': return { bg: '#F5F3FF', text: '#5B21B6' };
      default: return { bg: 'var(--bg-subtle)', text: 'var(--text-secondary)' };
    }
  };

  return (
    <div style={{ padding: '20px 24px 60px 24px', minHeight: '85vh', maxWidth: '720px', margin: '0 auto' }}>
      
      {/* 1. INTRO SCREEN */}
      {screen === 'intro' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'space-between' }}>
          <div>
            <button
              onClick={onBack}
              className="btn-press"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '20px' }}
            >
              <ArrowLeft size={20} /> Orqaga qaytish
            </button>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                background: 'var(--primary-gradient)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px auto',
                boxShadow: 'var(--shadow-primary)'
              }}>
                <Award size={44} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '6px' }}>
                ENGLISH LEVEL TEST (A1–C2)
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                Har bir savolda bitta to'g'ri javobni tanlang.
              </p>
            </div>

            {/* Test Structure & Evaluation Overview Card */}
            <div style={{
              borderRadius: 'var(--radius-xl)',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border-subtle)',
              padding: '22px',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart3 size={18} color="var(--primary)" /> Test tuzilishi va mezonlari
              </h3>

              {/* Levels distribution pills */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '8px',
                marginBottom: '16px'
              }}>
                {[
                  { range: '1–2 savol', lvl: 'A1 (Boshlang\'ich)' },
                  { range: '3–5 savol', lvl: 'A2 (Elementar)' },
                  { range: '6–8 savol', lvl: 'B1 (O\'rta)' },
                  { range: '9–11 savol', lvl: 'B2 (O\'rtadan yuqori)' },
                  { range: '12–13 savol', lvl: 'C1 (Ilg\'or)' },
                  { range: '14–15 savol', lvl: 'C2 (Mukammal)' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '12px'
                  }}>
                    <div style={{ fontWeight: 800, color: 'var(--primary)' }}>{item.range}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 600 }}>{item.lvl}</div>
                  </div>
                ))}
              </div>

              {/* Score Guide */}
              <div style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-50)',
                border: '1px solid var(--primary-200)',
                fontSize: '12px',
                color: 'var(--primary-700)',
                lineHeight: 1.6
              }}>
                <strong>📊 Natijalar shkalasi:</strong> 0–3: A1 • 4–6: A2 • 7–9: B1 • 10–12: B2 • 13–14: C1 • 15: C2
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '13px',
              color: 'var(--gold-dark)',
              fontWeight: 700
            }}>
              <Sparkles size={16} /> Testni to'liq topshirganga +30 coin beriladi!
            </div>
          </div>

          <button
            onClick={handleStart}
            className="btn-press"
            style={{
              marginTop: '28px',
              padding: '16px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '16px',
              boxShadow: 'var(--shadow-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            Testni boshlash <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* 2. QUESTION SCREEN */}
      {screen === 'question' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'space-between' }}>
          <div>
            {/* Top header & badges */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Savol {currentIdx + 1} / {totalQuestions}
                </span>
                {/* Level badge for this question */}
                {(() => {
                  const badgeColor = getLevelBadgeColor(currentQuestion.level);
                  return (
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: badgeColor.bg,
                      color: badgeColor.text,
                      border: `1px solid ${badgeColor.text}30`
                    }}>
                      Daraja: {currentQuestion.level}
                    </span>
                  );
                })()}
              </div>

              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)' }}>
                {Math.round(((currentIdx + 1) / totalQuestions) * 100)}%
              </span>
            </div>

            {/* Progress bar */}
            <div style={{ width: '100%', height: '6px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-full)', marginBottom: '22px', overflow: 'hidden' }}>
              <div style={{
                width: `${((currentIdx + 1) / totalQuestions) * 100}%`,
                height: '100%',
                background: 'var(--primary-gradient)',
                borderRadius: 'var(--radius-full)',
                transition: 'width 0.3s ease'
              }} />
            </div>

            {/* Question Card */}
            <div style={{
              borderRadius: 'var(--radius-xl)',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border-subtle)',
              padding: '24px 20px',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                To'g'ri variantni tanlang
              </span>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px', lineHeight: 1.4 }}>
                {currentQuestion.q}
              </h2>
            </div>

            {/* 4 Choices (a, b, c, d) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentQuestion.options.map((opt, i) => {
                const isSelected = selectedOpt === i;
                const letters = ['A', 'B', 'C', 'D'];
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedOpt(i)}
                    className="card-interactive btn-press"
                    style={{
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-lg)',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      background: isSelected ? 'var(--primary-50)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontWeight: 700,
                      fontSize: '15px',
                      boxShadow: isSelected ? 'var(--shadow-primary)' : 'var(--shadow-sm)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: isSelected ? 'var(--primary)' : 'var(--bg-subtle)',
                        color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13px',
                        fontWeight: 900
                      }}>
                        {letters[i]}
                      </span>
                      <span style={{ color: isSelected ? 'var(--primary-700)' : 'var(--text-primary)' }}>
                        {opt}
                      </span>
                    </div>

                    {isSelected && <CheckCircle2 size={20} color="var(--primary)" />}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={selectedOpt === null}
            className="btn-press"
            style={{
              marginTop: '24px',
              padding: '16px',
              borderRadius: 'var(--radius-lg)',
              background: selectedOpt !== null ? 'var(--primary-gradient)' : 'var(--bg-subtle)',
              color: selectedOpt !== null ? '#FFFFFF' : 'var(--text-tertiary)',
              fontWeight: 800,
              fontSize: '15px',
              boxShadow: selectedOpt !== null ? 'var(--shadow-primary)' : 'none',
              cursor: selectedOpt !== null ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {currentIdx + 1 < totalQuestions ? (
              <>Keyingi savol ({currentIdx + 2}/{totalQuestions}) <ChevronRight size={18} /></>
            ) : (
              <>Natijani ko'rish <Sparkles size={18} /></>
            )}
          </button>
        </div>
      )}

      {/* 3. RESULT SCREEN */}
      {screen === 'result' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={onBack}
              className="btn-press"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 700 }}
            >
              <ArrowLeft size={20} /> Orqaga
            </button>
          </div>

          {/* Level Result Main Hero Card */}
          <div style={{
            borderRadius: 'var(--radius-xl)',
            background: calculatedLevel.gradient,
            color: '#FFFFFF',
            padding: '28px 24px',
            boxShadow: 'var(--shadow-primary)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px auto',
              backdropFilter: 'blur(8px)'
            }}>
              <Award size={36} />
            </div>

            <div style={{
              display: 'inline-block',
              fontSize: '12px',
              fontWeight: 800,
              padding: '3px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.25)',
              marginBottom: '8px'
            }}>
              {calculatedLevel.badge}
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 900, marginBottom: '6px' }}>
              {calculatedLevel.title}
            </h2>

            <div style={{ fontSize: '15px', fontWeight: 700, opacity: 0.95, marginBottom: '14px' }}>
              To'plangan ball: {score} / {totalQuestions} ({Math.round((score / totalQuestions) * 100)}%)
            </div>

            <p style={{ fontSize: '13px', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto', opacity: 0.9 }}>
              {calculatedLevel.desc}
            </p>
          </div>

          {/* Level Scale Pills Row A1..C2 */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: '8px', textAlign: 'center' }}>
              CEFR SHKALASI BO'YICHA O'RNINGIZ
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
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
                      background: isActive ? 'var(--primary-gradient)' : 'var(--bg-subtle)',
                      color: isActive ? '#FFFFFF' : 'var(--text-tertiary)',
                      fontWeight: 900,
                      fontSize: '14px',
                      boxShadow: isActive ? 'var(--shadow-primary)' : 'none',
                      transform: isActive ? 'scale(1.05)' : 'none',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {code}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Collapsible Answer Key & Review */}
          <div style={{
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <button
              onClick={() => setShowReview(!showReview)}
              className="btn-press"
              style={{
                width: '100%',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--bg-surface)',
                fontWeight: 800,
                fontSize: '14px',
                color: 'var(--text-primary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={18} color="var(--primary)" />
                <span>Savollar va javoblar tahlili ({score}/{totalQuestions})</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {showReview ? <><EyeOff size={16} /> Yashirish</> : <><Eye size={16} /> Ko'rish</>}
              </span>
            </button>

            {showReview && (
              <div style={{ padding: '0 16px 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {questions.map((q, qIndex) => {
                  const userAns = userAnswers[qIndex];
                  const isCorrect = userAns === q.correct;
                  const letters = ['a', 'b', 'c', 'd'];

                  return (
                    <div
                      key={q.id}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        background: isCorrect ? 'var(--success-light)' : 'var(--danger-light)',
                        border: `1px solid ${isCorrect ? 'var(--success)' : 'var(--danger)'}40`
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {q.id}. {q.q}
                        </div>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: 'var(--radius-full)',
                          background: isCorrect ? 'var(--success)' : 'var(--danger)',
                          color: '#FFFFFF'
                        }}>
                          {q.level}
                        </span>
                      </div>

                      <div style={{ fontSize: '12px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div>
                          <strong>Sizning javobingiz:</strong>{' '}
                          <span style={{ color: isCorrect ? 'var(--success-dark)' : 'var(--danger-dark)', fontWeight: 700 }}>
                            {userAns !== undefined ? `${letters[userAns]}) ${q.options[userAns]}` : 'Javob berilmagan'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div style={{ color: 'var(--success-dark)', fontWeight: 700 }}>
                            <strong>To'g'ri javob:</strong> {letters[q.correct]}) {q.options[q.correct]}
                          </div>
                        )}
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', fontStyle: 'italic' }}>
                          💡 {q.explanation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
            <button
              onClick={handleSaveLevel}
              className="btn-press"
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--primary-gradient)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '15px',
                boxShadow: 'var(--shadow-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Check size={18} strokeWidth={2.5} /> Darajani profilga saqlash ({calculatedLevel.code})
            </button>

            <button
              onClick={() => {
                try {
                  localStorage.setItem('vocab_grammar_goal', calculatedLevel.code);
                } catch {}
                if (setCurrentTab) setCurrentTab('grammar');
              }}
              className="btn-press"
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--bg-subtle)',
                border: '1.5px solid var(--primary-200)',
                color: 'var(--primary)',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <Target size={18} /> Grammatika yo'l xaritasini ko'rish ({calculatedLevel.code})
            </button>

            <button
              onClick={handleStart}
              className="btn-press"
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <RotateCcw size={16} /> Testni qayta topshirish
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
