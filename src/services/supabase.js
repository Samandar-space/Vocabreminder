// VocabReminder - Supabase Cloud Synchronization Service
// Allows seamless integration with Supabase Auth & PostgreSQL

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
};

export const supabaseSync = {
  // Sync local words to Supabase
  syncWords: async (words, userId) => {
    if (!isSupabaseConfigured() || !userId) return false;

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/vocabulary?user_id=eq.${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${localStorage.getItem('vocab_supabase_token') || SUPABASE_ANON_KEY}`,
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(words.map(w => ({
          id: w.id.length === 36 ? w.id : undefined,
          user_id: userId,
          word: w.word,
          translation: w.translation,
          transcription: w.transcription,
          example: w.example,
          note: w.note,
          tag: w.tag,
          box: w.box,
          next_review_date: w.nextReviewDate,
          review_count: w.reviewCount,
          correct_count: w.correctCount,
          incorrect_count: w.incorrectCount,
          is_favorite: w.isFavorite
        })))
      });

      return response.ok;
    } catch {
      return false;
    }
  },

  // Fetch words from Supabase
  fetchWords: async (userId) => {
    if (!isSupabaseConfigured() || !userId) return null;

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/vocabulary?user_id=eq.${userId}&order=created_at.desc`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${localStorage.getItem('vocab_supabase_token') || SUPABASE_ANON_KEY}`
        }
      });

      if (!response.ok) return null;
      const data = await response.json();
      return data.map(item => ({
        id: item.id,
        word: item.word,
        translation: item.translation,
        transcription: item.transcription,
        example: item.example,
        note: item.note,
        tag: item.tag,
        box: item.box,
        nextReviewDate: item.next_review_date,
        reviewCount: item.review_count,
        correctCount: item.correct_count,
        incorrectCount: item.incorrect_count,
        isFavorite: item.is_favorite,
        createdAt: item.created_at
      }));
    } catch {
      return null;
    }
  }
};
