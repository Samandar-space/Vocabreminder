// VocabReminder - Real Web Push & Mobile Notification Service
export const notificationService = {
  // Check if browser supports notifications
  isSupported() {
    return 'Notification' in window && 'serviceWorker' in navigator;
  },

  // Get current permission status
  getPermission() {
    if (!('Notification' in window)) return 'unsupported';
    return Notification.permission;
  },

  // Request user permission
  async requestPermission() {
    if (!('Notification' in window)) {
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch {
      return false;
    }
  },

  // Show rich notification with a word (Mobile Service Worker compliant)
  async showWordNotification(word) {
    if (!this.isSupported()) return false;
    if (Notification.permission !== 'granted') {
      const granted = await this.requestPermission();
      if (!granted) return false;
    }

    const wordText = word?.word || 'lug\'at';
    const title = '⚡ VocabReminder — So\'zni eslaysizmi?';
    const body = word?.word 
      ? `"${word.word}" so'zining ma'nosini eslaysizmi? Ekranga bosing va tekshiring!`
      : 'Bugun yangi so\'zlarni takrorlash vaqti keldi! Ekranga bosing va boshlang.';

    const options = {
      body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: `vocab-reminder-${word?.id || Date.now()}`,
      renotify: true,
      vibrate: [200, 100, 200],
      data: {
        wordId: word?.id || null,
        word: word?.word || '',
        url: word?.id ? `/?popup=quiz&wordId=${encodeURIComponent(word.id)}` : '/?popup=quiz'
      },
      actions: [
        { action: 'quiz', title: '🎯 Javob berish' }
      ]
    };

    // Prefer ServiceWorkerRegistration.showNotification (Standard for mobile PWAs)
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        if (registration && registration.showNotification) {
          await registration.showNotification(title, options);
          return true;
        }
      } catch (err) {
        console.warn('Service worker notification failed, trying fallback', err);
      }
    }

    // Desktop browser fallback
    try {
      new Notification(title, options);
      return true;
    } catch (e) {
      console.warn('Fallback notification failed', e);
      return false;
    }
  }
};
