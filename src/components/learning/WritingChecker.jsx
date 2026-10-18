import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { aiWritingService } from '../../services/aiService';
import { 
  ArrowLeft, PenTool, Sparkles, AlertCircle, ChevronRight, 
  Key, Plus, ExternalLink, Camera, Clock, Upload, Trash2, FileText, Check 
} from 'lucide-react';

export const WritingChecker = ({ onBack }) => {
  const { words, addWord, addCoins, showToast } = useApp();

  // Screens: 'hub' | 'editor' | 'full_exam' | 'custom_editor' | 'loading' | 'result'
  const [screen, setScreen] = useState('hub');
  const [selectedTask, setSelectedTask] = useState(null);
  const [essayText, setEssayText] = useState('');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('vocab_ai_api_key') || '');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  // Full Exam state
  const [fullExamTab, setFullExamTab] = useState('1.1'); // '1.1' | '1.2' | '2'
  const [fullExamData, setFullExamData] = useState({ '1.1': '', '1.2': '', '2': '' });
  const [fullExamTimer, setFullExamTimer] = useState(3600); // 60 minutes = 3600s

  // Custom Text & Photo Upload state
  const [customPrompt, setCustomPrompt] = useState('');
  const [customText, setCustomText] = useState('');
  const [customImage, setCustomImage] = useState(null); // { base64, mimeType, name, size }
  const fileInputRef = useRef(null);

  // Dynamic evaluation result
  const [evalResult, setEvalResult] = useState(null);

  // History from localStorage
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('vocab_writing_history') || '[]');
    } catch {
      return [];
    }
  });

  // Standard Multi-level Exam Prompts
  const task11Def = {
    id: '1.1_exam',
    taskNumber: '1.1',
    title: '1.1 Exam',
    subtitle: 'CEFR Task 1.1: Qisqa Informal Xat / Xabar',
    badge: '~50 so\'z',
    minWords: 50,
    maxWords: 80,
    prompt: 'Write a short informal message to your friend inviting them to spend the weekend together and explaining what activities you will do. (Around 50 words)'
  };

  const task12Def = {
    id: '1.2_exam',
    taskNumber: '1.2',
    title: '1.2 Exam',
    subtitle: 'CEFR Task 1.2: Formal / Semi-formal Xat yoki Email',
    badge: '120–180 so\'z',
    minWords: 120,
    maxWords: 180,
    prompt: 'You recently enrolled in an educational course but faced some technical difficulties. Write a letter to the course coordinator explaining the situation and asking for a resolution. (120-180 words)'
  };

  const task2Def = {
    id: 'task_2_exam',
    taskNumber: '2',
    title: 'Task 2 Exam',
    subtitle: 'CEFR Task 2: Esse / Insho (Opinion / Discussion)',
    badge: '180–200 so\'z',
    minWords: 180,
    maxWords: 200,
    prompt: 'Some people believe that university education should be completely free for everyone, while others argue that students should pay tuition fees. Discuss both views and give your opinion. (180-200 words)'
  };

  // Full Exam 60-minute countdown timer
  useEffect(() => {
    if (screen !== 'full_exam') return;
    const interval = setInterval(() => {
      setFullExamTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          showToast('Vaqt tugadi! 60 daqiqalik imtihon vaqti yakunlandi.', 'info');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [screen, showToast]);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Word counter helpers
  const countWords = (text) => (text || '').trim().split(/\s+/).filter(Boolean).length;
  const wordCount = countWords(essayText);

  // 1. Start Single Task (1.1, 1.2, or Task 2)
  const handleStartSingleTask = (task) => {
    setSelectedTask(task);
    setEssayText('');
    setScreen('editor');
  };

  // 2. Start Full Exam
  const handleStartFullExam = () => {
    setFullExamData({ '1.1': '', '1.2': '', '2': '' });
    setFullExamTab('1.1');
    setFullExamTimer(3600); // 60 mins
    setScreen('full_exam');
  };

  // 3. Start Custom Text / Photo Upload
  const handleStartCustom = () => {
    setCustomPrompt('');
    setCustomText('');
    setCustomImage(null);
    setScreen('custom_editor');
  };

  // Handle Photo File selection
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Faqat rasm fayllari qabul qilinadi (JPG, PNG, WEBP)', 'error');
      return;
    }

    if (file.size > 6 * 1024 * 1024) {
      showToast('Rasm hajmi juda katta (maksimal 6MB)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCustomImage({
        base64: reader.result,
        mimeType: file.type,
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB'
      });
      showToast('Insho rasmi yuklandi!', 'success');
    };
    reader.readAsDataURL(file);
  };

  // Submit Single Task
  const handleSubmitSingleTask = async () => {
    if (wordCount < 10) {
      showToast('Iltimos, tekshirish uchun ko\'proq matn yozing (kamida 10 so\'z)', 'error');
      return;
    }

    setScreen('loading');

    try {
      const resultData = await aiWritingService.evaluateEssay({
        task: selectedTask,
        essayText,
        userGoal: 'cefr',
        apiKey
      });

      resultData.sampleSnippet = essayText.slice(0, 120) + (essayText.length > 120 ? '...' : '');
      setEvalResult(resultData);

      const updatedHistory = [resultData, ...history.filter(h => h.id !== resultData.id)];
      setHistory(updatedHistory);
      localStorage.setItem('vocab_writing_history', JSON.stringify(updatedHistory));

      setScreen('result');
      addCoins(15, `${selectedTask.title} tekshirildi (+15 coin)`);
    } catch (err) {
      console.error('Task check error:', err);
      showToast('Tahlil qilishda xatolik yuz berdi.', 'error');
      setScreen('editor');
    }
  };

  // Submit Full Exam
  const handleSubmitFullExam = async () => {
    const w11 = countWords(fullExamData['1.1']);
    const w12 = countWords(fullExamData['1.2']);
    const w2 = countWords(fullExamData['2']);

    if (w11 < 10 && w12 < 10 && w2 < 10) {
      showToast('Iltimos, tekshirish uchun kamida bitta topshiriqni yozing', 'error');
      return;
    }

    setScreen('loading');

    try {
      const resultData = await aiWritingService.evaluateFullExam({
        task11Text: fullExamData['1.1'],
        task12Text: fullExamData['1.2'],
        task2Text: fullExamData['2'],
        apiKey
      });

      resultData.sampleSnippet = `1.1: ${w11} so'z • 1.2: ${w12} so'z • Task 2: ${w2} so'z`;
      setEvalResult(resultData);

      const updatedHistory = [resultData, ...history.filter(h => h.id !== resultData.id)];
      setHistory(updatedHistory);
      localStorage.setItem('vocab_writing_history', JSON.stringify(updatedHistory));

      setScreen('result');
      addCoins(35, 'Full Exam imtihoni topshirildi (+35 coin)');
    } catch (err) {
      console.error('Full exam check error:', err);
      showToast('To\'liq imtihonni tahlil qilishda xatolik yuz berdi.', 'error');
      setScreen('full_exam');
    }
  };

  // Submit Custom Text / Photo
  const handleSubmitCustom = async () => {
    const hasText = countWords(customText) >= 10;
    const hasImage = !!customImage?.base64;

    if (!hasText && !hasImage) {
      showToast('Iltimos, matn yozing yoki insho rasmini yuklang (kamida 10 so\'z)', 'error');
      return;
    }

    setScreen('loading');

    try {
      const customTask = {
        id: 'custom_writing',
        title: customPrompt.trim() ? customPrompt.trim() : 'Erkin Yozma Ish',
        prompt: customPrompt.trim() || 'Custom writing / Handwritten essay analysis',
        minWords: 50,
        maxWords: 200
      };

      const resultData = await aiWritingService.evaluateEssay({
        task: customTask,
        essayText: customText,
        imageBase64: customImage?.base64,
        imageMimeType: customImage?.mimeType,
        userGoal: 'cefr',
        apiKey
      });

      resultData.sampleSnippet = customText.slice(0, 120) || 'Daftardagi rasm orqali tahlil qilindi';
      setEvalResult(resultData);

      const updatedHistory = [resultData, ...history.filter(h => h.id !== resultData.id)];
      setHistory(updatedHistory);
      localStorage.setItem('vocab_writing_history', JSON.stringify(updatedHistory));

      setScreen('result');
      addCoins(15, 'Erkin yozma ish tekshirildi (+15 coin)');
    } catch (err) {
      console.error('Custom check error:', err);
      showToast(err.message || 'Tahlil qilishda xatolik yuz berdi.', 'error');
      setScreen('custom_editor');
    }
  };

  // Add individual recommended word to vocab with duplicate check
  const handleAddWordToVocab = (rec) => {
    if (!rec || !rec.advanced) return;
    const exists = (words || []).some(w => w.word.toLowerCase().trim() === rec.advanced.toLowerCase().trim());
    if (exists) {
      showToast(`"${rec.advanced}" allaqachon lug'atingizda bor`, 'info');
      return;
    }
    addWord({
      word: rec.advanced,
      translation: rec.translation,
      example: rec.example || '',
      tag: '#WritingC1',
      note: `Writing insho tahlilidan qo'shildi (${rec.basic ? `"${rec.basic}" o'rniga` : 'Tavsiya'})`
    });
  };

  return (
    <div style={{ padding: '20px', minHeight: '85vh', position: 'relative' }}>
      
      {/* 1. HUB SCREEN (Exactly 5 sections + History) */}
      {screen === 'hub' && (
        <div className="animate-fade">
          {/* Top Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <button
              onClick={onBack}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}
            >
              <ArrowLeft size={20} /> Orqaga
            </button>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
              AI Writing Checker
            </h2>
            <button
              onClick={() => setShowApiKeyModal(true)}
              title="AI API Kalit sozlamalari"
              style={{ padding: '6px', color: apiKey ? 'var(--success)' : 'var(--text-tertiary)' }}
            >
              <Key size={18} />
            </button>
          </div>

          {/* Section: 5 Asosiy Bo'lim */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '14px' }}>
              IMTIHON BO'LIMINI TANLANG (CEFR MULTI-LEVEL)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* 1. Full Exam Card */}
              <div
                onClick={handleStartFullExam}
                style={{
                  padding: '18px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.12) 100%)',
                  border: '2px solid rgba(99, 102, 241, 0.4)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--primary-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    flexShrink: 0
                  }}>
                    <Sparkles size={22} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                        Full Exam
                      </span>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--primary)',
                        color: '#FFFFFF',
                        fontSize: '10px',
                        fontWeight: 800
                      }}>
                        75 ball • 60 daqiqa
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      To'liq imtihon: Task 1.1 + Task 1.2 + Task 2
                    </div>
                  </div>
                </div>
                <ChevronRight size={20} color="var(--primary)" />
              </div>

              {/* 2. 1.1 Exam Card */}
              <div
                onClick={() => handleStartSingleTask(task11Def)}
                style={{
                  padding: '16px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface)',
                  border: '1.5px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(59, 130, 246, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563EB',
                    flexShrink: 0
                  }}>
                    <PenTool size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                        1.1 Exam
                      </span>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--primary-100)',
                        color: 'var(--primary)',
                        fontSize: '10px',
                        fontWeight: 800
                      }}>
                        ~50 so'z
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Qisqa Informal Xat yoki Xabar
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} color="var(--primary)" />
              </div>

              {/* 3. 1.2 Exam Card */}
              <div
                onClick={() => handleStartSingleTask(task12Def)}
                style={{
                  padding: '16px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface)',
                  border: '1.5px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(16, 185, 129, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10B981',
                    flexShrink: 0
                  }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                        1.2 Exam
                      </span>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--primary-100)',
                        color: 'var(--primary)',
                        fontSize: '10px',
                        fontWeight: 800
                      }}>
                        120–180 so'z
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Formal / Semi-formal Xat yoki Email
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} color="var(--primary)" />
              </div>

              {/* 4. Task 2 Exam Card */}
              <div
                onClick={() => handleStartSingleTask(task2Def)}
                style={{
                  padding: '16px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface)',
                  border: '1.5px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(245, 158, 11, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F59E0B',
                    flexShrink: 0
                  }}>
                    <PenTool size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                        Task 2 Exam
                      </span>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--primary-100)',
                        color: 'var(--primary)',
                        fontSize: '10px',
                        fontWeight: 800
                      }}>
                        180–200 so'z
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Esse / Insho (Opinion / Discussion)
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} color="var(--primary)" />
              </div>

              {/* 5. Custom Text / Photo Upload Card */}
              <div
                onClick={handleStartCustom}
                style={{
                  padding: '16px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface)',
                  border: '1.5px dashed var(--primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(168, 85, 247, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#A855F7',
                    flexShrink: 0
                  }}>
                    <Camera size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                        Erkin Matn / Rasm Yuklash
                      </span>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(168, 85, 247, 0.15)',
                        color: '#A855F7',
                        fontSize: '10px',
                        fontWeight: 800
                      }}>
                        Matn yoki Rasm
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      O'zingiz yozgan matn yoki daftardagi insho rasmi
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} color="var(--primary)" />
              </div>

            </div>
          </div>

          {/* Section: Yozish tarixi */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '10px' }}>
              YOZISH TARIXI
            </div>

            {history.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '32px 16px',
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                border: '1.5px dashed var(--border-subtle)',
                color: 'var(--text-tertiary)'
              }}>
                <PenTool size={32} style={{ margin: '0 auto 8px auto', opacity: 0.5 }} />
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Hali birorta yozma ish topshirmagansiz
                </div>
                <div style={{ fontSize: '12px', marginTop: '4px' }}>
                  Yuqoridagi 5 ta bo'limdan birini tanlang va inshoingizni tekshirtiring
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {history.map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setEvalResult(item);
                      setScreen('result');
                    }}
                    title="Natijani qayta ko'rish"
                    style={{
                      padding: '14px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                        {item.date} {item.isAiPowered ? '• ⚡ Gemini AI' : '• 📊 Standart'}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--primary-100)',
                        color: 'var(--primary)',
                        fontSize: '11px',
                        fontWeight: 800
                      }}>
                        {item.badge}
                      </span>
                      <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                        {item.score}
                      </strong>
                      <ChevronRight size={14} color="var(--text-tertiary)" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. SINGLE TASK EDITOR SCREEN (1.1, 1.2, or Task 2) */}
      {screen === 'editor' && selectedTask && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'space-between' }}>
          <div>
            {/* Top Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <button
                onClick={() => setScreen('hub')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}
              >
                <ArrowLeft size={20} />
              </button>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
                {selectedTask.title}
              </h2>
            </div>

            {/* Prompt Box */}
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-50)',
              border: '1px solid var(--primary-200)',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px', marginBottom: '6px' }}>
                MAVZU TOPSHIRIG'I
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {selectedTask.prompt}
              </p>
            </div>

            {/* Textarea Editor */}
            <textarea
              rows={12}
              placeholder="Inshongizni shu yerga yozing..."
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-subtle)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                lineHeight: 1.6,
                resize: 'vertical'
              }}
            />

            {/* Word count footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>
                {selectedTask.id === '1.1_exam'
                  ? "Standart: ~50 so'z atrofida (kamida 40-50)"
                  : `Standart: ${selectedTask.minWords}–${selectedTask.maxWords} so'z oralig'i`}
              </span>
              <strong style={{
                color: (selectedTask.id === '1.1_exam' ? wordCount >= 40 : wordCount >= selectedTask.minWords)
                  ? 'var(--success)'
                  : 'var(--primary)'
              }}>
                {wordCount} ta so'z
              </strong>
            </div>
          </div>

          <button
            onClick={handleSubmitSingleTask}
            style={{
              marginTop: '20px',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: 'var(--shadow-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            Tekshirish (AI Tahlil) <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* 3. FULL EXAM SCREEN (Task 1.1 + 1.2 + Task 2 with 60-min timer) */}
      {screen === 'full_exam' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', minHeight: '82vh', justifyContent: 'space-between' }}>
          <div>
            {/* Top Bar with Timer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <button
                onClick={() => setScreen('hub')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}
              >
                <ArrowLeft size={20} /> Orqaga
              </button>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                background: fullExamTimer < 600 ? 'rgba(239, 68, 68, 0.12)' : 'var(--primary-100)',
                color: fullExamTimer < 600 ? 'var(--danger)' : 'var(--primary)',
                fontWeight: 800,
                fontSize: '14px'
              }}>
                <Clock size={16} /> {formatTimer(fullExamTimer)}
              </div>
            </div>

            {/* Task Stepper Tabs */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-subtle)',
              padding: '4px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '16px',
              gap: '4px'
            }}>
              {[
                { key: '1.1', label: 'Task 1.1 (~50w)', count: countWords(fullExamData['1.1']) },
                { key: '1.2', label: 'Task 1.2 (120-180w)', count: countWords(fullExamData['1.2']) },
                { key: '2', label: 'Task 2 (180-200w)', count: countWords(fullExamData['2']) }
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => setFullExamTab(t.key)}
                  style={{
                    flex: 1,
                    padding: '8px 6px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: fullExamTab === t.key ? 'var(--bg-surface)' : 'transparent',
                    color: fullExamTab === t.key ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: fullExamTab === t.key ? 800 : 600,
                    fontSize: '12px',
                    boxShadow: fullExamTab === t.key ? 'var(--shadow-sm)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  {t.label} {t.count > 0 && `(${t.count})`}
                </button>
              ))}
            </div>

            {/* Active Task Prompt */}
            <div style={{
              padding: '14px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-50)',
              border: '1px solid var(--primary-200)',
              marginBottom: '14px'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px', marginBottom: '4px' }}>
                {fullExamTab === '1.1' && "TASK 1.1: INFORMAL XAT (KAMIDA 50 SO'Z)"}
                {fullExamTab === '1.2' && "TASK 1.2: FORMAL XAT / EMAIL (120–180 SO'Z)"}
                {fullExamTab === '2' && "TASK 2: ESSE / INSHO (180–200 SO'Z)"}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                {fullExamTab === '1.1' && task11Def.prompt}
                {fullExamTab === '1.2' && task12Def.prompt}
                {fullExamTab === '2' && task2Def.prompt}
              </p>
            </div>

            {/* Active Task Textarea */}
            <textarea
              rows={11}
              placeholder={`${fullExamTab === '1.1' ? 'Task 1.1' : fullExamTab === '1.2' ? 'Task 1.2' : 'Task 2'} matnini shu yerga yozing...`}
              value={fullExamData[fullExamTab]}
              onChange={(e) => setFullExamData({ ...fullExamData, [fullExamTab]: e.target.value })}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-subtle)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                lineHeight: 1.6,
                resize: 'vertical'
              }}
            />

            {/* Word count status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-tertiary)' }}>
                Jami yozildi: {countWords(fullExamData['1.1'])} + {countWords(fullExamData['1.2'])} + {countWords(fullExamData['2'])} so'z
              </span>
              <strong style={{ color: 'var(--primary)' }}>
                Ushbu bo'limda: {countWords(fullExamData[fullExamTab])} so'z
              </strong>
            </div>
          </div>

          <button
            onClick={handleSubmitFullExam}
            style={{
              marginTop: '20px',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: 'var(--shadow-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            Imtihonni Yakunlash va Tekshirish (AI) <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* 4. CUSTOM TEXT / PHOTO UPLOAD SCREEN */}
      {screen === 'custom_editor' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'space-between' }}>
          <div>
            {/* Top Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <button
                onClick={() => setScreen('hub')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}
              >
                <ArrowLeft size={20} />
              </button>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
                Erkin Matn / Rasm Yuklash
              </h2>
            </div>

            {/* Optional Topic / Prompt Input */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Mavzu yoki savol (ixtiyoriy):
              </label>
              <input
                type="text"
                placeholder="Masalan: Should smartphones be banned in schools?"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  fontSize: '13px'
                }}
              />
            </div>

            {/* Image Upload Zone */}
            <div style={{ marginBottom: '14px' }}>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
              />

              {!customImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px dashed var(--primary)',
                    background: 'rgba(99, 102, 241, 0.04)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    fontSize: '13px'
                  }}
                >
                  <Camera size={20} />
                  Daftardagi insho rasmini yuklash (Kamera / Galereya)
                </div>
              ) : (
                <div style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface)',
                  border: '1.5px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={customImage.base64}
                      alt="Uploaded essay"
                      style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                    />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {customImage.name}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        {customImage.size} • Rasm tayyor
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCustomImage(null)}
                    style={{ padding: '8px', color: 'var(--danger)', borderRadius: 'var(--radius-sm)' }}
                    title="Rasmni o'chirish"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Textarea */}
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Yoki inshoni matn ko'rinishida yozing / nusxa ko'chiring:
            </label>
            <textarea
              rows={9}
              placeholder="Inshongizni shu yerga yozing (agar rasm yuklagan bo'lsangiz, bo'sh qoldirishingiz mumkin)..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-subtle)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                lineHeight: 1.5,
                resize: 'vertical'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px', fontSize: '12px', color: 'var(--text-tertiary)' }}>
              {countWords(customText)} ta so'z
            </div>
          </div>

          <button
            onClick={handleSubmitCustom}
            style={{
              marginTop: '16px',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: 'var(--shadow-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            AI bilan tekshirish <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* 5. LOADING SPINNER OVERLAY */}
      {screen === 'loading' && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }}>
          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: '36px 24px',
            textAlign: 'center',
            maxWidth: '340px',
            width: '100%',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--primary-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              animation: 'pulseGlow 2s infinite'
            }}>
              <Sparkles size={32} color="var(--primary)" />
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
              Yozuvingiz tekshirilmoqda...
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              AI matn yoki rasmdagi yozuvni o'qib, CEFR 75 ballik mezonlar bo'yicha tahlil qilmoqda.
            </p>
          </div>
        </div>
      )}

      {/* 6. RESULT SCREEN */}
      {screen === 'result' && (
        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Top Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => setScreen('hub')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}
            >
              <ArrowLeft size={20} /> Orqaga
            </button>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: evalResult?.isAiPowered ? 'rgba(16, 185, 129, 0.15)' : 'var(--primary-100)',
              color: evalResult?.isAiPowered ? '#10B981' : 'var(--primary)',
              fontSize: '11px',
              fontWeight: 800
            }}>
              {evalResult?.isAiPowered ? <><Sparkles size={13} /> Gemini AI Tahlili</> : '📊 CEFR Standart Tahlili'}
            </span>
          </div>

          {/* Overall Score Card */}
          <div style={{
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--border-subtle)',
            padding: '24px 20px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)'
          }}>
            <span style={{
              padding: '5px 14px',
              borderRadius: 'var(--radius-full)',
              background: evalResult?.badge?.includes('C1') 
                ? 'rgba(16, 185, 129, 0.15)' 
                : evalResult?.badge?.includes('B2') 
                  ? 'var(--primary-100)' 
                  : evalResult?.badge?.includes('B1')
                    ? 'rgba(245, 158, 11, 0.15)'
                    : 'rgba(239, 68, 68, 0.15)',
              color: evalResult?.badge?.includes('C1') 
                ? 'var(--success)' 
                : evalResult?.badge?.includes('B2') 
                  ? 'var(--primary)' 
                  : evalResult?.badge?.includes('B1')
                    ? '#F59E0B'
                    : 'var(--danger)',
              fontSize: '12px',
              fontWeight: 800
            }}>
              {evalResult?.badge || 'CEFR B2 — Upper-Intermediate'}
            </span>
            <div style={{ fontSize: '38px', fontWeight: 900, color: 'var(--text-primary)', margin: '10px 0 2px 0' }}>
              {evalResult?.score || '56 / 75'}
            </div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px' }}>
              RASMIY MULTI-LEVEL (75 BALLIK TIZIM)
            </div>

            {/* Official Multi-level Scale breakdown bar */}
            <div style={{
              marginTop: '16px',
              padding: '8px 10px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-subtle)',
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              fontWeight: 700,
              flexWrap: 'wrap',
              gap: '4px'
            }}>
              <span style={{ color: evalResult?.badge?.includes('C1') ? 'var(--success)' : 'var(--text-tertiary)' }}>
                C1 (65-75)
              </span>
              <span style={{ color: 'var(--border-subtle)' }}>•</span>
              <span style={{ color: evalResult?.badge?.includes('B2') ? 'var(--primary)' : 'var(--text-tertiary)' }}>
                B2 (51-64)
              </span>
              <span style={{ color: 'var(--border-subtle)' }}>•</span>
              <span style={{ color: evalResult?.badge?.includes('B1') ? '#F59E0B' : 'var(--text-tertiary)' }}>
                B1 (32-50)
              </span>
              <span style={{ color: 'var(--border-subtle)' }}>•</span>
              <span style={{ color: evalResult?.badge?.includes('A') ? 'var(--danger)' : 'var(--text-tertiary)' }}>
                A1-A2 (&lt;32)
              </span>
            </div>
          </div>

          {/* If Full Exam: Show section-by-section points */}
          {evalResult?.isFullExam && evalResult?.fullExamBreakdown && (
            <div style={{
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              padding: '18px'
            }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '12px' }}>
                BO'LIMLAR BO'YICHA TO'PLANGAN BALLAR
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {evalResult.fullExamBreakdown.map((item, idx) => (
                  <div key={idx} style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.label}
                    </span>
                    <strong style={{ fontSize: '14px', color: 'var(--primary)' }}>
                      {item.score}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transcribed text if photo was uploaded */}
          {evalResult?.transcribedText && (
            <div style={{
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              padding: '18px'
            }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '8px' }}>
                RASMDAN O'QILGAN MATN (TRANSCRIBED OCR)
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, fontStyle: 'italic' }}>
                "{evalResult.transcribedText}"
              </p>
            </div>
          )}

          {/* Mezonlar bo'yicha tahlil (4 criteria with progress bars and feedback) */}
          <div style={{
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px' }}>
              MEZONLAR BO'YICHA TAHLIL
            </div>

            {(evalResult?.criteria || []).map((crit, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{crit.label}</span>
                  <strong style={{ color: 'var(--primary)' }}>{crit.score}</strong>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'var(--bg-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${crit.percent}%`, height: '100%', background: 'var(--primary)', borderRadius: '3px', transition: 'width 0.4s ease' }} />
                </div>
                {crit.feedback && (
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px', lineHeight: 1.4 }}>
                    {crit.feedback}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Grammatika va Uslubiy tuzatishlar (AI Corrections) */}
          {evalResult?.corrections && evalResult.corrections.length > 0 && (
            <div style={{
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              padding: '18px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '12px' }}>
                <AlertCircle size={15} color="#EF4444" /> MATNDAGI GRAMMATIK TUZATISHLAR
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {evalResult.corrections.map((corr, idx) => (
                  <div key={idx} style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <div style={{ fontSize: '13px', color: 'var(--danger)', textDecoration: 'line-through', fontWeight: 600 }}>
                      "{corr.original}"
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--success)', fontWeight: 800 }}>
                      ✓ "{corr.corrected}"
                    </div>
                    {corr.explanation && (
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {corr.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Uslubiy va Lug'at tavsiyalari */}
          <div style={{
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            padding: '18px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '12px' }}>
              LUG'ATNI BOYITISH TAVSIYALARI
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {evalResult?.recommendations?.map((rec, idx) => (
                <div key={idx} style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--danger)', fontWeight: 700 }}>
                        Matnda: "{rec.basic}"
                      </span>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--success)', marginTop: '2px' }}>
                        → {rec.advanced} <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>({rec.translation})</span>
                      </div>
                    </div>
                    {(() => {
                      const isAdded = (words || []).some(w => w.word.toLowerCase().trim() === (rec.advanced || '').toLowerCase().trim());
                      return (
                        <button
                          onClick={() => handleAddWordToVocab(rec)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 'var(--radius-full)',
                            background: isAdded ? 'var(--success-light)' : 'var(--primary-gradient)',
                            color: isAdded ? 'var(--success-dark)' : '#FFFFFF',
                            border: isAdded ? '1px solid var(--success)' : 'none',
                            fontSize: '11px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          {isAdded ? <Check size={12} /> : <Plus size={12} />}
                          {isAdded ? "Lug'atda bor" : "Lug'atga"}
                        </button>
                      );
                    })()}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                    "{rec.example}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
            <button
              onClick={() => setScreen('hub')}
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
              Yangi topshiriq
            </button>
          </div>
        </div>
      )}

      {/* AI API Key Modal */}
      {showApiKeyModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            width: '100%',
            maxWidth: '380px',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>
              Google Gemini 1.5 API Kaliti
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
              Gemini 1.5 Flash mutlaqo <strong>bepul</strong> (kuniga 1500 ta so'rov, bank kartasi talab qilinmaydi). Daftarga yozilgan insholarni rasm orqali OCR o'qish uchun zarur.
            </p>

            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#2563EB',
                fontSize: '12px',
                fontWeight: 700,
                marginBottom: '16px',
                textDecoration: 'none'
              }}
            >
              Bepul API Kalit olish (AI Studio) <ExternalLink size={14} />
            </a>

            <input
              type="password"
              placeholder="AI API kalitini kiriting (AIza...)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-subtle)',
                marginBottom: '16px',
                fontSize: '13px'
              }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: apiKey ? '1fr 1fr 1fr' : '1fr 1fr', gap: '8px' }}>
              <button
                onClick={() => setShowApiKeyModal(false)}
                style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', fontWeight: 600, fontSize: '13px' }}
              >
                Bekor qilish
              </button>
              {apiKey && (
                <button
                  onClick={() => {
                    localStorage.removeItem('vocab_ai_api_key');
                    setApiKey('');
                    showToast('API kalit o\'chirildi (standart rejim)', 'info');
                    setShowApiKeyModal(false);
                  }}
                  style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', fontWeight: 700, fontSize: '13px' }}
                >
                  O'chirish
                </button>
              )}
              <button
                onClick={() => {
                  localStorage.setItem('vocab_ai_api_key', apiKey.trim());
                  showToast('API kalit saqlandi!', 'success');
                  setShowApiKeyModal(false);
                }}
                style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'var(--primary-gradient)', color: '#FFFFFF', fontWeight: 700, fontSize: '13px' }}
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
