import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, Send, CheckCircle2, Copy, ExternalLink, Bot, Sparkles, BookOpen, HelpCircle 
} from 'lucide-react';

export const TelegramConnectModal = ({ isOpen, onClose }) => {
  const { user, showToast } = useApp();
  const [botStatus, setBotStatus] = useState({ configured: false, loading: true });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch('http://localhost:3000/api/telegram/status')
        .then(res => res.json())
        .then(data => setBotStatus({ configured: data.configured, loading: false }))
        .catch(() => setBotStatus({ configured: false, loading: false }));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const botUsername = 'VocabReminderBot';
  const startCommand = `/start ${user?.id || 'guest'}`;

  const handleCopyCommand = () => {
    navigator.clipboard?.writeText(startCommand);
    setCopied(true);
    showToast('Buyruq nusxalandi!', 'success');
    setTimeout(() => setCopied(false), 2000);
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
          maxWidth: '480px',
          boxShadow: 'var(--shadow-xl)',
          border: '1.5px solid var(--border-subtle)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(34, 158, 217, 0.12), rgba(124, 58, 237, 0.08))'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#229ED9',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Send size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Telegram Bot Eslatmalari
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-tertiary)' }}>
                @{botUsername} orqali so'zlarni takrorlang
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

        {/* Content */}
        <div style={{ padding: '24px' }}>
          
          {/* Feature Highlights */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)'
            }}>
              <div style={{ color: '#229ED9' }}><BookOpen size={18} /></div>
              <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                <strong>Kunlik eslatmalar:</strong> Bugun takrorlanishi kerak bo'lgan so'zlar Telegramga yuboriladi.
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)'
            }}>
              <div style={{ color: '#10B981' }}><Sparkles size={18} /></div>
              <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                <strong>Tezkor Viktorina:</strong> Tugmalar yordamida 4 ta variantdan to'g'ri tarjimani topasiz.
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)'
            }}>
              <div style={{ color: '#7C3AED' }}><Bot size={18} /></div>
              <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                <strong>Tezkor so'z qo'shish:</strong> Telegramdan <code>/add apple - olma</code> deb yuborishingiz mumkin.
              </div>
            </div>
          </div>

          {/* Quick Connect Command */}
          <div style={{
            padding: '14px',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px dashed var(--border-subtle)',
            background: 'var(--bg-subtle)',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Ulanish buyrug'i:
            </div>
            <div style={{
              fontFamily: 'monospace',
              fontSize: '15px',
              fontWeight: 700,
              color: 'var(--primary)',
              background: 'var(--bg-surface)',
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid var(--border-subtle)'
            }}>
              <span>{startCommand}</span>
              <button
                onClick={handleCopyCommand}
                style={{
                  background: 'none',
                  border: 'none',
                  color: copied ? 'var(--success)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex'
                }}
                title="Nusxalash"
              >
                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Setup notice if token is not added yet */}
          {!botStatus.configured && (
            <div style={{
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              fontSize: '12.5px',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              marginBottom: '20px'
            }}>
              <div style={{ fontWeight: 800, color: '#D97706', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <HelpCircle size={14} /> Botni ulash ko'rsatmasi:
              </div>
              Telegramda <strong>@BotFather</strong> orqali yangi bot ochib, berilgan tokenni loyihaning <code>server/.env</code> fayliga <code>TELEGRAM_BOT_TOKEN=...</code> qilib qo'yishingiz mumkin.
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href={`https://t.me/${botUsername}?start=${user?.id || 'guest'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press"
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: '#229ED9',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(34, 158, 217, 0.35)'
              }}
            >
              <Send size={16} /> Telegramda Ochish <ExternalLink size={14} />
            </a>

            <button
              onClick={onClose}
              className="btn-press"
              style={{
                padding: '14px 20px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Yopish
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
