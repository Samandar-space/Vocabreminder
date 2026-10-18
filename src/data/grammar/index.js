import { a1Topics } from './a1.js';
import { a2Topics } from './a2.js';
import { b1Topics } from './b1.js';
import { b2Topics } from './b2.js';
import { c1Topics } from './c1.js';
import { c2Topics } from './c2.js';

// 6 ta CEFR darajasining barcha grammatik mavzulari (Jami 77 ta mavzu)
export const grammarData = {
  A1: a1Topics,
  A2: a2Topics,
  B1: b1Topics,
  B2: b2Topics,
  C1: c1Topics,
  C2: c2Topics
};

// Darajalar metama'lumotlari (Wizard va Yo'l xaritasi uchun)
export const grammarLevels = [
  {
    id: 'A1',
    name: 'A1 (Boshlang\'ich)',
    titleUz: 'Boshlang\'ich daraja',
    order: 1,
    tag: 'Beginner',
    description: 'Oddiy kundalik iboralar va asosiy tanishuv muloqotlari',
    fullDescription: 'A1 darajasi ingliz tilining mustahkam poydevori hisoblanadi. Siz o\'zingiz haqingizda gapirish, oddiy savollarga javob berish va kundalik eng asosiy ehtiyojlarni ifodalashni to\'liq o\'rganasiz.',
    estimatedHours: '60-80 soat',
    color: '#10B981', // emerald
    badgeColor: 'rgba(16, 185, 129, 0.12)',
    badgeBorder: 'rgba(16, 185, 129, 0.3)',
    topicCount: a1Topics.length
  },
  {
    id: 'A2',
    name: 'A2 (Elementar)',
    titleUz: 'Elementar daraja',
    order: 2,
    tag: 'Elementary',
    description: 'Tanish mavzularda axborot almashish, xaridlar va sayohat',
    fullDescription: 'A2 darajasi kundalik vaziyatlarda (do\'kon, transport, oila, shaxsiy qiziqishlar) o\'zingizni bemalol ifodalash, o\'tgan zamon xotiralari va kelasi rejalarni to\'g\'ri bayon etish imkonini beradi.',
    estimatedHours: '90-120 soat',
    color: '#06B6D4', // cyan
    badgeColor: 'rgba(6, 182, 212, 0.12)',
    badgeBorder: 'rgba(6, 182, 212, 0.3)',
    topicCount: a2Topics.length
  },
  {
    id: 'B1',
    name: 'B1 (O\'rta)',
    titleUz: 'O\'rta daraja',
    order: 3,
    tag: 'Intermediate',
    description: 'Kundalik muloqot va sayohatda o\'zini erkin his qilish',
    fullDescription: 'B1 darajasi mustaqil til foydalanuvchisi bosqichidir. Siz o\'z fikrlaringiz, orzu va rejalarining sabablarini erkin tushuntira olasiz, sayohatdagi deyarli har qanday vaziyatdan mustaqil chiqa olasiz.',
    estimatedHours: '120-160 soat',
    color: '#8B5CF6', // purple
    badgeColor: 'rgba(139, 92, 246, 0.12)',
    badgeBorder: 'rgba(139, 92, 246, 0.3)',
    topicCount: b1Topics.length
  },
  {
    id: 'B2',
    name: 'B2 (O\'rtadan yuqori)',
    titleUz: 'O\'rtadan yuqori daraja',
    order: 4,
    tag: 'Upper-Intermediate',
    description: 'Erkin va ravon muloqot, ta\'lim va xalqaro faoliyatda ishonch',
    fullDescription: 'B2 darajasi xalqaro ta\'lim (IELTS 6.0-6.5) va xorijiy kompaniyalarda ishlash uchun eshik ochadi. Siz mavhum va texnik mavzulardagi murakkab matnlar mohiyatini tushunasiz va xorijliklar bilan qiyinchiliksiz muloqot qilasiz.',
    estimatedHours: '160-220 soat',
    color: '#EC4899', // pink
    badgeColor: 'rgba(236, 72, 153, 0.12)',
    badgeBorder: 'rgba(236, 72, 153, 0.3)',
    topicCount: b2Topics.length
  },
  {
    id: 'C1',
    name: 'C1 (Ilg\'or)',
    titleUz: 'Ilg\'or daraja',
    order: 5,
    tag: 'Advanced',
    description: 'Akademik va professional faoliyatda moslashuvchan, mukammal muloqot',
    fullDescription: 'C1 darajasi oliy akademik va professional mahorat bosqichi (IELTS 7.0-8.0). Siz matndagi yashirin ma\'nolarni (subtext) ilg\'aysiz, murakkab mavzularda ravon, ravshan va yaxlit tuzilgan matnlar tuza olasiz.',
    estimatedHours: '200-280 soat',
    color: '#F59E0B', // amber
    badgeColor: 'rgba(245, 158, 11, 0.12)',
    badgeBorder: 'rgba(245, 158, 11, 0.3)',
    topicCount: c1Topics.length
  },
  {
    id: 'C2',
    name: 'C2 (Mukammal)',
    titleUz: 'Mukammal daraja',
    order: 6,
    tag: 'Proficiency',
    description: 'Ona tilidek ravonlik, eng nozik uslubiy nuanslarni boshqarish',
    fullDescription: 'C2 darajasi tilni mukammal darajada egallaganlik belgisi (IELTS 8.5-9.0). Siz eshitgan yoki o\'qigan har qanday murakkab fikrni osonlikcha umumlashtira olasiz, o\'ta nozik uslubiy, ritorik va kinoyali nuanslarni erkin qo\'llaysiz.',
    estimatedHours: '250-350 soat',
    color: '#EF4444', // red
    badgeColor: 'rgba(239, 68, 68, 0.12)',
    badgeBorder: 'rgba(239, 68, 68, 0.3)',
    topicCount: c2Topics.length
  }
];

