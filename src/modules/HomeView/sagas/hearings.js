import {
  put,
  call,
  takeLatest,
} from 'redux-saga/effects';
// import translations                                 from '../translations/general';
import { getConfig } from '../config';
import { makeRequest } from '../util/requests';
import { default as HearingActions, HearingTypes } from '../redux/hearings/actions';

const Config = getConfig();
const LOCALE = 'fi';

const getHeadlineForHearing = function(hearing) {
  return hearing.title[LOCALE] || hearing.title.fi
};

const fetchHearings = function*() {
  try {
    const response = yield call(makeRequest, Config.HEARINGS_API_BASE_URL + "?open=true&ordering=-n_comments", 'GET', null)
    const hearings = response.results.map((hearing) => {
      return {
        key: hearing.id,
        imageUrl: hearing.main_image.url,
        headline: getHeadlineForHearing(hearing),
        headline: 'hearings',
        urlSlug: hearing.slug,
      }
    });

    yield put(HearingActions.getHearingsSuccess(hearings));
  } catch(err) {
    console.log('error fetching hearings', err.message);
    yield put(HearingActions.getHearingsFailure(err.message));
  }
};


const watchGetHearings = function*() {
  yield takeLatest(HearingTypes.GET_HEARINGS, fetchHearings)
};

export {
  watchGetHearings,
};
