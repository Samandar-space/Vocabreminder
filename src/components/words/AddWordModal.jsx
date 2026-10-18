import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { lookupEnglishWord } from '../../services/dictionaryService';
import { speechService } from '../../services/speech';
import { X, Sparkles, Plus, Zap, Volume2, Loader2, Check } from 'lucide-react';

export const AddWordModal = ({ isOpen, onClose }) => {
  const { words, addWord, bulkAddWords, importWords, showToast } = useApp();

  // Mode: 'single' | 'bulk'
  const [mode, setMode] = useState('single');

  // Single word state
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [transcription, setTranscription] = useState('');
  const [example, setExample] = useState('');
  const [note, setNote] = useState('');
  const [tag, setTag] = useState('');
  const [alternatives, setAlternatives] = useState([]);

  // Duplicate detection
  const existingWord = word.trim() 
    ? words.find(w => (w.word || '').toLowerCase() === word.trim().toLowerCase()) 
    : null;

  // Loading & Audio status
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Bulk add state
  const [bulkText, setBulkText] = useState('');
  const [isBulkLoading, setIsBulkLoading] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 });

  if (!isOpen) return null;

  // Single submit
  const handleSingleSubmit = (e) => {
    e.preventDefault();
    if (!word.trim() || !translation.trim()) {
      showToast('So\'z va tarjimani kiritish shart!', 'error');
      return;
    }
    if (existingWord) {
      showToast(`Ogohlantirish: "${word.trim()}" oldin ${existingWord.box}-qutiga kiritilgan edi`, 'info');
    }
    addWord({ 
      word, 
      translation, 
      transcription, 
      example, 
      note, 
      tag 
    });
    
    // Reset form
    setWord('');
    setTranslation('');
    setTranscription('');
    setExample('');
    setNote('');
    setTag('');
    setAlternatives([]);
    onClose();
  };

  // Bulk submit
  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    const count = await bulkAddWords(bulkText);
    if (count > 0) {
      setBulkText('');
      onClose();
    } else {
      showToast('Iltimos, so\'zlarni "so\'z - tarjima" ko\'rinishida yozing yoki "Avto-tarjima" tugmasini bosing', 'error');
    }
  };

  // Bulk Smart Auto-Translate & Add
  const handleBulkSmartTranslate = async () => {
    if (!bulkText.trim()) {
      showToast('Iltimos, avval so\'zlar ro\'yxatini kiriting', 'info');
      return;
    }

    const lines = bulkText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return;

    setIsBulkLoading(true);
    setBulkProgress({ current: 0, total: lines.length });

    const newWords = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      setBulkProgress({ current: i + 1, total: lines.length });

      // If line already has delimiter like apple - olma
      const parts = line.split(/[-–—:=,\t]/);
      if (parts.length >= 2 && parts[0].trim() && parts[1].trim()) {
        const wordText = parts[0].trim();
        const transText = parts.slice(1).join(' ').trim();
        newWords.push({
          id: Date.now().toString() + Math.random().toString().slice(2, 6),
          word: wordText,
          translation: transText,
          transcription: `/${wordText.toLowerCase()}/`,
          example: '',
          note: 'Ommaviy kiritilgan',
          box: 1,
          nextReviewDate: new Date().toISOString(),
          reviewCount: 0,
          correctCount: 0,
          incorrectCount: 0,
          isFavorite: false,
          createdAt: new Date().toISOString()
        });
      } else {
        // Line is just an English word -> auto fetch translation!
        const clean = line.trim();
        try {
          const res = await lookupEnglishWord(clean);
          newWords.push({
            id: Date.now().toString() + Math.random().toString().slice(2, 6),
            word: res.word,
            translation: res.translation || clean,
            transcription: res.transcription || `/${clean}/`,
            example: res.example || '',
            note: res.partOfSpeech || 'Ommaviy kiritilgan',
            tag: res.partOfSpeech ? '#' + res.partOfSpeech.toUpperCase() : '#Kundalik',
            box: 1,
            nextReviewDate: new Date().toISOString(),
            reviewCount: 0,
            correctCount: 0,
            incorrectCount: 0,
            isFavorite: false,
            createdAt: new Date().toISOString()
          });
        } catch {
          newWords.push({
            id: Date.now().toString() + Math.random().toString().slice(2, 6),
            word: clean,
            translation: clean,
            transcription: `/${clean}/`,
            example: '',
            note: 'Ommaviy kiritilgan',
            box: 1,
            nextReviewDate: new Date().toISOString(),
            reviewCount: 0,
            correctCount: 0,
            incorrectCount: 0,
            isFavorite: false,
            createdAt: new Date().toISOString()
          });
        }
      }
    }

    if (newWords.length > 0) {
      await importWords(newWords);
      setBulkText('');
      onClose();
    }
    setIsBulkLoading(false);
  };

  // Smart Auto-Fill via Dictionary Service
  const handleAutoFill = async () => {
    const cleanWord = word.trim();
    if (!cleanWord) {
      showToast('Avval inglizcha so\'zni yozing', 'info');
      return;
    }

    setIsLoading(true);
    try {
      const result = await lookupEnglishWord(cleanWord);
      
      if (result.translation) {
        setTranslation(result.translation);
      }
      if (result.transcription) {
        setTranscription(result.transcription);
      }
      if (result.example) {
        setExample(result.example);
      }
      if (result.partOfSpeech && result.partOfSpeech !== 'general') {
        const posTag = '#' + result.partOfSpeech.toUpperCase();
        setTag(posTag);
        setNote(`${result.partOfSpeech} sifatida qo'llaniladi`);
      } else if (!tag) {
        setTag('#Kundalik');
      }

      if (result.alternatives && result.alternatives.length > 0) {
        setAlternatives(result.alternatives);
      }

      showToast(`"${cleanWord}" ma'lumotlari yuklandi!`, 'success');
      
      // Automatically pronounce the word
      speechService.speak(cleanWord);
    } catch {
      showToast('Avto-to\'ldirishda xatolik yuz berdi', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Listen to English pronunciation
  const handlePlayAudio = () => {
    const cleanWord = word.trim();
    if (!cleanWord) return;
    setIsPlayingAudio(true);
    speechService.speak(cleanWord);
    setTimeout(() => setIsPlayingAudio(false), 1200);
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
          maxWidth: '500px',
          background: 'var(--bg-surface)',
          borderTopLeftRadius: 'var(--radius-xl)',
          borderTopRightRadius: 'var(--radius-xl)',
          padding: '24px 20px 32px 20px',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Yangi so'z qo'shish
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
              Shaxsiy lug'atingiz va Leitner tizimiga kiritish
            </p>
          </div>
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
            {/* Word Input + Audio + Auto-fill */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Inglizcha so'z <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                {/* Auto-fill Button */}
                <button
                  type="button"
                  onClick={handleAutoFill}
                  disabled={isLoading || !word.trim()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: isLoading ? 'var(--text-tertiary)' : 'var(--primary)',
                    background: isLoading ? 'var(--bg-subtle)' : 'var(--primary-50)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--primary-200)',
                    cursor: isLoading || !word.trim() ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={12} className="spin" /> Qidirilmoqda...
                    </>
                  ) : (
                    <>
                      <Sparkles size={12} /> ✨ Aqlli to'ldirish
                    </>
                  )}
                </button>
              </div>

              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Masalan: challenge, achieve, magnificent..."
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && word.trim() && !translation) {
                      e.preventDefault();
                      handleAutoFill();
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 44px 12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--border-subtle)',
                    background: 'var(--bg-subtle)',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}
                />
                {word.trim() && (
                  <button
                    type="button"
                    onClick={handlePlayAudio}
                    title="Talaffuzni eshitish"
                    style={{
                      position: 'absolute',
                      right: '10px',
                      padding: '6px',
                      borderRadius: '50%',
                      background: isPlayingAudio ? 'var(--primary)' : 'var(--bg-surface)',
                      color: isPlayingAudio ? '#FFFFFF' : 'var(--primary)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Volume2 size={16} />
                  </button>
                )}
              </div>

              {/* Duplicate Word Warning Banner */}
              {existingWord && (
                <div style={{
                  marginTop: '8px',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--gold-light)',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  color: 'var(--gold-dark)',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>⚠️ Bu so'z allaqachon lug'atingizda bor ({existingWord.box}-quti): "{existingWord.translation}"</span>
                </div>
              )}
            </div>

            {/* Transcription (IPA) */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Transkripsiya (IPA)
              </label>
              <input
                type="text"
                placeholder="Masalan: /ˈtʃæl.ɪndʒ/"
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  color: 'var(--primary)'
                }}
              />
            </div>

            {/* Translation & Alternatives */}
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
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}
              />

              {/* Clickable Alternative Options Chips */}
              {alternatives.length > 1 && (
                <div style={{ marginTop: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginRight: '6px' }}>
                    Muqobil variantlar:
                  </span>
                  <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {alternatives.map((alt) => (
                      <button
                        key={alt}
                        type="button"
                        onClick={() => setTranslation(alt)}
                        style={{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          background: translation === alt ? 'var(--primary-100)' : 'var(--bg-subtle)',
                          color: translation === alt ? 'var(--primary)' : 'var(--text-secondary)',
                          border: translation === alt ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        {alt}
                        {translation === alt && <Check size={10} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Example Sentence */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Misol gap
              </label>
              <textarea
                rows={2}
                placeholder="Masalan: Every challenge helps us grow."
                value={example}
                onChange={(e) => setExample(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)',
                  fontSize: '13px',
                  lineHeight: 1.4,
                  resize: 'none'
                }}
              />
            </div>

            {/* Note & Tags */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Izoh
                </label>
                <input
                  type="text"
                  placeholder="Ixtiyoriy eslatma"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--border-subtle)',
                    background: 'var(--bg-subtle)',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Teg / Mavzu
                </label>
                <input
                  type="text"
                  placeholder="#IELTS, #B2"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--border-subtle)',
                    background: 'var(--bg-subtle)',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>

            {/* Quick Tag Chips */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['#IELTS', '#Akademik', '#Kundalik', '#Ish', '#B2', '#C1'].map(chip => (
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
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  {chip}
                </button>
              ))}
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
                boxShadow: 'var(--shadow-primary)',
                cursor: 'pointer'
              }}
            >
              Lug'atga qo'shish (+5 coin)
            </button>
          </form>
        )}

        {/* 2. BULK ADD FORM */}
        {mode === 'bulk' && (
          <form onSubmit={handleBulkSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-50)',
              border: '1.5px solid var(--primary-200)',
              fontSize: '12px',
              color: 'var(--primary)',
              lineHeight: 1.5
            }}>
              💡 <strong>2 xil usul:</strong>
              <div style={{ marginTop: '4px' }}>
                1. <strong>Faqat inglizcha so'zlar:</strong> Ro'yxatni qatorma-qator tashlang va <em>«Avtomatik tarjima qilib qo'shish»</em>ni bosing.
              </div>
              <div style={{ marginTop: '2px' }}>
                2. <strong>Tayyor tarjimasi bilan:</strong> <code>apple - olma</code> yoki <code>book : kitob</code> ko'rinishida tashlang.
              </div>
            </div>

            <textarea
              rows={8}
              disabled={isBulkLoading}
              placeholder={`sustainable\nbiodiversity\nperseverance\nconsequence\nfenomenon\n\nyoki:\napple - olma\nbook - kitob`}
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Primary: Auto Translate & Add */}
              <button
                type="button"
                disabled={isBulkLoading || !bulkText.trim()}
                onClick={handleBulkSmartTranslate}
                style={{
                  padding: '15px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--primary-gradient)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '15px',
                  boxShadow: 'var(--shadow-primary)',
                  cursor: isBulkLoading || !bulkText.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: 'none'
                }}
              >
                {isBulkLoading ? (
                  <>
                    <Loader2 size={18} className="spin" /> 
                    Tarjima qilinmoqda: {bulkProgress.current} / {bulkProgress.total}...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} /> ✨ Barchasini avtomatik tarjima qilib qo'shish
                  </>
                )}
              </button>

              {/* Secondary: Instant Add (if translations already provided) */}
              <button
                type="submit"
                disabled={isBulkLoading || !bulkText.trim()}
                style={{
                  padding: '11px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '13px',
                  border: '1px solid var(--border-subtle)',
                  cursor: isBulkLoading || !bulkText.trim() ? 'not-allowed' : 'pointer'
                }}
              >
                Tezkor qo'shish (agar tarjimalari yozilgan bo'lsa)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
