// Text-to-Speech & Speech Recognition Service using Browser Native APIs
export const speechService = {
  // Pronounce word with UK or US accent and optional speed rate
  speak(text, lang = 'en-US', rate = 0.9) {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      return false;
    }

    window.speechSynthesis.cancel(); // cancel previous speaking

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate; // natural comfortable pace (or slow for dictation)
    utterance.pitch = 1.0;

    // Pick a high quality natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith(lang.slice(0, 2)) && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  },

  // Check pronunciation or translation via Speech Recognition
  listenForSpeech(expectedWords, onResult, onError, lang = 'en-US') {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      onError('Brauzeringiz ovoz yozishni qo\'llab-quvvatlamaydi (Chrome/Edge tavsiya etiladi).');
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;

    // expectedWords can be a single string or an array of valid answers
    const targetList = Array.isArray(expectedWords)
      ? expectedWords.map(w => (w || '').trim().toLowerCase())
      : [(expectedWords || '').trim().toLowerCase()];

    recognition.onresult = (event) => {
      const heard = (event.results[0][0].transcript || '').trim().toLowerCase();
      
      // Check if heard speech matches any target or contains it
      const isCorrect = targetList.some(target => {
        if (!target) return false;
        return heard === target || heard.includes(target) || target.includes(heard);
      });

      onResult({ heard, isCorrect });
    };

    recognition.onerror = (event) => {
      // Don't error out on intentional abort or no-speech
      if (event.error === 'no-speech' || event.error === 'aborted') {
        return;
      }
      onError(event.error || 'Ovozni eshitishda xatolik yuz berdi');
    };

    try {
      recognition.start();
    } catch {
      // If already started, ignore
    }

    return recognition;
  }
};
