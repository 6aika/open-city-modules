import defaultConfig from 'open-city-modules/src/modules/HomeView/config.json';
import news from 'open-city-modules/img/news.png';
import events from 'open-city-modules/img/events.png';
import announcements from 'open-city-modules/img/announcements.png';
import articles from 'open-city-modules/img/articles.png';

let config = defaultConfig;
export const configureHomeView = (configJSON) => {
  config = Object.assign(defaultConfig, configJSON);
};

export const getConfig = () => config;

export const feeds = [
  {
    name: 'news',
    icon: news,
    url: 'https://www.tampere.fi/tampereen-kaupunki/ajankohtaista/tiedotteet/rss.xml.stx',
  }, {
    name: 'events',
    icon: events,
    url: 'https://www.tampere.fi/tampereen-kaupunki/ajankohtaista/tapahtumat/rss2.xml.stx',
  }, {
    name: 'announcements',
    icon: announcements,
    url: 'https://www.tampere.fi/tampereen-kaupunki/ajankohtaista/ilmoitukset/rss.xml',
  }, {
    name: 'articles',
    icon: articles,
    url: 'https://www.tampere.fi/tampereen-kaupunki/ajankohtaista/artikkelit/rss.xml.stx',
  },
];
