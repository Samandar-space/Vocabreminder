// C2 darajasi - 9 ta oliy/mukammal darajadagi grammatik mavzu
export const c2Topics = [
  {
    id: 'c2_1',
    level: 'C2',
    title: 'Advanced and Literary Inversion',
    titleUz: 'Badiiy va Oliy darajadagi inversiya',
    isTense: false,
    summary: 'Badiiy adabiyot, tantanali nutqlar va rasmiy yozuvlarda dramatizm, kontrast va yuksak poetik ohang yaratish uchun qo\'llaniladigan murakkab inversiya uslublari (Locative inversion, Participle inversion, So/Such inversiyasi).',
    usage: [
      'Locative (o\'rin-joy) inversiyasi: Hol yoki o\'rin birikmasi oldinga chiqqanda asosiy fe\'l to\'g\'ridan-to\'g\'ri egadan oldinga o\'tadi (yordamchi fe\'lsiz): At the summit stood a ruined temple.',
      'Sifat va sifatdoshli (Participle/Adjective) inversiya: Gone are the days when..., Standing in the corner was a tall stranger.',
      'So + sifat / Such + ot inversiyasi: So fierce was the storm that all flights were grounded.',
      'Shartli inversiyaning poetik/arxaik ko\'rinishlari: Be it as it may..., Come what may...',
      'Tantanali nutq va publitsistikada dramatizm yaratish: Down fell the ancient tower; Away flew the birds.'
    ],
    formula: {
      affirmative: 'O\'rin birikmasi / Sifatdosh / Sifat + Asosiy fe\'l + Ega (Round the corner came the carriage)',
      negative: 'Nor did she utter a single word of regret.',
      question: 'So great was their joy that words failed them completely.'
    },
    examples: [
      { en: 'At the foot of the mountain lay a picturesque, tranquil village.', uz: 'Tog\' etagida maftunkor, sokin bir qishloq yastanib yotar edi.' },
      { en: 'Gone are the days when artists could rely on aristocratic patronage.', uz: 'Ijodkorlar zodagonlar homiyligiga tayanib yashashi mumkin bo\'lgan kunlar o\'tmishda qoldi.' },
      { en: 'So devastating was the earthquake that entire towns were leveled.', uz: 'Zilzila shunchalik vayronkor ediki, butun-butun shaharchalar yer bilan yakson bo\'ldi.' },
      { en: 'Such was the brilliance of her argument that no one dared contradict her.', uz: 'Uning dalillari shunchalik zo\'r ediki, hech kim unga e\'tiroz bildirishga jur\'at etolmadi.' },
      { en: 'Standing beside the ancient oak was a cloaked figure.', uz: 'Qadimiy eman daraxti yonida plashga burkangan bir qiyofa turardi.' },
      { en: 'Out rushed the crowd into the dimly lit corridor.', uz: 'Odamlar oqimi xira yoritilgan yo\'lakka otilib chiqdi.' },
      { en: 'Beneath the surface of civility lay deep-seated ideological mistrust.', uz: 'Xushmuomalalik pardasi ostida chuqur ildiz otgan mafkuraviy ishonchsizlik yashiringan edi.' },
      { en: 'Be that as it may, we must proceed with caution.', uz: 'Nima bo\'lganda ham (har holda), biz ehtiyotkorlik bilan oldinga siljishimiz kerak.' }
    ],
    mistakes: [
      { wrong: 'At the foot of the hill did lie a cottage.', correct: 'At the foot of the hill lay a cottage.', note: 'O\'rin-joy (locative) inversiyasida "did/do" qo\'shilmaydi, asosiy fe\'l to\'g\'ridan-to\'g\'ri oldinga o\'tadi.' },
      { wrong: 'Gone the days are when we were young.', correct: 'Gone are the days when we were young.', note: '"Gone" dan keyin "are/were" fe\'li egadan oldin kelishi kerak.' },
      { wrong: 'So the storm was fierce that...', correct: 'So fierce was the storm that...', note: '"So + sifat" birikmasi boshlanganda inversiya: "So fierce was the storm...".' }
    ],
    uzbekComparison: 'O\'zbek adabiy tilidagi shoirona yoki tarixiy so\'z tartibi inversiyasiga o\'xshaydi ("Tog\' bag\'rida qad rostlab turardi qadimiy qasr").',
    tip: '💡 O\'rin-joy yoki sifat oldinda kelsa, fe\'l bilan eganing o\'rnini oddiygina almashtiring: "In the corner stood he" emas, balki "In the corner stood a man" (olmosh bo\'lsa inversiya qilinmaydi: "In he came").',
    exercises: [
      {
        question: 'Across the valley _____ a magnificent medieval fortress.',
        options: ['did stretch', 'stretched', 'did it stretch', 'was stretching it'],
        answer: 1,
        explanation: 'Locative inversiyada asosiy fe\'l yordamchisiz egadan oldinga o\'tadi: "stretched a fortress".'
      },
      {
        question: '_____ are the years of economic isolation and hardship.',
        options: ['Gone', 'Went', 'Going', 'Have gone'],
        answer: 0,
        explanation: '"Gone are the days/years..." mashhur badiiy inversiya iborasi.'
      },
      {
        question: 'So intense _____ the heat that the tarmac melted.',
        options: ['was', 'it was', 'did be', 'was it'],
        answer: 0,
        explanation: '"So intense was the heat that..." shaklida "was" egadan ("the heat") oldin keladi.'
      },
      {
        question: 'Into the room _____, holding a briefcase.',
        options: ['she walked', 'walked she', 'did walk she', 'walked she in'],
        answer: 0,
        explanation: 'Muhim nozik qoida: agar ega OLMOSH (she, he, they) bo\'lsa, locative inversiya qilinmaydi ("Into the room she walked").'
      },
      {
        question: 'Such _____ his eloquence that the entire assembly fell silent.',
        options: ['was', 'being', 'had', 'did'],
        answer: 0,
        explanation: '"Such was [noun] that..." oliy darajadagi inversiya qolipi.'
      }
    ]
  },
  {
    id: 'c2_2',
    level: 'C2',
    title: 'Subtle Tense & Aspect Nuances (Shall/Will, Would, Stative vs Dynamic)',
    titleUz: 'Zamon va jihatlarning nozik nuanslari',
    isTense: true,
    summary: 'Ingliz tili fe\'l tizimining eng nozik qirralari: shall va will ning huquqiy/axloqiy farqi, would orqali xarakterli odat va tanqid ifodalash, hamda stativ (holat) fe\'llarining faol/dinamik ma\'noda qo\'llanilishi.',
    usage: [
      'Huquqiy/shartnoma tili (Legal shall): The tenant shall pay the rent on the first of each month (majburiyat va qonuniy farmon).',
      'Would orqali odatdagi xatti-harakatni kinoyali tanqid qilish: He would say that, wouldn\'t he? (Kutilganidek yana shunday dedi-da).',
      'Will orqali o\'zgarmas qaysarlikni bildirish: The engine simply will not start (Motor qaysarlik qilib o\'t olmayapti).',
      'Stativ fe\'llarning vaqtinchalik yoki noan\'anaviy jihati: I am loving this city (kuchli emotsiya), He is seeing things (illyuziya ko\'ryapti), I am smelling gas (gaz hidi kelayotganini his qilyapman).',
      'Continuous zamonlarining doimiy xususiyatga nisbatan stilistik qo\'llanishi: She is always losing her keys (g\'ashlik bilan ta\'kidlash).'
    ],
    formula: {
      affirmative: 'Shall (shartnoma/deklaratsiya) / Would (odatiy odat/tanqid) / Be + V-ing (stativ fe\'lning dinamik qo\'llanishi)',
      negative: 'Subject + will not / would not (rad etish/qaysarlik)',
      question: 'Shall the defendant be summoned? / Why would you assume that?'
    },
    examples: [
      { en: 'The lessee shall be responsible for all internal maintenance of the property.', uz: 'Ijarachi mulkning barcha ichki ta\'mirlanishiga mas\'ul bo\'ladi (shartnoma talabi).' },
      { en: 'He would leave his dirty socks on the floor—it drove me mad!', uz: 'U har doim paypoqlarini polda qoldirardi—bu meni aqldan ozdirardi!' },
      { en: 'The printer will not connect to the network, no matter what I try.', uz: 'Nima qilsam ham printer tarmoqqa aslo ulanmayapti (qaysarlik qilyapti).' },
      { en: 'I am weighing my options before committing to the contract.', uz: 'Shartnomani imzolashdan oldin o\'z imkoniyatlarimni chamalab (taroziga solib) ko\'ryapman.' },
      { en: 'She is tasting the sauce to ensure the seasoning is balanced.', uz: 'U ziravorlar me\'yoridaligini tekshirish uchun sousni tatib ko\'ryapti (harakat jarayoni).' },
      { en: 'You would forget your passport on the day of the flight!', uz: 'Parvoz kuni pasportingni esdan chiqarasan-a! (Aynan sendan kutsa bo\'ladigan holat).' },
      { en: 'He is being deliberately obstructive during negotiations.', uz: 'U muzokaralar chog\'ida ataylab to\'sqinlik qilyapti (vaqtinchalik xulq-atvor).' },
      { en: 'Shall we say seven o\'clock for dinner, if that suits you?', uz: 'Kechki ovqatga yetti deb kelishaylikmi, agar sizga ma\'qul kelsa?' }
    ],
    mistakes: [
      { wrong: 'The contract says the tenant will pay by the 5th.', correct: 'The contract states that the tenant shall pay by the 5th.', note: 'Rasmiy yuridik shartnomalarda qat\'iy majburiyat uchun "shall" me\'yoriy standart hisoblanadi.' },
      { wrong: 'He is having a big car right now.', correct: 'He has a big car. (Lekin: He is having dinner - to\'g\'ri).', note: '"Have" egalik ma\'nosida continuous bo\'lmaydi, ammo yeyish/ichish yoki tadbir ma\'nosida dinamik bo\'ladi.' },
      { wrong: 'He always would do that when irritated.', correct: 'He would always do that when irritated.', note: 'Chastota ravishlari (always) odatda "would" dan keyin keladi.' }
    ],
    uzbekComparison: '"Would" bu yerda o\'zbek tilidagi "...-ardi-da o\'zi", "qilmay qolmasdi" degan g\'ashlik yoki xarakterli odat ma\'nosini beradi.',
    tip: '💡 "He would say that!" — bu C2 darajadagi eng mashhur idiomatik iboralardan biri: "Undan boshqa narsa kutib bo\'larmidi!".',
    exercises: [
      {
        question: '"Tom locked his keys in the car again." — "Well, he _____ do that, wouldn\'t he?"',
        options: ['would', 'should', 'might', 'shall'],
        answer: 0,
        explanation: 'Kishining xarakteriga xos, kutilgan odatni kinoya bilan ifodalashda "would" ishlatiladi.'
      },
      {
        question: 'In legal contracts: "The purchaser _____ inspect the goods within seven days of delivery."',
        options: ['shall', 'ought', 'may must', 'will might'],
        answer: 0,
        explanation: 'Yuridik hujjatlarda majburiyat (obligation) uchun formal "shall" qo\'llaniladi.'
      },
      {
        question: 'Why are you smelling the milk? Is it _____ sour?',
        options: ['turning', 'turned to', 'turn', 'having turned'],
        answer: 0,
        explanation: 'Jarayon ifodalanganda: "Is it turning sour?" (aynib borayaptimi?).'
      },
      {
        question: 'The rusty bolt _____ turn, no matter how much force we applied.',
        options: ['would not', 'will not', 'should not', 'might not'],
        answer: 0,
        explanation: 'O\'tmishda jonsiz buyumning qaysarligi/bajarilmasligi uchun "would not" ishlatiladi.'
      },
      {
        question: 'Don\'t mind him today; he is just _____ being difficult.',
        options: ['being', 'be', 'been', 'having'],
        answer: 0,
        explanation: 'Vaqtinchalik ataylab shunday xarakter ko\'rsatish: "is being difficult".'
      }
    ]
  },
  {
    id: 'c2_3',
    level: 'C2',
    title: 'Complex Noun Phrases & Premodification',
    titleUz: 'Murakkab ot birikmalari va prefiksli aniqlovchilar',
    isTense: false,
    summary: 'Akademik, publitsistik va tahliliy ingliz tilida bir necha jumlalarni bitta zich, mazmundor ot guruhiga jamlash uslubi (Premodification, nominal chains, compound modifiers).',
    usage: [
      'Ko\'p bosqichli aniqlovchilar (Multiple premodifiers): A state-of-the-art, AI-driven, multi-platform ecosystem.',
      'Sifatdoshli murakkab birikmalar: A rapidly escalating, debt-laden economic crisis.',
      'Ot orqali otni aniqlash (Noun adjunct chains): Climate change mitigation policy framework.',
      'Postmodification (ergash gaplarsiz ixchamlashtirish): The mechanisms underlying this phenomenon.',
      'Akademik publitsistika va iqtisodiy hisobotlarda ma\'lumot zichligini oshirish.'
    ],
    formula: {
      affirmative: '[Determiner] + [Adv + Adj] + [Compound Adj] + [Noun adjunct] + [Head Noun] + [Post-modifier]',
      negative: 'A non-binding, politically unpalatable resolution',
      question: 'Does this multi-stakeholder governance structure ensure accountability?'
    },
    examples: [
      { en: 'The government launched a comprehensive, community-based youth employment initiative.', uz: 'Hukumat yoshlar bandligini ta\'minlashga qaratilgan keng qamrovli, jamoatchilikka asoslangan tashabbusni e\'lon qildi.' },
      { en: 'They addressed the long-standing, seemingly intractable border dispute.', uz: 'Ular ko\'p yillardan beri davom etayotgan, hal qilib bo\'lmaydigandek tuyulgan chegara mojarosini muhokama qilishdi.' },
      { en: 'The team developed a fault-tolerant, high-throughput financial transaction processing engine.', uz: 'Jamoa xatoliklarga bardoshli, yuqori o\'tkazuvchanlikka ega moliyaviy tranzaksiyalarni qayta ishlash mexanizmini yaratdi.' },
      { en: 'We examined the socio-economic factors underlying rural depopulation.', uz: 'Biz qishloq joylarda aholi kamayishi zamirida yotgan ijtimoiy-iqtisodiy omillarni o\'rganib chiqdik.' },
      { en: 'His was a meticulously researched, groundbreaking analysis of monetary policy.', uz: 'Uning ishi pul-kredit siyosatining puxta tadqiq etilgan, inqilobiy tahlili edi.' },
      { en: 'The committee rejected the ill-conceived, cost-ineffective proposal outright.', uz: 'Qo\'mita pala-partish ishlab chiqilgan, iqtisodiy samarasiz taklifni darhol rad etdi.' },
      { en: 'A customer satisfaction measurement framework was established.', uz: 'Mijozlar mamnuniyatini o\'lchash tizimi asoslari ishlab chiqildi.' },
      { en: 'The report highlights the unprecedentedly rapid technological disruption facing traditional banking.', uz: 'Hisobot an\'anaviy bank tizimi duch kelayotgan misli ko\'rilmagan darajada tez texnologik o\'zgarishlarni yoritadi.' }
    ],
    mistakes: [
      { wrong: 'A twenty years old agreement.', correct: 'A twenty-year-old agreement.', note: 'Ot oldida sifat vazifasida kelgan yosh yoki o\'lchov birliklari chiziqcha bilan va birlikda yoziladi (twenty-year).' },
      { wrong: 'A highly-controversial topic.', correct: 'A highly controversial topic.', note: '“-ly” bilan tugaydigan ravish va sifat orasiga chiziqcha (hyphen) qo\'yilmaydi.' },
      { wrong: 'The factors that are underlying...', correct: 'The factors underlying... (akademik jihatdan ancha mukammal).', note: 'C2 darajada nisbiy gaplar o\'rniga sifatdoshli ixcham konstruksiyalar afzal ko\'riladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi ko\'p a\'zoli sifatlovchi va qaratqichli birikmalarga mos keladi ("zamonaviy, yuqori texnologiyalarga asoslangan ishlab chiqarish majmuasi").',
    tip: '💡 Hyphen (chiziqcha) qoidasi: Agar ikki yoki undan ortiq so\'z birlashib otdan oldin bitta tushuncha bersa, chiziqcha qo\'yiladi (state-of-the-art), lekin “-ly” ravishlarga emas!',
    exercises: [
      {
        question: 'They signed a _____ non-proliferation treaty yesterday.',
        options: ['ten-years', 'ten-year', 'ten years', 'ten-year\'s'],
        answer: 1,
        explanation: 'Ot oldida compound modifier sifatida birlikda chiziqcha bilan keladi: "ten-year".'
      },
      {
        question: 'It was a _____ debated constitutional issue.',
        options: ['fiercely-debated', 'fiercely debated', 'fierce-debated', 'fierce debating'],
        answer: 1,
        explanation: '"-ly" ravishlardan keyin chiziqcha qo\'yilmaydi: "fiercely debated".'
      },
      {
        question: 'The factors _____ these diplomatic tensions remain largely unresolved.',
        options: ['underlying', 'underlay', 'that underlying', 'underlain'],
        answer: 0,
        explanation: '"The factors underlying these tensions" — present participle postmodification.'
      },
      {
        question: 'We need to streamline our _____ decision-making process.',
        options: ['bureaucratic, sluggish', 'sluggishly, bureaucratic', 'sluggish bureaucracy', 'sluggish-bureaucratic'],
        answer: 0,
        explanation: 'Tegishli sifatlar ketma-ketligi: "bureaucratic, sluggish decision-making process".'
      },
      {
        question: 'Which of the following phrases is punctuated correctly?',
        options: ['A well-known author', 'A well known author', 'A widely-read author', 'A brilliantly-written book'],
        answer: 0,
        explanation: '"Well-known" chiziqcha talab qiladi, biroq "-ly" qo\'shimchali "widely read" va "brilliantly written" chiziqcha talab qilmaydi.'
      }
    ]
  },
  {
    id: 'c2_4',
    level: 'C2',
    title: 'Discourse Markers & Cohesion (Advanced)',
    titleUz: 'Nutq bog\'lovchilari va matn yaxlitligi',
    isTense: false,
    summary: 'Fikrlar oqimini mantiqiy jihatdan mukammal bog\'lash, mavzuni nozik o\'zgartirish, concession (yon berish), mulohaza ifodalash va professional akademik matn yaxlitligini ta\'minlash vositalari.',
    usage: [
      'Yon berish va zidlash (Concession): Notwithstanding, Albeit, In spite of which, Much as I admire...',
      'Mantiqiy xulosa va natija: By the same token, By extension, In the final analysis, It follows that...',
      'Fikrni qayta shakllantirish/aniqlashtirish: That is to say, Put another way, To put it mildly...',
      'Mavzuni yo\'naltirish va doirani belgilash: As regards, With respect to, Insofar as... is concerned.',
      'Matnning C2 darajasidagi intellektual oqimini ta\'minlash.'
    ],
    formula: {
      affirmative: '[Discourse Marker], + [Mustaqil jumla] / [Noun phrase] + notwithstanding',
      negative: 'Far from being a failure, the mission provided invaluable data.',
      question: 'To what extent, then, does this policy satisfy public expectations?'
    },
    examples: [
      { en: 'The project was completed on schedule, albeit at tremendous financial cost.', uz: 'Loyiha o\'z vaqtida yakunlandi, garchi bu juda ulkan moliyaviy xarajatlar evaziga bo\'lsa ham.' },
      { en: 'Notwithstanding the harsh winter conditions, the explorers pressed forward.', uz: 'Qahraton qish sharoitlariga qaramasdan, sayyohlar olg\'a intilishda davom etishdi.' },
      { en: 'Much as I respect his scholarship, I cannot endorse his political conclusions.', uz: 'Uning olimlik salohiyatini qanchalik hurmat qilmayin, siyosiy xulosalarini ma\'qullay olmayman.' },
      { en: 'Technology has revolutionized communication; by the same token, it has diminished interpersonal intimacy.', uz: 'Texnologiya muloqotni tubdan o\'zgartirdi; xuddi shu ma\'noda, u insonlar o\'rtasidagi samimiy yaqinlikni ham kamaytirdi.' },
      { en: 'In the final analysis, genuine reform requires political courage above all else.', uz: 'Yakuniy tahlilda (tarix tarozisiga solganda), haqiqiy islohot eng avvalo siyosiy jasoratni talab etadi.' },
      { en: 'Far from discouraging investment, the new regulatory regime actually attracted venture capital.', uz: 'Yangi tartibga solish tizimi investitsiyalarni to\'xtatish u yoqda tursin, aslida venchur kapitalni jalb qildi.' },
      { en: 'He was an accomplished diplomat, in as much as he could resolve conflicts without confrontation.', uz: 'U mohir diplomat edi, shu ma\'nodaki, mojarolarni to\'qnashuvsiz bartaraf eta olardi.' },
      { en: 'The evidence, compelling though it may seem, is circumstantial at best.', uz: 'Dalillar qanchalik ishonarli tuyulmasin, eng yaxshi holatda ham bilvosita xarakterga ega.' }
    ],
    mistakes: [
      { wrong: 'Albeit he was exhausted, he continued.', correct: 'Albeit exhausted, he continued. / Although he was exhausted...', note: '"Albeit" dan keyin to\'liq ega+fe\'l kelmaydi; faqat sifat, sifatdosh yoki ravish birikmasi keladi.' },
      { wrong: 'In spite of he worked hard...', correct: 'In spite of working hard... / In spite of the fact that he worked...', note: '"In spite of" dan so\'ng to\'g\'ridan-to\'g\'ri gap kelmaydi, ot yoki gerund keladi.' },
      { wrong: 'Much as I want to agree, but I cannot.', correct: 'Much as I want to agree, I cannot.', note: '"Much as" ishlatilganda ikkinchi qismda "but" qo\'yilmaydi (ortiqcha takror).' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "shunga qaramay", "shu bilan birga", "qanchalik ... bo\'lmasin", "xususan" kabi murakkab sintaktik bog\'lovchilarga teng keladi.',
    tip: '💡 "Albeit" = "garchi" (although/even if), lekin orqasidan ega va fe\'l EMAS, faqat sifatdosh/sifat keladi: "albeit expensive", "albeit reluctantly".',
    exercises: [
      {
        question: 'He accepted the challenging assignment, _____ with considerable hesitation.',
        options: ['albeit', 'despite', 'whereas', 'nevertheless'],
        answer: 0,
        explanation: 'Sifat yoki ravish oldidan ixcham yon berish (concession) bog\'lovchisi: "albeit with considerable hesitation".'
      },
      {
        question: 'The injury _____, the captain led his team onto the pitch.',
        options: ['notwithstanding', 'although', 'despite of', 'in spite'],
        answer: 0,
        explanation: '"Notwithstanding" so\'zining otdan keyin kelish xususiyati bor: "The injury notwithstanding".'
      },
      {
        question: '_____ as I appreciate your assistance, I must solve this issue independently.',
        options: ['Much', 'As', 'Although', 'Even'],
        answer: 0,
        explanation: '"Much as I appreciate..." — oliy darajadagi concession iborasi (Garchi juda qadrlasam-da).'
      },
      {
        question: 'Hard work brings prosperity; by the same _____, negligence leads to decline.',
        options: ['token', 'reason', 'measure', 'standard'],
        answer: 0,
        explanation: '"By the same token" (xuddi shunday mantiqqa ko\'ra) turg\'un nutq bog\'lovchisi.'
      },
      {
        question: 'Strange _____ it may sound, Antarctica is the driest continent on Earth.',
        options: ['though', 'as if', 'despite', 'even'],
        answer: 0,
        explanation: '"Sifat + though/as + it may seem/sound" inversiyali yon berish konstruksiyasi.'
      }
    ]
  },
  {
    id: 'c2_5',
    level: 'C2',
    title: 'Formal & Archaic Structures (Whereby, Thereof, Albeit)',
    titleUz: 'Rasmiy va arxaik tuzilmalar (Yuridik va akademik uslub)',
    isTense: false,
    summary: 'Yuridik hujjatlar, rasmiy konvensiyalar, diplomatik protokollar va klassik akademik adabiyotlarda aniqlik va yuksak rasmiylikni ifodalash uchun qo\'llaniladigan klassik so\'z va sintaktik tuzilmalar.',
    usage: [
      'Whereby (orqali, natijasida, unga ko\'ra): A system whereby users can authenticate themselves securely.',
      'There- birikmalari (thereof, therein, thereby, thereafter, thereto): The contract and the terms thereof (uning shartlari).',
      'Here- birikmalari (hereby, hereinafter, herewith): I hereby declare this meeting adjourned.',
      'Lest (mabodo ... bo\'lmasin deb + subjunctive): We took precautions lest any error should occur.',
      'Klassik/arxaik shartli va buyruq konstruktsiyalari: Come what may; Suffice it to say.'
    ],
    formula: {
      affirmative: 'Ot + whereby / thereof / wherein / thereby + [jumla]',
      negative: 'Subject + lest + [Subject + should / base verb] (inkor ma\'nosi o\'zida mujassamlashgan)',
      question: 'What are the rights of the party and the limitations thereof?'
    },
    examples: [
      { en: 'They signed an accord whereby trade tariffs would be phased out gradually.', uz: 'Ular savdo bojlari bosqichma-bosqich bekor qilinishini ko\'zda tutuvchi bitimni imzoladilar.' },
      { en: 'The board approved the budget and all amendments thereof.', uz: 'Boshqaruv kengashi byudjetni va uning barcha tuzatishlarini tasdiqladi.' },
      { en: 'She stepped carefully across the ice lest she should slip and fall.', uz: 'Mabodo sirg\'anib yiqilmasin deb muz ustida ehtiyotkorlik bilan qadam tashladi.' },
      { en: 'The details are set out in Schedule 2, and the regulations referenced therein.', uz: 'Tafsilotlar 2-ilovada va unda ko\'rsatilgan qoidalarda bayon etilgan.' },
      { en: 'He submitted his resignation, thereby triggering an unexpected snap election.', uz: 'U iste\'foga chiqdi va shu orqali kutilmagan muddatidan oldin saylovlarni keltirib chiqardi.' },
      { en: 'I hereby certify that the information provided above is true and accurate.', uz: 'Shu tariqa (rasman) yuqorida keltirilgan ma\'lumotlar to\'g\'ri va aniq ekanligini tasdiqlayman.' },
      { en: 'Suffice it to say that the negotiations reached an amicable settlement.', uz: 'Muzokaralar do\'stona kelishuv bilan yakunlanganini aytishning o\'zi kifoya.' },
      { en: 'The treaty and all obligations appertaining thereto shall remain in force.', uz: 'Shartnoma va unga tegishli barcha majburiyatlar o\'z kuchida qoladi.' }
    ],
    mistakes: [
      { wrong: 'We took an umbrella lest it wouldn\'t rain.', correct: 'We took an umbrella lest it (should) rain.', note: '"Lest" ning o\'zi "mabodo ... bo\'lmasin deb" degan inkor ma\'noga ega, uning ortidan inkor qo\'yilmaydi.' },
      { wrong: 'A contract where both parties agree...', correct: 'A contract whereby both parties agree...', note: 'Huquqiy va rasmiy tilda "shartnomaga ko\'ra" ma\'nosida "where" emas, "whereby" ishlatiladi.' },
      { wrong: 'Suffices it to say that...', correct: 'Suffice it to say that...', note: 'Bu ibora qotib qolgan subjunktiv shakl bo\'lib, fe\'lga "-s" qo\'shilmaydi (Suffice it to say).' }
    ],
    uzbekComparison: 'O\'zbek rasmiy-yuridik tilidagi "ushbu orqali", "mazkur", "unga muvofiq", "buning natijasida" kabi kantselyariya va yuridik atamalarga to\'liq mos tushadi.',
    tip: '💡 "Thereof" = "of it / of that" (uning); "Therein" = "in it" (unda); "Thereby" = "by that means" (shu yo\'l bilan). Shu oddiy kalit bilan yuridik matnlarni oson tushunasiz.',
    exercises: [
      {
        question: 'They created a mechanism _____ citizens could petition parliament directly.',
        options: ['whereby', 'whereof', 'whereat', 'whereabout'],
        answer: 0,
        explanation: '"Whereby" = uning vositasida / qoidasiga ko\'ra (by which).'
      },
      {
        question: 'He kept his voice down _____ anyone overhear the confidential discussion.',
        options: ['lest', 'unless', 'in case of', 'despite'],
        answer: 0,
        explanation: '"Lest + subjunctive / should" — biror nomaqbul ish yuz bermasin deb.'
      },
      {
        question: 'The committee approved the charter and the preamble _____.',
        options: ['thereof', 'therewith', 'therefor', 'therefrom'],
        answer: 0,
        explanation: '"Preamble thereof" = "preamble of it" (nizomning muqaddimasi).'
      },
      {
        question: '_____ it to say, the conference was an unmitigated success.',
        options: ['Suffice', 'Suffices', 'Sufficed', 'Sufficing'],
        answer: 0,
        explanation: '"Suffice it to say" — turg\'un rasmiy ibora (aytish kifoyadirki).'
      },
      {
        question: 'The minister resigned, _____ bringing an end to the political impasse.',
        options: ['thereby', 'whereby', 'therein', 'hereunder'],
        answer: 0,
        explanation: '"Thereby" = by doing so (shu yo\'l bilan / buning oqibatida).'
      }
    ]
  },
  {
    id: 'c2_6',
    level: 'C2',
    title: 'Register Shifting (Formal ↔ Informal)',
    titleUz: 'Nutq uslubini moslashtirish (Formal ↔ Norasmiy)',
    isTense: false,
    summary: 'Vaziyat, auditoriya va ijtimoiy munosabatlarga qarab nutqni o\'ta rasmiy diplomatik tildan kundalik jargon yoki neytral uslubga ongli va mukammal ravishda o\'zgartirish qoidalari.',
    usage: [
      'Leksik va sintaktik almashtirish: "to commence" ↔ "to start" ↔ "to kick off".',
      'Passiv va impersonallik: "It has been determined" (formal) vs "We decided" (neutral) vs "We figured" (informal).',
      'Phrasal verbs o\'rniga lotincha fe\'llarni qo\'llash: "put up with" → "tolerate", "look into" → "investigate".',
      'Hedging va xushmuomalalik darajasi: "Could you possibly..." vs "Would you be so kind as to..." vs "Can you...".',
      'Matn va ohangning bir butunligini (consistency of register) saqlash.'
    ],
    formula: {
      affirmative: 'Formal: Nominalisation + Passive + Latinate verbs / Informal: Phrasal verbs + Active voice + Contractions',
      negative: 'Formal: Under no circumstances will refunds be granted. / Informal: We just can\'t give refunds.',
      question: 'Formal: Might I inquire as to...? / Informal: Can I ask...?'
    },
    examples: [
      { en: 'Formal: The company experienced an exponential surge in remuneration costs.', uz: 'Rasmiy: Kompaniya mehnatga haq to\'lash xarajatlarining keskin o\'sishiga duch keldi.' },
      { en: 'Informal: The company spent way more on salaries this year.', uz: 'Norasmiy: Kompaniya bu yil oyliklarga ancha ko\'p pul sarflab yubordi.' },
      { en: 'Formal: Should you require further clarification, do not hesitate to contact our office.', uz: 'Rasmiy: Agar qo\'shimcha ma\'lumot kerak bo\'lsa, bemalol idoramiz bilan bog\'lanishingiz mumkin.' },
      { en: 'Informal: Just shoot me an email if you have any questions!', uz: 'Norasmiy: Savollaringiz bo\'lsa menga shunchaki xat tashlab yuboring!' },
      { en: 'Formal: It is incumbent upon all staff members to adhere strictly to safety protocols.', uz: 'Rasmiy: Xavfsizlik qoidalariga qat\'iy rioya qilish barcha xodimlar uchun majburiydir.' },
      { en: 'Informal: Everyone has to stick to the safety rules—no exceptions.', uz: 'Norasmiy: Hamma xavfsizlik qoidalariga amal qilishi shart—istisnolar yo\'q.' },
      { en: 'Formal: We must endeavor to ascertain the root cause of this discrepancy.', uz: 'Rasmiy: Biz ushbu nomuvofiqlikning tub sababini aniqlashga intilishimiz lozim.' },
      { en: 'Informal: We need to figure out why the numbers don\'t add up.', uz: 'Norasmiy: Raqamlar nega to\'g\'ri kelmayotganini tushunib olishimiz kerak.' }
    ],
    mistakes: [
      { wrong: 'In a formal letter: "I wanna apply for the job you posted."', correct: '"I wish to submit my application for the advertised vacancy."', note: 'Rasmiy xatda qisqartmalar (wanna, gonna) va so\'zlashuv iboralari qo\'pol xato sanaladi.' },
      { wrong: 'Mixing registers: "The sovereign state hereby decides to kick off the project."', correct: '"The sovereign state hereby resolves to inaugurate the project."', note: 'Bitta jumlada "hereby" (o\'ta rasmiy) va "kick off" (jargon) birga kelishi uslubiy nomutanosiblik (clash of registers) hisoblanadi.' },
      { wrong: 'Over-formality with friends: "Might I borrow your writing implement?"', correct: '"Can I borrow your pen?"', note: 'Oddiy do\'stona suhbatda haddan tashqari rasmiy gapirish sun\'iy va g\'alati tuyuladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi rasmiy kantselyariya tili ("Murojaatingiz ko\'rib chiqilmoqda") va ko\'cha suhbat tili ("Gaplashamiz, xabarini beraman") o\'rtasidagi farq kabi.',
    tip: '💡 Uslubiy uyg\'unlik (Consistency): rasmiy boshladingizmi, oxirigacha lotincha fe\'llar va to\'liq so\'zlarni saqlang; bitta jargon butun akademik matn nufuzini tushiradi.',
    exercises: [
      {
        question: 'Which is the most appropriate formal equivalent of "to put off"?',
        options: ['postpone', 'delay off', 'give up', 'hang back'],
        answer: 0,
        explanation: 'Rasmiy akademik tilda "put off" o\'rniga "postpone" yoki "defer" ishlatiladi.'
      },
      {
        question: 'Identify the sentence with an inappropriate register clash:',
        options: [
          'The prime minister hereby invites all delegates to kick back and chill.',
          'The delegation cordially requests the pleasure of your company.',
          'We need to sort this mess out before the boss gets back.',
          'The research team undertook a comprehensive review of the literature.'
        ],
        answer: 0,
        explanation: '"Hereby invites" (o\'ta rasmiy) bilan "kick back and chill" (ko\'cha tili) birlashishi qat\'iyan nomutanosib.'
      },
      {
        question: 'Formal rewrite: "We found out that the figures were wrong."',
        options: [
          'It was ascertained that the figures were inaccurate.',
          'We caught the numbers being totally off.',
          'It got found out the figures sucked.',
          'We discovered the figures were no good.'
        ],
        answer: 0,
        explanation: '"It was ascertained that the figures were inaccurate" — rasmiy passiv va akademik leksika.'
      },
      {
        question: 'Choose the most natural phrase for an informal email to a close colleague:',
        options: [
          'Catch you later at lunch!',
          'I shall anticipate our forthcoming luncheon engagement.',
          'I remain, Sir, your most humble servant.',
          'With utmost deference, I seek your counsel.'
        ],
        answer: 0,
        explanation: 'Tengdosh hamkasb bilan do\'stona: "Catch you later at lunch!".'
      },
      {
        question: 'Replace the informal word in brackets with a formal C2 equivalent: "We must [look into] this allegation."',
        options: ['investigate', 'search around', 'peek into', 'check up'],
        answer: 0,
        explanation: '"Look into" ning formal alternativi "investigate".'
      }
    ]
  },
  {
    id: 'c2_7',
    level: 'C2',
    title: 'Grammar of Idiomatic & Fixed Expressions',
    titleUz: 'Idiomatik va turg\'un iboralar grammatikasi',
    isTense: false,
    summary: 'Ingliz tilidagi qotib qolgan (fossilised) grammatik konstruksiyalar, g\'ayrioddiy sintaktik qoliplar va idiomalar ichidagi maxsus grammatik xususiyatlar (binomials, verbless clauses, archaic subjunctives).',
    usage: [
      'Binomial juftliklar va qat\'iy so\'z tartibi: Neat and tidy (tidy and neat emas), Part and parcel, By and large.',
      'Fe\'lsiz ixcham iboralar (Verbless clauses): If anything, If ever, The sooner the better.',
      'Qotib qolgan subjunktiv shakllar: God forbid, Come what may, Suffice it to say, Far be it from me to...',
      'To be bound to / To be liable to / To be apt to ning nozik grammatik farqlari.',
      'Suhbatdoshga nozik munosabat bildirish: "Not that I know of", "As it were", "So to speak".'
    ],
    formula: {
      affirmative: 'Far be it from me to + [verb] / Come what may, + [clause] / Binomial pair',
      negative: 'If nothing else, at least we preserved our integrity.',
      question: 'Is it not part and parcel of the profession?'
    },
    examples: [
      { en: 'Far be it from me to criticise your decision, but I think you should reconsider.', uz: 'Sizning qaroringizni tanqid qilishdan yiroqman-u, ammo fikrimcha yana bir bor o\'ylab ko\'rishingiz kerak.' },
      { en: 'Stress and long working hours are part and parcel of being a corporate lawyer.', uz: 'Stress va uzoq ish soatlari korporativ yurist bo\'lishning ajralmas qismidir.' },
      { en: 'He was, as it were, a prisoner of his own extraordinary fame.', uz: 'U, ta\'bir joiz bo\'lsa, o\'zining g\'ayrioddiy shuhratining asiriga aylangan edi.' },
      { en: 'By and large, the economic reforms have yielded promising results.', uz: 'Umuman olganda, iqtisodiy islohotlar umidbaxsh natijalar berdi.' },
      { en: 'Come what may, we shall uphold our constitutional principles.', uz: 'Nima bo\'lishidan qat\'i nazar, biz konstitutsiyaviy tamoyillarimizni himoya qilamiz.' },
      { en: 'If anything, the second draft was even more ambiguous than the first.', uz: 'Aslida olib qaraganda, ikkinchi qoralama birinchisidan ham ko\'ra noaniqroq chiqdi.' },
      { en: 'She is apt to lose her temper when under intense pressure.', uz: 'Kuchli bosim ostida u o\'zini yo\'qotib, jahli chiqishga moyil.' },
      { en: 'God forbid that such an environmental catastrophe should happen again.', uz: 'Xudo asrasin, bunday ekologik falokat yana takrorlanmasin.' }
    ],
    mistakes: [
      { wrong: 'Parcel and part of the job.', correct: 'Part and parcel of the job.', note: 'Binomial iboralarda so\'zlar tartibini o\'zgartirib bo\'lmaydi.' },
      { wrong: 'Far it is from me to judge...', correct: 'Far be it from me to judge...', note: '"Far be it from me" qotib qolgan subjunktiv ibora bo\'lib, "be" o\'zgarmaydi.' },
      { wrong: 'Large and by the results were good.', correct: 'By and large the results were good.', note: '"By and large" turg\'un iborasining tartibi qat\'iydir.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi qotib qolgan iboralarga o\'xshaydi: "bosh-qosh bo\'lmoq" (qosh-bosh emas), "kecha-kunduz", "u yoqdan-bu yoqqa".',
    tip: '💡 Bu iboralarda grammatika qoidalari zamonaviy tildagidek moslashmaydi; ular tarixiy ingliz tilining "muzlab qolgan yodgorliklari"dir (fossilised structures).',
    exercises: [
      {
        question: 'Far _____ from me to question your authority, Mr President.',
        options: ['be it', 'it be', 'is it', 'it is'],
        answer: 0,
        explanation: '"Far be it from me to..." turg\'un arxaik subjunktiv ibora.'
      },
      {
        question: 'Long shifts and night calls are part and _____ of being a junior doctor.',
        options: ['parcel', 'package', 'portion', 'piece'],
        answer: 0,
        explanation: '"Part and parcel" (ajralmas tarkibiy qism) binomial iborasi.'
      },
      {
        question: '_____ what may, we are committed to seeing this venture through to completion.',
        options: ['Come', 'Came', 'Coming', 'May come'],
        answer: 0,
        explanation: '"Come what may" (nima bo\'lganda ham / nima bo\'lsa ham).'
      },
      {
        question: 'He was not upset by the verdict; if _____, he seemed quietly relieved.',
        options: ['anything', 'something', 'nothing', 'everything'],
        answer: 0,
        explanation: '"If anything" — aksincha / aslida esa ma\'nosidagi fixed connector.'
      },
      {
        question: 'Which of the following fixed word pairs is in the correct customary order?',
        options: ['Null and void', 'Void and null', 'Fore and first', 'Pepper and salt'],
        answer: 0,
        explanation: 'Qonuniy va til me\'yorida har doim "Null and void" (o\'z kuchini yo\'qotgan) deb ishlatiladi.'
      }
    ]
  },
  {
    id: 'c2_8',
    level: 'C2',
    title: 'Stylistic Devices (Parallelism, Fronting, Ellipsis)',
    titleUz: 'Stilistik uslublar (Parallellik, oldinga surish va ellips)',
    isTense: false,
    summary: 'Ritorika, adabiy mahorat va insho yozishda nutqqa ritm, go\'zallik, ixchamlik va intellektual salobat beruvchi uslubiy vositalar (Parallelizm, Fronting, Ellipsis).',
    usage: [
      'Grammatik parallellik (Parallel structure): Fe\'l va so\'z shakllarining bir xil vaznda takrorlanishi: "To think clearly, to speak boldly, and to act decisively".',
      'Fronting (mavzuni oldinga chiqarish): Urg\'u berilayotgan bo\'lakni gap boshiga olib chiqish: "This problem we can solve; that one will take decades".',
      'Ellipsis (so\'zlarni tushirib qoldirish): Takrorlanuvchi so\'zlarni ataylab qisqartirib nutqni lo\'nda qilish: "Some chose tea, others [chose] coffee".',
      'Chiasmus (teskari simmetriya): "Never let a fool kiss you or a kiss fool you".',
      'Tantanali bayonotlar va xalqaro minbarlardagi nutqlarda estetik ta\'sirchanlikni oshirish.'
    ],
    formula: {
      affirmative: 'Fronting: [Object / Complement] + [Subject] + [Verb] / Parallelism: Verb1 + Obj1, Verb2 + Obj2, and Verb3 + Obj3',
      negative: 'Neither did he boast, nor did he falter.',
      question: 'Brilliant as he was, could he withstand such adversity?'
    },
    examples: [
      { en: 'Parallelism: We must learn from the past, engage with the present, and build for the future.', uz: 'Parallellik: Biz o\'tmishdan saboq olishimiz, hozirgi zamon bilan hamnafas bo\'lishimiz va kelajak poydevorini qurishimiz shart.' },
      { en: 'Fronting: Exceptional talent she possessed; practical wisdom she sorely lacked.', uz: 'Oldinga surish: Unda ajoyib iqtidor bor edi; ammo amaliy aql-idrok yetishmas edi.' },
      { en: 'Ellipsis: Maria ordered the salmon, and David the duck.', uz: 'Ellips: Mariya losos buyurtma qildi, Devid esa o\'rdak go\'shtini (fe\'l tushirib qoldirilgan).' },
      { en: 'Fronting: Delicious though the meal was, we were too anxious to enjoy it.', uz: 'Oldinga surish: Taom qanchalik mazali bo\'lmasin, biz xavotir tufayli undan lazzatlana olmadik.' },
      { en: 'Parallelism: Injustice anywhere is a threat to justice everywhere.', uz: 'Parallellik: Qayerda bo\'lmasin adolatsizlik, hamma joydagi adolatga tahdiddir.' },
      { en: 'Ellipsis: When asked about the scandal, he refused to comment.', uz: 'Ellips: Mashmasha haqida so\'ralganda, u izoh berishdan bosh tortdi ("When he was asked" o\'rniga).' },
      { en: 'Fronting: Never before has humanity faced such interconnected challenges.', uz: 'Inversiyali oldinga surish: Insoniyat ilgari hech qachon bunday o\'zaro bog\'liq muammolarga duch kelmagan.' },
      { en: 'Parallelism: He came, he saw, he conquered.', uz: 'Parallellik: U keldi, ko\'rdi va g\'alaba qozondi.' }
    ],
    mistakes: [
      { wrong: 'Faulty parallelism: He likes swimming, to jog, and reading books.', correct: 'He likes swimming, jogging, and reading books.', note: 'Parallellik buzilmasligi kerak: hamma a\'zo bir xil grammatik shaklda (gerund) bo\'lishi shart.' },
      { wrong: 'Dangling ellipsis: Having eaten dinner, the dishes were washed.', correct: 'Having eaten dinner, we washed the dishes.', note: 'Ellipsda tushirilgan ega asosiy gapdagi ega bilan bir xil bo\'lishi shart (idishlar ovqat yemaydi).' },
      { wrong: 'Fronting with wrong pronoun inversion: That book gave I to John.', correct: 'That book I gave to John.', note: 'Oddiy frontingda yordamchi fe\'l inversiyasi bo\'lmaydi (faqat salbiy so\'z bo\'lsa bo\'ladi).' }
    ],
    uzbekComparison: 'O\'zbek mumtoz adabiyotidagi saj\' san\'atiga va ritorik qoliplarga o\'xshaydi ("Ilm o\'rgan, hunar egalla, elingga xizmat qil").',
    tip: '💡 Parallellik testlarda eng ko\'p uchraydi: Agar vergul bilan sanab o\'tayotgan bo\'lsangiz, hammasi -ing, yoki hammasi to-infinitive, yoki hammasi ot bo\'lsin!',
    exercises: [
      {
        question: 'Identify the sentence with flawless parallel structure:',
        options: [
          'The candidate promised to reform taxation, reduce expenditure, and stimulate growth.',
          'The candidate promised reforming taxation, to reduce expenditure, and stimulation of growth.',
          'The candidate promised to reform taxation, reducing expenditure, and stimulates growth.',
          'The candidate promised taxation reform, to reduce expenditure, and stimulating growth.'
        ],
        answer: 0,
        explanation: 'Barcha fe\'llar bir xil infinitive shaklida: "to reform, reduce, and stimulate".'
      },
      {
        question: 'Fronting example: "_____ I might, I could not decipher the encrypted manuscript."',
        options: ['Try as', 'As try', 'Trying as', 'Though try'],
        answer: 0,
        explanation: '"Try as I might" (qanchalik urinmayin) ritorik fronting qolipi.'
      },
      {
        question: 'Ellipsis: "Alice was fluent in German, and her brother _____ in Spanish."',
        options: ['likewise', 'fluent', 'was', 'so'],
        answer: 0,
        explanation: 'Yoki to\'liq tushirib qoldirish: "and her brother [was] in Spanish" / "likewise in Spanish".'
      },
      {
        question: 'Correct the dangling participle ellipsis: "Walking down the avenue, the cathedral came into view."',
        options: [
          'As we were walking down the avenue, the cathedral came into view.',
          'Walking down the avenue, view came of the cathedral.',
          'The cathedral, walking down the avenue, came into view.',
          'Being walked down the avenue, the cathedral was seen.'
        ],
        answer: 0,
        explanation: 'Ibora egani to\'g\'ri ko\'rsatishi kerak, chunki cherkov yo\'ldan yurib bormaydi.'
      },
      {
        question: 'Which device places the complement at the beginning: "Bitter was the taste of betrayal"?',
        options: ['Fronting with inversion', 'Faulty ellipsis', 'Passive transformation', 'Subjunctive mood'],
        answer: 0,
        explanation: 'Sifat ("Bitter") oldinga surilib, inversiya yasalgan: Fronting with inversion.'
      }
    ]
  },
  {
    id: 'c2_9',
    level: 'C2',
    title: 'Common Errors of Advanced Learners',
    titleUz: 'Ilg\'or o\'rganuvchilarning eng ko\'p uchraydigan nozik xatolari',
    isTense: false,
    summary: 'IELTS 8.5-9.0 yoki C1-C2 darajadagi o\'quvchilar va hatto tarjimonlar ham yo\'l qo\'yadigan xiyonatkor nozik xatolar: soxta do\'stlar (false friends), noto\'g\'ri kollokatsiyalar, prepozitsiyalar va ortiqcha murakkablashtirish.',
    usage: [
      'Noto\'g\'ri kollokatsiyalar (Unnatural collocations): "Do a decision" emas "Make a decision", "Strong tea" (heavy tea emas).',
      'Predloglarning nozik farqlari: "Independent of" vs "Independent from", "Different from" (preferable) vs "Different than".',
      'Ortiqcha akademik murakkablashtirish (Over-complication): Sodda va ravon fikr o\'rniga noo\'rin lotincha so\'zlarni qalash.',
      'Sanoqsiz otlarning ko\'plikda ishlatilishi: Researches ❌ → Research / Studies ✅, Informations ❌ → Information ✅.',
      'Qat\'iy shart va maqsad ergash gaplarida modal fe\'llarning noo\'rin takrorlanishi.'
    ],
    formula: {
      affirmative: 'Natural Collocation + Precise Preposition + Unambiguous Syntax',
      negative: 'Avoid: Redundancy, Dangling Modifiers, Unidiomatic Prepositions',
      question: 'Is this phrasing idiomatic and naturally attested by native corpora?'
    },
    examples: [
      { en: 'Wrong: We conducted numerous researches on this topic.', uz: 'Xato: Biz bu mavzuda ko\'plab research-lar olib bordik (Research sanoqsiz!).' },
      { en: 'Correct: We conducted extensive research / numerous studies on this topic.', uz: 'To\'g\'ri: Biz bu mavzuda keng ko\'lamli tadqiqotlar olib bordik.' },
      { en: 'Natural: He made a significant contribution to the scientific debate.', uz: 'Tabiiy: U ilmiy munozaraga sezilarli hissa qo\'shdi ("did a contribution" emas).' },
      { en: 'Wrong: In despite of his efforts, he failed.', correctEn: 'Despite his efforts / In spite of his efforts', uz: 'Xato: "In despite of" mavjud emas! Yo "Despite", yoki "In spite of".' },
      { en: 'Wrong: The reason is because...', correctEn: 'The reason is that...', uz: '"The reason is because" ortiqcha pleonazmdir; "The reason is that..." to\'g\'ri.' },
      { en: 'Correct: She is independent of her parents\' financial support.', uz: 'U ota-onasining moliyaviy yordamidan mustaqil ("independent of" odatiy me\'yor).' },
      { en: 'Natural: It is of paramount importance that we act swiftly.', uz: 'Tezkorlik bilan harakat qilishimiz o\'ta favqulodda ahamiyatga ega.' },
      { en: 'Correct: We must take into consideration all relevant factors.', uz: 'Biz barcha tegishli omillarni inobatga olishimiz shart.' }
    ],
    mistakes: [
      { wrong: 'According to me, this theory is flawed.', correct: 'In my opinion / In my view, this theory is flawed.', note: '"According to" hech qachon birinchi shaxs ("me", "us") bilan ishlatilmaydi; faqat uchinchi shaxs yoki manbalar bilan.' },
      { wrong: 'He insisted to pay the bill.', correct: 'He insisted on paying the bill.', note: '"Insist" fe\'li o\'zidan keyin "on + V-ing" oladi, infinitive emas.' },
      { wrong: 'I look forward to hear from you.', correct: 'I look forward to hearing from you.', note: '"Look forward to" dagi "to" predlogdir, shuning uchun ortidan gerund (-ing) keladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidan so\'zma-so\'z tarjima qilishdan kelib chiqadigan xatolar: masalan, "mening fikrimcha"ni "according to me" deb tarjima qilish.',
    tip: '💡 "According to" boshqa manbaga tayanadi (According to Einstein). O\'z fikringiz uchun HECH QACHON "According to me" demang! Har doim: "In my view" yoki "To my mind".',
    exercises: [
      {
        question: 'Select the idiomatic and grammatically impeccable sentence:',
        options: [
          'In my opinion, the methodology requires refinement.',
          'According to me, the methodology requires refinement.',
          'According to my opinion, the methodology requires refinement.',
          'As per me, the methodology requires refinement.'
        ],
        answer: 0,
        explanation: 'O\'z shaxsiy fikrini aytishda faqat "In my opinion" yoki "In my view" qo\'llaniladi.'
      },
      {
        question: 'The committee carried out _____ into the alleged irregularities.',
        options: ['extensive research', 'extensive researches', 'many researches', 'an extensive research'],
        answer: 0,
        explanation: '"Research" ingliz tilida sanoqsiz ot: "extensive research" (hech qachon "researches" emas).'
      },
      {
        question: 'She persisted _____ asking questions despite the host\'s reluctance.',
        options: ['in', 'on', 'with', 'at'],
        answer: 0,
        explanation: '"Persist in doing something" — to\'g\'ri predlog "in". ("Insist on" bilan adashtirmang).'
      },
      {
        question: 'The reason the conference was postponed was _____ several speakers fell ill.',
        options: ['that', 'because', 'due to', 'owing to'],
        answer: 0,
        explanation: '"The reason ... was that" to\'g\'ri sintaktik qolipdir ("The reason was because" uslubiy xato).'
      },
      {
        question: 'The students are looking forward to _____ their master\'s degrees.',
        options: ['receiving', 'receive', 'received', 'be receiving'],
        answer: 0,
        explanation: '"Look forward to" + gerund (-ing): "to receiving".'
      }
    ]
  }
];
