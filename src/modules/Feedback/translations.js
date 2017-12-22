/* @flow */
const translations = {
  en: {
    map: 'Map',
    list: 'List',
  },
  fi: {
    map: 'Kartta',
    list: 'Lista',
  },
};

let locale = 'fi';
const changeLanguage = (lang: string) => {
  if (Object.keys(translations).includes(lang)) {
    locale = lang;
  }
};
const t = (key: $Keys<typeof translations.fi>) => translations[locale][key];
export { changeLanguage, t };
