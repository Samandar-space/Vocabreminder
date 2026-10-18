// VocabReminder - Comprehensive Client-side Authentication & Multi-Account Service
// Securely manages accounts, password hashing (SHA-256), sessions, and profile states.

const STORAGE_KEYS = {
  ACCOUNTS: 'vocab_accounts',
  SESSION: 'vocab_session_user',
  LEGACY_USER: 'vocab_user',
  RESET_CODES: 'vocab_reset_codes'
};

/**
 * Hash password using Web Crypto API (SHA-256)
 */
export async function hashPassword(password) {
  try {
    if (window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (e) {
    console.warn('SubtleCrypto not available, using fallback hash', e);
  }

  // Fallback simple deterministic hash
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return 'fallback_' + Math.abs(hash).toString(16);
}

class AuthService {
  constructor() {
    this.initLegacyMigration();
  }

  // Migrate legacy single user to accounts array if accounts list is empty
  initLegacyMigration() {
    try {
      const accounts = this.getAllAccounts();
      const legacy = localStorage.getItem(STORAGE_KEYS.LEGACY_USER);
      if (accounts.length === 0 && legacy) {
        const parsed = JSON.parse(legacy);
        if (parsed && parsed.email) {
          const initialAccount = {
            id: 'usr_default_' + Date.now().toString(36),
            name: parsed.name || 'Foydalanuvchi',
            email: parsed.email.toLowerCase().trim(),
            passwordHash: '', // Legacy user without password
            avatar: (parsed.name?.[0] || 'F').toUpperCase(),
            isAuth: Boolean(parsed.isAuth),
            isOnboarded: Boolean(parsed.isOnboarded ?? true),
            goal: parsed.goal || 'cefr',
            level: parsed.level || 'B1',
            dailyGoal: parsed.dailyGoal || 20,
            isPro: Boolean(parsed.isPro),
            authProvider: 'legacy',
            createdAt: new Date().toISOString()
          };
          this.saveAccounts([initialAccount]);
          if (parsed.isAuth) {
            localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(initialAccount));
          }
        }
      }
    } catch (e) {
      console.error('Migration error:', e);
    }
  }

  getAllAccounts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  saveAccounts(accounts) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
    } catch (e) {
      console.error('Failed to save accounts:', e);
    }
  }

  getCurrentUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (!raw) return null;
      const user = JSON.parse(raw);
      if (!user || !user.id || user.isAuth === false) return null;
      return user;
    } catch {
      return null;
    }
  }

  setSession(user) {
    try {
      if (!user) {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
      } else {
        const sessionData = { ...user, isAuth: true };
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionData));
        // Also keep legacy key synced for backward compatibility
        localStorage.setItem(STORAGE_KEYS.LEGACY_USER, JSON.stringify(sessionData));
      }
    } catch (e) {
      console.error('Set session error:', e);
    }
  }

  /**
   * Register a new user with email and password
   */
  async register({ name, email, password }) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (name || '').trim();

    if (!cleanEmail) {
      return { success: false, error: 'Email manzilini kiritish shart' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return { success: false, error: 'Email manzili noto\'g\'ri formatda' };
    }

    if (!password || password.length < 8) {
      return { success: false, error: 'Parol kamida 8 ta belgidan iborat bo\'lishi shart' };
    }

    const accounts = this.getAllAccounts();
    const existing = accounts.find(a => a.email === cleanEmail);
    if (existing) {
      return { success: false, error: 'Bu email bilan allaqachon hisob ochilgan. Iltimos, tizimga kiring.' };
    }

    const passwordHash = await hashPassword(password);
    const displayName = cleanName || cleanEmail.split('@')[0];
    const initial = (displayName[0] || 'U').toUpperCase();

    const newUser = {
      id: 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6),
      name: displayName,
      email: cleanEmail,
      passwordHash,
      avatar: initial,
      isAuth: true,
      isOnboarded: false, // New users go through onboarding to customize their goal
      goal: 'cefr',
      level: 'B1',
      dailyGoal: 20,
      isPro: false,
      authProvider: 'email',
      createdAt: new Date().toISOString()
    };

    accounts.push(newUser);
    this.saveAccounts(accounts);
    this.setSession(newUser);

    return { success: true, user: newUser };
  }

  /**
   * Authenticate with email and password
   */
  async login({ email, password }) {
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanEmail) {
      return { success: false, error: 'Email manzilini kiriting' };
    }
    if (!password) {
      return { success: false, error: 'Parolni kiriting' };
    }

    const accounts = this.getAllAccounts();
    const account = accounts.find(a => a.email === cleanEmail);

    if (!account) {
      return { success: false, error: 'Bunday email bilan hisob topilmadi. Avval ro\'yxatdan o\'ting.' };
    }

    // Verify password if account has a passwordHash
    if (account.passwordHash) {
      const inputHash = await hashPassword(password);
      if (inputHash !== account.passwordHash) {
        return { success: false, error: 'Kiritilgan parol noto\'g\'ri' };
      }
    }

    const authenticatedUser = {
      ...account,
      isAuth: true
    };

    this.setSession(authenticatedUser);
    return { success: true, user: authenticatedUser };
  }

  /**
   * Google Sign-In with real UI selection / input (No window.prompt!)
   */
  loginWithGoogle({ name, email, avatarUrl = null }) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (name || '').trim();

    if (!cleanEmail) {
      return { success: false, error: 'Google email manzilini kiriting' };
    }

    const accounts = this.getAllAccounts();
    let account = accounts.find(a => a.email === cleanEmail);

    if (account) {
      // Existing Google or linked account
      account = {
        ...account,
        name: cleanName || account.name,
        avatar: avatarUrl || (cleanName?.[0] || cleanEmail[0] || 'G').toUpperCase(),
        isAuth: true
      };
      // Update in accounts
      const updated = accounts.map(a => a.id === account.id ? account : a);
      this.saveAccounts(updated);
    } else {
      // Create new Google account
      const displayName = cleanName || cleanEmail.split('@')[0];
      account = {
        id: 'usr_g_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6),
        name: displayName,
        email: cleanEmail,
        passwordHash: '',
        avatar: avatarUrl || (displayName[0] || 'G').toUpperCase(),
        isAuth: true,
        isOnboarded: false,
        goal: 'cefr',
        level: 'B1',
        dailyGoal: 20,
        isPro: false,
        authProvider: 'google',
        createdAt: new Date().toISOString()
      };
      accounts.push(account);
      this.saveAccounts(accounts);
    }

    this.setSession(account);
    return { success: true, user: account };
  }

  /**
   * One-click Guest explore session
   */
  loginAsGuest() {
    const accounts = this.getAllAccounts();
    let guest = accounts.find(a => a.authProvider === 'guest');

    if (!guest) {
      guest = {
        id: 'usr_guest_' + Date.now().toString(36),
        name: 'Mehmon Foydalanuvchi',
        email: 'mehmon@vocabreminder.uz',
        passwordHash: '',
        avatar: 'M',
        isAuth: true,
        isOnboarded: true,
        goal: 'cefr',
        level: 'B1',
        dailyGoal: 20,
        isPro: false,
        authProvider: 'guest',
        createdAt: new Date().toISOString()
      };
      accounts.push(guest);
      this.saveAccounts(accounts);
    } else {
      guest = { ...guest, isAuth: true };
    }

    this.setSession(guest);
    return { success: true, user: guest };
  }

  /**
   * Generate 6-digit password reset code
   */
  requestPasswordReset(email) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const accounts = this.getAllAccounts();
    const account = accounts.find(a => a.email === cleanEmail);

    if (!account) {
      return { success: false, error: 'Bunday email bilan hisob topilmadi' };
    }

    // Generate simulated 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    try {
      const resetMap = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESET_CODES) || '{}');
      resetMap[cleanEmail] = {
        code,
        expiresAt: Date.now() + 15 * 60 * 1000 // 15 mins validity
      };
      localStorage.setItem(STORAGE_KEYS.RESET_CODES, JSON.stringify(resetMap));
    } catch (e) {
      console.error('Reset code storage error:', e);
    }

    return { success: true, code };
  }

  /**
   * Reset password with verification code
   */
  async resetPassword({ email, code, newPassword }) {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!newPassword || newPassword.length < 8) {
      return { success: false, error: 'Yangi parol kamida 8 ta belgidan iborat bo\'lishi shart' };
    }

    try {
      const resetMap = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESET_CODES) || '{}');
      const record = resetMap[cleanEmail];

      if (!record || record.code !== code.trim()) {
        return { success: false, error: 'Tasdiqlash kodi noto\'g\'ri' };
      }
      if (Date.now() > record.expiresAt) {
        return { success: false, error: 'Tasdiqlash kodining amal qilish muddati tugagan' };
      }

      const accounts = this.getAllAccounts();
      const account = accounts.find(a => a.email === cleanEmail);
      if (!account) {
        return { success: false, error: 'Hisob topilmadi' };
      }

      account.passwordHash = await hashPassword(newPassword);
      this.saveAccounts(accounts);

      // Clean up code
      delete resetMap[cleanEmail];
      localStorage.setItem(STORAGE_KEYS.RESET_CODES, JSON.stringify(resetMap));

      return { success: true };
    } catch (e) {
      return { success: false, error: 'Parolni tiklashda xatolik yuz berdi' };
    }
  }

  /**
   * Update profile fields (goal, level, dailyGoal, name, avatar)
   */
  updateProfile(userId, updates) {
    const accounts = this.getAllAccounts();
    const index = accounts.findIndex(a => a.id === userId);
    if (index === -1) return null;

    accounts[index] = { ...accounts[index], ...updates };
    this.saveAccounts(accounts);

    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      const updatedCurrent = { ...currentUser, ...updates };
      this.setSession(updatedCurrent);
      return updatedCurrent;
    }
    return accounts[index];
  }

  /**
   * Log out active session
   */
  logout() {
    this.setSession(null);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    // In legacy user key, set isAuth: false so it never automatically logs back in
    try {
      const legacy = localStorage.getItem(STORAGE_KEYS.LEGACY_USER);
      if (legacy) {
        const parsed = JSON.parse(legacy);
        parsed.isAuth = false;
        localStorage.setItem(STORAGE_KEYS.LEGACY_USER, JSON.stringify(parsed));
      }
    } catch {}
  }

  /**
   * Permanently delete account and associated user data
   */
  deleteAccount(userId) {
    let accounts = this.getAllAccounts();
    accounts = accounts.filter(a => a.id !== userId);
    this.saveAccounts(accounts);

    // Remove user specific data keys
    const userKeys = [
      `vocab_words_${userId}`,
      `vocab_coins_${userId}`,
      `vocab_stats_${userId}`,
      `vocab_orders_${userId}`,
      `vocab_settings_${userId}`
    ];
    userKeys.forEach(k => localStorage.removeItem(k));

    this.logout();
  }
}

export const authService = new AuthService();