export const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// Daraja tartib raqami
export const getLevelOrder = (level) => {
  const index = LEVEL_ORDER.indexOf(level);
  return index >= 0 ? index + 1 : 1;
};

// Kumulyativ darajalar ro'yxatini olish (masalan, B1 -> ['A1', 'A2', 'B1'])
export const getCumulativeLevels = (targetLevel) => {
  const targetIndex = LEVEL_ORDER.indexOf(targetLevel);
  if (targetIndex === -1) return ['A1'];
  return LEVEL_ORDER.slice(0, targetIndex + 1);
};

// Tanlangan darajagacha bo'lgan barcha mavzular
export const getCumulativeTopics = (targetLevel) => {
  const levels = getCumulativeLevels(targetLevel);
  return levels.flatMap(lvl => grammarData[lvl] || []);
};

// Tanlangan darajagacha bo'lgan barcha zamonlar (Tenses) daraja bo'yicha guruhlangan
export const getCumulativeTensesGrouped = (targetLevel) => {
  const levels = getCumulativeLevels(targetLevel);
  return levels.map(lvl => ({
    level: lvl,
    tenses: (grammarData[lvl] || []).filter(topic => topic.isTense)
  })).filter(group => group.tenses.length > 0);
};

// Tanlangan darajagacha bo'lgan boshqa muhim mavzular daraja bo'yicha guruhlangan
export const getCumulativeOtherTopicsGrouped = (targetLevel) => {
  const levels = getCumulativeLevels(targetLevel);
  return levels.map(lvl => ({
    level: lvl,
    topics: (grammarData[lvl] || []).filter(topic => !topic.isTense)
  })).filter(group => group.topics.length > 0);
};

