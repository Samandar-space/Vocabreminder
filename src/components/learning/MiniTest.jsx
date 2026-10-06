import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCw, Plus, HelpCircle } from 'lucide-react';

export const MiniTest = ({ onClose, onOpenAddWord }) => {
  const { words, addCoins, showToast } = useApp();

  const totalQuestions = Math.min(10, words.length);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [options, setOptions] = useState([]);

  // Active question word
  const activeWord = words.length > 0 ? words[currentIdx % words.length] : null;

  useEffect(() => {
    if (!activeWord || words.length < 2) return;
    const correct = activeWord.translation;
    const others = words.filter(w => w.id !== activeWord.id).map(w => w.translation);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const all = [correct, ...shuffledOthers].sort(() => 0.5 - Math.random());
    setOptions(all);
    setSelectedOpt(null);
    setAnswered(false);
  }, [currentIdx, activeWord, words]);

  // Condition: Kamida 2 ta so'z kerak
  if (words.length < 2) {
    return (
      <div style={{ padding: '24px 20px', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <button
            onClick={onClose}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '40px' }}
          >
            <ArrowLeft size={20} /> Mini test
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
              margin: '0 auto 24px auto'
            }}>
              <HelpCircle size={44} color="var(--primary)" />
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Test uchun kamida 2 ta so'z kerak
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '280px', margin: '0 auto' }}>
              Avval lug'atingizga so'z qo'shing, keyin test boshlashingiz mumkin.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAddWord}
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
          So'z qo'shish
        </button>
      </div>
    );
  }

  const handleSelect = (opt) => {
    if (answered) return;
    setSelectedOpt(opt);
    setAnswered(true);

    if (opt === activeWord.translation) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
      addCoins(20, 'Mini test yakunlandi (+20 coin)');
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setIsFinished(false);
    setSelectedOpt(null);
    setAnswered(false);
  };

  // RESULT SCREEN (From design: Ring chart 8/10 80%)
  if (isFinished) {
    const percent = Math.round((score / totalQuestions) * 100);

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
          {/* Ring Chart */}
          <div style={{
            position: 'relative',
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            background: `conic-gradient(var(--primary) ${percent * 3.6}deg, var(--bg-subtle) 0deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '28px',
            boxShadow: 'var(--shadow-primary)'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'var(--bg-surface)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {score} / {totalQuestions}
              </span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>
                {percent}%
              </span>
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Natija
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
            {percent >= 70 ? 'Juda yaxshi natija! Davom eting.' : 'Yaxshi harakat, takrorlashda davom eting!'}
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '340px' }}>
          <button
            onClick={handleRestart}
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '15px'
            }}
          >
            Qayta boshlash
          </button>

          <button
            onClick={onClose}
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
            Yopish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button
            onClick={onClose}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}
          >
            <ArrowLeft size={20} /> Chiqish
          </button>
          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)' }}>
            Savol {currentIdx + 1} / {totalQuestions}
          </div>
        </div>

        {/* Question Prompt */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '8px' }}>
            TARJIMASINI BELGILANG
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {activeWord.word}
          </h2>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {options.map((opt, i) => {
            const isCorrect = opt === activeWord.translation;
            const isSelected = selectedOpt === opt;

            let border = 'var(--border-subtle)';
            let bg = 'var(--bg-surface)';
            let color = 'var(--text-primary)';

            if (answered) {
              if (isCorrect) {
                border = 'var(--success)';
                bg = 'var(--success-light)';
                color = 'var(--success-dark)';
              } else if (isSelected && !isCorrect) {
                border = 'var(--danger)';
                bg = 'var(--danger-light)';
                color = 'var(--danger)';
              }
            }

            return (
              <div
                key={i}
                onClick={() => handleSelect(opt)}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${border}`,
                  background: bg,
                  color: color,
                  fontWeight: 600,
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: answered ? 'default' : 'pointer'
                }}
              >
                <span>{opt}</span>
                {answered && isCorrect && <CheckCircle2 size={18} color="var(--success)" />}
                {answered && isSelected && !isCorrect && <XCircle size={18} color="var(--danger)" />}
              </div>
            );
          })}
        </div>
      </div>

      {answered && (
        <button
          onClick={handleNext}
          style={{
            marginTop: '20px',
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
  );
};
