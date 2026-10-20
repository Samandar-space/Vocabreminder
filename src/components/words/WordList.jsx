import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { speechService } from '../../services/speech';
import { BackupModal } from './BackupModal';
import { PronunciationModal } from '../learning/PronunciationModal';
import { 
  Search, Star, Volume2, Plus, Archive, 
  Trash2, Edit3, ArrowLeft, CheckCircle2, XCircle, Clock, 
  Download, Tag, Mic 
} from 'lucide-react';

export const WordList = ({ onOpenAddModal }) => {
  const { words, toggleFavorite, deleteWord, editWord, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'due' | 'favorite' | 'box_1'..'box_5' | tag
  const [isBackupOpen, setIsBackupOpen] = useState(false);

  // Modals inside word list: 'detail' | 'edit' | null
  const [activeModal, setActiveModal] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [wordToDelete, setWordToDelete] = useState(null);
  const [pronounceWord, setPronounceWord] = useState(null);

  // Edit form state
  const [editEnglish, setEditEnglish] = useState('');
  const [editUzbek, setEditUzbek] = useState('');
  const [editExample, setEditExample] = useState('');
  const [editNote, setEditNote] = useState('');
  const [editTag, setEditTag] = useState('');

  // Extract unique tags from words (supports both string tag and tags array)
  const allTags = Array.from(new Set(
    words.flatMap(w => {
      if (Array.isArray(w.tags)) return w.tags;
      if (typeof w.tag === 'string' && w.tag.trim()) return [w.tag.trim()];
      return [];
    }).filter(Boolean)
  ));

  // Filtering
  const filteredWords = words.filter(item => {
    // Safe Search match
    const q = searchQuery.toLowerCase().trim();
    const w = (item.word || '').toLowerCase();
    const t = (item.translation || '').toLowerCase();
    const matchesSearch = !q || w.includes(q) || t.includes(q);

    // Pill filter match
    let matchesFilter = true;
    if (activeFilter === 'due') {
      matchesFilter = new Date(item.nextReviewDate || 0) <= new Date();
    } else if (activeFilter === 'favorite') {
      matchesFilter = !!item.isFavorite;
    } else if (activeFilter.startsWith('box_')) {
      const boxNum = parseInt(activeFilter.split('_')[1], 10);
      matchesFilter = (item.box || 1) === boxNum;
    } else if (activeFilter !== 'all') {
      const itemTags = Array.isArray(item.tags) ? item.tags : [item.tag];
      matchesFilter = itemTags.includes(activeFilter);
    }

    return matchesSearch && matchesFilter;
  });

  // Open Detail
  const openDetail = (word) => {
    setSelectedWord(word);
    setActiveModal('detail');
  };

  // Open Edit
  const openEdit = (word) => {
    setSelectedWord(word);
    setEditEnglish(word.word);
    setEditUzbek(word.translation);
    setEditExample(word.example || '');
    setEditNote(word.note || '');
    setEditTag(word.tag || '');
    setActiveModal('edit');
  };

  // Save Edit
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!selectedWord) return;
    editWord(selectedWord.id, {
      word: editEnglish,
      translation: editUzbek,
      example: editExample,
      note: editNote,
      tag: editTag
    });
    setActiveModal(null);
  };

  // Confirm and Execute Delete
  const handleConfirmDelete = () => {
    if (wordToDelete) {
      deleteWord(wordToDelete.id);
      setWordToDelete(null);
      setActiveModal(null);
    }
  };

  return (
    <div style={{ padding: '16px 20px 80px 20px', minHeight: '80vh', position: 'relative' }}>
      
      {/* Search Input & Backup Action Bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            placeholder="So'z qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 42px',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontSize: '14px',
              boxShadow: 'var(--shadow-sm)'
            }}
          />
          <Search size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '16px', top: '14px' }} />
        </div>

        <button
          onClick={() => setIsBackupOpen(true)}
          title="Lug'at zaxirasi (Eksport va Import)"
          style={{
            padding: '0 16px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--border-subtle)',
            color: 'var(--primary)',
            fontWeight: 700,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          <Download size={16} /> Zaxira
        </button>
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', overflowX: 'auto', paddingBottom: '4px' }}>
        {[
          { id: 'all', label: `Barchasi (${words.length})` },
          { id: 'due', label: `Takrorlash kerak (${words.filter(w => new Date(w.nextReviewDate) <= new Date()).length})` },
          { id: 'favorite', label: `Sevimli (${words.filter(w => w.isFavorite).length})` },
          { id: 'box_1', label: `1-quti: Yangi (${words.filter(w => (w.box || 1) === 1).length})` },
          { id: 'box_2', label: `2-quti (${words.filter(w => w.box === 2).length})` },
          { id: 'box_3', label: `3-quti (${words.filter(w => w.box === 3).length})` },
          { id: 'box_4', label: `4-quti (${words.filter(w => w.box === 4).length})` },
          { id: 'box_5', label: `5-quti: Yodlangan (${words.filter(w => w.box === 5).length})` },
          ...allTags.map(t => ({ id: t, label: `#${t.replace(/^#/, '')}` }))
        ].map(pill => {
          const isActive = activeFilter === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => setActiveFilter(pill.id)}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                background: isActive ? 'var(--primary-gradient)' : 'var(--bg-subtle)',
                color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                fontSize: '13px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {/* EMPTY WORDS STATE */}
      {words.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
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
            <Archive size={40} color="var(--primary)" />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Hali so'z qo'shilmagan
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '280px', lineHeight: 1.5 }}>
            Yangi so'z qo'shish uchun pastdagi + tugmasini bosing yoki matn orqali 50 ta so'z tashlang.
          </p>
        </div>
      ) : filteredWords.length === 0 ? (
        /* SEARCH NOT FOUND STATE */
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            background: 'var(--bg-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <Search size={40} color="var(--text-tertiary)" />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Hech narsa topilmadi
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Boshqa so'z bilan qidirib ko'ring.
          </p>
        </div>
      ) : (
        /* WORDS LIST (Responsive Multi-column Grid on Desktop) */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '12px'
        }}>
          {filteredWords.map(item => {
            const isDue = new Date(item.nextReviewDate) <= new Date();

            return (
              <div
                key={item.id}
                className="card-interactive"
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer'
                }}
              >
                {/* Left info (clickable to open detail) */}
                <div onClick={() => openDetail(item)} style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {item.word}
                    </span>
                    {/* Audio TTS and Mic Pronunciation Icons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button
                        type="button"
                        className="btn-press"
                        onClick={(e) => { e.stopPropagation(); speechService.speak(item.word); }}
                        style={{ color: 'var(--primary)', padding: '2px', display: 'flex', alignItems: 'center' }}
                        title="Talaffuzni eshitish"
                      >
                        <Volume2 size={16} />
                      </button>
                      <button
                        type="button"
                        className="btn-press"
                        onClick={(e) => { e.stopPropagation(); setPronounceWord(item); }}
                        style={{ color: 'var(--primary)', padding: '2px', display: 'flex', alignItems: 'center' }}
                        title="AI Talaffuzni mashq qilish"
                      >
                        <Mic size={15} />
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {item.translation}
                    </span>
                    {item.tag && (
                      <span style={{
                        fontSize: '11px',
                        padding: '1px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--primary-50)',
                        color: 'var(--primary)',
                        fontWeight: 700
                      }}>
                        #{item.tag.replace(/^#/, '')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right badges & Favorite Star */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Tag */}
                  {isDue ? (
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--gold-light)',
                      color: 'var(--gold-dark)',
                      fontSize: '11px',
                      fontWeight: 700
                    }}>
                      Takrorla
                    </span>
                  ) : (
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--primary-100)',
                      color: 'var(--primary)',
                      fontSize: '11px',
                      fontWeight: 700
                    }}>
                      Qutida {item.box || 1}
                    </span>
                  )}

                  {/* Favorite star */}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    style={{ padding: '6px', color: item.isFavorite ? '#F59E0B' : 'var(--text-tertiary)' }}
                  >
                    <Star size={18} fill={item.isFavorite ? '#F59E0B' : 'none'} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={onOpenAddModal}
        title="Yangi so'z qo'shish"
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--primary-gradient)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-primary)',
          zIndex: 40,
          transition: 'transform var(--transition-bounce)'
        }}
      >
        <Plus size={28} />
      </button>

      {/* 1. BATAFSIL (WORD DETAIL) FULL MODAL */}
      {activeModal === 'detail' && selectedWord && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
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
              overflowY: 'auto'
            }}
          >
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <button
                onClick={() => setActiveModal(null)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '14px' }}
              >
                <ArrowLeft size={18} /> Orqaga
              </button>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
                Batafsil
              </h3>
              <button
                onClick={() => toggleFavorite(selectedWord.id)}
                style={{ color: selectedWord.isFavorite ? '#F59E0B' : 'var(--text-tertiary)' }}
              >
                <Star size={20} fill={selectedWord.isFavorite ? '#F59E0B' : 'none'} />
              </button>
            </div>

            {/* Word Main Card */}
            <div style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-primary)',
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '2px' }}>
                  {selectedWord.word}
                </h2>
                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
                  {selectedWord.transcription}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700 }}>
                  {selectedWord.translation}
                </div>
              </div>
              <button
                onClick={() => speechService.speak(selectedWord.word)}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <Volume2 size={22} />
              </button>
            </div>

            {/* Misol gap */}
            {selectedWord.example && (
              <div style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                marginBottom: '12px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  MISOL GAP
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  "{selectedWord.example}"
                </div>
              </div>
            )}

            {/* Izoh */}
            {selectedWord.note && (
              <div style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  IZOH
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {selectedWord.note}
                </div>
              </div>
            )}

            {/* Natijalar (Leitner stats) */}
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
                Sizning natijalaringiz (Leitner Quti {selectedWord.box || 1})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>To'g'ri javoblar:</span>
                  <span style={{ fontWeight: 700, color: 'var(--success)' }}>{selectedWord.correctCount || 0} marta</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Noto'g'ri javoblar:</span>
                  <span style={{ fontWeight: 700, color: 'var(--danger)' }}>{selectedWord.incorrectCount || 0} marta</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Keyingi takrorlash:</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    {new Date(selectedWord.nextReviewDate).toLocaleDateString('uz-UZ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Pronunciation Practice Button */}
            <button
              onClick={() => {
                const target = selectedWord;
                setActiveModal(null);
                setPronounceWord(target);
              }}
              className="btn-press"
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-gradient)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '10px',
                boxShadow: 'var(--shadow-primary)',
                cursor: 'pointer'
              }}
            >
              <Mic size={18} /> 🎙️ AI Talaffuz mashqini boshlash
            </button>

            {/* Action buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={() => openEdit(selectedWord)}
                style={{
                  padding: '13px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Edit3 size={16} /> Tahrirlash
              </button>
              <button
                onClick={() => setWordToDelete(selectedWord)}
                style={{
                  padding: '13px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--danger-light)',
                  color: 'var(--danger)',
                  fontWeight: 700,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Trash2 size={16} /> O'chirish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. TAHRIRLASH (EDIT WORD) MODAL */}
      {activeModal === 'edit' && selectedWord && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div 
            className="animate-slide-up"
            style={{
              width: '100%',
              maxWidth: '480px',
              background: 'var(--bg-surface)',
              borderTopLeftRadius: 'var(--radius-xl)',
              borderTopRightRadius: 'var(--radius-xl)',
              padding: '24px 20px 32px 20px'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>
              So'zni tahrirlash
            </h3>

            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>Inglizcha so'z</label>
                <input
                  type="text"
                  value={editEnglish}
                  onChange={(e) => setEditEnglish(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>O'zbekcha tarjima</label>
                <input
                  type="text"
                  value={editUzbek}
                  onChange={(e) => setEditUzbek(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>Misol gap</label>
                <input
                  type="text"
                  value={editExample}
                  onChange={(e) => setEditExample(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>Izoh</label>
                <input
                  type="text"
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>Teg (Mavzu, masalan #ielts, #ish)</label>
                <input
                  type="text"
                  placeholder="#ielts"
                  value={editTag}
                  onChange={(e) => setEditTag(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setWordToDelete(selectedWord)}
                  style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--danger-light)', color: 'var(--danger)', fontWeight: 700, fontSize: '14px' }}
                >
                  O'chirish
                </button>
                <button
                  type="submit"
                  style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--primary-gradient)', color: '#FFFFFF', fontWeight: 700, fontSize: '14px' }}
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. In-App Delete Confirmation Modal (Replaces window.confirm) */}
      {wordToDelete && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            maxWidth: '400px',
            width: '100%',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--border-subtle)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'var(--danger-light)',
              color: 'var(--danger)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <Trash2 size={26} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>
              So'zni o'chirish
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
              Haqiqatdan ham <strong>"{wordToDelete.word}"</strong> so'zini lug'atingizdan o'chirmoqchimisiz?
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setWordToDelete(null)}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '14px'
                }}
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--danger)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '14px',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
                }}
              >
                Ha, o'chirish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backup & Export/Import Modal */}
      <BackupModal
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
      />

      {/* AI Pronunciation Modal */}
      <PronunciationModal
        isOpen={!!pronounceWord}
        onClose={() => setPronounceWord(null)}
        word={pronounceWord}
      />

    </div>
  );
};

