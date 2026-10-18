import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { backupService } from '../../services/backupService';
import { 
  X, Download, Upload, FileText, CheckCircle2, 
  AlertCircle, Table, FileSpreadsheet, ArrowRight 
} from 'lucide-react';

export const BackupModal = ({ isOpen, onClose }) => {
  const { words, user, importWords, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('export'); // 'export' | 'import'
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewWords, setPreviewWords] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [replaceExisting, setReplaceExisting] = useState(false);

  if (!isOpen) return null;

  // Handle Export to JSON
  const handleExportJSON = () => {
    try {
      backupService.exportToJSON(words, user);
      showToast('Lug\'at JSON fayli yuklab olindi!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle Export to CSV
  const handleExportCSV = () => {
    try {
      backupService.exportToCSV(words);
      showToast('Excel/CSV fayli muvaffaqiyatli yaratildi!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle File Selection for Import
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsProcessing(true);

    try {
      const parsed = await backupService.parseImportFile(file);
      setPreviewWords(parsed);
      showToast(`${parsed.length} ta so'z aniqlandi!`, 'info');
    } catch (err) {
      showToast(err.message, 'error');
      setPreviewWords([]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Confirm Import
  const handleConfirmImport = async () => {
    if (previewWords.length === 0) return;

    await importWords(previewWords, replaceExisting);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div 
        className="animate-slide-up"
        style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '440px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Lug'at Zaxirasi
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
              Eksport va Tiklash (Excel & JSON)
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '50%',
              color: 'var(--text-tertiary)',
              background: 'var(--bg-subtle)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          padding: '10px 20px',
          background: 'var(--bg-subtle)',
          gap: '8px'
        }}>
          <button
            onClick={() => setActiveTab('export')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'export' ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === 'export' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: activeTab === 'export' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <Download size={16} /> Eksport (Yuklab olish)
          </button>

          <button
            onClick={() => setActiveTab('import')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'import' ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === 'import' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: activeTab === 'import' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <Upload size={16} /> Import (Tiklash)
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {/* TAB 1: EXPORT */}
          {activeTab === 'export' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-50)',
                color: 'var(--primary)',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={18} />
                <span>Lug'atingizda hozir <strong>{words.length} ta</strong> so'z mavjud.</span>
              </div>

              {/* CSV Button */}
              <button
                onClick={handleExportCSV}
                disabled={words.length === 0}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface)',
                  border: '1.5px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  textAlign: 'left',
                  cursor: words.length === 0 ? 'not-allowed' : 'pointer',
                  opacity: words.length === 0 ? 0.6 : 1,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: '#10B98115',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileSpreadsheet size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Excel / CSV fayli
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    Jadval ko'rinishida qulay o'qish va chop etish
                  </div>
                </div>
                <Download size={18} color="var(--primary)" />
              </button>

              {/* JSON Button */}
              <button
                onClick={handleExportJSON}
                disabled={words.length === 0}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface)',
                  border: '1.5px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  textAlign: 'left',
                  cursor: words.length === 0 ? 'not-allowed' : 'pointer',
                  opacity: words.length === 0 ? 0.6 : 1,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'var(--primary-100)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    To'liq JSON Zaxira (Backup)
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    Barcha Leitner qutilari va statistikalar bilan
                  </div>
                </div>
                <Download size={18} color="var(--primary)" />
              </button>
            </div>
          )}

          {/* TAB 2: IMPORT */}
          {activeTab === 'import' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* File input dropzone */}
              <label style={{
                border: '2px dashed var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px 16px',
                textAlign: 'center',
                cursor: 'pointer',
                background: 'var(--bg-subtle)',
                display: 'block'
              }}>
                <input 
                  type="file" 
                  accept=".json,.csv,.txt" 
                  onChange={handleFileChange}
                  style={{ display: 'none' }} 
                />
                <Upload size={32} color="var(--primary)" style={{ margin: '0 auto 8px auto' }} />
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Faylni tanlang yoki tashlang
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                  JSON, CSV yoki matnli (.txt) fayllar
                </div>
              </label>

              {/* Selected File & Preview */}
              {previewWords.length > 0 && (
                <div style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface)',
                  border: '1.5px solid var(--primary-200)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>
                      Topilgan so'zlar: {previewWords.length} ta
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                      {selectedFile?.name}
                    </span>
                  </div>

                  {/* Sample items */}
                  <div style={{ maxHeight: '100px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {previewWords.slice(0, 5).map((w, idx) => (
                      <div key={idx} style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        • <strong>{w.word}</strong> — {w.translation}
                      </div>
                    ))}
                    {previewWords.length > 5 && (
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                        ...va yana {previewWords.length - 5} ta so'z
                      </div>
                    )}
                  </div>

                  {/* Replace Checkbox */}
                  <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      id="replaceCheck"
                      checked={replaceExisting}
                      onChange={(e) => setReplaceExisting(e.target.checked)}
                      style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                    />
                    <label htmlFor="replaceCheck" style={{ fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                      Mavjud so'zlarni to'liq almashtirish (Tozalash)
                    </label>
                  </div>
                </div>
              )}

              {/* Confirm Import Button */}
              {previewWords.length > 0 && (
                <button
                  onClick={handleConfirmImport}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--primary-gradient)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '14px',
                    boxShadow: 'var(--shadow-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <CheckCircle2 size={18} />
                  {previewWords.length} ta so'zni lug'atga yuklash
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
