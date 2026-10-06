// VocabReminder - Export & Import Backup Service
export const backupService = {
  // 1. Export to JSON (Full Backup)
  exportToJSON: (words, user = {}) => {
    if (!words || words.length === 0) {
      throw new Error('Eksport qilish uchun lug\'atda kamida bitta so\'z bo\'lishi kerak');
    }

    const backupData = {
      app: 'VocabReminder',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      user: {
        name: user.name || 'User',
        goal: user.goal || 'general'
      },
      wordCount: words.length,
      words: words
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(backupData, null, 2)
    )}`;
    
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    const dateStr = new Date().toISOString().split('T')[0];
    downloadAnchor.setAttribute('download', `vocabreminder-backup-${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  // 2. Export to CSV (Excel-compatible with UTF-8 BOM for Uzbek characters)
  exportToCSV: (words) => {
    if (!words || words.length === 0) {
      throw new Error('Eksport qilish uchun lug\'atda kamida bitta so\'z bo\'lishi kerak');
    }

    const headers = ['So\'z (English)', 'Tarjima (Uzbek)', 'Transkripsiya', 'Misol (Example)', 'Qayd (Note)', 'Quti (Leitner Box)', 'Teg (Tag)'];
    
    const rows = words.map(w => [
      `"${(w.word || '').replace(/"/g, '""')}"`,
      `"${(w.translation || '').replace(/"/g, '""')}"`,
      `"${(w.transcription || '').replace(/"/g, '""')}"`,
      `"${(w.example || '').replace(/"/g, '""')}"`,
      `"${(w.note || '').replace(/"/g, '""')}"`,
      w.box || 1,
      `"${(w.tag || '').replace(/"/g, '""')}"`
    ]);

    // Prepend UTF-8 BOM (\uFEFF) so Excel opens UTF-8 properly without garbling characters
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', url);
    const dateStr = new Date().toISOString().split('T')[0];
    downloadAnchor.setAttribute('download', `vocabreminder-lugat-${dateStr}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);
  },

  // 3. Parse File for Import
  parseImportFile: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target.result;
          
          // Try JSON first
          if (file.name.endsWith('.json')) {
            const data = JSON.parse(content);
            const rawList = Array.isArray(data) ? data : (data.words || []);
            
            const validWords = rawList.filter(item => item && item.word && item.translation).map(item => ({
              id: Date.now().toString() + Math.random().toString().slice(2, 6),
              word: String(item.word).trim(),
              translation: String(item.translation).trim(),
              transcription: item.transcription ? String(item.transcription).trim() : `/${String(item.word).toLowerCase().trim()}/`,
              example: item.example ? String(item.example).trim() : '',
              note: item.note ? String(item.note).trim() : 'Zaxiradan tiklangan',
              tag: item.tag ? String(item.tag).trim() : '',
              box: typeof item.box === 'number' ? item.box : 1,
              nextReviewDate: item.nextReviewDate || new Date().toISOString(),
              reviewCount: item.reviewCount || 0,
              correctCount: item.correctCount || 0,
              incorrectCount: item.incorrectCount || 0,
              isFavorite: Boolean(item.isFavorite),
              createdAt: item.createdAt || new Date().toISOString()
            }));

            if (validWords.length === 0) {
              return reject(new Error('Faylda yaroqli so\'zlar topilmadi.'));
            }
            return resolve(validWords);
          }

          // Otherwise parse as CSV / TXT
          const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
          const validWords = [];

          // Skip header if first line contains 'word' or 'so\'z'
          const startIdx = lines[0].toLowerCase().includes('word') || lines[0].toLowerCase().includes('so\'z') ? 1 : 0;

          for (let i = startIdx; i < lines.length; i++) {
            const line = lines[i];
            // Split by comma, tab, or dash
            let parts = [];
            if (line.includes('\t')) {
              parts = line.split('\t');
            } else if (line.includes('","') || (line.includes(',') && !line.includes(' - '))) {
              // CSV format
              parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(p => p.replace(/^"|"$/g, '').trim());
            } else {
              // Plain text "word - tarjima"
              parts = line.split(/[-–—:=]/);
            }

            if (parts.length >= 2) {
              const word = parts[0]?.trim();
              const translation = parts[1]?.trim();
              if (word && translation) {
                validWords.push({
                  id: Date.now().toString() + Math.random().toString().slice(2, 6) + i,
                  word,
                  translation,
                  transcription: `/${word.toLowerCase()}/`,
                  example: parts[3] ? parts[3].trim() : '',
                  note: parts[4] ? parts[4].trim() : 'Fayldan import qilingan',
                  tag: parts[6] ? parts[6].trim() : '',
                  box: 1,
                  nextReviewDate: new Date().toISOString(),
                  reviewCount: 0,
                  correctCount: 0,
                  incorrectCount: 0,
                  isFavorite: false,
                  createdAt: new Date().toISOString()
                });
              }
            }
          }

          if (validWords.length === 0) {
            return reject(new Error('Fayldan birorta ham so\'z ajratib olinmadi. Iltimos formatni tekshiring.'));
          }

          resolve(validWords);
        } catch (err) {
          reject(new Error('Faylni o\'qishda xatolik yuz berdi: ' + err.message));
        }
      };

      reader.onerror = () => reject(new Error('Fayl yuklashda xatolik yuz berdi'));
      reader.readAsText(file);
    });
  }
};
