const translations = {
  en: {
    WebViewError: 'Error when loading webpage',
    toDo: 'Things to do',
    hearings: 'Voice your opinion',
    feeds: 'Feeds',
    news: 'News',
    events: 'Events',
    announcements: 'Announcements',
    articles: 'Articles',
    published: 'Published',
    linknews: 'Read the whole story',
    linkevents: 'View event details',
    linkannouncements: 'Read the whole announcement',
    linkarticles: 'Read the whole article',
    loading: 'Loading',
  },
  fi: {
    WebViewError: 'Virhe ladatessa nettisivua',
    toDo: 'Tekemistä sinulle',
    hearings: 'Kerro kantasi',
    news: 'Uutiset',
    events: 'Tapahtumat',
    announcements: 'Ilmoitukset',
    articles: 'Artikkelit',
    feeds: 'Ajankohtaista',
    published: 'Julkaistu',
    linknews: 'Lue koko uutinen',
    linkevents: 'Katso tapahtuman tiedot',
    linkannouncements: 'Lue koko ilmoitus',
    linkarticles: 'Lue koko artikkeli',
    loading: 'Ladataan',
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

// export default translations;
