import {
  select,
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
// import translations                             from '../translations/general';
import Moment from 'moment';
import 'moment/locale/fi';
import 'moment/locale/sv';
import { stripTags, unescapeHTML } from 'underscore.string';
import he from 'he';
import EventIcon from 'open-city-modules/img/events.png'
import { getConfig } from '../config';
import { parseString } from 'react-native-xml2js';
import { xmlRequest } from '../util/requests';
import { default as FeedActions, FeedTypes } from '../redux/feed/actions';

const Config = getConfig();
// const LOCALE = translations.getLanguage()
const LOCALE = 'fi';


const parseFeedList = (feedListData) => {
  return new Promise(function(resolve, reject) {
    parseString(feedListData, (err, result) => {
      const data = result.rss.channel[0].item.map((item) => {
        const dateObj = new Date(item.pubDate[0]);
        const date = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;
        return {
          title: item.title[0],
          description: he.decode(item.description[0].replace('<p>', '').replace('</p>', '')),
          date,
          link: item.link[0],
          image: EventIcon,
          headline: item.title[0],
        };
      });

      resolve(data);
    }).catch((error) => {
      clearTimeout(timeoutId);
      reject(error);
    });
  });
    // return { title: 'test', description: 'testdesc', link: 'www.google.com'}
};

const getFeedList = function*({ feedUrl }) {
  try {
    const response = yield call(xmlRequest, feedUrl)
    const parsedResponse = yield call(parseFeedList, response._bodyText)
    yield put(FeedActions.getFeedListSuccess(parsedResponse))


  } catch (err) {
    yield put(FeedActions.getFeedListFailure(err.message))
  }
}

const watchGetFeedList = function*() {
  yield takeLatest(FeedTypes.GET_FEED_LIST, getFeedList)
}


export {
  watchGetFeedList,
}
