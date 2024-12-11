let language: string = 'en';

import ru from './src/ru.json';
import en from './src/en.json';

export class Translate {
    getTranslate(tag: string) {
        const translations = (language === 'ru') ? ru : en;
        return translations[tag] || '';
    }

    toggleLang() {
        language = ( language === 'en') ? 'ru' : 'en';
    }
}