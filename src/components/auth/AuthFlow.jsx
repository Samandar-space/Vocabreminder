import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { authService } from '../../services/authService';
import { 
  BookOpen, ArrowLeft, Mail, Lock, CheckCircle2, 
  AlertCircle, Eye, EyeOff, User, Sparkles, 
  KeyRound, ShieldCheck, X 
} from 'lucide-react';

export const AuthFlow = ({ onComplete }) => {
  // Screens: 'welcome' | 'register' | 'login' | 'forgot' | 'verify'
  const [screen, setScreen] = useState('welcome');
  const { loginUser, showToast } = useApp();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error states
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google Modal State
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [googleName, setGoogleName] = useState('');
  const [googleEmail, setGoogleEmail] = useState('');

  // Forgot Password / Reset states
  const [resetStep, setResetStep] = useState(1); // 1: request code, 2: enter code & new pass
  const [resetCode, setResetCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Email validator
  const validateEmail = (val) => {
    setEmail(val);
    setGeneralError('');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val && !regex.test(val)) {
      setEmailError('Email noto\'g\'ri formatda (masalan: user@mail.com)');
    } else {
      setEmailError('');
    }
  };

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, text: '', color: 'transparent' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, text: 'Zaif', color: 'var(--danger)' };
    if (score === 2) return { score: 2, text: 'O\'rtacha', color: 'var(--gold-dark)' };
    if (score >= 3) return { score: 3, text: 'Kuchli', color: 'var(--success)' };
    return { score: 0, text: '', color: 'transparent' };
  };

  const passStrength = getPasswordStrength(password);

  // 1. REGISTRATION HANDLER
  const handleRegister = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setNameError('');
    setPasswordError('');

    if (!name.trim()) {
      setNameError('Ismingizni kiriting');
      return;
    }
    if (!email || emailError) {
      setEmailError('To\'g\'ri email manzilini kiriting');
      return;
    }
    if (password.length < 8) {
      setPasswordError('Parol kamida 8 ta belgidan iborat bo\'lishi shart');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('Kiritilgan parollar bir-biriga mos kelmadi');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await authService.register({
        name: name.trim(),
        email: email.trim(),
        password
      });

      if (!res.success) {
        setGeneralError(res.error || 'Ro\'yxatdan o\'tishda xatolik yuz berdi');
        setIsSubmitting(false);
        return;
      }

      loginUser(res.user);
      showToast(`Tabriklaymiz, ${res.user.name}! Hisobingiz yaratildi`, 'success');
      if (onComplete) onComplete();
    } catch (err) {
      setGeneralError('Kutilmagan xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setPasswordError('');

    if (!email || emailError) {
      setEmailError('Emailingizni kiriting');
      return;
    }
    if (!password) {
      setPasswordError('Parolingizni kiriting');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await authService.login({
        email: email.trim(),
        password
      });

      if (!res.success) {
        setGeneralError(res.error || 'Kirishda xatolik yuz berdi');
        setIsSubmitting(false);
        return;
      }

      loginUser(res.user);
      showToast(`Xush kelibsiz, ${res.user.name}!`, 'success');
      if (onComplete) onComplete();
    } catch (err) {
      setGeneralError('Kutilmagan xatolik yuz berdi');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. GOOGLE SIGN-IN HANDLER
  const handleGoogleSubmit = (e) => {
    e.preventDefault();
    if (!googleEmail.trim()) {
      showToast('Google emailingizni kiriting', 'error');
      return;
    }

    const res = authService.loginWithGoogle({
      name: googleName.trim() || googleEmail.split('@')[0],
      email: googleEmail.trim()
    });

    if (res.success) {
      setIsGoogleModalOpen(false);
      loginUser(res.user);
      showToast(`Google orqali kirdingiz: ${res.user.name}`, 'success');
      if (onComplete) onComplete();
    }
  };

  // Fast 1-click Preset Google Login
  const handlePresetGoogleLogin = (presetName, presetEmail) => {
    const res = authService.loginWithGoogle({
      name: presetName,
      email: presetEmail
    });
    if (res.success) {
      setIsGoogleModalOpen(false);
      loginUser(res.user);
      showToast(`Google orqali kirdingiz: ${presetName}`, 'success');
      if (onComplete) onComplete();
    }
  };

  // 4. GUEST LOGIN HANDLER
  const handleGuestLogin = () => {
    const res = authService.loginAsGuest();
    if (res.success) {
      loginUser(res.user);
      showToast('Xush kelibsiz! Mehmon rejimida kirdingiz', 'success');
      if (onComplete) onComplete();
    }
  };

  // 5. REQUEST PASSWORD RESET CODE
  const handleRequestResetCode = (e) => {
    e.preventDefault();
    setGeneralError('');
    if (!email || emailError) {
      setEmailError('Emailingizni kiriting');
      return;
    }

    const res = authService.requestPasswordReset(email.trim());
    if (!res.success) {
      setGeneralError(res.error || 'Hisob topilmadi');
      return;
    }

    setGeneratedCode(res.code);
    setResetStep(2);
    showToast(`Tasdiqlash kodi yuborildi! Kod: ${res.code}`, 'info');
  };

  // 6. SUBMIT NEW PASSWORD
  const handleConfirmNewPassword = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setPasswordError('');

    if (!resetCode.trim()) {
      setGeneralError('6 xonali tasdiqlash kodini kiriting');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('Yangi parol kamida 8 ta belgidan iborat bo\'lishi shart');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('Parollar bir-biriga mos kelmadi');
      return;
    }

    setIsSubmitting(true);
    const res = await authService.resetPassword({
      email: email.trim(),
      code: resetCode.trim(),
      newPassword
    });

    setIsSubmitting(false);
    if (!res.success) {
      setGeneralError(res.error || 'Parolni tiklashda xatolik yuz berdi');
      return;
    }

    showToast('Parolingiz muvaffaqiyatli yangilandi! Endi tizimga kiring', 'success');
    setResetStep(1);
    setPassword('');
    setScreen('login');
  };

  // -------------------------------------------------------------
  // RENDER SCREENS
  // -------------------------------------------------------------

  // SCREEN 1: WELCOME SCREEN (2-Column Desktop + Mobile Stack)
  if (screen === 'welcome') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        minHeight: '540px',
        background: 'var(--bg-surface)'
      }}>
        {/* Left Column: Brand Showcase */}
        <div style={{
          flex: '1 1 360px',
          background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
          color: '#FFFFFF',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
              }}>
                <BookOpen size={26} color="#FFFFFF" strokeWidth={2.4} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 900 }}>
                  VocabReminder
                </div>
                <div style={{ fontSize: '12px', opacity: 0.9, fontWeight: 600 }}>
                  Shaxsiy Lug'at & Leitner Tizimi
                </div>
              </div>
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 800, lineHeight: 1.25, marginBottom: '14px' }}>
              Yodlash emas, eslab qolish.
            </h2>
            <p style={{ fontSize: '14px', opacity: 0.92, lineHeight: 1.6, marginBottom: '28px' }}>
              Begona so'zlar bazasi emas — faqat o'zingiz kiritgan so'zlar asosida oraliq takrorlash (Spaced Repetition) va IELTS tayyorgarligi.
            </p>

            {/* Feature Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { title: '🔒 Shaxsiy Akkauntlar', desc: 'Har bir o\'quvchining o\'z lug\'ati va statistikasi' },
                { title: '🧠 Leitner 5-Quti Tizimi', desc: '1, 3, 7, 14 va 30 kunlik ilmiy intervallar' },
                { title: '✍️ AI Writing Checker', desc: 'Insholarni tahlil qilish va leksikani C1 ga ko\'tarish' },
                { title: '📲 PWA & Oflayn Rejim', desc: 'Internetsiz ham to\'liq ishlaydigan mustaqil ilova' }
              ].map((f, idx) => (
                <div key={idx} style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFFFFF' }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800 }}>{f.title}</div>
                    <div style={{ fontSize: '11px', opacity: 0.85 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '24px' }}>
            © 2026 VocabReminder. Barcha huquqlar himoyalangan.
          </div>
        </div>

        {/* Right Column: Actions */}
        <div style={{
          flex: '1 1 340px',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '14px'
        }}>
          <div style={{ marginBottom: '8px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
              Platformaga kirish
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Lug'atingizni boshqarish uchun o'zingizga qulay usulni tanlang
            </p>
          </div>

          {/* 1. Register Button */}
          <button
            onClick={() => { setScreen('register'); setGeneralError(''); }}
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '15px',
              boxShadow: 'var(--shadow-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <User size={18} /> Yangi akkaunt ochish
          </button>

          {/* 2. Login Button */}
          <button
            onClick={() => { setScreen('login'); setGeneralError(''); }}
            style={{
              padding: '13px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              border: '1.5px solid var(--border-subtle)',
              fontWeight: 700,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Lock size={16} color="var(--primary)" /> Mavjud hisobga kirish
          </button>

          {/* 3. Google Sign-in Button */}
          <button
            onClick={() => setIsGoogleModalOpen(true)}
            style={{
              padding: '13px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              fontWeight: 700,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Google orqali kirish
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '4px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>YOKI</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
          </div>

          {/* 4. Instant Guest Explore */}
          <button
            onClick={handleGuestLogin}
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px dashed var(--border-strong)',
              fontWeight: 600,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={16} color="var(--primary)" /> Mehmon sifatida sinab ko'rish
          </button>
        </div>

        {/* GOOGLE SIGN-IN MODAL */}
        {isGoogleModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px'
          }}>
            <div style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              maxWidth: '420px',
              width: '100%',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800 }}>
                    Google bilan kirish
                  </h4>
                </div>
                <button onClick={() => setIsGoogleModalOpen(false)} style={{ color: 'var(--text-tertiary)' }}>
                  <X size={20} />
                </button>
              </div>

              {/* Fast Presets */}
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  TEZKOR TANLOV:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div
                    onClick={() => handlePresetGoogleLogin('Dilshodbek Olimov', 'dilshodbek.olimov@gmail.com')}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#4285F4', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px' }}>
                      D
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700 }}>Dilshodbek Olimov</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>dilshodbek.olimov@gmail.com</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '14px 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>yoki o'z emailingizni kiriting</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              </div>

              <form onSubmit={handleGoogleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Ismingiz (masalan: Jasur)"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  style={{
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--border-subtle)',
                    background: 'var(--bg-subtle)',
                    fontSize: '14px'
                  }}
                />
                <input
                  type="email"
                  placeholder="Google email (masalan: jasur@gmail.com)"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  required
                  style={{
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--border-subtle)',
                    background: 'var(--bg-subtle)',
                    fontSize: '14px'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: '#4285F4',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '14px',
                    boxShadow: '0 4px 12px rgba(66, 133, 244, 0.3)',
                    marginTop: '4px'
                  }}
                >
                  Ulanish va Kirish
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // SCREEN 2: REGISTRATION SCREEN
  if (screen === 'register') {
    return (
      <div style={{ padding: '36px 32px', background: 'var(--bg-surface)', maxWidth: '480px', margin: '0 auto' }}>
        <button
          onClick={() => { setScreen('welcome'); setGeneralError(''); }}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '20px', fontWeight: 600 }}
        >
          <ArrowLeft size={18} /> Ortga
        </button>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
          Yangi akkaunt ochish
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Shaxsiy lug'atingiz va oraliq takrorlash rejangizni shakllantiring
        </p>

        {generalError && (
          <div style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--danger-light)',
            color: 'var(--danger)',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '18px'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{generalError}</span>
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Name Field */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              To'liq ismingiz
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Masalan: Sardor Aliyev"
                value={name}
                onChange={(e) => { setName(e.target.value); setNameError(''); }}
                style={{
                  width: '100%',
                  padding: '13px 16px 13px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: `1.5px solid ${nameError ? 'var(--danger)' : 'var(--border-subtle)'}`,
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
              <User size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
            </div>
            {nameError && (
              <span style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px', display: 'block' }}>
                {nameError}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Email manzilingiz
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="sardor@example.com"
                value={email}
                onChange={(e) => validateEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 16px 13px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: `1.5px solid ${emailError ? 'var(--danger)' : 'var(--border-subtle)'}`,
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
              <Mail size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
            </div>
            {emailError && (
              <span style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px', display: 'block' }}>
                {emailError}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Parol
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Kamida 8 ta belgi"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                style={{
                  width: '100%',
                  padding: '13px 42px 13px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: `1.5px solid ${passwordError ? 'var(--danger)' : 'var(--border-subtle)'}`,
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
              <Lock size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                style={{ position: 'absolute', right: '14px', top: '15px', color: 'var(--text-tertiary)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password strength indicator */}
            {password && (
              <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ flex: 1, height: '4px', background: 'var(--border-subtle)', borderRadius: '2px', overflow: 'hidden', display: 'flex' }}>
                  <div style={{
                    width: `${(passStrength.score / 3) * 100}%`,
                    background: passStrength.color,
                    transition: 'width 0.3s'
                  }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: passStrength.color }}>
                  {passStrength.text}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Parolni tasdiqlang
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Parolni qayta kiriting"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(''); }}
                style={{
                  width: '100%',
                  padding: '13px 42px 13px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: `1.5px solid ${passwordError ? 'var(--danger)' : 'var(--border-subtle)'}`,
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
              <Lock size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(p => !p)}
                style={{ position: 'absolute', right: '14px', top: '15px', color: 'var(--text-tertiary)' }}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordError && (
              <span style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px', display: 'block' }}>
                {passwordError}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: '10px',
              padding: '15px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '15px',
              boxShadow: 'var(--shadow-primary)',
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Ro\'yxatdan o\'tilmoqda...' : 'Ro\'yxatdan o\'tish'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Hisobingiz bormi?{' '}
          <button
            onClick={() => { setScreen('login'); setGeneralError(''); }}
            style={{ color: 'var(--primary)', fontWeight: 800 }}
          >
            Tizimga kiring
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 3: LOGIN SCREEN
  if (screen === 'login') {
    return (
      <div style={{ padding: '36px 32px', background: 'var(--bg-surface)', maxWidth: '480px', margin: '0 auto' }}>
        <button
          onClick={() => { setScreen('welcome'); setGeneralError(''); }}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '20px', fontWeight: 600 }}
        >
          <ArrowLeft size={18} /> Ortga
        </button>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
          Tizimga kirish
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Shaxsiy lug'atingiz va takrorlashlaringizga xush kelibsiz
        </p>

        {generalError && (
          <div style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--danger-light)',
            color: 'var(--danger)',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '18px'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{generalError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Email manzilingiz
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="sardor@example.com"
                value={email}
                onChange={(e) => validateEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 16px 13px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: `1.5px solid ${emailError ? 'var(--danger)' : 'var(--border-subtle)'}`,
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
              <Mail size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
            </div>
            {emailError && (
              <span style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px', display: 'block' }}>
                {emailError}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Parol
              </label>
              <button
                type="button"
                onClick={() => { setScreen('forgot'); setGeneralError(''); }}
                style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 700 }}
              >
                Parolni unutdingizmi?
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Parolingizni kiriting"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(''); setGeneralError(''); }}
                style={{
                  width: '100%',
                  padding: '13px 42px 13px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: `1.5px solid ${passwordError ? 'var(--danger)' : 'var(--border-subtle)'}`,
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
              <Lock size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                style={{ position: 'absolute', right: '14px', top: '15px', color: 'var(--text-tertiary)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordError && (
              <span style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px', display: 'block' }}>
                {passwordError}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: '10px',
              padding: '15px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '15px',
              boxShadow: 'var(--shadow-primary)',
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Kirilmoqda...' : 'Kirish'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Hisobingiz yo'qmi?{' '}
          <button
            onClick={() => { setScreen('register'); setGeneralError(''); }}
            style={{ color: 'var(--primary)', fontWeight: 800 }}
          >
            Ro'yxatdan o'ting
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 4: FORGOT PASSWORD / RESET CODE SCREEN
  return (
    <div style={{ padding: '36px 32px', background: 'var(--bg-surface)', maxWidth: '480px', margin: '0 auto' }}>
      <button
        onClick={() => { setScreen('login'); setGeneralError(''); }}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '20px', fontWeight: 600 }}
      >
        <ArrowLeft size={18} /> Ortga
      </button>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
        Parolni tiklash
      </h2>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
        {resetStep === 1 
          ? 'Email manzilingizni kiriting. Tasdiqlash kodini taqdim etamiz.' 
          : 'Tasdiqlash kodi va yangi parolni kiriting.'}
      </p>

      {generalError && (
        <div style={{
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--danger-light)',
          color: 'var(--danger)',
          fontSize: '13px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '18px'
        }}>
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{generalError}</span>
        </div>
      )}

      {/* STEP 1: REQUEST CODE */}
      {resetStep === 1 && (
        <form onSubmit={handleRequestResetCode} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Email manzilingiz
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="sardor@example.com"
                value={email}
                onChange={(e) => validateEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 16px 13px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: `1.5px solid ${emailError ? 'var(--danger)' : 'var(--border-subtle)'}`,
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
              <Mail size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
            </div>
          </div>

          <button
            type="submit"
            style={{
              padding: '15px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '15px',
              boxShadow: 'var(--shadow-primary)',
              marginTop: '6px'
            }}
          >
            Tasdiqlash kodini olish
          </button>
        </form>
      )}

      {/* STEP 2: ENTER CODE & SET NEW PASSWORD */}
      {resetStep === 2 && (
        <form onSubmit={handleConfirmNewPassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Simulation Help Box */}
          <div style={{
            padding: '12px 14px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-50)',
            border: '1px solid var(--primary-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ fontSize: '12px', color: 'var(--primary-700)' }}>
              Sizning tasdiqlash kodingiz:
            </div>
            <div style={{ fontSize: '16px', fontWeight: 900, letterSpacing: '2px', color: 'var(--primary)' }}>
              {generatedCode}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              6 xonali tasdiqlash kodi
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                maxLength={6}
                placeholder="123456"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 16px 13px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)',
                  fontSize: '18px',
                  letterSpacing: '3px',
                  fontWeight: 800
                }}
              />
              <KeyRound size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Yangi parol
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Kamida 8 ta belgi"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 42px 13px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
              <Lock size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                style={{ position: 'absolute', right: '14px', top: '15px', color: 'var(--text-tertiary)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Yangi parolni tasdiqlang
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Qayta kiriting"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 42px 13px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
              <Lock size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(p => !p)}
                style={{ position: 'absolute', right: '14px', top: '15px', color: 'var(--text-tertiary)' }}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '15px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '15px',
              boxShadow: 'var(--shadow-primary)',
              marginTop: '6px'
            }}
          >
            {isSubmitting ? 'Yangilanmoqda...' : 'Yangi parolni saqlash'}
          </button>
        </form>
      )}
    </div>
  );
};
