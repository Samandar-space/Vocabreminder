import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { speechService } from '../../services/speech';
import { PronunciationModal } from '../learning/PronunciationModal';
import confetti from 'canvas-confetti';
import { 
  X, Volume2, CheckCircle2, XCircle, BookOpen, 
  Mic, Sparkles, RotateCw, VolumeX, Keyboard, Zap
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
  const [isPronounceOpen, setIsPronounceOpen] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);
  
  // Swipe & Drag Gesture State (Tinder / Anki style)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  
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

  // Auto-play audio on word change (if enabled in flashcard mode)
  useEffect(() => {
    if (mode === 'flashcard' && autoPlayAudio && currentWord?.word && !isCompleted) {
      const timer = setTimeout(() => {
        speechService.speak(currentWord.word);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, mode, autoPlayAudio, currentWord?.word, isCompleted]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (mode !== 'flashcard' || isPronounceOpen || isCompleted) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleQualityAnswer('hard');
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleQualityAnswer('easy');
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        if (currentWord?.word) speechService.speak(currentWord.word);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, isPronounceOpen, isCompleted, currentWord]);

  // Generate randomized quiz options whenever current word changes
  useEffect(() => {
    if (!currentWord) return;

    const correct = currentWord.translation;
    const others = words.filter(w => w.id !== currentWord.id).map(w => w.translation);
    const shuffledOthers = others.sort(() => 0.5 - Math.random()).slice(0, 3);

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
    setDragOffset({ x: 0, y: 0 });
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

      {/* 2. MODE: 3D FLASHCARD (Swipe & Gesture Enabled) */}
      {mode === 'flashcard' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          
          {/* Top Options Bar (Auto-Audio & Shortcuts Hint) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
            fontSize: '12px',
            color: 'var(--text-tertiary)'
          }}>
            <button
              onClick={() => setAutoPlayAudio(prev => !prev)}
              className="btn-press"
              style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '4px 12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: autoPlayAudio ? 'var(--primary)' : 'var(--text-tertiary)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              {autoPlayAudio ? <Volume2 size={14} /> : <VolumeX size={14} />}
              Avto-audio: {autoPlayAudio ? 'Yoqilgan' : 'O\'chirilgan'}
            </button>

            <div style={{ display: 'none', md: 'block', fontSize: '11px', opacity: 0.8 }}>
              💡 [Space] Aylantirish • [←] Qiyin • [→] Oson
            </div>
          </div>

          {/* 3D Perspective Card Container with Gesture Drag */}
          <div className="flip-card-perspective">
            <div
              style={{
                position: 'relative',
                transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${dragOffset.x * 0.08}deg)`,
                transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: isDragging ? 'grabbing' : 'grab',
                touchAction: 'none'
              }}
              onPointerDown={(e) => {
                if (e.target.closest('button') || e.target.closest('.no-swipe')) return;
                setIsDragging(true);
                dragStartRef.current = { x: e.clientX, y: e.clientY };
              }}
              onPointerMove={(e) => {
                if (!isDragging) return;
                const dx = e.clientX - dragStartRef.current.x;
                const dy = e.clientY - dragStartRef.current.y;
                setDragOffset({ x: dx, y: dy });
              }}
              onPointerUp={() => {
                if (!isDragging) return;
                setIsDragging(false);
                const { x, y } = dragOffset;

                if (x > 90) {
                  setDragOffset({ x: 380, y: 0 });
                  setTimeout(() => {
                    setDragOffset({ x: 0, y: 0 });
                    handleQualityAnswer('easy');
                  }, 160);
                } else if (x < -90) {
                  setDragOffset({ x: -380, y: 0 });
                  setTimeout(() => {
                    setDragOffset({ x: 0, y: 0 });
                    handleQualityAnswer('hard');
                  }, 160);
                } else if (y < -80) {
                  setDragOffset({ x: 0, y: -280 });
                  setTimeout(() => {
                    setDragOffset({ x: 0, y: 0 });
                    handleQualityAnswer('medium');
                  }, 160);
                } else {
                  if (Math.abs(x) < 8 && Math.abs(y) < 8) {
                    setIsFlipped(prev => !prev);
                  }
                  setDragOffset({ x: 0, y: 0 });
                }
              }}
              onPointerCancel={() => {
                setIsDragging(false);
                setDragOffset({ x: 0, y: 0 });
              }}
            >
              {/* Dynamic Swipe Overlays */}
              {dragOffset.x > 35 && (
                <div className="swipe-badge swipe-badge-right" style={{ opacity: Math.min(1, dragOffset.x / 80) }}>
                  🟢 Esladim / Oson 👉
                </div>
              )}
              {dragOffset.x < -35 && (
                <div className="swipe-badge swipe-badge-left" style={{ opacity: Math.min(1, Math.abs(dragOffset.x) / 80) }}>
                  👈 Qiyin / Eslolmadim 🔴
                </div>
              )}
              {dragOffset.y < -35 && Math.abs(dragOffset.x) < 40 && (
                <div className="swipe-badge swipe-badge-up" style={{ opacity: Math.min(1, Math.abs(dragOffset.y) / 80) }}>
                  👆 O'rtacha 🟡
                </div>
              )}

              {/* 3D Flip Card Inner */}
              <div className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                
                {/* 1. FRONT FACE (ENGLISH) */}
                <div className="flip-card-face flip-card-front">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(255, 255, 255, 0.22)',
                      fontSize: '12px',
                      fontWeight: 800,
                      letterSpacing: '0.5px'
                    }}>
                      Leitner Quti #{currentWord.box || 1}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setIsPronounceOpen(true); }}
                      className="btn-press"
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                        color: '#FFFFFF',
                        borderRadius: 'var(--radius-full)',
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                      title="AI Talaffuz tekshirish"
                    >
                      <Mic size={14} /> Talaffuz sinash
                    </button>
                  </div>

                  <div style={{ margin: 'auto 0' }}>
                    <h2 style={{ fontSize: '38px', fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.5px' }}>
                      {currentWord.word}
                    </h2>
                    <div style={{ fontSize: '18px', opacity: 0.9, marginBottom: '16px' }}>
                      {currentWord.transcription || `/${currentWord.word.toLowerCase()}/`}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); speechService.speak(currentWord.word); }}
                      className="btn-press"
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.25)',
                        border: '1.5px solid rgba(255, 255, 255, 0.5)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
                      }}
                      title="Ovoz chiqarish"
                    >
                      <Volume2 size={28} />
                    </button>
                  </div>

                  <div style={{
                    fontSize: '13px',
                    opacity: 0.85,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <RotateCw size={14} /> Javobni ko'rish uchun bosing (yoki suring)
                  </div>
                </div>

                {/* 2. BACK FACE (UZBEK TRANSLATION & DETAILS) */}
                <div className="flip-card-face flip-card-back">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)' }}>
                        {currentWord.word}
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginLeft: '8px' }}>
                        {currentWord.transcription}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); speechService.speak(currentWord.word); }}
                        className="btn-press"
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'var(--primary-100)',
                          color: 'var(--primary)',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                        title="Ovoz chiqarish"
                      >
                        <Volume2 size={18} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setIsPronounceOpen(true); }}
                        className="btn-press"
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'rgba(124, 58, 237, 0.1)',
                          color: 'var(--primary)',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                        title="Talaffuz tekshirish"
                      >
                        <Mic size={18} />
                      </button>
                    </div>
                  </div>

                  <div style={{ margin: 'auto 0', textAlign: 'left' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      O'zbekcha tarjimasi:
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
                      {currentWord.translation}
                    </div>

                    {currentWord.example && (
                      <div style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-subtle)',
                        fontSize: '13.5px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                        borderLeft: '3px solid var(--primary)'
                      }}>
                        <strong style={{ color: 'var(--primary)', display: 'block', fontSize: '11px', marginBottom: '2px', textTransform: 'uppercase' }}>
                          Misol:
                        </strong>
                        "{currentWord.example}"
                      </div>
                    )}

                    {currentWord.tag && (
                      <div style={{ marginTop: '10px', display: 'flex', gap: '6px' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'var(--bg-subtle)',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: 'var(--text-tertiary)'
                        }}>
                          {currentWord.tag}
                        </span>
                      </div>
                    )}
                  </div>

                  <div style={{
                    fontSize: '12px',
                    color: 'var(--text-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}>
                    <RotateCw size={13} /> Orqaga aylantirish uchun bosing
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Flashcard Action Buttons (Below Card) */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <button
                onClick={() => handleQualityAnswer('hard')}
                className="btn-press"
                style={{
                  padding: '14px 10px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--danger-light)',
                  color: 'var(--danger)',
                  border: '1.5px solid rgba(239, 68, 68, 0.25)',
                  fontWeight: 800,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>🔴 Qiyin</span>
                <span style={{ fontSize: '10px', opacity: 0.8, fontWeight: 600 }}>Quti 1 ga qaytarish</span>
              </button>

              <button
                onClick={() => handleQualityAnswer('medium')}
                className="btn-press"
                style={{
                  padding: '14px 10px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text-primary)',
                  border: '1.5px solid var(--border-subtle)',
                  fontWeight: 800,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>🟡 O'rtacha</span>
                <span style={{ fontSize: '10px', opacity: 0.8, fontWeight: 600 }}>Shu qutida qoladi</span>
              </button>

              <button
                onClick={() => handleQualityAnswer('easy')}
                className="btn-press"
                style={{
                  padding: '14px 10px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--success-light)',
                  color: 'var(--success-dark)',
                  border: '1.5px solid rgba(16, 185, 129, 0.25)',
                  fontWeight: 800,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>🟢 Oson</span>
                <span style={{ fontSize: '10px', opacity: 0.8, fontWeight: 600 }}>Keyingi qutiga</span>
              </button>
            </div>
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

      {/* AI Pronunciation Modal */}
      <PronunciationModal
        isOpen={isPronounceOpen}
        onClose={() => setIsPronounceOpen(false)}
        word={currentWord}
      />
    </div>
  );
};
