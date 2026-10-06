import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, FileText, Plus, Zap } from 'lucide-react';

// Common auto-translation dictionary fallback for instant auto-complete without requiring an external API key
const QUICK_DICTIONARY = {
  'apple': { translation: 'olma', transcription: '/ˈæp.əl/', example: 'I eat a fresh green apple every morning.', note: 'Meva' },
  'book': { translation: 'kitob', transcription: '/bʊk/', example: 'She is reading an interesting history book.', note: 'O\'qish' },
  'maintain': { translation: 'saqlamoq, davom ettirmoq', transcription: '/meɪnˈteɪn/', example: 'We must maintain high quality standards.', note: 'IELTS writing uchun muhim' },
  'acquire': { translation: 'orttirmoq, ega bo\'lmoq', transcription: '/əˈkwaɪər/', example: 'Students acquire valuable skills during internships.', note: 'Akademik so\'z' },
  'consistent': { translation: 'izchil, barqaror', transcription: '/kənˈsɪs.tənt/', example: 'Consistent practice is key to mastering vocabulary.', note: 'Sifat' },
  'evaluate': { translation: 'baholamoq', transcription: '/ɪˈvæl.ju.eɪt/', example: 'The committee will evaluate our project proposal.', note: 'Fe\'l' },
  'significant': { translation: 'muhim, ahamiyatli', transcription: '/sɪɡˈnɪf.ɪ.kənt/', example: 'There was a significant improvement in test results.', note: 'Ko\'p uchraydi' },
  'essential': { translation: 'zarur, o\'ta muhim', transcription: '/ɪˈsen.ʃəl/', example: 'Water is essential for all living creatures.', note: 'B2 daraja' },
  'achieve': { translation: 'erishmoq', transcription: '/əˈtʃiːv/', example: 'You will achieve your goals with dedication.', note: 'Fe\'l' },
  'challenge': { translation: 'sinov, qiyinchilik', transcription: '/ˈtʃæl.ɪndʒ/', example: 'Every challenge is an opportunity to grow.', note: 'Ot / Fe\'l' },
  'opportunity': { translation: 'imkoniyat', transcription: '/ˌɒp.əˈtʃuː.nə.ti/', example: 'Do not miss this great study opportunity.', note: 'Nom' },
  'improve': { translation: 'yaxshilamoq', transcription: '/ɪmˈpruːv/', example: 'Practice daily to improve your speaking.', note: 'Fe\'l' }
};

