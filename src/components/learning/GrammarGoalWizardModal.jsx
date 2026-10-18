import React, { useState, useEffect } from 'react';
import { 
  X, Target, CheckCircle2, ArrowRight, Sparkles, 
  Clock, BookOpen, Layers, Award, ChevronRight, 
  RotateCcw, Compass, ArrowLeft, BookmarkCheck, Check
} from 'lucide-react';
import { 
  grammarLevels, 
  getLevelOrder, 
  getCumulativeTopics, 
  getCumulativeTensesGrouped, 
  getCumulativeOtherTopicsGrouped, 
  getRoadmapMilestones 
} from '../../data/grammar/index.js';

export const GrammarGoalWizardModal = ({ 
  isOpen, 
  onClose, 
  currentUserLevel = 'B1', 
  learnedTopicIds = [], 
  savedGoalLevel = null, 
  onSaveGoal, 
  onNavigateToTopic 
}) => {
  // Tanlangan daraja holati (boshlang'ichda saqlangan maqsad yoki B1)
  const [selectedTarget, setSelectedTarget] = useState(savedGoalLevel || 'B1');
  // 'select' - daraja tanlash ekrani, 'roadmap' - yo'l xaritasi ekrani
  const [view, setView] = useState(savedGoalLevel ? 'roadmap' : 'select');
  // Roadmap ichidagi faol bo'lim: 'tenses' | 'topics' | 'steps'
  const [activeRoadmapTab, setActiveRoadmapTab] = useState('tenses');

  useEffect(() => {
    if (savedGoalLevel) {
      setSelectedTarget(savedGoalLevel);
    }
  }, [savedGoalLevel]);

  // Klaviatura Esc tugmasi bilan yopish
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentLevelInfo = grammarLevels.find(l => l.id === selectedTarget) || grammarLevels[2];
  const cumulativeTopics = getCumulativeTopics(selectedTarget);
  const totalTopicsCount = cumulativeTopics.length;
  const learnedCount = cumulativeTopics.filter(t => learnedTopicIds.includes(t.id)).length;
  const progressPercent = totalTopicsCount > 0 ? Math.round((learnedCount / totalTopicsCount) * 100) : 0;

  const userLevelOrder = getLevelOrder(currentUserLevel);
  const targetLevelOrder = getLevelOrder(selectedTarget);
  const isLevelReached = userLevelOrder >= targetLevelOrder;

  const tensesGroups = getCumulativeTensesGrouped(selectedTarget);
  const otherGroups = getCumulativeOtherTopicsGrouped(selectedTarget);
  const roadmapSteps = getRoadmapMilestones(selectedTarget);

  const handleSelectLevel = (levelId) => {
    setSelectedTarget(levelId);
    setView('roadmap');
  };

  const handleSaveAndApply = () => {
    if (onSaveGoal) {
      onSaveGoal(selectedTarget);
    }
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="goal-wizard-title"
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '92vh',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Modal Top Header */}
        <div 
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-surface-elevated)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-50)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px var(--primary-glow)'
              }}
            >
              <Target size={22} />
            </div>
            <div>
              <h2 
                id="goal-wizard-title"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {view === 'select' ? '🎯 Maqsadli darajani tanlash' : `🎯 ${selectedTarget} Yo'l xaritasi`}
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {view === 'select' 
                  ? 'CEFR standarti bo\'yicha o\'zingiz erishmoqchi bo\'lgan darajani belgilang'
                  : `${currentLevelInfo.name} bo'yicha to'liq grammatik dastur va ketma-ketlik`
                }
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Yopish"
            className="btn-press"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body Container (Scrollable) */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          
          {/* VIEW 1: LEVEL SELECTION */}
          {view === 'select' && (
            <div>
              <div 
                style={{
                  textAlign: 'center',
                  maxWidth: '560px',
                  margin: '0 auto 24px auto'
                }}
              >
                <span 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--primary-50)',
                    color: 'var(--primary)',
                    fontSize: '12px',
                    fontWeight: 700,
                    marginBottom: '8px'
                  }}
                >
                  <Sparkles size={14} /> Shaxsiy o'quv rejasi
                </span>
                <h3 
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '22px',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: '8px'
                  }}
                >
                  Siz CEFR bo'yicha qaysi darajani qo'lga kiritmoqchisiz?
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Maqsadingizni tanlang. Biz sizga ushbu cho'qqiga chiqish uchun kerak bo'ladigan barcha zamonlar, grammatik qoidalar va o'rganish tartibini taqdim etamiz.
                </p>
              </div>

              {/* Grid of Level Cards */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '14px'
                }}
              >
                {grammarLevels.map((lvl) => {
                  const isCurrent = lvl.id === currentUserLevel;
                  const isSaved = lvl.id === savedGoalLevel;
                  const levelCumulativeCount = getCumulativeTopics(lvl.id).length;

                  return (
                    <div
                      key={lvl.id}
                      onClick={() => handleSelectLevel(lvl.id)}
                      className="btn-press"
                      style={{
                        padding: '18px',
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--bg-surface-elevated)',
                        border: isSaved 
                          ? `2px solid var(--primary)` 
                          : '1px solid var(--border-subtle)',
                        boxShadow: isSaved ? '0 4px 16px var(--primary-glow)' : 'var(--shadow-sm)',
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '12px',
                        position: 'relative'
                      }}
                    >
                      {/* Badge in card header */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span 
                            style={{
                              padding: '4px 10px',
                              borderRadius: 'var(--radius-sm)',
                              background: lvl.badgeColor,
                              border: `1px solid ${lvl.badgeBorder}`,
                              color: lvl.color,
                              fontWeight: 800,
                              fontSize: '14px'
                            }}
                          >
                            {lvl.id}
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {lvl.titleUz}
                          </span>
                        </div>

                        {isSaved && (
                          <span 
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '11px',
                              fontWeight: 700,
                              color: 'var(--primary)',
                              background: 'var(--primary-50)',
                              padding: '2px 8px',
                              borderRadius: 'var(--radius-full)'
                            }}
                          >
                            <BookmarkCheck size={12} /> Saqlangan
                          </span>
                        )}
                        {isCurrent && !isSaved && (
                          <span 
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: 'var(--success)',
                              background: 'var(--success-light)',
                              padding: '2px 8px',
                              borderRadius: 'var(--radius-full)'
                            }}
                          >
                            Joriy darajangiz
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                        {lvl.description}
                      </p>

                      {/* Meta Footer */}
                      <div 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '10px',
                          borderTop: '1px solid var(--border-subtle)',
                          fontSize: '12px',
                          color: 'var(--text-tertiary)'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={13} /> {lvl.estimatedHours}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                          <BookOpen size={13} /> {levelCumulativeCount} ta mavzu
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 2: COMPREHENSIVE ROADMAP */}
          {view === 'roadmap' && (
            <div>
              {/* Top Navigation Back to Level Cards */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <button
                  onClick={() => setView('select')}
                  className="btn-press"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <ArrowLeft size={16} /> Boshqa daraja tanlash
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span 
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      background: currentLevelInfo.badgeColor,
                      border: `1px solid ${currentLevelInfo.badgeBorder}`,
                      color: currentLevelInfo.color,
                      fontWeight: 800,
                      fontSize: '12px'
                    }}
                  >
                    {currentLevelInfo.name}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {currentLevelInfo.estimatedHours}
                  </span>
                </div>
              </div>

              {/* Level Introduction Card */}
              <div 
                style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '20px'
                }}
              >
                <h3 
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '20px',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Compass size={22} color="var(--primary)" />
                  {selectedTarget} darajasiga erishish yo'l xaritasi
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {currentLevelInfo.fullDescription}
                </p>

                {/* Level Comparison Notice */}
                {isLevelReached ? (
                  <div 
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <Award size={20} color="var(--success)" style={{ flexShrink: 0 }} />
                    <div>
                      <strong>Ajoyib natija!</strong> Siz hozirda <strong>{currentUserLevel}</strong> darajasidasiz. Tanlangan <strong>{selectedTarget}</strong> darajasi bo'yicha bilimlaringizni takrorlash, mustahkamlash va mini-mashqlarni yechish orqali mustahkam poydevor hosil qilishingiz mumkin.
                    </div>
                  </div>
                ) : (
                  <div 
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(124, 58, 237, 0.08)',
                      border: '1px solid rgba(124, 58, 237, 0.25)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <Sparkles size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                    <div>
                      <strong>Tavsiya:</strong> Sizning joriy darajangiz <strong>{currentUserLevel}</strong>, maqsad esa <strong>{selectedTarget}</strong>. Maqsadga erishish uchun oraliq darajalardagi barcha grammatik qoidalar va zamonlarni bosqichma-bosqich to'liq o'zlashtirish tavsiya etiladi.
                    </div>
                  </div>
                )}

                {/* Progress bar for this goal */}
                <div style={{ marginTop: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                      Maqsad bo'yicha o'rganilgan mavzular
                    </span>
                    <span style={{ fontWeight: 800, color: 'var(--primary)' }}>
                      {learnedCount} / {totalTopicsCount} ta ({progressPercent}%)
                    </span>
                  </div>
                  <div 
                    style={{
                      width: '100%',
                      height: '10px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--border-subtle)',
                      overflow: 'hidden'
                    }}
                  >
                    <div 
                      style={{
                        height: '100%',
                        width: `${progressPercent}%`,
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--primary-gradient)',
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Roadmap Tab Pills */}
              <div 
                style={{
                  display: 'flex',
                  gap: '8px',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '12px',
                  marginBottom: '20px',
                  overflowX: 'auto'
                }}
              >
                <button
                  onClick={() => setActiveRoadmapTab('tenses')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    background: activeRoadmapTab === 'tenses' ? 'var(--primary)' : 'var(--bg-subtle)',
                    color: activeRoadmapTab === 'tenses' ? '#FFFFFF' : 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Clock size={15} /> ⏱ Zamonlar (Tenses)
                </button>
                <button
                  onClick={() => setActiveRoadmapTab('topics')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    background: activeRoadmapTab === 'topics' ? 'var(--primary)' : 'var(--bg-subtle)',
                    color: activeRoadmapTab === 'topics' ? '#FFFFFF' : 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <BookOpen size={15} /> 📚 Boshqa muhim mavzular
                </button>
                <button
                  onClick={() => setActiveRoadmapTab('steps')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    background: activeRoadmapTab === 'steps' ? 'var(--primary)' : 'var(--bg-subtle)',
                    color: activeRoadmapTab === 'steps' ? '#FFFFFF' : 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Layers size={15} /> 🗺 O'rganish tartibi (Qadamlar)
                </button>
              </div>

              {/* TAB 1: CUMULATIVE TENSES */}
              {activeRoadmapTab === 'tenses' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                    <strong>{selectedTarget}</strong> darajasiga erishish uchun quyidagi barcha zamonlarni darajalar ketma-ketligida to'liq o'rganishingiz shart:
                  </p>

                  {tensesGroups.map(group => {
                    const lvlMeta = grammarLevels.find(l => l.id === group.level);
                    return (
                      <div key={group.level}>
                        {/* Group Header Badge */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                          <span 
                            style={{
                              padding: '3px 10px',
                              borderRadius: 'var(--radius-sm)',
                              background: lvlMeta.badgeColor,
                              border: `1px solid ${lvlMeta.badgeBorder}`,
                              color: lvlMeta.color,
                              fontWeight: 800,
                              fontSize: '12px'
                            }}
                          >
                            {group.level} darajasi zamonlari ({group.tenses.length})
                          </span>
                        </div>

                        {/* Tense Cards */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {group.tenses.map(tense => {
                            const isLearned = learnedTopicIds.includes(tense.id);
                            return (
                              <div
                                key={tense.id}
                                style={{
                                  padding: '16px',
                                  borderRadius: 'var(--radius-md)',
                                  background: 'var(--bg-surface-elevated)',
                                  border: isLearned 
                                    ? '1.5px solid var(--success)' 
                                    : '1px solid var(--border-subtle)',
                                  boxShadow: 'var(--shadow-sm)',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '8px'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                                  <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                                        {tense.title}
                                      </h4>
                                      {isLearned && (
                                        <span 
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '3px',
                                            fontSize: '11px',
                                            fontWeight: 700,
                                            color: 'var(--success)',
                                            background: 'var(--success-light)',
                                            padding: '2px 6px',
                                            borderRadius: 'var(--radius-full)'
                                          }}
                                        >
                                          <CheckCircle2 size={12} /> O'rganilgan
                                        </span>
                                      )}
                                    </div>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                                      {tense.summary}
                                    </p>
                                  </div>

                                  <button
                                    onClick={() => {
                                      if (onNavigateToTopic) {
                                        onNavigateToTopic(tense.level, tense.id);
                                      }
                                      onClose();
                                    }}
                                    className="btn-press"
                                    style={{
                                      padding: '8px 12px',
                                      borderRadius: 'var(--radius-md)',
                                      background: 'var(--primary-50)',
                                      border: '1px solid var(--primary-200)',
                                      color: 'var(--primary)',
                                      fontWeight: 700,
                                      fontSize: '12px',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                      whiteSpace: 'nowrap',
                                      flexShrink: 0
                                    }}
                                  >
                                    Mavzuga o'tish <ArrowRight size={14} />
                                  </button>
                                </div>

                                {/* Formula snippet */}
                                <div 
                                  style={{
                                    padding: '8px 12px',
                                    borderRadius: 'var(--radius-sm)',
                                    background: 'var(--bg-subtle)',
                                    fontSize: '12px',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'monospace'
                                  }}
                                >
                                  <strong>Formula:</strong> {tense.formula?.affirmative || 'Subject + Verb'}
                                </div>

                                {/* 1-2 Examples */}
                                {tense.examples && tense.examples.length > 0 && (
                                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                    <span style={{ fontStyle: 'italic', color: 'var(--text-primary)' }}>"{tense.examples[0].en}"</span>
                                    <span style={{ color: 'var(--text-tertiary)', marginLeft: '6px' }}>— {tense.examples[0].uz}</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 2: OTHER GRAMMAR TOPICS */}
              {activeRoadmapTab === 'topics' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                    Zamonlardan tashqari <strong>{selectedTarget}</strong> darajasida talab etiladigan konstruksiyalar, shart mayllari, nisbatlar va modal fe'llar:
                  </p>

                  {otherGroups.map(group => {
                    const lvlMeta = grammarLevels.find(l => l.id === group.level);
                    return (
                      <div key={group.level}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                          <span 
                            style={{
                              padding: '3px 10px',
                              borderRadius: 'var(--radius-sm)',
                              background: lvlMeta.badgeColor,
                              border: `1px solid ${lvlMeta.badgeBorder}`,
                              color: lvlMeta.color,
                              fontWeight: 800,
                              fontSize: '12px'
                            }}
                          >
                            {group.level} darajasi mavzulari ({group.topics.length})
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                          {group.topics.map(topic => {
                            const isLearned = learnedTopicIds.includes(topic.id);
                            return (
                              <div
                                key={topic.id}
                                style={{
                                  padding: '14px',
                                  borderRadius: 'var(--radius-md)',
                                  background: 'var(--bg-surface-elevated)',
                                  border: isLearned 
                                    ? '1.5px solid var(--success)' 
                                    : '1px solid var(--border-subtle)',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'space-between',
                                  gap: '8px'
                                }}
                              >
                                <div>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                                    <h5 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                                      {topic.title}
                                    </h5>
                                    {isLearned && (
                                      <CheckCircle2 size={16} color="var(--success)" style={{ flexShrink: 0 }} />
                                    )}
                                  </div>
                                  <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, marginTop: '2px' }}>
                                    {topic.titleUz}
                                  </div>
                                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '6px 0 0 0', lineHeight: 1.4 }}>
                                    {topic.summary.length > 85 ? topic.summary.slice(0, 85) + '...' : topic.summary}
                                  </p>
                                </div>

                                <button
                                  onClick={() => {
                                    if (onNavigateToTopic) {
                                      onNavigateToTopic(topic.level, topic.id);
                                    }
                                    onClose();
                                  }}
                                  className="btn-press"
                                  style={{
                                    padding: '6px 10px',
                                    borderRadius: 'var(--radius-sm)',
                                    background: 'var(--bg-subtle)',
                                    border: '1px solid var(--border-subtle)',
                                    color: 'var(--text-primary)',
                                    fontWeight: 700,
                                    fontSize: '11px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px',
                                    alignSelf: 'flex-start'
                                  }}
                                >
                                  Mavzuga o'tish <ArrowRight size={12} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 3: STEP-BY-STEP ROADMAP MILESTONES */}
              {activeRoadmapTab === 'steps' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                    Ingliz tilini ketma-ket, uzluksiz va tizimli o'zlashtirish uchun tavsiya etiladigan bosqichlar:
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {roadmapSteps.map((milestone) => {
                      const lvlMeta = grammarLevels.find(l => l.id === milestone.level);
                      return (
                        <div
                          key={milestone.step}
                          style={{
                            padding: '16px',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--bg-surface-elevated)',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            gap: '14px'
                          }}
                        >
                          {/* Step Number Circle */}
                          <div 
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: 'var(--radius-full)',
                              background: 'var(--primary-gradient)',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: '15px',
                              flexShrink: 0
                            }}
                          >
                            {milestone.step}
                          </div>

                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <span 
                                style={{
                                  padding: '2px 8px',
                                  borderRadius: 'var(--radius-sm)',
                                  background: lvlMeta.badgeColor,
                                  color: lvlMeta.color,
                                  fontWeight: 800,
                                  fontSize: '11px'
                                }}
                              >
                                {milestone.level}
                              </span>
                              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                                {milestone.title}
                              </h4>
                            </div>

                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45, margin: '4px 0 8px 0' }}>
                              {milestone.description}
                            </p>

                            {/* Focus Topics Chips */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {milestone.focusTopics.map((item, idx) => (
                                <span
                                  key={idx}
                                  style={{
                                    fontSize: '11px',
                                    padding: '2px 8px',
                                    borderRadius: 'var(--radius-full)',
                                    background: 'var(--bg-subtle)',
                                    color: 'var(--text-primary)',
                                    border: '1px solid var(--border-subtle)',
                                    fontWeight: 600
                                  }}
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Sticky Footer */}
        <div 
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          {view === 'roadmap' ? (
            <>
              <button
                onClick={() => setView('select')}
                className="btn-press"
                style={{
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RotateCcw size={15} /> Boshqa daraja tanlash
              </button>

              <button
                onClick={handleSaveAndApply}
                className="btn-press"
                style={{
                  padding: '12px 24px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--primary-gradient)',
                  border: 'none',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow-primary)'
                }}
              >
                <Check size={18} strokeWidth={2.5} />
                Maqsadni saqlash ({selectedTarget})
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <button
                onClick={onClose}
                className="btn-press"
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Bekor qilish
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
