// C1 darajasi - 11 ta ilg'or grammatik mavzu
export const c1Topics = [
  {
    id: 'c1_1',
    level: 'C1',
    title: 'Inversion (Hardly had, Not only, Never have I)',
    titleUz: 'Grammatik inversiya (Urg\'u va ekspressivlik)',
    isTense: false,
    summary: 'Salbiy yoki cheklovchi so\'zlar gap boshida kelganda, jumla uslubini kuchaytirish va urg\'u berish uchun yordamchi fe\'lning egadan oldinga o\'tishi (so\'roq so\'z tartibi).',
    usage: [
      'Salbiy iboralar boshida: Never have I seen such beauty, Seldom do we encounter such talent.',
      'Ketma-ketlik (vaqt): Hardly had I arrived when the phone rang / Scarcely had she sat down when...',
      'No sooner ... than: No sooner had they left the building than the alarm sounded.',
      'Not only ... but also: Not only did she win the prize, but she also broke the national record.',
      'Only qoliplari: Only then did I realize my mistake / Only after the meeting did he speak.'
    ],
    formula: {
      affirmative: 'Salbiy so\'z + Yordamchi fe\'l + Ega + Asosiy fe\'l (Never had she imagined...)',
      negative: 'Under no circumstances should you open this door.',
      question: 'Little did they know that disaster was looming.'
    },
    examples: [
      { en: 'Never in my life have I witnessed such sheer dedication.', uz: 'Umrim bino bo\'lib bunday chinakam fidoyilikni ko\'rmaganman.' },
      { en: 'Hardly had we entered the hall when the lecture started.', uz: 'Zalga zo\'rg\'a kirgan ham edikki, ma\'ruza boshlanib ketdi.' },
      { en: 'Not only did he apologize, but he also offered full compensation.', uz: 'U nafaqat uzr so\'radi, balki to\'liq tovon to\'lashni ham taklif qildi.' },
      { en: 'Rarely do politicians admit their mistakes in public.', uz: 'Siyosatchilar jamoat oldida xatolarini juda kamdan-kam hollarda tan olishadi.' },
      { en: 'No sooner had the plane landed than the passengers stood up.', uz: 'Samolyot yerga qo\'nishi bilanoq yo\'lovchilar o\'rinlaridan turishdi.' },
      { en: 'Under no circumstances should employees disclose confidential data.', uz: 'Xodimlar hech qanday sharoitda maxfiy ma\'lumotlarni oshkor qilmasliklari shart.' },
      { en: 'Only when I reached home did I notice my missing wallet.', uz: 'Faqat uyga yetib borganimdagina hamyonim yo\'qligini payqadim.' },
      { en: 'Little did she know that her invention would change the world.', uz: 'U o\'z ixtirosi dunyoni o\'zgartirib yuborishini hatto tasavvur ham qilmagan edi.' }
    ],
    mistakes: [
      { wrong: 'Never I have seen such a thing.', correct: 'Never have I seen such a thing.', note: 'Salbiy so\'z boshda kelsa, yordamchi fe\'l egadan oldinga o\'tishi (have I) shart.' },
      { wrong: 'Hardly I had entered...', correct: 'Hardly had I entered...', note: '"Hardly" dan keyin darhol "had + ega" keladi.' },
      { wrong: 'No sooner had I arrived when...', correct: 'No sooner had I arrived than...', note: '"Hardly ... when" bilan keladi, "No sooner ... than" bilan keladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi qat\'iy intonatsion urg\'uga to\'g\'ri keladi ("Hech qachon men bunday narsani ko\'rgan emasman").',
    tip: '💡 Salbiy so\'z boshdami? Demak, SAVOL SO\'Z TARTIBINI qo\'llang: Never + DID I / HAVE I / WAS I.',
    exercises: [
      {
        question: 'Never before _____ such an extraordinary performance.',
        options: ['I have seen', 'have I seen', 'I saw', 'did I saw'],
        answer: 1,
        explanation: '"Never before" gap boshida kelsa inversiya: "have I seen".'
      },
      {
        question: 'Hardly _____ the house when it began to pour with rain.',
        options: ['we had left', 'had we left', 'we left', 'did we leave'],
        answer: 1,
        explanation: '"Hardly had we left..." inversiya qolipi.'
      },
      {
        question: 'Not only _____ the national championship, but she also set a world record.',
        options: ['did she win', 'she won', 'won she', 'she did win'],
        answer: 0,
        explanation: '"Not only did she win..." inversiya tuzilmasi.'
      },
      {
        question: 'No sooner had the bell rung _____ the children rushed out.',
        options: ['when', 'than', 'then', 'that'],
        answer: 1,
        explanation: '"No sooner" har doim "than" bilan juftlashadi.'
      },
      {
        question: 'Under no circumstances _____ this emergency button be pressed without cause.',
        options: ['must', 'should', 'can', 'ought to'],
        answer: 1,
        explanation: 'Qat\'iy rasmiy taqiq: "Under no circumstances should this button be pressed".'
      }
    ]
  },
  {
    id: 'c1_2',
    level: 'C1',
    title: 'Cleft sentences',
    titleUz: 'Ajratilgan gaplar (It was... that; What I need is...)',
    isTense: false,
    summary: 'Gapdagi ma\'lum bir bo\'lakka (ega, to\'ldiruvchi, hol) alohida diqqat va emotsional urg\'u qaratish uchun gapni ikkiga bo\'lib tuzish usuli.',
    usage: [
      '"It-clefts" (It is / It was ... that/who): It was Sardor who solved the problem (Muammoni aynan Sardor yechdi).',
      '"Wh-clefts" (What ... is/was): What we need is more funding (Bizga kerak bo\'lgan narsa bu — ko\'proq mablag\').',
      '"All ... is/was": All I want is a cup of hot coffee (Menga kerak bo\'lgan yagona narsa bu...).',
      '"The reason why ... is": The reason why I called was to apologize.'
    ],
    formula: {
      affirmative: 'It is/was + Urg\'ulanadigan bo\'lak + that/who + qolgan qism | What + ega + fe\'l + is/was + urg\'u',
      negative: 'It wasn\'t money that she wanted, but respect.',
      question: 'Was it yesterday that you met him?'
    },
    examples: [
      { en: 'It was my brother who encouraged me to apply for the scholarship.', uz: 'Meni grantga hujjat topshirishga aynan akam ruhlantirdi.' },
      { en: 'What I really appreciate about him is his unwavering honesty.', uz: 'Unda menga eng yoqadigan narsa — uning sobitqadam halolligidir.' },
      { en: 'It was in 1991 that Uzbekistan gained its independence.', uz: 'O\'zbekiston o\'z mustaqilligini aynan 1991-yilda qo\'lga kiritgan.' },
      { en: 'All we are asking for is a fair trial.', uz: 'Biz so\'rayotgan yagona narsa — adolatli sud jarayoni.' },
      { en: 'What happened was that the driver lost control of the vehicle.', uz: 'Sodir bo\'lgan narsa shu ediki, haydovchi boshqaruvni yo\'qotdi.' },
      { en: 'The person who helped me the most was Professor Karimov.', uz: 'Menga eng ko\'p yordam bergan inson aynan professor Karimov bo\'ldi.' },
      { en: 'It wasn\'t the price that bothered me; it was the poor service.', uz: 'Meni bezovta qilgan narsa narx emas, balki sifatsiz xizmat edi.' },
      { en: 'The reason why we succeeded was our cohesive teamwork.', uz: 'Muvaffaqiyat qozonganimiz sababi — ahil jamoaviy ishimiz bo\'ldi.' }
    ],
    mistakes: [
      { wrong: 'What I want it is to rest.', correct: 'What I want is to rest.', note: '"What" li cleft jumlada ortiqcha "it" olmoshi qo\'shilmaydi.' },
      { wrong: 'It was him who did it.', correct: 'It was he who did it (formal) / It was him that did it.', note: 'Akademik ingliz tilida "It was + ega olmoshi + who" qo\'llaniladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "aynan, faqat, eng asosiysi" so\'zlari bilan beriladigan mantiqiy urg\'uga to\'g\'ri keladi.',
    tip: '💡 Oddiy gap: "John broke the window." Cleft gap: "It was John WHO broke the window!" (Aynan John!).',
    exercises: [
      {
        question: 'It was in Paris _____ they first met each other.',
        options: ['where', 'that', 'which', 'when'],
        answer: 1,
        explanation: 'It-cleft tuzilmasida joy yoki vaqt bo\'lagiga urg\'u berilganda "that" (yoki rasmiyada when/where) keladi: "It was in Paris that...".'
      },
      {
        question: 'What we need most right now _____ reliable information.',
        options: ['is', 'are', 'be', 'were'],
        answer: 0,
        explanation: '"What we need" birlik abstrakt tushuncha sifatida qabul qilinadi: "is".'
      },
      {
        question: '_____ I want to know is the exact departure time.',
        options: ['That', 'What', 'Which', 'It'],
        answer: 1,
        explanation: 'Wh-cleft boshlanishi: "What I want to know is...".'
      },
      {
        question: 'It was my father _____ taught me how to play chess.',
        options: ['which', 'who', 'whose', 'whom'],
        answer: 1,
        explanation: 'Inson urg\'ulanganda: "It was my father who...".'
      },
      {
        question: 'All he did _____ complain during the entire meeting.',
        options: ['was', 'is', 'were', 'to be'],
        answer: 0,
        explanation: 'O\'tgan zamonda: "All he did was complain".'
      }
    ]
  },
  {
    id: 'c1_3',
    level: 'C1',
    title: 'The Subjunctive Mood',
    titleUz: 'Subjunctive (Istak va rasmiy tavsiya mayli)',
    isTense: false,
    summary: 'Rasmiy takliflar, talablar, qonuniy me\'yorlar va zaruriyatlarni bildirishda fe\'lning boshlang\'ich yalang\'och shakli (bare infinitive - V1) ishlatilishi.',
    usage: [
      'Talab va tavsiya fe\'llaridan so\'ng: demand, insist, recommend, suggest, propose, require + that + subject + V1.',
      'Shaxs kim bo\'lishidan qat\'i nazar (he/she/it bo\'lsa ham), fe\'lga "-s" qo\'shilmaydi: I suggest that he GO (goes emas!).',
      'To be fe\'lining subjunctive shakli doimo "BE" bo\'ladi: It is vital that she BE informed.',
      'Zaruriyat bildiruvchi sifatlardan so\'ng: It is essential / crucial / vital / important that...'
    ],
    formula: {
      affirmative: 'Subject + suggest/demand + that + Ega + V1 (boshlang\'ich fe\'l, he bo\'lsa ham!)',
      negative: 'Subject + insist + that + Ega + NOT + V1 (He insisted that she not leave)',
      question: 'Do you recommend that we be present?'
    },
    examples: [
      { en: 'The doctor recommended that he take a two-week medical leave.', uz: 'Shifokor u ikki haftalik ta\'tilga chiqishini tavsiya qildi (he take, takes emas!).' },
      { en: 'It is essential that every applicant be interviewed in person.', uz: 'Har bir arizachi shaxsan suhbatdan o\'tkazilishi o\'ta zarur (be interviewed).' },
      { en: 'The committee demanded that the minister resign immediately.', uz: 'Qo\'mita vazirning zudlik bilan iste\'foga chiqishini talab qildi (resign).' },
      { en: 'I suggest that she not disclose the preliminary results yet.', uz: 'Men unga dastlabki natijalarni hali oshkor qilmaslikni maslahat beraman.' },
      { en: 'It is vital that all safety measures be strictly implemented.', uz: 'Barcha xavfsizlik choralariga qat\'iy rioya qilinishi hayotiy muhimdir.' },
      { en: 'He insisted that the invoice be paid in full.', uz: 'U hisob-fakturaning to\'liq to\'lanishini talab qildi.' },
      { en: 'The law requires that every citizen carry an identification card.', uz: 'Qonun har bir fuqaro shaxsini tasdiqlovchi hujjat olib yurishini talab qiladi.' },
      { en: 'It is crucial that he remain calm under pressure.', uz: 'Uning bosim ostida xotirjamlikni saqlab qolishi juda muhimdir.' }
    ],
    mistakes: [
      { wrong: 'I suggest that he goes.', correct: 'I suggest that he go.', note: 'Subjunctive qoidasiga ko\'ra "he" bo\'lsa ham fe\'lga "-s" qo\'shilmaydi.' },
      { wrong: 'It is important that she is here.', correct: 'It is important that she be here (formal subjunctive).', note: 'Rasmiy uslubda "is" emas, "be" bo\'ladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...-ishi shart/tavsiya etiladi / qilsin" buyruq-istak mayliga to\'g\'ri keladi.',
    tip: '💡 Talab/tavsiya fe\'lidan keyin: HE, SHE, IT kelsa ham fe\'l o\'zgarmaydi! "Suggest that he GO", "Vital that she BE".',
    exercises: [
      {
        question: 'The board recommended that the CEO _____ the restructuring plan.',
        options: ['postpones', 'postpone', 'postponed', 'is postpone'],
        answer: 1,
        explanation: 'Subjunctive qoidasiga ko\'ra boshlang\'ich fe\'l: "postpone" (s qo\'shilmaydi).'
      },
      {
        question: 'It is imperative that every citizen _____ their civic duty.',
        options: ['fulfill', 'fulfills', 'fulfilled', 'fulfilling'],
        answer: 0,
        explanation: '"It is imperative that..." dan keyin sof fe\'l: "fulfill".'
      },
      {
        question: 'The judge ordered that the prisoner _____ released on bail.',
        options: ['is', 'was', 'be', 'been'],
        answer: 2,
        explanation: '"To be" fe\'lining subjunctive shakli har doim "be" bo\'ladi.'
      },
      {
        question: 'I insist that he _____ to me in person.',
        options: ['apologizes', 'apologize', 'apologized', 'must apologize'],
        answer: 1,
        explanation: '"Insist that he apologize".'
      },
      {
        question: 'The auditor required that the accountant _____ all receipts.',
        options: ['provide', 'provides', 'provided', 'providing'],
        answer: 0,
        explanation: 'Subjunctive bare infinitive: "provide".'
      }
    ]
  },
  {
    id: 'c1_4',
    level: 'C1',
    title: 'Advanced Participle Clauses',
    titleUz: 'Murakkab sifatdoshli o\'ramlar (Having been done, With + noun)',
    isTense: false,
    summary: 'Perfect Participle, Passive Participle va mustaqil (absolute) sifatdoshli o\'ramlar orqali murakkab ilmiy va adabiy jumlalarni ixcham ifodalash.',
    usage: [
      'Perfect Active (Having + V3): oldinroq tugagan harakat: Having worked all night, he fell asleep at his desk.',
      'Perfect Passive (Having been + V3): oldinroq unga nisbatan qilingan ish: Having been warned twice, he still made the error.',
      'Absolute Clause (turli egalar bilan): Weather permitting, we will set sail tomorrow (Agar ob-havo imkon bersa).',
      'With + ot + participle: With night falling, they set up their camp.'
    ],
    formula: {
      affirmative: 'Having + V3 (Active) | Having been + V3 (Passive) | Absolute: Ega1 + V-ing, Ega2 + fe\'l',
      negative: 'Not having received a reply, she sent a follow-up email.',
      question: 'Having completed the survey, are we eligible for the prize?'
    },
    examples: [
      { en: 'Having completed his doctorate at Cambridge, he returned to Uzbekistan.', uz: 'Kembrijda doktorlik dissertatsiyasini himoya qilgach, u O\'zbekistonga qaytdi.' },
      { en: 'Having been warned of the storm, the fishermen stayed in the harbor.', uz: 'Bo\'ron haqida ogohlantirilgach, baliqchilar bandargohda qolishdi.' },
      { en: 'Not having received any official confirmation, we delayed our trip.', uz: 'Hech qanday rasmiy tasdiq olmaganimiz sababli, safarimizni qoldirdik.' },
      { en: 'Time permitting, we will discuss the secondary proposals.', uz: 'Vaqt yetarli bo\'lsa (vaqt imkon bersa), ikkinchi darajali takliflarni muhokama qilamiz.' },
      { en: 'With the sun sinking below the horizon, the desert grew cold.', uz: 'Quyosh ufqqa botishi bilan cho\'l soviy boshladi.' },
      { en: 'Having failed his first attempt, he practiced with greater resolve.', uz: 'Birinchi urinishida yiqilgach, u yanada katta qat\'iyat bilan shug\'ullandi.' },
      { en: 'Told to wait outside, the journalists gathered in the courtyard.', uz: 'Tashqarida kutish aytilgach, jurnalistlar hovliga to\'plandilar.' },
      { en: 'All things considered, the international conference was a triumph.', uz: 'Barcha jihatlar inobatga olinganda, xalqaro anjuman katta muvaffaqiyat bo\'ldi.' }
    ],
    mistakes: [
      { wrong: 'Having arrived at the station, the train departed.', correct: 'Having arrived at the station, we saw the train depart.', note: 'Poezd stansiyaga kelgani yo\'q, biz keldik; ega ikkala tomonda mantiqan mos bo\'lishi shart.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...-gach, ...-gan bo\'lib, ...-gandan so\'ng" ravishdoshli iboralariga to\'g\'ri keladi.',
    tip: '💡 Boshqa ishdan OLDINROQ tugagan bo\'lsa: HAVING + V3 (Active) yoki HAVING BEEN + V3 (Passive).',
    exercises: [
      {
        question: '_____ all his exams with flying colors, Sardor celebrated with his family.',
        options: ['Having passed', 'Passed', 'Passing to', 'Being passed'],
        answer: 0,
        explanation: 'Imtihonlarni topshirib bo\'lgach (oldinroq bo\'lgan harakat): "Having passed".'
      },
      {
        question: '_____ by an elite team of architects, the museum attracts millions.',
        options: ['Designing', 'Having designed', 'Having been designed', 'To design'],
        answer: 2,
        explanation: 'Bino oldin loyihalashtirilgan (Passiv Perfect): "Having been designed".'
      },
      {
        question: '_____ what to do next, she turned to her mentor for guidance.',
        options: ['Not knowing', 'Knowing not', 'Not have known', 'Didn\'t know'],
        answer: 0,
        explanation: 'Inkor zamondosh harakat: "Not knowing what to do...".'
      },
      {
        question: 'Weather _____, the outdoor banquet will take place as scheduled.',
        options: ['permits', 'permitting', 'permitted', 'to permit'],
        answer: 1,
        explanation: 'Mustaqil o\'ram (Absolute clause): "Weather permitting" (ob-havo yo\'l qo\'ysa).'
      },
      {
        question: '_____ of the danger, the tourists did not venture into the canyon.',
        options: ['Warned', 'Warning', 'Having warn', 'To warn'],
        answer: 0,
        explanation: 'Ogohlantirilgan sayyohlar (Past Participle): "Warned of the danger".'
      }
    ]
  },
  {
    id: 'c1_5',
    level: 'C1',
    title: 'Future in the Past',
    titleUz: 'O\'tmishdagi kelasi zamon (was/were going to, would)',
    isTense: true,
    summary: 'O\'tmishdagi biror nuqtadan turib qaralganda kelajakda sodir bo\'lishi kutilgan yoki rejalashtirilgan, ammo ko\'pincha amalga oshmay qolgan voqealar.',
    usage: [
      '"Was / were going to + V1" — o\'tmishda rejalashtirilgan, lekin amalga oshmagan niyat: I was going to call you, but my phone battery died.',
      '"Would + V1" — o\'tmishdagi bashorat yoki keyin sodir bo\'lgan voqea: He knew that he would become famous one day.',
      '"Was / were to + V1" — rasmiy reja yoki taqdir: They parted ways, never knowing they were to meet again twenty years later.',
      '"Was / were about to + V1" — ayni o\'sha daqiqada sodir bo\'lish arafasidagi ish: I was about to leave when the phone rang.'
    ],
    formula: {
      affirmative: 'Subject + was/were going to + V1 | Subject + would + V1 | Subject + was/were about to + V1',
      negative: 'I wasn\'t going to tell him, but he found out.',
      question: 'Were you going to invite them to the reception?'
    },
    examples: [
      { en: 'I was going to visit you yesterday, but unexpected guests arrived.', uz: 'Kecha siznikiga bormoqchi edim, ammo kutilmagan mehmonlar kelib qoldi.' },
      { en: 'She knew that the decision would change her life forever.', uz: 'U bu qaror uning hayotini butunlay o\'zgartirib yuborishini bilardi.' },
      { en: 'We were about to sit down for dinner when the doorbell rang.', uz: 'Eshik qo\'ng\'irog\'i chalinganda biz ayni ovqatlanishga o\'tirmoqchi bo\'lib turgandik.' },
      { en: 'He was to become the greatest mathematician of his generation.', uz: 'U o\'z avlodining eng buyuk matematigi bo\'lishi peshonasiga yozilgan edi.' },
      { en: 'I thought the test would be difficult, but it was remarkably easy.', uz: 'Test qiyin bo\'ladi deb o\'ylagan edim, ammo u juda oson chiqdi.' },
      { en: 'They were going to buy the house, but the bank rejected their mortgage.', uz: 'Ular uyni sotib olmoqchi edilar, ammo bank ipotekani rad etdi.' },
      { en: 'Little did she know that she would never return to her homeland.', uz: 'U o\'z ona yurtiga boshqa hech qachon qaytmasligini xayoliga ham keltirmagan edi.' },
      { en: 'I was going to start my workout, but I felt too exhausted.', uz: 'Mashg\'ulotimni boshlamoqchi edim, lekin o\'zimni juda holsiz his qildim.' }
    ],
    mistakes: [
      { wrong: 'I was going to call you, but I forgot. (I will call you o\'tmishda)', correct: 'I was going to call you...', note: 'O\'tmishdagi amalga oshmagan niyat "was going to" bilan ifodalanadi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...-moqchi edim / ...-ar deb o\'ylagandim" (bormoqchi edim, qilmoqchi edik) shakllariga to\'liq mos keladi.',
    tip: '💡 Amalga oshmay qolgan reja: WAS/WERE GOING TO. O\'tmishdagi kelajak bashorati: WOULD.',
    exercises: [
      {
        question: 'I _____ you yesterday evening, but I completely lost track of time.',
        options: ['was going to call', 'am going to call', 'will call', 'would call'],
        answer: 0,
        explanation: 'O\'tmishdagi amalga oshmagan niyat: "was going to call".'
      },
      {
        question: 'He felt confident that he _____ win the upcoming election.',
        options: ['will', 'would', 'is going to', 'was to'],
        answer: 1,
        explanation: 'O\'tmishdagi fikr bo\'yicha kelasi voqea: "would win".'
      },
      {
        question: 'We were just _____ leave the house when the storm struck.',
        options: ['about to', 'going', 'would', 'to have'],
        answer: 0,
        explanation: 'Ayni daqiqadagi arafasida turish: "were just about to leave".'
      },
      {
        question: 'They were _____ buy that cottage, but the survey revealed structural flaws.',
        options: ['going to', 'will', 'about', 'would'],
        answer: 0,
        explanation: 'Niyat qilingan, ammo bekor bo\'lgan reja: "were going to buy".'
      },
      {
        question: 'Little did the young artist know that his paintings _____ one day sell for millions.',
        options: ['will', 'would', 'were going', 'had'],
        answer: 1,
        explanation: 'O\'tmishdagi kelajak taqdiri: "would one day sell".'
      }
    ]
  },
  {
    id: 'c1_6',
    level: 'C1',
    title: 'Advanced Modals (needn\'t have, was to have)',
    titleUz: 'Ilg\'or modal konstruksiyalar: needn\'t have vs didn\'t need to',
    isTense: false,
    summary: '"Needn\'t have done" (qilish shart emas edi, ammo bekorga qilib qo\'yildi) va "didn\'t need to do" (qilish shart emas edi va qilinmadi) o\'rtasidagi nozik farq.',
    usage: [
      '"Needn\'t have + V3": ish bajarildi, ammo keyin ma\'lum bo\'ldiki, uni qilish mutlaqo keraksiz va zoye ketgan harakat bo\'lgan: You needn\'t have brought an umbrella, it didn\'t rain.',
      '"Didn\'t need to + V1": shart emasligi oldindan ma\'lum edi va shu sababli qilinmadi: I had plenty of food, so I didn\'t need to cook.',
      '"Was / were to have + V3": rejalashtirilgan, ammo amalga oshmay qolgan rasmiy kelishuv: The summit was to have taken place in Geneva.'
    ],
    formula: {
      affirmative: 'needn\'t have + V3 (ortiqcha qilindi) vs didn\'t need to + V1 (kerakmasligi uchun qilinmadi)',
      negative: 'You needn\'t have worried about the costs.',
      question: 'Did you need to show your passport?'
    },
    examples: [
      { en: 'You needn\'t have bought more bread; we already have two loaves.', uz: 'Yana non sotib olishingiz shart emas edi; bizda ikkita non bor edi (bekorga sotib oldingiz).' },
      { en: 'I didn\'t need to wake up early because it was Sunday.', uz: 'Yakshanba bo\'lgani uchun erta turishimga hojat yo\'q edi (va turmadim).' },
      { en: 'The concert was to have been held outdoors, but rain forced it inside.', uz: 'Konsert ochiq havoda o\'tkazilishi kerak edi, ammo yomg\'ir uni bino ichiga ko\'chirdi.' },
      { en: 'She needn\'t have cooked such an enormous meal; only three guests came.', uz: 'U bunchalik ko\'p taom tayyorlashi shart emas edi; faqat uchta mehmon keldi xolos.' },
      { en: 'We had free entry tickets, so we didn\'t need to pay anything.', uz: 'Bizda bepul chiptalar bor edi, shuning uchun hech qanday pul to\'lashimizga to\'g\'ri kelmadi.' },
      { en: 'You needn\'t have rushed; the flight has been delayed by three hours.', uz: 'Bunchalik shoshishingiz shart emas edi; parvoz uch soatga kechiktirildi.' },
      { en: 'He was to have succeeded his father as chairman, but he chose medicine instead.', uz: 'U otasining o\'rniga rais bo\'lishi kerak edi, ammo tibbiyot yo\'lini tanladi.' },
      { en: 'I didn\'t need to hire a car because my friend lent me his.', uz: 'Do\'stim mashinasini berib turgani uchun mashina ijaraga olishimga hojat qolmadi.' }
    ],
    mistakes: [
      { wrong: 'You needn\'t buy bread yesterday.', correct: 'You needn\'t have bought bread yesterday.', note: 'O\'tgan zamonda bekorga qilingan harakat uchun "needn\'t have + V3" bo\'ladi.' }
    ],
    uzbekComparison: 'Needn\'t have = "behuda qilibsiz / qilish shart emasdi (lekin qildingiz)"; Didn\'t need to = "qilishga hojat bo\'lmadi (va qilmadi)".',
    tip: '💡 Bekorga sarflangan kuch (harakat bajarildi) = NEEDN\'T HAVE + V3. Qilinmadi, chunki zarurat yo\'q edi = DIDN\'T NEED TO.',
    exercises: [
      {
        question: 'We _____ cooked so much food; half of it was left over.',
        options: ['needn\'t have', 'didn\'t need to', 'mustn\'t have', 'couldn\'t have'],
        answer: 0,
        explanation: 'Ovqat pishirib bo\'lingan va ortib qolgan (bekorga qilingan): "needn\'t have cooked".'
      },
      {
        question: 'Since the entrance was free, we _____ buy any tickets.',
        options: ['needn\'t have', 'didn\'t need to', 'mustn\'t', 'needn\'t to'],
        answer: 1,
        explanation: 'Bepul bo\'lgani uchun sotib olishga hojat bo\'lmadi (va olinmadi): "didn\'t need to".'
      },
      {
        question: 'The prime minister was to _____ the new factory, but illness prevented it.',
        options: ['have opened', 'open', 'opening', 'be opened'],
        answer: 0,
        explanation: 'O\'tmishda rejalashtirilgan, ammo barbod bo\'lgan voqea: "was to have opened".'
      },
      {
        question: 'You _____ brought an umbrella. Look, the sun is shining brightly!',
        options: ['needn\'t have', 'didn\'t need to', 'couldn\'t have', 'shouldn\'t'],
        answer: 0,
        explanation: 'Soyabon olib kelindi, ammo quyosh charaqlab turibdi (behuda keltirildi): "needn\'t have brought".'
      },
      {
        question: 'I had already done the laundry, so she _____ wash anything.',
        options: ['didn\'t need to', 'needn\'t have', 'mustn\'t', 'wasn\'t to'],
        answer: 0,
        explanation: 'Zarurat yo\'qligi sababli yuvmadi: "didn\'t need to wash".'
      }
    ]
  },
  {
    id: 'c1_7',
    level: 'C1',
    title: 'Nominalisation',
    titleUz: 'Nominalizatsiya (Fe\'l va sifatlarni otga aylantirish)',
    isTense: false,
    summary: 'Akademik va ilmiy uslub (IELTS Writing Task 2, ilmiy maqolalar)da fe\'l va sifatlarni ot birikmalariga aylantirish orqali matnni ixcham, nufuzli va ob\'ektiv qilish texnikasi.',
    usage: [
      'Oddiy uslub (fe\'l): The government decided to invest in solar energy.',
      'Nominalizatsiya (ot): The government\'s DECISION to invest in solar energy was welcomed.',
      'Sifat → Ot: People are poor → Poverty remains a critical issue.',
      'Murakkab sabab-oqibatni bitta jumlaga jamlash: Because the population grew rapidly → Rapid population GROWTH led to...'
    ],
    formula: {
      affirmative: 'Fe\'l/Sifat o\'rniga uning ot shakli: develop → development, improve → improvement, analyze → analysis',
      negative: 'A failure to comply with standards will result in penalties.',
      question: 'What was the catalyst for this economic expansion?'
    },
    examples: [
      { en: 'Informal: We analyzed the data thoroughly. → Academic: A thorough analysis of the data was conducted.', uz: 'Biz ma\'lumotlarni chuqur tahlil qildik → Ma\'lumotlarning chuqur tahlili o\'tkazildi.' },
      { en: 'Informal: The population grew rapidly. → Academic: Rapid population growth created severe housing shortages.', uz: 'Aholi tez o\'sdi → Aholining jadal o\'sishi uy-joy taqchilligini keltirib chiqardi.' },
      { en: 'Informal: The technology improved. → Academic: Recent improvements in technology have transformed healthcare.', uz: 'Texnologiya rivojlandi → Texnologiyadagi so\'nggi takomillashuvlar tibbiyotni tubdan o\'zgartirdi.' },
      { en: 'The destruction of rainforests threatens global biodiversity.', uz: 'Yomg\'ir o\'rmonlarining vayron qilinishi global bioxilma-xillikka tahdid soladi (destroy o\'rniga destruction).' },
      { en: 'Their refusal to negotiate escalated the political tension.', uz: 'Ularning muzokara qilishni rad etishi siyosiy keskinlikni oshirdi (refuse o\'rniga refusal).' },
      { en: 'Economic instability leads to high rates of unemployment.', uz: 'Iqtisodiy beqarorlik ishsizlikning yuqori ko\'rsatkichlariga olib keladi.' },
      { en: 'A lack of financial transparency caused investor distrust.', uz: 'Moliyaviy shaffoflikning yetishmasligi investorlar ishonchsizligiga sabab bo\'ldi.' },
      { en: 'The implementation of the new policy began last Monday.', uz: 'Yangi siyosatning joriy etilishi o\'tgan dushanba boshlandi.' }
    ],
    mistakes: [
      { wrong: 'The government decided and it was good.', correct: 'The government\'s decision proved beneficial.', note: 'Akademik yozuvda fe\'llar o\'rniga ot konstruksiyalari yuqori ball keltiradi.' }
    ],
    uzbekComparison: 'O\'zbek tilida harakat nomi va sifatdoshli otlashuvga to\'g\'ri keladi (rivojlanmoq → rivojlanish, qaror qildi → qarori).',
    tip: '💡 IELTS Writing C1/C2 uslubi: "We destroyed the forest" o\'rniga "The destruction of the forest" deb yozing.',
    exercises: [
      {
        question: 'Transform: "They discovered water on Mars." → The _____ of water on Mars was historic.',
        options: ['discovery', 'discover', 'discovering', 'discoverer'],
        answer: 0,
        explanation: '"Discover" fe\'lining ot shakli "discovery".'
      },
      {
        question: 'Transform: "The economy expanded significantly." → A significant economic _____ occurred.',
        options: ['expand', 'expansion', 'expansiveness', 'expanded'],
        answer: 1,
        explanation: '"Expand" fe\'lining nominalizatsiyalashgan shakli "expansion".'
      },
      {
        question: 'Transform: "The team failed to meet the deadline." → The team\'s _____ to meet the deadline was costly.',
        options: ['fail', 'failure', 'failing', 'failed'],
        answer: 1,
        explanation: '"Fail" fe\'lining ot shakli "failure".'
      },
      {
        question: 'The _____ of renewable energy sources has accelerated globally.',
        options: ['adopt', 'adoption', 'adopting', 'adopted'],
        answer: 1,
        explanation: 'Ot birikmasi shakli: "adoption of renewable energy".'
      },
      {
        question: 'Transform: "Scientists concluded that..." → Scientists reached the _____ that...',
        options: ['conclude', 'conclusion', 'concluding', 'conclusive'],
        answer: 1,
        explanation: '"Reach the conclusion" — akademik ibora.'
      }
    ]
  },
  {
    id: 'c1_8',
    level: 'C1',
    title: 'Ellipsis and Substitution',
    titleUz: 'Ellipsis (so\'z qisqartirish) va O\'rnini bosuvchilar',
    isTense: false,
    summary: 'Nutqda so\'zlarni keraksiz takrorlamaslik uchun ularni tushirib qoldirish (Ellipsis) yoki ularning o\'rniga one, ones, so, do so, neither, nor kabi so\'zlarni qo\'llash (Substitution).',
    usage: [
      'Ellipsis (tushirib qoldirish): Would you like to come? — I would love to (come tushib qoladi).',
      'Substitution with "one / ones": I don\'t like this shirt; I prefer the blue one.',
      'Substitution with "so / not": Is it going to rain? — I think so / I hope not.',
      'Substitution with "do so": He promised to call, but failed to do so.'
    ],
    formula: {
      affirmative: 'I hope so / I believe so | Which one do you want? — The green one.',
      negative: 'I am afraid not / I suspect not',
      question: 'Will they succeed? — I certainly hope so.'
    },
    examples: [
      { en: 'I asked him to lock the door, and he did so immediately.', uz: 'Undan eshikni qulflashni so\'radim va u darhol shunday qildi (did so).' },
      { en: 'These red apples look delicious, but the green ones are sweeter.', uz: 'Bu qizil olmalar mazali ko\'rinadi, lekin yashillari shirinroq (ones = apples).' },
      { en: 'Will you attend the symposium tomorrow? — I would love to, but I have a conflict.', uz: 'Ertaga simpoziumda qatnashasizmi? — Jon deb (qatnashardim), ammo boshqa ishim bor.' },
      { en: 'Is the restaurant open on Sundays? — I believe so.', uz: 'Restoran yakshanba kunlari ochiqmi? — Menimcha shunday (ochiq bo\'lsa kerak).' },
      { en: 'Has the train arrived yet? — I am afraid not.', uz: 'Poyezd yetib keldimi hali? — Afsuski yo\'q (kelmadi).' },
      { en: 'She wanted to study medicine, and her brother did too.', uz: 'U tibbiyotni o\'rganishni istardi, akasi ham xuddi shunday.' },
      { en: 'He offered to help, but having tried to do so, he found it impossible.', uz: 'U yordam berishni taklif qildi, ammo shunday qilishga uringach, buning imkonsiz ekanini ko\'rdi.' },
      { en: 'Some people prefer tea, while others prefer coffee.', uz: 'Ba\'zi odamlar choyni afzal ko\'rishadi, boshqalar esa kofeni (people tushib qolgan).' }
    ],
    mistakes: [
      { wrong: 'I hope that yes.', correct: 'I hope so.', note: 'Ingliz tilida ijobiy taxminda "I hope yes" deyilmaydi, "I hope so" deyiladi.' },
      { wrong: 'I think no.', correct: 'I don\'t think so / I think not (formal).', note: 'Inkor taxminda "I don\'t think so" bo\'ladi.' }
    ],
    uzbekComparison: 'O\'zbek tilida ham takrorlamaslik uchun "shunday deb o\'ylayman", "anavi-si" yoki tushirib qoldirish usullari qo\'llanadi.',
    tip: '💡 Takrorlashdan qoching: Narsaga = ONE/ONES. Butun fikrga = SO (I think so). Inkorga = NOT (I hope not).',
    exercises: [
      {
        question: 'Do you think our team will win the championship? — I certainly hope _____!',
        options: ['yes', 'so', 'it', 'that'],
        answer: 1,
        explanation: 'Ijobiy orzu ifodasi: "I hope so".'
      },
      {
        question: 'I don\'t like these black shoes. Can I try on the brown _____?',
        options: ['ones', 'one', 'shoes ones', 'them'],
        answer: 0,
        explanation: 'Ko\'plikdagi ot (shoes) o\'rniga "ones" keladi: "the brown ones".'
      },
      {
        question: 'He was told to apologize, but he flatly refused to _____.',
        options: ['do', 'do so', 'make so', 'say so'],
        answer: 1,
        explanation: 'Harakatni takrorlamaslik uchun rasmiy qolip: "refused to do so".'
      },
      {
        question: 'Will there be a delay with our flight? — I am afraid _____.',
        options: ['no', 'not', 'so not', 'it isn\'t'],
        answer: 1,
        explanation: 'Salbiy tasdiq iborasi: "I am afraid not" (Afsuski shunday bo\'lmasa kerak/ha shunday).'
      },
      {
        question: 'Would you like to join us for dinner tonight? — I would love _____, thank you.',
        options: ['to', 'it', 'to do', 'so'],
        answer: 0,
        explanation: 'Ellipsis qisqartmasi: "I would love to" (to join you tushib qoladi).'
      }
    ]
  },
  {
    id: 'c1_9',
    level: 'C1',
    title: 'Hedging and Emphasis',
    titleUz: 'Hedging (Ehtiyotkor xulosalar) va Urg\'u vositalari',
    isTense: false,
    summary: 'Ilmiy va professional matnlarda mutlaq da\'volar qilmasdan, xulosalarni ehtiyotkorona va dalillarga asoslangan holda ifodalash (Hedging) hamda aksincha kuchli urg\'u berish (Emphasis).',
    usage: [
      'Hedging (ehtiyotkorlik): It appears that, It tends to be, arguably, seemingly, ostensibly.',
      'Ehtimollik fe\'llari: suggest, indicate, imply (The data suggests that...).',
      'Emphasis (Urg\'u berish): do/did bilan kuchaytirish: I DO believe you (Men haqiqatan ham senga ishonaman!).',
      'Certainly, undeniably, unequivocally kabi kuchli ravishlar.'
    ],
    formula: {
      affirmative: 'Hedging: It would seem that... / The findings indicate that... | Emphasis: Subject + DO/DOES/DID + V1',
      negative: 'The evidence does not necessarily imply causation.',
      question: 'Do the findings conclusively prove the hypothesis?'
    },
    examples: [
      { en: 'The survey results seem to suggest a shift in consumer habits.', uz: 'So\'rovnoma natijalari iste\'molchilar odatlaridagi o\'zgarishga ishora qilayotgandek ko\'rinadi (Hedging).' },
      { en: 'It is arguably the most significant archaeological discovery of the century.', uz: 'Bu, ehtimol, asrning eng muhim arxeologik kashfiyotidir (bahsli/ehtiyotkor).' },
      { en: 'I do apologize for any inconvenience caused by the delay.', uz: 'Kechikish sababli yuzaga kelgan noqulayliklar uchun chindan ham qattiq uzr so\'rayman (Emphasis).' },
      { en: 'The evidence tends to indicate a correlation between exercise and mental health.', uz: 'Dalillar jismoniy mashqlar va ruhiy salomatlik o\'rtasida bog\'liqlik borligini ko\'rsatishga moyil.' },
      { en: 'She did inform the director before she took leave.', uz: 'U ta\'tilga chiqishdan oldin direktorni haqiqatan ham xabardor qilgan edi.' },
      { en: 'It would appear that the initial calculations were slightly flawed.', uz: 'Dastlabki hisob-kitoblar biroz xato bo\'lgan ko\'rinadi.' },
      { en: 'Undeniably, climate change represents a formidable global challenge.', uz: 'Inkor etib bo\'lmaydiki, iqlim o\'zgarishi ulkan global muammodir (Emphasis).' },
      { en: 'The policy may potentially yield positive economic outcomes.', uz: 'Siyosat ehtimoliy ravishda ijobiy iqtisodiy natijalar berishi mumkin.' }
    ],
    mistakes: [
      { wrong: 'This proves that all people are lazy.', correct: 'The data suggests that individuals may be less inclined to...', note: 'Akademik yozuvda mutlaq da\'volar o\'rniga hedging qoidalari qo\'llanilishi shart.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "ko\'rinadi, ehtimol, shubhasiz, chindan ham" kabi modallik kirituvchi so\'zlarga to\'g\'ri keladi.',
    tip: '💡 Ilmiy yozuvda "bu 100% shunday" demang, "The evidence tends to suggest..." (Hedging) deb yozing.',
    exercises: [
      {
        question: 'The preliminary findings _____ to suggest that the treatment is effective.',
        options: ['seem', 'proves', 'definitely', 'exact'],
        answer: 0,
        explanation: 'Ehtiyotkor xulosa (Hedging): "seem to suggest".'
      },
      {
        question: 'I _____ appreciate all the guidance you have provided during my research.',
        options: ['do', 'did', 'does', 'am'],
        answer: 0,
        explanation: 'Hozirgi zamon darak gapida urg\'u berish: "I do appreciate" (chindan ham minnatdorman).'
      },
      {
        question: 'This is _____ one of the most innovative startups in Central Asia.',
        options: ['arguably', 'strict', 'no doubt that', 'impossible'],
        answer: 0,
        explanation: '"Arguably" — mutaxassislar bahslashsa-da, katta ehtimol bilan shunday degan ma\'nodagi hedging so\'zi.'
      },
      {
        question: 'He _____ warn management about the impending crisis, but they ignored him.',
        options: ['did', 'do', 'was', 'had'],
        answer: 0,
        explanation: 'O\'tgan zamonda urg\'u berish: "He did warn management...".'
      },
      {
        question: 'The research does not _____ indicate a direct cause-and-effect relationship.',
        options: ['necessarily', 'sure', 'certain', 'undoubted'],
        answer: 0,
        explanation: 'Ilmiy hedging: "does not necessarily indicate" (shart degani emas).'
      }
    ]
  },
  {
    id: 'c1_10',
    level: 'C1',
    title: 'Advanced Conditionals (Inversion & Implied)',
    titleUz: 'Ilg\'or shart mayli (Inversiyali shartlar va Were it not for)',
    isTense: false,
    summary: '"If" so\'zini butunlay tushirib qoldirib, inversiya orqali tuziladigan yuqori akademik darajadagi shart gaplar.',
    usage: [
      'First Conditional Inversion: Should you need further assistance, please contact us (= If you should need...).',
      'Second Conditional Inversion: Were I in your position, I would resign (= If I were in your position...).',
      'Third Conditional Inversion: Had we known the risks, we would not have invested (= If we had known...).',
      'Were it not for + ot (Agar ... bo\'lmaganida): Were it not for your generous support, we would be bankrupt.',
      'Had it not been for + ot (O\'tmishda agar ... bo\'lmaganida edi): Had it not been for the seatbelt, he would have died.'
    ],
    formula: {
      affirmative: 'Should + ega + V1 | Were + ega + (to V1) | Had + ega + V3 | Were it not for... | Had it not been for...',
      negative: 'Had we not acted promptly, the consequences would have been catastrophic.',
      question: 'Should the situation deteriorate, what measures will be taken?'
    },
    examples: [
      { en: 'Should you have any questions, do not hesitate to contact our office.', uz: 'Mabodo biron savolingiz bo\'lsa, ofisimizga murojaat qilishdan tortinmang.' },
      { en: 'Were I to accept the offer, I would have to relocate to London.', uz: 'Agar taklifni qabul qiladigan bo\'lsam, Londonga ko\'chib o\'tishimga to\'g\'ri keladi.' },
      { en: 'Had we anticipated these obstacles, we would have revised our strategy.', uz: 'Ushbu to\'siqlarni oldindan ko\'ra olganimizda, strategiyamizni qayta ko\'rib chiqqan bo\'lardik.' },
      { en: 'Were it not for your invaluable advice, I would be completely lost.', uz: 'Sizning qimmatli maslahatingiz bo\'lmaganida, mutlaqo yo\'limni yo\'qotgan bo\'lardim.' },
      { en: 'Had it not been for the doctor\'s swift intervention, the patient would have died.', uz: 'Shifokorning tezkor yordami bo\'lmaganida edi, bemor vafot etgan bo\'lardi.' },
      { en: 'Should anyone call while I am away, please take a message.', uz: 'Men yo\'qligimda mabodo kimdir qo\'ng\'iroq qilsa, xabarni yozib oling.' },
      { en: 'Had I known you were in hospital, I would have visited you.', uz: 'Kasalxonada ekanligingizni bilganimda, sizni ko\'rgani borgan bo\'lardim.' },
      { en: 'Were the company to collapse, hundreds of jobs would be jeopardized.', uz: 'Mabodo kompaniya inqirozga yuz tutsa, yuzlab ish o\'rinlari xavf ostida qoladi.' }
    ],
    mistakes: [
      { wrong: 'If had I known...', correct: 'Had I known... / If I had known...', note: '"If" bilan "had" bir vaqtda egadan oldinga chiqmaydi; yo "If", yoki inversiya bo\'ladi.' },
      { wrong: 'Should you will need help...', correct: 'Should you need help...', note: '"Should" bor joyda "will" bo\'lmaydi, fe\'l sof boshlang\'ich shaklda turadi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "Mabodo ...-sa", "Agar ... bo\'lmaganida edi" kabi yuqori uslubdagi shart ifodalariga to\'g\'ri keladi.',
    tip: '💡 "IF" ni olib tashlang: Had + I + V3 (o\'tmishda), Should + you + V1 (kelajakda), Were + I (hozirda).',
    exercises: [
      {
        question: '_____ you encounter any technical difficulties, our support desk is open 24/7.',
        options: ['Should', 'If should', 'Had', 'Were'],
        answer: 0,
        explanation: 'Inversiyali 1-shart mayli: "Should you encounter...".'
      },
      {
        question: '_____ for your timely assistance, we would have failed the audit.',
        options: ['Had it not been', 'Were it not', 'Had not it been', 'If it had not'],
        answer: 0,
        explanation: 'O\'tmishdagi "u bo\'lmaganida" qolipi: "Had it not been for...".'
      },
      {
        question: '_____ I known about the cancellation, I wouldn\'t have driven all this way.',
        options: ['Did', 'Had', 'Have', 'If'],
        answer: 1,
        explanation: 'Third conditional inversiyasi: "Had I known...".'
      },
      {
        question: '_____ they to offer you a 50% pay raise, would you stay?',
        options: ['Were', 'Should', 'Had', 'Are'],
        answer: 0,
        explanation: 'Second conditional inversiyasi: "Were they to offer...".'
      },
      {
        question: 'Were it not for modern medicine, many common diseases _____ fatal.',
        options: ['would be', 'will be', 'had been', 'are'],
        answer: 0,
        explanation: 'Hozirgi davrga tegishli ikkinchi shart natijasi: "would be fatal".'
      }
    ]
  },
  {
    id: 'c1_11',
    level: 'C1',
    title: 'Complex Passive (It is said that, He is believed to)',
    titleUz: 'Murakkab majhul nisbat (Mish-mishlar va ilmiy fikrlar)',
    isTense: false,
    summary: 'Jamoatchilik fikri, ilmiy xulosalar yoki mish-mishlarni shaxssiz (impersonal) va xolis tarzda ifodalash tuzilmalari.',
    usage: [
      'Shakli 1 (It is + V3 + that): It is believed that the criminal has fled abroad.',
      'Shakli 2 (Ega + is/are + V3 + to-infinitive): The criminal is believed TO HAVE fled abroad.',
      'Keng qo\'llaniladigan fe\'llar: say, believe, report, consider, expect, acknowledge, claim, understand.',
      'Agar aytilayotgan voqea o\'tmishda bo\'lsa: to have + V3 ishlatiladi (He is believed to have lived in Rome).'
    ],
    formula: {
      affirmative: 'It is said that + gap | Ega + is/are said + to + V1 (hozir) | Ega + is/are said + to have + V3 (o\'tmish)',
      negative: 'He is not expected to recover quickly.',
      question: 'Is the suspect believed to be armed?'
    },
    examples: [
      { en: 'It is widely believed that regular meditation reduces stress.', uz: 'Muntazam meditatsiya stressni kamaytirishi keng e\'tirof etiladi.' },
      { en: 'The ancient manuscript is thought to date back to the 9th century.', uz: 'Qadimiy qo\'lyozma 9-asrga tegishli deb hisoblanadi.' },
      { en: 'The suspect is reported to have escaped across the border.', uz: 'Gumonlanuvchi chegaradan qochib o\'tgani xabar qilinmoqda (to have escaped).' },
      { en: 'It is acknowledged that climate change requires immediate global action.', uz: 'Iqlim o\'zgarishi zudlik bilan global choralarni talab qilishi tan olinadi.' },
      { en: 'Avicenna is considered to be one of the fathers of modern medicine.', uz: 'Ibn Sino zamonaviy tibbiyotning asoschilaridan biri deb e\'tirof etiladi.' },
      { en: 'The CEO is expected to announce the merger tomorrow morning.', uz: 'Bosh direktor ertaga ertalab birlashuvni e\'lon qilishi kutilmoqda.' },
      { en: 'It was reported that several historical buildings had been damaged.', uz: 'Bir nechta tarixiy binolar shikastlangani xabar qilingan edi.' },
      { en: 'She is claimed to possess photographic memory.', uz: 'U fotogenik xotiraga ega ekanligi da\'vo qilinadi.' }
    ],
    mistakes: [
      { wrong: 'He is said that he is rich.', correct: 'It is said that he is rich / He is said to be rich.', note: 'Ikkala modelni aralashtirmang: "It is said that..." YOKI "He is said to...".' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...deb aytiladi / ...deb hisoblanadi / ...ma\'lum qilinmoqda" tuzilmalariga to\'g\'ri keladi.',
    tip: '💡 1-yo\'l: IT is said that... 2-yo\'l: Ega (He) is said TO be... O\'tmish bo\'lsa: TO HAVE + V3.',
    exercises: [
      {
        question: 'The CEO is expected _____ his resignation tomorrow.',
        options: ['to announce', 'announcing', 'announce', 'announced'],
        answer: 0,
        explanation: 'Ega + is expected + to-infinitive: "to announce".'
      },
      {
        question: 'The ancient pyramid is believed _____ by thousands of skilled artisans.',
        options: ['to have been built', 'to be built', 'building', 'have built'],
        answer: 0,
        explanation: 'O\'tmishda qurilgani uchun Perfect Passive infinitive: "to have been built".'
      },
      {
        question: '_____ is widely acknowledged that education is the catalyst for development.',
        options: ['It', 'There', 'That', 'What'],
        answer: 0,
        explanation: 'Impersonal passiv boshlanishi: "It is widely acknowledged that...".'
      },
      {
        question: 'The missing billionaire is rumored _____ on a private island.',
        options: ['to be living', 'living', 'lives', 'lived'],
        answer: 0,
        explanation: 'Ayni damdagi davomli jarayon: "to be living".'
      },
      {
        question: 'Leonardo da Vinci is considered _____ one of the greatest polymaths in history.',
        options: ['to be', 'being', 'is', 'was'],
        answer: 0,
        explanation: '"Is considered to be..." tuzilmasi.'
      }
    ]
  }
];
