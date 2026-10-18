// A2 darajasi - 14 ta asosiy grammatik mavzu
export const a2Topics = [
  {
    id: 'a2_1',
    level: 'A2',
    title: 'Past Simple',
    titleUz: 'Oddiy o\'tgan zamon (Regular & Irregular fe\'llar)',
    isTense: true,
    summary: 'O\'tgan zamonda aniq bir vaqtda boshlanib tugagan ish-harakatlar va tarixiy voqealarni ifodalash uchun ishlatiladi.',
    usage: [
      'O\'tmishda tugallangan aniq harakat: I visited Bukhara last summer.',
      'O\'tmishdagi ketma-ket voqealar: He woke up, brushed his teeth and left.',
      'O\'tmishdagi odatlar: When I was a child, I played outside every day.',
      'Signal so\'zlar: yesterday, last night/week/year, ... ago, in 2020.'
    ],
    formula: {
      affirmative: 'Subject + V2 (Regular: fe\'l + -ed / Irregular: maxsus shakl: go→went, see→saw)',
      negative: 'Subject + did not (didn\'t) + V1 (fe\'lning boshlang\'ich shakli: She didn\'t go)',
      question: 'Did + Subject + V1? (Did you see that movie? Yes, I did. / No, I didn\'t.)'
    },
    examples: [
      { en: 'We visited the Registan square last month.', uz: 'Biz o\'tgan oyda Registon maydoniga tashrif buyurdik.' },
      { en: 'She bought a new dress two days ago.', uz: 'U ikki kun oldin yangi ko\'ylak sotib oldi.' },
      { en: 'I didn\'t sleep well yesterday night.', uz: 'Men kecha tunda yaxshi uxlamadim.' },
      { en: 'Did you finish your project on time?', uz: 'Loyihangizni o\'z vaqtida tugatdingizmi?' },
      { en: 'They went to school by bus this morning.', uz: 'Ular bugun ertalab maktabga avtobusda borishdi.' },
      { en: 'He arrived at the airport ten minutes ago.', uz: 'U aeroportga o\'n daqiqa oldin yetib keldi.' },
      { en: 'What did you do last weekend?', uz: 'O\'tgan dam olish kunlarida nima qildingiz?' },
      { en: 'The ancient Silk Road connected East and West.', uz: 'Qadimiy Buyuk Ipak Yo\'li Sharq va G\'arbni bog\'lagan.' }
    ],
    mistakes: [
      { wrong: 'I didn\'t went to school.', correct: 'I didn\'t go to school.', note: '"Didn\'t" kelsa, asosiy fe\'l 2-shaklda emas, boshlang\'ich 1-shaklda (go) bo\'ladi.' },
      { wrong: 'She buyed a car.', correct: 'She bought a car.', note: '"Buy" noto\'g\'ri fe\'l, unga "-ed" qo\'shilmaydi, o\'zagi o\'zgaradi.' },
      { wrong: 'Did you watched the news?', correct: 'Did you watch the news?', note: '"Did" bor joyda fe\'lga "-ed" qo\'shilmaydi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi aniq o\'tgan zamon (-di, -dim, -ding) ga to\'liq mos keladi (bordim, ko\'rdim).',
    tip: '💡 Darak gapda: V2 (went, played). Inkor va savolda "did" kelishi bilan fe\'l 1-shaklga qaytadi (didn\'t go, Did you go?).',
    exercises: [
      {
        question: 'Yesterday, she _____ a letter to her friend.',
        options: ['write', 'wrote', 'written', 'writing'],
        answer: 1,
        explanation: 'O\'tgan zamon darak gapida "write" fe\'lining 2-shakli "wrote".'
      },
      {
        question: 'They _____ to the party last night.',
        options: ['didn\'t went', 'didn\'t go', 'don\'t go', 'weren\'t go'],
        answer: 1,
        explanation: 'Inkor shakl: "didn\'t" + fe\'lning 1-shakli "go".'
      },
      {
        question: 'Where _____ you spend your last vacation?',
        options: ['do', 'did', 'were', 'have'],
        answer: 1,
        explanation: 'O\'tgan zamon so\'rog\'i "did" yordamchi fe\'li bilan yasaladi.'
      },
      {
        question: 'He _____ his keys twenty minutes ago.',
        options: ['lost', 'losed', 'lose', 'has lost'],
        answer: 0,
        explanation: '"Lose" noto\'g\'ri fe\'l, 2-shakli "lost".'
      },
      {
        question: 'Did you enjoy the concert? — Yes, I _____.',
        options: ['did', 'enjoyed', 'do', 'was'],
        answer: 0,
        explanation: 'Qisqa tasdiq javobi: "Yes, I did".'
      }
    ]
  },
  {
    id: 'a2_2',
    level: 'A2',
    title: 'Past Continuous',
    titleUz: 'O\'tgan davomli zamon (O\'tmishdagi jarayon)',
    isTense: true,
    summary: 'O\'tmishdagi ma\'lum bir paytda yoki boshqa bir qisqa harakat sodir bo\'layotgan vaqtda davom etayotgan jarayonni bildiradi.',
    usage: [
      'O\'tmishda aniq soatda davom etayotgan ish: At 8:00 PM yesterday, I was doing my homework.',
      'Bitta uzoq jarayonni qisqa harakat bo\'lganda: While I was cooking, the doorbell rang.',
      'O\'tmishda bir vaqtning o\'zida parallel davom etgan ikki ish: While she was reading, he was listening to music.',
      'Signal so\'zlar: while, as, at 5 o\'clock yesterday, all day yesterday.'
    ],
    formula: {
      affirmative: 'Subject + was / were + V-ing (I/He/She/It was reading | You/We/They were reading)',
      negative: 'Subject + wasn\'t / weren\'t + V-ing (I wasn\'t sleeping)',
      question: 'Was / Were + Subject + V-ing? (Were you sleeping when I called?)'
    },
    examples: [
      { en: 'I was sleeping when the earthquake happened.', uz: 'Zilzila bo\'lgan vaqtda men uxlayotgan edim.' },
      { en: 'She was driving home at 6 o\'clock yesterday.', uz: 'Kecha soat 6 da u mashinada uyiga ketayotgan edi.' },
      { en: 'They were having dinner when the lights went out.', uz: 'Chiroq o\'chib qolganda ular kechki ovqatni tanovul qilishayotgan edi.' },
      { en: 'What were you doing all afternoon?', uz: 'Kuni bo\'yi tushdan keyin nima qilayotgan edingiz?' },
      { en: 'He wasn\'t paying attention during the lecture.', uz: 'Leksiya paytida u diqqatini qaratmayotgan edi.' },
      { en: 'While my mother was cooking, I was cleaning my room.', uz: 'Onam ovqat pishirayotgan paytda, men xonamni tozalayotgan edim.' },
      { en: 'It was raining heavily when we left the hotel.', uz: 'Mehmonxonadan chiqqanimizda yomg\'ir kuchli yog\'ayotgan edi.' },
      { en: 'Were they waiting for the train for a long time?', uz: 'Ular poyezdni uzoq vaqt kutishayotgan edimi?' }
    ],
    mistakes: [
      { wrong: 'I was sleep when you called.', correct: 'I was sleeping when you called.', note: 'Fe\'lga albatta "-ing" qo\'shilishi kerak.' },
      { wrong: 'We was walking in the park.', correct: 'We were walking in the park.', note: '"We, you, they" olmoshlari bilan "were" bo\'ladi.' },
      { wrong: 'When I was cooking, my friend arrived.', correct: 'While I was cooking... (yoki When my friend arrived, I was cooking).', note: 'Uzoq davom etuvchi qism "while" bilan kelishi ma\'qul.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...-ayotgan edim / ...-ayotgan edi" shakliga to\'g\'ri keladi (o\'qiyotgan edim, ketayotgan edi).',
    tip: '💡 Uzoq jarayon: was/were + V-ing (Past Continuous). Uni to\'satdan bo\'lib qo\'ygan qisqa harakat: V2 (Past Simple).',
    exercises: [
      {
        question: 'At 10:00 PM last night, I _____ for my exam.',
        options: ['study', 'was studying', 'studied', 'were studying'],
        answer: 1,
        explanation: 'Kecha kechqurun aniq soatdagi jarayon: "I was studying".'
      },
      {
        question: 'They _____ tennis when it started to rain.',
        options: ['played', 'were playing', 'was playing', 'are playing'],
        answer: 1,
        explanation: '"They" bilan "were playing" to\'g\'ri keladi.'
      },
      {
        question: 'What _____ you doing when I phoned you?',
        options: ['were', 'was', 'did', 'are'],
        answer: 0,
        explanation: '"You" bilan so\'roq yordamchi fe\'li "were".'
      },
      {
        question: 'She _____ television, she was reading a novel.',
        options: ['wasn\'t watching', 'weren\'t watching', 'didn\'t watching', 'not watching'],
        answer: 0,
        explanation: '"She" uchun inkor shakli "wasn\'t watching".'
      },
      {
        question: 'While we _____ in the park, we saw an unusual bird.',
        options: ['walked', 'were walking', 'was walking', 'walk'],
        answer: 1,
        explanation: '"While" dan keyin o\'tgan davomli zamon: "were walking".'
      }
    ]
  },
  {
    id: 'a2_3',
    level: 'A2',
    title: 'Future: will vs be going to',
    titleUz: 'Kelasi zamon: Will va Be going to farqi',
    isTense: true,
    summary: 'Kelajakdagi harakatlarni aytishning ikki asosiy yo\'li: "will" (to\'satdan qaror, taxmin) va "be going to" (oldindan rejalashtirilgan niyat, ko\'rinib turgan dalil).',
    usage: [
      '"Will" — gapirish paytida to\'satdan qabul qilingan qaror: It\'s hot. I will open the window.',
      '"Will" — shaxsiy fikr va taxminlar: I think it will rain tomorrow.',
      '"Be going to" — oldindan tuzilgan reja va niyat: I am going to study abroad next year.',
      '"Be going to" — hozir ko\'z oldingizda ko\'rinib turgan dalilga asoslangan bashorat: Look at those black clouds! It is going to rain.'
    ],
    formula: {
      affirmative: 'Will: Subject + will + V1 | Be going to: Subject + am/is/are + going to + V1',
      negative: 'Subject + won\'t (will not) + V1 | Subject + am/is/are + not + going to + V1',
      question: 'Will you come? | Are you going to buy it?'
    },
    examples: [
      { en: 'I am hungry. I will make a sandwich.', uz: 'Qornim ochdi. Men sendvich tayyorlayman (to\'satdan qaror).' },
      { en: 'We are going to visit Samarkand this weekend.', uz: 'Biz bu dam olish kunlarida Samarqandga bormoqchimiz (reja).' },
      { en: 'I think our team will win the match.', uz: 'O\'ylaymanki, jamoamiz o\'yinda g\'alaba qozonadi (taxmin).' },
      { en: 'Watch out! You are going to drop that plate!', uz: 'Ehtiyot bo\'ling! Likopchani tushirib yuborayapsiz! (aniq dalil).' },
      { en: 'I will always help you whenever you need me.', uz: 'Menga ehtiyojingiz bo\'lganda har doim yordam beraman (va\'da).' },
      { en: 'Are you going to apply for that university?', uz: 'Ushbu universitetga hujjat topshirmoqchimisiz?' },
      { en: 'I won\'t tell anyone your secret.', uz: 'Siringizni hech kimga aytmayman.' },
      { en: 'She isn\'t going to sell her car.', uz: 'U mashinasini sotmoqchi emas.' }
    ],
    mistakes: [
      { wrong: 'I will to visit London.', correct: 'I will visit London.', note: '"Will" dan keyin "to" qo\'yilmaydi.' },
      { wrong: 'Look at the sky, it will rain.', correct: 'Look at the sky, it is going to rain.', note: 'Ko\'z oldingizda qora bulutlar tursa, dalil bo\'lgani uchun "is going to rain" deyiladi.' },
      { wrong: 'I am going visit my aunt.', correct: 'I am going to visit my aunt.', note: '"Be going to" da "to" tushib qolmasligi shart.' }
    ],
    uzbekComparison: '"Will" ko\'pincha "-aman, -adi" (qilaman, bo\'ladi) deb tarjima qilinadi; "be going to" esa "...-moqchiman, niyatidaman" deb tarjima qilinadi.',
    tip: '💡 Spontan (hozirgi daqiqadagi qaror yoki va\'da) = WILL. Rejalashtirilgan niyat = BE GOING TO.',
    exercises: [
      {
        question: 'The phone is ringing. — Okay, I _____ answer it.',
        options: ['will', 'am going to', 'am answering', 'shall to'],
        answer: 0,
        explanation: 'Ayni daqiqadagi to\'satdan qaror: "I will answer it".'
      },
      {
        question: 'We bought plane tickets yesterday. We _____ fly to Dubai next week.',
        options: ['will', 'are going to', 'will to', 'go to'],
        answer: 1,
        explanation: 'Chipta olingan, demak oldindan reja tuzilgan: "are going to".'
      },
      {
        question: 'Look at that boy on the edge of the wall! He _____ fall!',
        options: ['will', 'is going to', 'is falling', 'will be'],
        answer: 1,
        explanation: 'Ko\'z o\'ngimizda ko\'rinib turgan xavf/dalil: "is going to fall".'
      },
      {
        question: 'I promise I _____ forget to call you tonight.',
        options: ['won\'t', 'am not going', 'not will', 'don\'t'],
        answer: 0,
        explanation: 'Va\'da berishda "won\'t" (will not) ishlatiladi.'
      },
      {
        question: 'What _____ do after university graduation?',
        options: ['are you going to', 'will you to', 'you will', 'do you going to'],
        answer: 0,
        explanation: 'Kelajak rejasini so\'rash: "What are you going to do...?".'
      }
    ]
  },
  {
    id: 'a2_4',
    level: 'A2',
    title: 'Present Continuous for future plans',
    titleUz: 'Kelasi reja va kelishuvlar uchun Present Continuous',
    isTense: true,
    summary: 'Oldindan boshqa odamlar bilan aniq vaqt va joyi kelishib qo\'yilgan qat\'iy uchrashuvlar hamda voqealar uchun hozirgi davomli zamon qo\'llaniladi.',
    usage: [
      'Boshqa insonlar bilan kelishilgan qat\'iy tadbirlar: I am meeting the director at 3:00 tomorrow.',
      'Sotib olingan chiptalar yoki bron qilingan reyslar: We are flying to Istanbul on Friday.',
      'Shifokor yoki uchrashuv qabuli: She is seeing the dentist this afternoon.'
    ],
    formula: {
      affirmative: 'Subject + am / is / are + V-ing + kelasi vaqt so\'zi (tomorrow, on Friday, tonight)',
      negative: 'Subject + am/is/are + not + V-ing + kelasi vaqt',
      question: 'Are you doing anything tonight? (Bugun oqshom biror rejang bormi?)'
    },
    examples: [
      { en: 'I am having lunch with my boss tomorrow.', uz: 'Ertaga boshlig\'im bilan tushlik qilaman (kelishilgan).' },
      { en: 'We are leaving for London next Monday.', uz: 'Kelasi dushanba kuni Londonga jo\'nab ketyapmiz (chiptalar bor).' },
      { en: 'She is getting married in September.', uz: 'U sentabr oyida turmushga chiqyapti (to\'y sanasi belgilangan).' },
      { en: 'Are you doing anything exciting tonight?', uz: 'Bugun oqshomda biror rejangiz bormi?' },
      { en: 'He isn\'t coming to the party this evening.', uz: 'U bugun kechqurun bayramga kelmayapti.' },
      { en: 'What time are you meeting Sarah?', uz: 'Sarah bilan soat nechada uchrashyapsiz?' },
      { en: 'The president is visiting the new hospital tomorrow morning.', uz: 'Prezident ertaga ertalab yangi shifoxonaga tashrif buyuradi.' },
      { en: 'I am seeing my doctor at 4:30 today.', uz: 'Bugun soat 4:30 da shifokorim qabuliga boryapman.' }
    ],
    mistakes: [
      { wrong: 'I meet John tomorrow at 5.', correct: 'I am meeting John tomorrow at 5.', note: 'Odamlar o\'rtasidagi kelishuvlar uchun Present Continuous eng to\'g\'ri shakldir.' },
      { wrong: 'It is raining tomorrow.', correct: 'It is going to rain tomorrow.', note: 'Ob-havo inson bilan kelishib bo\'lmaydi, shuning uchun "will" yoki "going to" olinadi.' }
    ],
    uzbekComparison: 'O\'zbek tilida ham kelasi rejalar uchun hozirgi zamon qo\'llanadi: "Ertaga mehmonga ketyapman" = "I am going to a party tomorrow".',
    tip: '💡 Agar reja boshqa odam bilan aniq belgilangan bo\'lsa (kun, soat, joyi bor) — Present Continuous qo\'llang.',
    exercises: [
      {
        question: 'I _____ the dentist tomorrow at 2:00 PM.',
        options: ['am seeing', 'see', 'saw', 'have seen'],
        answer: 0,
        explanation: 'Oldindan yozilib qo\'yilgan shifokor uchrashuvi: "am seeing".'
      },
      {
        question: 'We _____ to Paris on Friday morning. The flight is booked.',
        options: ['fly', 'are flying', 'flew', 'will to fly'],
        answer: 1,
        explanation: 'Chipta bron qilingan aniq kelishuv: "are flying".'
      },
      {
        question: 'What _____ you doing this Saturday evening?',
        options: ['are', 'do', 'will', 'did'],
        answer: 0,
        explanation: 'Kelasi reja haqida so\'rash: "What are you doing...?".'
      },
      {
        question: 'Jack _____ to the cinema with us tonight because he has a cold.',
        options: ['isn\'t coming', 'doesn\'t coming', 'won\'t coming', 'not is coming'],
        answer: 0,
        explanation: 'Inkor reja: "isn\'t coming".'
      },
      {
        question: 'They _____ married next month.',
        options: ['are getting', 'get', 'will to get', 'getting'],
        answer: 0,
        explanation: 'Belgilangan to\'y sanasi: "are getting married".'
      }
    ]
  },
  {
    id: 'a2_5',
    level: 'A2',
    title: 'Comparatives and Superlatives',
    titleUz: 'Sifat darajalari: Qiyosiy (-er / more) va Orttirma (the -est / the most)',
    isTense: false,
    summary: 'Ikki narsani o\'zaro solishtirish (qiyosiy) va bir guruh ichidagi eng ustun narsani ajratib ko\'rsatish (orttirma) uchun sifatlar o\'zgartiriladi.',
    usage: [
      'Qisqa (1 bo\'g\'inli) sifatlar: tall → taller than / the tallest; big → bigger than / the biggest.',
      'Ikki bo\'g\'inli "-y" bilan tugaganlar: happy → happier than / the happiest.',
      'Uzun (2 yoki undan ko\'p bo\'g\'inli) sifatlar: expensive → more expensive than / the most expensive.',
      'Noto\'g\'ri (istisno) sifatlar: good → better than → the best; bad → worse than → the worst; far → further than → the furthest.'
    ],
    formula: {
      affirmative: 'Qiyosiy: Sifat + -er + than (yoki more + sifat + than) | Orttirma: the + sifat + -est (yoki the most + sifat)',
      negative: 'A is not as tall as B (A B kabi baland emas)',
      question: 'Which car is faster? Which city is the most beautiful?'
    },
    examples: [
      { en: 'Tashkent is bigger than Samarkand.', uz: 'Toshkent Samarqanddan kattaroq.' },
      { en: 'This laptop is more expensive than my old one.', uz: 'Bu noutbuk mening eskisidan qimmatroq.' },
      { en: 'Mount Everest is the highest mountain in the world.', uz: 'Everest cho\'qqisi dunyodagi eng baland tog\'.' },
      { en: 'Today is the best day of my life!', uz: 'Bugun hayotimdagi eng yaxshi kun!' },
      { en: 'Traffic in the evening is worse than in the morning.', uz: 'Kechki tirbandlik ertalabkidan yomonroq.' },
      { en: 'He is the most intelligent student in our group.', uz: 'U guruhimizdagi eng zukko talaba.' },
      { en: 'My brother is taller than me.', uz: 'Mening akam mendan uzunroq.' },
      { en: 'This exercise is easier than the first one.', uz: 'Bu mashq birinchisidan osonroq.' }
    ],
    mistakes: [
      { wrong: 'more bigger', correct: 'bigger', note: '"More" va "-er" bir vaqtda ishlatilmaydi!' },
      { wrong: 'He is tallest boy in class.', correct: 'He is the tallest boy in class.', note: 'Orttirma darajada "the" artikli majburiydir.' },
      { wrong: 'better then', correct: 'better than', note: 'Taqqoslashda "then" (keyin) emas, "than" (qaraganda) yoziladi.' }
    ],
    uzbekComparison: 'Qiyosiy daraja o\'zbek tilidagi "-roq" qo\'shimchasiga (katta-roq), orttirma daraja esa "eng" so\'ziga (eng katta) to\'liq mos keladi.',
    tip: '💡 Qisqa so\'zlarga "-er / -est" (fast → faster → the fastest). Uzun so\'zlarga "more / the most" (modern → more modern → the most modern).',
    exercises: [
      {
        question: 'An elephant is _____ than a horse.',
        options: ['big', 'bigger', 'more big', 'biggest'],
        answer: 1,
        explanation: '"Big" bir bo\'g\'inli, qiyosiy darajada oxirgi harf ikkilanadi: "bigger".'
      },
      {
        question: 'This is _____ movie I have ever seen.',
        options: ['the best', 'better', 'good', 'most good'],
        answer: 0,
        explanation: '"Good" ning orttirma darajasi "the best" bo\'ladi.'
      },
      {
        question: 'Learning English is _____ than learning Chinese.',
        options: ['easyer', 'easier', 'more easy', 'the easiest'],
        answer: 1,
        explanation: '"Easy" so\'zidagi "y" harfi "i" ga aylanib "-er" qo\'shiladi: "easier".'
      },
      {
        question: 'Who is _____ runner in your school?',
        options: ['fastest', 'the fastest', 'most fast', 'the most fast'],
        answer: 1,
        explanation: 'Orttirma daraja oldidan "the" qo\'yiladi: "the fastest".'
      },
      {
        question: 'Gold is _____ than silver.',
        options: ['more expensive', 'expensiver', 'most expensive', 'the expensive'],
        answer: 0,
        explanation: '"Expensive" ko\'p bo\'g\'inli sifat, qiyosiy shakli "more expensive".'
      }
    ]
  },
  {
    id: 'a2_6',
    level: 'A2',
    title: 'Much, Many, A lot of, A few, A little',
    titleUz: 'Miqdor olmoshlari: ko\'p, ozgina, bir nechta',
    isTense: false,
    summary: 'Sanaladigan va sanalmaydigan otlar bilan qancha miqdorda narsa borligini ko\'rsatish uchun ishlatiladi.',
    usage: [
      '"Much" — sanalmaydigan otlar bilan asosan inkor va so\'roqda (much sugar, much time).',
      '"Many" — sanaladigan ko\'plik otlar bilan (many books, many people).',
      '"A lot of / Lots of" — har ikkala turdagi otlar bilan darak gaplarda (a lot of money, a lot of friends).',
      '"A few" — sanaladigan otlar bilan "bir nechta / ozgina (yetarli)" ma\'nosida (a few friends).',
      '"A little" — sanalmaydigan otlar bilan "ozgina (yetarli)" ma\'nosida (a little water).'
    ],
    formula: {
      affirmative: 'Sanaladigan: many / a lot of / a few | Sanalmaydigan: much / a lot of / a little',
      negative: 'I don\'t have much time / There aren\'t many apples',
      question: 'How much water do you need? / How many students are there?'
    },
    examples: [
      { en: 'How many languages can you speak?', uz: 'Nechta tilda gaplasha olasiz?' },
      { en: 'How much money did you spend on this coat?', uz: 'Bu paltoga qancha pul sarfladingiz?' },
      { en: 'There are a lot of tourists in Samarkand today.', uz: 'Bugun Samarqandda juda ko\'p sayyohlar bor.' },
      { en: 'I have a few good friends in this city.', uz: 'Bu shaharda mening bir nechta yaxshi do\'stlarim bor.' },
      { en: 'Could I have a little sugar in my coffee?', uz: 'Kofemga ozgina shakar solib bersangiz bo\'ladimi?' },
      { en: 'We don\'t have much time before the train leaves.', uz: 'Poyezd jo\'nashiga qadar ko\'p vaqtimiz qolmadi.' },
      { en: 'She doesn\'t read many books these days.', uz: 'U hozirgi kunda ko\'p kitob o\'qimaydi.' },
      { en: 'He has lots of energy in the morning.', uz: 'Ertalab unda juda ko\'p kuch-g\'ayrat bo\'ladi.' }
    ],
    mistakes: [
      { wrong: 'How much cars are there?', correct: 'How many cars are there?', note: '"Cars" sanaladigan ko\'plik, shuning uchun "many" bo\'ladi.' },
      { wrong: 'I have a few money.', correct: 'I have a little money.', note: '"Money" sanalmaydi, shuning uchun "a little" olinadi.' }
    ],
    uzbekComparison: 'O\'zbek tilida "ko\'p" so\'zi barcha narsaga ketaveradi (ko\'p pul, ko\'p kitob), ingliz tilida esa qat\'iy ajratiladi (much money, many books).',
    tip: '💡 Sanalsa: MANY va A FEW. Sanalmasa: MUCH va A LITTLE. Hammasiga tushadigani: A LOT OF.',
    exercises: [
      {
        question: 'How _____ chairs do we need for the meeting?',
        options: ['much', 'many', 'a little', 'any'],
        answer: 1,
        explanation: '"Chairs" (stullar) sanaladi, shuning uchun "How many".'
      },
      {
        question: 'There is only _____ milk left in the bottle.',
        options: ['a few', 'a little', 'many', 'few'],
        answer: 1,
        explanation: '"Milk" sanalmaydigan ot, unga "a little" to\'g\'ri keladi.'
      },
      {
        question: 'We don\'t have _____ time left to complete the test.',
        options: ['many', 'much', 'a few', 'few'],
        answer: 1,
        explanation: '"Time" sanalmaydi, inkor gapda "much time".'
      },
      {
        question: 'I invited _____ close friends to my birthday dinner.',
        options: ['a little', 'a few', 'much', 'any'],
        answer: 1,
        explanation: '"Friends" sanaladigan ko\'plik, ijobiy ozgina ma\'nosida "a few".'
      },
      {
        question: 'She drank _____ water after running 5 kilometers.',
        options: ['many', 'a lot of', 'a few', 'few'],
        answer: 1,
        explanation: 'Darak gapda sanalmaydigan ot bilan ko\'p miqdorni ifodalash uchun "a lot of".'
      }
    ]
  },
  {
    id: 'a2_7',
    level: 'A2',
    title: 'Modal verbs: must, have to, should, mustn\'t',
    titleUz: 'Modal fe\'llar: majburiyat (must/have to), taqiq (mustn\'t) va maslahat (should)',
    isTense: false,
    summary: 'Majburiyat, ehtiyoj, qat\'iy taqiq va do\'stona maslahatni ifodalashda qo\'llaniladigan muhim fe\'llar.',
    usage: [
      '"Must" — ichki kuchli majburiyat yoki qat\'iy qoida: I must study hard to pass.',
      '"Have to" — tashqi shart-sharoit, qonun yoki majburiyat: Drivers have to stop at red lights.',
      '"Mustn\'t" — qat\'iy taqiq (aslo mumkin emas): You mustn\'t smoke in the hospital.',
      '"Don\'t have to" — majburiyat yo\'q (qilsa bo\'ladi, qilmasa ham bo\'ladi): You don\'t have to wake up early on Sunday.',
      '"Should / Shouldn\'t" — yaxshi maslahat va tavsiya: You should drink more water.'
    ],
    formula: {
      affirmative: 'Subject + must / have to / should + V1 (He should sleep early)',
      negative: 'Mustn\'t (taqiq) | Don\'t have to (ixtiyoriy) | Shouldn\'t (yaxshi emas)',
      question: 'Do I have to wear a suit? / Should I call him?'
    },
    examples: [
      { en: 'You must have a passport to travel abroad.', uz: 'Chet elga chiqish uchun pasportga ega bo\'lishingiz shart.' },
      { en: 'Doctors have to work long shifts.', uz: 'Shifokorlar uzoq smenalarda ishlashga majbur.' },
      { en: 'You mustn\'t park your car in front of the emergency exit.', uz: 'Favqulodda chiqish joyi oldida mashinani to\'xtatish qat\'iyan taqiqlanadi.' },
      { en: 'Tomorrow is a holiday, so I don\'t have to go to work.', uz: 'Ertaga bayram, shuning uchun ishga borishim shart emas (ixtiyoriy).' },
      { en: 'You look tired. You should go to bed early tonight.', uz: 'Charchagan ko\'rinasiz. Bugun erta uxlashingiz kerak (maslahat).' },
      { en: 'You shouldn\'t eat so much fast food.', uz: 'Bunchalik ko\'p fast-fud yemasligingiz kerak (maslahat).' },
      { en: 'Do we have to finish this homework today?', uz: 'Bu vazifani bugun tugatishimiz shartmi?' },
      { en: 'Students mustn\'t use mobile phones during the exam.', uz: 'Imtihon paytida talabalar telefon ishlatishi mumkin emas.' }
    ],
    mistakes: [
      { wrong: 'You mustn\'t come tomorrow, you can rest.', correct: 'You don\'t have to come tomorrow, you can rest.', note: '"Mustn\'t" bu taqiq! "Shart emas" deyish uchun "don\'t have to" bo\'ladi.' },
      { wrong: 'She must to go.', correct: 'She must go.', note: '"Must" dan keyin "to" qo\'yilmaydi.' },
      { wrong: 'He should goes.', correct: 'He should go.', note: '"Should" dan keyin fe\'lga "-s" qo\'shilmaydi.' }
    ],
    uzbekComparison: 'Must/have to = "-ishi shart/majbur"; mustn\'t = "mumkin emas/taqiqlanadi"; don\'t have to = "shart emas"; should = "-ishi kerak/tavsiya etiladi".',
    tip: '💡 Xavfli farq: MUSTN\'T = aslo qilma (taqiq!). DON\'T HAVE TO = xohlasang qil, xohlamasang yo\'q (majburiy emas).',
    exercises: [
      {
        question: 'You _____ wear a seatbelt while driving. It is the law.',
        options: ['must', 'should', 'can', 'might'],
        answer: 0,
        explanation: 'Qonuniy qat\'iy talab uchun "must" yoki "have to" ishlatiladi.'
      },
      {
        question: 'Museum entry is free today. You _____ buy a ticket.',
        options: ['mustn\'t', 'don\'t have to', 'shouldn\'t', 'can\'t'],
        answer: 1,
        explanation: 'Bepul bo\'lsa, chipta olish majburiy emas: "don\'t have to".'
      },
      {
        question: 'You _____ touch that electric wire! It is extremely dangerous!',
        options: ['don\'t have to', 'mustn\'t', 'should', 'needn\'t'],
        answer: 1,
        explanation: 'Xavfli taqiq uchun qat\'iy "mustn\'t" ishlatiladi.'
      },
      {
        question: 'Your cough sounds bad. You _____ see a doctor.',
        options: ['should', 'mustn\'t', 'can to', 'have'],
        answer: 0,
        explanation: 'Foydali do\'stona maslahat uchun "should" to\'g\'ri keladi.'
      },
      {
        question: 'He is a pilot, so he _____ wear a uniform at work.',
        options: ['has to', 'have to', 'must to', 'should to'],
        answer: 0,
        explanation: '"He" uchun "has to" shakli to\'g\'ri bo\'ladi.'
      }
    ]
  },
  {
    id: 'a2_8',
    level: 'A2',
    title: 'Present Perfect (Kirish)',
    titleUz: 'Hozirgi tugallangan zamon (Natija va hayotiy tajriba)',
    isTense: true,
    summary: 'O\'tmishda aniq vaqti aytilmagan holda yuz bergan, ammo natijasi yoki ta\'siri ayni hozirgi damda ko\'rinib turgan harakatlar yoki insonning hayotiy tajribasini ifodalaydi.',
    usage: [
      'Hayotiy tajriba (ever, never): Have you ever been to London? I have never eaten sushi.',
      'Ayni hozirgina tugagan harakat (just): I have just finished my homework.',
      'Kutilgandan oldinroq bajarilgan ish (already): I have already seen this movie.',
      'Kutilayotgan ish (yet - inkor va so\'roqda): He hasn\'t called me yet. Have you eaten yet?'
    ],
    formula: {
      affirmative: 'Subject + have / has + V3 (Past Participle) (I have seen, She has visited)',
      negative: 'Subject + haven\'t / hasn\'t + V3 (I haven\'t finished yet)',
      question: 'Have / Has + Subject + V3? (Have you ever tried plov?)'
    },
    examples: [
      { en: 'I have lost my house keys. I can\'t open the door.', uz: 'Kalitimni yo\'qotib qo\'ydim (natija: hozir eshikni ocha olmayapman).' },
      { en: 'Have you ever visited the historical city of Khiva?', uz: 'Siz hech Xiva tarixiy shahrida bo\'lganmisiz?' },
      { en: 'She has already finished reading the whole book.', uz: 'U butun kitobni o\'qib bo\'ldi allaqachon.' },
      { en: 'We have just arrived at the railway station.', uz: 'Biz hozirgina temiryo\'l vokzaliga yetib keldik.' },
      { en: 'They haven\'t replied to our message yet.', uz: 'Ular xabarimizga hali javob berishmadi.' },
      { en: 'He has worked as an architect for five years.', uz: 'U besh yildan beri me\'mor bo\'lib ishlaydi.' },
      { en: 'I have never tasted such delicious food.', uz: 'Men hech qachon bunday mazali taom tatib ko\'rmaganman.' },
      { en: 'Has the lesson started yet?', uz: 'Dars boshlandimi hali?' }
    ],
    mistakes: [
      { wrong: 'I have seen him yesterday.', correct: 'I saw him yesterday.', note: '"Yesterday, ago, in 2020" kabi aniq o\'tgan vaqt so\'zlari bilan faqat Past Simple ishlatiladi!' },
      { wrong: 'She have arrived.', correct: 'She has arrived.', note: 'He/She/It bilan "has" qo\'yiladi.' },
      { wrong: 'I have already not finished.', correct: 'I haven\'t finished yet.', note: '"Already" inkor gaplarda ishlatilmaydi, o\'rniga oxiriga "yet" qo\'yiladi.' }
    ],
    uzbekComparison: 'O\'zbek tilida bu holat ko\'pincha "...ganman" (bo\'lganman, ko\'rganman) yoki oddiy o\'tgan zamon bilan ifodalanadi, ammo ingliz tilida natijaning hozir borligi muhim.',
    tip: '💡 Aniq vaqt (yesterday, last year) yo\'qmi va natijasi hozir muhimmi? Demak: have/has + V3.',
    exercises: [
      {
        question: '_____ you ever eaten Japanese sushi?',
        options: ['Did', 'Have', 'Are', 'Were'],
        answer: 1,
        explanation: 'Hayotiy tajriba so\'roqlarida "Have you ever + V3" ishlatiladi.'
      },
      {
        question: 'She _____ her passport, so she cannot fly today.',
        options: ['lost', 'has lost', 'loses', 'is losing'],
        answer: 1,
        explanation: 'Harakat o\'tmishda bo\'lgan, ammo natijasi hozir (uchar olmaydi): "has lost".'
      },
      {
        question: 'I have _____ completed my morning workout.',
        options: ['yet', 'already', 'ever', 'never yet'],
        answer: 1,
        explanation: 'Darak gapda o\'rtada "already" (allaqachon) to\'g\'ri keladi.'
      },
      {
        question: 'The courier hasn\'t delivered the package _____.',
        options: ['already', 'yet', 'just', 'ever'],
        answer: 1,
        explanation: 'Inkor gap oxirida "yet" (hali) ishlatiladi.'
      },
      {
        question: 'He _____ lived in London for two years.',
        options: ['have', 'has', 'is', 'did'],
        answer: 1,
        explanation: '"He" uchinchi shaxs uchun "has" olinadi.'
      }
    ]
  },
  {
    id: 'a2_9',
    level: 'A2',
    title: 'Gerund and Infinitive basics',
    titleUz: 'Gerund (-ing) va Infinitiv (to + fe\'l) asoslari',
    isTense: false,
    summary: 'Gapda ikkita fe\'l ketma-ket kelganda, ikkinchi fe\'l yo "-ing" (gerund) shaklida, yoki "to + fe\'l" (infinitive) shaklida bo\'ladi. Bu birinchi fe\'lga bog\'liq.',
    usage: [
      'Gerund (-ing) oluvchi asosiy fe\'llar: like, love, enjoy, hate, mind, finish, practice (I enjoy swimming).',
      'Infinitiv (to + V1) oluvchi asosiy fe\'llar: want, hope, decide, plan, promise, need, learn (I want to learn English).',
      'Predloglardan keyin har doim gerund keladi: good at speaking, interested in learning.'
    ],
    formula: {
      affirmative: 'Fe\'l + V-ing: like doing, enjoy reading | Fe\'l + to + V1: want to go, decide to buy',
      negative: 'He decided not to go / She avoids eating sugar',
      question: 'Do you like cooking? / Would you like to drink tea?'
    },
    examples: [
      { en: 'I enjoy reading novels in the evening.', uz: 'Kechqurunlari roman o\'qishdan zavqlanaman.' },
      { en: 'She decided to study computer science.', uz: 'U informatika yo\'nalishida o\'qishga qaror qildi.' },
      { en: 'We want to travel around the world.', uz: 'Biz dunyo bo\'ylab sayohat qilishni xohlaymiz.' },
      { en: 'He promised to call me as soon as he arrives.', uz: 'U yetib borishi bilanoq qo\'ng\'iroq qilishga va\'da berdi.' },
      { en: 'She is very good at playing chess.', uz: 'U shaxmat o\'ynashga juda usta (predlogdan keyin -ing).' },
      { en: 'I finished doing my chores.', uz: 'Men uy yumushlarimni bajarib bo\'ldim.' },
      { en: 'Would you like to have dinner with us?', uz: 'Biz bilan kechki ovqat tanovul qilishni xohlarmidingiz?' },
      { en: 'He hates waiting in long queues.', uz: 'U uzun navbatlarda kutishni yomon ko\'radi.' }
    ],
    mistakes: [
      { wrong: 'I want going home.', correct: 'I want to go home.', note: '"Want" dan keyin doim "to + V1" keladi.' },
      { wrong: 'I enjoy to play football.', correct: 'I enjoy playing football.', note: '"Enjoy" dan keyin faqat "-ing" keladi.' },
      { wrong: 'I am interested to learn.', correct: 'I am interested in learning.', note: 'Predlogdan keyin fe\'lga "-ing" qo\'shiladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi harakat nomi (-sh, -ish, -moq, masalan: o\'qishni yaxshi ko\'raman, borishga qaror qildim) ga to\'g\'ri keladi.',
    tip: '💡 Like / Love / Enjoy = -ing (zavqlanadigan mashg\'ulot). Want / Hope / Decide = to + V1 (kelajakdagi maqsad).',
    exercises: [
      {
        question: 'I decided _____ a new car next month.',
        options: ['buy', 'to buy', 'buying', 'bought'],
        answer: 1,
        explanation: '"Decide" fe\'lidan keyin "to + fe\'l" keladi.'
      },
      {
        question: 'Do you enjoy _____ to classical music?',
        options: ['listen', 'to listen', 'listening', 'listened'],
        answer: 2,
        explanation: '"Enjoy" fe\'lidan keyin gerund (-ing) olinadi.'
      },
      {
        question: 'He promised _____ me with my homework.',
        options: ['help', 'to help', 'helping', 'helped'],
        answer: 1,
        explanation: '"Promise" dan keyin "to help" bo\'ladi.'
      },
      {
        question: 'She is interested in _____ foreign languages.',
        options: ['learn', 'to learn', 'learning', 'learned'],
        answer: 2,
        explanation: '"In" predlogidan keyin fe\'lga "-ing" qo\'shiladi.'
      },
      {
        question: 'I would like _____ a cup of green tea.',
        options: ['have', 'to have', 'having', 'had'],
        answer: 1,
        explanation: '"Would like" iborasi doim "to + V1" talab qiladi.'
      }
    ]
  },
  {
    id: 'a2_10',
    level: 'A2',
    title: 'Zero and First Conditional',
    titleUz: 'Nolinchi va Birinchi shart mayli',
    isTense: false,
    summary: 'Umumiy tabiat qonunlari va qat\'iy haqiqatlar (Zero), hamda kelajakda sodir bo\'lishi haqiqatga juda yaqin bo\'lgan shart va natijalar (First Conditional).',
    usage: [
      'Zero Conditional (har doim to\'g\'ri bo\'lgan ilmiy faktlar): If you heat ice, it melts.',
      'First Conditional (kelajakdagi ehtimoli yuqori real shart va natija): If it rains tomorrow, we will stay at home.',
      'If qismi kelasi zamon ma\'nosida bo\'lsa ham, unda "will" ishlatilmaydi, Present Simple bo\'ladi!'
    ],
    formula: {
      affirmative: 'Zero: If + Present Simple, Present Simple | First: If + Present Simple, will + V1',
      negative: 'If it doesn\'t rain, we will go for a picnic.',
      question: 'What will you do if you pass the entrance exam?'
    },
    examples: [
      { en: 'If you heat water to 100 degrees, it boils.', uz: 'Agar suvni 100 gradusgacha qizdirsangiz, u qaynaydi (ilmiy fakt - Zero).' },
      { en: 'If I have enough free time tomorrow, I will visit you.', uz: 'Ertaga bo\'sh vaqtim bo\'lsa, siznikiga boraman (First).' },
      { en: 'If she studies diligently, she will pass the test.', uz: 'Agar u astoydil o\'qisa, testdan o\'tadi.' },
      { en: 'If people don\'t eat, they get hungry.', uz: 'Agar odamlar ovqatlanmasa, qorni ochadi (Zero).' },
      { en: 'We will miss the train if we don\'t hurry.', uz: 'Agar shoshilmasak, poyezdga kech qolamiz.' },
      { en: 'If you feel tired, take a short break.', uz: 'Charchagan bo\'lsangiz, qisqa tanaffus qiling.' },
      { en: 'What will happen if nobody answers the phone?', uz: 'Agar hech kim telefonga javob bermasa nima bo\'ladi?' },
      { en: 'If you mix red and blue, you get purple.', uz: 'Qizil va ko\'k rangni aralashtirsangiz, binafsha rang hosil bo\'ladi.' }
    ],
    mistakes: [
      { wrong: 'If it will rain tomorrow, I will stay home.', correct: 'If it rains tomorrow, I will stay home.', note: '"If" li shart qismiga "will" aslo qo\'yilmaydi! Faqat Present Simple bo\'ladi.' },
      { wrong: 'If you study, you pass.', correct: 'If you study, you will pass.', note: 'Kelajakdagi aniq natija uchun asosiy qismda "will" bo\'lishi shart.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...-sa, ...-adi" (qilsa, bo\'ladi) shart shakliga to\'g\'ri keladi.',
    tip: '💡 Oltin qoida: "If" dan keyin darhol "will" KELMAYDI! If + Present Simple, ikkinchi qismda esa will + V1.',
    exercises: [
      {
        question: 'If it _____ tomorrow, we will cancel the football match.',
        options: ['rains', 'will rain', 'rained', 'is rain'],
        answer: 0,
        explanation: '"If" shart qismida "will" emas, Present Simple (rains) ishlatiladi.'
      },
      {
        question: 'You will feel much better if you _____ this medicine.',
        options: ['take', 'will take', 'took', 'taking'],
        answer: 0,
        explanation: 'If dan keyin fe\'lning 1-shakli (take) keladi.'
      },
      {
        question: 'If you freeze water, it _____ into solid ice.',
        options: ['turns', 'will turn', 'turned', 'is turning'],
        answer: 0,
        explanation: 'Ilmiy fakt (Zero Conditional) bo\'lgani uchun har ikkala qismda Present Simple: "turns".'
      },
      {
        question: 'If she doesn\'t leave now, she _____ the last bus.',
        options: ['miss', 'will miss', 'misses', 'missed'],
        answer: 1,
        explanation: 'Asosiy natija qismida kelasi zamon uchun "will miss".'
      },
      {
        question: 'What _____ you do if you don\'t find your wallet?',
        options: ['will', 'do', 'are', 'did'],
        answer: 0,
        explanation: 'First Conditional so\'rog\'ida asosiy qismda "will" turadi.'
      }
    ]
  },
  {
    id: 'a2_11',
    level: 'A2',
    title: 'Possessive pronouns (mine, yours, his, hers, ours, theirs)',
    titleUz: 'Mutlaq egalik olmoshlari (mine, yours, his, hers...)',
    isTense: false,
    summary: 'O\'zidan keyin ot talab qilmaydigan, otni takrorlamaslik uchun uning o\'rnini to\'liq bosuvchi mustaqil egalik olmoshlari.',
    usage: [
      'Otni qayta takrorlamaslik uchun: This is my car and that is yours (your car o\'rniga).',
      'Whose savoliga qisqa javobda: Whose is this bag? — It is mine.',
      'Taqqoslash: My room is bigger than hers (her room o\'rniga).'
    ],
    formula: {
      affirmative: 'my → mine | your → yours | his → his | her → hers | our → ours | their → theirs',
      negative: 'This phone isn\'t mine. Is it yours?',
      question: 'Whose is this jacket? It is his.'
    },
    examples: [
      { en: 'This isn\'t my jacket, it is yours.', uz: 'Bu mening kurtkam emas, sizniki.' },
      { en: 'Whose keys are these on the table? — They are mine.', uz: 'Stoldagi bu kalitlar kimniki? — Meniki.' },
      { en: 'Our house is small, but theirs is enormous.', uz: 'Bizning uyimiz kichik, ammo ularniki ulkan.' },
      { en: 'I forgot my pen. Can I borrow yours?', uz: 'Men ruchkamni unutibman. Siznikini olib tursam maylimi?' },
      { en: 'Her dress is blue, and mine is red.', uz: 'Uning ko\'ylagi ko\'k, meniki esa qizil.' },
      { en: 'This notebook is hers, not his.', uz: 'Bu daftar qizniki, o\'g\'il bolaniki emas.' },
      { en: 'That is not your problem, it is ours.', uz: 'U sizning muammoingiz emas, bizniki.' },
      { en: 'Is this suitcase yours or theirs?', uz: 'Bu chamadon siznikimi yoki ularnikimi?' }
    ],
    mistakes: [
      { wrong: 'This is mine book.', correct: 'This is my book / This book is mine.', note: '"Mine" dan keyin ot ishlatilmaydi! Ot bo\'lsa "my" bo\'ladi.' },
      { wrong: 'It is her\'s.', correct: 'It is hers.', note: 'Egalik olmoshlariga apostrof qo\'yilmaydi (yours, hers, ours, theirs).' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "-niki" qo\'shimchasi bilan yasalgan so\'zlarga to\'liq mos keladi (meniki, sizniki, uniki, bizniki, ularniki).',
    tip: '💡 Ortidan ot KELSA: my, your, her. Ortidan ot KELMASA: mine, yours, hers.',
    exercises: [
      {
        question: 'This phone isn\'t my phone. It is _____.',
        options: ['your', 'yours', 'you', 'your\'s'],
        answer: 1,
        explanation: 'Ot takrorlanmagan joyda mustaqil "yours" (sizniki) ishlatiladi.'
      },
      {
        question: 'I found these gloves. Are they _____?',
        options: ['her', 'hers', 'she', 'her\'s'],
        answer: 1,
        explanation: 'Yolg\'iz kelgan egalik shakli "hers" (uniniki).'
      },
      {
        question: 'My essay is finished, but John hasn\'t started _____ yet.',
        options: ['his', 'him', 'he', 'his\'s'],
        answer: 0,
        explanation: '"His" shakli ikkala holatda ham bir xil qoladi: "his".'
      },
      {
        question: 'Their garden is beautiful, but _____ has more flowers.',
        options: ['our', 'ours', 'we', 'us'],
        answer: 1,
        explanation: 'Gap boshida ega bo\'lib "ours" (bizniki) kelmoqda.'
      },
      {
        question: 'Whose bicycle is this? — It is _____.',
        options: ['my', 'mine', 'me', 'I'],
        answer: 1,
        explanation: 'Yolg\'iz "meniki" deyish uchun "mine" qo\'yiladi.'
      }
    ]
  },
  {
    id: 'a2_12',
    level: 'A2',
    title: 'Adverbs of manner',
    titleUz: 'Harakat tarzi ravishlari (quickly, carefully, well)',
    isTense: false,
    summary: 'Ish-harakatning qanday tarzda, qanday usulda bajarilganligini ko\'rsatadi va ko\'pincha sifatga "-ly" qo\'shish orqali yasaladi.',
    usage: [
      'Muntazam ravishlar: sifat + -ly (quick → quickly, slow → slowly, careful → carefully).',
      '-y bilan tugasa, "i" ga aylanadi: happy → happily, easy → easily.',
      'Noto\'g\'ri (istisno) ravishlar: good → well; fast → fast; hard → hard; late → late; early → early.',
      'Ravishlar harakat fe\'lini izohlaydi (He runs quickly), sifatlar esa otni izohlaydi (He is a quick runner).'
    ],
    formula: {
      affirmative: 'Subject + Verb + Adverb of manner (She sings beautifully)',
      negative: 'He doesn\'t speak English fluently yet.',
      question: 'Did they drive carefully on the icy road?'
    },
    examples: [
      { en: 'He speaks English very fluently.', uz: 'U ingliz tilida juda ravon gapiradi.' },
      { en: 'She drive carefully in the heavy snow.', uz: 'U kuchli qor yog\'ganda ehtiyotkorlik bilan mashina haydadi.' },
      { en: 'The students listened quietly to the story.', uz: 'O\'quvchilar hikoyani jimjitlik bilan tinglashdi.' },
      { en: 'He runs very fast.', uz: 'U juda tez yuguradi ("fast" ga -ly qo\'shilmaydi).' },
      { en: 'She plays the piano extremely well.', uz: 'U pianinoni nihoyatda yaxshi chaladi (good → well).' },
      { en: 'They solved the math problem easily.', uz: 'Ular matematika masalasini osonlikcha yechishdi.' },
      { en: 'He worked hard all his life.', uz: 'U butun umri davomida qattiq mehnat qildi.' },
      { en: 'Please speak slowly so that I can understand you.', uz: 'Iltimos, sizni tushunishim uchun sekinroq gapiring.' }
    ],
    mistakes: [
      { wrong: 'He speaks English good.', correct: 'He speaks English well.', note: 'Fe\'lni sifat (good) emas, ravish (well) izohlaydi.' },
      { wrong: 'She runs fastly.', correct: 'She runs fast.', note: '"Fastly" degan so\'z yo\'q, "fast" o\'zgarmaydi.' },
      { wrong: 'He works hardly.', correct: 'He works hard.', note: '"Hardly" - "deyarli yo\'q/zo\'rg\'a" degan boshqa so\'z; qattiq ishlash "work hard" bo\'ladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi harakat tarzi ravishlariga to\'g\'ri keladi (tez, ehtiyotkorlik bilan, yaxshi, sekin).',
    tip: '💡 Fe\'lga qanday qilib bajarildi deb savol bering: Sing (how?) → beautifully. Run (how?) → fast.',
    exercises: [
      {
        question: 'She sings remarkably _____.',
        options: ['beautiful', 'beautifully', 'more beautiful', 'beauty'],
        answer: 1,
        explanation: 'Fe\'lni (sings) izohlash uchun ravish kerak: "beautifully".'
      },
      {
        question: 'He can run very _____ in competitions.',
        options: ['fast', 'fastly', 'fasterly', 'good'],
        answer: 0,
        explanation: '"Fast" ravish bo\'lganda ham shakli o\'zgarmaydi: "fast".'
      },
      {
        question: 'He did very _____ on his English exam.',
        options: ['good', 'well', 'goodly', 'best'],
        answer: 1,
        explanation: '"Good" sifatining ravish shakli "well" bo\'ladi.'
      },
      {
        question: 'Please open the package _____. The vase is fragile.',
        options: ['careful', 'carefully', 'carefulness', 'caring'],
        answer: 1,
        explanation: 'Ehtiyotkorlik bilan ochish: "carefully".'
      },
      {
        question: 'The children were playing _____ in the living room.',
        options: ['happy', 'happily', 'happier', 'happiness'],
        answer: 1,
        explanation: 'Harakat tarzi ravishi: "happily".'
      }
    ]
  },
  {
    id: 'a2_13',
    level: 'A2',
    title: 'Too and Enough',
    titleUz: 'Too (haddan tashqari ko\'p) va Enough (yetarli darajada)',
    isTense: false,
    summary: 'Me\'yordan ortiq darajani (too) yoki biror maqsad uchun yetarli bo\'lgan miqdor/darajani (enough) ifodalaydi.',
    usage: [
      '"Too" + sifat / ravish: Too hot, too expensive (haddan tashqari qimmat, salbiy ma\'noda).',
      'Sifat / ravish + "enough": Warm enough, tall enough (yetarlicha issiq, yetarlicha baland).',
      '"Enough" + ot: Enough money, enough time (yetarli pul, yetarli vaqt).',
      '"Too... to + V1": The coffee is too hot to drink (qahva ichish uchun haddan ortiq issiq).'
    ],
    formula: {
      affirmative: 'too + Adjective (too small) | Adjective + enough (smart enough) | enough + Noun (enough time)',
      negative: 'He is not old enough to drive a car.',
      question: 'Is it warm enough for you? Do we have enough chairs?'
    },
    examples: [
      { en: 'This soup is too hot to eat right now.', uz: 'Bu sho\'rva hozir yeyish uchun haddan tashqari issiq.' },
      { en: 'He isn\'t old enough to vote in elections.', uz: 'U saylovda ovoz berish uchun yetarlicha yoshda emas.' },
      { en: 'Do you have enough money to buy the tickets?', uz: 'Chiptalarni sotib olishga yetarli pulingiz bormi?' },
      { en: 'She speaks fast enough for an advanced speaker.', uz: 'U ilg\'or darajadagi kabi yetarlicha tez gapiradi.' },
      { en: 'The jacket was too expensive, so I didn\'t buy it.', uz: 'Kurtka haddan ortiq qimmat edi, shuning uchun sotib olmadim.' },
      { en: 'We don\'t have enough information to make a decision.', uz: 'Qaror qabul qilish uchun bizda yetarli ma\'lumot yo\'q.' },
      { en: 'The room is large enough for thirty people.', uz: 'Xona o\'ttiz kishi uchun yetarlicha katta.' },
      { en: 'It is too late to cancel the reservation.', uz: 'Bronni bekor qilish uchun juda kech bo\'ldi.' }
    ],
    mistakes: [
      { wrong: 'He is enough tall.', correct: 'He is tall enough.', note: '"Enough" sifatdan KEYIN keladi (tall enough), lekin otdan OLDIN keladi (enough money).' },
      { wrong: 'It is too much good.', correct: 'It is very good.', note: 'Ijobiy ma\'noda "too" emas, "very" yoki "really" ishlatiladi.' }
    ],
    uzbekComparison: '"Too" = "haddan ortiq / haddan ziyod"; "Enough" = "yetarli / yetarlicha".',
    tip: '💡 O\'rni muhim: SIFAT + enough (rich enough), lekin enough + OT (enough money). Too esa sifatdan oldin: too rich.',
    exercises: [
      {
        question: 'I cannot reach the top shelf. I am not _____ .',
        options: ['enough tall', 'tall enough', 'too tall', 'so tall'],
        answer: 1,
        explanation: 'Sifat (tall) "enough" dan oldin keladi: "tall enough".'
      },
      {
        question: 'We cannot go swimming today. The water is _____ cold.',
        options: ['enough', 'too', 'too much', 'enough to'],
        answer: 1,
        explanation: 'Salbiy haddan tashqari daraja: "too cold".'
      },
      {
        question: 'Do we have _____ time to catch the train?',
        options: ['enough', 'too', 'enough of', 'many'],
        answer: 0,
        explanation: 'Ot (time) oldidan "enough" keladi: "enough time".'
      },
      {
        question: 'The suitcase was _____ heavy for her to carry alone.',
        options: ['enough', 'too', 'very much', 'so that'],
        answer: 1,
        explanation: '"Too heavy to carry" = ko\'tarish uchun haddan tashqari og\'ir.'
      },
      {
        question: 'She is sixteen. She isn\'t old _____ to get a driver\'s license.',
        options: ['too', 'enough', 'much', 'more'],
        answer: 1,
        explanation: '"Old enough" = yetarlicha yoshda.'
      }
    ]
  },
  {
    id: 'a2_14',
    level: 'A2',
    title: 'Object pronouns',
    titleUz: 'To\'ldiruvchi olmoshlar (me, you, him, her, it, us, them)',
    isTense: false,
    summary: 'Harakat kimga yoki nimaga qaratilganligini bildirish uchun fe\'l yoki predlogdan keyin keladigan kishilik olmoshlari.',
    usage: [
      'Fe\'ldan keyin keladi: Call me, I like him, She helped us.',
      'Predlogdan keyin keladi: Look at them, with me, for her, about it.',
      'Shaxs bo\'yicha: I → me, you → you, he → him, she → her, it → it, we → us, they → them.'
    ],
    formula: {
      affirmative: 'Subject + Verb + Object pronoun (She loves him, They invited us)',
      negative: 'He didn\'t tell me the truth.',
      question: 'Can you help them? Did you see her yesterday?'
    },
    examples: [
      { en: 'Can you hear me clearly?', uz: 'Meni aniq eshita olyapsizmi?' },
      { en: 'I saw him at the library this morning.', uz: 'Men uni bugun ertalab kutubxonada ko\'rdim.' },
      { en: 'We invited them to our wedding.', uz: 'Biz ularni to\'yimizga taklif qildik.' },
      { en: 'She is waiting for us near the entrance.', uz: 'U bizni kirish eshigi yonida kutyapti.' },
      { en: 'Please give it to her.', uz: 'Iltimos, buni unga (qizga) bering.' },
      { en: 'Don\'t worry about me, I am fine.', uz: 'Men haqimda xavotir olmang, men yaxshiman.' },
      { en: 'Our teacher gave us a lot of homework.', uz: 'O\'qituvchimiz bizga ko\'p uy vazifasi berdilar.' },
      { en: 'I don\'t know them very well.', uz: 'Men ularni unchalik yaxshi tanimayman.' }
    ],
    mistakes: [
      { wrong: 'Give to I that book.', correct: 'Give me that book / Give that book to me.', note: 'To\'ldiruvchi o\'rnida "I" emas, "me" keladi.' },
      { wrong: 'I saw he yesterday.', correct: 'I saw him yesterday.', note: 'Fe\'ldan keyin "he" emas, "him" bo\'ladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi tushum (-ni) va jo\'nalish (-ga) kelishiklariga to\'g\'ri keladi (meni/menga, uni/unga, bizni/bizga).',
    tip: '💡 Fe\'ldan OLDIN: I, he, she, we, they. Fe\'ldan KEYIN: me, him, her, us, them.',
    exercises: [
      {
        question: 'My grandparents visited _____ last weekend.',
        options: ['we', 'us', 'our', 'ours'],
        answer: 1,
        explanation: 'Fe\'ldan (visited) keyin to\'ldiruvchi olmosh "us" (bizni) keladi.'
      },
      {
        question: 'I don\'t know that man. Do you know _____?',
        options: ['he', 'him', 'his', 'himself'],
        answer: 1,
        explanation: 'Erkak kishiga nisbatan fe\'ldan keyin "him" (uni) bo\'ladi.'
      },
      {
        question: 'Where are my keys? I can\'t find _____ anywhere.',
        options: ['they', 'them', 'their', 'it'],
        answer: 1,
        explanation: '"Keys" ko\'plikda bo\'lgani uchun to\'ldiruvchi "them" (ularni) olinadi.'
      },
      {
        question: 'Anna is my best friend. I tell _____ all my secrets.',
        options: ['she', 'her', 'hers', 'him'],
        answer: 1,
        explanation: 'Qiz bolaga nisbatan to\'ldiruvchi "her" (unga) bo\'ladi.'
      },
      {
        question: 'Can you please help _____ with this heavy box?',
        options: ['I', 'me', 'my', 'mine'],
        answer: 1,
        explanation: 'Menga yordam bering: "help me".'
      }
    ]
  }
];