// Tanlangan daraja uchun bosqichma-bosqich o'rganish rejasi (Roadmap Steps)
export const getRoadmapMilestones = (targetLevel) => {
  const milestones = [
    {
      level: 'A1',
      step: 1,
      title: 'Poydevor qurish: Asosiy shaxslar, To be va Hozirgi zamon',
      description: 'Shaxs olmoshlari, "To be" fe\'li, Present Simple va artikllar orqali oddiy gaplar qurishni o\'zlashtiring.',
      focusTopics: ['To be (am/is/are)', 'Articles: a/an/the', 'Present Simple', 'Subject pronouns']
    },
    {
      level: 'A1',
      step: 2,
      title: 'Kundalik olam: Borlik, egalik va harakatdagi fe\'llar',
      description: 'There is/are, Have got, Present Continuous va qobiliyat (Can/Can\'t) bilan o\'z atrofingizni tasvirlang.',
      focusTopics: ['There is / There are', 'Have got / Has got', 'Present Continuous', 'Can / Can\'t']
    },
    {
      level: 'A2',
      step: 3,
      title: 'O\'tmish va kelajak: Voqealarni hikoya qilish',
      description: 'Past Simple to\'g\'ri/noto\'g\'ri fe\'llari, Past Continuous va Future (will vs going to) orqali vaqt bo\'ylab erkin harakatlaning.',
      focusTopics: ['Past Simple', 'Past Continuous', 'Future: will va be going to', 'Comparatives va Superlatives']
    },
    {
      level: 'A2',
      step: 4,
      title: 'Dastlabki shartlar va mukammallik sari kirish',
      description: 'Modallar (must, should), Present Perfect kirish va First Conditional orqali murakkabroq fikrlashga o\'ting.',
      focusTopics: ['Modal verbs', 'Present Perfect (kirish)', 'Zero va First Conditional']
    },
    {
      level: 'B1',
      step: 5,
      title: 'Mustaqillik bosqichi: Zamonlar sintezi va Majhul nisbat',
      description: 'Present Perfect vs Past Simple farqi, Passive Voice va O\'zlashtirma gap (Reported Speech)ni puxta egallang.',
      focusTopics: ['Present Perfect vs Past Simple', 'Passive Voice', 'Reported Speech', 'Second Conditional']
    },
    {
      level: 'B1',
      step: 6,
      title: 'Chuqurroq mantiq: Ergash gaplar va taxminlar',
      description: 'Defining Relative Clauses, Modals of deduction va Gerund vs Infinitive qoidalarini aniq ajrating.',
      focusTopics: ['Defining Relative Clauses', 'Modals of deduction', 'Gerund vs Infinitive']
    },
    {
      level: 'B2',
      step: 7,
      title: 'Akademik va murakkab sintaksis',
      description: 'Third Conditional, Mixed Conditionals, barcha zamonlardagi passiv va Causative tuzilmalarini birlashtiring.',
      focusTopics: ['Third & Mixed Conditionals', 'Complex Passive', 'Wish / If only', 'Discourse markers']
    },
    {
      level: 'C1',
      step: 8,
      title: 'Ekspressivlik va Ritorik mahorat',
      description: 'Grammatik inversiya, Cleft sentences, Subjunctive va Advanced Participle Clauses orqali tildagi eng yuqori uslubiy jozibani hosil qiling.',
      focusTopics: ['Inversion', 'Cleft sentences', 'Subjunctive Mood', 'Advanced Conditionals']
    },
    {
      level: 'C2',
      step: 9,
      title: 'Mukammallik cho\'qqisi: Nuanslar va Uslubiy moslashuvchanlik',
      description: 'Badiiy inversiya, register shifting, fe\'l jihatlarining nozik farqlari va idiomatik qoliplarni ona tilidek erkin boshqaring.',
      focusTopics: ['Advanced Inversion', 'Register Shifting', 'Tense & Aspect Nuances', 'Stylistic Devices']
    }
  ];

  const targetIdx = LEVEL_ORDER.indexOf(targetLevel);
  return milestones.filter(m => LEVEL_ORDER.indexOf(m.level) <= targetIdx);
};

// Barcha mavzularni tekshirish uchun yagona ro'yxat
export const getAllTopics = () => {
  return [
    ...a1Topics,
    ...a2Topics,
    ...b1Topics,
    ...b2Topics,
    ...c1Topics,
    ...c2Topics
  ];
};

// Topic ID bo'yicha topish
export const getTopicById = (id) => {
  return getAllTopics().find(t => t.id === id);
};
