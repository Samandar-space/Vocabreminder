// LocalStorage helper with safe parsing and defaults
const STORAGE_KEYS = {
  USER: 'vocab_user',
  WORDS: 'vocab_words',
  SETTINGS: 'vocab_settings',
  COINS: 'vocab_coins',
  TASKS: 'vocab_tasks',
  ORDERS: 'vocab_orders',
  STATS: 'vocab_stats',
  THEME: 'vocab_theme',
  API_KEY: 'vocab_ai_api_key'
};

export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Storage get error:', e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage set error:', e);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Storage remove error:', e);
    }
  },

  clearAll() {
    try {
      Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    } catch (e) {
      console.error('Storage clear error:', e);
    }
  },

  KEYS: STORAGE_KEYS
};
