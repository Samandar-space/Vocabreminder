import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Gamepad2, Zap, Trophy, RotateCw, CheckCircle2, Sparkles, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GameZone = ({ onBack }) => {
  const { words, addCoins, showToast } = useApp();

  // Active game: 'hub' | 'match' | 'speed'
  const [activeGame, setActiveGame] = useState('hub');

  // Fallback vocab if user has few words
  const baseVocab = words.length >= 4 ? words : [
    { word: 'challenge', translation: 'qiyinchilik' },
    { word: 'achieve', translation: 'erishmoq' },
    { word: 'essential', translation: 'o\'ta muhim' },
    { word: 'maintain', translation: 'saqlamoq' },
    { word: 'consistent', translation: 'barqaror' },
    { word: 'opportunity', translation: 'imkoniyat' }
  ];

  // ---------------- GAME 1: WORD MATCH (Juftlikni top) ----------------
  const [matchCards, setMatchCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [matchTimer, setMatchTimer] = useState(45);
  const [isMatchRunning, setIsMatchRunning] = useState(false);
  const [matchFinished, setMatchFinished] = useState(false);

  const startWordMatch = () => {
    const sample = baseVocab.slice(0, 4);
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

  // Word Match Timer
  useEffect(() => {
    let interval = null;
    if (isMatchRunning && matchTimer > 0) {
      interval = setInterval(() => setMatchTimer(prev => prev - 1), 1000);
    } else if (matchTimer === 0 && isMatchRunning) {
      setIsMatchRunning(false);
      setMatchFinished(true);
      showToast('Vaqt tugadi!', 'info');
    }
    return () => clearInterval(interval);
  }, [isMatchRunning, matchTimer]);

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
        if (matchedIds.length + 2 === matchCards.length) {
          setIsMatchRunning(false);
          setMatchFinished(true);
          addCoins(25, 'Juftlikni top o\'yini g\'olib bo\'lindi (+25 coin)');
          try { confetti({ particleCount: 80, spread: 60 }); } catch (e) {}
        }
      } else {
        // MISMATCH
        setTimeout(() => setSelectedCards([]), 800);
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

  const startSpeedQuiz = () => {
    setSpeedScore(0);
    setSpeedTimer(60);
    setIsSpeedRunning(true);
    setSpeedFinished(false);
    setActiveGame('speed');
    nextSpeedQuestion();
  };

  const nextSpeedQuestion = () => {
    const randWord = baseVocab[Math.floor(Math.random() * baseVocab.length)];
    const others = baseVocab.filter(w => w.word !== randWord.word).map(w => w.translation);
    const distractors = others.sort(() => 0.5 - Math.random()).slice(0, 3);
    const all = [randWord.translation, ...distractors].sort(() => 0.5 - Math.random());
    setCurrentSpeedWord(randWord);
    setSpeedOptions(all);
  };

  // Speed Quiz Timer
  useEffect(() => {
    let interval = null;
    if (isSpeedRunning && speedTimer > 0) {
      interval = setInterval(() => setSpeedTimer(prev => prev - 1), 1000);
    } else if (speedTimer === 0 && isSpeedRunning) {
      setIsSpeedRunning(false);
      setSpeedFinished(true);
      addCoins(speedScore * 2, `Speed Quiz yakunlandi: ${speedScore} to'g'ri (+${speedScore * 2} coin)`);
    }
    return () => clearInterval(interval);
  }, [isSpeedRunning, speedTimer]);

  const handleSpeedAnswer = (opt) => {
    if (opt === currentSpeedWord.translation) {
      setSpeedScore(prev => prev + 1);
    }
    nextSpeedQuestion();
  };

  return (
    <div style={{ padding: '20px', minHeight: '85vh' }}>
      
      {/* 1. GAME HUB */}
      {activeGame === 'hub' && (
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
              Game Zone (O'yinlar)
            </h2>
          </div>

          <div style={{
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: '#FFFFFF',
            padding: '24px 20px',
            boxShadow: 'var(--success-glow)',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>
              O'yna va Coin ishlab top!
            </h3>
            <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: 1.5 }}>
              Ingliz tilini qiziqarli o'yinlar orqali takrorlang, tezlikda raqobatlashing va sovrinlar yutib oling.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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

      {/* 2. WORD MATCH GAME */}
      {activeGame === 'match' && (
        <div className="animate-fade">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <button onClick={() => setActiveGame('hub')} style={{ color: 'var(--text-secondary)' }}>
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

                return (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card)}
                    style={{
                      padding: '24px 12px',
                      borderRadius: 'var(--radius-md)',
                      background: isMatched ? 'var(--success-light)' : isSelected ? 'var(--primary-100)' : 'var(--bg-surface)',
                      border: `2px solid ${isMatched ? 'var(--success)' : isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      color: isMatched ? 'var(--success-dark)' : isSelected ? 'var(--primary)' : 'var(--text-primary)',
                      textAlign: 'center',
                      fontWeight: 800,
                      fontSize: '15px',
                      cursor: isMatched ? 'default' : 'pointer',
                      opacity: isMatched ? 0.6 : 1,
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'all 0.2s ease'
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
              <button
                onClick={startWordMatch}
                style={{ padding: '14px 28px', borderRadius: 'var(--radius-md)', background: 'var(--primary-gradient)', color: '#FFFFFF', fontWeight: 700 }}
              >
                Qayta o'ynash
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. SPEED QUIZ GAME */}
      {activeGame === 'speed' && (
        <div className="animate-fade">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <button onClick={() => setActiveGame('hub')} style={{ color: 'var(--text-secondary)' }}>
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
                {speedOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSpeedAnswer(opt)}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-surface)',
                      border: '1.5px solid var(--border-subtle)',
                      fontWeight: 700,
                      fontSize: '15px',
                      color: 'var(--text-primary)',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {opt}
                  </button>
                ))}
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
              <button
                onClick={startSpeedQuiz}
                style={{ padding: '14px 28px', borderRadius: 'var(--radius-md)', background: 'var(--primary-gradient)', color: '#FFFFFF', fontWeight: 700 }}
              >
                Yana urinib ko'rish
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
