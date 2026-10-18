import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { speechService } from '../../services/speech';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, Zap, Trophy, RotateCw, CheckCircle2, 
  XCircle, Clock, Headphones, Volume2, Flame, Send, Lightbulb 
} from 'lucide-react';

export const GameZone = ({ onBack }) => {
  const { words, addCoins, showToast, setCurrentTab } = useApp();

  // Active game: 'hub' | 'match' | 'speed' | 'dictation'
  const [activeGame, setActiveGame] = useState('hub');

  // ---------------- GAME 1: WORD MATCH (Juftlikni top) ----------------
  const [matchCards, setMatchCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [matchTimer, setMatchTimer] = useState(45);
  const [isMatchRunning, setIsMatchRunning] = useState(false);
  const [matchFinished, setMatchFinished] = useState(false);

  const startWordMatch = () => {
    const sample = [...words].sort(() => 0.5 - Math.random()).slice(0, 4);
    const cards = [];
    sample.forEach((item, index) => {
      cards.push({ id: `en_${index}`, pairId: index, text: item.word, type: 'en' });
      cards.push({ id: `uz_${index}`, pairId: index, text: item.translation, type: 'uz' });
    });
    setMatchCards(cards.sort(() => 0.5 - Math.random()));
    setSelectedCards([]);
    setMatchedIds([]);
    setMatchTimer(45);
    setIsMatchRunning(true);
    setMatchFinished(false);
    setActiveGame('match');
  };

  // Word Match Timer: stable interval
  useEffect(() => {
    if (!isMatchRunning) return;
    const interval = setInterval(() => {
      setMatchTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsMatchRunning(false);
          setMatchFinished(true);
          showToast('Vaqt tugadi!', 'info');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isMatchRunning, showToast]);

  // Check Word Match Victory
  useEffect(() => {
    if (!isMatchRunning || matchCards.length === 0) return;
    if (matchedIds.length === matchCards.length) {
      setIsMatchRunning(false);
      setMatchFinished(true);
      addCoins(25, 'Juftlikni top o\'yini g\'olib bo\'lindi (+25 coin)');
      try { confetti({ particleCount: 80, spread: 60 }); } catch {}
    }
  }, [matchedIds.length, matchCards.length, isMatchRunning, addCoins]);

  const handleCardClick = (card) => {
    if (selectedCards.length === 2 || matchedIds.includes(card.id)) return;
    if (selectedCards.find(c => c.id === card.id)) return;

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [c1, c2] = newSelected;
      if (c1.pairId === c2.pairId && c1.type !== c2.type) {
        // MATCH!
        setMatchedIds(prev => [...prev, c1.id, c2.id]);
        setSelectedCards([]);
      } else {
        // MISMATCH: Show feedback then clear
        setTimeout(() => setSelectedCards([]), 700);
      }
    }
  };

  // ---------------- GAME 2: SPEED QUIZ (60s Poyga) ----------------
  const [speedScore, setSpeedScore] = useState(0);
  const [speedTimer, setSpeedTimer] = useState(60);
  const [isSpeedRunning, setIsSpeedRunning] = useState(false);
  const [speedFinished, setSpeedFinished] = useState(false);
  const [currentSpeedWord, setCurrentSpeedWord] = useState(null);
  const [speedOptions, setSpeedOptions] = useState([]);
  const [speedFeedback, setSpeedFeedback] = useState(null);
  const speedScoreRef = useRef(0);

  useEffect(() => {
    speedScoreRef.current = speedScore;
  }, [speedScore]);

  const nextSpeedQuestion = (currentWordRef = null) => {
    if (!words || words.length === 0) return;
    let randWord;
    const current = currentWordRef || currentSpeedWord;
    if (words.length > 1 && current) {
      const candidates = words.filter(w => w.word !== current.word);
      randWord = candidates[Math.floor(Math.random() * candidates.length)] || words[0];
    } else {
      randWord = words[Math.floor(Math.random() * words.length)];
    }

    const otherTranslations = Array.from(new Set(
      words.filter(w => w.word !== randWord.word && w.translation !== randWord.translation)
           .map(w => w.translation)
    ));
    const fallbacks = ['yordam bermoq', 'o\'rganmoq', 'rivojlantirmoq', 'tushunmoq', 'boshlamoq', 'kuchaytirmoq'];
    const shuffledOthers = otherTranslations.sort(() => 0.5 - Math.random());
    while (shuffledOthers.length < 3) {
      const fb = fallbacks.find(f => f !== randWord.translation && !shuffledOthers.includes(f));
      if (fb) shuffledOthers.push(fb);
      else shuffledOthers.push(`Boshqa variant ${shuffledOthers.length + 1}`);
    }

    const distractors = shuffledOthers.slice(0, 3);
    const all = [randWord.translation, ...distractors].sort(() => 0.5 - Math.random());
    setCurrentSpeedWord(randWord);
    setSpeedOptions(all);
    setSpeedFeedback(null);
  };

  const startSpeedQuiz = () => {
    setSpeedScore(0);
    speedScoreRef.current = 0;
    setSpeedTimer(60);
    setSpeedFeedback(null);
    setIsSpeedRunning(true);
    setSpeedFinished(false);
    setActiveGame('speed');
    nextSpeedQuestion();
  };

  // Speed Quiz Timer: stable interval
  useEffect(() => {
    if (!isSpeedRunning) return;

    const interval = setInterval(() => {
      setSpeedTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSpeedRunning(false);
          setSpeedFinished(true);
          const finalScore = speedScoreRef.current;
          addCoins(finalScore * 2, `Speed Quiz yakunlandi: ${finalScore} to'g'ri (+${finalScore * 2} coin)`);
          if (finalScore >= 5) {
            try { confetti({ particleCount: 80, spread: 60 }); } catch {}
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSpeedRunning, addCoins]);

  const handleSpeedAnswer = (opt) => {
    if (speedFeedback || !currentSpeedWord) return;
    const isCorrect = opt === currentSpeedWord.translation;
    if (isCorrect) {
      setSpeedScore(prev => prev + 1);
    }
    setSpeedFeedback({ selected: opt, isCorrect });
    setTimeout(() => {
      nextSpeedQuestion();
    }, 350);
  };

  // ---------------- GAME 3: AUDIO DICTATION (Eshitib yozish) ----------------
  const [dictationList, setDictationList] = useState([]);
  const [dictationIndex, setDictationIndex] = useState(0);
  const [dictationInput, setDictationInput] = useState('');
  const [dictationChecked, setDictationChecked] = useState(false);
  const [dictationIsCorrect, setDictationIsCorrect] = useState(false);
  const [dictationStreak, setDictationStreak] = useState(0);
  const [dictationScore, setDictationScore] = useState(0);
  const [dictationShowHint, setDictationShowHint] = useState(false);
  const [dictationFinished, setDictationFinished] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const inputRef = useRef(null);

  const currentDictationWord = dictationList[dictationIndex];

  const startAudioDictation = () => {
    // Pick up to 8 randomized words strictly from user's words
    const count = Math.min(8, words.length);
    const shuffled = [...words].sort(() => 0.5 - Math.random()).slice(0, count);
    setDictationList(shuffled);
    setDictationIndex(0);
    setDictationInput('');
    setDictationChecked(false);
    setDictationIsCorrect(false);
    setDictationStreak(0);
    setDictationScore(0);
    setDictationShowHint(false);
    setDictationFinished(false);
    setActiveGame('dictation');

    // Auto-pronounce first word
    if (shuffled[0]) {
      setTimeout(() => {
        speechService.speak(shuffled[0].word, 'en-US', 0.9);
      }, 400);
    }
  };

  const playDictationAudio = (speedRate = 0.9) => {
    if (!currentDictationWord) return;
    setIsAudioPlaying(true);
    speechService.speak(currentDictationWord.word, 'en-US', speedRate);
    setTimeout(() => setIsAudioPlaying(false), 1200);
    if (inputRef.current) inputRef.current.focus();
  };

  const cleanWordForDictation = (text) => {
    return (text || '')
      .toLowerCase()
      .replace(/\(.*?\)/g, '')
      .replace(/[^a-z0-9\s'-]/g, '')
      .trim();
  };

  const handleCheckDictation = (e) => {
    if (e) e.preventDefault();
    if (dictationChecked) {
      nextDictationWord();
      return;
    }
    if (!dictationInput.trim()) return;

    const userClean = cleanWordForDictation(dictationInput);
    const correctClean = cleanWordForDictation(currentDictationWord.word);
    const isRight = userClean === correctClean || 
                    (correctClean.startsWith('to ') && userClean === correctClean.replace(/^to\s+/, '')) ||
                    (userClean.startsWith('to ') && userClean.replace(/^to\s+/, '') === correctClean);

    setDictationChecked(true);
    setDictationIsCorrect(isRight);

    if (isRight) {
      const nextStreak = dictationStreak + 1;
      setDictationStreak(nextStreak);
      setDictationScore(prev => prev + 1);

      // Streak confetti bonus
      if (nextStreak >= 3) {
        try { confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } }); } catch {}
      }
    } else {
      setDictationStreak(0);
    }
  };

  const nextDictationWord = () => {
    if (dictationIndex + 1 < dictationList.length) {
      const nextIdx = dictationIndex + 1;
      setDictationIndex(nextIdx);
      setDictationInput('');
      setDictationChecked(false);
      setDictationIsCorrect(false);
      setDictationShowHint(false);
      setTimeout(() => {
        speechService.speak(dictationList[nextIdx].word, 'en-US', 0.9);
      }, 300);
      if (inputRef.current) inputRef.current.focus();
    } else {
      // Completed round!
      setDictationFinished(true);
      const coinsEarned = dictationScore * 5 + 10;
      addCoins(coinsEarned, `Audio Dictation yakunlandi: ${dictationScore}/${dictationList.length} (+${coinsEarned} coin)`);
      try { confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } }); } catch {}
    }
  };

  // Condition: O'yinlar FAQAT foydalanuvchi kiritgan so'zlardan tuziladi (Kamida 4 ta so'z)
  if (!words || words.length < 4) {
    return (
      <div style={{ padding: '24px 20px', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <button
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '32px', cursor: 'pointer', background: 'transparent', border: 'none' }}
          >
            <ArrowLeft size={20} /> Orqaga
          </button>

          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{
              width: '84px',
              height: '84px',
              borderRadius: '24px',
              background: 'var(--primary-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              color: 'var(--primary)'
            }}>
              <Zap size={44} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              O'yinlar uchun kamida 4 ta so'z kerak
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '320px', margin: '0 auto 28px auto' }}>
              <strong>Zero Fake Data</strong> qoidasi: O'yinlarda begona so'zlar bo'lmaydi — faqat siz qo'shgan shaxsiy so'zlar ishtirok etadi. Hozir lug'atingizda <strong>{words ? words.length : 0} ta</strong> so'z bor.
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
                boxShadow: 'var(--shadow-primary)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              So'z qo'shish bo'limiga o'tish
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', minHeight: '85vh' }}>
      
      {/* 1. GAME HUB */}
      {activeGame === 'hub' && (
        <div className="animate-fade">
          {/* Top Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <button
              onClick={onBack}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer' }}
            >
              <ArrowLeft size={20} /> Orqaga
            </button>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
              Game Zone (O'yinlar)
            </h2>
          </div>

          {/* Banner */}
          <div style={{
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #4F46E5 100%)',
            color: '#FFFFFF',
            padding: '24px 20px',
            boxShadow: 'var(--shadow-primary)',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>
              O'yna va Coin ishlab top!
            </h3>
            <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: 1.5 }}>
              Ingliz tilini interaktiv o'yinlar orqali takrorlang, eshitish va imlo (spelling) qobiliyatingizni charxlang.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Game 3: Audio Dictation (YANGI!) */}
            <div
              onClick={startAudioDictation}
              style={{
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--primary-200)',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'var(--primary-gradient)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-primary)'
                }}>
                  <Headphones size={26} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      Audio Dictation (Eshitib yozish)
                    </span>
                    <span style={{
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--primary-100)',
                      color: 'var(--primary)',
                      fontSize: '10px',
                      fontWeight: 800
                    }}>
                      YANGI
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Talaffuzni tinglab, so'zni to'g'ri imloda yozing
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gold-dark)', background: 'var(--gold-light)', padding: '4px 8px', borderRadius: 'var(--radius-full)' }}>
                +30 coin
              </span>
            </div>

            {/* Game 1: Juftlikni top */}
            <div
              onClick={startWordMatch}
              style={{
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'var(--primary-100)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Zap size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Juftlikni top (Word Match)
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    So'z va tarjimalarni tezlikda ulang (45s)
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gold-dark)' }}>
                +25 coin
              </span>
            </div>

            {/* Game 2: Speed Quiz */}
            <div
              onClick={startSpeedQuiz}
              style={{
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'var(--gold-light)',
                  color: 'var(--gold-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Trophy size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Tezkor poyga (Speed Quiz)
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    60 soniya ichida eng ko'p to'g'ri javob toping
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gold-dark)' }}>
                2x coin
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. AUDIO DICTATION GAME (Eshitib yozish) */}
      {activeGame === 'dictation' && (
        <div className="animate-fade">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <button onClick={() => setActiveGame('hub')} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <ArrowLeft size={20} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                {dictationIndex + 1} / {dictationList.length}
              </span>
              {dictationStreak >= 2 && (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#EF4444',
                  background: '#FEF2F2',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)'
                }}>
                  <Flame size={12} fill="#EF4444" /> {dictationStreak}x Streak
                </span>
              )}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>
              Ball: {dictationScore}
            </div>
          </div>

          {!dictationFinished && currentDictationWord ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Listening Player Card */}
              <div style={{
                borderRadius: 'var(--radius-xl)',
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-md)',
                padding: '36px 20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <button
                  type="button"
                  onClick={() => playDictationAudio(0.9)}
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    background: 'var(--primary-gradient)',
                    color: '#FFFFFF',
                    border: 'none',
                    boxShadow: isAudioPlaying 
                      ? '0 0 0 12px rgba(124, 58, 237, 0.25)' 
                      : 'var(--shadow-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Volume2 size={36} />
                </button>

                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    So'zni tinglang va yozing
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    Tugmani bosib talaffuzni qayta eshiting
                  </p>
                </div>

                {/* Audio Speed Controls */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => playDictationAudio(0.9)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    1.0x Tezlik
                  </button>
                  <button
                    type="button"
                    onClick={() => playDictationAudio(0.65)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    🐢 0.65x Sekin
                  </button>
                </div>

                {/* Hint toggle */}
                <button
                  type="button"
                  onClick={() => setDictationShowHint(prev => !prev)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--primary)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '4px'
                  }}
                >
                  <Lightbulb size={14} />
                  {dictationShowHint 
                    ? `Tarjimasi: "${currentDictationWord.translation}"` 
                    : 'Maslahat olish'}
                </button>
              </div>

              {/* Input & Form */}
              <form onSubmit={handleCheckDictation} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    ref={inputRef}
                    type="text"
                    autoFocus
                    readOnly={dictationChecked}
                    placeholder={dictationChecked ? "Keyingisiga o'tish uchun Enter bosing..." : "Inglizcha so'zni yozing..."}
                    value={dictationInput}
                    onChange={(e) => setDictationInput(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '16px 18px',
                      borderRadius: 'var(--radius-md)',
                      border: dictationChecked 
                        ? (dictationIsCorrect ? '2.5px solid var(--success)' : '2.5px solid var(--danger)')
                        : '1.5px solid var(--border-subtle)',
                      background: 'var(--bg-surface)',
                      fontSize: '17px',
                      fontWeight: 700,
                      letterSpacing: '0.3px',
                      color: 'var(--text-primary)',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  />

                  <button
                    type="submit"
                    disabled={!dictationChecked && !dictationInput.trim()}
                    style={{
                      padding: '16px 20px',
                      borderRadius: 'var(--radius-md)',
                      background: !dictationChecked && !dictationInput.trim() ? 'var(--bg-subtle)' : 'var(--primary-gradient)',
                      color: !dictationChecked && !dictationInput.trim() ? 'var(--text-tertiary)' : '#FFFFFF',
                      border: 'none',
                      cursor: !dictationChecked && !dictationInput.trim() ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '14px',
                      gap: '6px',
                      minWidth: dictationChecked ? '110px' : 'auto'
                    }}
                  >
                    {dictationChecked ? 'Keyingisi ➔' : <Send size={18} />}
                  </button>
                </div>

                {/* Feedback Card */}
                {dictationChecked && (
                  <div style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    background: dictationIsCorrect ? 'var(--success-light)' : 'var(--danger-light)',
                    border: `1.5px solid ${dictationIsCorrect ? 'var(--success)' : 'var(--danger)'}`,
                    color: dictationIsCorrect ? 'var(--success-dark)' : 'var(--danger)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    animation: 'slideUp 0.2s ease'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {dictationIsCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '15px' }}>
                          {dictationIsCorrect ? 'To\'g\'ri imlo! (+5 coin)' : `Xato! To'g'ri yozilishi: ${currentDictationWord.word}`}
                        </div>
                        <div style={{ fontSize: '12px', opacity: 0.9, marginTop: '2px' }}>
                          Tarjima: "{currentDictationWord.translation}" {currentDictationWord.transcription ? `• ${currentDictationWord.transcription}` : ''}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={nextDictationWord}
                      style={{
                        padding: '10px 18px',
                        borderRadius: 'var(--radius-sm)',
                        background: dictationIsCorrect ? 'var(--success)' : 'var(--danger)',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '13px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Keyingisi ➔
                    </button>
                  </div>
                )}
              </form>
            </div>
          ) : (
            /* Finished Round Screen */
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'var(--success-light)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                color: 'var(--success)'
              }}>
                <Trophy size={42} />
              </div>

              <h3 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '6px' }}>
                Natija: {dictationScore} / {dictationList.length} to'g'ri!
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Siz eshitib yozish orqali +{dictationScore * 5 + 10} coin ishlab oldingiz!
              </p>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={startAudioDictation}
                  style={{
                    padding: '14px 24px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--primary-gradient)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <RotateCw size={16} /> Qayta o'ynash
                </button>
                <button
                  onClick={() => setActiveGame('hub')}
                  style={{
                    padding: '14px 20px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-subtle)',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  Bosh menyu
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. WORD MATCH GAME */}
      {activeGame === 'match' && (
        <div className="animate-fade">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <button onClick={() => setActiveGame('hub')} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <ArrowLeft size={20} />
            </button>
            <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Juftlikni top</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: matchTimer <= 10 ? 'var(--danger)' : 'var(--primary)', fontWeight: 800 }}>
              <Clock size={16} />
              <span>{matchTimer}s</span>
            </div>
          </div>

          {!matchFinished ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {matchCards.map(card => {
                const isSelected = selectedCards.find(c => c.id === card.id);
                const isMatched = matchedIds.includes(card.id);
                const isMismatch = selectedCards.length === 2 && isSelected && !isMatched;

                return (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card)}
                    style={{
                      padding: '24px 12px',
                      borderRadius: 'var(--radius-md)',
                      background: isMatched ? 'var(--success-light)' : isMismatch ? 'var(--danger-light)' : isSelected ? 'var(--primary-100)' : 'var(--bg-surface)',
                      border: `2px solid ${isMatched ? 'var(--success)' : isMismatch ? 'var(--danger)' : isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      color: isMatched ? 'var(--success-dark)' : isMismatch ? 'var(--danger)' : isSelected ? 'var(--primary)' : 'var(--text-primary)',
                      textAlign: 'center',
                      fontWeight: 800,
                      fontSize: '15px',
                      cursor: isMatched ? 'default' : 'pointer',
                      opacity: isMatched ? 0.6 : 1,
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'all 0.2s ease',
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    {card.text}
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
                {matchedIds.length === matchCards.length ? 'Qoyilmaqom g\'alaba! 🎉' : 'Vaqt tugadi!'}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                {matchedIds.length / 2} ta juftlik topildi.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={startWordMatch}
                  style={{ padding: '14px 24px', borderRadius: 'var(--radius-md)', background: 'var(--primary-gradient)', color: '#FFFFFF', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <RotateCw size={16} /> Qayta o'ynash
                </button>
                <button
                  onClick={() => setActiveGame('hub')}
                  style={{
                    padding: '14px 22px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-subtle)',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  Bosh menyu
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. SPEED QUIZ GAME */}
      {activeGame === 'speed' && (
        <div className="animate-fade">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <button onClick={() => setActiveGame('hub')} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <ArrowLeft size={20} />
            </button>
            <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--primary)' }}>
              Ball: {speedScore}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: speedTimer <= 10 ? 'var(--danger)' : 'var(--gold-dark)', fontWeight: 800 }}>
              <Clock size={16} />
              <span>{speedTimer}s</span>
            </div>
          </div>

          {!speedFinished && currentSpeedWord ? (
            <div>
              <div style={{
                borderRadius: 'var(--radius-lg)',
                background: 'var(--primary-gradient)',
                color: '#FFFFFF',
                padding: '36px 20px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-primary)',
                marginBottom: '24px'
              }}>
                <span style={{ fontSize: '11px', opacity: 0.8, letterSpacing: '1px' }}>TEZKOR SAVOL</span>
                <h2 style={{ fontSize: '32px', fontWeight: 900, marginTop: '6px' }}>
                  {currentSpeedWord.word}
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {speedOptions.map((opt, i) => {
                  const isSelected = speedFeedback?.selected === opt;
                  const isFeedback = !!speedFeedback;
                  let bg = 'var(--bg-surface)';
                  let border = '1.5px solid var(--border-subtle)';
                  let color = 'var(--text-primary)';

                  if (isFeedback) {
                    if (opt === currentSpeedWord.translation) {
                      bg = 'var(--success-light)';
                      border = '2px solid var(--success)';
                      color = 'var(--success-dark)';
                    } else if (isSelected && !speedFeedback.isCorrect) {
                      bg = 'var(--danger-light)';
                      border = '2px solid var(--danger)';
                      color = 'var(--danger)';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={isFeedback}
                      onClick={() => handleSpeedAnswer(opt)}
                      style={{
                        padding: '16px',
                        borderRadius: 'var(--radius-md)',
                        background: bg,
                        border: border,
                        fontWeight: 700,
                        fontSize: '15px',
                        color: color,
                        boxShadow: 'var(--shadow-sm)',
                        cursor: isFeedback ? 'default' : 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <h3 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '6px' }}>
                Natija: {speedScore} ta so'z!
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Siz +{speedScore * 2} coin ishlab oldingiz!
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={startSpeedQuiz}
                  style={{ padding: '14px 24px', borderRadius: 'var(--radius-md)', background: 'var(--primary-gradient)', color: '#FFFFFF', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <RotateCw size={16} /> Yana urinib ko'rish
                </button>
                <button
                  onClick={() => setActiveGame('hub')}
                  style={{
                    padding: '14px 22px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-subtle)',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  Bosh menyu
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
