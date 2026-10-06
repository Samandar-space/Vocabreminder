import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, ArrowLeft, Mail, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

export const AuthFlow = ({ onComplete }) => {
  // Screens: 'splash' | 'welcome' | 'register' | 'login' | 'forgot' | 'verify'
  const [screen, setScreen] = useState('welcome');
  const { setUser, showToast } = useApp();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Validate Email
  const validateEmail = (val) => {
    setEmail(val);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val && !regex.test(val)) {
      setEmailError('Email noto\'g\'ri formatda');
    } else {
      setEmailError('');
    }
  };

  // Google Login Handler (Simulated one-tap instant login with real user profile)
  const handleGoogleLogin = () => {
    const dummyName = prompt('Ismingizni kiriting:', 'Dilshod') || 'Foydalanuvchi';
    const dummyEmail = prompt('Google emailingizni kiriting:', 'user@gmail.com') || 'user@gmail.com';

    setUser(prev => ({
      ...prev,
      name: dummyName,
      email: dummyEmail,
      avatar: dummyName[0].toUpperCase(),
      isAuth: true
    }));
    showToast(`Google orqali xush kelibsiz, ${dummyName}!`, 'success');
    onComplete();
  };

  // Registration Submit
  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || emailError) {
      setEmailError('Iltimos, to\'g\'ri email kiriting');
      return;
    }
    if (password.length < 8) {
      setPasswordError('Kamida 8 ta belgi bo\'lishi shart');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('Parollar bir-biriga mos kelmadi');
      return;
    }

    const userName = name.trim() || email.split('@')[0];
    setUser(prev => ({
      ...prev,
      name: userName,
      email: email,
      avatar: userName[0].toUpperCase(),
      isAuth: true
    }));

    showToast('Ro\'yxatdan muvaffaqiyatli o\'tdingiz!', 'success');
    setScreen('verify');
  };

  // Login Submit
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || emailError) {
      setEmailError('Emailingizni kiriting');
      return;
    }
    const userName = email.split('@')[0];
    setUser(prev => ({
      ...prev,
      name: userName,
      email: email,
      avatar: userName[0].toUpperCase(),
      isAuth: true
    }));

    showToast(`Xush kelibsiz, ${userName}!`, 'success');
    onComplete();
  };

  // One-click instant guest explore
  const handleGuestLogin = () => {
    setUser(prev => ({
      ...prev,
      name: 'Foydalanuvchi',
      email: 'user@vocabreminder.uz',
      avatar: 'F',
      isAuth: true,
      isOnboarded: true
    }));
    showToast('Xush kelibsiz! Platformaga kirdingiz', 'success');
    onComplete();
  };

  // 1. Splash Screen
  if (screen === 'splash') {
    return (
      <div style={{
        minHeight: '480px',
        background: 'var(--primary-gradient)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        padding: '30px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '84px',
          height: '84px',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)'
        }}>
          <BookOpen size={44} color="#FFFFFF" strokeWidth={2.2} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>
          VocabReminder
        </h1>
        <p style={{ fontSize: '16px', opacity: 0.9, fontWeight: 500 }}>
          Yodlash emas, eslab qolish.
        </p>
        <button
          onClick={() => setScreen('welcome')}
          style={{
            marginTop: '40px',
            padding: '12px 32px',
            background: '#FFFFFF',
            color: 'var(--primary-600)',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            fontSize: '15px',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          Boshlash
        </button>
      </div>
    );
  }

  // 2. Welcome Screen (Responsive Desktop 2-Column Split & Mobile Stack)
  if (screen === 'welcome') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        minHeight: '520px',
        background: 'var(--bg-surface)'
      }}>
        {/* Left Column: Desktop Brand Showcase */}
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
                backdropFilter: 'blur(10px)'
              }}>
                <BookOpen size={26} color="#FFFFFF" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 900 }}>
                  VocabReminder
                </div>
                <div style={{ fontSize: '12px', opacity: 0.85, fontWeight: 600 }}>
                  Professional Ta'lim Platformasi
                </div>
              </div>
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 800, lineHeight: 1.25, marginBottom: '14px' }}>
              Yodlash emas, eslab qolish.
            </h2>
            <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.6, marginBottom: '28px' }}>
              Leitner interval takrorlash tizimi, AI Writing Checker, IELTS/CEFR Mock testlari va o'yinlar zonasi bilan ingliz tilini o'rganing.
            </p>

            {/* Feature Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { title: '🎯 IELTS & CEFR Mock Testlar', desc: '60 daqiqalik to\'liq sinov imtihonlari' },
                { title: '🎮 O\'yinlar Zonasi & Bozor', desc: 'Word Match va Speed Quiz orqali coin ishlab toping' },
                { title: '✍️ AI Writing Checker', desc: 'Insholarni tahlil qilish va leksikani boyitish' },
                { title: '🧠 Leitner 5-Bosqichli Takrorlash', desc: 'So\'zlarni uzoq muddatli xotiraga o\'tkazing' }
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
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800 }}>{f.title}</div>
                    <div style={{ fontSize: '11px', opacity: 0.85 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '12px', opacity: 0.75, marginTop: '24px' }}>
            Noutbuk, kompyuter va barcha qurilmalarga to'liq moslashgan
          </div>
        </div>

        {/* Right Column: Actions & Form */}
        <div style={{
          flex: '1 1 320px',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '14px'
        }}>
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
              Platformaga kirish
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Lug'atingizni boshqarish uchun o'zingizga qulay usulni tanlang
            </p>
          </div>

          {/* 1-CLICK INSTANT GUEST EXPLORE */}
          <button
            onClick={handleGuestLogin}
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
            🚀 Platformaga darhol kirish (Mehmon)
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '4px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 600 }}>YOKI</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
          </div>

          <button
            onClick={() => setScreen('register')}
            style={{
              padding: '13px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              fontWeight: 700,
              fontSize: '14px'
            }}
          >
            Yangi akkaunt ochish
          </button>

          <button
            onClick={() => setScreen('login')}
            style={{
              padding: '13px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              border: '1.5px solid var(--border-subtle)',
              fontWeight: 700,
              fontSize: '14px'
            }}
          >
            Mavjud akkauntga kirish
          </button>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            style={{
              padding: '13px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              border: '1.5px solid var(--border-subtle)',
              fontWeight: 600,
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
            Google bilan kirish
          </button>
        </div>
      </div>
    );
  }

  // 3. Register Screen
  if (screen === 'register') {
    return (
      <div style={{ minHeight: '100vh', padding: '30px 24px', background: 'var(--bg-surface)' }}>
        <button
          onClick={() => setScreen('welcome')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '24px' }}
        >
          <ArrowLeft size={20} /> Ortga
        </button>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
          Ro'yxatdan o'tish
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px' }}>
          Ingliz tilini bugundan mukammal o'rganing
        </p>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Ismingiz
            </label>
            <input
              type="text"
              placeholder="Masalan: Sardor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '13px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-subtle)',
                background: 'var(--bg-subtle)',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="example@mail.com"
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

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Parol
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="Kamida 8 ta belgi"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                style={{
                  width: '100%',
                  padding: '13px 16px 13px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: `1.5px solid ${passwordError ? 'var(--danger)' : 'var(--border-subtle)'}`,
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
              <Lock size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Parolni tasdiqlang
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="Parolni qayta kiriting"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 16px 13px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
              <Lock size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
            </div>
            {passwordError && (
              <span style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px', display: 'block' }}>
                {passwordError}
              </span>
            )}
          </div>

          <button
            type="submit"
            style={{
              marginTop: '12px',
              padding: '15px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '15px',
              boxShadow: 'var(--shadow-primary)'
            }}
          >
            Ro'yxatdan o'tish
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Hisobingiz bormi?{' '}
          <button
            onClick={() => setScreen('login')}
            style={{ color: 'var(--primary)', fontWeight: 700 }}
          >
            Tizimga kiring
          </button>
        </div>
      </div>
    );
  }

  // 4. Login Screen
  if (screen === 'login') {
    return (
      <div style={{ minHeight: '100vh', padding: '30px 24px', background: 'var(--bg-surface)' }}>
        <button
          onClick={() => setScreen('welcome')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '24px' }}
        >
          <ArrowLeft size={20} /> Ortga
        </button>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
          Tizimga kirish
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px' }}>
          Xush kelibsiz! Ma'lumotlaringizni kiriting.
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => validateEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 16px 13px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
              <Mail size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Parol
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="Parolingizni kiriting"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 16px 13px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)',
                  fontSize: '14px'
                }}
              />
              <Lock size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
            </div>
            <div style={{ textAlign: 'right', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => setScreen('forgot')}
                style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}
              >
                Parolni unutdingizmi?
              </button>
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
            Kirish
          </button>

          {/* Google Login Alternative */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{
              padding: '13px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              fontWeight: 600,
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
            Google bilan kirish
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Hisobingiz yo'qmi?{' '}
          <button
            onClick={() => setScreen('register')}
            style={{ color: 'var(--primary)', fontWeight: 700 }}
          >
            Ro'yxatdan o'ting
          </button>
        </div>
      </div>
    );
  }

  // 5. Forgot Password Screen
  if (screen === 'forgot') {
    return (
      <div style={{ minHeight: '100vh', padding: '30px 24px', background: 'var(--bg-surface)' }}>
        <button
          onClick={() => setScreen('login')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '24px' }}
        >
          <ArrowLeft size={20} /> Ortga
        </button>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Parolni tiklash
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px', lineHeight: 1.5 }}>
          Email manzilingizni kiriting. Tiklash havolasini yuboramiz.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); setScreen('verify'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 16px 13px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-subtle)',
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
            Havola yuborish
          </button>
        </form>
      </div>
    );
  }

  // 6. Verify Email Screen
  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 24px',
      background: 'var(--bg-surface)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'var(--primary-100)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px'
      }}>
        <Mail size={38} color="var(--primary)" />
      </div>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
        Emailingizni tasdiqlang
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '320px', lineHeight: 1.5, marginBottom: '28px' }}>
        Tasdiqlash havolasini <strong>{email || 'user@example.com'}</strong> manziliga yubordik. Emailingizni tekshiring.
      </p>

      <button
        onClick={() => onComplete()}
        style={{
          width: '100%',
          padding: '15px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--primary-gradient)',
          color: '#FFFFFF',
          fontWeight: 700,
          fontSize: '15px',
          boxShadow: 'var(--shadow-primary)',
          marginBottom: '12px'
        }}
      >
        Davom etish (Onboarding)
      </button>

      <button
        onClick={() => showToast('Havola qayta yuborildi', 'info')}
        style={{
          width: '100%',
          padding: '13px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-subtle)',
          color: 'var(--text-primary)',
          fontWeight: 600,
          fontSize: '14px',
          marginBottom: '16px'
        }}
      >
        Qayta yuborish
      </button>

      <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
        Spam papkasini ham tekshiring.
      </span>
    </div>
  );
};
