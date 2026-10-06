-- ============================================================
-- VocabReminder — Supabase PostgreSQL Production Schema
-- Tagline: "Yodlash emas, eslab qolish"
-- Strict Rule: Zero fake/default words. Every word belongs to a user.
-- ============================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USER PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT DEFAULT 'Foydalanuvchi',
  email TEXT,
  avatar TEXT,
  goal TEXT DEFAULT 'cefr', -- 'cefr' | 'ielts' | 'general'
  level TEXT DEFAULT 'B1',
  daily_goal INTEGER DEFAULT 20,
  is_pro BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. USER VOCABULARY (ONLY USER'S OWN WORDS)
CREATE TABLE IF NOT EXISTS public.vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  translation TEXT NOT NULL,
  transcription TEXT,
  example TEXT,
  note TEXT,
  tag TEXT,
  box INTEGER DEFAULT 1 CHECK (box >= 1 AND box <= 5), -- Leitner 5-box intervals
  next_review_date TIMESTAMPTZ DEFAULT NOW(),
  review_count INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  incorrect_count INTEGER DEFAULT 0,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fast lookup indexes for Leitner reviews and searches
CREATE INDEX IF NOT EXISTS idx_vocab_user_due ON public.vocabulary (user_id, next_review_date);
CREATE INDEX IF NOT EXISTS idx_vocab_user_box ON public.vocabulary (user_id, box);
CREATE INDEX IF NOT EXISTS idx_vocab_user_favorite ON public.vocabulary (user_id, is_favorite);
CREATE INDEX IF NOT EXISTS idx_vocab_word_search ON public.vocabulary (user_id, word);

-- 4. USER STATS & GAMIFICATION
CREATE TABLE IF NOT EXISTS public.user_stats (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  coins INTEGER DEFAULT 50, -- 50 coins welcome bonus
  streak_count INTEGER DEFAULT 0,
  last_active_date DATE DEFAULT CURRENT_DATE,
  total_words_reviewed INTEGER DEFAULT 0,
  total_correct_reviews INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. WRITING SUBMISSIONS (AI CHECK HISTORY)
CREATE TABLE IF NOT EXISTS public.writing_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_id TEXT NOT NULL,
  task_title TEXT NOT NULL,
  essay_text TEXT NOT NULL,
  word_count INTEGER NOT NULL,
  score INTEGER NOT NULL,
  badge TEXT NOT NULL,
  criteria_feedback JSONB,
  recommended_words JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_writing_user ON public.writing_submissions (user_id, created_at DESC);

-- 6. ROW LEVEL SECURITY (RLS) - CRITICAL FOR DATA ISOLATION
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writing_submissions ENABLE ROW LEVEL SECURITY;

-- Profiles RLS
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Vocabulary RLS (Strict user isolation: cannot read, write, or delete another user's words)
CREATE POLICY "Users can only access their own vocabulary"
  ON public.vocabulary FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User Stats RLS
CREATE POLICY "Users can manage their own stats"
  ON public.user_stats FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Writing Submissions RLS
CREATE POLICY "Users can manage their own writing submissions"
  ON public.writing_submissions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 7. TRIGGER: AUTOMATIC PROFILE & STATS CREATION ON AUTH SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Foydalanuvchi')
  );

  INSERT INTO public.user_stats (user_id, coins, streak_count)
  VALUES (NEW.id, 50, 0);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
