# 📚 VocabReminder — "Yodlash emas, eslab qolish"

> **VocabReminder** — ingliz tilini o‘rganayotgan o‘zbek foydalanuvchilari uchun mo‘ljallangan, zamonaviy mobil-birinchi (Mobile-First) shaxsiy lug‘at va oraliq takrorlash (Spaced Repetition) tizimi.

---

## 💡 Asosiy Falsafa va «Zero Fake Data» Qoidasi

VocabReminder — bu tayyor so‘zlar bazasi **EMAS**. 
1. **0 dan boshlanadi:** Yangi foydalanuvchi akkauntida hech qanday oldindan yozilgan so‘zlar, demo ro‘yxatlar, soxta statistika yoki streak bo‘lmaydi.
2. **Faqat o‘z so‘zlari:** Foydalanuvchi kino ko‘rganda, kitob o‘qiyotganda yoki IELTS darsida yangi so‘z uchratgandagina uni ilovaga kiritadi.
3. **Imtihon faqat o‘z so‘zlaridan:** Ilovadagi mini-testlar, fleshkartalar va eslatmalar **FAQAT** foydalanuvchi kiritgan so‘zlardan tuziladi. Begona so‘zlar aralashmaydi.

---

## 🚀 Asosiy Imkoniyatlar (Features)

### 1. 📖 Lug‘at Boshqaruvi & Leitner Tizimi
- **Bittalab qo‘shish:** So‘z, tarjima, transkripsiya, misol gap, izoh va teglar (`#ielts`, `#kundalik`).
- **Ommaviy kiritish (Bulk Add):** 50 tagacha so‘zni matndan bittada nusxalab tashlash (`apple - olma`).
- **Leitner 5-quti tizimi:** 1, 3, 7, 14 va 30 kunlik intervallar orqali unutilmas xotiraga aylantirish.
- **Audio Talaffuz (TTS):** Web Speech API orqali toza inglizcha talaffuzni eshitish.
- **Teglar bo‘yicha saralash:** Mavzular bo‘yicha filtrlash.

### 2. 📂 Zaxira & Almashish (Eksport va Import)
- **Excel / CSV:** Lug‘atni jadval ko‘rinishida yuklab olish (o‘zbekcha harflar uchun UTF-8 BOM qo‘llab-quvvatlanadi).
- **JSON Full Backup:** Barcha qutilar va statistika bilan to‘liq zaxira fayl olish va boshqa qurilmaga tiklash.

### 3. ✍️ AI Writing Checker
- IELTS Task 1, Task 2 va CEFR insholari uchun yozma topshiriqlar.
- Jonli so‘z sanagich va mezonlar bo‘yicha (Task Achievement, Coherence, Lexical Resource, Grammar) tahlil.
- **Lug‘atga qo‘shish:** Inshodagi sodda so‘zlarni C1/B2 darajadagi akademik muqobillariga almashtirish va bitta tugma bilan shaxsiy lug‘atga kiritish.

### 4. 📲 PWA (Progressive Web App) & Oflayn Rejim
- `manifest.json` va `Service Worker` orqali ilovani telefonga mustaqil dastur sifatida o‘rnatish (*Add to Home Screen*).
- Internet o‘chib qolsa ham ilova to‘liq ishlaydi.

### 5. 🎯 Qo‘shimcha Bo‘limlar
- **Level Placement Test (A1–C2):** 15 ta bosqichma-bosqich savoldan iborat rasmiy CEFR daraja aniqlash testi va savollar tahlili.
- **Reading Section:** Savol-javobli va tushuntirishli matnlar.
- **Gamifikatsiya & Do‘kon:** Har bir takrorlangan va qo‘shilgan so‘z uchun tangalar (coinlar), sovg‘alar.
- **Tungi / Kunduzgi rejim (Dark / Light mode).**

---

## 🛠 Texnologiyalar Steki

- **Frontend:** React 19, Vite, Vanilla CSS Design System (Inter / Outfit / Plus Jakarta Sans)
- **Ikonkalar:** Lucide React
- **Effektlar:** Canvas Confetti
- **Arxitektura:** React Context (`AppContext.jsx`) + Service Layer (`storage.js`, `backupService.js`, `speech.js`, `supabase.js`)
- **Backend tayyorligi:** PostgreSQL + Supabase (schema `supabase/schema.sql` da to‘liq RLS bilan yozilgan).

---

## 💻 Ishga tushirish (Local Setup)

1. **Bog‘liqliklarni o‘rnatish:**
   ```bash
   npm install
   ```

2. **Dasturni ishga tushirish (Dev Server):**
   ```bash
   npm run dev
   ```

3. **Production build yaratish:**
   ```bash
   npm run build
   ```

---

## ☁️ Supabase Ma’lumotlar Bazasi O‘rnatish

Loyihani Supabase PostgreSQL bazasiga ulash uchun:
1. [supabase.com](https://supabase.com) dan yangi loyiha oching.
2. `SQL Editor` bo‘limiga kiring va [supabase/schema.sql](file:///c:/Users/AliCom/Desktop/VOCABreminder/supabase/schema.sql) faylidagi SQL kodni nusxalab yurgizing.
3. `.env` fayl yarating va kalitlarni kiriting:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Barcha jadvallarda Row Level Security (RLS) yoqilgan bo‘lib, har bir foydalanuvchi faqat o‘z ma’lumotlariga ruxsatga ega bo‘ladi.
