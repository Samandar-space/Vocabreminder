import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { speechService } from '../../services/speech';
import confetti from 'canvas-confetti';
import { 
  X, Mic, MicOff, Volume2, Sparkles, Award, RotateCcw, ArrowRight
} from 'lucide-react';

// Phonetic & Levenshtein similarity calculation
function calculateSimilarity(str1, str2) {
  const s1 = (str1 || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const s2 = (str2 || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!s1 || !s2) return 0;
  if (s1 === s2) return 100;

  // Levenshtein distance matrix
  const matrix = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
  for (let i = 0; i <= s1.length; i += 1) matrix[0][i] = i;
  for (let j = 0; j <= s2.length; j += 1) matrix[j][0] = j;

  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  const distance = matrix[s2.length][s1.length];
  const maxLen = Math.max(s1.length, s2.length);
  const similarity = Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100));
  return similarity;
}

export const PronunciationModal = ({ isOpen, onClose, word, onNext }) => {
  const { addCoins, showToast } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [hasAwardedCoins, setHasAwardedCoins] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (isOpen && word?.word) {
      setTranscript('');
      setScore(null);
      setFeedback(null);
      setHasAwardedCoins(false);
      // Play native audio automatically once on open
      const timer = setTimeout(() => {
        speechService.speak(word.word);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, word?.word]);

  // Clean up recognition on close or unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
    };
  }, []);

  if (!isOpen || !word) return null;

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast("Brauzeringiz ovoz yozishni qo'llab-quvvatlamaydi (Chrome/Edge tavsiya etiladi)", 'error');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    } catch {}

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    setIsListening(true);
    setTranscript('');
    setScore(null);
    setFeedback(null);

    recognition.onresult = (event) => {
      setIsListening(false);
      const heard = (event.results[0][0].transcript || '').trim();
      setTranscript(heard);

      const sim = calculateSimilarity(word.word, heard);
      setScore(sim);

      if (sim >= 85) {
        setFeedback({
          type: 'excellent',
          title: '🔥 Ajoyib! Mukammal talaffuz!',
          msg: 'Native speakerdek aniq va ravon aytdingiz.',
          coins: 5
        });
        if (!hasAwardedCoins) {
          addCoins(5, 'Mukammal talaffuz (+5 coin)');
          setHasAwardedCoins(true);
          try { confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } }); } catch {}
        }
      } else if (sim >= 65) {
        setFeedback({
          type: 'good',
          title: '✨ Juda yaxshi!',
          msg: 'Talaffuzingiz yaxshi tushunildi, ozgina mashq qilsangiz mukammal bo\'ladi.',
          coins: 3
        });
        if (!hasAwardedCoins) {
          addCoins(3, 'Yaxshi talaffuz (+3 coin)');
          setHasAwardedCoins(true);
        }
      } else {
        setFeedback({
          type: 'retry',
          title: '💡 Qaytadan urinib ko\'ring',
          msg: 'So\'zni diqqat bilan eshiting va balandroq qaytaring.',
          coins: 0
        });
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        showToast("Ovoz yozishda xatolik: " + (event.error || 'eshitilmadi'), 'error');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch {
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    setIsListening(false);
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div 
        className="modal-card animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '460px',
          boxShadow: 'var(--shadow-xl)',
          border: '1.5px solid var(--border-subtle)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--primary-100)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                AI Talaffuz Tekshiruvchi
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-tertiary)' }}>
                So'zni mikrofonga ayting va bahoni ko'ring
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn-press"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-tertiary)',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Word Display Box */}
        <div style={{ padding: '24px 24px 16px', textAlign: 'center' }}>
          <div style={{
            background: 'var(--primary-gradient)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '24px 16px',
            boxShadow: 'var(--shadow-primary)',
            position: 'relative'
          }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.5px' }}>
              {word.word}
            </h2>
            <div style={{ fontSize: '16px', opacity: 0.9, marginBottom: '14px' }}>
              {word.transcription || `/${word.word.toLowerCase()}/`}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button
                onClick={() => speechService.speak(word.word)}
                className="btn-press"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-full)',
                  padding: '8px 16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Volume2 size={16} /> Eshitish (Native)
              </button>
            </div>

            <div style={{ marginTop: '12px', fontSize: '13px', opacity: 0.95 }}>
              Ma'nosi: <strong>{word.translation}</strong>
            </div>
          </div>

          {/* User's Spoken Result */}
          {transcript && (
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'left'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Sizning talaffuzingiz (Eshitildi):
              </div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                "{transcript}"
              </div>
            </div>
          )}

          {/* Feedback Card */}
          {feedback && score !== null && (
            <div style={{
              marginTop: '16px',
              padding: '16px',
              borderRadius: 'var(--radius-lg)',
              background: feedback.type === 'excellent' ? 'rgba(16, 185, 129, 0.12)' : feedback.type === 'good' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(245, 158, 11, 0.12)',
              border: `1.5px solid ${feedback.type === 'excellent' ? '#10B981' : feedback.type === 'good' ? '#3B82F6' : '#F59E0B'}`,
              textAlign: 'center'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '26px',
                fontWeight: 900,
                color: feedback.type === 'excellent' ? '#10B981' : feedback.type === 'good' ? '#3B82F6' : '#F59E0B'
              }}>
                <Award size={26} /> {score}%
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                {feedback.title}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {feedback.msg}
              </div>
              {feedback.coins > 0 && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'var(--primary)',
                  color: '#FFFFFF',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '12px',
                  fontWeight: 800,
                  marginTop: '8px'
                }}>
                  +{feedback.coins} tanga berildi!
                </div>
              )}
            </div>
          )}

          {/* Pulse Mic Button */}
          <div style={{ margin: '24px 0 12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              onClick={isListening ? stopListening : startListening}
              className="btn-press"
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: isListening ? 'var(--danger)' : 'var(--primary-gradient)',
                color: '#FFFFFF',
                border: 'none',
                boxShadow: isListening ? '0 0 0 10px rgba(239, 68, 68, 0.25)' : 'var(--shadow-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: isListening ? 'scale(1.08)' : 'scale(1)'
              }}
              title={isListening ? "To'xtatish" : "Gapirish"}
            >
              {isListening ? <MicOff size={34} /> : <Mic size={34} />}
            </button>
            <span style={{
              marginTop: '10px',
              fontSize: '13px',
              fontWeight: 700,
              color: isListening ? 'var(--danger)' : 'var(--text-secondary)'
            }}>
              {isListening ? "Eshitilmoqda... Inglizcha ayting!" : "Gapirish uchun bosing"}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '10px',
          background: 'var(--bg-subtle)'
        }}>
          <button
            onClick={() => {
              setTranscript('');
              setScore(null);
              setFeedback(null);
              startListening();
            }}
            className="btn-press"
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              border: '1.5px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={16} /> Qaytadan
          </button>

          {onNext ? (
            <button
              onClick={() => {
                onClose();
                onNext();
              }}
              className="btn-press"
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-gradient)',
                border: 'none',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-primary)'
              }}
            >
              Keyingi so'z <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="btn-press"
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-gradient)',
                border: 'none',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-primary)'
              }}
            >
              Tugatish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
