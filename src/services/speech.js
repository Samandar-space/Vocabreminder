// Text-to-Speech & Speech Recognition Service using Browser Native APIs
export const speechService = {
  // Pronounce word with UK or US accent
  speak(text, lang = 'en-US') {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      return false;
    }

    window.speechSynthesis.cancel(); // cancel previous speaking

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9; // natural comfortable pace
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

  // Check pronunciation via Speech Recognition (if browser supports WebKitSpeechRecognition)
  listenForSpeech(expectedWord, onResult, onError) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      onError('Brauzeringiz ovoz yozishni qo\'llab-quvvatlamaydi (Chrome tavsiya etiladi).');
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    recognition.onresult = (event) => {
      const heard = event.results[0][0].transcript.trim().toLowerCase();
      const target = expectedWord.trim().toLowerCase();
      const isCorrect = heard === target || heard.includes(target) || target.includes(heard);
      onResult({ heard, isCorrect });
    };

    recognition.onerror = (event) => {
      onError(event.error || 'Ovozni eshitishda xatolik yuz berdi');
    };

    recognition.start();
    return recognition;
  }
};
