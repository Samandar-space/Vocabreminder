import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, ChevronDown, ChevronUp, CheckCircle2, Circle, 
  GraduationCap, Volume2, Target, Sparkles, BookOpen, Clock, 
  AlertTriangle, Lightbulb, HelpCircle, Check, X, RotateCcw, 
  BookmarkCheck, Search, Award
} from 'lucide-react';
import { speechService } from '../../services/speech';
import { 
  grammarData, 
  grammarLevels, 
  getCumulativeTopics, 
  getLevelOrder 
} from '../../data/grammar/index.js';
import { GrammarGoalWizardModal } from './GrammarGoalWizardModal';

export const GrammarSection = ({ onBack }) => {
  const { user, addCoins, showToast } = useApp();

  // Selected CEFR Level Tab
  const [selectedLevel, setSelectedLevel] = useState('A1');
  // Currently expanded accordion topic ID (or null)
  const [expandedTopic, setExpandedTopic] = useState(null);
  // Search query
  const [searchQuery, setSearchQuery] = useState('');
  // Goal Wizard Modal state
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Learned Topics list stored in localStorage
  const [learnedTopics, setLearnedTopics] = useState(() => {
    try {
      const saved = localStorage.getItem('vocab_learned_grammar_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Saved Grammar Target Goal (e.g. 'B2')
  const [savedGoal, setSavedGoal] = useState(() => {
    try {
      return localStorage.getItem('vocab_grammar_goal') || null;
    } catch {
      return null;
    }
  });

  // Interactive Exercise state: { [topicId]: { [qIdx]: selectedOptionIndex } }
  const [exerciseSelections, setExerciseSelections] = useState({});
  // Reveal answers toggle: { [topicId]: { [qIdx]: boolean } }
  const [exerciseRevealed, setExerciseRevealed] = useState({});

  const levelsList = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  // Save learned topics to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('vocab_learned_grammar_topics', JSON.stringify(learnedTopics));
    } catch (e) {
      console.error('Failed to save learned grammar topics:', e);
    }
  }, [learnedTopics]);

  // Save goal to localStorage
  const handleSaveGoal = (targetLevel) => {
    try {
      localStorage.setItem('vocab_grammar_goal', targetLevel);
      setSavedGoal(targetLevel);
      showToast(`🎯 Yangi maqsad belgilandi: ${targetLevel} darajasi!`, 'success');
    } catch (e) {
      console.error('Failed to save grammar goal:', e);
    }
  };

  // Toggle topic learned status
  const handleToggleLearned = (topic) => {
    const isLearned = learnedTopics.includes(topic.id);
    if (isLearned) {
      setLearnedTopics(prev => prev.filter(id => id !== topic.id));
      showToast(`"${topic.title}" o'rganilganlar ro'yxatidan chiqarildi`, 'info');
    } else {
      setLearnedTopics(prev => [...prev, topic.id]);
      if (addCoins) {
        addCoins(5, 'Grammatika mavzusi o\'rganildi (+5 coin)');
      }
      showToast(`Tabriklaymiz! "${topic.title}" o'rganildi! (+5 Coin 🪙)`, 'success');
    }
  };

  // Navigation from Wizard to specific topic
  const handleNavigateToTopic = (level, topicId) => {
    setSelectedLevel(level);
    setExpandedTopic(topicId);
    setSearchQuery('');

    // Smooth scroll into view after tab switch
    setTimeout(() => {
      const el = document.getElementById(`topic-${topicId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  // Mini-exercise handling
  const handleSelectOption = (topicId, qIdx, optIdx) => {
    setExerciseSelections(prev => ({
      ...prev,
      [topicId]: {
        ...(prev[topicId] || {}),
        [qIdx]: optIdx
      }
    }));
  };

  const handleToggleReveal = (topicId, qIdx) => {
    setExerciseRevealed(prev => ({
      ...prev,
      [topicId]: {
        ...(prev[topicId] || {}),
        [qIdx]: !prev[topicId]?.[qIdx]
      }
    }));
  };

  const handleResetExercises = (topicId) => {
    setExerciseSelections(prev => {
      const copy = { ...prev };
      delete copy[topicId];
      return copy;
    });
    setExerciseRevealed(prev => {
      const copy = { ...prev };
      delete copy[topicId];
      return copy;
    });
  };

  // Current level topics
  const currentTopics = grammarData[selectedLevel] || [];
  const currentLevelMeta = grammarLevels.find(l => l.id === selectedLevel) || grammarLevels[0];

  // Filtered topics by search
  const filteredTopics = currentTopics.filter(topic => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      topic.title.toLowerCase().includes(q) ||
      (topic.titleUz && topic.titleUz.toLowerCase().includes(q)) ||
      (topic.summary && topic.summary.toLowerCase().includes(q))
    );
  });

  // Calculate goal stats for top banner if goal is set
  let goalCumulativeTopics = [];
  let goalTotal = 0;
  let goalLearned = 0;
  let goalPercent = 0;
  if (savedGoal) {
    goalCumulativeTopics = getCumulativeTopics(savedGoal);
    goalTotal = goalCumulativeTopics.length;
    goalLearned = goalCumulativeTopics.filter(t => learnedTopics.includes(t.id)).length;
    goalPercent = goalTotal > 0 ? Math.round((goalLearned / goalTotal) * 100) : 0;
  }

  // Current level stats
  const levelLearnedCount = currentTopics.filter(t => learnedTopics.includes(t.id)).length;
  const levelPercent = currentTopics.length > 0 ? Math.round((levelLearnedCount / currentTopics.length) * 100) : 0;

  return (
    <div style={{ padding: '20px', minHeight: '85vh', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Top Bar with Navigation & Wizard Button */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '12px', 
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onBack}
            className="btn-press"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              color: 'var(--text-secondary)', 
              fontWeight: 700,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={18} /> Orqaga
          </button>
          <div>
            <h1 
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '22px', 
                fontWeight: 800, 
                color: 'var(--text-primary)',
                lineHeight: 1.2
              }}
            >
              Grammatika (CEFR A1–C2)
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              Barcha darajalar bo'yicha to'liq grammatik qoidalar, formulalar va interaktiv mashqlar
            </p>
          </div>
        </div>

        {/* Wizard Launch Button */}
        <button
          onClick={() => setIsWizardOpen(true)}
          className="btn-press"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--primary-gradient)',
            color: '#FFFFFF',
            border: 'none',
            padding: '10px 18px',
            borderRadius: 'var(--radius-md)',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-primary)',
            whiteSpace: 'nowrap'
          }}
        >
          <Target size={18} /> 🎯 Maqsadim: daraja tanlash
        </button>
      </div>

      {/* Target Level Banner (if set) */}
      {savedGoal && (
        <div 
          style={{
            padding: '16px 20px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '260px' }}>
            <div 
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-50)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '16px',
                border: '1px solid var(--primary-200)',
                flexShrink: 0
              }}
            >
              {savedGoal}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Maqsadingiz: <strong>{savedGoal}</strong> · {goalPercent}% bajarildi
                </span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>
                  {goalLearned} / {goalTotal} ta mavzu
                </span>
              </div>
              <div 
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-subtle)',
                  overflow: 'hidden'
                }}
              >
                <div 
                  style={{
                    height: '100%',
                    width: `${goalPercent}%`,
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--primary-gradient)',
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setIsWizardOpen(true)}
              className="btn-press"
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={14} color="var(--primary)" /> Yo'l xaritasi
            </button>
          </div>
        </div>
      )}

      {/* Level Tabs with Counts (e.g. "A1 · 16") */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '16px', 
          overflowX: 'auto', 
          paddingBottom: '6px',
          scrollbarWidth: 'none'
        }}
      >
        {levelsList.map(lvl => {
          const count = (grammarData[lvl] || []).length;
          const lvlLearned = (grammarData[lvl] || []).filter(t => learnedTopics.includes(t.id)).length;
          const isSelected = selectedLevel === lvl;

          return (
            <button
              key={lvl}
              onClick={() => {
                setSelectedLevel(lvl);
                setExpandedTopic(null);
              }}
              className="btn-press"
              style={{
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                background: isSelected ? 'var(--primary-gradient)' : 'var(--bg-surface)',
                color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                border: isSelected ? '1px solid transparent' : '1px solid var(--border-subtle)',
                boxShadow: isSelected ? 'var(--shadow-primary)' : 'var(--shadow-sm)',
                fontWeight: 800,
                fontSize: '13px',
                flexShrink: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.18s ease'
              }}
            >
              <span>{lvl} · {count}</span>
              {lvlLearned > 0 && (
                <span 
                  style={{
                    fontSize: '10px',
                    padding: '1px 6px',
                    borderRadius: 'var(--radius-full)',
                    background: isSelected ? 'rgba(255, 255, 255, 0.25)' : 'var(--success-light)',
                    color: isSelected ? '#FFFFFF' : 'var(--success-dark)',
                    fontWeight: 800
                  }}
                >
                  {lvlLearned}/{count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Level Summary Card & Search Bar */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '20px',
          padding: '16px 20px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span 
                style={{
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                  background: currentLevelMeta.badgeColor,
                  color: currentLevelMeta.color,
                  fontWeight: 800,
                  fontSize: '12px'
                }}
              >
                {currentLevelMeta.name}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {currentLevelMeta.description}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={13} /> {currentLevelMeta.estimatedHours}
            </span>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
              O'rganildi: {levelLearnedCount} / {currentTopics.length} ({levelPercent}%)
            </span>
          </div>
        </div>

        {/* Search input for topics in this level */}
        <div style={{ position: 'relative' }}>
          <Search 
            size={16} 
            color="var(--text-tertiary)" 
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} 
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`${selectedLevel} darajasidagi mavzular bo'yicha qidirish...`}
            style={{
              width: '100%',
              padding: '10px 14px 10px 36px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              outline: 'none'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-tertiary)',
                cursor: 'pointer'
              }}
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Topics Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredTopics.length === 0 ? (
          <div 
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed var(--border-subtle)'
            }}
          >
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              "{searchQuery}" bo'yicha hech qanday mavzu topilmadi.
            </p>
          </div>
        ) : (
          filteredTopics.map((topic, topicIndex) => {
            const isExpanded = expandedTopic === topic.id;
            const isLearned = learnedTopics.includes(topic.id);
            const selections = exerciseSelections[topic.id] || {};
            const revealed = exerciseRevealed[topic.id] || {};
            
            // Calculate exercise score for this topic
            const answeredCount = Object.keys(selections).length;
            const correctCount = topic.exercises.filter((ex, qIdx) => selections[qIdx] === ex.answer).length;

            return (
              <div
                key={topic.id}
                id={`topic-${topic.id}`}
                style={{
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-surface)',
                  border: isExpanded 
                    ? '1.5px solid var(--primary)' 
                    : isLearned 
                      ? '1px solid rgba(16, 185, 129, 0.4)' 
                      : '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  boxShadow: isExpanded ? '0 8px 24px var(--primary-glow)' : 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Accordion Header (Clickable) */}
                <div
                  onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                  style={{
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    background: isExpanded ? 'var(--bg-surface-elevated)' : 'transparent',
                    userSelect: 'none',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                    <div 
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: 'var(--radius-md)',
                        background: topic.isTense ? 'rgba(124, 58, 237, 0.1)' : 'var(--bg-subtle)',
                        color: topic.isTense ? 'var(--primary)' : 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {topic.isTense ? <Clock size={20} /> : <GraduationCap size={20} />}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {topic.title}
                        </span>
                        {topic.isTense && (
                          <span 
                            style={{
                              fontSize: '10px',
                              padding: '2px 6px',
                              borderRadius: 'var(--radius-sm)',
                              background: 'rgba(124, 58, 237, 0.12)',
                              color: 'var(--primary)',
                              fontWeight: 800
                            }}
                          >
                            ZAMON
                          </span>
                        )}
                        {isLearned && (
                          <span 
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                              fontSize: '11px',
                              padding: '2px 8px',
                              borderRadius: 'var(--radius-full)',
                              background: 'var(--success-light)',
                              color: 'var(--success-dark)',
                              fontWeight: 700
                            }}
                          >
                            <CheckCircle2 size={12} /> O'rganildi
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {topic.titleUz}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div 
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--bg-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-tertiary)'
                      }}
                    >
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Accordion Body (All 9 Mandatory Sections) */}
                {isExpanded && (
                  <div 
                    style={{ 
                      padding: '20px', 
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px',
                      background: 'var(--bg-surface)'
                    }}
                  >
                    
                    {/* 1. 📌 QISQA TA'RIF */}
                    <div 
                      style={{
                        padding: '14px 18px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-subtle)',
                        borderLeft: '4px solid var(--primary)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                      }}
                    >
                      <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        📌 QISQA TA'RIF
                      </span>
                      <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
                        {topic.summary}
                      </p>
                    </div>

                    {/* 2. 🧩 QACHON ISHLATILADI */}
                    <div>
                      <h4 
                        style={{
                          fontSize: '14px',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          marginBottom: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        🧩 Qachon ishlatiladi:
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {topic.usage.map((useItem, uIdx) => (
                          <div 
                            key={uIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '10px',
                              padding: '10px 14px',
                              borderRadius: 'var(--radius-sm)',
                              background: 'var(--bg-surface-elevated)',
                              border: '1px solid var(--border-subtle)',
                              fontSize: '13px',
                              color: 'var(--text-primary)',
                              lineHeight: 1.45
                            }}
                          >
                            <span 
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: 'var(--radius-full)',
                                background: 'var(--primary-50)',
                                color: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: '11px',
                                flexShrink: 0
                              }}
                            >
                              {uIdx + 1}
                            </span>
                            <span>{useItem}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. 🛠️ YASALISHI (FORMULA) */}
                    <div>
                      <h4 
                        style={{
                          fontSize: '14px',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          marginBottom: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        🛠️ Yasalishi (Formula va sxema):
                      </h4>
                      <div 
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                          gap: '10px'
                        }}
                      >
                        {/* Affirmative */}
                        <div 
                          style={{
                            padding: '12px 14px',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(16, 185, 129, 0.08)',
                            border: '1px solid rgba(16, 185, 129, 0.25)'
                          }}
                        >
                          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--success-dark)', display: 'block', marginBottom: '4px' }}>
                            ✅ DARAK GAP (AFFIRMATIVE)
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                            {topic.formula?.affirmative}
                          </span>
                        </div>

                        {/* Negative */}
                        <div 
                          style={{
                            padding: '12px 14px',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(239, 68, 68, 0.08)',
                            border: '1px solid rgba(239, 68, 68, 0.25)'
                          }}
                        >
                          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--danger-dark)', display: 'block', marginBottom: '4px' }}>
                            ❌ INKOR GAP (NEGATIVE)
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                            {topic.formula?.negative}
                          </span>
                        </div>

                        {/* Question */}
                        <div 
                          style={{
                            padding: '12px 14px',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(124, 58, 237, 0.08)',
                            border: '1px solid rgba(124, 58, 237, 0.25)'
                          }}
                        >
                          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                            ❓ SO'ROQ GAP (QUESTION)
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                            {topic.formula?.question}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 4. ✅ MISOLLAR (6-8 TA) */}
                    <div>
                      <h4 
                        style={{
                          fontSize: '14px',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          marginBottom: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        ✅ Misollar ({topic.examples?.length || 0} ta):
                      </h4>
                      <div 
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                          gap: '10px'
                        }}
                      >
                        {topic.examples?.map((ex, exIdx) => (
                          <div 
                            key={exIdx}
                            style={{
                              padding: '12px 14px',
                              borderRadius: 'var(--radius-md)',
                              background: 'var(--bg-surface-elevated)',
                              border: '1px solid var(--border-subtle)',
                              display: 'flex',
                              alignItems: 'flex-start',
                              justifyContent: 'space-between',
                              gap: '10px'
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 3px 0' }}>
                                {ex.en}
                              </p>
                              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                                {ex.uz}
                              </p>
                            </div>

                            {/* Pronounce TTS button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speechService.speak(ex.en);
                              }}
                              title="Tinglash (TTS)"
                              className="btn-press"
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: 'var(--radius-full)',
                                background: 'var(--bg-subtle)',
                                border: '1px solid var(--border-subtle)',
                                color: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                flexShrink: 0
                              }}
                            >
                              <Volume2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 5. ⚠️ KO'P UCHRAYDIGAN XATOLAR */}
                    <div>
                      <h4 
                        style={{
                          fontSize: '14px',
                          fontWeight: 800,
                          color: 'var(--danger-dark)',
                          marginBottom: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <AlertTriangle size={16} /> ⚠️ Ko'p uchraydigan xatolar (O'zbek tilida so'zlashuvchilar uchun):
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {topic.mistakes?.map((mistake, mIdx) => (
                          <div 
                            key={mIdx}
                            style={{
                              padding: '12px 14px',
                              borderRadius: 'var(--radius-md)',
                              background: 'rgba(239, 68, 68, 0.05)',
                              border: '1px solid rgba(239, 68, 68, 0.2)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', fontSize: '13px' }}>
                              <span style={{ color: 'var(--danger)', fontWeight: 700, textDecoration: 'line-through' }}>
                                ❌ {mistake.wrong}
                              </span>
                              <span style={{ color: 'var(--text-tertiary)' }}>→</span>
                              <span style={{ color: 'var(--success-dark)', fontWeight: 700 }}>
                                ✅ {mistake.correct}
                              </span>
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                              <strong>Izoh:</strong> {mistake.note}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 6. 🔗 O'ZBEK TILI BILAN TAQQOSLASH */}
                    {topic.uzbekComparison && (
                      <div 
                        style={{
                          padding: '14px 18px',
                          borderRadius: 'var(--radius-md)',
                          background: 'rgba(124, 58, 237, 0.06)',
                          border: '1px solid rgba(124, 58, 237, 0.2)',
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'flex-start'
                        }}
                      >
                        <BookOpen size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
                            🔗 O'ZBEK TILI BILAN TAQQOSLASH:
                          </span>
                          <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
                            {topic.uzbekComparison}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 7. 💡 ESLAB QOLISH USULI (TIP / MNEMONIKA) */}
                    {topic.tip && (
                      <div 
                        style={{
                          padding: '14px 18px',
                          borderRadius: 'var(--radius-md)',
                          background: 'rgba(245, 158, 11, 0.08)',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'flex-start'
                        }}
                      >
                        <Lightbulb size={20} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gold-dark)', display: 'block', marginBottom: '4px' }}>
                            💡 ESLAB QOLISH USULI (MNEMONIKA):
                          </span>
                          <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
                            {topic.tip}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 8. 📝 MINI MASHQ (5 TA SAVOL) */}
                    <div 
                      style={{
                        padding: '18px',
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <h4 
                            style={{
                              fontSize: '15px',
                              fontWeight: 800,
                              color: 'var(--text-primary)',
                              margin: 0,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            📝 Mini mashq (5 ta savol)
                          </h4>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                            O'rgangan qoidalaringizni darhol amalda tekshiring
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {answeredCount > 0 && (
                            <span 
                              style={{
                                fontSize: '12px',
                                fontWeight: 800,
                                color: correctCount === 5 ? 'var(--success-dark)' : 'var(--primary)',
                                background: correctCount === 5 ? 'var(--success-light)' : 'var(--primary-50)',
                                padding: '3px 10px',
                                borderRadius: 'var(--radius-full)'
                              }}
                            >
                              Natija: {correctCount}/5 to'g'ri
                            </span>
                          )}
                          <button
                            onClick={() => handleResetExercises(topic.id)}
                            title="Qayta ishlash"
                            className="btn-press"
                            style={{
                              padding: '4px 8px',
                              borderRadius: 'var(--radius-sm)',
                              background: 'var(--bg-surface)',
                              border: '1px solid var(--border-subtle)',
                              color: 'var(--text-secondary)',
                              fontSize: '11px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <RotateCcw size={12} /> Tozalash
                          </button>
                        </div>
                      </div>

                      {/* 5 Questions */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {topic.exercises?.map((ex, qIdx) => {
                          const selectedOpt = selections[qIdx];
                          const isRevealed = revealed[qIdx];
                          const hasAnswered = selectedOpt !== undefined;
                          const isCorrect = selectedOpt === ex.answer;

                          return (
                            <div 
                              key={qIdx}
                              style={{
                                padding: '14px',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--bg-surface)',
                                border: hasAnswered 
                                  ? (isCorrect ? '1.5px solid var(--success)' : '1.5px solid var(--danger)')
                                  : '1px solid var(--border-subtle)'
                              }}
                            >
                              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
                                <span style={{ color: 'var(--primary)', marginRight: '6px' }}>{qIdx + 1}.</span>
                                {ex.question}
                              </div>

                              {/* Options */}
                              <div 
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                  gap: '8px',
                                  marginBottom: '10px'
                                }}
                              >
                                {ex.options?.map((opt, optIdx) => {
                                  const isOptionSelected = selectedOpt === optIdx;
                                  const isOptionCorrect = optIdx === ex.answer;
                                  let optBg = 'var(--bg-subtle)';
                                  let optBorder = 'var(--border-subtle)';
                                  let optColor = 'var(--text-primary)';

                                  if (hasAnswered || isRevealed) {
                                    if (isOptionCorrect) {
                                      optBg = 'rgba(16, 185, 129, 0.15)';
                                      optBorder = 'var(--success)';
                                      optColor = 'var(--success-dark)';
                                    } else if (isOptionSelected && !isCorrect) {
                                      optBg = 'rgba(239, 68, 68, 0.15)';
                                      optBorder = 'var(--danger)';
                                      optColor = 'var(--danger-dark)';
                                    }
                                  }

                                  return (
                                    <button
                                      key={optIdx}
                                      onClick={() => handleSelectOption(topic.id, qIdx, optIdx)}
                                      className="btn-press"
                                      style={{
                                        padding: '8px 12px',
                                        borderRadius: 'var(--radius-sm)',
                                        background: optBg,
                                        border: `1px solid ${optBorder}`,
                                        color: optColor,
                                        fontSize: '12px',
                                        fontWeight: isOptionSelected || (isRevealed && isOptionCorrect) ? 700 : 500,
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.15s ease'
                                      }}
                                    >
                                      <span 
                                        style={{
                                          width: '18px',
                                          height: '18px',
                                          borderRadius: 'var(--radius-full)',
                                          background: isOptionSelected ? 'var(--primary)' : 'rgba(0,0,0,0.06)',
                                          color: isOptionSelected ? '#FFFFFF' : 'var(--text-tertiary)',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          fontSize: '10px',
                                          fontWeight: 800,
                                          flexShrink: 0
                                        }}
                                      >
                                        {String.fromCharCode(65 + optIdx)}
                                      </span>
                                      <span style={{ flex: 1 }}>{opt}</span>
                                      {hasAnswered && isOptionCorrect && <Check size={14} color="var(--success)" />}
                                      {hasAnswered && isOptionSelected && !isCorrect && <X size={14} color="var(--danger)" />}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Toggle "Javobni ko'rsatish" & Explanation */}
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                                <button
                                  onClick={() => handleToggleReveal(topic.id, qIdx)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--primary)',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    padding: '2px 0',
                                    textDecoration: 'underline'
                                  }}
                                >
                                  {isRevealed ? "Javobni yashirish" : "💡 Javobni ko'rsatish"}
                                </button>

                                {hasAnswered && (
                                  <span style={{ fontSize: '11px', fontWeight: 700, color: isCorrect ? 'var(--success-dark)' : 'var(--danger-dark)' }}>
                                    {isCorrect ? '✅ To\'g\'ri javob!' : '❌ Noto\'g\'ri'}
                                  </span>
                                )}
                              </div>

                              {(isRevealed || hasAnswered) && (
                                <div 
                                  style={{
                                    marginTop: '8px',
                                    padding: '8px 12px',
                                    borderRadius: 'var(--radius-sm)',
                                    background: 'var(--bg-subtle)',
                                    fontSize: '12px',
                                    color: 'var(--text-secondary)',
                                    borderLeft: '3px solid var(--primary)'
                                  }}
                                >
                                  <strong>To'g'ri javob:</strong> {String.fromCharCode(65 + ex.answer)}) {ex.options[ex.answer]}
                                  <div style={{ marginTop: '2px', fontStyle: 'italic' }}>
                                    💡 {ex.explanation}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* 9. "✔ O'RGANDIM" ACTION BUTTON */}
                    <div 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '12px',
                        borderTop: '1px solid var(--border-subtle)',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}
                    >
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                        {isLearned ? (
                          <span style={{ color: 'var(--success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CheckCircle2 size={16} /> Ushbu mavzu muvaffaqiyatli o'zlashtirilgan
                          </span>
                        ) : (
                          <span>Mavzuni to'liq tushungach, o'rganilgan deb belgilang:</span>
                        )}
                      </div>

                      <button
                        onClick={() => handleToggleLearned(topic)}
                        className="btn-press"
                        style={{
                          padding: '10px 20px',
                          borderRadius: 'var(--radius-md)',
                          background: isLearned 
                            ? 'var(--bg-subtle)' 
                            : 'var(--primary-gradient)',
                          color: isLearned ? 'var(--text-secondary)' : '#FFFFFF',
                          border: isLearned ? '1px solid var(--border-subtle)' : 'none',
                          fontWeight: 800,
                          fontSize: '13px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          boxShadow: isLearned ? 'none' : 'var(--shadow-primary)'
                        }}
                      >
                        <Check size={16} strokeWidth={2.5} />
                        {isLearned ? "O'rganildi (Qaytarish)" : "✔ O'rgandim (+5 Coin)"}
                      </button>
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Goal Wizard Modal */}
      <GrammarGoalWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        currentUserLevel={user?.level || 'B1'}
        learnedTopicIds={learnedTopics}
        savedGoalLevel={savedGoal}
        onSaveGoal={handleSaveGoal}
        onNavigateToTopic={handleNavigateToTopic}
      />

    </div>
  );
};
