import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/storage';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

// Leitner intervals in days: Box 1: 1 day, Box 2: 3 days, Box 3: 7 days, Box 4: 14 days, Box 5: 30 days
const LEITNER_INTERVALS = [1, 3, 7, 14, 30];

export const AppProvider = ({ children }) => {
  // Theme State
  const [theme, setThemeState] = useState(() => storage.get(storage.KEYS.THEME, 'light'));

  // User Profile (Defaults to authenticated so desktop web app is immediately active)
  const [user, setUser] = useState(() => {
    const saved = storage.get(storage.KEYS.USER, null);
    if (!saved || saved.isAuth === false) {
      return {
        name: saved?.name || 'Foydalanuvchi',
        email: saved?.email || 'user@vocabreminder.uz',
        avatar: (saved?.name?.[0] || 'F').toUpperCase(),
        isAuth: true, // Default to true so user lands directly on desktop dashboard
        isOnboarded: true, // Default to true so user is never trapped in a phone onboarding screen
        goal: saved?.goal || 'cefr', // 'cefr' | 'ielts' | 'general'
        level: saved?.level || 'B1',
        dailyGoal: saved?.dailyGoal || 20,
        isPro: saved?.isPro || false
      };
    }
    return saved;
  });

  // Words list (Completely dynamic - clean by default)
  const [words, setWords] = useState(() => storage.get(storage.KEYS.WORDS, []));

  // Gamification & Coins
  const [coins, setCoins] = useState(() => storage.get(storage.KEYS.COINS, 50)); // 50 welcome bonus coins
  const [orders, setOrders] = useState(() => storage.get(storage.KEYS.ORDERS, []));

  // Streak State
  const [streak, setStreak] = useState(() => storage.get(storage.KEYS.STATS, {
    count: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    reviewedToday: 0
  }));

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState(() => storage.get(storage.KEYS.SETTINGS, {
    enabled: true,
    intervalMinutes: 60,
    quietStart: '22:00',
    quietEnd: '08:00'
  }));

  // Current Navigation / View
  const [currentTab, setCurrentTab] = useState('home'); // 'home' | 'words' | 'review' | 'profile' | 'market' | 'games' | 'writing' | 'reading' | 'grammar' | 'mock' | 'levelTest'
  const [activeModal, setActiveModal] = useState(null); // 'addWord' | 'bulkAdd' | 'editWord' | 'quickQuestion' | null
  const [selectedWord, setSelectedWord] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Apply Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    storage.set(storage.KEYS.THEME, theme);
  }, [theme]);

  // Sync state to local storage
  useEffect(() => storage.set(storage.KEYS.USER, user), [user]);
  useEffect(() => storage.set(storage.KEYS.WORDS, words), [words]);
  useEffect(() => storage.set(storage.KEYS.COINS, coins), [coins]);
  useEffect(() => storage.set(storage.KEYS.ORDERS, orders), [orders]);
  useEffect(() => storage.set(storage.KEYS.STATS, streak), [streak]);
  useEffect(() => storage.set(storage.KEYS.SETTINGS, notificationSettings), [notificationSettings]);

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => { setIsOffline(false); showToast('Internet aloqasi tiklandi', 'success'); };
    const handleOffline = () => { setIsOffline(true); showToast('Internet yo\'q. Oflayn rejimda ishlayapsiz', 'info'); };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Toast Helper
  const showToast = (text, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    showToast(`Mavzu ${newTheme === 'dark' ? 'Qorong\'i' : 'Yorug\''} rejimga o'zgardi`, 'info');
  };

  // Add Single Word
  const addWord = (wordData) => {
    const newWord = {
      id: Date.now().toString(),
      word: wordData.word.trim(),
      translation: wordData.translation.trim(),
      transcription: wordData.transcription?.trim() || `/${wordData.word.toLowerCase()}/`,
      example: wordData.example?.trim() || '',
      note: wordData.note?.trim() || '',
      tag: wordData.tag?.trim() || '',
      box: 1, // Leitner Box 1
      nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      reviewCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      isFavorite: false,
      createdAt: new Date().toISOString()
    };

    setWords(prev => [newWord, ...prev]);
    addCoins(5, 'Yangi so\'z qo\'shildi (+5 coin)');
    showToast(`"${newWord.word}" so'zi qo'shildi`, 'success');
    return newWord;
  };

  // Import Words (Restore / Merge from backup)
  const importWords = (newWords, replaceAll = false) => {
    if (!newWords || newWords.length === 0) return 0;

    if (replaceAll) {
      setWords(newWords);
      showToast(`${newWords.length} ta so'z muvaffaqiyatli tiklandi!`, 'success');
      return newWords.length;
    }

    let addedCount = 0;
    setWords(prev => {
      const existingMap = new Set(prev.map(w => w.word.toLowerCase().trim()));
      const toAdd = newWords.filter(w => !existingMap.has(w.word.toLowerCase().trim()));
      addedCount = toAdd.length;
      return [...toAdd, ...prev];
    });

    showToast(`${newWords.length} ta so'z ko'rib chiqildi, yangilari qo'shildi!`, 'success');
    return newWords.length;
  };

  // Bulk Add Words (Super Feature: paste 50 words like "apple - olma" or "word : tarjima")
  const bulkAddWords = (rawText) => {
    if (!rawText || !rawText.trim()) return 0;

    const lines = rawText.split(/\r?\n/).filter(line => line.trim().length > 0);
    const addedList = [];

    lines.forEach(line => {
      // Split by dash, colon, tab, or comma
      const parts = line.split(/[-–—:=,\t]/);
      if (parts.length >= 2) {
        const word = parts[0].trim();
        const translation = parts.slice(1).join(' ').trim();
        if (word && translation) {
          addedList.push({
            id: Date.now().toString() + Math.random().toString().slice(2, 6),
            word,
            translation,
            transcription: `/${word.toLowerCase()}/`,
            example: '',
            note: 'Tezkor kiritish',
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
    });

    if (addedList.length > 0) {
      setWords(prev => [...addedList, ...prev]);
      const rewardCoins = addedList.length * 2;
      addCoins(rewardCoins, `${addedList.length} ta so'z qo'shildi (+${rewardCoins} coin)`);
      showToast(`${addedList.length} ta yangi so'z saqlandi!`, 'success');
      return addedList.length;
    }
    return 0;
  };

  // Edit Word
  const editWord = (id, updatedFields) => {
    setWords(prev => prev.map(w => w.id === id ? { ...w, ...updatedFields } : w));
    showToast('So\'z yangilandi', 'success');
  };

  // Delete Word
  const deleteWord = (id) => {
    setWords(prev => prev.filter(w => w.id !== id));
    showToast('So\'z o\'chirildi', 'error');
  };

  // Toggle Favorite
  const toggleFavorite = (id) => {
    setWords(prev => prev.map(w => {
      if (w.id === id) {
        const nextFav = !w.isFavorite;
        showToast(nextFav ? 'Sevimlilarga qo\'shildi' : 'Sevimlilardan olindi', 'info');
        return { ...w, isFavorite: nextFav };
      }
      return w;
    }));
  };

  // Leitner Spaced Repetition Logic:
  // quality: 'hard' (box -> 1), 'medium' (box stays or +1), 'easy' (box + 1)
  const recordReviewResult = (wordId, quality) => {
    setWords(prev => prev.map(word => {
      if (word.id !== wordId) return word;

      let nextBox = word.box;
      let isCorrect = true;

      if (quality === 'hard') {
        nextBox = 1; // reset to box 1 if hard/incorrect
        isCorrect = false;
      } else if (quality === 'medium') {
        nextBox = Math.min(5, word.box + 1);
      } else if (quality === 'easy') {
        nextBox = Math.min(5, word.box + 1);
      }

      const daysToAdd = LEITNER_INTERVALS[nextBox - 1] || 1;
      const nextDate = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000).toISOString();

      return {
        ...word,
        box: nextBox,
        nextReviewDate: nextDate,
        reviewCount: word.reviewCount + 1,
        correctCount: word.correctCount + (isCorrect ? 1 : 0),
        incorrectCount: word.incorrectCount + (isCorrect ? 0 : 1)
      };
    }));

    // Reward coins
    addCoins(3, 'So\'z takrorlandi (+3 coin)');
  };

  // Coin Management
  const addCoins = (amount, reason) => {
    setCoins(prev => prev + amount);
  };

  const spendCoins = (amount, itemName, details) => {
    if (coins < amount) {
      showToast('Coinlaringiz yetarli emas!', 'error');
      return false;
    }
    setCoins(prev => prev - amount);
    const newOrder = {
      id: 'ORD-' + Date.now().toString().slice(-6),
      item: itemName,
      coins: amount,
      details,
      date: new Date().toLocaleDateString('uz-UZ'),
      status: 'Ko\'rib chiqilmoqda'
    };
    setOrders(prev => [newOrder, ...prev]);
    showToast(`Buyurtma qabul qilindi: ${itemName}`, 'success');
    return true;
  };

  // Update User Profile
  const updateUserProfile = (data) => {
    setUser(prev => ({ ...prev, ...data }));
    showToast('Profil yangilandi', 'success');
  };

  // Delete Entire Account (Fresh Start)
  const deleteAccount = () => {
    storage.clearAll();
    setUser({
      name: '',
      email: '',
      avatar: '',
      isAuth: false,
      isOnboarded: false,
      goal: 'cefr',
      level: 'B1',
      dailyGoal: 20,
      isPro: false
    });
    setWords([]);
    setCoins(50);
    setOrders([]);
    setCurrentTab('auth');
    showToast('Hisobingiz muvaffaqiyatli o\'chirildi', 'info');
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      theme,
      setTheme,
      words,
      setWords,
      addWord,
      bulkAddWords,
      importWords,
      editWord,
      deleteWord,
      toggleFavorite,
      recordReviewResult,
      coins,
      addCoins,
      spendCoins,
      orders,
      streak,
      setStreak,
      notificationSettings,
      setNotificationSettings,
      currentTab,
      setCurrentTab,
      activeModal,
      setActiveModal,
      selectedWord,
      setSelectedWord,
      toasts,
      showToast,
      removeToast,
      isOffline,
      updateUserProfile,
      deleteAccount
    }}>
      {children}
    </AppContext.Provider>
  );
};
