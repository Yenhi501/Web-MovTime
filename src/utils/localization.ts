import localizationConstants from '../constants/localization';
import { LOCALIZATION } from '../constants/const';

const { REGIONS } = localizationConstants;

export const getCurrentLanguage = () => {
    const storedLanguage = localStorage.getItem(LOCALIZATION);
    const language = storedLanguage ? JSON.parse(storedLanguage) : REGIONS.en.key;
    return language;
};

export const changeLanguage = (language: string) => {
    const currentLanguage = getCurrentLanguage();
    if (language === currentLanguage) return;

    localStorage.setItem(LOCALIZATION, JSON.stringify(language));
    window.location.reload();
};

export default {
    getCurrentLanguage,
    changeLanguage,
};
