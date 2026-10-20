import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { authService } from '../services/authService';
import { getWords, createWord, updateWord, deleteWord as apiDeleteWord } from '../api/wordsApi';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

// Leitner intervals in days: Box 1: 1 day, Box 2: 3 days, Box 3: 7 days, Box 4: 14 days, Box 5: 30 days
const LEITNER_INTERVALS = [1, 3, 7, 14, 30];

// Normalizer to guarantee consistent shape across UI components
const normalizeWord = (w) => ({
  box: 1,
  nextReviewDate: new Date().toISOString(),
  reviewCount: 0,
  correctCount: 0,
  incorrectCount: 0,
  isFavorite: false,
  createdAt: new Date().toISOString(),
  ...w
});

export const AppProvider = ({ children }) => {
  // Theme State
  const [theme, setThemeState] = useState(() => storage.get(storage.KEYS.THEME, 'light'));

  // Active User State
  const [user, setUser] = useState(() => {
    const active = authService.getCurrentUser();
    if (active) {
      return { ...active, isAuth: true };
    }
    return {
      id: null,
      name: '',
      email: '',
      avatar: '',
      isAuth: false,
      isOnboarded: false,
      goal: 'cefr',
      level: 'B1',
      dailyGoal: 20,
      isPro: false
    };
  });

  // Words list (Offline-first: cached locally, synced with Express REST API)
  const [words, setWords] = useState(() => {
    const activeUser = authService.getCurrentUser();
    const userKey = activeUser?.id ? `vocab_words_${activeUser.id}` : storage.KEYS.WORDS;
    const cached = storage.get(userKey, storage.get(storage.KEYS.WORDS, []));
    return Array.isArray(cached) ? cached.map(normalizeWord) : [];
  });

  // Gamification & Coins (Scoped to user)
  const [coins, setCoins] = useState(() => {
    const activeUser = authService.getCurrentUser();
    if (activeUser?.id) {
      return storage.get(`vocab_coins_${activeUser.id}`, storage.get(storage.KEYS.COINS, 50));
    }
    return storage.get(storage.KEYS.COINS, 50);
  });

  // Orders list (Scoped to user)
  const [orders, setOrders] = useState(() => {
    const activeUser = authService.getCurrentUser();
    if (activeUser?.id) {
      return storage.get(`vocab_orders_${activeUser.id}`, storage.get(storage.KEYS.ORDERS, []));
    }
    return storage.get(storage.KEYS.ORDERS, []);
  });

  // Streak & Activity State (Scoped to user)
  const [streak, setStreak] = useState(() => {
    const activeUser = authService.getCurrentUser();
    const defaultStats = {
      count: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      reviewedToday: 0
    };
    if (activeUser?.id) {
      return storage.get(`vocab_stats_${activeUser.id}`, storage.get(storage.KEYS.STATS, defaultStats));
    }
    return storage.get(storage.KEYS.STATS, defaultStats);
  });

  // Notification Settings (Scoped to user)
  const [notificationSettings, setNotificationSettings] = useState(() => {
    const activeUser = authService.getCurrentUser();
    const defaultSettings = {
      enabled: true,
      intervalMinutes: 60,
      quietStart: '22:00',
      quietEnd: '08:00'
    };
    if (activeUser?.id) {
      return storage.get(`vocab_settings_${activeUser.id}`, storage.get(storage.KEYS.SETTINGS, defaultSettings));
    }
    return storage.get(storage.KEYS.SETTINGS, defaultSettings);
  });

  // Current Navigation / View
  const [currentTab, setCurrentTab] = useState('home');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

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

  // Load and sync words with server (Hybrid Offline-First)
  useEffect(() => {
    let isMounted = true;
    const loadWordsFromServer = async () => {
      try {
        const data = await getWords(user?.id);
        if (Array.isArray(data) && isMounted) {
          setWords(prevLocal => {
            const map = new Map();
            data.forEach(w => map.set(String(w.id || w.word.toLowerCase()), normalizeWord(w)));
            prevLocal.forEach(w => {
              const key = String(w.id || w.word.toLowerCase());
              if (!map.has(key)) {
                map.set(key, w);
              }
            });
            return Array.from(map.values());
          });
        }
      } catch (err) {
        console.info("Server bilan aloqa yo'q (Oflayn keshdan foydalanilmoqda):", err.message);
      }
    };
    loadWordsFromServer();
    return () => { isMounted = false; };
  }, [user?.id]);

  // Sync words to local storage whenever changed
  useEffect(() => {
    if (words) {
      if (user?.id) {
        storage.set(`vocab_words_${user.id}`, words);
      }
      storage.set(storage.KEYS.WORDS, words);
    }
  }, [words, user?.id]);

  // Apply Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    storage.set(storage.KEYS.THEME, theme);
  }, [theme]);

  // Sync user state to local storage (words is excluded to prevent overwriting server data)
  useEffect(() => {
    if (user?.id) {
      storage.set(`vocab_coins_${user.id}`, coins);
    }
    storage.set(storage.KEYS.COINS, coins);
  }, [coins, user?.id]);

  useEffect(() => {
    if (user?.id) {
      storage.set(`vocab_orders_${user.id}`, orders);
    }
    storage.set(storage.KEYS.ORDERS, orders);
  }, [orders, user?.id]);

  useEffect(() => {
    if (user?.id) {
      storage.set(`vocab_stats_${user.id}`, streak);
    }
    storage.set(storage.KEYS.STATS, streak);
  }, [streak, user?.id]);

  useEffect(() => {
    if (user?.id) {
      storage.set(`vocab_settings_${user.id}`, notificationSettings);
    }
    storage.set(storage.KEYS.SETTINGS, notificationSettings);
  }, [notificationSettings, user?.id]);

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

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    showToast(`Mavzu ${newTheme === 'dark' ? 'Qorong\'i' : 'Yorug\''} rejimga o'zgardi`, 'info');
  };

  // Switch or Login User
  const loginUser = (authenticatedUser) => {
    authService.setSession(authenticatedUser);
    setUser({ ...authenticatedUser, isAuth: true });

    // Load data specific to this user
    const userCoins = storage.get(`vocab_coins_${authenticatedUser.id}`, 50);
    const userStats = storage.get(`vocab_stats_${authenticatedUser.id}`, {
      count: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      reviewedToday: 0
    });
    const userOrders = storage.get(`vocab_orders_${authenticatedUser.id}`, []);
    const userSettings = storage.get(`vocab_settings_${authenticatedUser.id}`, {
      enabled: true,
      intervalMinutes: 60,
      quietStart: '22:00',
      quietEnd: '08:00'
    });

    setCoins(userCoins);
    setStreak(userStats);
    setOrders(userOrders);
    setNotificationSettings(userSettings);

    // Refresh words from server
    getWords()
      .then(data => {
        if (Array.isArray(data)) setWords(data.map(normalizeWord));
      })
      .catch(err => {
        console.error("Serverdan so'zlarni yuklashda xatolik:", err);
        showToast("Server bilan aloqa yo'q. So'zlar yuklanmadi", 'error');
      });

    setCurrentTab('home');
  };

  // Logout Active User
  const logoutUser = () => {
    if (user?.id) {
      storage.set(`vocab_coins_${user.id}`, coins);
      storage.set(`vocab_stats_${user.id}`, streak);
    }
    authService.logout();
    setUser({
      id: null,
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
    setCoins(0);
    setOrders([]);
    setStreak({
      count: 1,
      lastActiveDate: '',
      reviewedToday: 0
    });
    showToast('Tizimdan muvaffaqiyatli chiqdingiz', 'info');
  };

  // Add Single Word (Optimistic UI + Background Server Sync)
  const addWord = async (wordData) => {
    const newWordPayload = normalizeWord({
      id: Date.now(),
      word: wordData.word.trim(),
      translation: wordData.translation.trim(),
      transcription: wordData.transcription?.trim() || `/${wordData.word.toLowerCase()}/`,
      example: wordData.example?.trim() || '',
      note: wordData.note?.trim() || '',
      tag: wordData.tag?.trim() || '',
      box: 1, // Leitner Box 1
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      isFavorite: false,
      createdAt: new Date().toISOString()
    });

    // Instant local update
    setWords(prev => [newWordPayload, ...prev]);
    addCoins(5, 'Yangi so\'z qo\'shildi (+5 coin)');
    showToast(`"${newWordPayload.word}" so'zi qo'shildi`, 'success');

    // Background sync to server
    createWord(newWordPayload)
      .then(saved => {
        if (saved?.id && saved.id !== newWordPayload.id) {
          setWords(prev => prev.map(w => w.id === newWordPayload.id ? { ...w, id: saved.id } : w));
        }
      })
      .catch(err => {
        console.info("Serverga so'zni saqlash offline keshlandi:", err.message);
      });

    return newWordPayload;
  };

  // Import Words (Restore / Merge from backup)
  const importWords = async (newWords, replaceAll = false) => {
    if (!newWords || newWords.length === 0) return 0;

    const toAdd = replaceAll
      ? newWords
      : newWords.filter(w => !words.some(existing => existing.word.toLowerCase().trim() === w.word?.toLowerCase().trim()));

    const normalizedList = toAdd.map(item => normalizeWord({
      ...item,
      id: item.id || (Date.now() + Math.random()),
      word: (item.word || '').trim(),
      translation: (item.translation || '').trim(),
      transcription: item.transcription || `/${(item.word || '').toLowerCase()}/`,
      box: item.box || 1,
      nextReviewDate: item.nextReviewDate || new Date().toISOString(),
      reviewCount: item.reviewCount || 0,
      correctCount: item.correctCount || 0,
      incorrectCount: item.incorrectCount || 0,
      isFavorite: !!item.isFavorite,
      createdAt: item.createdAt || new Date().toISOString()
    }));

    if (replaceAll) {
      setWords(normalizedList);
    } else {
      setWords(prev => [...normalizedList, ...prev]);
    }

    showToast(`${normalizedList.length} ta so'z muvaffaqiyatli saqlandi!`, 'success');

    // Background sync to server
    for (const item of normalizedList) {
      createWord(item).catch(() => {});
    }

    return normalizedList.length;
  };

  // Bulk Add Words
  const bulkAddWords = async (rawText) => {
    if (!rawText || !rawText.trim()) return 0;

    const lines = rawText.split(/\r?\n/).filter(line => line.trim().length > 0);
    const addedList = [];

    for (const line of lines) {
      const parts = line.split(/[-–—:=,\t]/);
      if (parts.length >= 2) {
        const word = parts[0].trim();
        const translation = parts.slice(1).join(' ').trim();
        if (word && translation) {
          const item = normalizeWord({
            id: Date.now() + Math.random(),
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
          addedList.push(item);
          createWord(item).catch(() => {});
        }
      }
    }

    if (addedList.length > 0) {
      setWords(prev => [...addedList, ...prev]);
      const rewardCoins = addedList.length * 2;
      addCoins(rewardCoins, `${addedList.length} ta so'z qo'shildi (+${rewardCoins} coin)`);
      showToast(`${addedList.length} ta yangi so'z saqlandi!`, 'success');
      return addedList.length;
    }
    showToast("So'zlar formati mos kelmadi", 'error');
    return 0;
  };

  // Edit Word (Optimistic + Background API)
  const editWord = async (id, updatedFields) => {
    setWords(prev => prev.map(w => (w.id === id || String(w.id) === String(id)) ? { ...w, ...updatedFields } : w));
    showToast('So\'z yangilandi', 'success');

    updateWord(id, updatedFields).catch(err => {
      console.info("Serverda yangilash offline keshlandi:", err.message);
    });
    return updatedFields;
  };

  // Delete Word (Optimistic + Background API)
  const deleteWord = async (id) => {
    setWords(prev => prev.filter(w => w.id !== id && String(w.id) !== String(id)));
    showToast('So\'z o\'chirildi', 'info');

    apiDeleteWord(id).catch(err => {
      console.info("Serverdan o'chirish offline keshlandi:", err.message);
    });
  };

  // Toggle Favorite
  const toggleFavorite = async (id) => {
    const target = words.find(w => w.id === id || String(w.id) === String(id));
    if (!target) return;
    const nextFav = !target.isFavorite;
    setWords(prev => prev.map(w => (w.id === id || String(w.id) === String(id)) ? { ...w, isFavorite: nextFav } : w));
    showToast(nextFav ? 'Sevimlilarga qo\'shildi' : 'Sevimlilardan olindi', 'info');

    updateWord(id, { isFavorite: nextFav }).catch(() => {});
  };

  // Update Streak & Daily Activity
  const updateStreakOnActivity = () => {
    const today = new Date().toISOString().split('T')[0];
    setStreak(prev => {
      const lastDate = prev.lastActiveDate;
      let newCount = prev.count || 1;
      let reviewedToday = prev.reviewedToday || 0;

      if (!lastDate) {
        newCount = 1;
        reviewedToday = 1;
      } else if (lastDate === today) {
        reviewedToday += 1;
      } else {
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        if (lastDate === yesterday) {
          newCount += 1;
        } else {
          newCount = 1; // Streak reset if missed more than 1 day
        }
        reviewedToday = 1;
      }

      // Check if daily target achieved
      const target = user?.dailyGoal || 20;
      if (reviewedToday === target) {
        addCoins(20, 'Kunlik maqsad bajarildi (+20 bonus coin)');
        showToast(`🔥 Tabriklaymiz! Kunlik maqsad (${target} ta so'z) to'liq bajarildi!`, 'success');
      }

      return {
        count: newCount,
        lastActiveDate: today,
        reviewedToday
      };
    });
  };

  // Leitner Spaced Repetition Logic (Persists to API)
  const recordReviewResult = (wordId, quality) => {
    const word = words.find(w => w.id === wordId || String(w.id) === String(wordId));
    if (!word) return;

    let nextBox = word.box || 1;
    let isCorrect = true;

    if (quality === 'hard') {
      nextBox = 1; // reset to box 1 if hard
      isCorrect = false;
    } else if (quality === 'medium') {
      nextBox = Math.min(5, (word.box || 1) + 1);
    } else if (quality === 'easy') {
      nextBox = Math.min(5, (word.box || 1) + 1);
    }

    const daysToAdd = LEITNER_INTERVALS[nextBox - 1] || 1;
    const nextDate = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000).toISOString();

    const updatedFields = {
      box: nextBox,
      nextReviewDate: nextDate,
      reviewCount: (word.reviewCount || 0) + 1,
      correctCount: (word.correctCount || 0) + (isCorrect ? 1 : 0),
      incorrectCount: (word.incorrectCount || 0) + (isCorrect ? 0 : 1)
    };

    updateWord(wordId, updatedFields).catch(err => {
      console.error("Review natijasini serverga saqlashda xatolik:", err);
    });

    setWords(prev => prev.map(w => {
      if (w.id !== wordId && String(w.id) !== String(wordId)) return w;
      return { ...w, ...updatedFields };
    }));

    // Update streak & count today's reviews
    updateStreakOnActivity();

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
    setUser(prev => {
      const updated = { ...prev, ...data };
      if (updated.id) {
        authService.updateProfile(updated.id, data);
      }
      return updated;
    });
    showToast('Profil yangilandi', 'success');
  };

  // Delete Entire Account (Permanent removal)
  const deleteAccount = () => {
    if (user?.id) {
      authService.deleteAccount(user.id);
    }
    logoutUser();
    showToast('Hisobingiz butunlay o\'chirildi', 'info');
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      loginUser,
      logoutUser,
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
