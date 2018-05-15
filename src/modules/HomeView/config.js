import defaultConfig from 'open-city-modules/src/modules/HomeView/config.json';
import { t } from 'open-city-modules/src/modules/translations';
import news from 'open-city-modules/img/news.png';
import events from 'open-city-modules/img/events.png';
import announcements from 'open-city-modules/img/announcements.png';
import articles from 'open-city-modules/img/articles.png';

const defaultFeeds = [
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

const defaultPromotions = [
  {
    id: 'prom1',
    title: 'Tämä on mainos',
    body: 'Tässä on mainoksen kuvaus',
    bgColor: 'green',
    textColor: 'white',
  },
];

let config = defaultConfig;
let feeds = defaultFeeds;
let promotions = defaultPromotions;

export const configureHomeView = (configJSON, customFeeds = defaultFeeds, customPromotions = promotions) => {
  config = Object.assign(defaultConfig, configJSON);
  feeds = customFeeds;
  promotions = customPromotions;
};

export const getConfig = () => config;

export const getFeeds = () => feeds;

export const getPromotions = () => promotions;
