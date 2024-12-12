let language: string = 'en';
let translations: Record<string, any> = {};

async function loadTranslations() {
    if (language == 'en') {
        translations = {
            "nfoc": "No files opened currently...",
            "ecffb": "ESC - Close F - File Browser"
        }
    } else if (language == 'ru') {
        translations =  {
            "nfoc": "Нет открытых файлов...",
            "ecffb": "ESC - Закрыть F - Файловый Менеджер"
        }
    }
}

export class Translate {
    async getTranslate(tag: string) {
        if (Object.keys(translations).length === 0) {
            await loadTranslations();
        }
        return translations[tag] || '';
    }

    toggleLang() {
        language = ( language === 'en') ? 'ru' : 'en';
        loadTranslations();
    }
}