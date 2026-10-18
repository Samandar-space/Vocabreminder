import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { speechService } from '../../services/speech';
import confetti from 'canvas-confetti';
import { 
  X, Volume2, CheckCircle2, XCircle, BookOpen 
} from 'lucide-react';

export const ReviewSession = ({ onFinish }) => {
  const { words, recordReviewResult, addCoins, showToast, setCurrentTab } = useApp();

  // Fixed: Capture session deck once on mount so it does not dynamically shrink and skip cards!
  const [sessionDeck, setSessionDeck] = useState(() => {
    const due = words.filter(w => new Date(w.nextReviewDate) <= new Date());
    if (due.length > 0) return [...due];
    return words.slice(0, 10);
  });
  const [initialDeckLength] = useState(() => {
    const due = words.filter(w => new Date(w.nextReviewDate) <= new Date());
    return due.length > 0 ? due.length : Math.min(words.length, 10);
  });
  const [repeatCount, setRepeatCount] = useState(0);
  const [lastAnswerWasWrong, setLastAnswerWasWrong] = useState(false);

  // Session state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState('flashcard'); // 'flashcard' | 'quiz' | 'spelling'
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Quiz specific states
  const [quizSelectedOption, setQuizSelectedOption] = useState(null);
  const [quizIsAnswered, setQuizIsAnswered] = useState(false);
  const [quizOptions, setQuizOptions] = useState([]);

  // Spelling mode state
  const [spellingInput, setSpellingInput] = useState('');
  const [spellingChecked, setSpellingChecked] = useState(false);

  // Results tracker
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentWord = sessionDeck[currentIndex];

  // Generate randomized quiz options whenever current word changes
  useEffect(() => {
    if (!currentWord) return;

    const correct = currentWord.translation;
    // Pick 3 distractors from other words
    const others = words.filter(w => w.id !== currentWord.id).map(w => w.translation);
    const shuffledOthers = others.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Fallback distractors if user has fewer than 4 words
    const fallbacks = ['saqlamoq', 'oshirmoq', 'kamaytirmoq', 'to\'xtatmoq', 'boshlamoq', 'o\'rganmoq'];
    while (shuffledOthers.length < 3) {
      const fb = fallbacks.find(f => f !== correct && !shuffledOthers.includes(f));
      if (fb) shuffledOthers.push(fb);
      else shuffledOthers.push('boshqa ma\'no ' + (shuffledOthers.length + 1));
    }

    const allOpts = [correct, ...shuffledOthers].sort(() => 0.5 - Math.random());
    setQuizOptions(allOpts);
    setQuizSelectedOption(null);
    setQuizIsAnswered(false);
    setIsFlipped(false);
    setSpellingInput('');
    setSpellingChecked(false);
  }, [currentIndex, currentWord, words]);

  // If no words exist in vocabulary - rendered AFTER all hooks
  if (words.length === 0) {
    return (
      <div style={{
        padding: '60px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        textAlign: 'center'
      }}>
        <div style={{
          width: '84px',
          height: '84px',
          borderRadius: '50%',
          background: 'var(--primary-100)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <BookOpen size={40} color="var(--primary)" />
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Lug'atingizda hali so'zlar yo'q
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px', maxWidth: '300px' }}>
          Takrorlash darsini boshlash uchun avval lug'atingizga so'zlar qo'shing.
        </p>
        <button
          onClick={() => setCurrentTab('words')}
          style={{
            padding: '14px 28px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-gradient)',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '15px',
            boxShadow: 'var(--shadow-primary)'
          }}
        >
          So'z qo'shish bo'limiga o'tish
        </button>
      </div>
    );
  }

  // Flashcard quality answer
  const handleQualityAnswer = (quality) => {
    const isHard = quality === 'hard';
    if (!isHard) {
      setCorrectAnswers(prev => prev + 1);
    }
    recordReviewResult(currentWord.id, quality);
    if (isHard) {
      showToast('So\'z dars oxirida yana qayta so\'raladi', 'info');
    }
    nextStep(isHard);
  };

  // Quiz Option Click
  const handleQuizOptionClick = (option) => {
    if (quizIsAnswered) return;
    setQuizSelectedOption(option);
    setQuizIsAnswered(true);

    const isCorrect = option === currentWord.translation;
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      recordReviewResult(currentWord.id, 'easy');
      setLastAnswerWasWrong(false);
      showToast('To\'g\'ri javob! (+3 coin)', 'success');
    } else {
      recordReviewResult(currentWord.id, 'hard');
      setLastAnswerWasWrong(true);
      showToast('Noto\'g\'ri! So\'z dars oxirida yana qayta so\'raladi', 'error');
    }
  };

  const cleanSpelling = (text) => {
    return (text || '')
      .toLowerCase()
      .replace(/\(.*?\)/g, '')
      .replace(/[^a-z0-9\s'-]/g, '')
      .trim();
  };

  // Spelling Check
  const handleSpellingCheck = (e) => {
    e.preventDefault();
    if (!spellingInput.trim()) return;
    setSpellingChecked(true);

    const cleanUser = cleanSpelling(spellingInput);
    const cleanWord = cleanSpelling(currentWord.word);
    const isCorrect = cleanUser === cleanWord ||
                      (cleanWord.startsWith('to ') && cleanUser === cleanWord.replace(/^to\s+/, '')) ||
                      (cleanUser.startsWith('to ') && cleanUser.replace(/^to\s+/, '') === cleanWord);

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      recordReviewResult(currentWord.id, 'easy');
      setLastAnswerWasWrong(false);
      showToast('Zo\'r! To\'g\'ri yozdingiz (+5 coin)', 'success');
    } else {
      recordReviewResult(currentWord.id, 'hard');
      setLastAnswerWasWrong(true);
      showToast('Xato yozildi! So\'z dars oxirida yana qayta so\'raladi', 'error');
    }
  };

  // Next Word or Finish
  const nextStep = (repeatCurrent = false) => {
    // Prevent MouseEvent objects from making repeatCurrent truthy on correct answers!
    const isBoolRepeat = typeof repeatCurrent === 'boolean' ? repeatCurrent : false;
    const shouldRepeat = isBoolRepeat || lastAnswerWasWrong;
    setLastAnswerWasWrong(false);

    let nextDeckLength = sessionDeck.length;
    if (shouldRepeat && currentWord) {
      setSessionDeck(prev => [...prev, currentWord]);
      setRepeatCount(prev => prev + 1);
      nextDeckLength += 1;
    }

    if (currentIndex + 1 < nextDeckLength) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Finished!
      setIsCompleted(true);
      addCoins(15, 'Takrorlash darsi yakunlandi (+15 coin)');
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {
        // ignore if confetti fails
      }
    }
  };

  // 1. SESSION COMPLETED ("TAYYOR!" SCREEN)
  if (isCompleted) {
    const accuracyPercent = Math.min(100, Math.round((correctAnswers / Math.max(initialDeckLength, 1)) * 100));

    return (
      <div 
        className="animate-fade"
        style={{
          minHeight: '85vh',
          padding: '40px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
          <div style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'var(--success-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            boxShadow: 'var(--success-glow)'
          }}>
            <CheckCircle2 size={50} color="var(--success)" />
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Tayyor!
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '280px', marginBottom: '32px' }}>
            Bugungi barcha takrorlashlar muvaffaqiyatli yakunlandi.
          </p>

          {/* Stats Summary Card */}
          <div style={{
            width: '100%',
            maxWidth: '340px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            padding: '20px',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Takrorlangan so'zlar</span>
              <strong style={{ color: 'var(--text-primary)' }}>{initialDeckLength} ta so'z</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Aniq javoblar</span>
              <strong style={{ color: 'var(--success)' }}>{correctAnswers} ({accuracyPercent}%)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Keyingi takrorlash</span>
              <strong style={{ color: 'var(--primary)' }}>3 soatdan keyin</strong>
            </div>
          </div>
        </div>

        <button
          onClick={onFinish}
          style={{
            width: '100%',
            maxWidth: '340px',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-gradient)',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '15px',
            boxShadow: 'var(--shadow-primary)'
          }}
        >
          Bosh sahifaga
        </button>
      </div>
    );
  }

  // Progress percentage
  const progress = Math.min(100, Math.round(((currentIndex + 1) / Math.max(sessionDeck.length, 1)) * 100));

  return (
    <div style={{ padding: '16px 20px 30px 20px', minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <button
          onClick={onFinish}
          style={{ padding: '8px', color: 'var(--text-tertiary)', borderRadius: '50%', background: 'var(--bg-subtle)' }}
        >
          <X size={20} />
        </button>

        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800 }}>
          Takrorlash darsi
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {repeatCount > 0 && (
            <span style={{
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--danger-light)',
              color: 'var(--danger)',
              fontSize: '11px',
              fontWeight: 800
            }}>
              +{repeatCount} qayta
            </span>
          )}
          <div style={{
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary-100)',
            color: 'var(--primary)',
            fontSize: '13px',
            fontWeight: 800
          }}>
            {currentIndex + 1}/{sessionDeck.length}
          </div>
        </div>
      </div>

      {/* Top Progress Bar */}
      <div style={{
        width: '100%',
        height: '4px',
        background: 'var(--bg-subtle)',
        borderRadius: '2px',
        marginBottom: '20px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'var(--primary)',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Mode Switcher Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        background: 'var(--bg-subtle)',
        padding: '4px',
        borderRadius: 'var(--radius-md)',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => setMode('flashcard')}
          style={{
            padding: '7px',
            borderRadius: 'var(--radius-sm)',
            background: mode === 'flashcard' ? 'var(--bg-surface)' : 'transparent',
            color: mode === 'flashcard' ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '12px'
          }}
        >
          Karta (Flashcard)
        </button>
        <button
          onClick={() => setMode('quiz')}
          style={{
            padding: '7px',
            borderRadius: 'var(--radius-sm)',
            background: mode === 'quiz' ? 'var(--bg-surface)' : 'transparent',
            color: mode === 'quiz' ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '12px'
          }}
        >
          Variantli Test
        </button>
        <button
          onClick={() => setMode('spelling')}
          style={{
            padding: '7px',
            borderRadius: 'var(--radius-sm)',
            background: mode === 'spelling' ? 'var(--bg-surface)' : 'transparent',
            color: mode === 'spelling' ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '12px'
          }}
        >
          Yozish (Spelling)
        </button>
      </div>

      {/* 2. MODE: FLASHCARD */}
      {mode === 'flashcard' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Card Front (Unflipped) */}
          {!isFlipped ? (
            <div
              onClick={() => setIsFlipped(true)}
              style={{
                borderRadius: 'var(--radius-xl)',
                background: 'var(--primary-gradient)',
                color: '#FFFFFF',
                padding: '40px 24px',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                boxShadow: 'var(--shadow-primary)',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '8px' }}>
                {currentWord.word}
              </h2>
              <div style={{ fontSize: '18px', opacity: 0.9, marginBottom: '20px' }}>
                {currentWord.transcription}
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); speechService.speak(currentWord.word); }}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <Volume2 size={24} />
              </button>
              <div style={{ position: 'absolute', bottom: '20px', fontSize: '13px', opacity: 0.8 }}>
                Javobni ko'rish uchun bosing
              </div>
            </div>
          ) : (
            /* Card Back (Flipped) */
            <div
              style={{
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                padding: '30px 24px',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div>
                    <h2 style={{ fontSize: '30px', fontWeight: 800, color: 'var(--primary)' }}>
                      {currentWord.word}
                    </h2>
                    <div style={{ fontSize: '15px', color: 'var(--text-tertiary)' }}>
                      {currentWord.transcription}
                    </div>
                  </div>
                  <button
                    onClick={() => speechService.speak(currentWord.word)}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'var(--primary-100)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Volume2 size={20} />
                  </button>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    TARJIMASI
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {currentWord.translation}
                  </div>
                </div>

                {currentWord.example && (
                  <div style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-subtle)',
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5
                  }}>
                    <strong style={{ color: 'var(--primary)', display: 'block', fontSize: '11px', marginBottom: '2px' }}>MISOL:</strong>
                    "{currentWord.example}"
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Flashcard Bottom Action Buttons */}
          <div style={{ marginTop: '24px' }}>
            {!isFlipped ? (
              <button
                onClick={() => setIsFlipped(true)}
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
                Javobni ko'rsatish
              </button>
            ) : (
              <div>
                <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  Qanchalik oson bo'ldi?
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <button
                    onClick={() => handleQualityAnswer('hard')}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--danger-light)',
                      color: 'var(--danger)',
                      fontWeight: 700,
                      fontSize: '14px'
                    }}
                  >
                    Qiyin
                  </button>
                  <button
                    onClick={() => handleQualityAnswer('medium')}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-subtle)',
                      color: 'var(--text-primary)',
                      fontWeight: 700,
                      fontSize: '14px'
                    }}
                  >
                    O'rtacha
                  </button>
                  <button
                    onClick={() => handleQualityAnswer('easy')}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--success-light)',
                      color: 'var(--success-dark)',
                      fontWeight: 700,
                      fontSize: '14px'
                    }}
                  >
                    Oson
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. MODE: 4-CHOICE QUIZ (Matches the exact 3 states from the designs!) */}
      {mode === 'quiz' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '1px', marginBottom: '8px' }}>
                TARJIMASINI TOPING
              </div>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {currentWord.word}
              </h2>
            </div>

            {/* 4 Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quizOptions.map((opt, i) => {
                const isSelected = quizSelectedOption === opt;
                const isCorrect = opt === currentWord.translation;

                // Color styling based on state
                let borderColor = 'var(--border-subtle)';
                let bgColor = 'var(--bg-surface)';
                let textColor = 'var(--text-primary)';
                let badge = null;

                if (quizIsAnswered) {
                  if (isCorrect) {
                    borderColor = 'var(--success)';
                    bgColor = 'var(--success-light)';
                    textColor = 'var(--success-dark)';
                    badge = <CheckCircle2 size={18} color="var(--success)" />;
                  } else if (isSelected && !isCorrect) {
                    borderColor = 'var(--danger)';
                    bgColor = 'var(--danger-light)';
                    textColor = 'var(--danger)';
                    badge = <XCircle size={18} color="var(--danger)" />;
                  }
                } else if (isSelected) {
                  borderColor = 'var(--primary)';
                  bgColor = 'var(--primary-50)';
                }

                return (
                  <div
                    key={i}
                    onClick={() => handleQuizOptionClick(opt)}
                    style={{
                      padding: '16px 20px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${borderColor}`,
                      background: bgColor,
                      color: textColor,
                      fontWeight: 600,
                      fontSize: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: quizIsAnswered ? 'default' : 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <span>{opt}</span>
                    {badge}
                  </div>
                );
              })}
            </div>
          </div>

          {quizIsAnswered && (
            <button
              onClick={() => nextStep()}
              style={{
                marginTop: '24px',
                padding: '16px',
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
          )}
        </div>
      )}

      {/* 4. MODE: SPELLING (Yozma kiritish) */}
      {mode === 'spelling' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '1px', marginBottom: '8px' }}>
                INGLIZCHA SO'ZNI YOZING
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
                "{currentWord.translation}"
              </h2>
            </div>

            <form onSubmit={handleSpellingCheck} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="text"
                autoFocus
                placeholder="Inglizcha so'zni kiriting..."
                value={spellingInput}
                disabled={spellingChecked}
                onChange={(e) => setSpellingInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${spellingChecked ? (spellingInput.trim().toLowerCase() === currentWord.word.toLowerCase() ? 'var(--success)' : 'var(--danger)') : 'var(--border-subtle)'}`,
                  background: 'var(--bg-subtle)',
                  fontSize: '18px',
                  fontWeight: 700,
                  textAlign: 'center'
                }}
              />

              {spellingChecked && (
                <div style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  background: spellingInput.trim().toLowerCase() === currentWord.word.toLowerCase() ? 'var(--success-light)' : 'var(--danger-light)',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: spellingInput.trim().toLowerCase() === currentWord.word.toLowerCase() ? 'var(--success-dark)' : 'var(--danger)'
                }}>
                  {spellingInput.trim().toLowerCase() === currentWord.word.toLowerCase() ? (
                    'To\'g\'ri! 🎉'
                  ) : (
                    <span>To'g'ri javob: <strong>{currentWord.word}</strong></span>
                  )}
                </div>
              )}

              {!spellingChecked ? (
                <button
                  type="submit"
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
                  Tekshirish
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => nextStep()}
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
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