export const AddWordModal = ({ isOpen, onClose }) => {
  const { addWord, bulkAddWords, showToast } = useApp();

  // Mode: 'single' | 'bulk' | 'auto'
  const [mode, setMode] = useState('single');

  // Single word state
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [example, setExample] = useState('');
  const [note, setNote] = useState('');
  const [tag, setTag] = useState('');

  // Bulk add state
  const [bulkText, setBulkText] = useState('');

  if (!isOpen) return null;

  // Single submit
  const handleSingleSubmit = (e) => {
    e.preventDefault();
    if (!word.trim() || !translation.trim()) {
      showToast('So\'z va tarjimani kiritish shart!', 'error');
      return;
    }
    addWord({ word, translation, example, note, tag });
    setWord('');
    setTranslation('');
    setExample('');
    setNote('');
    setTag('');
    onClose();
  };

  // Bulk submit
  const handleBulkSubmit = (e) => {
    e.preventDefault();
    const count = bulkAddWords(bulkText);
    if (count > 0) {
      setBulkText('');
      onClose();
    } else {
      showToast('Iltimos, so\'zlarni "so\'z - tarjima" ko\'rinishida yozing', 'error');
    }
  };

  // AI Auto-Fill Helper
  const handleAutoFill = () => {
    if (!word.trim()) {
      showToast('Avval inglizcha so\'zni yozing', 'info');
      return;
    }
    const clean = word.trim().toLowerCase();
    if (QUICK_DICTIONARY[clean]) {
      const data = QUICK_DICTIONARY[clean];
      setTranslation(data.translation);
      setExample(data.example);
      setNote(data.note);
      showToast(`"${clean}" ma'lumotlari avtomatik to'ldirildi!`, 'success');
    } else {
      // Smart general auto-fill
      setTranslation('tarjimasi');
      setExample(`This is an example sentence with ${clean}.`);
      setNote('Yangi so\'z');
      showToast(`Avto-shablon yaratildi`, 'info');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 999
    }}>
      <div 
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'var(--bg-surface)',
          borderTopLeftRadius: 'var(--radius-xl)',
          borderTopRightRadius: 'var(--radius-xl)',
          padding: '24px 20px 32px 20px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Yangi so'z qo'shish
          </h3>
          <button
            onClick={onClose}
            style={{ padding: '6px', color: 'var(--text-tertiary)', borderRadius: '50%', background: 'var(--bg-subtle)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Mode Selector Tabs (Bittalab vs Ommaviy 50 ta) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: 'var(--bg-subtle)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '20px'
        }}>
          <button
            onClick={() => setMode('single')}
            style={{
              padding: '9px',
              borderRadius: 'var(--radius-sm)',
              background: mode === 'single' ? 'var(--bg-surface)' : 'transparent',
              color: mode === 'single' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: mode === 'single' ? 'var(--shadow-sm)' : 'none',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Plus size={16} /> Bittalab kiritish
          </button>

          <button
            onClick={() => setMode('bulk')}
            style={{
              padding: '9px',
              borderRadius: 'var(--radius-sm)',
              background: mode === 'bulk' ? 'var(--bg-surface)' : 'transparent',
              color: mode === 'bulk' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: mode === 'bulk' ? 'var(--shadow-sm)' : 'none',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Zap size={16} color="#F59E0B" /> Ommaviy (50+ so'z)
          </button>
        </div>

        {/* 1. SINGLE WORD FORM */}
        {mode === 'single' && (
          <form onSubmit={handleSingleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Inglizcha so'z <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                {/* Auto-fill Button */}
                <button
                  type="button"
                  onClick={handleAutoFill}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    background: 'var(--primary-50)',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  <Sparkles size={12} /> AI Avto-to'ldirish
                </button>
              </div>
              <input
                type="text"
                placeholder="Masalan: challenge"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                O'zbekcha tarjima <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Masalan: sinov, qiyinchilik"
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Misol gap
              </label>
              <input
                type="text"
                placeholder="Masalan: Every challenge helps us grow."
                value={example}
                onChange={(e) => setExample(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Izoh
              </label>
              <input
                type="text"
                placeholder="Masalan: Writing qismida ko'p ishlatiladi"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Teg / Mavzu (Ixtiyoriy)
              </label>
              <input
                type="text"
                placeholder="Masalan: #ielts yoki #kundalik"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)',
                  fontSize: '14px',
                  marginBottom: '8px'
                }}
              />
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['#IELTS', '#Akademik', '#Kundalik', '#Ish', '#Film'].map(chip => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setTag(chip)}
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: tag === chip ? 'var(--primary-gradient)' : 'var(--bg-subtle)',
                      color: tag === chip ? '#FFFFFF' : 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              style={{
                marginTop: '10px',
                padding: '15px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-gradient)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '15px',
                boxShadow: 'var(--shadow-primary)'
              }}
            >
              Saqlash (+5 coin)
            </button>
          </form>
        )}

        {/* 2. BULK ADD FORM (50 ta so'zni birvarakayiga kiritish!) */}
        {mode === 'bulk' && (
          <form onSubmit={handleBulkSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--gold-light)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              fontSize: '12px',
              color: 'var(--gold-dark)',
              lineHeight: 1.5
            }}>
              ⚡ <strong>Tezkor usul:</strong> 50 ta yoki undan ko'p so'zni pastdagi maydonga shunchaki tashlang.
              Har bir qatorga: <code>inglizcha - o'zbekcha</code> (masalan: <code>learn - o'rganmoq</code>).
            </div>

            <textarea
              rows={8}
              placeholder={`apple - olma\nbook - kitob\nachieve - erishmoq\nchallenge - qiyinchilik\nopportunity - imkoniyat`}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-subtle)',
                background: 'var(--bg-subtle)',
                fontSize: '13px',
                fontFamily: 'monospace',
                lineHeight: 1.6
              }}
            />

            <button
              type="submit"
              style={{
                padding: '15px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '15px',
                boxShadow: 'var(--gold-glow)'
              }}
            >
              Hammasini birvarakayiga qo'shish
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
