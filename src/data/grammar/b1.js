// B1 darajasi - 14 ta asosiy grammatik mavzu
export const b1Topics = [
  {
    id: 'b1_1',
    level: 'B1',
    title: 'Present Perfect vs Past Simple',
    titleUz: 'Present Perfect va Past Simple farqi',
    isTense: true,
    summary: 'Ingliz tilidagi eng muhim farqlardan biri: o\'tmishdagi aniq vaqtga e\'tibor qaratilsa Past Simple, natija va tajriba hozirga bog\'liq bo\'lsa Present Perfect ishlatiladi.',
    usage: [
      'Past Simple: ish-harakat tugagan vaqt aniq aytiladi (yesterday, in 2021, two weeks ago, when I was young).',
      'Present Perfect: vaqt noaniq yoki aytilmagan, asosiy urg\'u natija yoki tajribaga qaratilgan (ever, never, just, already, yet, recently).',
      'Tugallanmagan vaqt oraliqlari (today, this morning, this year): agar vaqt tugamagan bo\'lsa Present Perfect (I have had two coffees today).'
    ],
    formula: {
      affirmative: 'Past Simple: Subject + V2 (I lived) | Present Perfect: Subject + have/has + V3 (I have lived)',
      negative: 'I didn\'t visit Samarkand last year | I haven\'t visited Samarkand yet',
      question: 'Did you see John yesterday? | Have you seen John today?'
    },
    examples: [
      { en: 'I lived in London for two years (now I live in Tashkent).', uz: 'Men Londonda ikki yil yashaganman (hozir u yerda yashamayman - Past Simple).' },
      { en: 'I have lived in Tashkent for ten years (I still live here).', uz: 'Men o\'n yildan beri Toshkentda yashab kelyapman (hozir ham yashayman - Present Perfect).' },
      { en: 'She lost her phone yesterday.', uz: 'U kecha telefonini yo\'qotdi (aniq vaqt: yesterday).' },
      { en: 'She has lost her phone. She can\'t call anyone now.', uz: 'U telefonini yo\'qotib qo\'ydi (natijasi hozir: qo\'ng\'iroq qilolmayapti).' },
      { en: 'Did you finish your report last night?', uz: 'Hisobotingizni kecha kechqurun tugatdingizmi?' },
      { en: 'Have you finished your report already?', uz: 'Hisobotingizni allaqachon tugatib bo\'ldingizmi?' },
      { en: 'Shakespeare wrote many famous plays.', uz: 'Shekspir ko\'plab mashhur pyesalar yozgan (o\'tib ketgan tarixiy shaxs).' },
      { en: 'J.K. Rowling has written many popular novels.', uz: 'J.K. Rowling ko\'plab mashhur romanlar yozgan (hali ham yoza oladi).' }
    ],
    mistakes: [
      { wrong: 'I have seen him yesterday.', correct: 'I saw him yesterday.', note: '"Yesterday" bilan Present Perfect mutlaqo ishlatilmaydi!' },
      { wrong: 'When have you arrived?', correct: 'When did you arrive?', note: '"When...?" (qachon) savoli bilan faqat Past Simple keladi.' },
      { wrong: 'I lived here since 2018.', correct: 'I have lived here since 2018.', note: '"Since" ko\'rsatkichi bilan Present Perfect bo\'ladi.' }
    ],
    uzbekComparison: 'O\'zbek tilida har ikkalasi ham "ko\'rdim, yashadim" deb aytilaveradi, shuning uchun ingliz tilida "vaqt aniqmi yoki natijami?" deb savol berish kerak.',
    tip: '💡 Aniq o\'tmish so\'zi bormi (yesterday, ago, last)? → Past Simple. Vaqt yo\'q yoki hozirga ta\'siri bormi? → Present Perfect.',
    exercises: [
      {
        question: 'I _____ to New York in 2019.',
        options: ['have traveled', 'traveled', 'travel', 'was traveling'],
        answer: 1,
        explanation: '"In 2019" aniq o\'tgan yil, shuning uchun Past Simple: "traveled".'
      },
      {
        question: '_____ you ever visited the British Museum?',
        options: ['Did', 'Have', 'Were', 'Do'],
        answer: 1,
        explanation: 'Hayotiy tajriba savoli: "Have you ever visited...".'
      },
      {
        question: 'Where _____ you spend your childhood?',
        options: ['have', 'did', 'were', 'had'],
        answer: 1,
        explanation: 'Bolalik o\'tib ketgan tugallangan davr: "Where did you spend...".'
      },
      {
        question: 'Look! Somebody _____ their wallet on the bench.',
        options: ['dropped', 'has dropped', 'drops', 'is dropped'],
        answer: 1,
        explanation: 'Natijasi ayni paytda ko\'rinib turibdi: "has dropped".'
      },
      {
        question: 'When _____ the train arrive?',
        options: ['did', 'has', 'was', 'is'],
        answer: 0,
        explanation: '"When" savol so\'zi bilan aniq vaqt so\'ralganda Past Simple (did) qo\'yiladi.'
      }
    ]
  },
  {
    id: 'b1_2',
    level: 'B1',
    title: 'Present Perfect Continuous',
    titleUz: 'Hozirgi tugallangan davomli zamon',
    isTense: true,
    summary: 'O\'tmishda boshlanib, hozirgacha to\'xtovsiz davom etib kelayotgan yoki hozirgina to\'xtagan va asorati yaqqol ko\'rinib turgan jarayonlar.',
    usage: [
      'Qancha vaqtdan beri davom etayotgan harakat (How long, for, since): I have been studying English for three years.',
      'Hozirgina to\'xtagan, ammo izi/alomatlari ko\'rinib turgan harakat: You are breathing heavily. Have you been running?',
      'Urg\'u harakatning natijasiga emas, jarayonning davomiyligiga qaratiladi.'
    ],
    formula: {
      affirmative: 'Subject + have / has + been + V-ing (I have been working, She has been crying)',
      negative: 'Subject + haven\'t / hasn\'t + been + V-ing (He hasn\'t been sleeping well)',
      question: 'Have / Has + Subject + been + V-ing? (How long have you been waiting?)'
    },
    examples: [
      { en: 'I have been learning English for five years.', uz: 'Men besh yildan beri ingliz tilini o\'rganib kelyapman (hali ham o\'rganyapman).' },
      { en: 'It has been raining all morning.', uz: 'Ertalabdan beri to\'xtovsiz yomg\'ir yog\'moqda.' },
      { en: 'How long have you been waiting here?', uz: 'Bu yerda qancha vaqtdan beri kutyapsiz?' },
      { en: 'She is exhausted because she has been working all night.', uz: 'U juda charchagan, chunki tuni bo\'yi ishlab chiqdi.' },
      { en: 'They have been renovating their house since March.', uz: 'Ular mart oyidan beri uylarini ta\'mirlashmoqda.' },
      { en: 'He hasn\'t been feeling very well recently.', uz: 'U so\'nggi paytlarda o\'zini unchalik yaxshi his qilmayapti.' },
      { en: 'Why are your clothes dirty? — I have been repairing my car.', uz: 'Kiyimlaringiz nega kir? — Mashinamni tuzatayotgan edim.' },
      { en: 'We have been discussing this issue for two hours.', uz: 'Biz ushbu masalani ikki soatdan beri muhokama qilyapmiz.' }
    ],
    mistakes: [
      { wrong: 'I am waiting for you for two hours.', correct: 'I have been waiting for you for two hours.', note: '"For" yoki "since" bilan davomiylik aytilganda Present Continuous emas, Present Perfect Continuous ishlatiladi.' },
      { wrong: 'I have been knowing him for years.', correct: 'I have known him for years.', note: '"Know, believe, like" kabi holat fe\'llari continuous bo\'lmaydi, Present Perfect (known) olinadi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...-dan beri qilib kelyapman" ma\'nosiga to\'g\'ri keladi.',
    tip: '💡 "How long...?" (Qancha vaqtdan beri?) savoliga javob berayotganda "have been + fe\'l-ing" esga kelsin.',
    exercises: [
      {
        question: 'I _____ for two hours, and I am still not finished.',
        options: ['am reading', 'have been reading', 'read', 'was reading'],
        answer: 1,
        explanation: 'Ikki soatdan beri davom etayotgan jarayon: "have been reading".'
      },
      {
        question: 'The ground is wet. It _____ all night.',
        options: ['has been raining', 'rained', 'is raining', 'rains'],
        answer: 0,
        explanation: 'Er ho\'l, ya\'ni harakat yaqinda to\'xtagan jarayon: "has been raining".'
      },
      {
        question: 'How long _____ you been working for this company?',
        options: ['do', 'are', 'have', 'did'],
        answer: 2,
        explanation: 'Present Perfect Continuous so\'rog\'ida "How long have you been...".'
      },
      {
        question: 'She _____ well lately, so she visited a doctor.',
        options: ['hasn\'t been sleeping', 'isn\'t sleeping', 'didn\'t sleep', 'not sleeping'],
        answer: 0,
        explanation: 'So\'nggi paytlarda davom etgan salbiy holat: "hasn\'t been sleeping".'
      },
      {
        question: 'We _____ each other since childhood.',
        options: ['have been knowing', 'have known', 'know', 'are knowing'],
        answer: 1,
        explanation: '"Know" holat fe\'li, shuning uchun -ing olmaydi: "have known".'
      }
    ]
  },
  {
    id: 'b1_3',
    level: 'B1',
    title: 'Past Perfect',
    titleUz: 'O\'tgan tugallangan zamon (O\'tmishdan oldingi o\'tmish)',
    isTense: true,
    summary: 'O\'tmishdagi ikki harakatdan qaysi biri birinchi bo\'lib sodir bo\'lganini aniq ko\'rsatish uchun ishlatiladi. Eng birinchi bo\'lgan ish Past Perfect, keyingi ish Past Simple bo\'ladi.',
    usage: [
      'O\'tmishdagi boshqa harakatdan OLDIN sodir bo\'lgan ish: When I arrived at the station, the train had already left.',
      'O\'tmishdagi muayyan vaqtgacha tugallangan harakat (by 5:00 PM, by the time...): By 2020, he had graduated from university.',
      'Signal so\'zlar: before, after, already, by the time, when.'
    ],
    formula: {
      affirmative: 'Subject + had + V3 (Past Participle) (He had finished the test)',
      negative: 'Subject + hadn\'t (had not) + V3 (She hadn\'t seen the film before)',
      question: 'Had + Subject + V3? (Had you studied English before you moved to London?)'
    },
    examples: [
      { en: 'When I arrived at the cinema, the movie had already started.', uz: 'Kinoteatrga yetib borganimda, kino allaqachon boshlanib bo\'lgan edi.' },
      { en: 'She realized that she had forgotten her passport at home.', uz: 'U pasportini uyda unutib qoldirganini anglab yetdi.' },
      { en: 'By the time the firemen arrived, the neighbors had put out the fire.', uz: 'O\'t o\'chiruvchilar yetib kelguncha, qo\'shnilar olovni o\'chirib bo\'lishgandi.' },
      { en: 'I hadn\'t visited Europe before my trip to Italy.', uz: 'Italiyaga sayohatimga qadar men Yevropada bo\'lmagan edim.' },
      { en: 'Had you ever tasted caviar before last night\'s dinner?', uz: 'Kecha oqshomdagi ovqatga qadar hech ikra tatib ko\'rganmidingiz?' },
      { en: 'After he had finished his dinner, he went for a walk.', uz: 'Kechki ovqatni tugatgach, u sayrga chiqdi.' },
      { en: 'He was nervous because he hadn\'t flown in an airplane before.', uz: 'U xavotirda edi, chunki ilgari hech samolyotda uchmagan edi.' },
      { en: 'The streets were flooded because it had rained heavily.', uz: 'Ko\'chalarni suv bosgan edi, chunki kuchli yomg\'ir yog\'gan edi.' }
    ],
    mistakes: [
      { wrong: 'When I arrived, the train left.', correct: 'When I arrived, the train had left.', note: 'Agar "left" desangiz, men yetib borgach poezd ketdi ma\'nosi chiqadi; oldin ketgan bo\'lsa "had left" shart.' },
      { wrong: 'She had went home.', correct: 'She had gone home.', note: '"Had" dan keyin fe\'lning 3-shakli (gone) bo\'lishi shart.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...-gan edi / ...-ib bo\'lgan edi" shakliga to\'g\'ri keladi (boshlanib bo\'lgan edi, ketib bo\'lgandi).',
    tip: '💡 Vaqt chizig\'ida tasavvur qiling: 1-harakat (eng qadimiy) = HAD + V3. 2-harakat (keyingi) = V2 (Past Simple).',
    exercises: [
      {
        question: 'When we got to the stadium, the match _____ already.',
        options: ['started', 'had started', 'has started', 'was starting'],
        answer: 1,
        explanation: 'Biz borguncha o\'yin oldinroq boshlangan: "had started".'
      },
      {
        question: 'She was sad because she _____ her favorite ring.',
        options: ['lost', 'has lost', 'had lost', 'losing'],
        answer: 2,
        explanation: 'Xafagarchilikdan oldin uzuk yo\'qolgan: "had lost".'
      },
      {
        question: 'By the time I was twenty, I _____ three languages.',
        options: ['learned', 'had learned', 'have learned', 'was learning'],
        answer: 1,
        explanation: '"By the time" bilan o\'tmishdagi muddatgacha bo\'lgan harakat: "had learned".'
      },
      {
        question: '_____ you checked all the answers before submitting the test?',
        options: ['Did', 'Had', 'Have', 'Were'],
        answer: 1,
        explanation: 'Topshirishdan oldin tekshirganmidingiz: "Had you checked...".'
      },
      {
        question: 'The teacher was angry because the student _____ his homework.',
        options: ['didn\'t do', 'hadn\'t done', 'hasn\'t done', 'not had done'],
        answer: 1,
        explanation: 'O\'qituvchi jahli chiqishidan oldin bola vazifani bajarmagan: "hadn\'t done".'
      }
    ]
  },
  {
    id: 'b1_4',
    level: 'B1',
    title: 'Used to / Would',
    titleUz: 'Used to va Would: O\'tmishdagi odatlar',
    isTense: false,
    summary: 'O\'tmishda muntazam qilingan, ammo hozirda to\'xtagan eski odatlar yoki o\'tmishdagi holatlarni tasvirlash uchun qo\'llaniladi.',
    usage: [
      '"Used to + V1" — o\'tmishdagi odatlar VA holatlar (states) uchun: I used to live in Paris, He used to have long hair.',
      '"Would + V1" — faqat o\'tmishda takrorlanuvchi harakatlar (actions) uchun, holatlar bilan ishlatilmaydi: Every summer, my father would take us fishing.',
      '"Didn\'t use to" — o\'tmishda qilinmagan odatlar: I didn\'t use to like vegetables when I was a child.'
    ],
    formula: {
      affirmative: 'Subject + used to + V1 / Subject + would + V1 (I used to smoke, Every day we would play)',
      negative: 'Subject + didn\'t use to + V1 (He didn\'t use to exercise)',
      question: 'Did + Subject + use to + V1? (Did you use to live here?)'
    },
    examples: [
      { en: 'I used to live in Bukhara when I was a child.', uz: 'Bolaligimda Buxoroda yashaganman (hozir yashamayman).' },
      { en: 'He used to play football professionally, but now he is a coach.', uz: 'U ilgari professional futbol o\'ynar edi, hozir esa murabbiy.' },
      { en: 'Every weekend, our grandmother would bake delicious bread for us.', uz: 'Har dam olish kunlari buvim bizga mazali non yopib berardilar.' },
      { en: 'I didn\'t use to drink coffee, but now I love it.', uz: 'Ilgari kofe ichmas edim, ammo hozir uni yaxshi ko\'raman.' },
      { en: 'Did you use to have a pet dog when you were young?', uz: 'Yoshligingizda uy itingiz bo\'larmidi?' },
      { en: 'There used to be an old cinema in this street.', uz: 'Ushbu ko\'chada ilgari eski kinoteatr bo\'lardi (holat - would ishlatib bo\'lmaydi).' },
      { en: 'We used to be close friends, but we drifted apart.', uz: 'Biz qalin do\'st edik, ammo keyinchalik uzoqlashib ketdik.' },
      { en: 'My grandfather would always tell us bedtime stories.', uz: 'Bobom bizga har doim uxlashdan oldin ertaklar aytib berardilar.' }
    ],
    mistakes: [
      { wrong: 'I use to live in London last year.', correct: 'I used to live in London.', note: 'O\'tmish shakli "used to" bo\'ladi, "d" harfi tushib qolmaydi.' },
      { wrong: 'Did you used to go?', correct: 'Did you use to go?', note: '"Did" bor joyda "used" emas, "use to" yoziladi.' },
      { wrong: 'There would be a cinema here.', correct: 'There used to be a cinema here.', note: '"Be, have, live, know" kabi holat fe\'llari bilan "would" ishlatilmaydi, faqat "used to".' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...-ar edim / ...-ish odatim bor edi" iboralariga to\'g\'ri keladi (yashar edim, o\'ynardik).',
    tip: '💡 Holat fe\'li (be, live, have, know) bo\'lsa — FAQAT "used to". Takrorlanuvchi harakat bo\'lsa — ham "used to", ham "would" to\'g\'ri.',
    exercises: [
      {
        question: 'I _____ long hair when I was a teenager.',
        options: ['used to have', 'would have', 'use to have', 'was having'],
        answer: 0,
        explanation: '"Have" (egalik) holat fe\'li, u bilan "would" emas, faqat "used to have" bo\'ladi.'
      },
      {
        question: 'Did you _____ live in this neighborhood?',
        options: ['use to', 'used to', 'using to', 'used'],
        answer: 0,
        explanation: '"Did" so\'rog\'ida fe\'l asosiy shaklga qaytadi: "Did you use to...".'
      },
      {
        question: 'Every summer, we _____ go to the mountains for camping.',
        options: ['would', 'used', 'use to', 'are used to'],
        answer: 0,
        explanation: 'O\'tmishdagi muntazam takrorlanuvchi harakat: "would go".'
      },
      {
        question: 'He _____ smoke, but he quit five years ago.',
        options: ['used to', 'is used to', 'would to', 'uses to'],
        answer: 0,
        explanation: 'O\'tmishda bo\'lgan va to\'xtagan odat: "used to smoke".'
      },
      {
        question: 'She _____ like classical music, but now she listens to it every day.',
        options: ['didn\'t use to', 'didn\'t used to', 'not used to', 'wouldn\'t to'],
        answer: 0,
        explanation: 'Inkor shakl: "didn\'t use to".'
      }
    ]
  },
  {
    id: 'b1_5',
    level: 'B1',
    title: 'Second Conditional',
    titleUz: 'Ikkinchi shart mayli (Hozirgi noaniq/xayoliy shart)',
    isTense: false,
    summary: 'Hozirgi yoki kelajakdagi nohaqiqiy, xayoliy yoki amalga oshishi dargumon bo\'lgan shart va orzularni ifodalash uchun ishlatiladi.',
    usage: [
      'Xayoliy yoki orzu qilingan vaziyatlar: If I won a million dollars, I would travel around the world.',
      'Hozirgi haqiqatga zid bo\'lgan holatlar: If I had more free time, I would learn Spanish (ammo vaqtim yo\'q).',
      'Maslahat berishda mashhur qolip: If I were you, I would accept the job offer.',
      'E\'tibor bering: rasmiy ingliz tilida "I/he/she/it" bilan "was" o\'rniga "were" ishlatiladi.'
    ],
    formula: {
      affirmative: 'If + Past Simple, would + V1 (If I knew the answer, I would tell you)',
      negative: 'If I didn\'t have to work tomorrow, I would sleep in.',
      question: 'What would you do if you were the president?'
    },
    examples: [
      { en: 'If I had a car, I would drive to work every day.', uz: 'Mashinam bo\'lganida, har kuni ishga mashinada borardim (ammo mashinam yo\'q).' },
      { en: 'If I were you, I would consult a professional doctor.', uz: 'Sizning o\'rningizda bo\'lganimda, professional shifokorga murojaat qilardim.' },
      { en: 'What would you do if you found a wallet on the street?', uz: 'Ko\'chada hamyon topib olsangiz, nima qilgan bo\'lardingiz?' },
      { en: 'If she knew his telephone number, she would call him.', uz: 'U uning raqamini bilganida, qo\'ng\'iroq qilgan bo\'lardi.' },
      { en: 'We would buy a bigger house if we could afford it.', uz: 'Agar imkoniyatimiz yetganida, kattaroq uy sotib olardik.' },
      { en: 'If it weren\'t raining so hard, we could go for a walk.', uz: 'Yomg\'ir bunchalik kuchli yog\'mayotgan bo\'lganida, sayrga chiqishimiz mumkin edi.' },
      { en: 'I would help you if I weren\'t so busy right now.', uz: 'Hozir bunchalik band bo\'lmaganimda, sizga yordam bergan bo\'lardim.' },
      { en: 'If he exercised more often, he would feel healthier.', uz: 'U tez-tez sport bilan shug\'ullanganida, o\'zini sog\'lomroq his qilardi.' }
    ],
    mistakes: [
      { wrong: 'If I will have money, I would buy a car.', correct: 'If I had money, I would buy a car.', note: '"If" qismiga hech qachon "will" yoki "would" qo\'yilmaydi! Faqat Past Simple bo\'ladi.' },
      { wrong: 'If I was you...', correct: 'If I were you...', note: 'Maslahat qolipida "were" qat\'iy me\'yordir.' },
      { wrong: 'If I won, I will travel.', correct: 'If I won, I would travel.', note: 'Past Simple bilan "will" emas, "would" mos keladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...-ganimda edi, ...-ar edim" shart-istak shakliga to\'liq mos keladi (bilganimda aytardim).',
    tip: '💡 Formula: If + Past Simple (shart) → would + fe\'l (natija). Maslahatda har doim "If I WERE you".',
    exercises: [
      {
        question: 'If I _____ you, I would take that opportunity immediately.',
        options: ['am', 'was', 'were', 'would be'],
        answer: 2,
        explanation: 'Ikkinchi shart maylida qat\'iy qoida: "If I were you".'
      },
      {
        question: 'If she had more free time, she _____ another foreign language.',
        options: ['learns', 'would learn', 'will learn', 'learned'],
        answer: 1,
        explanation: 'Past Simple shartining natijasi "would + fe\'l" bo\'ladi: "would learn".'
      },
      {
        question: 'What _____ you do if you won the lottery jackpot?',
        options: ['will', 'would', 'do', 'did'],
        answer: 1,
        explanation: 'Xayoliy savol natija qismida "would" ishlatiladi.'
      },
      {
        question: 'We would visit you more often if you _____ closer to us.',
        options: ['lived', 'live', 'would live', 'will live'],
        answer: 0,
        explanation: '"If" li shart qismida Past Simple kelishi kerak: "lived".'
      },
      {
        question: 'If he _____ so stubbornly, everyone would like him.',
        options: ['didn\'t behave', 'doesn\'t behave', 'won\'t behave', 'wouldn\'t behave'],
        answer: 0,
        explanation: 'Shart qismining inkori: "didn\'t behave".'
      }
    ]
  },
  {
    id: 'b1_6',
    level: 'B1',
    title: 'Passive Voice (Present & Past Simple)',
    titleUz: 'Majhul nisbat (Present va Past Simple)',
    isTense: false,
    summary: 'Ish-harakatni kim bajarganligi emas, balki harakatning ob\'ektga (narsaga) nisbatan bajarilgani muhimroq bo\'lganda yoki ijrochi noma\'lum bo\'lganda ishlatiladi.',
    usage: [
      'Ijrochi noma\'lum yoki ahamiyatsiz bo\'lganda: The window was broken yesterday.',
      'Yangiliklar, rasmiy va ilmiy jarayonlarni tasvirlashda: Cotton is grown in Uzbekistan.',
      'Agar ijrochini aytish kerak bo\'lsa, gap oxirida "by" predlogi qo\'yiladi: The novel was written by Abdulla Qodiriy.'
    ],
    formula: {
      affirmative: 'Present: am/is/are + V3 (English is spoken here) | Past: was/were + V3 (The car was repaired)',
      negative: 'The letter wasn\'t sent yesterday / These cars aren\'t made in China',
      question: 'Is Spanish spoken in Brazil? / When was this bridge built?'
    },
    examples: [
      { en: 'English is spoken by millions of people worldwide.', uz: 'Ingliz tili butun dunyo bo\'ylab millionlab insonlar tomonidan so\'zlashiladi.' },
      { en: 'This ancient mosque was built in the 14th century.', uz: 'Ushbu qadimiy masjid 14-asrda qurilgan.' },
      { en: 'Thousands of cars are produced in Asaka every month.', uz: 'Asakada har oy minglab avtomobillar ishlab chiqariladi.' },
      { en: 'The Mona Lisa was painted by Leonardo da Vinci.', uz: 'Mona Liza Leonardo da Vinchi tomonidan chizilgan.' },
      { en: 'The parcel wasn\'t delivered on time.', uz: 'Posilka o\'z vaqtida yetkazib berilmadi.' },
      { en: 'How often are these offices cleaned?', uz: 'Bu ofislar qanchalik tez-tez tozalanadi?' },
      { en: 'Where were these photos taken?', uz: 'Bu suratlar qayerda olingan?' },
      { en: 'The stolen jewellery was found by the police.', uz: 'O\'g\'irlangan taqinchoqlar politsiya tomonidan topildi.' }
    ],
    mistakes: [
      { wrong: 'The car washed yesterday.', correct: 'The car was washed yesterday.', note: '"To be" (was) fe\'lisiz majhul nisbat yasalmaydi! Mashinaning o\'zi yuvinmaydi.' },
      { wrong: 'English is speak here.', correct: 'English is spoken here.', note: 'Fe\'lning 3-shakli (V3 - spoken) bo\'lishi shart.' },
      { wrong: 'Written by Shakespeare.', correct: 'It was written by Shakespeare.', note: 'Ega va yordamchi fe\'l tushib qolmasligi lozim.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi majhul nisbat qo\'shimchalariga (-il, -in, masalan: qurildi, aytiladi, yozilgan) to\'g\'ri keladi.',
    tip: '💡 Majhul nisbat formulasi: BE (am/is/are/was/were) + V3 (Past Participle). "By" esa kim tomonidan qilinganini bildiradi.',
    exercises: [
      {
        question: 'The famous book "O\'tkan Kunlar" _____ by Abdulla Qodiriy.',
        options: ['wrote', 'was written', 'is wrote', 'has wrote'],
        answer: 1,
        explanation: 'O\'tgan zamondagi majhul nisbat: "was written".'
      },
      {
        question: 'Millions of mobile phones _____ in Asia every year.',
        options: ['produce', 'are produced', 'were produced', 'is produced'],
        answer: 1,
        explanation: 'Ko\'plikdagi umumiy hozirgi fakt: "are produced".'
      },
      {
        question: 'When _____ the Eiffel Tower built?',
        options: ['is', 'was', 'did', 'were'],
        answer: 1,
        explanation: 'Eiffel minorasi bitta birlik o\'tgan zamon: "was built".'
      },
      {
        question: 'These documents _____ signed yesterday afternoon.',
        options: ['weren\'t', 'wasn\'t', 'didn\'t', 'aren\'t'],
        answer: 0,
        explanation: '"Documents" ko\'plikda bo\'lgani uchun o\'tgan zamon inkori "weren\'t signed".'
      },
      {
        question: 'Bread _____ from wheat flour.',
        options: ['makes', 'is made', 'is make', 'are made'],
        answer: 1,
        explanation: '"Bread" birlik sanalmaydigan ot: "is made".'
      }
    ]
  },
  {
    id: 'b1_7',
    level: 'B1',
    title: 'Reported Speech (Statements)',
    titleUz: 'O\'zlashtirma gap (Darak gaplar)',
    isTense: false,
    summary: 'Birovning aytgan so\'zlarini o\'zgartirib, boshqa odamga yetkazib berish qoidalari. Asosiy qoida: agar yetkazuvchi fe\'l o\'tgan zamonda bo\'lsa (said, told), zamonlar bir pog\'ona orqaga siljiydi (Backshift).',
    usage: [
      'Present Simple → Past Simple: "I am happy" → He said that he was happy.',
      'Present Continuous → Past Continuous: "I am working" → She said that she was working.',
      'Past Simple & Present Perfect → Past Perfect: "I bought a car" → He said that he had bought a car.',
      'Will → Would, Can → Could: "I will call" → He said that he would call.',
      '"Say" (kimsiz: He said that...) va "Tell" (kimga aytilgani bilan: He told ME that...).'
    ],
    formula: {
      affirmative: 'Subject + said / told someone + (that) + orqaga surilgan zamon',
      negative: 'She told me that she didn\'t like loud music.',
      question: 'Olmoshlar ham o\'zgaradi: "I" → he/she, "my" → his/her, "here" → there, "today" → that day.'
    },
    examples: [
      { en: 'Direct: "I live in Tashkent." → Reported: He said that he lived in Tashkent.', uz: '"Men Toshkentda yashayman" → U Toshkentda yashashini aytdi.' },
      { en: 'Direct: "I am studying." → Reported: She told me that she was studying.', uz: '"Men o\'qiyapman" → U o\'qiyotganini menga aytdi.' },
      { en: 'Direct: "I will help you." → Reported: Jack said that he would help me.', uz: '"Senga yordam beraman" → Jack menga yordam berishini aytdi.' },
      { en: 'Direct: "I can speak French." → Reported: She said she could speak French.', uz: '"Fransuzcha gapira olaman" → U fransuzcha gapira olishini aytdi.' },
      { en: 'Direct: "I have lost my key." → Reported: He said he had lost his key.', uz: '"Kalitimni yo\'qotdim" → U kalitini yo\'qotib qo\'yganini aytdi.' },
      { en: 'She told her mother that she was feeling ill.', uz: 'U onasiga o\'zini kasal his qilayotganini aytdi.' },
      { en: 'They said that they didn\'t have enough money.', uz: 'Ular yetarli pullari yo\'qligini aytishdi.' },
      { en: 'He told me that he had already finished the project.', uz: 'U menga loyihani allaqachon tugatganini aytdi.' }
    ],
    mistakes: [
      { wrong: 'He said me that...', correct: 'He told me that... / He said that...', note: '"Say" dan keyin to\'g\'ridan-to\'g\'ri shaxs (me) kelmaydi. "Tell" kimga aytilganini talab qiladi (told me).' },
      { wrong: 'She said that she will come.', correct: 'She said that she would come.', note: 'O\'tgan zamonda aytilgani uchun "will" o\'rniga "would" bo\'ladi.' }
    ],
    uzbekComparison: 'O\'zbek tilida "...-ganini aytdi / ...-shini bildirdi" shakliga to\'g\'ri keladi (kelishini aytdi, bandligini aytdi).',
    tip: '💡 Zamonlar narvoni: am/is → was, are → were, do → did, have → had, will → would, can → could.',
    exercises: [
      {
        question: '"I am really tired," Anna said. → Anna said that she _____ really tired.',
        options: ['is', 'was', 'were', 'had been'],
        answer: 1,
        explanation: 'Present Simple (am) o\'zlashtirma gapda Past Simple (was) ga aylanadi.'
      },
      {
        question: 'He _____ me that he was planning to buy a new laptop.',
        options: ['said', 'told', 'spoke', 'talked'],
        answer: 1,
        explanation: 'Shaxs (me) ko\'rsatilgani uchun "told me" to\'g\'ri bo\'ladi.'
      },
      {
        question: '"I will call you tomorrow," David said. → David said that he _____ call me the next day.',
        options: ['will', 'would', 'can', 'shall'],
        answer: 1,
        explanation: '"Will" o\'zlashtirma gapda "would" ga o\'zgaradi.'
      },
      {
        question: '"We have finished the task." → They said that they _____ the task.',
        options: ['have finished', 'had finished', 'finished', 'were finishing'],
        answer: 1,
        explanation: 'Present Perfect (have finished) o\'rniga Past Perfect (had finished) keladi.'
      },
      {
        question: 'She said that she _____ swim when she was five years old.',
        options: ['can', 'could', 'is able to', 'can to'],
        answer: 1,
        explanation: '"Can" o\'tmishga qarab "could" ga aylanadi.'
      }
    ]
  },
  {
    id: 'b1_8',
    level: 'B1',
    title: 'Defining Relative Clauses',
    titleUz: 'Aniqlovchi ergash gaplar (who, which, that, where)',
    isTense: false,
    summary: 'Gapdagi biror shaxs, buyum yoki joy haqida zaruriy ma\'lumot beruvchi va gapning ma\'nosi uchun ajralmas bo\'lgan ergash gaplar.',
    usage: [
      '"Who" yoki "That" — insonlar uchun: The man who called you is my uncle.',
      '"Which" yoki "That" — narsa va hayvonlar uchun: The book which you gave me is great.',
      '"Where" — joy va makonlar uchun: The restaurant where we had dinner was quiet.',
      '"Whose" — egalik uchun: I know a girl whose mother is an artist.',
      'Defining (zaruriy) ergash gaplarda vergul ishlatilmaydi!'
    ],
    formula: {
      affirmative: 'Inson + who/that + gap | Narsa + which/that + gap | Joy + where + gap',
      negative: 'I don\'t like people who break their promises.',
      question: 'Do you know the woman who is talking to the manager?'
    },
    examples: [
      { en: 'The boy who won the race is my younger cousin.', uz: 'Poygada g\'olib chiqqan bola mening jiyanim.' },
      { en: 'I bought a laptop that was on sale yesterday.', uz: 'Men kecha chegirmada bo\'lgan noutbukni sotib oldim.' },
      { en: 'This is the town where Amir Timur was born.', uz: 'Bu Amir Temur tavallud topgan shahar (Shahrisabz).' },
      { en: 'A doctor is someone who treats sick people.', uz: 'Shifokor — bu bemorlarni davolaydigan shaxs.' },
      { en: 'Have you seen the umbrella which I left on the chair?', uz: 'Men stulda qoldirgan soyabonni ko\'rdingizmi?' },
      { en: 'I met a woman whose son studies in Harvard.', uz: 'Men o\'g\'li Garvardda o\'qiydigan ayol bilan tanishdim.' },
      { en: 'The smartphone that I bought last week is very fast.', uz: 'O\'tgan hafta sotib olgan smartfonim juda tez ishlaydi.' },
      { en: 'A hospital is a place where patients are cared for.', uz: 'Kasalxona — bu bemorlar parvarish qilinadigan joy.' }
    ],
    mistakes: [
      { wrong: 'The man which called you.', correct: 'The man who called you.', note: 'Insonlar uchun "which" emas, faqat "who" yoki "that" ishlatiladi.' },
      { wrong: 'The city where I visited.', correct: 'The city which/that I visited.', note: '"Visit" fe\'li to\'g\'ridan-to\'g\'ri to\'ldiruvchi oladi, shuning uchun "where" emas, "which" bo\'ladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...-gan odam / ...-gan kitob / ...-gan joy" sifatdoshli birikmalariga to\'g\'ri keladi (kelgan odam = the man who came).',
    tip: '💡 Odamga: WHO. Narsaga: WHICH. Ikkalasiga ham o\'tadigani: THAT. Joyga: WHERE. Kimningdir narsasiga: WHOSE.',
    exercises: [
      {
        question: 'The teacher _____ teaches us mathematics is very patient.',
        options: ['who', 'which', 'where', 'whose'],
        answer: 0,
        explanation: 'O\'qituvchi (inson) bo\'lgani uchun "who" to\'g\'ri.'
      },
      {
        question: 'I lost the watch _____ my father gave me for graduation.',
        options: ['who', 'which', 'where', 'whose'],
        answer: 1,
        explanation: 'Soat (narsa) uchun "which" (yoki that) ishlatiladi.'
      },
      {
        question: 'That is the bakery _____ makes the best fresh bread.',
        options: ['where', 'that', 'who', 'whose'],
        answer: 1,
        explanation: 'Ega vazifasida kelgan novvoyxona (narsa/tashkilot) uchun "that" to\'g\'ri keladi.'
      },
      {
        question: 'This is the park _____ we used to play football every summer.',
        options: ['which', 'where', 'that', 'who'],
        answer: 1,
        explanation: 'Ichida harakat sodir bo\'ladigan joy ma\'nosida "where".'
      },
      {
        question: 'I met a student _____ sister works at the embassy.',
        options: ['who', 'whose', 'which', 'whom'],
        answer: 1,
        explanation: 'Singlisi elchixonada ishlaydigan (egalik) talaba: "whose sister".'
      }
    ]
  },
  {
    id: 'b1_9',
    level: 'B1',
    title: 'Modals of deduction (must be, might, can\'t be)',
    titleUz: 'Xulosa va ehtimol modal fe\'llari (Hozirgi zamon)',
    isTense: false,
    summary: 'Mavjud dalillarga asoslanib, biror holatning qanchalik haqiqat ekanligini mantiqiy taxmin qilishda ishlatiladi.',
    usage: [
      '"Must be" (95% ishonch — aniq shunday): Look at his big house and luxury car. He must be rich.',
      '"Might / May / Could be" (50% ehtimol — bo\'lishi ham, bo\'lmasligi ham mumkin): Take an umbrella, it might rain later.',
      '"Can\'t be" (95% inkor ishonch — aslo unday bo\'lishi mumkin emas): He can\'t be hungry, he just ate two plates of plov.',
      'Diqqat: "Mustn\'t" ehtimol ma\'nosida ishlatilmaydi! Inkor taxmin faqat "can\'t be" bilan aytiladi.'
    ],
    formula: {
      affirmative: 'Subject + must / might / could + V1 (He must know the truth)',
      negative: 'Subject + can\'t / might not + V1 (She can\'t be at home right now)',
      question: 'Could he be telling the truth?'
    },
    examples: [
      { en: 'You have been studying all day. You must be exhausted.', uz: 'Kuni bo\'yi dars qildingiz. Aniq juda charchagansiz (95% ishonch).' },
      { en: 'That can\'t be Farhod. He is in London this week.', uz: 'U Farhod bo\'lishi aslo mumkin emas. U bu hafta Londonda.' },
      { en: 'Don\'t throw that paper away; it might be an important document.', uz: 'U qog\'ozni tashlab yubormang; muhim hujjat bo\'lishi mumkin (50% ehtimol).' },
      { en: 'The lights are off. They must be sleeping.', uz: 'Chiroqlar o\'chiq. Ular aniq uxlayotgan bo\'lishi kerak.' },
      { en: 'Where is your bag? — I am not sure, it could be in my car.', uz: 'Sumkang qayerda? — Aniq bilmayman, mashinamda bo\'lishi mumkin.' },
      { en: 'She isn\'t answering the phone. She might be driving.', uz: 'U telefonga javob bermayapti. Mashina haydayotgan bo\'lishi mumkin.' },
      { en: 'This diamond ring is so cheap; it can\'t be real.', uz: 'Bu olmos uzuk juda arzon; u haqiqiy bo\'lishi mumkin emas.' },
      { en: 'He speaks with an accent; he must be from another region.', uz: 'U sheva bilan gapirmoqda; u boshqa viloyatdan bo\'lishi aniq.' }
    ],
    mistakes: [
      { wrong: 'He mustn\'t be at home. His car is gone.', correct: 'He can\'t be at home. His car is gone.', note: 'Mantiqiy inkor xulosa uchun "mustn\'t" emas, "can\'t be" ishlatiladi.' },
      { wrong: 'It must to be true.', correct: 'It must be true.', note: 'Modal fe\'llardan keyin "to" qo\'yilmaydi.' }
    ],
    uzbekComparison: '"Must be" = "...bo\'lsa kerak / aniq ...dir"; "Might be" = "...bo\'lishi mumkin"; "Can\'t be" = "...bo\'lishi mumkin emas".',
    tip: '💡 Aniq shunday = MUST. Bo\'lishi mumkin = MIGHT / COULD. Aslo unday emas = CAN\'T. (Inkor taxminda "mustn\'t" aslo demang!).',
    exercises: [
      {
        question: 'He has won the international competition three times. He _____ be very skilled.',
        options: ['must', 'can\'t', 'might not', 'should to'],
        answer: 0,
        explanation: 'Dalil kuchli, shuning uchun ishonchli xulosa: "must be".'
      },
      {
        question: 'That woman _____ be his grandmother; she looks only twenty-five years old!',
        options: ['can\'t', 'must', 'might', 'could'],
        answer: 0,
        explanation: 'Bo\'lishi mutlaqo imkonsiz narsa: "can\'t be".'
      },
      {
        question: 'I don\'t know where my keys are. They _____ be on the kitchen table.',
        options: ['might', 'can\'t', 'mustn\'t', 'are to'],
        answer: 0,
        explanation: 'Noaniq 50% ehtimol: "might be".'
      },
      {
        question: 'The doorbell is ringing. It _____ be the courier with our pizza delivery.',
        options: ['must', 'can\'t', 'could to', 'mustn\'t'],
        answer: 0,
        explanation: 'Kutilayotgan mantiqiy xulosa: "must be".'
      },
      {
        question: 'You haven\'t eaten anything since yesterday! You _____ be starving.',
        options: ['must', 'can\'t', 'might not', 'should to'],
        answer: 0,
        explanation: 'Kecharoqdan beri ovqat yemagan odam aniq och qoladi: "must be starving".'
      }
    ]
  },
  {
    id: 'b1_10',
    level: 'B1',
    title: 'Gerund vs Infinitive (Farqlari & Fe\'llar ro\'yxati)',
    titleUz: 'Gerund va Infinitiv chuqur tahlili',
    isTense: false,
    summary: 'Ma\'nosi butunlay o\'zgaradigan fe\'llar (remember, stop, forget, try) va ulardan keyin qachon "-ing", qachon "to + fe\'l" qo\'yilishi.',
    usage: [
      'Stop + -ing: butunlay to\'xtatish (He stopped smoking = chekishni tashladi).',
      'Stop + to V1: boshqa ishni qilish uchun to\'xtash (He stopped to smoke = chekish uchun to\'xtadi).',
      'Remember + -ing: o\'tmishdagi xotirani eslash (I remember locking the door).',
      'Remember + to V1: unutmasdan biror ishni bajarish (Remember to lock the door).',
      'Try + -ing: sinab ko\'rish (Try drinking warm milk). Try + to V1: kuch sarflab harakat qilish (Try to open it).'
    ],
    formula: {
      affirmative: 'Fe\'l + V-ing (o\'tmish/odat) vs Fe\'l + to + V1 (kelajak/vazifa)',
      negative: 'Remember not to be late / She stopped drinking coffee',
      question: 'Did you remember to turn off the lights?'
    },
    examples: [
      { en: 'He stopped smoking two years ago.', uz: 'U ikki yil oldin chekishni butunlay tashladi (-ing).' },
      { en: 'While driving, he stopped to buy some water.', uz: 'Mashina haydab ketayotib, suv sotib olish uchun to\'xtadi (to + V1).' },
      { en: 'Please remember to lock the front door.', uz: 'Iltimos, old eshikni qulflashni unutmang (kelasi vazifa).' },
      { en: 'I remember visiting this fortress when I was seven.', uz: 'Yetti yoshimda bu qal\'aga borganimni yaxshi eslayman (xotira).' },
      { en: 'I tried to lift the heavy stone, but I couldn\'t.', uz: 'Og\'ir toshni ko\'tarishga qattiq urindim, ammo ko\'tarolmadim (harakat).' },
      { en: 'If you have a headache, try drinking more water.', uz: 'Boshingiz og\'riyotgan bo\'lsa, ko\'proq suv ichib ko\'ring (eksperiment).' },
      { en: 'I will never forget seeing the sunrise over the mountains.', uz: 'Tog\'lar uzra quyosh chiqishini ko\'rganimni hech qachon unutmayman.' },
      { en: 'Don\'t forget to send the email before 5:00 PM.', uz: 'Soat 17:00 gacha xatni yuborishni unutmang.' }
    ],
    mistakes: [
      { wrong: 'I stopped to smoke, so my health improved.', correct: 'I stopped smoking, so my health improved.', note: 'Chekishni tashlash "stop smoking" bo\'ladi; "stop to smoke" chekish uchun to\'xtashni bildiradi.' },
      { wrong: 'Remember buying milk on your way home.', correct: 'Remember to buy milk on your way home.', note: 'Yo\'l-yo\'lakay esdan chiqarmasdan qilish uchun "remember to buy" deyiladi.' }
    ],
    uzbekComparison: 'O\'zbek tilida bu farq so\'z qo\'shish orqali tushuntiriladi: "chekishni tashladi" vs "chekish uchun to\'xtadi".',
    tip: '💡 REMEMBER / FORGET: To + V1 = kelajakdagi vazifani esdan chiqarma. V-ing = o\'tmishdagi xotirani eslash.',
    exercises: [
      {
        question: 'Don\'t forget _____ the windows before you leave the house.',
        options: ['close', 'to close', 'closing', 'closed'],
        answer: 1,
        explanation: 'Esdan chiqarmay bajarish kerak bo\'lgan vazifa: "to close".'
      },
      {
        question: 'I clearly remember _____ my passport in the top drawer yesterday.',
        options: ['putting', 'to put', 'put', 'have put'],
        answer: 0,
        explanation: 'O\'tmishdagi harakat xotirasi: "remember putting".'
      },
      {
        question: 'He was coughing badly, so the doctor told him to stop _____.',
        options: ['smoke', 'to smoke', 'smoking', 'smoked'],
        answer: 2,
        explanation: 'Zararli odatni butunlay to\'xtatish: "stop smoking".'
      },
      {
        question: 'On our way to Samarkand, we stopped _____ some gas.',
        options: ['buying', 'to buy', 'buy', 'bought'],
        answer: 1,
        explanation: 'Yoqilg\'i sotib olish maqsadida to\'xtash: "stopped to buy".'
      },
      {
        question: 'The room was too hot, so I tried _____ the window.',
        options: ['open', 'to open', 'opening', 'opened'],
        answer: 2,
        explanation: 'Yordam berarmikan deb sinab ko\'rish (eksperiment): "tried opening".'
      }
    ]
  },
  {
    id: 'b1_11',
    level: 'B1',
    title: 'Question tags',
    titleUz: 'Tasdiq so\'roqlari: "...shunday emasmi?"',
    isTense: false,
    summary: 'Gap oxirida kelib, fikrni tasdiqlash yoki tinglovchining roziligini bilish uchun ishlatiladigan qisqa so\'roq qo\'shimchalari.',
    usage: [
      'Darak gap bo\'lsa → inkor tag qo\'yiladi: You are a student, aren\'t you?',
      'Inkor gap bo\'lsa → tasdiq tag qo\'yiladi: You aren\'t tired, are you?',
      'Asosiy gapdagi yordamchi fe\'l (is, are, do, does, did, have, can, will) tagda qaytariladi.',
      'Maxsus holatlar: I am late, aren\'t I? | Let\'s go, shall we? | Open the door, will you?'
    ],
    formula: {
      affirmative: 'Darak jumla (+), inkor tag (-) ? (She speaks English, doesn\'t she?)',
      negative: 'Inkor jumla (-), tasdiq tag (+) ? (They didn\'t come, did they?)',
      question: 'Intonatsiya pastga tushsa — shunchaki tasdiq so\'rash; yuqoriga ko\'tarilsa — haqiqiy savol.'
    },
    examples: [
      { en: 'You live in Tashkent, don\'t you?', uz: 'Siz Toshkentda yashaysiz, shunday emasmi?' },
      { en: 'She isn\'t ready yet, is she?', uz: 'U hali tayyor emas, shundaymi?' },
      { en: 'They bought a new house, didn\'t they?', uz: 'Ular yangi uy sotib olishdi, shunday emasmi?' },
      { en: 'He can speak three languages, can\'t he?', uz: 'U uchta tilda gaplasha oladi, to\'g\'rimi?' },
      { en: 'You haven\'t seen my glasses, have you?', uz: 'Ko\'zoynagimni ko\'rmadingizmi, a?' },
      { en: 'We will meet tomorrow, won\'t we?', uz: 'Biz ertaga ko\'rishamiz, shunday emasmi?' },
      { en: 'I am right, aren\'t I?', uz: 'Men haqman, shunday emasmi? ("aren\'t I" qoidasi).' },
      { en: 'Let\'s take a short break, shall we?', uz: 'Keling, qisqa tanaffus qilaylik, maylimi?' }
    ],
    mistakes: [
      { wrong: 'You like tea, isn\'t it?', correct: 'You like tea, don\'t you?', note: 'Ingliz tilida har doim "isn\'t it" deyilmaydi; gapning fe\'liga mos (don\'t you) tanlanadi.' },
      { wrong: 'She works here, doesn\'t she work?', correct: 'She works here, doesn\'t she?', note: 'Tag qismida asosiy fe\'l qaytarilmaydi, faqat yordamchi va olmosh bo\'ladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...shunday emasmi?", "...-a?", "...to\'g\'rimi?" so\'roq iboralariga to\'g\'ri keladi.',
    tip: '💡 Qutblar qoidasi: Gap (+) bo\'lsa, dumi (-) bo\'ladi. Gap (-) bo\'lsa, dumi (+) bo\'ladi.',
    exercises: [
      {
        question: 'Your brother lives in Canada, _____?',
        options: ['isn\'t he', 'doesn\'t he', 'don\'t he', 'isn\'t it'],
        answer: 1,
        explanation: '"Lives" Present Simple uchinchi shaxs bo\'lgani uchun tag "doesn\'t he".'
      },
      {
        question: 'They didn\'t finish the homework on time, _____?',
        options: ['did they', 'didn\'t they', 'do they', 'haven\'t they'],
        answer: 0,
        explanation: 'Inkor gap ("didn\'t finish") ga tasdiq tag "did they" keladi.'
      },
      {
        question: 'You haven\'t eaten lunch yet, _____?',
        options: ['have you', 'haven\'t you', 'did you', 'do you'],
        answer: 0,
        explanation: '"Haven\'t eaten" ning dumi ijobiy "have you" bo\'ladi.'
      },
      {
        question: 'I am on time for the meeting, _____?',
        options: ['amn\'t I', 'aren\'t I', 'am I not', 'isn\'t I'],
        answer: 1,
        explanation: '"I am" ning so\'roq tagi grammatik qoida bo\'yicha "aren\'t I" bo\'ladi.'
      },
      {
        question: 'Let\'s go for a walk in the park, _____?',
        options: ['will we', 'shall we', 'don\'t we', 'do we'],
        answer: 1,
        explanation: '"Let\'s" bilan boshlangan takliflarning tagi "shall we" bo\'ladi.'
      }
    ]
  },
  {
    id: 'b1_12',
    level: 'B1',
    title: 'So, Such, Too, Enough (Chuqurroq)',
    titleUz: 'Kuchaytiruvchi va me\'yor iboralari: so, such, too, enough',
    isTense: false,
    summary: 'Sifat va otlarning darajasini kuchaytirish hamda natijasini ko\'rsatish (so... that / such... that) qoidalari.',
    usage: [
      '"So" + sifat / ravish: The movie was so interesting that I watched it twice.',
      '"Such" + (a/an) + sifat + ot: It was such an interesting movie that I watched it twice.',
      '"Too" + sifat: salbiy haddan tashqari daraja (too expensive to buy).',
      'Sifat + "enough": ijobiy yetarli daraja (clever enough to understand).'
    ],
    formula: {
      affirmative: 'so + Adjective/Adverb | such + a/an + Adjective + Noun | so... that / such... that',
      negative: 'It wasn\'t warm enough to swim.',
      question: 'Why are you driving so fast?'
    },
    examples: [
      { en: 'The weather was so cold that the lake froze.', uz: 'Havo shunchalik sovuq ediki, hatto ko\'l muzlab qoldi.' },
      { en: 'She is such a kind person that everyone loves her.', uz: 'U shunchalik mehribon insonki, barcha uni yaxshi ko\'radi.' },
      { en: 'They had such a good time in Samarkand.', uz: 'Ular Samarqandda shunchalik ajoyib vaqt o\'tkazishdiki.' },
      { en: 'He was running so fast that nobody could catch him.', uz: 'U shunchalik tez yugurayotgan ediki, hech kim unga yetolmasdi.' },
      { en: 'This coffee is too bitter to drink without sugar.', uz: 'Bu kofe shakarsiz ichish uchun haddan ziyod achchiq.' },
      { en: 'Is your English good enough to pass the B1 exam?', uz: 'Ingliz tilingiz B1 imtihonidan o\'tish uchun yetarlicha yaxshimi?' },
      { en: 'There were so many people that we couldn\'t find seats.', uz: 'Odamlar shunchalik ko\'p ediki, o\'tirishga joy topolmadik.' },
      { en: 'It was such terrible weather that we stayed indoors.', uz: 'Ob-havo shunchalik yomon ediki, uyda qoldik (sanalmaydigan otda "a" yo\'q).' }
    ],
    mistakes: [
      { wrong: 'It was so good book.', correct: 'It was such a good book / The book was so good.', note: 'Ot (book) bo\'lsa "so" emas, "such a" ishlatiladi.' },
      { wrong: 'such a beautiful flowers', correct: 'such beautiful flowers', note: 'Ko\'plikdagi otlar (flowers) oldida "a" qo\'yilmaydi, faqat "such" bo\'ladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "shunchalik ...-ki" birikmasiga to\'g\'ri keladi (shunchalik qiziq ediki = so interesting that).',
    tip: '💡 SO dan keyin faqat bitta SIFAT keladi (so beautiful). SUCH dan keyin esa OT ham qatnashadi (such a beautiful day).',
    exercises: [
      {
        question: 'The exam was _____ difficult that almost half the students failed.',
        options: ['so', 'such', 'too', 'enough'],
        answer: 0,
        explanation: 'Faqat bitta sifat (difficult) va ketidan "that" kelganda "so" bo\'ladi.'
      },
      {
        question: 'It was _____ amazing performance that the audience gave a standing ovation.',
        options: ['so', 'such an', 'such a', 'too'],
        answer: 1,
        explanation: '"Amazing" unli bilan boshlangan birlik ot (performance) oldida "such an".'
      },
      {
        question: 'They are _____ nice people that we love visiting them.',
        options: ['so', 'such', 'such a', 'too'],
        answer: 1,
        explanation: '"People" ko\'plikda bo\'lgani uchun artiklsiz "such" olinadi.'
      },
      {
        question: 'The music is _____ loud; please turn it down a bit.',
        options: ['so', 'too', 'such', 'enough'],
        answer: 1,
        explanation: 'Salbiy haddan ziyodlik uchun "too loud".'
      },
      {
        question: 'He isn\'t experienced _____ to manage such a complex project alone.',
        options: ['too', 'enough', 'so', 'such'],
        answer: 1,
        explanation: 'Sifatdan keyin yetarlilik darajasi: "experienced enough".'
      }
    ]
  },
  {
    id: 'b1_13',
    level: 'B1',
    title: 'Future Continuous (Kirish)',
    titleUz: 'Kelasi davomli zamon (Kelajakdagi jarayon)',
    isTense: true,
    summary: 'Kelajakda aniq bir vaqtda yoki muddatda ayni davom etib turgan bo\'ladigan jarayonli ish-harakatlarni ifodalaydi.',
    usage: [
      'Kelajakda ma\'lum bir soatda davom etayotgan bo\'ladigan ish: At 10:00 AM tomorrow, I will be taking my exam.',
      'Kelajakdagi tabiiy odatiy jarayon: Don\'t call at 8, we will be having dinner.',
      'Muloyimlik bilan birovning rejasini so\'rash: Will you be using your car tomorrow?'
    ],
    formula: {
      affirmative: 'Subject + will be + V-ing (I will be working, She will be sleeping)',
      negative: 'Subject + won\'t be + V-ing (We won\'t be using the room)',
      question: 'Will + Subject + be + V-ing? (Will you be waiting for me at the airport?)'
    },
    examples: [
      { en: 'This time tomorrow, I will be flying to London.', uz: 'Ertaga ayni shu paytda men Londonga uchayotgan bo\'laman.' },
      { en: 'Don\'t call him at 3:00 PM; he will be presenting his project.', uz: 'Soat 15:00 da unga telefon qilmang; u loyihasini taqdim etayotgan bo\'ladi.' },
      { en: 'At this time next week, we will be lying on the beach.', uz: 'Kelasi hafta ayni shu paytda biz plyajda dam olayotgan bo\'lamiz.' },
      { en: 'Will you be passing by the pharmacy on your way home?', uz: 'Uyga ketayotib dorixona yonidan o\'tayotgan bo\'lasizmi? (muloyim iltimos oldidan).' },
      { en: 'I won\'t be working on Saturday, so we can meet.', uz: 'Shanba kuni ishlamayotgan bo\'laman, shuning uchun ko\'rishishimiz mumkin.' },
      { en: 'They will be celebrating their graduation all evening.', uz: 'Ular butun oqshom bitiruvlarini nishonlayotgan bo\'lishadi.' },
      { en: 'What will you be doing at 8 o\'clock tonight?', uz: 'Bugun kechqurun soat 8 da nima qilayotgan bo\'lasiz?' },
      { en: 'She will be waiting for you right outside the gate.', uz: 'U sizni to\'g\'ridan-to\'g\'ri darvoza tashqarisida kutib turgan bo\'ladi.' }
    ],
    mistakes: [
      { wrong: 'I will be work.', correct: 'I will be working.', note: 'Fe\'lga albatta "-ing" qo\'shilishi kerak.' },
      { wrong: 'This time tomorrow I will fly.', correct: 'This time tomorrow I will be flying.', note: 'Ayni bir aniq kelasi paytdagi jarayon bo\'lsa Future Continuous to\'g\'riroq.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...-ayotgan bo\'laman" shakliga to\'liq mos keladi (o\'qiyotgan bo\'laman, uchayotgan bo\'lamiz).',
    tip: '💡 "This time tomorrow..." yoki "At 5:00 PM tomorrow..." kelsa — will BE + fe\'l-ing.',
    exercises: [
      {
        question: 'This time tomorrow, we _____ over the Atlantic Ocean.',
        options: ['will fly', 'will be flying', 'fly', 'are flying'],
        answer: 1,
        explanation: 'Ertaga ayni shu vaqtdagi kelasi jarayon: "will be flying".'
      },
      {
        question: 'Don\'t phone me between 7 and 8 tonight. I _____ dinner with my family.',
        options: ['will have', 'will be having', 'have', 'had'],
        answer: 1,
        explanation: 'Belgilangan oraliqdagi jarayon: "will be having".'
      },
      {
        question: '_____ you be using your computer tonight, or can I borrow it?',
        options: ['Do', 'Will', 'Are', 'Would'],
        answer: 1,
        explanation: 'Future Continuous so\'rog\'i: "Will you be using...".'
      },
      {
        question: 'She _____ working this afternoon, so she can join us.',
        options: ['won\'t be', 'not will be', 'isn\'t be', 'won\'t'],
        answer: 0,
        explanation: 'Inkor shakl: "won\'t be working".'
      },
      {
        question: 'At 9:00 AM tomorrow, all candidates _____ the test.',
        options: ['will take', 'will be taking', 'take', 'have taken'],
        answer: 1,
        explanation: 'Ertaga soat 9 da boshlanib davom etayotgan jarayon: "will be taking".'
      }
    ]
  },
  {
    id: 'b1_14',
    level: 'B1',
    title: 'Phrasal verbs (Asosiy iboraviy fe\'llar)',
    titleUz: 'Iboraviy fe\'llar (Fe\'l + predlog)',
    isTense: false,
    summary: 'Fe\'lga kichik bir predlog (up, on, off, in, out) qo\'shilishi natijasida mutlaqo yangi ko\'chma ma\'no kasb etuvchi birikmalar.',
    usage: [
      'Kundalik nutqda eng ko\'p ishlatiladigan vosita: give up (tashlamoq/taslim bo\'lmoq), look for (qidirmoq), turn on/off (yoqmoq/o\'chirmoq).',
      'Ajraladigan iboraviy fe\'llar (separable): Turn the light off / Turn off the light.',
      'Ajralmaydigan iboraviy fe\'llar (inseparable): Look after the baby (bolaga qarab turmoq).'
    ],
    formula: {
      affirmative: 'Fe\'l + Partitsiya (predlog/ravish): give up, find out, put off, carry on',
      negative: 'Don\'t give up on your dreams!',
      question: 'What are you looking for?'
    },
    examples: [
      { en: 'I am looking for my car keys; have you seen them?', uz: 'Men mashinam kalitini qidiryapman; ularni ko\'rmadingizmi?' },
      { en: 'Please turn off the lights before you leave.', uz: 'Iltimos, ketishingizdan oldin chiroqlarni o\'chiring.' },
      { en: 'He decided to give up smoking for his health.', uz: 'U sog\'lig\'i uchun chekishni tashlashga qaror qildi.' },
      { en: 'Can you look after my cat while I am on vacation?', uz: 'Ta\'tildaligimda mushugimga qarab tura olasizmi?' },
      { en: 'We had to put off the meeting until next Monday.', uz: 'Biz majlisni kelasi dushanbagacha qoldirishga majbur bo\'ldik (put off = qoldirmoq).' },
      { en: 'I found out the truth about what happened.', uz: 'Men nima sodir bo\'lgani haqidagi haqiqatni bilib oldim (find out = bilib olmoq).' },
      { en: 'Don\'t give up, keep trying until you succeed.', uz: 'Taslim bo\'lmang, muvaffaqiyatga erishguncha harakat qiling.' },
      { en: 'She takes after her mother in character.', uz: 'U xarakter jihatdan onasiga o\'xshaydi (take after = o\'xshamoq).' }
    ],
    mistakes: [
      { wrong: 'Turn off it.', correct: 'Turn it off.', note: 'Agar to\'ldiruvchi olmosh (it, them, him) bo\'lsa, u ajraladigan fe\'lning o\'rtasiga tushadi: turn it off.' },
      { wrong: 'Look for my baby (qaramoq ma\'nosida)', correct: 'Look after my baby.', note: '"Look for" = qidirmoq, "Look after" = g\'amxo\'rlik qilmoq/qarab turmoq.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi qo\'shma fe\'llarga yaqin (tashlab yubormoq, qarab turmoq, bilib olmoq).',
    tip: '💡 Har bir phrasal verbni so\'zma-so\'z tarjima qilmang, yaxlit yangi ma\'no sifatida eslab qoling (Give = bermoq, lekin Give up = taslim bo\'lmoq).',
    exercises: [
      {
        question: 'Can you please _____ the radio? I am trying to concentrate.',
        options: ['turn off', 'turn on', 'look for', 'give up'],
        answer: 0,
        explanation: 'Xalaqit berayotgan bo\'lsa o\'chirish: "turn off".'
      },
      {
        question: 'I need to _____ my glasses; I cannot read without them.',
        options: ['look after', 'look for', 'give up', 'put off'],
        answer: 1,
        explanation: 'Qidirish ma\'nosida "look for".'
      },
      {
        question: 'The meeting was _____ until next Friday due to bad weather.',
        options: ['put off', 'given up', 'turned down', 'looked after'],
        answer: 0,
        explanation: 'Kechiktirish/qoldirish ma\'nosidagi ibora: "put off".'
      },
      {
        question: 'Never _____ your dreams, no matter how hard it gets.',
        options: ['turn off', 'give up', 'look after', 'find out'],
        answer: 1,
        explanation: 'Taslim bo\'lmaslik: "give up".'
      },
      {
        question: 'My aunt asked me to _____ her garden while she was abroad.',
        options: ['look after', 'look for', 'take after', 'turn off'],
        answer: 0,
        explanation: 'G\'amxo\'rlik qilib qarab turish: "look after".'
      }
    ]
  }
];
