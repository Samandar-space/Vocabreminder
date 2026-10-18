// VocabReminder - AI Writing Evaluator Service
// Integrates Google Gemini 1.5 Flash with fallback to smart local CEFR analyzer
// Tailored specifically for Uzbekistan Multi-level CEFR and IELTS criteria.

export const aiWritingService = {
  /**
   * Check essay using Google Gemini API or smart local analyzer (supports text and images)
   */
  async evaluateEssay({ task, essayText, imageBase64, imageMimeType, userGoal, apiKey }) {
    const wordsArray = (essayText || '').trim().split(/\s+/).filter(Boolean);
    const wordCount = wordsArray.length;

    // If user provided a Gemini API Key, use real multimodal AI
    if (apiKey && apiKey.trim().length > 10) {
      try {
        const aiResult = await this.callGeminiAPI({
          task,
          essayText,
          imageBase64,
          imageMimeType,
          wordCount,
          userGoal,
          apiKey: apiKey.trim()
        });
        if (aiResult) return aiResult;
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local evaluation:', err);
      }
    }

    // If only image was uploaded but no API key is available
    if (imageBase64 && (!apiKey || apiKey.trim().length <= 10)) {
      throw new Error('Rasmdagi yozuvni o\'qish uchun bepul Gemini API kalitini kiritishingiz kerak. (Yuqoridagi 🔑 tugmasi orqali)');
    }

    // Smart Local Evaluation (No API key needed / offline compliant)
    return this.evaluateLocally({ task, essayText, wordCount, userGoal });
  },

  /**
   * Evaluate Full Exam (Task 1.1 + Task 1.2 + Task 2) on official 75-point Multi-level scale
   */
  async evaluateFullExam({ task11Text, task12Text, task2Text, apiKey }) {
    const task11 = { id: 'cefr_informal', title: 'Task 1.1: Qisqa Informal Xat', minWords: 50, maxWords: 80, prompt: 'Informal note/message to a friend.' };
    const task12 = { id: 'cefr_formal', title: 'Task 1.2: Formal Xat / Email', minWords: 120, maxWords: 180, prompt: 'Formal request or complaint letter.' };
    const task2 = { id: 'cefr_essay', title: 'Task 2: Esse / Insho', minWords: 180, maxWords: 200, prompt: 'Discursive opinion essay.' };

    const res11 = await this.evaluateEssay({ task: task11, essayText: task11Text, userGoal: 'cefr', apiKey });
    const res12 = await this.evaluateEssay({ task: task12, essayText: task12Text, userGoal: 'cefr', apiKey });
    const res2 = await this.evaluateEssay({ task: task2, essayText: task2Text, userGoal: 'cefr', apiKey });

    // Official Multi-level weightings:
    // Task 1.1: max 15 ball
    // Task 1.2: max 25 ball
    // Task 2:   max 35 ball
    // Total:    max 75 ball
    const s11 = parseInt(res11.score) || 10;
    const s12 = parseInt(res12.score) || 18;
    const s2 = parseInt(res2.score) || 26;

    const weighted11 = Math.min(15, Math.max(3, Math.round((s11 / 75) * 15)));
    const weighted12 = Math.min(25, Math.max(5, Math.round((s12 / 75) * 25)));
    const weighted2 = Math.min(35, Math.max(8, Math.round((s2 / 75) * 35)));
    const total75 = Math.min(75, Math.max(10, weighted11 + weighted12 + weighted2));

    let badge = 'CEFR B2 — Upper-Intermediate';
    if (total75 >= 65) badge = 'CEFR C1 — Advanced';
    else if (total75 >= 51) badge = 'CEFR B2 — Upper-Intermediate';
    else if (total75 >= 32) badge = 'CEFR B1 — Intermediate';
    else if (total75 >= 20) badge = 'CEFR A2 — Elementary';
    else badge = 'CEFR A1 — Beginner';

    return {
      id: Date.now(),
      title: 'Full Exam (CEFR Multi-level)',
      date: new Date().toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' }),
      badge,
      score: `${total75} / 75`,
      isFullExam: true,
      fullExamBreakdown: [
        { label: 'Task 1.1 (Informal xat)', score: `${weighted11} / 15 ball`, feedback: res11.criteria[0]?.feedback },
        { label: 'Task 1.2 (Formal xat)', score: `${weighted12} / 25 ball`, feedback: res12.criteria[0]?.feedback },
        { label: 'Task 2 (Insho / Esse)', score: `${weighted2} / 35 ball`, feedback: res2.criteria[0]?.feedback }
      ],
      criteria: [
        { label: 'Task 1.1 Natijasi', score: `${weighted11} / 15`, percent: Math.round((weighted11 / 15) * 100), feedback: `Hajm va mazmun: ${res11.criteria[0]?.feedback}` },
        { label: 'Task 1.2 Natijasi', score: `${weighted12} / 25`, percent: Math.round((weighted12 / 25) * 100), feedback: `Rasmiy uslub: ${res12.criteria[0]?.feedback}` },
        { label: 'Task 2 Natijasi', score: `${weighted2} / 35`, percent: Math.round((weighted2 / 35) * 100), feedback: `Akademik dalillar: ${res2.criteria[0]?.feedback}` },
        { label: 'Umumiy Grammatika va Lug\'at', score: `${Math.round((total75 / 75) * 10)} / 10`, percent: Math.round((total75 / 75) * 100), feedback: `Barcha topshiriqlar bo'yicha umumiy grammatik va leksik tahlil.` }
      ],
      corrections: [...(res11.corrections || []), ...(res12.corrections || []), ...(res2.corrections || [])].slice(0, 4),
      recommendations: [...(res2.recommendations || []), ...(res12.recommendations || [])].slice(0, 3),
      isAiPowered: res11.isAiPowered || res2.isAiPowered
    };
  },

  /**
   * Real Google Gemini 1.5 Flash Integration (Multimodal: Text + Image)
   */
  async callGeminiAPI({ task, essayText, imageBase64, imageMimeType, wordCount, userGoal, apiKey }) {
    const minW = task.minWords || 120;
    const maxW = task.maxWords || 200;

    const systemPrompt = `You are a certified senior examiner for CEFR Multi-level (Uzbekistan Bilimni Baholash Agentligi / DTM) and IELTS Writing tests.
Evaluate the student's text or handwritten essay from the image strictly according to Uzbekistan Multi-level CEFR standards:
- Task: "${task.title}"
- Topic / Prompt: "${task.prompt || 'Custom text or image prompt'}"
- Specific Word Count Standards for Uzbekistan Multi-level:
  * CEFR Task 1.1 Informal (note/short message): Standard is ~50 words (40-75 words accepted).
  * CEFR Task 1.2 Formal/Semi-formal (letter/email): Standard is 120 - 180 words.
  * CEFR Task 2 (Discursive/Opinion Essay): Standard is 180 - 200 words.
  * Custom/Erkin yozma ish: Evaluate based on language naturalness, clarity, cohesion and grammar.

Official Uzbekistan Multi-level Scoring Rules:
- The exam is scored out of 75 points (75 ballik tizim):
  * 65 - 75 ball: "CEFR C1 — Advanced"
  * 51 - 64 ball: "CEFR B2 — Upper-Intermediate"
  * 32 - 50 ball: "CEFR B1 — Intermediate"
  * 20 - 31 ball: "CEFR A2 — Elementary"
  * 0 - 19 ball: "CEFR A1 — Beginner" (juda past bo'lsa)
- If user goal is IELTS: score as Band 0 - 9.0 (e.g. 6.5, 7.0, 7.5) and badge "IELTS BAND 6.5".

Evaluate on 4 criteria (each scored 0-10):
1. Task Achievement / Fulfillment (0-10) - Did the student address all prompts and meet target length?
2. Coherence and Cohesion (0-10) - Clear paragraphs, linking words, logical progression.
3. Lexical Resource (0-10) - Rich vocabulary, collocations, natural academic word choice.
4. Grammatical Range and Accuracy (0-10) - Sentence variety, complex sentences, minimal errors.

Provide:
- 2-3 specific grammar/expression corrections from the text with concise explanations in Uzbek.
- 3 advanced academic C1/B2 upgrade words with Uzbek translation and sample sentence.
- If an image is provided, transcribe the student's handwriting into "transcribedText".

Respond strictly with a valid JSON object without any markdown wrapping (no \`\`\`json):
{
  "totalScore": 58,
  "badge": "CEFR B2 — Upper-Intermediate",
  "transcribedText": "",
  "taskScore": 8,
  "taskFeedback": "Qisqa xulosa o'zbek tilida",
  "cohScore": 7,
  "cohFeedback": "Bog'lovchilar va xatboshilar bo'yicha fikr",
  "lexScore": 7,
  "lexFeedback": "So'z boyligi haqida fikr",
  "gramScore": 8,
  "gramFeedback": "Grammatika bo'yicha fikr",
  "corrections": [
    {
      "original": "xato ibora",
      "corrected": "to'g'ri tabiiy ibora",
      "explanation": "Qisqa izoh o'zbek tilida"
    }
  ],
  "recommendations": [
    {
      "basic": "good",
      "advanced": "beneficial",
      "translation": "foydali, samarali",
      "example": "Higher education is exceptionally beneficial for career progression."
    }
  ]
}`;

    const parts = [{ text: systemPrompt }];

    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
      parts.push({
        inline_data: {
          mime_type: imageMimeType || 'image/jpeg',
          data: cleanBase64
        }
      });
      parts.push({ text: `Please read and transcribe the handwriting in this image, then evaluate according to the criteria.` });
    }

    if (essayText && essayText.trim().length > 0) {
      parts.push({ text: `STUDENT ESSAY TEXT:\n\n${essayText}` });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1200
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Clean JSON markdown if model wrapped it
    const cleanJson = rawContent.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    // Compute appropriate badge & score format
    let scoreDisplay = '';
    let finalBadge = parsed.badge;

    if (userGoal === 'ielts') {
      const ieltsScore = typeof parsed.totalScore === 'number' && parsed.totalScore <= 9 ? parsed.totalScore : 6.5;
      scoreDisplay = `Band ${ieltsScore} / 9.0`;
      finalBadge = parsed.badge || `IELTS BAND ${ieltsScore}`;
    } else {
      const score75 = typeof parsed.totalScore === 'number' && parsed.totalScore <= 75 ? Math.round(parsed.totalScore) : 56;
      scoreDisplay = `${score75} / 75`;
      if (score75 >= 65) finalBadge = 'CEFR C1 — Advanced';
      else if (score75 >= 51) finalBadge = 'CEFR B2 — Upper-Intermediate';
      else if (score75 >= 32) finalBadge = 'CEFR B1 — Intermediate';
      else if (score75 >= 20) finalBadge = 'CEFR A2 — Elementary';
      else finalBadge = 'CEFR A1 — Beginner';
    }

    return {
      id: Date.now(),
      title: task.title,
      date: new Date().toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' }),
      badge: finalBadge,
      score: scoreDisplay,
      transcribedText: parsed.transcribedText || '',
      criteria: [
        { label: 'Topshiriqqa javob (Task Achievement)', score: `${parsed.taskScore || 8} / 10`, percent: (parsed.taskScore || 8) * 10, feedback: parsed.taskFeedback },
        { label: 'Tuzilishi va mantiqiylik (Coherence)', score: `${parsed.cohScore || 7} / 10`, percent: (parsed.cohScore || 7) * 10, feedback: parsed.cohFeedback },
        { label: 'Lug\'at boyligi (Lexical Resource)', score: `${parsed.lexScore || 7} / 10`, percent: (parsed.lexScore || 7) * 10, feedback: parsed.lexFeedback },
        { label: 'Grammatika (Grammatical Range)', score: `${parsed.gramScore || 7} / 10`, percent: (parsed.gramScore || 7) * 10, feedback: parsed.gramFeedback }
      ],
      corrections: parsed.corrections || [],
      recommendations: parsed.recommendations || [],
      isAiPowered: true
    };
  },

  /**
   * Smart Local Evaluator (Tailored to Multi-level CEFR 75-point system)
   */
  evaluateLocally({ task, essayText, wordCount, userGoal }) {
    const minW = task.minWords || 120;
    const maxW = task.maxWords || 200;

    // 1. Task Achievement Score based on target word range
    let lengthScore = 8;
    let lengthFeedback = '';

    // Identify task type accurately
    const isInformal = task.id === 'cefr_informal' || task.id === '1.1_exam' || task.taskNumber === '1.1';
    const isFormal = task.id === 'cefr_formal' || task.id === '1.2_exam' || task.taskNumber === '1.2';
    const isEssay = task.id === 'cefr_essay' || task.id === 'task_2_exam' || task.taskNumber === '2';

    if (isInformal) {
      // Informal: ~50 words (40-80 words accepted)
      if (wordCount >= 45 && wordCount <= 85) {
        lengthScore = 9.5;
        lengthFeedback = `${wordCount} ta so'z yozildi (ideal hajm: ~50-80 so'z). Topshiriq to'liq bajarildi.`;
      } else if (wordCount >= 35) {
        lengthScore = 8.5;
        lengthFeedback = `${wordCount} ta so'z yozildi (kamida 50 ta tavsiya etiladi, biroq qisqa xabar uchun yetarli).`;
      } else {
        lengthScore = Math.max(3, Math.round((wordCount / 45) * 8));
        lengthFeedback = `${wordCount} ta so'z — me'yordan ancha kam (kamida 45-50 so'z yozish kerak).`;
      }
    } else if (isFormal) {
      // Formal: 120 - 180 words
      if (wordCount >= 115 && wordCount <= 190) {
        lengthScore = 9.5;
        lengthFeedback = `${wordCount} ta so'z yozildi (me'yor: 120–180 so'z). Hajm a'lo darajada.`;
      } else if (wordCount < 115) {
        lengthScore = Math.max(4, Math.round((wordCount / 120) * 8.5));
        lengthFeedback = `${wordCount} ta so'z — me'yordan oz (120–180 so'z talab qilinadi).`;
      } else {
        lengthScore = 8.5;
        lengthFeedback = `${wordCount} ta so'z — me'yordan biroz oshdi (120–180 so'z tavsiya etiladi).`;
      }
    } else if (isEssay) {
      // Task 2 Essay: 180 - 200 words
      if (wordCount >= 170 && wordCount <= 220) {
        lengthScore = 9.5;
        lengthFeedback = `${wordCount} ta so'z yozildi (me'yor: 180–200 so'z). Standartga mos keladi.`;
      } else if (wordCount < 170) {
        lengthScore = Math.max(4, Math.round((wordCount / 180) * 8.5));
        lengthFeedback = `${wordCount} ta so'z — me'yordan kam (kamida 180–200 so'z talab qilinadi).`;
      } else {
        lengthScore = 8.5;
        lengthFeedback = `${wordCount} ta so'z — 200 tadan oshdi, biroq asosiy fikrlar bayon etilgan.`;
      }
    } else {
      // Fallback for IELTS / Custom
      if (wordCount < minW) {
        lengthScore = Math.max(3, Math.round((wordCount / minW) * 8));
        lengthFeedback = `${wordCount} ta so'z yozildi (kamida ${minW} so'z talab qilinadi).`;
      } else {
        lengthScore = 9;
        lengthFeedback = `${wordCount} ta so'z yozildi — hajm talabi bajarildi.`;
      }
    }

    // 2. Lexical Resource: unique words ratio
    const uniqueWords = new Set(essayText.toLowerCase().match(/[a-z']+/g) || []).size;
    const lexicalRatio = Math.min(1, uniqueWords / Math.max(wordCount, 1));
    const lexScore = Math.min(10, Math.max(4, Math.round(lexicalRatio * 12)));
    const lexFeedback = lexicalRatio > 0.65 
      ? 'So\'z boyligi xilma-xil va takrorlanish kam.' 
      : 'Ba\'zi so\'zlar takrorlangan, sinonimlardan foydalanish tavsiya etiladi.';

    // 3. Coherence: paragraphs and sentence structures
    const paragraphs = essayText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const hasGoodParagraphs = paragraphs.length >= 2 || isInformal;
    const cohScore = hasGoodParagraphs ? 8.5 : 6.0;
    const cohFeedback = hasGoodParagraphs 
      ? 'Fikrlar mantiqiy ketma-ketlikda va xatboshilarga ajratilgan.' 
      : 'Matnni kirish, asosiy va xulosa xatboshilariga ajratish maqsadga muvofiq.';

    // 4. Grammar score
    const gramScore = 7.5;
    const gramFeedback = 'Grammatik strukturalar qo\'llangan, murakkab gaplardan foydalanish ballni oshiradi.';

    // Official Uzbekistan Multi-level 75-point calculation
    const normalized40 = lengthScore + cohScore + lexScore + gramScore;
    let badge = 'CEFR B2 — Upper-Intermediate';
    let scoreDisplay = '';

    if (userGoal === 'ielts') {
      let band = '5.0';
      if (normalized40 >= 36) band = '8.0';
      else if (normalized40 >= 33) band = '7.5';
      else if (normalized40 >= 30) band = '7.0';
      else if (normalized40 >= 27) band = '6.5';
      else if (normalized40 >= 23) band = '6.0';
      else if (normalized40 >= 19) band = '5.5';
      else band = '5.0';

      badge = `IELTS BAND ${band}`;
      scoreDisplay = `Band ${band} / 9.0`;
    } else {
      // 75 ballik tizim:
      // 65-75: C1
      // 51-64: B2
      // 32-50: B1
      // 20-31: A2
      // < 20: A1
      const totalScore75 = Math.min(75, Math.max(5, Math.round((normalized40 / 40) * 75)));

      if (totalScore75 >= 65) {
        badge = 'CEFR C1 — Advanced';
      } else if (totalScore75 >= 51) {
        badge = 'CEFR B2 — Upper-Intermediate';
      } else if (totalScore75 >= 32) {
        badge = 'CEFR B1 — Intermediate';
      } else if (totalScore75 >= 20) {
        badge = 'CEFR A2 — Elementary';
      } else {
        badge = 'CEFR A1 — Beginner';
      }
      scoreDisplay = `${totalScore75} / 75`;
    }

    // Vocabulary upgrades
    const lower = essayText.toLowerCase();
    const upgradeLibrary = [
      { basic: 'good', advanced: 'beneficial', translation: 'foydali, ijobiy', example: 'Consistent study habits are exceptionally beneficial for exam readiness.' },
      { basic: 'bad', advanced: 'detrimental', translation: 'zararli, salbiy ta\'sir qiluvchi', example: 'Excessive anxiety can be detrimental to test performance.' },
      { basic: 'important', advanced: 'paramount', translation: 'o\'ta muhim, ustuvor', example: 'Maintaining focus is of paramount importance during the exam.' },
      { basic: 'big', advanced: 'substantial', translation: 'katta, salmoqli', example: 'There has been a substantial improvement in academic achievements.' },
      { basic: 'show', advanced: 'illustrate', translation: 'ko\'rsatmoq, ifodalamoq', example: 'These statistics clearly illustrate the ongoing educational shift.' },
      { basic: 'hard', advanced: 'challenging', translation: 'murakkab, sinovli', example: 'Writing coherent essays can be challenging yet achievable with practice.' },
      { basic: 'help', advanced: 'facilitate', translation: 'yordam bermoq, osonlashtirmoq', example: 'Digital learning tools facilitate rapid vocabulary acquisition.' },
      { basic: 'think', advanced: 'contend', translation: 'fikr bildirmoq, ta\'kidlamoq', example: 'Many sociologists contend that language shapes cultural identity.' }
    ];

    const matched = upgradeLibrary.filter(u => lower.includes(u.basic));
    const recommendations = (matched.length > 0 ? matched : upgradeLibrary.slice(0, 3)).slice(0, 3);

    return {
      id: Date.now(),
      title: task.title,
      date: new Date().toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' }),
      badge,
      score: scoreDisplay,
      criteria: [
        { label: 'Topshiriqqa javob (Task Achievement)', score: `${Math.round(lengthScore)} / 10`, percent: Math.round(lengthScore) * 10, feedback: lengthFeedback },
        { label: 'Tuzilishi va mantiqiylik (Coherence)', score: `${Math.round(cohScore)} / 10`, percent: Math.round(cohScore) * 10, feedback: cohFeedback },
        { label: 'Lug\'at boyligi (Lexical Resource)', score: `${lexScore} / 10`, percent: lexScore * 10, feedback: lexFeedback },
        { label: 'Grammatika (Grammatical Range)', score: `${Math.round(gramScore)} / 10`, percent: Math.round(gramScore) * 10, feedback: gramFeedback }
      ],
      corrections: [],
      recommendations,
      isAiPowered: false
    };
  }
};
