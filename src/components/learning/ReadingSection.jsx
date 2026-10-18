import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';

export const ReadingSection = ({ onBack }) => {
  const { addCoins, showToast } = useApp();

  // Screen: 'list' | 'reading' | 'result'
  const [screen, setScreen] = useState('list');
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Timer
  const [secondsLeft, setSecondsLeft] = useState(240); // 4 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Quiz state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  // Reading Articles by CEFR Level (Matching design)
  const articles = [
    {
      id: 'a2_family',
      level: 'A2 — BOSHLANG\'ICH',
      badge: 'Oson',
      duration: '5 daqiqa',
      title: 'My Wonderful Family',
      preview: 'I live in a big house with my mother, father, and two siblings...',
      fullText: 'I live in a big house with my mother, father, and two siblings. We like to spend time together on weekends. My mother is a teacher and my father works in a bank. In the evenings, we have dinner together and discuss our daily experiences. It is very important to have supportive family members when learning new things.',
      questions: [
        {
          q: 'Where does the father work?',
          options: ['In a school', 'In a bank', 'In a hospital', 'In a library'],
          correct: 1,
          explanation: 'Matnda "my father works in a bank" deb aniq yozilgan.'
        },
        {
          q: 'When does the family like to spend time together?',
          options: ['On weekdays', 'On weekends', 'Only in summer', 'In the morning'],
          correct: 1,
          explanation: 'Matnda "We like to spend time together on weekends" deyilgan.'
        }
      ]
    },
    {
      id: 'b1_parks',
      level: 'B1 — O\'RTA',
      badge: 'O\'rta',
      duration: '7 daqiqa',
      title: 'City Parks',
      preview: 'City parks are extremely important for modern urban spaces...',
      fullText: 'City parks are essential for modern urban spaces. They provide green zones where residents can relax, exercise, and socialize. In dense cities, these green areas act as the lungs of the community, improving air quality significantly.\n\nStudies show that regular visits to public parks can reduce stress and promote mental health. Moreover, they are spaces where diverse groups of people gather, fostering a stronger sense of shared community and belonging.',
      questions: [
        {
          q: 'The main purpose of city parks is to provide...',
          options: ['entertainment for tourists', 'green space for residents', 'income for the city', 'parking for visitors'],
          correct: 1,
          explanation: 'Matnda: "They provide green zones where residents can relax..." jumlasi mavjud.'
        },
        {
          q: 'According to paragraph 2, air quality...',
          options: ['is not important', 'improves significantly', 'gets worse in parks', 'remains unchanged'],
          correct: 1,
          explanation: 'Matndagi "improving air quality significantly" iborasi bu javobni tasdiqlaydi.'
        }
      ]
    },
    {
      id: 'b2_ai',
      level: 'B2 — YUQORI O\'RTA',
      badge: 'Qiyin',
      duration: '10 daqiqa',
      title: 'Artificial Intelligence Era',
      preview: 'The profound rapid advancement of artificial intelligence is transforming...',
      fullText: 'The profound rapid advancement of artificial intelligence is transforming contemporary society across diverse sectors. From healthcare diagnostics to autonomous transportation, algorithms are surpassing human speed in processing intricate datasets.\n\nHowever, ethical considerations regarding data privacy and automated bias require rigorous global regulatory frameworks to ensure technology serves humanity equitably.',
      questions: [
        {
          q: 'What is required according to the text regarding AI?',
          options: ['Banning all AI systems', 'Rigorous global regulatory frameworks', 'Free internet for all', 'Decreasing computing power'],
          correct: 1,
          explanation: 'Matnda "require rigorous global regulatory frameworks" deb aytilgan.'
        }
      ]
    }
  ];

  // Timer interval
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimerRunning(false);
          setScreen('result');
          showToast('Vaqt tugadi! Natijangiz hisoblandi.', 'info');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, showToast]);

  // Format MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Start reading
  const startReading = (article) => {
    setSelectedArticle(article);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setSecondsLeft(240);
    setIsTimerRunning(true);
    setScreen('reading');
  };

  // Select option
  const handleSelectOption = (idx) => {
    setUserAnswers(prev => ({ ...prev, [currentQuestionIdx]: idx }));
  };

  // Next question or submit
  const handleNext = () => {
    if (currentQuestionIdx + 1 < selectedArticle.questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setIsTimerRunning(false);
      setScreen('result');
      addCoins(15, 'Reading muvaffaqiyatli yakunlandi (+15 coin)');
    }
  };

  return (
    <div style={{ padding: '20px', minHeight: '85vh' }}>
      
      {/* 1. ARTICLES LIST */}
      {screen === 'list' && (
        <div className="animate-fade">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <button
              onClick={onBack}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}
            >
              <ArrowLeft size={20} /> Orqaga
            </button>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
              Reading (Matnlar)
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {articles.map(art => (
              <div key={art.id}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  {art.level}
                </div>
                <div
                  onClick={() => startReading(art)}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: 'var(--shadow-sm)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ flex: 1, paddingRight: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--primary-100)',
                        color: 'var(--primary)',
                        fontSize: '11px',
                        fontWeight: 700
                      }}>
                        {art.badge}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                        {art.duration}
                      </span>
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {art.title}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {art.preview}
                    </div>
                  </div>
                  <ChevronRight size={18} color="var(--primary)" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. READING PASSAGE & QUESTION */}
      {screen === 'reading' && selectedArticle && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'space-between' }}>
          <div>
            {/* Top Bar with Timer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setScreen('list')}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <ArrowLeft size={20} />
                </button>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800 }}>
                  {selectedArticle.title}
                </h3>
              </div>
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
                <span>{formatTime(secondsLeft)}</span>
              </div>
            </div>

            {/* Passage Text Box */}
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              fontSize: '14px',
              color: 'var(--text-primary)',
              lineHeight: 1.6,
              marginBottom: '20px',
              maxHeight: '220px',
              overflowY: 'auto'
            }}>
              {selectedArticle.fullText}
            </div>

            {/* Current Question */}
            {selectedArticle.questions[currentQuestionIdx] && (
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px', marginBottom: '6px' }}>
                  SAVOL {currentQuestionIdx + 1} / {selectedArticle.questions.length}
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
                  {selectedArticle.questions[currentQuestionIdx].q}
                </div>

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedArticle.questions[currentQuestionIdx].options.map((opt, i) => {
                    const isSelected = userAnswers[currentQuestionIdx] === i;
                    const letters = ['A', 'B', 'C', 'D'];
                    return (
                      <div
                        key={i}
                        onClick={() => handleSelectOption(i)}
                        style={{
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-md)',
                          border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                          background: isSelected ? 'var(--primary-50)' : 'var(--bg-surface)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontWeight: 600,
                          fontSize: '14px'
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
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={userAnswers[currentQuestionIdx] === undefined}
            style={{
              marginTop: '20px',
              padding: '15px',
              borderRadius: 'var(--radius-md)',
              background: userAnswers[currentQuestionIdx] !== undefined ? 'var(--primary-gradient)' : 'var(--bg-subtle)',
              color: userAnswers[currentQuestionIdx] !== undefined ? '#FFFFFF' : 'var(--text-tertiary)',
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: userAnswers[currentQuestionIdx] !== undefined ? 'var(--shadow-primary)' : 'none'
            }}
          >
            {currentQuestionIdx + 1 < selectedArticle.questions.length ? 'Keyingisi' : 'Natijani ko\'rish'}
          </button>
        </div>
      )}

      {/* 3. RESULT SCREEN (Exact breakdown with citations from text) */}
      {screen === 'result' && selectedArticle && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setScreen('list')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}
            >
              <ArrowLeft size={20} />
            </button>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
              Natija
            </h2>
          </div>

          {/* Score Header */}
          <div style={{
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--border-subtle)',
            padding: '24px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--primary-100)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              fontWeight: 900,
              margin: '0 auto 12px auto'
            }}>
              {Object.keys(userAnswers).filter(k => userAnswers[k] === selectedArticle.questions[k]?.correct).length} / {selectedArticle.questions.length}
            </div>
            {(() => {
              const correctCount = Object.keys(userAnswers).filter(k => userAnswers[k] === selectedArticle.questions[k]?.correct).length;
              const totalQ = selectedArticle.questions.length || 1;
              const percent = Math.round((correctCount / totalQ) * 100);
              return (
                <>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {percent}% To'g'ri javob!
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {percent >= 80 ? 'Ajoyib ko\'rsatkich, yuqori natija!' : percent >= 50 ? 'Yaxshi natija, yana bir oz mashq qiling!' : 'Qayta o\'qib chiqishni tavsiya qilamiz!'}
                  </p>
                </>
              );
            })()}
          </div>

          {/* Savollar tahlili */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '10px' }}>
              SAVOLLAR TAHLILI
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedArticle.questions.map((q, idx) => {
                const userChoice = userAnswers[idx];
                const isCorrect = userChoice === q.correct;

                return (
                  <div
                    key={idx}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{idx + 1}-Savol</strong>
                      {isCorrect ? (
                        <CheckCircle2 size={18} color="var(--success)" />
                      ) : (
                        <AlertCircle size={18} color="var(--danger)" />
                      )}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      {q.q}
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: 600, color: isCorrect ? 'var(--success-dark)' : 'var(--danger)', marginBottom: '4px' }}>
                      Sizning javobingiz: {q.options[userChoice] || 'Javob berilmadi'}
                    </div>

                    {!isCorrect && (
                      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--success-dark)', marginBottom: '8px' }}>
                        To'g'ri javob: {q.options[q.correct]}
                      </div>
                    )}

                    {/* Explanation */}
                    <div style={{
                      padding: '10px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-subtle)',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4
                    }}>
                      💡 {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={() => setScreen('list')}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-gradient)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '15px',
                boxShadow: 'var(--shadow-primary)'
              }}
            >
              Boshqa matn tanlash
            </button>
            <button
              onClick={onBack}
              style={{
                padding: '13px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              Bosh sahifaga qaytish
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
