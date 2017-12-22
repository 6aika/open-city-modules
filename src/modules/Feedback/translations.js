/* @flow */
const translations = {
  en: {
    map: 'Map',
    list: 'List',
    cancel: 'Cancel',
    takePhoto: 'Take photo',
    choosePhoto: 'Choose photo',
    newFeedback: 'New feedback',
    includeLocation: 'Include location in feedback',
    type: 'Type',
    typePlaceholder: 'Choose type',
    topic: 'Topic',
    topicPlaceholder: 'Feedback\'s topic',
    feedback: 'Feedback',
    feedbackPlaceholder: 'Write your feedback or suggestion',
    addAttachment: 'Add attachment',
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
    open: 'Open',
    closed: 'Closed',
    serviceRequestReceived: 'Service request received',
  },
  fi: {
    map: 'Kartta',
    list: 'Lista',
    cancel: 'Peruuta',
    takePhoto: 'Ota kuva',
    choosePhoto: 'Valitse kuva',
    newFeedback: 'Uusi palaute',
    includeLocation: 'Sisällytä sijainti palautteeseen',
    type: 'Tyyppi',
    typePlaceholder: 'Valitse tyyppi',
    topic: 'Otsikko',
    topicPlaceholder: 'Palautteen otsikko',
    feedback: 'Palaute',
    feedbackPlaceholder: 'Kirjoita tähän palaute tai kehitysehdotus',
    addAttachment: 'Lisää liite',
    january: 'Tammikuu',
    february: 'Helmikuu',
    march: 'Maaliskuu',
    april: 'Huhtikuu',
    may: 'Toukokuu',
    june: 'Kesäkuu',
    july: 'Heinäkuu',
    august: 'Elokuu',
    september: 'Syyskuu',
    october: 'Lokakuu',
    november: 'Marraskuu',
    december: 'Joulukuu',
    open: 'Avoin',
    closed: 'Suljettu',
    serviceRequestReceived: 'Palvelupyyntö vastaanotettu',
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
