import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { speechService } from '../../services/speech';
import confetti from 'canvas-confetti';
import { 
  X, Volume2, Mic, MicOff, CheckCircle2, 
  XCircle, Sparkles, Send, RotateCw 
} from 'lucide-react';

const POPUP_FALLBACK_DISTRACTORS = [
  'Vaqtinchalik, o‘tkinchi',
  'Hamma joyda uchraydigan',
  'Tirishqoq, g‘ayratli',
  'Amaliy, realistik',
  'Chidamli, bardoshli',
  'Notiq, gapga chechan',
  'Har tomonlama, to‘liq',
  'Yangilik kirituvchi, ilg‘or',
  'O‘ta e’tiborli, sinchkov',
  'Keng qamrovli, batafsil'
];

export const QuickPopupQuizModal = ({ isOpen, onClose, initialWordId = null }) => {
  const { words, recordReviewResult, addCoins, showToast } = useApp();

  // Mode: 'options' (variantli) | 'write' (yozma) | 'voice' (ovozli)
  const [inputMode, setInputMode] = useState('options');

  // Current active word
  const [currentWord, setCurrentWord] = useState(null);

  // States
  const [selectedOption, setSelectedOption] = useState(null);
  const [writtenAnswer, setWrittenAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Voice recognition states
  const [isListening, setIsListening] = useState(false);
  const [heardSpeech, setHeardSpeech] = useState('');
  const recognitionRef = useRef(null);

  // Audio animation
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Pick a word (initial or random from vocabulary)
  const pickRandomWord = (excludeId = null) => {
    if (!words || words.length === 0) return null;
    let pool = words;
    if (excludeId && words.length > 1) {
      pool = words.filter(w => w.id !== excludeId);
    }
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  };

  // Reset state for new question
  const resetQuestionState = () => {
    setSelectedOption(null);
    setWrittenAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setHeardSpeech('');
    stopListening();
  };

  // Initialize word on open or initialWordId change
  useEffect(() => {
    if (!isOpen) return;

    let target = null;
    if (initialWordId) {
      target = words.find(w => w.id === initialWordId);
    }
    if (!target) {
      target = pickRandomWord();
    }

    setCurrentWord(target || null);
    resetQuestionState();
  }, [isOpen, initialWordId, words]);

  // Generate randomized multiple choice options with fallback distractors
  const options = useMemo(() => {
    if (!currentWord) return [];
    const correct = (currentWord.translation || '').trim();
    const otherTranslations = Array.from(new Set(
      words
        .filter(w => w.id !== currentWord.id && (w.translation || '').trim().toLowerCase() !== correct.toLowerCase())
        .map(w => (w.translation || '').trim())
    ));

    for (const fb of POPUP_FALLBACK_DISTRACTORS) {
      if (otherTranslations.length >= 3) break;
      if (fb.toLowerCase() !== correct.toLowerCase() && !otherTranslations.includes(fb)) {
        otherTranslations.push(fb);
      }
    }

    const shuffledOthers = [...otherTranslations].sort(() => 0.5 - Math.random()).slice(0, 3);
    return [correct, ...shuffledOthers].sort(() => 0.5 - Math.random());
  }, [currentWord, words]);

  // 1. Check Multiple Choice Option
  const handleSelectOption = (opt) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    const correct = (opt || '').trim().toLowerCase() === (currentWord.translation || '').trim().toLowerCase();
    finalizeAnswer(correct);
  };

  // 2. Check Written Answer (Strict matching to prevent single-letter cheat)
  const handleCheckWritten = (e) => {
    if (e) e.preventDefault();
    if (isAnswered || !writtenAnswer.trim()) return;

    const userText = writtenAnswer.trim().toLowerCase();
    const correctTranslation = (currentWord.translation || '').trim().toLowerCase();
    const correctEnglish = (currentWord.word || '').trim().toLowerCase();

    // Split synonyms by comma/slash/semicolon
    const synonyms = correctTranslation
      .split(/[,;/]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const correct = userText === correctTranslation || 
                    userText === correctEnglish || 
                    synonyms.some(syn => syn === userText || (userText.length >= 4 && syn.includes(userText)));

    finalizeAnswer(correct);
  };

  // 3. Check Voice Recognition
  const toggleVoiceListening = () => {
    if (isListening) {
      stopListening();
      return;
    }

    if (!currentWord) return;
    setIsListening(true);
    setHeardSpeech('');

    // Accept either the English pronunciation or the Uzbek translation
    const expected = [currentWord.word, currentWord.translation];

    const recognition = speechService.listenForSpeech(
      expected,
      ({ heard, isCorrect: speechMatches }) => {
        setHeardSpeech(heard);
        setIsListening(false);
        finalizeAnswer(speechMatches);
      },
      (errorMsg) => {
        setIsListening(false);
        showToast(errorMsg || 'Ovoz eshitilmadi, qaytadan urinib ko\'ring', 'info');
      },
      'en-US' // Primary listens for English pronunciation
    );

    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  // Evaluate and reward
  const finalizeAnswer = (correct) => {
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      addCoins(5, `Tezkor eslatma to'g'ri topildi (+5 coin)`);
      if (currentWord && currentWord.id) {
        recordReviewResult(currentWord.id, 'easy');
      }
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {}
      showToast('Ajoyib! To\'g\'ri javob (+5 coin)', 'success');
    } else {
      if (currentWord && currentWord.id) {
        recordReviewResult(currentWord.id, 'hard');
      }
      showToast('Noto\'g\'ri, to\'g\'ri javobni ko\'rib oling', 'error');
    }
  };

  // Next Question
  const handleNextWord = () => {
    const next = pickRandomWord(currentWord?.id);
    if (next) {
      setCurrentWord(next);
      resetQuestionState();
    } else {
      onClose();
    }
  };

  // Pronounce word
  const handlePronounce = () => {
    if (!currentWord) return;
    setIsPlayingAudio(true);
    speechService.speak(currentWord.word);
    setTimeout(() => setIsPlayingAudio(false), 1200);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      zIndex: 1000
    }}>
      {/* Centered Square Interactive Card */}
      <div 
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '430px',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1.5px solid var(--border-subtle)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), var(--shadow-primary)',
          padding: '24px 20px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-50)',
              color: 'var(--primary)',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              <Sparkles size={12} /> Tezkor Eslatma
            </span>
            <span style={{
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--gold-light)',
              color: 'var(--gold-dark)',
              fontSize: '11px',
              fontWeight: 700
            }}>
              +5 coin
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '50%',
              background: 'var(--bg-subtle)',
              color: 'var(--text-tertiary)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Word Display Area */}
        {currentWord ? (
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 16px',
            textAlign: 'center',
            position: 'relative',
            border: '1px solid var(--border-subtle)'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: '0 0 4px 0',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.5px'
            }}>
              {currentWord.word}
            </h2>

            {/* Transcription + Pronounce Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '13px',
                color: 'var(--primary)',
                fontFamily: 'monospace',
                fontWeight: 600
              }}>
                {currentWord.transcription || `/${currentWord.word}/`}
              </span>

              <button
                type="button"
                onClick={handlePronounce}
                title="Talaffuzni eshitish"
                style={{
                  padding: '5px',
                  borderRadius: '50%',
                  background: isPlayingAudio ? 'var(--primary)' : 'var(--bg-surface)',
                  color: isPlayingAudio ? '#FFFFFF' : 'var(--primary)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Volume2 size={14} />
              </button>
            </div>

            {currentWord.example && (
              <p style={{
                fontSize: '12px',
                color: 'var(--text-secondary)',
                marginTop: '10px',
                fontStyle: 'italic',
                lineHeight: 1.4
              }}>
                "{currentWord.example}"
              </p>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Lug'atingizda hali so'zlar mavjud emas.
            </p>
          </div>
        )}

        {/* Interactive Mode Switcher Tabs */}
        {currentWord && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            background: 'var(--bg-subtle)',
            padding: '3px',
            borderRadius: 'var(--radius-md)'
          }}>
            <button
              onClick={() => { setInputMode('options'); stopListening(); }}
              style={{
                padding: '7px 4px',
                borderRadius: 'var(--radius-sm)',
                background: inputMode === 'options' ? 'var(--bg-surface)' : 'transparent',
                color: inputMode === 'options' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: inputMode === 'options' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Variantlar
            </button>
            <button
              onClick={() => { setInputMode('write'); stopListening(); }}
              style={{
                padding: '7px 4px',
                borderRadius: 'var(--radius-sm)',
                background: inputMode === 'write' ? 'var(--bg-surface)' : 'transparent',
                color: inputMode === 'write' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: inputMode === 'write' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Yozma
            </button>
            <button
              onClick={() => setInputMode('voice')}
              style={{
                padding: '7px 4px',
                borderRadius: 'var(--radius-sm)',
                background: inputMode === 'voice' ? 'var(--bg-surface)' : 'transparent',
                color: inputMode === 'voice' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: inputMode === 'voice' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              🎤 Ovozli
            </button>
          </div>
        )}

        {/* 1. OPTIONS MODE (4 Multiple Choice Options) */}
        {currentWord && inputMode === 'options' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {options.map((opt, i) => {
              const isSelected = selectedOption === opt;
              const isThisCorrect = opt.trim().toLowerCase() === currentWord.translation.trim().toLowerCase();

              let border = 'var(--border-subtle)';
              let bg = 'var(--bg-surface)';
              let color = 'var(--text-primary)';

              if (isAnswered) {
                if (isThisCorrect) {
                  border = 'var(--success)';
                  bg = 'var(--success-light)';
                  color = 'var(--success-dark)';
                } else if (isSelected && !isThisCorrect) {
                  border = 'var(--danger)';
                  bg = 'var(--danger-light)';
                  color = 'var(--danger)';
                }
              }

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${border}`,
                    background: bg,
                    color: color,
                    fontWeight: 600,
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: isAnswered ? 'default' : 'pointer',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span>{opt}</span>
                  {isAnswered && isThisCorrect && <CheckCircle2 size={16} color="var(--success)" />}
                  {isAnswered && isSelected && !isThisCorrect && <XCircle size={16} color="var(--danger)" />}
                </button>
              );
            })}
          </div>
        )}

        {/* 2. WRITING MODE (Type translation or word) */}
        {currentWord && inputMode === 'write' && (
          <form onSubmit={handleCheckWritten} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                autoFocus
                disabled={isAnswered}
                placeholder="O'zbekcha tarjimasini yozing..."
                value={writtenAnswer}
                onChange={(e) => setWrittenAnswer(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: isAnswered 
                    ? (isCorrect ? '2px solid var(--success)' : '2px solid var(--danger)') 
                    : '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}
              />
              <button
                type="submit"
                disabled={isAnswered || !writtenAnswer.trim()}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: isAnswered || !writtenAnswer.trim() ? 'var(--bg-subtle)' : 'var(--primary-gradient)',
                  color: isAnswered || !writtenAnswer.trim() ? 'var(--text-tertiary)' : '#FFFFFF',
                  border: 'none',
                  cursor: isAnswered || !writtenAnswer.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Send size={16} />
              </button>
            </div>

            {isAnswered && (
              <div style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: isCorrect ? 'var(--success-light)' : 'var(--danger-light)',
                color: isCorrect ? 'var(--success-dark)' : 'var(--danger)',
                fontSize: '13px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                <span>
                  {isCorrect ? 'To\'g\'ri yozdingiz!' : `To'g'ri tarjima: "${currentWord.translation}"`}
                </span>
              </div>
            )}
          </form>
        )}

        {/* 3. VOICE MODE (Speak answer via microphone) */}
        {currentWord && inputMode === 'voice' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 0',
            gap: '12px',
            textAlign: 'center'
          }}>
            <button
              type="button"
              disabled={isAnswered}
              onClick={toggleVoiceListening}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: isListening 
                  ? 'var(--danger)' 
                  : isAnswered && isCorrect 
                    ? 'var(--success)' 
                    : 'var(--primary-gradient)',
                color: '#FFFFFF',
                border: 'none',
                boxShadow: isListening 
                  ? '0 0 0 10px rgba(239, 68, 68, 0.25)' 
                  : 'var(--shadow-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isAnswered ? 'default' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isListening ? <MicOff size={26} className="spin" /> : <Mic size={26} />}
            </button>

            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {isListening 
                ? '🎙 Tinglanmoqda... So\'zni talaffuz qiling!' 
                : isAnswered 
                  ? (isCorrect ? 'Ovoz aniq tanildi!' : 'Qayta urinib ko\'ring') 
                  : 'Mikrofonni bosing va so\'zni ayting'}
            </span>

            {heardSpeech && (
              <div style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-subtle)',
                fontSize: '12px',
                color: 'var(--text-primary)',
                fontStyle: 'italic'
              }}>
                Eshitildi: "{heardSpeech}"
              </div>
            )}

            {isAnswered && (
              <div style={{
                fontSize: '13px',
                fontWeight: 700,
                color: isCorrect ? 'var(--success-dark)' : 'var(--danger)'
              }}>
                {isCorrect ? '✅ Ajoyib talaffuz!' : `To'g'ri so'z: "${currentWord.word}"`}
              </div>
            )}
          </div>
        )}

        {/* Bottom Actions Row (Keyingi so'z or Yopish) */}
        {isAnswered && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            <button
              onClick={handleNextWord}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-gradient)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: 'var(--shadow-primary)'
              }}
            >
              <RotateCw size={15} /> Keyingi so'z
            </button>

            <button
              onClick={onClose}
              style={{
                padding: '12px 18px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                color: 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '14px',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer'
              }}
            >
              Yopish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
