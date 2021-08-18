import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
const resources = {
    en: {
        translation: {
            "card_training": "Card training",
            "profile": "Profile",
            "packs_lists": "Packs lists"
        }
    },
    ru: {
        translation: {
            "card_training": "Обучение по карточкам",
            "profile": "Личный кабинет",
            "packs_lists": "Наборы карточек"
        }
    }
};
i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        resources,
        //lng: document.querySelector('html')?.lang,
        detection: {
            order: ['localStorage', 'cookie', 'path', 'htmlTag', 'subdomain'],
            caches: ['localStorage'],
        },
        // backend: {
        //     loadPath: '/locales/{{lng}}/translation.json',
        // },

        // interpolation: {
        //     escapeValue: false, // not needed for react as it escapes by default
        // }
    });


export default i18n;