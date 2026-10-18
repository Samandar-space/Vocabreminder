// VocabReminder - Smart Dictionary & Translation Service
// Provides instant auto-completion, transcription, example sentences, and Uzbek translations without requiring external API keys.

const LOCAL_FALLBACKS = {
  'apple': {
    translation: 'olma',
    transcription: '/ˈæp.əl/',
    example: 'I eat a fresh green apple every morning.',
    partOfSpeech: 'noun',
    note: 'Meva'
  },
  'book': {
    translation: 'kitob',
    transcription: '/bʊk/',
    example: 'She is reading an interesting history book.',
    partOfSpeech: 'noun',
    note: 'O\'qish'
  },
  'maintain': {
    translation: 'saqlamoq, davom ettirmoq',
    transcription: '/meɪnˈteɪn/',
    example: 'We must maintain high quality standards.',
    partOfSpeech: 'verb',
    note: 'IELTS writing uchun muhim'
  },
  'acquire': {
    translation: 'orttirmoq, ega bo\'lmoq',
    transcription: '/əˈkwaɪər/',
    example: 'Students acquire valuable skills during internships.',
    partOfSpeech: 'verb',
    note: 'Akademik so\'z'
  },
  'consistent': {
    translation: 'izchil, barqaror',
    transcription: '/kənˈsɪs.tənt/',
    example: 'Consistent practice is key to mastering vocabulary.',
    partOfSpeech: 'adjective',
    note: 'Sifat'
  },
  'evaluate': {
    translation: 'baholamoq',
    transcription: '/ɪˈvæl.ju.eɪt/',
    example: 'The committee will evaluate our project proposal.',
    partOfSpeech: 'verb',
    note: 'Fe\'l'
  },
  'significant': {
    translation: 'muhim, ahamiyatli',
    transcription: '/sɪɡˈnɪf.ɪ.kənt/',
    example: 'There was a significant improvement in test results.',
    partOfSpeech: 'adjective',
    note: 'Ko\'p uchraydi'
  },
  'essential': {
    translation: 'zarur, o\'ta muhim',
    transcription: '/ɪˈsen.ʃəl/',
    example: 'Water is essential for all living creatures.',
    partOfSpeech: 'adjective',
    note: 'B2 daraja'
  },
  'achieve': {
    translation: 'erishmoq',
    transcription: '/əˈtʃiːv/',
    example: 'You will achieve your goals with dedication.',
    partOfSpeech: 'verb',
    note: 'Fe\'l'
  },
  'challenge': {
    translation: 'sinov, qiyinchilik',
    transcription: '/ˈtʃæl.ɪndʒ/',
    example: 'Every challenge is an opportunity to grow.',
    partOfSpeech: 'noun',
    note: 'Ot / Fe\'l'
  },
  'opportunity': {
    translation: 'imkoniyat',
    transcription: '/ˌɒp.əˈtʃuː.nə.ti/',
    example: 'Do not miss this great study opportunity.',
    partOfSpeech: 'noun',
    note: 'Nom'
  },
  'improve': {
    translation: 'yaxshilamoq',
    transcription: '/ɪmˈpruːv/',
    example: 'Practice daily to improve your speaking.',
    partOfSpeech: 'verb',
    note: 'Fe\'l'
  }
};

/**
 * Clean HTML tags from text (e.g. <b>word</b> -> word)
 */
const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
};

/**
 * Lookup English word and fetch Uzbek translation, IPA transcription, and example sentence.
 * @param {string} wordInput
 * @returns {Promise<{word: string, translation: string, transcription: string, example: string, partOfSpeech: string, alternatives: string[]}>}
 */
export const lookupEnglishWord = async (wordInput) => {
  const cleanWord = (wordInput || '').trim().toLowerCase();
  if (!cleanWord) {
    throw new Error('So\'z kiritilmadi');
  }

  // 1. Check local fallbacks for instant result
  if (LOCAL_FALLBACKS[cleanWord]) {
    const local = LOCAL_FALLBACKS[cleanWord];
    return {
      word: cleanWord,
      translation: local.translation,
      transcription: local.transcription,
      example: local.example,
      partOfSpeech: local.partOfSpeech || 'general',
      alternatives: [local.translation]
    };
  }

  // 2. Fetch live data from Google Translate & Lexical database
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=uz&dt=t&dt=bd&dt=rm&dt=ex&dt=md&q=${encodeURIComponent(cleanWord)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Tarjima serveri javob bermadi (${res.status})`);
    }

    const data = await res.json();
    // Structure:
    // data[0][0][0] -> primary translated text
    // data[0][1][3] or data[0][0][3] -> phonetic transcription
    // data[1] -> dictionary breakdown: [[partOfSpeech, [translations...]], ...]
    // data[13] -> examples: [[["example text with <b>word</b>", ...]], ...]

    let translation = '';
    let transcription = '';
    let example = '';
    let partOfSpeech = '';
    const alternatives = [];

    // Extract primary translation
    if (data[0] && data[0][0] && data[0][0][0]) {
      translation = data[0][0][0].toLowerCase().trim();
    }

    // Extract transcription
    if (data[0]) {
      for (const item of data[0]) {
        if (item && item[3]) {
          transcription = `/${item[3]}/`;
          break;
        }
      }
    }

    // Extract parts of speech & alternative translations
    if (Array.isArray(data[1])) {
      const firstGroup = data[1][0];
      if (firstGroup) {
        partOfSpeech = firstGroup[0] || '';
        if (Array.isArray(firstGroup[1])) {
          firstGroup[1].slice(0, 5).forEach((item) => {
            if (item && typeof item === 'string' && !alternatives.includes(item)) {
              alternatives.push(item);
            }
          });
        }
      }
    }

    // Extract real example sentence
    if (Array.isArray(data[13]) && data[13][0] && Array.isArray(data[13][0][0])) {
      const rawExample = data[13][0][0][0];
      if (rawExample) {
        example = stripHtml(rawExample);
      }
    }

    // If no example in data[13], check data[12] or definitions
    if (!example && Array.isArray(data[12])) {
      for (const defGroup of data[12]) {
        if (Array.isArray(defGroup[1])) {
          for (const def of defGroup[1]) {
            if (def && def[2]) {
              example = stripHtml(def[2]);
              break;
            }
          }
        }
        if (example) break;
      }
    }

    // Final fallback for example if still empty
    if (!example) {
      example = `She learned the word "${cleanWord}" today.`;
    }

    // If alternatives didn't capture the main translation, put it first
    if (translation && !alternatives.includes(translation)) {
      alternatives.unshift(translation);
    }

    return {
      word: cleanWord,
      translation: translation || cleanWord,
      transcription: transcription || `/${cleanWord}/`,
      example,
      partOfSpeech: partOfSpeech || 'general',
      alternatives
    };
  } catch (error) {
    // If offline or request fails, return clean structure without throwing
    return {
      word: cleanWord,
      translation: '',
      transcription: `/${cleanWord}/`,
      example: `This is an example sentence with ${cleanWord}.`,
      partOfSpeech: 'general',
      alternatives: []
    };
  }
};
