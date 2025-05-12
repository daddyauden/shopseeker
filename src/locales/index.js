import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en.json";
import fr from "./fr.json";
import zh_CN from "./zh-CN.json";

export const LANGUAGES = {
    en: {
        translation: en,
    },
    fr: {
        translation: fr,
    },
    "zh-CN": {
        translation: zh_CN,
    },
};

export const defaultLocale = "en";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        resources: LANGUAGES,
        partialBundledLanguages: false,
        lng: defaultLocale,
        fallbackLng: defaultLocale,
        supportedLngs: Object.keys(LANGUAGES),
        preload: Object.keys(LANGUAGES),
        interpolation: {
            escapeValue: false,
        },
        keySeparator: [".", "-"],
    });

export const trans = i18n.t.bind(i18n);
export const isRTL = i18n.dir(i18n.language) === "rtl";

i18n.t = trans;
i18n.isRTL = isRTL;

export default i18n;
