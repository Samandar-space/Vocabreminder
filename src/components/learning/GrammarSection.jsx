import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ChevronDown, ChevronUp, CheckCircle2, GraduationCap } from 'lucide-react';

export const GrammarSection = ({ onBack }) => {
  const [selectedLevel, setSelectedLevel] = useState('B1');
  const [expandedTopic, setExpandedTopic] = useState(null);

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  // Clean structure ready for user's own grammar topics
  const grammarData = {
    'A1': [
      { id: 'a1_1', title: 'To be fe\'li (am, is, are)', rule: 'Shaxs va sonlarga ko\'ra fe\'l o\'zgarishi: I am, You are, He/She/It is.', example: 'He is a student at university.' },
      { id: 'a1_2', title: 'Present Simple (Oddiy hozirgi zamon)', rule: 'Doimiy odatlar va faktlar uchun: do/does.', example: 'She drinks tea every morning.' }
    ],
    'A2': [
      { id: 'a2_1', title: 'Past Simple (Oddiy o\'tgan zamon)', rule: 'O\'tgan zamon uchun to\'g\'ri (-ed) va noto\'g\'ri fe\'llar.', example: 'We visited Samarkand last month.' },
      { id: 'a2_2', title: 'Comparatives & Superlatives (Sifat darajalari)', rule: 'Taqqoslash: -er / more than; Eng yuqori: the -est / the most.', example: 'Tashkent is bigger than Samarkand.' }
    ],
    'B1': [
      { id: 'b1_1', title: 'Present Perfect (Hozirgi tugallangan)', rule: 'Natijasi hozirga bog\'liq harakatlar: have/has + V3.', example: 'I have lived here for five years.' },
      { id: 'b1_2', title: 'First & Second Conditionals (Shart mayllari)', rule: 'If + Present Simple, will + V1 / If + Past Simple, would + V1.', example: 'If I studied harder, I would pass the exam.' },
      { id: 'b1_3', title: 'Passive Voice (Majhul nisbat)', rule: 'Obyekt subyektga aylanadi: be + V3.', example: 'The letter was sent yesterday.' }
    ],
    'B2': [
      { id: 'b2_1', title: 'Mixed Conditionals (Aralash shart mayli)', rule: 'O\'tmishdagi sababning hozirgi oqibati.', example: 'If I had accepted that job, I would be in London now.' },
      { id: 'b2_2', title: 'Relative Clauses (Defining & Non-defining)', rule: 'Qo\'shimcha izohlovchi ergash gaplar (who, which, that).', example: 'The book that you recommended was exceptional.' }
    ],
    'C1': [
      { id: 'c1_1', title: 'Inversion (Inversiya bilan urg\'u berish)', rule: 'Salbiy so\'zlar gap boshida kelganda: Hardly, Seldom, Not only.', example: 'Hardly had I arrived when the phone rang.' },
      { id: 'c1_2', title: 'Cleft Sentences (Ajratilgan gaplar)', rule: 'Urg\'u berish uchun: What I need is... / It was John who...', example: 'What we need is consistent dedication.' }
    ],
    'C2': [
      { id: 'c2_1', title: 'Subjunctive Mood (Istak mayli)', rule: 'Rasmiy tavsiyalar: recommend that he do (V1).', example: 'It is vital that she be informed immediately.' }
    ]
  };

  const topics = grammarData[selectedLevel] || [];

  return (
    <div style={{ padding: '20px', minHeight: '85vh' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}
        >
          <ArrowLeft size={20} /> Orqaga
        </button>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
          Grammatika (Darajalar)
        </h2>
      </div>

      {/* Level Selector Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
        {levels.map(lvl => (
          <button
            key={lvl}
            onClick={() => setSelectedLevel(lvl)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              background: selectedLevel === lvl ? 'var(--primary-gradient)' : 'var(--bg-subtle)',
              color: selectedLevel === lvl ? '#FFFFFF' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              fontWeight: 800,
              fontSize: '13px',
              flexShrink: 0
            }}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Topics List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {topics.map(topic => {
          const isExpanded = expandedTopic === topic.id;
          return (
            <div
              key={topic.id}
              style={{
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div
                onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <GraduationCap size={18} color="var(--primary)" />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {topic.title}
                  </span>
                </div>
                {isExpanded ? <ChevronUp size={18} color="var(--text-tertiary)" /> : <ChevronDown size={18} color="var(--text-tertiary)" />}
              </div>

              {isExpanded && (
                <div style={{ padding: '0 16px 16px 16px', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '12px', marginBottom: '8px' }}>
                    <strong style={{ color: 'var(--primary)' }}>Qoida:</strong> {topic.rule}
                  </div>
                  <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-subtle)', fontSize: '13px', color: 'var(--text-primary)' }}>
                    <strong style={{ color: 'var(--text-tertiary)', fontSize: '11px', display: 'block', marginBottom: '2px' }}>NAMUNA:</strong>
                    "{topic.example}"
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
