// A1 darajasi - 16 ta asosiy grammatik mavzu
export const a1Topics = [
  {
    id: 'a1_1',
    level: 'A1',
    title: 'To be (am, is, are)',
    titleUz: 'To be fe\'li: bo\'lmoq, hisoblanmoq',
    isTense: true,
    summary: '"To be" ingliz tilining eng asosiy fe\'li bo\'lib, shaxs yoki narsaning kimligi, qayerdaligi, qandayligi va holatini ifodalaydi. O\'zbek tiliga ko\'pincha "-dir", "bo\'lmoq" yoki tarjimasiz qabul qilinadi.',
    usage: [
      'Shaxs, kasb yoki ismni aytishda: I am Sardor, She is a doctor.',
      'Yosh, his-tuyg\'u va holatni bildirishda: He is 20 years old, We are happy.',
      'Millat va kelib chiqishni ifodalashda: They are from Uzbekistan.',
      'Joylashuv va makonni ko\'rsatishda: The book is on the table, I am at home.'
    ],
    formula: {
      affirmative: 'Subject + am / is / are + Object / Adjective (I am, He/She/It is, You/We/They are)',
      negative: 'Subject + am / is / are + not + Object / Adjective (I am not, isn\'t, aren\'t)',
      question: 'Am / Is / Are + Subject + Object / Adjective? (Are you a student?)'
    },
    examples: [
      { en: 'I am a university student.', uz: 'Men universitet talabasiman.' },
      { en: 'She is very kind and helpful.', uz: 'U juda mehribon va yordamga shay.' },
      { en: 'They are at school right now.', uz: 'Ular ayni damda maktabda.' },
      { en: 'My brother is not at home.', uz: 'Mening akam uyda emas.' },
      { en: 'We aren\'t tired after the walk.', uz: 'Sayrdan keyin biz charchamadik.' },
      { en: 'Are you ready for the lesson?', uz: 'Darsga tayyormisiz?' },
      { en: 'Is it cold outside today?', uz: 'Bugun tashqarida sovuqmi?' },
      { en: 'Where are your keys?', uz: 'Kalitlaring qayerda?' }
    ],
    mistakes: [
      { wrong: 'I student.', correct: 'I am a student.', note: 'O\'zbek tilida "Men talabaman" deyiladi, ammo ingliz tilida "am" fe\'li shart.' },
      { wrong: 'She are doctor.', correct: 'She is a doctor.', note: 'He/She/It olmoshlari faqat "is" oladi.' },
      { wrong: 'You is ready?', correct: 'Are you ready?', note: 'You olmoshi har doim "are" oladi.' }
    ],
    uzbekComparison: 'O\'zbek tilida ot-kesim bog\'lamasi ("-man, -san, -dir") so\'z oxiriga qo\'shiladi, ingliz tilida esa alohida fe\'l (am, is, are) shaklida egadan keyin keladi.',
    tip: '💡 Eslab qoling: "I am" doim birga; bitta kishi/narsa uchun "is", ko\'pchilik va "you" uchun "are" ishlatiladi.',
    exercises: [
      {
        question: 'She _____ my English teacher.',
        options: ['am', 'is', 'are', 'be'],
        answer: 1,
        explanation: '"She" uchinchi shaxs birlik bo\'lgani uchun "is" to\'g\'ri keladi.'
      },
      {
        question: '_____ you from Tashkent?',
        options: ['Is', 'Am', 'Are', 'Do'],
        answer: 2,
        explanation: '"You" olmoshi bilan so\'roqda "Are" oldinga chiqadi.'
      },
      {
        question: 'They _____ at the library today.',
        options: ['isn\'t', 'aren\'t', 'not', 'am not'],
        answer: 1,
        explanation: '"They" ko\'plik olmoshi bo\'lib, inkor shakli "aren\'t" (are not).'
      },
      {
        question: 'I _____ twenty years old.',
        options: ['have', 'am', 'is', 'has'],
        answer: 1,
        explanation: 'Ingliz tilida yosh aytganda "have" emas, "to be" (I am) ishlatiladi.'
      },
      {
        question: '_____ it hot outside?',
        options: ['Are', 'Is', 'Does', 'Am'],
        answer: 1,
        explanation: '"It" bilan savol "Is" orqali yasaladi.'
      }
    ]
  },
  {
    id: 'a1_2',
    level: 'A1',
    title: 'Articles (a / an / the)',
    titleUz: 'Artikllar: noaniq (a/an) va aniq (the)',
    isTense: false,
    summary: 'Artikllar otlarning oldidan kelib, ularning tinglovchiga tanish (aniq) yoki notanish (umumiy/bitta) ekanligini bildiradi.',
    usage: [
      '"A" — undosh tovush bilan boshlanadigan birlikdagi sanaladigan otlar oldidan (a book, a car).',
      '"An" — unli tovush bilan boshlanadigan birlikdagi sanaladigan otlar oldidan (an apple, an hour).',
      '"The" — ikkala tomonga ham ma\'lum va aniq bo\'lgan narsalar, yoki dunyoda yagona narsalar oldidan (the sun, the teacher).',
      'Birinchi marta tilga olinganda a/an, ikkinchi marta takrorlanganda the ishlatiladi.'
    ],
    formula: {
      affirmative: 'a + undosh tovush (a pen) | an + unli tovush (an umbrella) | the + aniq ot (the moon)',
      negative: 'Ko\'plikdagi va sanalmaydigan otlarga umumiy ma\'noda a/an qo\'yilmaydi (Milk is good).',
      question: 'Do you have a pen? Did you close the door?'
    },
    examples: [
      { en: 'I have a cat and a dog.', uz: 'Menda bitta mushuk va bitta it bor.' },
      { en: 'She is eating an orange.', uz: 'U apelsin yemoqda.' },
      { en: 'The sun rises in the east.', uz: 'Quyosh sharqdan chiqadi (quyosh yagona).' },
      { en: 'I saw a man. The man was running.', uz: 'Men bir erkakni ko\'rdim. O\'sha erkak yugurayotgan edi.' },
      { en: 'He is an honest boy.', uz: 'U halol bola ("h" o\'qilmaydi, "an" qo\'yiladi).' },
      { en: 'Please open the window.', uz: 'Iltimos, derazani oching (shu xonadagi aniq deraza).' },
      { en: 'This is a university in our city.', uz: 'Bu shahrimizdagi universitet ("u" [yu] undosh tovush, "a" olinadi).' },
      { en: 'Can you pass the salt, please?', uz: 'Tuzni uzatib yubora olasizmi?' }
    ],
    mistakes: [
      { wrong: 'I have car.', correct: 'I have a car.', note: 'Birlikdagi sanaladigan otlar artiklsiz qolmaydi.' },
      { wrong: 'She bought an book.', correct: 'She bought a book.', note: '"Book" undosh [b] bilan boshlanadi, "a" qo\'yiladi.' },
      { wrong: 'He is a honest.', correct: 'He is honest / He is an honest man.', note: 'Sifatning o\'ziga artikl qo\'yilmaydi, ot bo\'lsa "an" unli tovushga qarab qo\'yiladi.' }
    ],
    uzbekComparison: 'O\'zbek tilida artikl yo\'q; noaniqlik uchun "bir, bitta" so\'zlari, aniqlik uchun esa "o\'sha, bu" ko\'rsatish olmoshlari yoki tushum kelishigi qo\'llaniladi.',
    tip: '💡 Harfga emas, tovushga qarang! "An hour" ([our] unli), lekin "A university" ([yu] undosh).',
    exercises: [
      {
        question: 'She wants to buy _____ new laptop.',
        options: ['a', 'an', 'the', '—'],
        answer: 0,
        explanation: '"New" undosh [n] bilan boshlangani uchun "a" qo\'yiladi.'
      },
      {
        question: 'We waited for _____ hour at the bus station.',
        options: ['a', 'an', 'the', '—'],
        answer: 1,
        explanation: '"Hour" so\'zida "h" o\'qilmaydi va unli tovush bilan boshlanadi ("an hour").'
      },
      {
        question: 'Look at _____ moon! It is so bright tonight.',
        options: ['a', 'an', 'the', '—'],
        answer: 2,
        explanation: 'Oy dunyoda yagona tabiat jonzoti/ob\'ekti bo\'lgani uchun "the" olinadi.'
      },
      {
        question: 'He is _____ engineer at a big company.',
        options: ['a', 'an', 'the', '—'],
        answer: 1,
        explanation: 'Kasb nomi unli tovush bilan boshlangan: "an engineer".'
      },
      {
        question: 'I love drinking _____ coffee in the morning.',
        options: ['a', 'an', 'the', '—'],
        answer: 3,
        explanation: 'Umumiy ma\'nodagi sanalmaydigan suyuqliklar oldidan artikl qo\'yilmaydi.'
      }
    ]
  },
  {
    id: 'a1_3',
    level: 'A1',
    title: 'Plural nouns',
    titleUz: 'Otlarning ko\'plik shakli va istisnolar',
    isTense: false,
    summary: 'Ingliz tilida ko\'pchilik otlarga "-s" yoki "-es" qo\'shish orqali ko\'plik yasaladi, ammo butunlay o\'zgaradigan noto\'g\'ri (irregular) otlar ham mavjud.',
    usage: [
      'Oddiy otlarga shunchaki "-s" qo\'shiladi: book → books, car → cars.',
      '-s, -sh, -ch, -x, -z bilan tugagan otlarga "-es" qo\'shiladi: bus → buses, watch → watches.',
      'Undosh + "y" bilan tugasa, "y" o\'rniga "-ies" keladi: city → cities, baby → babies.',
      'Ba\'zi "-f / -fe" bilan tugagan otlarda "-ves" bo\'ladi: leaf → leaves, wife → wives.',
      'Istisno (irregular) otlar o\'zakdan o\'zgaradi: man → men, child → children.'
    ],
    formula: {
      affirmative: 'Ot + -s / -es / -ies / -ves (books, boxes, countries, knives)',
      negative: 'Istisnolar: child → children, person → people, tooth → teeth, foot → feet, mouse → mice',
      question: 'O\'zgarmaydiganlar: sheep → sheep, fish → fish, deer → deer'
    },
    examples: [
      { en: 'I have three pens in my pencil case.', uz: 'Qalamdonimda uchta ruchka bor.' },
      { en: 'There are many big cities in the world.', uz: 'Dunyoda ko\'plab yirik shaharlar mavjud.' },
      { en: 'The children are playing outside.', uz: 'Bolalar tashqarida o\'ynashmoqda.' },
      { en: 'She bought two watches yesterday.', uz: 'U kecha ikkita soat sotib oldi.' },
      { en: 'The autumn leaves are falling.', uz: 'Kuzgi barglar to\'kilmoqda.' },
      { en: 'How many people are there?', uz: 'U yerda qancha odam bor?' },
      { en: 'Brush your teeth twice a day.', uz: 'Tishlaringizni kuniga ikki marta tozalang.' },
      { en: 'A farmer has fifty sheep.', uz: 'Fermerning ellikta qo\'yi bor (sheep o\'zgarmaydi).' }
    ],
    mistakes: [
      { wrong: 'two childs', correct: 'two children', note: '"Child" so\'zining ko\'pligi "-s" bilan emas, "children" bo\'ladi.' },
      { wrong: 'many persons', correct: 'many people', note: 'Oddiy nutqda "person" ko\'pligi "people".' },
      { wrong: 'citys', correct: 'cities', note: 'Undosh + y holatida "y" tushib "-ies" qo\'shiladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "-lar" qo\'shimchasiga to\'g\'ri keladi. Ammo o\'zbek tilida sonlardan keyin ko\'plik qo\'shilmaydi (uchta kitob), ingliz tilida esa shart (three books).',
    tip: '💡 O\'zbekchada "3 ta talaba" deymiz, inglizchada esa "3 students" (albatta -s qo\'yiladi).',
    exercises: [
      {
        question: 'There are five _____ in the playground.',
        options: ['childs', 'children', 'child', 'childrens'],
        answer: 1,
        explanation: '"Child" so\'zining to\'g\'ri ko\'pligi "children".'
      },
      {
        question: 'I need two sharp _____ to cut the bread.',
        options: ['knifes', 'knives', 'knife', 'knifeses'],
        answer: 1,
        explanation: '"Knife" so\'zida "-fe" o\'rniga "-ves" keladi: "knives".'
      },
      {
        question: 'How many _____ live in your town?',
        options: ['peoples', 'people', 'persons', 'mans'],
        answer: 1,
        explanation: '"Person" ning to\'g\'ri ko\'plik shakli "people".'
      },
      {
        question: 'She put three _____ on the table.',
        options: ['glass', 'glasses', 'glasss', 'glassies'],
        answer: 1,
        explanation: '"-ss" bilan tugagan so\'zlarga "-es" qo\'shiladi: "glasses".'
      },
      {
        question: 'The dentist examined my _____.',
        options: ['tooths', 'teeth', 'toothes', 'teethes'],
        answer: 1,
        explanation: '"Tooth" so\'zining ko\'pligi "teeth" bo\'ladi.'
      }
    ]
  },
  {
    id: 'a1_4',
    level: 'A1',
    title: 'Subject pronouns & Possessive adjectives',
    titleUz: 'Kishilik olmoshlari va egalik sifatlari',
    isTense: false,
    summary: 'Kishilik olmoshlari (I, you, he...) gapda ega bo\'lib keladi, egalik sifatlari (my, your, his...) esa biror narsaning kimga tegishli ekanligini ko\'rsatish uchun ot oldidan keladi.',
    usage: [
      'Subject pronouns (Ega): I, you, he, she, it, we, they.',
      'Possessive adjectives (Ot oldida): my, your, his, her, its, our, their.',
      'Egalik sifati hech qachon yolg\'iz kelmaydi, doim o\'zidan keyin ot talab qiladi (my phone, her bag).'
    ],
    formula: {
      affirmative: 'I → my | You → your | He → his | She → her | It → its | We → our | They → their',
      negative: 'Diqqat: "its" (egalik) va "it\'s" (it is) bir xil emas!',
      question: 'Is this your car? Where is her brother?'
    },
    examples: [
      { en: 'I love my family.', uz: 'Men oilamni yaxshi ko\'raman.' },
      { en: 'She is doing her homework.', uz: 'U o\'z uy vazifasini bajarmoqda.' },
      { en: 'He forgot his coat at home.', uz: 'U paltosini uyida unutib qoldirdi.' },
      { en: 'We live with our parents.', uz: 'Biz ota-onamiz bilan yashaymiz.' },
      { en: 'They sold their old house.', uz: 'Ular eski uylarini sotishdi.' },
      { en: 'The dog wagged its tail.', uz: 'It dumini likillatdi.' },
      { en: 'What is your telephone number?', uz: 'Sizning telefon raqamingiz qanday?' },
      { en: 'He is an actor, and his movies are famous.', uz: 'U aktyor va uning filmlari mashhur.' }
    ],
    mistakes: [
      { wrong: 'The cat cleaned it\'s fur.', correct: 'The cat cleaned its fur.', note: '"It\'s" = it is. Egalik uchun apostrofsiz "its" yoziladi.' },
      { wrong: 'She likes she car.', correct: 'She likes her car.', note: 'Ot oldida "she" emas, "her" ishlatiladi.' },
      { wrong: 'This is me bag.', correct: 'This is my bag.', note: 'Egalik sifati "my" bo\'ladi.' }
    ],
    uzbekComparison: 'O\'zbek tilida "mening, sening, uning" so\'zlari bilan birga ot oxiriga ham egalik qo\'shimchasi qo\'shiladi (mening kitob-im), ingliz tilida esa faqat olmoshning o\'zi kifoya (my book).',
    tip: '💡 O\'g\'il bolaga: his, qiz bolaga: her, jonsiz yoki hayvonga: its.',
    exercises: [
      {
        question: 'John is looking for _____ car keys.',
        options: ['her', 'his', 'its', 'their'],
        answer: 1,
        explanation: 'John erkak kishi, uning egaligi "his".'
      },
      {
        question: 'We really enjoy _____ English classes.',
        options: ['our', 'us', 'we', 'ours'],
        answer: 0,
        explanation: '"We" olmoshining egalik sifati "our" (bizning).'
      },
      {
        question: 'Anna called _____ mother yesterday.',
        options: ['his', 'her', 'she', 'hers'],
        answer: 1,
        explanation: 'Anna ayol kishi bo\'lgani uchun "her" to\'g\'ri.'
      },
      {
        question: 'The bird hurt _____ wing.',
        options: ['it\'s', 'its', 'it', 'their'],
        answer: 1,
        explanation: 'Hayvonning qanoti egalik ma\'nosida "its" (apostrofsiz) bo\'ladi.'
      },
      {
        question: 'Are these _____ shoes under the chair?',
        options: ['you', 'your', 'yours', 'you\'re'],
        answer: 1,
        explanation: 'Ot (shoes) oldidan egalik sifati "your" keladi.'
      }
    ]
  },
  {
    id: 'a1_5',
    level: 'A1',
    title: 'Possessive \'s',
    titleUz: 'Apostrof \'s (Egalik qo\'shimchasi)',
    isTense: false,
    summary: 'Shaxs yoki jonzotga tegishli narsani ko\'rsatish uchun ot oxiriga apostrof va "s" (\'s) qo\'shiladi. Bu o\'zbek tilidagi qaratqich kelishigi (-ning) ga teng.',
    usage: [
      'Birlikdagi shaxslarga \'s qo\'shiladi: Ali\'s car (Alining mashinasi).',
      '-s bilan tugagan muntazam ko\'plikdagi otlarga faqat apostrof (\') qo\'yiladi: the boys\' room (bolalarning xonasi).',
      'Muntazam bo\'lmagan ko\'plik otlarga \'s qo\'yiladi: children\'s toys (bolalarning o\'yinchoqlari).',
      'Jonsiz narsalar uchun odatda "of" ishlatiladi: the leg of the table (stolning oyog\'i).'
    ],
    formula: {
      affirmative: 'Egasi + \'s + unga tegishli narsa (Tom\'s book, my brother\'s friend)',
      negative: 'Ko\'plik -s bilan: Teachers\' room | Ko\'plik -s siz: Men\'s clothes',
      question: 'Whose book is this? — It is Mary\'s.'
    },
    examples: [
      { en: 'This is Sardor\'s smartphone.', uz: 'Bu Sardorning smartfoni.' },
      { en: 'Where is the doctor\'s office?', uz: 'Shifokorning xonasi qayerda?' },
      { en: 'My parents\' house is very cozy.', uz: 'Ota-onamning uyi juda shinam.' },
      { en: 'The children\'s books are on the shelf.', uz: 'Bolalarning kitoblari javonda.' },
      { en: 'Whose bag is this? It\'s Sarah\'s.', uz: 'Bu kimning sumkasi? Sarahning sumkasi.' },
      { en: 'We stayed at my uncle\'s house.', uz: 'Biz amakimning uyida qoldik.' },
      { en: 'The cat\'s eyes are green.', uz: 'Mushukning ko\'zlari yashil.' },
      { en: 'Today\'s news is very exciting.', uz: 'Bugungi yangiliklar juda hayajonli.' }
    ],
    mistakes: [
      { wrong: 'The car of John.', correct: 'John\'s car.', note: 'Insonlarga nisbatan "of" emas, apostrof \'s ishlatiladi.' },
      { wrong: 'My parent\'s house (ikki kishi)', correct: 'My parents\' house.', note: 'Ota-ona ikkita bo\'lsa, "parents" so\'ngiga faqat apostrof qo\'yiladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "-ning" qo\'shimchasining to\'g\'ridan-to\'g\'ri analogi.',
    tip: '💡 "Whose...?" (Kimning...?) degan savolga javob berganda doim \'s esga tushsin: "It is Ali\'s".',
    exercises: [
      {
        question: 'This is my _____ notebook.',
        options: ['sister', 'sister\'s', 'sisters', 'sister\''],
        answer: 1,
        explanation: 'Singlimning daftari = sister\'s notebook.'
      },
      {
        question: 'The _____ coats are hanging in the hall.',
        options: ['boys\'', 'boy\'s', 'boys', 'boies'],
        answer: 0,
        explanation: 'Bolalarning (ko\'plik) paltolari bo\'lgani uchun s dan keyin apostrof: "boys\'".'
      },
      {
        question: 'Where can I find _____ shoes?',
        options: ['mens\'', 'men\'s', 'mens', 'man\'s'],
        answer: 1,
        explanation: '"Men" so\'zining o\'zi ko\'plik, unga \'s qo\'shiladi: "men\'s".'
      },
      {
        question: '_____ jacket is this on the sofa?',
        options: ['Who', 'Who\'s', 'Whose', 'Which'],
        answer: 2,
        explanation: 'Egalik so\'rog\'i "Whose" (kimning) deb so\'raladi.'
      },
      {
        question: 'That is _____ new bicycle.',
        options: ['David\'s', 'Davids\'', 'David', 'Davids'],
        answer: 0,
        explanation: 'David bitta shaxs bo\'lgani uchun \'s qo\'shiladi.'
      }
    ]
  },
  {
    id: 'a1_6',
    level: 'A1',
    title: 'This / That / These / Those',
    titleUz: 'Ko\'rsatish olmoshlari: Bu, ana u, bular, ana ular',
    isTense: false,
    summary: 'Masofa (yaqin/uzoq) va son (birlik/ko\'plik)ga qarab narsalarni ko\'rsatish uchun ishlatiladi.',
    usage: [
      'This (bu) — yaqindagi bitta narsa.',
      'That (ana u / o\'sha) — uzoqdagi bitta narsa.',
      'These (bular) — yaqindagi bir nechta narsalar.',
      'Those (ana ular / o\'shalar) — uzoqdagi bir nechta narsalar.'
    ],
    formula: {
      affirmative: 'Yaqin: This is a book / These are books | Uzoq: That is a car / Those are cars',
      negative: 'This isn\'t my bag / Those aren\'t our seats',
      question: 'Is this your pen? Are those your shoes?'
    },
    examples: [
      { en: 'This is my favorite coffee mug.', uz: 'Bu mening sevimli kofem finjoni (qo\'limda).' },
      { en: 'That building over there is our library.', uz: 'Anavi yerdagi bino bizning kutubxona (uzoqda).' },
      { en: 'These flowers smell wonderful.', uz: 'Bu gullarning hidi ajoyib (yaqinda).' },
      { en: 'Those birds in the sky are flying south.', uz: 'Osmondagi ana u qushlar janubga uchmoqda.' },
      { en: 'Do you like this shirt?', uz: 'Bu ko\'ylak sizga yoqadimi?' },
      { en: 'Who is that person standing by the door?', uz: 'Eshik yonida turgan ana u odam kim?' },
      { en: 'These are my best friends.', uz: 'Bular mening eng yaqin do\'stlarim.' },
      { en: 'Can you pass me that salt shaker?', uz: 'Ana u tuzdonni uzatib yubora olasizmi?' }
    ],
    mistakes: [
      { wrong: 'These is my brother.', correct: 'This is my brother.', note: 'Birlikdagi shaxs uchun "These" emas, "This" bo\'ladi.' },
      { wrong: 'Those book are cheap.', correct: 'Those books are cheap.', note: '"Those" dan keyin ot ham ko\'plikda bo\'lishi shart.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "bu" (this), "u/o\'sha" (that), "bular" (these), "ular/anavi narsalar" (those) so\'zlariga to\'liq mos keladi.',
    tip: '💡 T-H-I-S qisqa so\'z = 1 ta yaqin narsa. T-H-E-S-E uzunroq = bir nechta yaqin narsalar.',
    exercises: [
      {
        question: '_____ is my new mobile phone in my hand.',
        options: ['This', 'That', 'These', 'Those'],
        answer: 0,
        explanation: 'Qo\'lda turgan bitta narsaga "This" deyiladi.'
      },
      {
        question: 'Look at _____ stars high in the sky!',
        options: ['this', 'that', 'these', 'those'],
        answer: 3,
        explanation: 'Uzoqdagi ko\'plikdagi narsalar (yulduzlar) uchun "those".'
      },
      {
        question: '_____ shoes here are too small for me.',
        options: ['This', 'That', 'These', 'Those'],
        answer: 2,
        explanation: 'Yaqindagi ko\'plik narsa ("here" - bu yerda) uchun "these".'
      },
      {
        question: 'Who is _____ girl across the street?',
        options: ['this', 'that', 'these', 'those'],
        answer: 1,
        explanation: 'Ko\'chaning narigi tomonidagi bitta qiz uchun "that" to\'g\'ri.'
      },
      {
        question: '_____ are delicious apples!',
        options: ['This', 'That', 'These', 'It'],
        answer: 2,
        explanation: 'Ko\'plikdagi olmalar ("are delicious apples") uchun "These" to\'g\'ri keladi.'
      }
    ]
  },
  {
    id: 'a1_7',
    level: 'A1',
    title: 'There is / There are',
    titleUz: 'There is va There are: Mavjudlik konstruksiyasi',
    isTense: false,
    summary: 'Biror joyda biror narsa yoki shaxsning borligini yoki mavjudligini bildirish uchun ishlatiladi.',
    usage: [
      '"There is" — birlikdagi otlar va sanalmaydigan otlar oldidan (There is a park, There is milk).',
      '"There are" — ko\'plikdagi otlar oldidan (There are three parks).',
      'Bir nechta narsani sanaganda, birinchi turgan otga qarab "is" yoki "are" tanlanadi (There is a pen and two books).'
    ],
    formula: {
      affirmative: 'There is + birlik/sanalmaydigan ot | There are + ko\'plikdagi ot',
      negative: 'There isn\'t (is not) / There aren\'t (are not) / There is no...',
      question: 'Is there...? / Are there...? (Yes, there is. / No, there aren\'t.)'
    },
    examples: [
      { en: 'There is a big supermarket near my house.', uz: 'Uyim yaqinida katta supermarket bor.' },
      { en: 'There are twenty students in our classroom.', uz: 'Sinfimizda yigirma nafar o\'quvchi bor.' },
      { en: 'There is some water in the bottle.', uz: 'Idishda biroz suv bor.' },
      { en: 'There isn\'t any bread on the table.', uz: 'Stolda hech qanday non yo\'q.' },
      { en: 'There aren\'t many cars on the road today.', uz: 'Bugun yo\'lda mashinalar unchalik ko\'p emas.' },
      { en: 'Is there a pharmacy nearby?', uz: 'Yaqin atrofda dorixona bormi?' },
      { en: 'Are there any questions about the topic?', uz: 'Mavzu bo\'yicha savollar bormi?' },
      { en: 'There is no time to lose.', uz: 'Yo\'qotadigan vaqt yo\'q.' }
    ],
    mistakes: [
      { wrong: 'Have a book on the table.', correct: 'There is a book on the table.', note: 'O\'zbekcha "Stolda kitob bor" deyilganda "have" ishlatilmaydi, "there is" bo\'ladi.' },
      { wrong: 'There are a cat in the garden.', correct: 'There is a cat in the garden.', note: 'Bitta mushuk uchun "There is" bo\'ladi.' }
    ],
    uzbekComparison: 'O\'zbek tilida gap oxiridagi "...bor / ...yo\'q" so\'zlariga to\'g\'ri keladi (masalan, "U yerda do\'kon bor" = "There is a shop there").',
    tip: '💡 Gap "Bormi?" deb boshlansa: "Is there...?" (birlik) yoki "Are there...?" (ko\'plik) deb boshlang.',
    exercises: [
      {
        question: '_____ a post office across the street.',
        options: ['There is', 'There are', 'There be', 'It have'],
        answer: 0,
        explanation: 'Bitta pochta binosi ("a post office") uchun "There is".'
      },
      {
        question: '_____ many apples in the basket.',
        options: ['There is', 'There are', 'Is there', 'Are there'],
        answer: 1,
        explanation: 'Ko\'plikdagi ot ("many apples") uchun "There are".'
      },
      {
        question: '_____ any sugar left in the bowl?',
        options: ['Are there', 'Is there', 'There is', 'There are'],
        answer: 1,
        explanation: '"Sugar" (shakar) sanalmaydi, so\'roq shakli "Is there".'
      },
      {
        question: 'There _____ any buses after midnight.',
        options: ['isn\'t', 'aren\'t', 'not', 'no are'],
        answer: 1,
        explanation: '"Buses" ko\'plikda bo\'lgani uchun inkor shakli "aren\'t".'
      },
      {
        question: 'How many rooms _____ in your house?',
        options: ['is there', 'are there', 'there is', 'there are'],
        answer: 1,
        explanation: 'So\'roq gapda yordamchi fe\'l "are" oldinga chiqadi: "are there".'
      }
    ]
  },
  {
    id: 'a1_8',
    level: 'A1',
    title: 'Have got / Has got',
    titleUz: 'Have got / Has got: Egalik ma\'nosi',
    isTense: false,
    summary: 'Britaniya ingliz tilida biror narsaga egalik qilish, oilaviy munosabatlar yoki tashqi ko\'rinishni tasvirlashda keng ishlatiladi.',
    usage: [
      'I, you, we, they bilan: have got (\'ve got).',
      'He, she, it bilan: has got (\'s got).',
      'Kasallik va alomatlarni bildirishda: I\'ve got a headache (Boshim og\'riyapti).',
      'Tashqi qiyofani aytishda: She has got blue eyes (Uning ko\'zlari moviy).'
    ],
    formula: {
      affirmative: 'Subject + have got / has got + Object (I have got a car, He has got a sister)',
      negative: 'Subject + haven\'t got / hasn\'t got + Object (We haven\'t got time)',
      question: 'Have / Has + Subject + got + Object? (Have you got a pen?)'
    },
    examples: [
      { en: 'I have got two brothers and one sister.', uz: 'Mening ikkita akam va bitta singlim bor.' },
      { en: 'She has got a very cute puppy.', uz: 'Uning juda yoqimli kuchukchasi bor.' },
      { en: 'We haven\'t got enough money for the ticket.', uz: 'Chipta uchun bizda yetarli pul yo\'q.' },
      { en: 'He hasn\'t got a car, so he takes the bus.', uz: 'Uning mashinasi yo\'q, shuning uchun avtobusda yuradi.' },
      { en: 'Have you got any siblings?', uz: 'Aka-uka yoki opa-singillaringiz bormi?' },
      { en: 'Has she got a driver\'s license?', uz: 'Uning haydovchilik guvohnomasi bormi?' },
      { en: 'They have got a lovely garden.', uz: 'Ularning chiroyli bog\'i bor.' },
      { en: 'I have got a terrible headache today.', uz: 'Bugun boshim qattiq og\'riyapti.' }
    ],
    mistakes: [
      { wrong: 'He have got a car.', correct: 'He has got a car.', note: '"He, she, it" bilan "has got" ishlatiladi.' },
      { wrong: 'I don\'t have got a pen.', correct: 'I haven\'t got a pen / I don\'t have a pen.', note: '"Haven\'t got" yoki oddiy "don\'t have" ishlatiladi, ikkalasi aralashtirilmaydi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...mda bor" konstruksiyasiga to\'g\'ri keladi (Menda bor = I have got).',
    tip: '💡 Qisqartmalari: I\'ve got, he\'s got, they\'ve got. Savolda "got" o\'z joyida qoladi, "Have/Has" oldinga chiqadi.',
    exercises: [
      {
        question: 'My brother _____ got a new laptop.',
        options: ['have', 'has', 'is', 'are'],
        answer: 1,
        explanation: 'Brother (u - he) bo\'lgani uchun "has got" to\'g\'ri.'
      },
      {
        question: '_____ you got a spare pencil?',
        options: ['Do', 'Are', 'Have', 'Has'],
        answer: 2,
        explanation: '"You got" bilan so\'roq "Have you got" shaklida bo\'ladi.'
      },
      {
        question: 'We _____ got any classes on Sunday.',
        options: ['haven\'t', 'hasn\'t', 'don\'t', 'aren\'t'],
        answer: 0,
        explanation: '"We" olmoshi bilan inkor "haven\'t got" bo\'ladi.'
      },
      {
        question: 'She _____ brown eyes and long dark hair.',
        options: ['have got', 'has got', 'is got', 'got'],
        answer: 1,
        explanation: 'She uchun "has got" qo\'yiladi.'
      },
      {
        question: 'Has he got a bicycle? — Yes, he _____.',
        options: ['has', 'has got', 'have', 'is'],
        answer: 0,
        explanation: 'Qisqa javobda "got" aytilmaydi: "Yes, he has".'
      }
    ]
  },
  {
    id: 'a1_9',
    level: 'A1',
    title: 'Present Simple',
    titleUz: 'Oddiy hozirgi zamon (Odatlar va doimiy faktlar)',
    isTense: true,
    summary: 'Kundalik odatlar, har doim takrorlanadigan ish-harakatlar va umumiy ilmiy haqiqatlarni ifodalash uchun qo\'llaniladi.',
    usage: [
      'Kundalik takrorlanuvchi odatlar: I drink tea every morning.',
      'Umumiy tabiat qonunlari va faktlar: The sun rises in the east.',
      'Doimiy yashash va ishlash joylari: He works at a hospital.',
      'Jadvallar va vaqt rejalari: The train leaves at 8:00 AM.'
    ],
    formula: {
      affirmative: 'Subject + V1 (He/She/It bo\'lsa: V1 + -s / -es) (I play, She plays)',
      negative: 'Subject + do not (don\'t) / does not (doesn\'t) + V1 (She doesn\'t play)',
      question: 'Do / Does + Subject + V1? (Do you live here? Does he speak English?)'
    },
    examples: [
      { en: 'I live in Tashkent.', uz: 'Men Toshkentda yashayman.' },
      { en: 'My sister works at a local bank.', uz: 'Singlim mahalliy bankda ishlaydi.' },
      { en: 'We play football every Saturday.', uz: 'Biz har shanba kuni futbol o\'ynaymiz.' },
      { en: 'Water boils at 100 degrees Celsius.', uz: 'Suv 100 gradusda qaynaydi.' },
      { en: 'He doesn\'t like spicy food.', uz: 'U achchiq ovqatni yoqtirmaydi.' },
      { en: 'They don\'t wake up early on Sundays.', uz: 'Ular yakshanba kunlari erta uyg\'onishmaydi.' },
      { en: 'Do you speak German?', uz: 'Nemischa gapirasizmi?' },
      { en: 'Where does your father work?', uz: 'Otangiz qayerda ishlaydilar?' }
    ],
    mistakes: [
      { wrong: 'He work in an office.', correct: 'He works in an office.', note: 'He/She/It da fe\'lga albatta "-s" yoki "-es" qo\'shilishi shart!' },
      { wrong: 'She doesn\'t likes apples.', correct: 'She doesn\'t like apples.', note: '"Doesn\'t" kelsa, fe\'ldan "-s" olib tashlanadi.' },
      { wrong: 'Do he know the answer?', correct: 'Does he know the answer?', note: '"He" uchun yordamchi fe\'l "Does" bo\'ladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi hozirgi-kelasi zamon shakliga to\'g\'ri keladi ("-aman, -asan, -adi", masalan: ishlayman, o\'qiydi).',
    tip: '💡 He/She/It kelsa fe\'lga "-s" qo\'shing. Savol va inkorda "Does" bor bo\'lsa, fe\'ldagi "-s" yo\'qoladi!',
    exercises: [
      {
        question: 'My brother _____ football twice a week.',
        options: ['play', 'plays', 'playing', 'is play'],
        answer: 1,
        explanation: '"My brother" (he) bo\'lgani uchun fe\'lga "-s" qo\'shiladi: "plays".'
      },
      {
        question: 'She _____ drink coffee in the evening.',
        options: ['don\'t', 'doesn\'t', 'isn\'t', 'not'],
        answer: 1,
        explanation: '"She" bilan inkor yordamchisi "doesn\'t".'
      },
      {
        question: '_____ you understand this exercise?',
        options: ['Are', 'Do', 'Does', 'Is'],
        answer: 1,
        explanation: '"You" bilan Present Simple savoli "Do" bilan yasaladi.'
      },
      {
        question: 'My father _____ late on Fridays.',
        options: ['finish', 'finishes', 'finishs', 'is finish'],
        answer: 1,
        explanation: '"-sh" bilan tugagan fe\'llarga "-es" qo\'shiladi: "finishes".'
      },
      {
        question: 'Where _____ your grandparents live?',
        options: ['do', 'does', 'are', 'is'],
        answer: 0,
        explanation: '"Grandparents" (bobo va buvi) ko\'plikda (they), shuning uchun "do".'
      }
    ]
  },
  {
    id: 'a1_10',
    level: 'A1',
    title: 'Adverbs of frequency',
    titleUz: 'Takroriylik ravishlari: always, usually, often, sometimes, never',
    isTense: false,
    summary: 'Ish-harakatning qanchalik tez-tez yoki kamdan-kam sodir bo\'lishini ko\'rsatuvchi ravishlar.',
    usage: [
      'Always (100% - har doim)',
      'Usually (85% - odatda)',
      'Often (70% - tez-tez)',
      'Sometimes (50% - ba\'zan)',
      'Hardly ever / Rarely (10% - deyarli hech qachon)',
      'Never (0% - hech qachon, inkor ma\'nosida, gapga qo\'shimcha "not" kerak emas).'
    ],
    formula: {
      affirmative: 'Asosiy fe\'ldan oldin: Subject + adverb + Verb (I always get up early)',
      negative: '"To be" fe\'lidan keyin: Subject + be + adverb (She is always happy)',
      question: 'Yordamchi fe\'l va asosiy fe\'l o\'rtasida: Do you usually drink tea?'
    },
    examples: [
      { en: 'I always brush my teeth before bed.', uz: 'Men har doim uxlashdan oldin tishimni tozalayman.' },
      { en: 'She usually takes the bus to work.', uz: 'U odatda ishga avtobusda boradi.' },
      { en: 'We often visit our grandparents on weekends.', uz: 'Biz dam olish kunlari tez-tez buvimiznikiga boramiz.' },
      { en: 'He is sometimes late for the meeting.', uz: 'U ba\'zan yig\'ilishga kechikib turadi ("is" dan keyin).' },
      { en: 'I never eat meat because I am a vegetarian.', uz: 'Men hech qachon go\'sht yemayman, chunki vegetarianman.' },
      { en: 'Do you often travel abroad?', uz: 'Siz tez-tez chet elga sayohat qilib turasizmi?' },
      { en: 'They rarely watch television these days.', uz: 'Ular hozirgi kunda kamdan-kam televizor ko\'rishadi.' },
      { en: 'He is never angry with his students.', uz: 'U o\'z o\'quvchilaridan hech qachon g\'azablanmaydi.' }
    ],
    mistakes: [
      { wrong: 'I go always to bed at 11.', correct: 'I always go to bed at 11.', note: 'Ravish asosiy fe\'lning oldida kelishi kerak.' },
      { wrong: 'I don\'t never lie.', correct: 'I never lie.', note: '"Never" o\'zi inkor so\'z, "don\'t" bilan ikkita inkor qilinmaydi.' },
      { wrong: 'She always is happy.', correct: 'She is always happy.', note: '"To be" fe\'lidan KEYIN keladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "doim, odatda, tez-tez, ba\'zan, hech qachon" so\'zlariga to\'g\'ri keladi.',
    tip: '💡 Oddiy fe\'llardan OLDIN keladi (always eat), lekin "am/is/are" dan KEYIN keladi (is always).',
    exercises: [
      {
        question: 'He _____ walks to work in the morning.',
        options: ['usually', 'is usually', 'usually is', 'does usually'],
        answer: 0,
        explanation: 'Asosiy fe\'l (walks) oldidan "usually" to\'g\'ridan-to\'g\'ri keladi.'
      },
      {
        question: 'My brother is _____ late for dinner.',
        options: ['never', 'don\'t never', 'not never', 'never doesn\'t'],
        answer: 0,
        explanation: '"To be" (is) dan keyin "never" qo\'yiladi.'
      },
      {
        question: 'Do you _____ drink coffee after lunch?',
        options: ['often', 'often do', 'are often', 'do often'],
        answer: 0,
        explanation: 'Savolda ega (you) va asosiy fe\'l (drink) orasida "often" turadi.'
      },
      {
        question: 'She _____ forgets her house keys.',
        options: ['sometimes', 'is sometimes', 'does sometimes', 'has sometimes'],
        answer: 0,
        explanation: 'Oddiy fe\'ldan (forgets) oldin "sometimes" qo\'yiladi.'
      },
      {
        question: 'They are _____ friendly and welcoming.',
        options: ['always', 'always are', 'do always', 'always do'],
        answer: 0,
        explanation: '"Are" dan keyin "always" keladi: "They are always friendly".'
      }
    ]
  },
  {
    id: 'a1_11',
    level: 'A1',
    title: 'Present Continuous',
    titleUz: 'Hozirgi davomli zamon (Ayni paytda bo\'layotgan ish)',
    isTense: true,
    summary: 'Ayni gapirilayotgan daqiqada sodir bo\'layotgan yoki ayni kunlarda davom etayotgan vaqtinchalik harakatlar uchun ishlatiladi.',
    usage: [
      'Ayni damda bo\'layotgan harakat: Look! It is raining outside.',
      'Hozirgi paytdagi vaqtinchalik holat: I am reading an interesting book these days.',
      'O\'zgarayotgan, rivojlanayotgan jarayonlar: The weather is getting warmer.',
      'Signal so\'zlar: now, right now, at the moment, look!, listen!'
    ],
    formula: {
      affirmative: 'Subject + am / is / are + V-ing (I am studying, She is reading)',
      negative: 'Subject + am / is / are + not + V-ing (They aren\'t listening)',
      question: 'Am / Is / Are + Subject + V-ing? (Are you coming? What are you doing?)'
    },
    examples: [
      { en: 'I am writing an email right now.', uz: 'Men ayni damda elektron xat yozyapman.' },
      { en: 'She is cooking plov in the kitchen.', uz: 'U oshxonada osh pishiryapti.' },
      { en: 'Listen! Somebody is singing.', uz: 'Quloq soling! Kimdir qo\'shiq kuylayapti.' },
      { en: 'They are not watching television now.', uz: 'Ular hozir televizor ko\'rishmayapti.' },
      { en: 'Are you preparing for your exam?', uz: 'Imtihoningizga tayyorlanyapsizmi?' },
      { en: 'Why is the baby crying?', uz: 'Chaqaloq nega yig\'layapti?' },
      { en: 'We are learning English together.', uz: 'Biz birgalikda ingliz tilini o\'rganmoqdamiz.' },
      { en: 'He is staying at a hotel this week.', uz: 'U bu hafta mehmonxonada yashayapti (vaqtinchalik).' }
    ],
    mistakes: [
      { wrong: 'I reading now.', correct: 'I am reading now.', note: '"am/is/are" yordamchi fe\'lini tashlab ketish eng keng tarqalgan xato.' },
      { wrong: 'She is drink tea.', correct: 'She is drinking tea.', note: 'Asosiy fe\'lga albatta "-ing" qo\'shilishi shart.' },
      { wrong: 'I am wanting water.', correct: 'I want water.', note: 'His-tuyg\'u va holat fe\'llari (want, like, love, know) continuous zamonlarda ishlatilmaydi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "-yap/-moqda" qo\'shimchalariga to\'g\'ri keladi (yoz-yap-man, o\'qi-moqda-miz).',
    tip: '💡 Formula: to be (am/is/are) + fe\'l-ing. Ikkala qismi ham bo\'lishi shart, birortasiz ishlamaydi!',
    exercises: [
      {
        question: 'Look! The bus _____ now.',
        options: ['comes', 'is coming', 'come', 'are coming'],
        answer: 1,
        explanation: '"Look!" signali ayni paytdagi harakatni bildiradi: "is coming".'
      },
      {
        question: 'What _____ at the moment?',
        options: ['you are doing', 'are you doing', 'do you do', 'you do'],
        answer: 1,
        explanation: 'So\'roq gapda yordamchi fe\'l "are" egadan oldinga chiqadi.'
      },
      {
        question: 'We _____ for the teacher right now.',
        options: ['wait', 'are waiting', 'waiting', 'is waiting'],
        answer: 1,
        explanation: '"We" olmoshi bilan "are waiting" ishlatiladi.'
      },
      {
        question: 'He _____ his car today because it is broken.',
        options: ['isn\'t driving', 'doesn\'t drive', 'not driving', 'aren\'t driving'],
        answer: 0,
        explanation: 'Vaqtinchalik inkor holati: "He isn\'t driving".'
      },
      {
        question: 'Listen! The phone _____.',
        options: ['rings', 'is ringing', 'ring', 'are ringing'],
        answer: 1,
        explanation: '"Listen!" signali ayni damdagi jarayonni ko\'rsatadi: "is ringing".'
      }
    ]
  },
  {
    id: 'a1_12',
    level: 'A1',
    title: 'Can / Can\'t',
    titleUz: 'Can va Can\'t: Qobiliyat va ruxsat',
    isTense: false,
    summary: 'Jismoniy yoki aqliy qobiliyat (qo\'lidan kelish), imkoniyat va ruxsat so\'rash yoki berishda ishlatiladigan eng keng tarqalgan modal fe\'l.',
    usage: [
      'Qobiliyat (qo\'ldan kelish): I can swim, She can speak French.',
      'Imkoniyat: You can buy tickets online.',
      'Ruxsat so\'rash: Can I open the window?',
      'Barcha shaxslar (I, you, he, she, it, we, they) uchun shakli o\'zgarmaydi, "-s" qo\'shilmaydi.'
    ],
    formula: {
      affirmative: 'Subject + can + V1 (oddiy fe\'l) (He can swim)',
      negative: 'Subject + cannot / can\'t + V1 (I can\'t drive)',
      question: 'Can + Subject + V1? (Can you help me? Yes, I can. / No, I can\'t.)'
    },
    examples: [
      { en: 'I can play the guitar.', uz: 'Men gitara chala olaman.' },
      { en: 'She can speak three languages fluently.', uz: 'U uchta tilda erkin gaplasha oladi.' },
      { en: 'My grandfather can\'t see very well without glasses.', uz: 'Bobom ko\'zoynaksiz yaxshi ko\'ra olmaydilar.' },
      { en: 'Can you swim across this river?', uz: 'Bu daryoni suzib o\'ta olasizmi?' },
      { en: 'You can park your car here for free.', uz: 'Mashinangizni bu yerga tekinga qo\'yishingiz mumkin.' },
      { en: 'Can I borrow your pen for a minute?', uz: 'Ruchkangizni bir daqiqaga olib tursam maylimi?' },
      { en: 'Birds can fly, but penguins can\'t.', uz: 'Qushlar ucha oladi, ammo pingvinlar ucha olmaydi.' },
      { en: 'We can meet after work tomorrow.', uz: 'Biz ertaga ishdan keyin ko\'rishishimiz mumkin.' }
    ],
    mistakes: [
      { wrong: 'He cans swim.', correct: 'He can swim.', note: '"Can" modal fe\'liga hech qachon "-s" qo\'shilmaydi.' },
      { wrong: 'I can to drive.', correct: 'I can drive.', note: '"Can" dan keyin "to" zarrachasi qo\'yilmaydi.' },
      { wrong: 'She can plays piano.', correct: 'She can play the piano.', note: '"Can" dan keyin fe\'l sof asosiy shaklda (V1) bo\'ladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi "...-a olmoq / ...-olmaslik" qo\'shimchasiga to\'g\'ri keladi (yoza olaman, bora olmayman).',
    tip: '💡 "Can" dan keyin fe\'lga hech narsa qo\'shmang: "to" ham yo\'q, "-s" ham yo\'q, "-ing" ham yo\'q!',
    exercises: [
      {
        question: 'She _____ swim very fast.',
        options: ['can', 'cans', 'can to', 'is can'],
        answer: 0,
        explanation: '"Can" modal fe\'li o\'zgarmaydi va "to" siz keladi.'
      },
      {
        question: 'I am sorry, but I _____ hear you clearly.',
        options: ['can', 'can\'t', 'don\'t can', 'am not can'],
        answer: 1,
        explanation: 'Eshita olmaslik inkori "can\'t" (cannot) bo\'ladi.'
      },
      {
        question: '_____ you play chess?',
        options: ['Do', 'Are', 'Can', 'Is'],
        answer: 2,
        explanation: 'Qobiliyatni so\'rashda "Can you play...?" ishlatiladi.'
      },
      {
        question: 'He can _____ delicious plov.',
        options: ['cooks', 'cooking', 'cook', 'to cook'],
        answer: 2,
        explanation: '"Can" dan so\'ng sof fe\'l shakli (cook) keladi.'
      },
      {
        question: 'Can I leave early today? — Yes, you _____.',
        options: ['can', 'can to', 'do', 'are'],
        answer: 0,
        explanation: 'Qisqa javob: "Yes, you can".'
      }
    ]
  },
  {
    id: 'a1_13',
    level: 'A1',
    title: 'Imperatives',
    titleUz: 'Buyruq gaplar (Iltimos va yo\'l-yo\'riqlar)',
    isTense: false,
    summary: 'Kimgadir buyruq berish, maslahat, yo\'l-yo\'riq ko\'rsatish yoki iltimos qilish uchun egasiz to\'g\'ridan-to\'g\'ri fe\'l bilan boshlanadigan gaplar.',
    usage: [
      'Buyruq yoki ko\'rsatma: Stand up! Open the door.',
      'Iltimos (muloyimlik bilan): Please sit down, Help me, please.',
      'Taqiqlash (inkor): Don\'t touch that! Don\'t be late.',
      'Retseptlar va qo\'llanmalar: Mix the flour and sugar.'
    ],
    formula: {
      affirmative: 'Fe\'l (V1) + qolgan qism (Open your books, please)',
      negative: 'Don\'t + Fe\'l (V1) + qolgan qism (Don\'t talk loudly)',
      question: 'Buyruq gaplarda so\'roq shakli bo\'lmaydi.'
    },
    examples: [
      { en: 'Close the window, please. It is cold.', uz: 'Iltimos, derazani yoping. Sovuq bo\'lyapti.' },
      { en: 'Don\'t forget your umbrella!', uz: 'Soyaboningizni esdan chiqarmang!' },
      { en: 'Listen carefully to the instructions.', uz: 'Ko\'rsatmalarga diqqat bilan quloq soling.' },
      { en: 'Don\'t run in the corridor.', uz: 'Yo\'lakda yugurmang.' },
      { en: 'Turn right at the traffic lights.', uz: 'Svetofordan o\'ngga buriling.' },
      { en: 'Be quiet! The baby is sleeping.', uz: 'Tinch bo\'ling! Chaqaloq uxlayapti.' },
      { en: 'Take this medicine after meals.', uz: 'Bu dorini ovqatdan keyin iching.' },
      { en: 'Don\'t worry, everything will be fine.', uz: 'Xavotir olmang, hammasi yaxshi bo\'ladi.' }
    ],
    mistakes: [
      { wrong: 'You open the door.', correct: 'Open the door, please.', note: 'Buyruq gaplarda "you" olmoshi aytilmaydi.' },
      { wrong: 'No smoke here.', correct: 'Don\'t smoke here.', note: 'Inkor buyruq faqat "Don\'t + fe\'l" bilan yasaladi.' },
      { wrong: 'Not touch that.', correct: 'Don\'t touch that.', note: '"Not" emas, "Don\'t" ishlatiladi.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi buyruq mayliga to\'g\'ri keladi ("qiling, qilmang, kel, ket").',
    tip: '💡 Gapni fe\'l bilan boshlang (Listen!). Inkor qilsangiz boshiga "Don\'t" qo\'ying (Don\'t talk!).',
    exercises: [
      {
        question: '_____ the door, please. It is too noisy outside.',
        options: ['Close', 'Closes', 'Closing', 'To close'],
        answer: 0,
        explanation: 'Buyruq gap fe\'lning boshlang\'ich shakli (Close) bilan boshlanadi.'
      },
      {
        question: '_____ speak so loudly in the hospital!',
        options: ['Not', 'Don\'t', 'No', 'Doesn\'t'],
        answer: 1,
        explanation: 'Inkor buyruq gap "Don\'t" bilan yasaladi.'
      },
      {
        question: '_____ quiet, please! The exam has started.',
        options: ['Be', 'Are', 'Is', 'Do'],
        answer: 0,
        explanation: 'Holatni buyurishda "to be" ning sof shakli "Be" olinadi: "Be quiet!".'
      },
      {
        question: '_____ drink that water, it isn\'t clean.',
        options: ['Doesn\'t', 'Don\'t', 'Not', 'No'],
        answer: 1,
        explanation: 'Qilma degan taqiq "Don\'t" bilan beriladi.'
      },
      {
        question: '_____ your hands before eating.',
        options: ['Wash', 'Washes', 'Washing', 'To wash'],
        answer: 0,
        explanation: 'Ko\'rsatma boshida sof fe\'l: "Wash your hands".'
      }
    ]
  },
  {
    id: 'a1_14',
    level: 'A1',
    title: 'Question words (Wh- questions)',
    titleUz: 'So\'roq so\'zlari: What, Where, When, Who, Why, How',
    isTense: false,
    summary: 'Aniq ma\'lumot olish uchun ishlatiladigan maxsus so\'roq so\'zlari. Ular har doim gapning eng boshida keladi.',
    usage: [
      'What (nima, qanday) — narsa, buyum yoki kasb haqida so\'rashda.',
      'Where (qayerda, qayerga) — joy va makon haqida.',
      'When (qachon) — vaqt haqida.',
      'Who (kim) — insonlar haqida.',
      'Why (nega, nima uchun) — sabab haqida.',
      'How (qanday, qanaqa) — holat, usul yoki miqdor (How much, How many, How old).'
    ],
    formula: {
      affirmative: 'Wh- so\'z + yordamchi fe\'l (do/does/is/are/can) + ega + asosiy fe\'l?',
      negative: 'Why don\'t you like it? / Who isn\'t coming?',
      question: 'What do you do? / Where is the station? / How are you?'
    },
    examples: [
      { en: 'What is your favorite book?', uz: 'Sizning sevimli kitobingiz nima?' },
      { en: 'Where do you live?', uz: 'Qayerda yashaysiz?' },
      { en: 'When does the train arrive?', uz: 'Poyezd qachon yetib keladi?' },
      { en: 'Who is your best friend?', uz: 'Sizning eng yaqin do\'stingiz kim?' },
      { en: 'Why are you learning English?', uz: 'Nima uchun ingliz tilini o\'rganyapsiz?' },
      { en: 'How do you go to work every day?', uz: 'Har kuni ishga qanday borasiz?' },
      { en: 'How old is your younger sister?', uz: 'Singlingiz necha yoshda?' },
      { en: 'How much does this jacket cost?', uz: 'Bu kurtka qancha turadi?' }
    ],
    mistakes: [
      { wrong: 'Where you live?', correct: 'Where do you live?', note: 'So\'roq so\'zidan keyin yordamchi fe\'l (do/does) tushib qolmasligi kerak.' },
      { wrong: 'What time is it now?', correct: 'What time is it now? (yoki What is the time?)', note: 'So\'z tartibiga e\'tibor bering.' },
      { wrong: 'Why you are sad?', correct: 'Why are you sad?', note: 'Yordamchi fe\'l egadan oldinga o\'tishi shart.' }
    ],
    uzbekComparison: 'O\'zbek tilidagi so\'roq olmoshlariga to\'liq mos keladi (nima, qayer, qachon, kim, nega, qanday).',
    tip: '💡 Qoidasi: Wh- so\'z + Yordamchi fe\'l + Ega + Asosiy fe\'l (Masalan: Where + do + you + go?).',
    exercises: [
      {
        question: '_____ is your birthday? — On the 5th of May.',
        options: ['Where', 'When', 'Who', 'Why'],
        answer: 1,
        explanation: 'Sana va vaqt haqida so\'ralganda "When" (qachon) ishlatiladi.'
      },
      {
        question: '_____ is that man standing near the entrance?',
        options: ['What', 'Who', 'Where', 'When'],
        answer: 1,
        explanation: 'Shaxs (odam) haqida so\'ralganda "Who" (kim) bo\'ladi.'
      },
      {
        question: '_____ do you live? — In Samarkand.',
        options: ['When', 'What', 'Where', 'Why'],
        answer: 2,
        explanation: 'Shahar va joylashuv haqida so\'ralganda "Where" (qayerda) to\'g\'ri.'
      },
      {
        question: '_____ are you late? — Because of heavy traffic.',
        options: ['Why', 'How', 'What', 'Where'],
        answer: 0,
        explanation: '"Because" (chunki) bilan javob berilgan sababga "Why" (nega) deb so\'raladi.'
      },
      {
        question: '_____ much does this coffee cost?',
        options: ['What', 'How', 'Who', 'Where'],
        answer: 1,
        explanation: 'Narx va miqdor so\'rashda "How much" birikmasi ishlatiladi.'
      }
    ]
  },
  {
    id: 'a1_15',
    level: 'A1',
    title: 'Prepositions of place and time',
    titleUz: 'O\'rin va payt predloglari (in, on, at, under, next to)',
    isTense: false,
    summary: 'Narsaning qayerdaligini (o\'rin) yoki hodisaning qachon yuz berishini (vaqt) ko\'rsatuvchi predloglar.',
    usage: [
      'VAQT: "At" — aniq soat (at 5:00, at noon, at night).',
      'VAQT: "On" — haftaning kunlari va sanalar (on Monday, on May 9th).',
      'VAQT: "In" — oylar, fasllar, yillar va asrlar (in June, in summer, in 2025).',
      'O\'RIN: in (ichida - in the room), on (ustida - on the desk), at (nuqtada - at the bus stop), under (tagida), next to (yonida).'
    ],
    formula: {
      affirmative: 'At + aniq soat | On + kun / sana | In + oy / yil / fasl',
      negative: 'She isn\'t at home right now.',
      question: 'Is the cat under the bed? Do we meet on Friday?'
    },
    examples: [
      { en: 'The lesson starts at 9:00 AM.', uz: 'Dars ertalab soat 9:00 da boshlanadi.' },
      { en: 'We have English classes on Mondays and Wednesdays.', uz: 'Dushanba va chorshanba kunlari darsimiz bor.' },
      { en: 'My birthday is in September.', uz: 'Mening tug\'ilgan kunim sentabrda.' },
      { en: 'It is very hot here in summer.', uz: 'Bu yerda yozda juda issiq bo\'ladi.' },
      { en: 'The cat is sleeping under the table.', uz: 'Mushuk stolning tagida uxlayapti.' },
      { en: 'The pharmacy is next to the supermarket.', uz: 'Dorixona supermarketning yonida joylashgan.' },
      { en: 'My phone is on the sofa.', uz: 'Telefonim divanning ustida.' },
      { en: 'I usually stay at home at the weekend.', uz: 'Men odatda dam olish kunlari uyda bo\'laman.' }
    ],
    mistakes: [
      { wrong: 'I was born in 15th May.', correct: 'I was born on 15th May.', note: 'Aniq sana kelsa "in" emas, "on" qo\'yiladi.' },
      { wrong: 'See you in Monday.', correct: 'See you on Monday.', note: 'Hafta kunlari uchun "on" ishlatiladi.' },
      { wrong: 'at the morning', correct: 'in the morning', note: '"in the morning/afternoon/evening", lekin "at night".' }
    ],
    uzbekComparison: 'O\'zbek tilida predloglar o\'rniga o\'rin-payt kelishigi qo\'shimchasi (-da) va ko\'makchilar (ustida, tagida, yonida) ishlatiladi.',
    tip: '💡 Piramida: AT (eng kichik: aniq soat) → ON (o\'rtacha: kun va sana) → IN (eng katta: oy, fasl, yil).',
    exercises: [
      {
        question: 'Our flight departs _____ 7:30 in the morning.',
        options: ['in', 'on', 'at', 'to'],
        answer: 2,
        explanation: 'Aniq soatlar oldidan doim "at" qo\'yiladi.'
      },
      {
        question: 'We don\'t go to school _____ Sundays.',
        options: ['at', 'in', 'on', 'from'],
        answer: 2,
        explanation: 'Hafta kunlari oldidan "on" keladi.'
      },
      {
        question: 'Independence Day is celebrated _____ September.',
        options: ['in', 'on', 'at', 'by'],
        answer: 0,
        explanation: 'Oylar oldidan faqat "in" ishlatiladi.'
      },
      {
        question: 'The shoes are _____ the bed.',
        options: ['under', 'at', 'on', 'between'],
        answer: 0,
        explanation: 'Krovat tagida ma\'nosida "under" to\'g\'ri keladi.'
      },
      {
        question: 'I will meet you _____ the bus stop.',
        options: ['on', 'at', 'in', 'under'],
        answer: 1,
        explanation: 'Aniq manzil yoki to\'xtash joyi uchun "at the bus stop".'
      }
    ]
  },
  {
    id: 'a1_16',
    level: 'A1',
    title: 'Countable / Uncountable nouns + some / any',
    titleUz: 'Sanaladigan va sanalmaydigan otlar, some va any',
    isTense: false,
    summary: 'Sanaladigan otlar (donasi bor, ko\'plik bo\'la oladi) va sanalmaydigan otlar (suyuqlik, donador, mavhum tushunchalar) hamda ularga miqdor bildiruvchi some/any so\'zlari.',
    usage: [
      'Sanaladigan (Countable): apple/apples, car/cars, book/books (a/an va sonlar bilan keladi).',
      'Sanalmaydigan (Uncountable): water, bread, milk, rice, money, information, advice (ko\'plikka aylanmaydi, a/an olmaydi).',
      '"Some" (bir nechta, biroz) — darak gaplarda (I have some apples, I need some water) va taklif/iltimos so\'roqlarida (Would you like some tea?).',
      '"Any" (biror, hech qanday) — inkor va umumiy so\'roq gaplarda (I don\'t have any money, Do you have any apples?).'
    ],
    formula: {
      affirmative: 'Darak: There is some milk / There are some apples',
      negative: 'Inkor: There isn\'t any milk / There aren\'t any apples',
      question: 'So\'roq: Is there any milk? / Are there any apples?'
    },
    examples: [
      { en: 'There are some fresh apples on the table.', uz: 'Stolda bir nechta yangi olma bor.' },
      { en: 'I need some cold water, please.', uz: 'Menga biroz sovuq suv kerak, iltimos.' },
      { en: 'We don\'t have any milk in the fridge.', uz: 'Muzlatgichda hech qanday sut yo\'q.' },
      { en: 'Do you have any brothers or sisters?', uz: 'Sizning biror aka yoki singlingiz bormi?' },
      { en: 'Would you like some coffee?', uz: 'Biroz kofe xohlaysizmi? (taklif bo\'lgani uchun some).' },
      { en: 'Can I have some sugar in my tea?', uz: 'Choyimga biroz shakar solib olsam maylimi? (iltimos).' },
      { en: 'Money is important, but happiness is more important.', uz: 'Pul muhim, ammo baxt muhimroq (money sanalmaydi).' },
      { en: 'There isn\'t any time left.', uz: 'Hech qancha vaqt qolmadi.' }
    ],
    mistakes: [
      { wrong: 'I have two informations.', correct: 'I have some information / two pieces of information.', note: '"Information" hech qachon ko\'plik "-s" olmaydi.' },
      { wrong: 'I don\'t have some money.', correct: 'I don\'t have any money.', note: 'Inkor gaplarda "some" emas, "any" ishlatiladi.' },
      { wrong: 'a milk', correct: 'some milk / a bottle of milk.', note: 'Sanalmaydigan otlar oldidan "a/an" qo\'yilmaydi.' }
    ],
    uzbekComparison: 'O\'zbek tilida ham "bir oz suv", "hech qanday pul" deyiladi. Lekin o\'zbek tilida "ikkita ma\'lumot" desa bo\'ladi, ingliz tilida esa qat\'iy "pieces of information" deyiladi.',
    tip: '💡 Darak gapda: SOME. Inkor va oddiy so\'roqda: ANY. Muloyim taklifda (Would you like...?): SOME.',
    exercises: [
      {
        question: 'There is _____ fresh bread on the kitchen counter.',
        options: ['a', 'some', 'any', 'many'],
        answer: 1,
        explanation: '"Bread" sanalmaydi, darak gapda "some bread" to\'g\'ri.'
      },
      {
        question: 'We don\'t have _____ eggs to make an omelette.',
        options: ['some', 'any', 'a', 'much'],
        answer: 1,
        explanation: 'Inkor gap ("don\'t have") bo\'lgani uchun "any" to\'g\'ri.'
      },
      {
        question: 'Would you like _____ tea?',
        options: ['any', 'some', 'a', 'an'],
        answer: 1,
        explanation: 'Taklif yoki mehmondo\'stlik so\'rog\'ida "some" ishlatiladi.'
      },
      {
        question: 'Which of the following is UNCOUNTABLE?',
        options: ['orange', 'bottle', 'water', 'student'],
        answer: 2,
        explanation: '"Water" (suv) suyuqlik bo\'lib, sanalmaydigan ot hisoblanadi.'
      },
      {
        question: 'Do you have _____ questions before we start?',
        options: ['some', 'any', 'a', 'an'],
        answer: 1,
        explanation: 'Oddiy so\'roq gaplarda ko\'plikdagi ot oldidan "any" qo\'yiladi.'
      }
    ]
  }
];
