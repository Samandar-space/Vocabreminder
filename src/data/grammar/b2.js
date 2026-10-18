// B2 darajasi - 13 ta asosiy grammatik mavzu
export const b2Topics = [
  {
    id: 'b2_1',
    level: 'B2',
    title: 'Third & Mixed Conditionals',
    titleUz: 'Uchinchi va Aralash shart mayllari',
    isTense: false,
    summary: 'Third Conditional o\'tib ketgan va o\'zgartirib bo\'lmaydigan o\'tmish voqealari va ularning o\'tmishdagi natijasiga pushaymonlikni bildiradi. Mixed Conditionals esa o\'tmishdagi sababning hozirgi holatga ta\'sirini ifodalaydi.',
    usage: [
      'Third Conditional: If + had + V3, would have + V3 (O\'tmishdagi xayoliy shart va o\'tmishdagi oqibat).',
      'Pushaymonlik va tanqid: If I had studied harder, I would have passed the exam (lekin o\'qimadim va o\'tolmadim).',
      'Mixed Conditional 1 (O\'tmishdagi sabab → Hozirgi natija): If I had taken your advice yesterday, I wouldn\'t be in trouble now.',
      'Mixed Conditional 2 (Doimiy xarakter → O\'tmishdagi harakat): If she were smarter, she wouldn\'t have made that mistake.'
    ],
    formula: {
      affirmative: 'Third: If + Past Perfect, would have + V3 | Mixed: If + Past Perfect, would + V1 (hozir)',
      negative: 'If I hadn\'t missed the train, I wouldn\'t have been late.',
      question: 'What would you have done if you had been in my position?'
    },
    examples: [
      { en: 'If I had studied harder, I would have passed the entrance exam.', uz: 'Agar astoydilroq o\'qiganimda edi, kirish imtihonidan o\'tgan bo\'lardim (o\'tmishda o\'qimadim, o\'tolmadim).' },
      { en: 'If we had taken a taxi, we wouldn\'t have missed our flight.', uz: 'Taksi bilan borganimizda reysimizni o\'tkazib yubormagan bo\'lardik.' },
      { en: 'If I had accepted that job in London, I would be living in the UK right now.', uz: 'Londondagi o\'sha ishni qabul qilganimda, ayni damda Buyuk Britaniyada yashayotgan bo\'lardim (Mixed).' },
      { en: 'If she had listened to the GPS, she wouldn\'t be lost now.', uz: 'U GPS ga quloq solganida hozir adashib qolmagan bo\'lardi (Mixed).' },
      { en: 'He would have drowned if the lifeguard hadn\'t rescued him.', uz: 'Qutqaruvchi uni qutqarib qolmaganida u cho\'kib ketgan bo\'lardi.' },
      { en: 'What would have happened if they hadn\'t signed the agreement?', uz: 'Kelishuvni imzolashmaganida nima sodir bo\'lgan bo\'lardi?' },
      { en: 'If you had told me earlier, I could have helped you.', uz: 'Menga ertaroq aytganingizda, yordam bera olgan bo\'lardim.' },
      { en: 'If I weren\'t afraid of flying, I would have traveled with them last week.', uz: 'Parvozdan qo\'rqmaganimda, o\'tgan hafta ular bilan sayohatga borgan bo\'lardim (Mixed).' }
    ],
    mistakes: [
      { wrong: 'If I would have known, I would tell you.', correct: 'If I had known, I would have told you.', note: '"If" qismiga "would have" qo\'yilmaydi, faqat "had + V3" bo\'ladi.' },
      { wrong: 'If he had studied, he passed.', correct: 'If he had studied, he would have passed.', note: 'Natija qismida "would have + V3" shart.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...-ganida edi, ...-gan bo\'lardi" (qilganimda o\'tgan bo\'lardim) o\'tmish pushaymonlik shakliga to\'liq mos keladi.',
    tip: '💡 O\'tmishdagi harakat o\'tmishda qolsa: had + V3 → would have + V3. O\'tmish sabab HOZIR ta\'sir qilsa: had + V3 → would + V1 (now).',
    exercises: [
      {
        question: 'If you _____ me about the meeting, I would have attended it.',
        options: ['told', 'had told', 'would tell', 'have told'],
        answer: 1,
        explanation: 'Third Conditional shart qismi: "had told".'
      },
      {
        question: 'She _____ the flight if she hadn\'t gotten stuck in traffic.',
        options: ['wouldn\'t miss', 'wouldn\'t have missed', 'didn\'t miss', 'hadn\'t missed'],
        answer: 1,
        explanation: 'Third Conditional natija qismi: "wouldn\'t have missed".'
      },
      {
        question: 'If I had won the scholarship last year, I _____ at Oxford right now.',
        options: ['would study', 'would have studied', 'studied', 'will study'],
        answer: 0,
        explanation: 'Mixed conditional (natijasi "right now" - hozir): "would study".'
      },
      {
        question: 'We would have won the match if our goalkeeper _____ that mistake.',
        options: ['didn\'t make', 'hadn\'t made', 'wouldn\'t make', 'hasn\'t made'],
        answer: 1,
        explanation: 'If qismida Past Perfect: "hadn\'t made".'
      },
      {
        question: 'What would you have done if you _____ your passport abroad?',
        options: ['lost', 'had lost', 'would lose', 'have lost'],
        answer: 1,
        explanation: '"If you had lost..." (o\'tmish xayoliy shart).'
      }
    ]
  },
  {
    id: 'b2_2',
    level: 'B2',
    title: 'Future Continuous & Future Perfect',
    titleUz: 'Future Continuous va Future Perfect taqqosi',
    isTense: true,
    summary: 'Kelajakdagi jarayon (Future Continuous: will be doing) va kelajakdagi belgilangan muddatgacha tugallanadigan natija (Future Perfect: will have done) o\'rtasidagi farq.',
    usage: [
      'Future Continuous (will be + V-ing): kelajakda aniq soatda davom etayotgan jarayon (At 8:00 tomorrow I will be driving).',
      'Future Perfect (will have + V3): kelajakdagi ma\'lum muddatgacha (by Monday, by next year) ish-harakat tugab, natijasi tayyor bo\'lishi.',
      'Signal so\'zlar: by next week, by 2030, by the time you arrive, in two years\' time.'
    ],
    formula: {
      affirmative: 'Continuous: will be + V-ing | Perfect: will have + V3 (By 2026, I will have graduated)',
      negative: 'I won\'t have finished by 5:00 / She won\'t be working tomorrow',
      question: 'Will you have finished the report by tomorrow morning?'
    },
    examples: [
      { en: 'By this time next year, I will have graduated from university.', uz: 'Kelasi yil ayni shu paytgacha men universitetni tamomlagan bo\'laman (Future Perfect).' },
      { en: 'At 10:00 AM tomorrow, I will be taking my IELTS test.', uz: 'Ertaga soat 10:00 da men IELTS testimni topshirayotgan bo\'laman (Future Continuous).' },
      { en: 'They will have built the new subway station by December.', uz: 'Ular dekabr oyiga qadar yangi metro bekatini qurib bo\'lishadi.' },
      { en: 'Don\'t worry, I will have finished cleaning the kitchen before the guests arrive.', uz: 'Xavotir olmang, mehmonlar kelguncha oshxonani tozalab bo\'laman.' },
      { en: 'In five years\' time, most people will be driving electric vehicles.', uz: 'Besh yil ichida aksariyat insonlar elektromobil haydayotgan bo\'lishadi.' },
      { en: 'Will you have completed the project by the deadline?', uz: 'Muddat tugaguncha loyihani tugatib bo\'lasizmi?' },
      { en: 'She won\'t have saved enough money by next summer.', uz: 'U kelasi yozgacha yetarli pul to\'plab ulgurmaydi.' },
      { en: 'This time next week, we will be flying over the Pacific Ocean.', uz: 'Kelasi hafta shu paytda biz Tinch okeani uzra uchayotgan bo\'lamiz.' }
    ],
    mistakes: [
      { wrong: 'By tomorrow, I will finish the book.', correct: 'By tomorrow, I will have finished the book.', note: '"By" (gacha) ko\'rsatkichi kelganda Future Perfect (will have finished) ishlatilishi shart.' },
      { wrong: 'By 2030, scientists will be discovered a cure.', correct: 'By 2030, scientists will have discovered a cure.', note: 'Tugallangan natija uchun "will have + V3" olinadi.' }
    ],
    uzbekComparison: 'Continuous = "...-ayotgan bo\'laman"; Perfect = "...-gacha qilib bo\'lgan bo\'laman".',
    tip: '💡 "BY..." (vaqtgacha) so\'zini ko\'rdingizmi? Darhol Future Perfect: WILL HAVE + V3 tanlang!',
    exercises: [
      {
        question: 'By the end of this year, we _____ in this apartment for ten years.',
        options: ['will live', 'will be living', 'will have lived', 'have lived'],
        answer: 2,
        explanation: '"By the end of this year" muddat belgisi Future Perfect (will have lived) talab qiladi.'
      },
      {
        question: 'Don\'t call me between 2 and 4 PM. I _____ a training session.',
        options: ['will conduct', 'will be conducting', 'will have conducted', 'conduct'],
        answer: 1,
        explanation: 'Vaqt oralig\'idagi davomli jarayon: "will be conducting".'
      },
      {
        question: 'By the time you wake up, I _____ breakfast.',
        options: ['will prepare', 'will have prepared', 'will be preparing', 'prepared'],
        answer: 1,
        explanation: 'Uyg\'onishingizgacha tayyor bo\'ladigan natija: "will have prepared".'
      },
      {
        question: 'Will you _____ reading that book by Friday?',
        options: ['have finished', 'be finished', 'finish', 'finishing'],
        answer: 0,
        explanation: '"Will you have finished... by Friday?".'
      },
      {
        question: 'This time on Sunday, we _____ for our final exams.',
        options: ['will study', 'will be studying', 'will have studied', 'studied'],
        answer: 1,
        explanation: 'Aniq kelasi vaqtdagi davom etayotgan jarayon: "will be studying".'
      }
    ]
  },
  {
    id: 'b2_3',
    level: 'B2',
    title: 'Past Perfect Continuous',
    titleUz: 'O\'tgan tugallangan davomli zamon',
    isTense: true,
    summary: 'O\'tmishdagi boshqa bir harakat yoki vaqtgacha muayyan davr mobaynida to\'xtovsiz davom etib kelgan uzoq jarayonni ta\'kidlash uchun ishlatiladi.',
    usage: [
      'O\'tmishdagi voqeadan oldin qancha vaqt davom etganini aytishda: He had been driving for six hours before he finally took a break.',
      'O\'tmishdagi biror natijaning sababi bo\'lgan jarayon: Her eyes were red because she had been crying.',
      'Signal so\'zlar: for, since, before, all day, until.'
    ],
    formula: {
      affirmative: 'Subject + had been + V-ing (They had been waiting for two hours)',
      negative: 'Subject + hadn\'t been + V-ing (He hadn\'t been paying attention)',
      question: 'Had + Subject + been + V-ing? (How long had you been living there before you moved?)'
    },
    examples: [
      { en: 'They had been playing football for an hour when it suddenly started to rain.', uz: 'To\'satdan yomg\'ir boshlanganda, ular bir soatdan beri futbol o\'ynayotgan edilar.' },
      { en: 'She was out of breath because she had been running fast.', uz: 'U hansirab qolgan edi, chunki u tez yugurib kelayotgan edi.' },
      { en: 'I had been studying for three hours before the electricity went off.', uz: 'Elektr o\'chib qolgunga qadar men uch soatdan beri dars qilayotgan edim.' },
      { en: 'How long had you been waiting before the train arrived?', uz: 'Poyezd kelguncha qancha vaqt kutib turgan edingiz?' },
      { en: 'The roads were dangerous because it had been snowing all night.', uz: 'Yo\'llar xavfli edi, chunki tuni bilan qor yog\'ib chiqqan edi.' },
      { en: 'He had been working at the company for twenty years before he retired.', uz: 'Nafaqaga chiqishidan oldin u kompaniyada yigirma yil ishlagan edi.' },
      { en: 'We had been looking for our lost dog for hours before we found him.', uz: 'Yo\'qolgan itimizni topgunimizcha uni bir necha soat qidirgan edik.' },
      { en: 'She was tired because she had been typing reports all afternoon.', uz: 'U charchagan edi, chunki tushdan keyin hisobotlarni yozib o\'tirgan edi.' }
    ],
    mistakes: [
      { wrong: 'He was working for 10 years when he got promoted.', correct: 'He had been working for 10 years when he got promoted.', note: 'O\'tmishdagi davomiylik (for 10 years) uchun Past Continuous emas, Past Perfect Continuous olinadi.' },
      { wrong: 'I had been knowing him.', correct: 'I had known him.', note: '"Know" kabi holat fe\'llari continuous bo\'lmaydi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...-dan beri qilayotgan edi" shakliga to\'g\'ri keladi (ikki soatdan beri kutayotgan edi).',
    tip: '💡 O\'tmishdagi natijaning sababi (ko\'zlari qizargan edi, chunki yig\'layotgan edi) = HAD BEEN + fe\'l-ing.',
    exercises: [
      {
        question: 'When the teacher entered, the students _____ loudly for ten minutes.',
        options: ['had been talking', 'were talking', 'talked', 'have been talking'],
        answer: 0,
        explanation: 'O\'qituvchi kirishidan oldin 10 daqiqa davom etgan jarayon: "had been talking".'
      },
      {
        question: 'The grass was wet in the morning. It _____ heavily.',
        options: ['had been raining', 'rained', 'was raining', 'has rained'],
        answer: 0,
        explanation: 'O\'tmishdagi oqibatning sababi bo\'lgan jarayon: "had been raining".'
      },
      {
        question: 'How long had you _____ English before you moved to London?',
        options: ['learning', 'been learning', 'learn', 'learned'],
        answer: 1,
        explanation: 'Past Perfect Continuous so\'roq qolipi: "had you been learning".'
      },
      {
        question: 'He was exhausted because he _____ non-stop since dawn.',
        options: ['had been driving', 'was driving', 'drove', 'is driving'],
        answer: 0,
        explanation: 'Tongdan beri to\'xtovsiz davom etgan jismoniy charchoq sababi: "had been driving".'
      },
      {
        question: 'They _____ for the bus for 40 minutes when it finally arrived.',
        options: ['had been waiting', 'waited', 'were waiting', 'have been waiting'],
        answer: 0,
        explanation: 'Poyezd kelguncha 40 daqiqa davom etgan kutish: "had been waiting".'
      }
    ]
  },
  {
    id: 'b2_4',
    level: 'B2',
    title: 'Passive Voice (Barcha zamonlar & Modallar bilan)',
    titleUz: 'Majhul nisbatning murakkab shakllari',
    isTense: false,
    summary: 'Continuous, Perfect zamonlar va modal fe\'llar bilan majhul nisbatni to\'g\'ri qo\'llash qoidalari.',
    usage: [
      'Present Continuous Passive: am/is/are being + V3 (The road is being repaired now).',
      'Past Continuous Passive: was/were being + V3 (The car was being washed when I arrived).',
      'Present Perfect Passive: have/has been + V3 (The project has been completed).',
      'Past Perfect Passive: had been + V3 (The letter had been sent before he called).',
      'Modal Passives: modal + be + V3 (Rules must be obeyed / It can be done).'
    ],
    formula: {
      affirmative: 'Continuous: be + being + V3 | Perfect: have/has/had + been + V3 | Modal: modal + be + V3',
      negative: 'The rooms weren\'t being cleaned / It cannot be undone',
      question: 'Has the parcel been delivered yet? / Can it be fixed?'
    },
    examples: [
      { en: 'A new modern bridge is being built across the river.', uz: 'Daryo uzra yangi zamonaviy ko\'prik qurilmoqda (ayni damda jarayon).' },
      { en: 'The suspect was being questioned by the detectives.', uz: 'Gumonlanuvchi detektivlar tomonidan so\'roq qilinayotgan edi.' },
      { en: 'All tickets for the concert have already been sold.', uz: 'Konsert uchun barcha chiptalar allaqachon sotib bo\'lindi.' },
      { en: 'The package had been damaged before it arrived at our office.', uz: 'Posilka ofisimizga yetib kelishidan oldin shikastlangan edi.' },
      { en: 'Safety regulations must be followed at all times.', uz: 'Xavfsizlik qoidalariga har doim rioya qilinishi shart.' },
      { en: 'This problem cannot be solved overnight.', uz: 'Bu muammoni bir kechada hal qilib bo\'lmaydi.' },
      { en: 'The patient should be examined by a specialist immediately.', uz: 'Bemor zudlik bilan mutaxassis tomonidan ko\'rikdan o\'tkazilishi kerak.' },
      { en: 'New guidelines will be announced tomorrow morning.', uz: 'Yangi ko\'rsatmalar ertaga ertalab e\'lon qilinadi.' }
    ],
    mistakes: [
      { wrong: 'The house is building now.', correct: 'The house is being built now.', note: 'Agar "is building" desangiz uyning o\'zi qurayapti bo\'ladi; passivda "is being built" shart.' },
      { wrong: 'It must done.', correct: 'It must be done.', note: 'Modaldan keyin "be" tushib qolmasligi kerak.' }
    ],
    uzbekComparison: 'O\'zbek tilida "-ilmoqda, -ilgan, -ilishi kerak" majhul nisbat shakllariga to\'g\'ri keladi.',
    tip: '💡 Davomli passivda "BEING" qatnashadi (is being done). Tugallangan passivda "BEEN" qatnashadi (has been done).',
    exercises: [
      {
        question: 'Look! The old town hall _____ by workers right now.',
        options: ['is painting', 'is being painted', 'has been painted', 'paints'],
        answer: 1,
        explanation: 'Ayni damda bo\'layotgan davomli majhul harakat: "is being painted".'
      },
      {
        question: 'The final decision has not _____ yet.',
        options: ['been made', 'being made', 'be made', 'make'],
        answer: 0,
        explanation: 'Present Perfect Passive formulasi: "has not been made".'
      },
      {
        question: 'Seatbelts must _____ fastened during takeoff and landing.',
        options: ['be', 'been', 'being', 'to be'],
        answer: 0,
        explanation: 'Modal fe\'ldan keyin "be + V3": "must be fastened".'
      },
      {
        question: 'When I walked into the garage, my car _____ by two mechanics.',
        options: ['was repairing', 'was being repaired', 'had repaired', 'repaired'],
        answer: 1,
        explanation: 'O\'tgan zamonda davom etayotgan passiv harakat: "was being repaired".'
      },
      {
        question: 'The historical documents _____ carefully in the national archive.',
        options: ['are kept', 'keep', 'are keeping', 'kept'],
        answer: 0,
        explanation: 'Doimiy saqlanadigan narsa: "are kept".'
      }
    ]
  },
  {
    id: 'b2_5',
    level: 'B2',
    title: 'Reported Questions, Commands & Reporting verbs',
    titleUz: 'O\'zlashtirma so\'roqlar, buyruqlar va maxsus fe\'llar',
    isTense: false,
    summary: 'Savollar va buyruqlarni o\'zlashtirma gapga aylantirish, hamda "say/tell" o\'rniga boyituvchi fe\'llar (advise, warn, refuse, promise, apologize)ni qo\'llash.',
    usage: [
      'Wh- savollar: so\'roq so\'zidan so\'ng to\'g\'ri so\'z tartibi (ega + kesim) bo\'ladi: "Where do you live?" → He asked me where I lived.',
      'Yes/No savollar: "if" yoki "whether" qo\'shiladi: "Do you like coffee?" → She asked if I liked coffee.',
      'Buyruq va iltimoslar: tell / ask someone TO do something: "Close the door!" → He told me to close the door.',
      'Reporting verbs: advise to do, promise to do, warn not to do, apologize for doing, suggest doing.'
    ],
    formula: {
      affirmative: 'Savol: asked + wh- / if + ega + orqaga surilgan fe\'l (savol belgisi qo\'yilmaydi!)',
      negative: 'Buyruq inkori: told / warned + someone + NOT to do something',
      question: 'He asked where she had been. / She suggested going to the park.'
    },
    examples: [
      { en: 'Direct: "Where is the station?" → He asked me where the station was.', uz: 'U stansiya qayerdaligini mendan so\'radi (was oxiriga o\'tadi).' },
      { en: 'Direct: "Do you have a passport?" → She asked if I had a passport.', uz: 'U menda pasport bor-yo\'qligini so\'radi.' },
      { en: 'Direct: "Please sit down." → The doctor told me to sit down.', uz: 'Shifokor menga o\'tirishimni aytdi.' },
      { en: 'Direct: "Don\'t touch that wire!" → The engineer warned us not to touch the wire.', uz: 'Muhandis simni ushlamasligimiz haqida ogohlantirdi.' },
      { en: 'He apologized for being late to the meeting.', uz: 'U majlisga kech qolgani uchun uzr so\'radi (apologize for + -ing).' },
      { en: 'She promised to return the borrowed money next Monday.', uz: 'U qarzga olingan pulni kelasi dushanba qaytarishga va\'da berdi.' },
      { en: 'The teacher advised the students to read academic articles.', uz: 'O\'qituvchi talabalarga ilmiy maqolalarni o\'qishni maslahat berdi.' },
      { en: 'He denied stealing the confidential files.', uz: 'U maxfiy fayllarni o\'g\'irlaganini rad etdi (deny + -ing).' }
    ],
    mistakes: [
      { wrong: 'She asked me where did I live.', correct: 'She asked me where I lived.', note: 'O\'zlashtirma so\'roqda "did/do" tushib qoladi va to\'g\'ri darak so\'z tartibi (where I lived) bo\'ladi.' },
      { wrong: 'He told me to not do it.', correct: 'He told me not to do it.', note: 'Inkor buyruqda "not to" tartibi bo\'ladi.' },
      { wrong: 'He suggested me to go.', correct: 'He suggested that I go / He suggested going.', note: '"Suggest" dan keyin "to do" kelmaydi, "-ing" yoki "that" keladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...-ishimni so\'radi, ...-maslikni buyurdi" qoliplariga to\'g\'ri keladi.',
    tip: '💡 O\'zlashtirma savolda SAVOL TARTIBI YO\'QOLADI! Oddiy darak gap kabi: Ega oldinda, fe\'l ketida turadi.',
    exercises: [
      {
        question: '"Where are you going?" → She asked me where I _____.',
        options: ['am going', 'was going', 'was I going', 'did I go'],
        answer: 1,
        explanation: 'To\'g\'ri so\'z tartibi va o\'tgan zamon: "where I was going".'
      },
      {
        question: '"Do you speak Spanish?" → He asked me _____ I spoke Spanish.',
        options: ['that', 'if', 'what', 'did'],
        answer: 1,
        explanation: 'Yes/No savoli o\'zlashtirma gapda "if" yoki "whether" bilan ulanadi.'
      },
      {
        question: 'The doctor warned the patient _____ smoke anymore.',
        options: ['not to', 'to not', 'don\'t', 'no to'],
        answer: 0,
        explanation: 'Inkor buyruq qolipi: "warned not to smoke".'
      },
      {
        question: 'He apologized _____ losing his temper during the discussion.',
        options: ['to', 'for', 'about', 'with'],
        answer: 1,
        explanation: '"Apologize for doing something" qolipi.'
      },
      {
        question: 'She promised _____ me as soon as she arrived at the hotel.',
        options: ['call', 'to call', 'calling', 'called'],
        answer: 1,
        explanation: '"Promise to do" qolipi.'
      }
    ]
  },
  {
    id: 'b2_6',
    level: 'B2',
    title: 'Non-defining Relative Clauses',
    titleUz: 'Izohlovchi (noaniqlovchi) ergash gaplar',
    isTense: false,
    summary: 'Gapdagi shaxs yoki narsa haqida asosiy ma\'noga xalaqit bermaydigan qo\'shimcha, qiziqarli ma\'lumot beradi va har doim ikkala tomondan vergullar bilan ajratiladi.',
    usage: [
      'Qo\'shimcha ma\'lumot: agar bu qismni gapdan olib tashlasak ham, asosiy gap o\'z to\'liq ma\'nosini yo\'qotmaydi.',
      'Vergullar majburiy: My brother, who lives in London, is a software engineer.',
      'Qat\'iy qoida: Non-defining relative clauses da "THAT" ishlatish qat\'iyan TAQIQLANADI! Faqat who, which, where, whose ishlatiladi.',
      '"Which" butun boshli oldingi gapga xulosa bo\'lib kelishi mumkin: He failed his driving test again, which surprised everyone.'
    ],
    formula: {
      affirmative: 'Ot, who / which / whose / where ..., asosiy gapning davomi.',
      negative: 'Toshkent, which is the capital of Uzbekistan, has many modern parks.',
      question: 'Have you met my uncle, who recently moved to Samarkand?'
    },
    examples: [
      { en: 'My father, who is 58 years old, still runs marathons.', uz: 'Otam (u 58 yoshda) hali ham marafonlarda yuguradi.' },
      { en: 'Samarkand, which is famous for its blue domes, attracts thousands of tourists.', uz: 'Moviy gumbazlari bilan mashhur bo\'lgan Samarqand minglab sayyohlarni jalb qiladi.' },
      { en: 'Mr. Aliyev, whose son studies in Japan, is our university dean.', uz: 'O\'g\'li Yaponiyada o\'qiydigan janob Aliyev bizning universitet dekanimiz.' },
      { en: 'The company, which was founded in 2010, has grown rapidly.', uz: '2010-yilda tashkil etilgan kompaniya jadal rivojlandi.' },
      { en: 'He arrived an hour late, which made the manager furious.', uz: 'U bir soat kech yetib keldi, bu esa menejerni g\'azablantirdi.' },
      { en: 'My best friend, who lives next door, is always ready to help.', uz: 'Yon qo\'shnim bo\'lgan eng yaqin do\'stim har doim yordamga shay.' },
      { en: 'The new sports complex, where our team trains, has Olympic facilities.', uz: 'Jamoamiz shug\'ullanadigan yangi sport majmuasi Olimpiya standartlariga ega.' },
      { en: 'Shakespeare, who was born in Stratford, wrote iconic masterpieces.', uz: 'Stratfordda tug\'ilgan Shekspir betakror durdona asarlar yaratgan.' }
    ],
    mistakes: [
      { wrong: 'My mother, that loves cooking, made plov.', correct: 'My mother, who loves cooking, made plov.', note: 'Vergulli (non-defining) gaplarda "that" aslo ishlatilmaydi! Odamga faqat "who", narsaga faqat "which".' },
      { wrong: 'Samarkand which is famous...', correct: 'Samarkand, which is famous...', note: 'Maxsus nomlar aniq ma\'lum bo\'lgani uchun vergul qo\'yilishi shart.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi kiritma gaplar va ajratilgan izohlovchilarga to\'g\'ri keladi.',
    tip: '💡 Vergul bormi? Demak "THAT" ni unuting! Faqat "WHO" (odam) yoki "WHICH" (narsa) tanlang.',
    exercises: [
      {
        question: 'My English teacher, _____ has lived abroad for a decade, speaks four languages.',
        options: ['that', 'who', 'which', 'whose'],
        answer: 1,
        explanation: 'Vergul bilan ajratilgan inson haqidagi qo\'shimcha izoh: "who" (that bo\'lmaydi!).'
      },
      {
        question: 'Tashkent Metro, _____ was opened in 1977, is famous for its stunning architecture.',
        options: ['that', 'which', 'where', 'who'],
        answer: 1,
        explanation: 'Vergulli jumlada narsa/ob\'ekt uchun faqat "which" ishlatiladi.'
      },
      {
        question: 'He lost his phone, _____ caused him a lot of trouble.',
        options: ['which', 'that', 'what', 'who'],
        answer: 0,
        explanation: 'Butun boshli oldingi vaziyatga nisbatan xulosa: ", which caused...".'
      },
      {
        question: 'Our director, _____ office is on the top floor, is very approachable.',
        options: ['who', 'whose', 'whom', 'which'],
        answer: 1,
        explanation: 'Egalik ma\'nosidagi izoh: "whose office" (ofisi yuqori qavatda bo\'lgan).'
      },
      {
        question: 'Which relative pronoun CANNOT be used after a comma?',
        options: ['who', 'which', 'that', 'where'],
        answer: 2,
        explanation: '"That" nisbiy olmoshi verguldan keyin non-defining gaplarda mutlaqo ishlatilmaydi.'
      }
    ]
  },
  {
    id: 'b2_7',
    level: 'B2',
    title: 'Wish and If only',
    titleUz: 'Wish va If only: Orzu va afsuslanishlar',
    isTense: false,
    summary: 'Hozirgi, o\'tmishdagi yoki kelajakdagi vaziyatdan norozilikni, afsuslanishni yoki biror narsaning boshqacha bo\'lishini orzu qilishni bildiradi.',
    usage: [
      'Hozirgi holatdan norozilik: Wish + Past Simple (I wish I had more money = qaniydi ko\'proq pulim bo\'lsa).',
      'O\'tmishdagi afsuslanish (pushaymonlik): Wish + Past Perfect (I wish I hadn\'t said that = qaniydi o\'shanda buni aytmaganimda).',
      'Birovning xulq-atvori yoki asabga tegadigan odatidan shikoyat: Wish + would + V1 (I wish you would stop interrupting me!).',
      '"If only" — "I wish" ga qaraganda yanada kuchliroq va emotsionalroq shakldir.'
    ],
    formula: {
      affirmative: 'Hozirgi orzu: wish + Past Simple | O\'tmishdagi afsus: wish + had + V3 | Shikoyat: wish + would + V1',
      negative: 'I wish it weren\'t raining / If only I hadn\'t spent all my salary',
      question: 'Do you ever wish you could fly?'
    },
    examples: [
      { en: 'I wish I spoke fluent English like a native speaker.', uz: 'Qaniydi ingliz tilida ona tilimdek erkin gaplasha olsam edi (hozir gapira olmayman).' },
      { en: 'I wish I had studied harder for that exam.', uz: 'Qaniydi o\'sha imtihonga astoydilroq tayyorlanganimda edi (o\'tmishdagi afsus).' },
      { en: 'If only I had enough time to travel around the world.', uz: 'Qaniydi dunyo bo\'ylab sayohat qilishga yetarli vaqtim bo\'lsa edi.' },
      { en: 'I wish you wouldn\'t play your music so loudly at night.', uz: 'Qaniydi kechasi musiqangizni bunchalik baland qo\'ymasangiz edi (shikoyat).' },
      { en: 'She wishes she were taller.', uz: 'U qaniydi balandroq bo\'lganimda edi deb orzu qiladi.' },
      { en: 'If only I hadn\'t bought that expensive car.', uz: 'Qaniydi o\'sha qimmat mashinani sotib olmaganimda edi.' },
      { en: 'I wish the rain would stop so we could go outside.', uz: 'Qaniydi yomg\'ir to\'xtasa, tashqariga chiqar edik.' },
      { en: 'He wishes he had accepted the scholarship.', uz: 'U grantni qabul qilganida edi deb afsuslanmoqda.' }
    ],
    mistakes: [
      { wrong: 'I wish I have a car.', correct: 'I wish I had a car.', note: '"Wish" dan keyin hozirgi zamon (have) ishlatilmaydi, orqaga surilib Past Simple (had) bo\'ladi.' },
      { wrong: 'I wish I didn\'t eat so much yesterday.', correct: 'I wish I hadn\'t eaten so much yesterday.', note: 'O\'tgan zamondagi voqeaga afsuslanish uchun "had + V3" shart.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "Qaniydi ...-sa edi" yoki "...-ganimda edi deb afsuslanaman" iboralariga to\'liq mos keladi.',
    tip: '💡 Zamonlar qoidasi: Hozirgi orzuga → Past Simple. O\'tmishdagi afsusga → Past Perfect (had + V3). Birovga asabiylashganda → WOULD.',
    exercises: [
      {
        question: 'I don\'t know how to swim. I wish I _____ how to swim.',
        options: ['know', 'knew', 'had known', 'would know'],
        answer: 1,
        explanation: 'Hozirgi holatdagi orzu uchun Past Simple: "knew".'
      },
      {
        question: 'I failed the test yesterday. I wish I _____ harder last week.',
        options: ['studied', 'had studied', 'would study', 'study'],
        answer: 1,
        explanation: 'O\'tmishdagi voqeaga afsuslanish (yesterday): "had studied".'
      },
      {
        question: 'I wish my neighbor _____ playing the drums so late at night! It is annoying.',
        options: ['stops', 'would stop', 'stopped', 'had stopped'],
        answer: 1,
        explanation: 'Birovning asabga tegadigan odatidan shikoyat: "would stop".'
      },
      {
        question: 'If only we _____ enough money to buy that apartment right now.',
        options: ['have', 'had', 'would have', 'had had'],
        answer: 1,
        explanation: 'Hozirgi orzu: "If only we had...".'
      },
      {
        question: 'She wishes she _____ his secret to everyone, but she already did.',
        options: ['didn\'t tell', 'hadn\'t told', 'wouldn\'t tell', 'doesn\'t tell'],
        answer: 1,
        explanation: 'O\'tmishda qilingan xatoga pushaymonlik: "hadn\'t told".'
      }
    ]
  },
  {
    id: 'b2_8',
    level: 'B2',
    title: 'Perfect Modals (should have, could have, must have)',
    titleUz: 'O\'tgan zamon modal fe\'llari: should have, could have, must have, can\'t have',
    isTense: false,
    summary: 'O\'tib ketgan voqealar haqida mantiqiy xulosalar chiqarish, qilinmagan imkoniyatlar yoki o\'tgan zamondagi xatolarni tanqid qilish.',
    usage: [
      '"Must have + V3" (95% ishonch): O\'tmishda aniq shunday bo\'lgan: He must have forgotten his keys, the door is locked.',
      '"Can\'t have + V3" (95% inkor): O\'tmishda aslo unday bo\'lishi mumkin emas: She can\'t have passed, she didn\'t study at all.',
      '"Should have + V3": Qilinishi kerak edi, ammo qilinmadi (tanqid/pushaymon): You should have told me the truth.',
      '"Could have + V3": Qilish imkoniyati bor edi, ammo qilinmadi: I could have helped you, why didn\'t you ask?'
    ],
    formula: {
      affirmative: 'Subject + must / could / should / might + have + V3',
      negative: 'Subject + couldn\'t have / shouldn\'t have / can\'t have + V3',
      question: 'Could he have done it by mistake?'
    },
    examples: [
      { en: 'You should have called me earlier; now it is too late.', uz: 'Menga ertaroq qo\'ng\'iroq qilishingiz kerak edi; endi kech bo\'ldi (tanqid).' },
      { en: 'He must have left his umbrella in the taxi.', uz: 'U soyabonini taksida qoldirgan bo\'lishi aniq (o\'tmishdagi kuchli xulosa).' },
      { en: 'She can\'t have stolen the documents; she wasn\'t even in the office.', uz: 'U hujjatlarni o\'g\'irlagan bo\'lishi aslo mumkin emas; u ofisda ham emas edi.' },
      { en: 'I could have passed the test easily, but I was careless.', uz: 'Testdan osonlikcha o\'tishim mumkin edi, ammo e\'tiborsizlik qildim.' },
      { en: 'You shouldn\'t have spoken to your mother so disrespectfully.', uz: 'Onangizga bunchalik hurmatsizlik bilan gapirmasligingiz kerak edi.' },
      { en: 'Where is Farhod? — He might have missed the morning train.', uz: 'Farhod qayerda? — U ertalabki poyezdga kechikkan bo\'lishi mumkin.' },
      { en: 'They must have arrived by now, the flight landed an hour ago.', uz: 'Ular hozirgacha yetib kelgan bo\'lishi kerak, samolyot bir soat oldin qo\'ngan.' },
      { en: 'We could have won the championship if our striker hadn\'t been injured.', uz: 'Agar hujumchimiz jarohat olmaganida, chempionatda g\'olib chiqishimiz mumkin edi.' }
    ],
    mistakes: [
      { wrong: 'You should call me yesterday.', correct: 'You should have called me yesterday.', note: 'O\'tgan zamondagi maslahat/tanqid faqat "should have + V3" bilan yasaladi.' },
      { wrong: 'He must had gone.', correct: 'He must have gone.', note: 'Modal fe\'ldan keyin har doim "have" (boshlang\'ich shakl) keladi, "had" emas.' }
    ],
    uzbekComparison: 'Should have = "...qilishim/qilishing kerak edi"; Must have = "...qilgan bo\'lsa kerak / aniq qilgan"; Could have = "...qila olardim (lekin qilmadim)".',
    tip: '💡 Modal + HAVE + V3 formulasi har doim O\'TMISHGA tegishli bo\'ladi!',
    exercises: [
      {
        question: 'The road was completely empty. You _____ driven so aggressively.',
        options: ['shouldn\'t have', 'must have', 'can\'t have', 'should'],
        answer: 0,
        explanation: 'O\'tmishdagi noto\'g\'ri harakatni tanqid qilish: "shouldn\'t have driven".'
      },
      {
        question: 'Jack isn\'t at home. He _____ gone to the gym.',
        options: ['must have', 'should have', 'can\'t', 'might to'],
        answer: 0,
        explanation: 'O\'tmishdagi mantiqiy ishonchli xulosa: "must have gone".'
      },
      {
        question: 'I _____ bought that car last year, but I decided to save my money instead.',
        options: ['could have', 'must have', 'should', 'can have'],
        answer: 0,
        explanation: 'Imkoniyat bor edi, ammo qilinmadi: "could have bought".'
      },
      {
        question: 'She _____ committed the crime; she has an ironclad alibi.',
        options: ['can\'t have', 'must have', 'should have', 'might have'],
        answer: 0,
        explanation: 'O\'tmishdagi inkor qat\'iy ishonch: "can\'t have committed".'
      },
      {
        question: 'You _____ me you were a vegetarian! I cooked meat especially for you.',
        options: ['should have told', 'must tell', 'could tell', 'should tell'],
        answer: 0,
        explanation: 'Ertaroq aytish kerak edi degan pushaymonlik: "should have told".'
      }
    ]
  },
  {
    id: 'b2_9',
    level: 'B2',
    title: 'Causative (Have / Get something done)',
    titleUz: 'Kauzativ konstruksiya: biror ishni boshqa kishiga qildirish',
    isTense: false,
    summary: 'O\'zingiz emas, balki biror xizmat ko\'rsatuvchi usta, mutaxassis yoki boshqa inson tomonidan siz uchun bajarilgan ishlarni ifodalash.',
    usage: [
      'Have something done: I had my car repaired (Men mashinamni ustaga tuzattirdim).',
      'Get something done: so\'zlashuvda "have" o\'rnida ko\'p ishlatiladi (I got my hair cut).',
      'Have someone DO something (ustoz/boshliq talabi bilan qildirish).',
      'Get someone TO DO something (ko\'ndirish yoki iltimos bilan qildirish).'
    ],
    formula: {
      affirmative: 'Subject + have / get (har qanday zamonda) + Narsa (object) + V3 (Past Participle)',
      negative: 'I didn\'t have my suit cleaned / She hasn\'t had her eyes tested yet',
      question: 'Where did you have your hair cut? / How often do you get your car serviced?'
    },
    examples: [
      { en: 'I had my hair cut at the new salon yesterday.', uz: 'Kecha yangi salonda sochimni kestirdim (sartarosh kesdi).' },
      { en: 'We are having our house painted this week.', uz: 'Bu hafta uyimizni bo\'yattiryapmiz (ustalar bo\'yayapti).' },
      { en: 'You should get your teeth checked twice a year.', uz: 'Tishlaringizni yilda ikki marta ko\'rikdan o\'tkazdirib turishingiz kerak.' },
      { en: 'He had his wallet stolen on the crowded bus.', uz: 'Gavjum avtobusda uning hamyonini o\'g\'irlab ketishdi (yoqimsiz hodisa).' },
      { en: 'I need to get my laptop repaired as soon as possible.', uz: 'Noutbukimni imkon qadar tezroq tuzattirishim kerak.' },
      { en: 'Where did you have this suit tailored?', uz: 'Bu kostyumni qayerda tiktirdingiz?' },
      { en: 'She will have the documents translated into English.', uz: 'U hujjatlarni ingliz tiliga tarjima qildiradi.' },
      { en: 'The manager had his assistant prepare the financial report.', uz: 'Menejer yordamchisiga moliyaviy hisobotni tayyorlatdi.' }
    ],
    mistakes: [
      { wrong: 'I cut my hair yesterday (sartaroshda kildirgan bo\'lsa).', correct: 'I had my hair cut yesterday.', note: '"I cut my hair" desangiz o\'z qo\'lingiz bilan qaychi olib kesganingizni bildiradi.' },
      { wrong: 'I had repaired my car.', correct: 'I had my car repaired.', note: 'O\'rtada ob\'ekt (my car) turishi shart!' }
    ],
    uzbekComparison: 'O\'zbek tilidagi orttirma nisbatga to\'liq mos keladi (-tir, -dir, masalan: tiktirdim, bo\'yattirdim, tuzattirdim).',
    tip: '💡 Formula: HAVE/GET + narsa + V3. Masalan: have my car repaired = mashinamni tuzattirish.',
    exercises: [
      {
        question: 'I need to go to the salon to have my hair _____ .',
        options: ['cut', 'cutting', 'to cut', 'cuts'],
        answer: 0,
        explanation: 'HAVE + narsa + V3 qolipi: "have my hair cut" ("cut" ning V3 shakli ham "cut").'
      },
      {
        question: 'We are going to _____ our roof repaired before winter begins.',
        options: ['have', 'make', 'do', 'cause'],
        answer: 0,
        explanation: 'Kauzativ fe\'l "have" (yoki get): "have our roof repaired".'
      },
      {
        question: 'Where did you get your suit _____?',
        options: ['clean', 'cleaned', 'cleaning', 'to clean'],
        answer: 1,
        explanation: '"Get + narsa + V3": "cleaned".'
      },
      {
        question: 'She _____ her passport stolen while traveling in Europe.',
        options: ['had', 'was', 'got to', 'did'],
        answer: 0,
        explanation: 'Kutilmagan noxush voqea: "She had her passport stolen".'
      },
      {
        question: 'The teacher got the students _____ the classroom after the party.',
        options: ['clean', 'to clean', 'cleaned', 'cleaning'],
        answer: 1,
        explanation: '"Get someone TO DO something" qolipi bo\'yicha "to clean" keladi.'
      }
    ]
  },
  {
    id: 'b2_10',
    level: 'B2',
    title: 'Linking words & Discourse markers',
    titleUz: 'Bog\'lovchilar va nutq ko\'makchilari (however, although, despite)',
    isTense: false,
    summary: 'Murakkab insho (essay) va rasmiy nutqda fikrlarni mantiqiy bog\'lash, zidlik (kontrast), sabab-oqibat va qo\'shimcha ma\'lumot berish vositalari.',
    usage: [
      'Zidlik (Contrast): Although / Even though + gap (Although it was raining, we went out).',
      'Zidlik: Despite / In spite of + ot yoki V-ing (Despite the rain, we went out).',
      'Fikrni boshlash (Adverbial): However, Nevertheless, On the other hand (har doim vergul bilan).',
      'Sabab va Oqibat: Due to / Owing to (+ ot), Therefore, As a result, Consequently.',
      'Qo\'shimcha qilish: Furthermore, Moreover, In addition.'
    ],
    formula: {
      affirmative: 'Although + Ega + Fe\'l | Despite + Ot / V-ing | However, Ega + Fe\'l',
      negative: 'Despite not having much money, he was very generous.',
      question: 'Did they succeed despite all the difficulties?'
    },
    examples: [
      { en: 'Although it was raining heavily, they decided to go hiking.', uz: 'Yomg\'ir kuchli yog\'ayotgan bo\'lsa-da, ular sayrga chiqishga qaror qildilar.' },
      { en: 'Despite the heavy rain, they decided to go hiking.', uz: 'Kuchli yomg\'irga qaramasdan, ular sayrga chiqishga qaror qildilar (despite + ot).' },
      { en: 'He studied very hard; however, he failed the final exam.', uz: 'U juda qattiq o\'qidi; biroq, yakuniy imtihondan yiqildi.' },
      { en: 'In spite of feeling exhausted, she completed the report.', uz: 'O\'zini nihoyatda charchagan his qilishiga qaramay, u hisobotni tugatdi.' },
      { en: 'The flight was delayed due to severe weather conditions.', uz: 'Noqulay ob-havo sharoiti tufayli reys kechiktirildi.' },
      { en: 'The company invested in new technology; consequently, productivity increased.', uz: 'Kompaniya yangi texnologiyalarga sarmoya kiritdi; natijada, unumdorlik oshdi.' },
      { en: 'Moreover, the new system is much more cost-effective.', uz: 'Bundan tashqari, yangi tizim ancha tejamkor.' },
      { en: 'She is an excellent student; furthermore, she speaks three foreign languages.', uz: 'U a\'lochi talaba; qolaversa, uchta chet tilida erkin gaplashadi.' }
    ],
    mistakes: [
      { wrong: 'Despite of the rain...', correct: 'In spite of the rain... / Despite the rain...', note: '"Despite" dan keyin "of" ishlatilmaydi! Faqat "In spite of" da "of" bo\'ladi.' },
      { wrong: 'Although the rain, we went out.', correct: 'Although it rained... / Despite the rain...', note: '"Although" dan keyin albatta ega va fe\'l bo\'lishi kerak.' }
    ],
    uzbekComparison: 'Although = "...-sa ham / ...-ga qaramay"; Despite = "...-ga qaramasdan"; However = "ammo / biroq / shunga qaramay".',
    tip: '💡 ALTHOUGH dan keyin butun GAP (ega + fe\'l). DESPITE dan keyin esa faqat OT yoki FE\'L-ING keladi (of yo\'q!).',
    exercises: [
      {
        question: '_____ the bad weather, the match was not cancelled.',
        options: ['Although', 'Despite', 'Even though', 'However'],
        answer: 1,
        explanation: '"The bad weather" ot iborasi bo\'lgani uchun "Despite" to\'g\'ri.'
      },
      {
        question: '_____ he was very tired, he continued working until midnight.',
        options: ['Despite', 'Although', 'In spite of', 'However'],
        answer: 1,
        explanation: '"He was very tired" to\'liq gap (ega+fe\'l) bo\'lgani uchun "Although" keladi.'
      },
      {
        question: 'The flight was cancelled _____ heavy snow.',
        options: ['due to', 'because', 'although', 'even though'],
        answer: 0,
        explanation: 'Ot iborasi oldidan sabab bildirish uchun "due to".'
      },
      {
        question: 'He worked hard all year. _____, he didn\'t get the promotion.',
        options: ['Although', 'Despite', 'However', 'In spite of'],
        answer: 2,
        explanation: 'Yangi gap boshida vergul bilan keladigan zidlik ravishi: "However,".'
      },
      {
        question: 'In spite _____ having a high temperature, she went to school.',
        options: ['of', 'to', 'for', 'about'],
        answer: 0,
        explanation: '"In spite of" iborasi har doim "of" bilan keladi.'
      }
    ]
  },
  {
    id: 'b2_11',
    level: 'B2',
    title: 'Articles (Murakkab holatlar) & Quantifiers',
    titleUz: 'Artikllarning nozik qoidalari va miqdor so\'zlari',
    isTense: false,
    summary: 'Geografik nomlar (tog\'lar, daryolar, davlatlar), makon institutlari (school, hospital, prison) va umumlashtiruvchi artikllar.',
    usage: [
      'Daryolar, dengizlar, okeanlar, tog\' tizmalari: THE (the Nile, the Black Sea, the Alps).',
      'Yakka tog\' cho\'qqilari, alohida ko\'llar, qit\'alar, ko\'pchilik davlatlar: ARTIKLSIZ (Mount Everest, Lake Baikal, Asia, Uzbekistan).',
      'Qo\'shma davlatlar va orollar guruhi: THE (the USA, the UK, the UAE, the Netherlands).',
      'Muassasalar o\'z maqsadida bo\'lsa artiklsiz: go to school (o\'qishga), be in hospital (davolanishda); agar binoga tashrif bo\'lsa: go to the school.',
      'Quantifiers: all, both, neither, either, none, each, every.'
    ],
    formula: {
      affirmative: 'The + dengiz/daryo/okean | Artikl yo\'q: ko\'l/shahar/davlat | Both of them / Neither of them',
      negative: 'Neither student passed the test.',
      question: 'Have you ever crossed the Pacific Ocean?'
    },
    examples: [
      { en: 'The Amazon is the longest river in South America.', uz: 'Amazonka Janubiy Amerikadagi eng uzun daryo (daryolarda the bo\'ladi).' },
      { en: 'Mount Everest is higher than any mountain in Europe.', uz: 'Everest Yevropadagi har qanday tog\'dan balandroq (bitta cho\'qqida the yo\'q).' },
      { en: 'He went to prison for fraud (as a prisoner).', uz: 'U firibgarlik uchun qamoqqa tushdi (mahbus sifatida - artiklsiz).' },
      { en: 'His mother went to the prison to visit him.', uz: 'Onasi uni ko\'rish uchun qamoqxona binosiga bordi (tashrif - the bilan).' },
      { en: 'Neither of the proposals was accepted by the committee.', uz: 'Takliflarning hech biri qo\'mita tomonidan qabul qilinmadi.' },
      { en: 'Both candidates have impressive academic credentials.', uz: 'Har ikkala nomzod ham taassurotli ilmiy darajaga ega.' },
      { en: 'The United Kingdom consists of four nations.', uz: 'Birlashgan Qirollik to\'rtta davlatdan iborat.' },
      { en: 'Lake Baikal is the deepest lake in the world.', uz: 'Baykal ko\'li dunyodagi eng chuqur ko\'l (bitta ko\'lda the yo\'q).' }
    ],
    mistakes: [
      { wrong: 'the Mount Everest', correct: 'Mount Everest', note: 'Alohida yakka cho\'qqi oldidan "the" qo\'yilmaydi.' },
      { wrong: 'I live in the Uzbekistan.', correct: 'I live in Uzbekistan.', note: 'Oddiy davlatlar nomi oldidan "the" qo\'yilmaydi.' }
    ],
    uzbekComparison: 'O\'zbek tilida geografik nomlarda hech qanday belgi yo\'q, ingliz tilida esa suv havzalari va tog\' tizmalari doim "the" talab qiladi.',
    tip: '💡 Suvlar (daryo, dengiz, okean) va tog\' TIZMALARI = THE. Yakka cho\'qqi, yakka ko\'l, davlat, qit\'a = NO ARTICLE.',
    exercises: [
      {
        question: '_____ Pacific Ocean is the largest ocean on Earth.',
        options: ['The', 'A', 'An', '—'],
        answer: 0,
        explanation: 'Okean nomlari har doim "the" bilan keladi: "The Pacific Ocean".'
      },
      {
        question: 'They spent their holiday near _____ Lake Geneva.',
        options: ['the', 'a', '—', 'an'],
        answer: 2,
        explanation: '"Lake" so\'zi bilan bitta ko\'l nomi kelganda artikl qo\'yilmaydi: "Lake Geneva".'
      },
      {
        question: 'He is currently in _____ hospital recovering from surgery.',
        options: ['the', 'a', '—', 'an'],
        answer: 2,
        explanation: 'Bemor sifatida davolanayotgan bo\'lsa artiklsiz "in hospital" bo\'ladi.'
      },
      {
        question: '_____ United Arab Emirates is famous for modern architecture.',
        options: ['The', 'A', '—', 'An'],
        answer: 0,
        explanation: 'Qo\'shma davlatlar oldidan "The" qo\'yiladi: "The UAE".'
      },
      {
        question: '_____ of the two answers was correct; both were wrong.',
        options: ['Neither', 'Either', 'Both', 'None'],
        answer: 0,
        explanation: 'Ikkita variantning ikkalasi ham noto\'g\'ri bo\'lsa "Neither" ishlatiladi.'
      }
    ]
  },
  {
    id: 'b2_12',
    level: 'B2',
    title: 'Participle clauses (Kirish)',
    titleUz: 'Sifatdoshli qurilmalar (-ing va -ed qurilmalari)',
    isTense: false,
    summary: 'Gaplarni qisqartirish, ularni yanada ravon va akademik qilish uchun ergash gaplar o\'rniga qo\'llaniladigan sifatdoshli iboralar.',
    usage: [
      'Faol harakatni qisqartirish (Present Participle: V-ing): Feeling tired, he went to bed early (= Because he felt tired...).',
      'Bir vaqtda yoki ketma-ket sodir bo\'lgan ish: Opening the envelope, she found a letter.',
      'Majhul ma\'nodagi qisqartirish (Past Participle: V3): Built in 1889, the Eiffel Tower is a global landmark.',
      'Shart: Har ikkala qismning egasi BIR XIL bo\'lishi shart!'
    ],
    formula: {
      affirmative: 'V-ing ..., Ega + Fe\'l (Faol) | V3 ..., Ega + Fe\'l (Majhul)',
      negative: 'Not knowing the answer, he remained silent.',
      question: 'Having finished the test, can we leave?'
    },
    examples: [
      { en: 'Feeling exhausted after the long journey, she fell asleep immediately.', uz: 'Uzoq safardan so\'ng charchaganini his qilib, u darhol uxlab qoldi.' },
      { en: 'Not knowing what to say, he stayed completely silent.', uz: 'Nima deyishni bilmay, u mutlaqo jim turdi.' },
      { en: 'Written in simple English, this book is suitable for beginners.', uz: 'Oddiy ingliz tilida yozilgan bu kitob yangi o\'rganuvchilar uchun mos keladi.' },
      { en: 'Having finished his breakfast, he rushed to catch the train.', uz: 'Nonushtasini tugatgach, u poyezdga shoshildi.' },
      { en: 'Walking down the avenue, I bumped into an old schoolmate.', uz: 'Xiyobondan ketayotib, eski sinfdoshimga to\'qnash keldim.' },
      { en: 'Surrounded by mountains, the village has breathtaking views.', uz: 'Tog\'lar bilan o\'ralgan qishloq ajoyib manzaralarga ega.' },
      { en: 'Having lost all his money, he had to ask for help.', uz: 'Barcha pulini yo\'qotib qo\'ygach, u yordam so\'rashga majbur bo\'ldi.' },
      { en: 'Located in central Tashkent, the hotel is convenient for business travelers.', uz: 'Toshkent markazida joylashgan mehmonxona ishbilarmonlar uchun qulay.' }
    ],
    mistakes: [
      { wrong: 'Walking down the street, the tree fell on me.', correct: 'While I was walking down the street, the tree fell on me.', note: '"Dangling participle" xatosi: daraxt ko\'chada ketayotgani yo\'q, harakat egasi bir xil bo\'lishi shart!' }
    ],
    uzbekComparison: 'O\'zbek tilidagi ravishdoshli o\'ramlarga to\'liq mos keladi (-ib, -gach, -ayotib, masalan: ko\'rib, eshitgach, yozilgan bo\'lib).',
    tip: '💡 Bajaruvchi o\'zi bo\'lsa: V-ing (Knowing, Feeling). Bajaruvchi ustida ish qilingan bo\'lsa: V3 (Built, Written).',
    exercises: [
      {
        question: '_____ tired from the football match, the boys went to sleep early.',
        options: ['Feeling', 'Felt', 'To feel', 'Having felt'],
        answer: 0,
        explanation: 'Faol jarayonni sabab qilib ko\'rsatish: "Feeling tired...".'
      },
      {
        question: '_____ by an experienced chef, the dish tasted extraordinary.',
        options: ['Preparing', 'Prepared', 'To prepare', 'Prepares'],
        answer: 1,
        explanation: 'Taom boshqa birov tomonidan tayyorlangan (majhul): "Prepared by...".'
      },
      {
        question: '_____ his car keys, he couldn\'t drive to the meeting.',
        options: ['Having lost', 'Losing', 'Lost', 'To lose'],
        answer: 0,
        explanation: 'Oldin sodir bo\'lib tugagan harakat: "Having lost his car keys...".'
      },
      {
        question: '_____ what to do next, she called her mentor for advice.',
        options: ['Not knowing', 'Knowing not', 'Not know', 'Didn\'t know'],
        answer: 0,
        explanation: 'Inkor participle qurilmasi: "Not knowing what to do...".'
      },
      {
        question: '_____ in the 15th century, the madrasah is an architectural masterpiece.',
        options: ['Constructing', 'Constructed', 'To construct', 'Having constructed'],
        answer: 1,
        explanation: 'Bino qurilgan (passiv): "Constructed in the 15th century".'
      }
    ]
  },
  {
    id: 'b2_13',
    level: 'B2',
    title: 'Unless, As long as, Provided that',
    titleUz: 'Shart bog\'lovchilari: unless, as long as, provided that',
    isTense: false,
    summary: '"If" ning o\'rniga ishlatiladigan, shartni yanada kuchaytiruvchi yoki qat\'iy shart qo\'yuvchi ilg\'or bog\'lovchilar.',
    usage: [
      '"Unless" = If... not (agar ...-masa): You will fail unless you study (= You will fail if you don\'t study).',
      '"Unless" o\'zi inkor ma\'noga ega bo\'lgani uchun uning qismida qo\'shimcha "not" ishlatilmaydi!',
      '"As long as / So long as" (faqat shu shart bilan / mobaynida): You can borrow my car as long as you drive carefully.',
      '"Provided that / Providing that" (faqat shu shart ta\'minlangan taqdirdagina - rasmiy uslubda): We will sign the contract provided that the price is fair.'
    ],
    formula: {
      affirmative: 'Unless + tasdiq fe\'l (kelasi zamon ma\'nosida ham Present Simple) | As long as + Present Simple',
      negative: 'Unless you leave now, you will miss the train.',
      question: 'Will you support us provided that we agree to your terms?'
    },
    examples: [
      { en: 'You won\'t pass the exam unless you study consistently.', uz: 'Muntazam o\'qimasangiz, imtihondan o\'ta olmaysiz (unless = agar o\'qimasangiz).' },
      { en: 'You can stay at my apartment as long as you keep it clean.', uz: 'Toza saqlasangiz bas, xonadonimda qolishingiz mumkin.' },
      { en: 'We will accept the offer provided that delivery is on time.', uz: 'Yetkazib berish o\'z vaqtida bo\'lsa bas, biz taklifni qabul qilamiz.' },
      { en: 'Unless it rains tomorrow, we will play tennis outside.', uz: 'Ertaga yomg\'ir yog\'masa, tashqarida tennis o\'ynaymiz.' },
      { en: 'I don\'t mind helping you as long as I have free time.', uz: 'Bo\'sh vaqtim bor ekan, sizga yordam berishdan mamnunman.' },
      { en: 'Providing that all members agree, the new policy will take effect.', uz: 'Barcha a\'zolar rozi bo\'lgan taqdirdagina, yangi qoida kuchga kiradi.' },
      { en: 'You cannot enter the laboratory unless you wear a white coat.', uz: 'Oq xalat kiymaguningizcha laboratoriyaga kira olmaysiz.' },
      { en: 'He will lend you the money as long as you pay it back next week.', uz: 'Kelasi hafta qaytarsangiz bo\'ldi, u sizga pul qarz beradi.' }
    ],
    mistakes: [
      { wrong: 'Unless you don\'t study, you will fail.', correct: 'Unless you study, you will fail.', note: '"Unless" ning o\'zi inkor, "don\'t" qo\'shilsa ikki karra inkor xatosi bo\'ladi.' },
      { wrong: 'Unless it will rain...', correct: 'Unless it rains...', note: '"Unless" dan keyin kelasi zamon uchun "will" qo\'yilmaydi, Present Simple bo\'ladi.' }
    ],
    uzbekComparison: 'Unless = "agar ...-masa / bo\'lmasa"; As long as / Provided that = "faqat shu shart bilan / ...-sangiz bas".',
    tip: '💡 UNLESS = IF NOT. Shuning uchun "Unless" dan keyin fe\'l doim TASDIQ shaklda yoziladi.',
    exercises: [
      {
        question: 'You cannot get a driving license _____ you are at least 18 years old.',
        options: ['if', 'unless', 'as long as', 'provided'],
        answer: 1,
        explanation: '"Unless" = agar 18 yoshga to\'lmagan bo\'lsangiz (if you are not).'
      },
      {
        question: 'You can borrow my camera _____ you return it by tomorrow evening.',
        options: ['unless', 'as long as', 'in spite of', 'although'],
        answer: 1,
        explanation: 'Faqat shu shart bilan degan ijobiy shart: "as long as".'
      },
      {
        question: 'We will go hiking tomorrow _____ the weather gets terrible.',
        options: ['unless', 'if', 'as long as', 'provided that'],
        answer: 0,
        explanation: 'Agar ob-havo yomon bo\'lib ketmasa: "unless the weather gets terrible".'
      },
      {
        question: 'I will support your project _____ you present a clear budget plan.',
        options: ['unless', 'provided that', 'despite', 'because of'],
        answer: 1,
        explanation: 'Rasmiy shart: "provided that" (agar taqdim etsangiz).'
      },
      {
        question: 'Which word has the same meaning as "if not"?',
        options: ['As long as', 'Provided that', 'Unless', 'Even though'],
        answer: 2,
        explanation: '"Unless" aynan "if not" degan ma\'noni beradi.'
      }
    ]
  }
];
