import {
  put,
  call,
  takeLatest,
} from 'redux-saga/effects';
import PromotionManager from '../util/promotionManager';
import { default as PromotionActions, PromotionTypes } from '../redux/promotions/actions';

const promotionManager = new PromotionManager();

const LOCALE = 'fi';

const fetchPromotions = function*() {
  try {
    const response = yield call(promotionManager.getUnreadPromotions)
    yield put(PromotionActions.getPromotionsSuccess(response))
  } catch(err) {
    console.log('error fetching promotions', err.message)
    yield put(PromotionActions.getPromotionsFailure(err.message))
  }
}

const watchGetPromotions = function*() {
  yield takeLatest(PromotionTypes.GET_PROMOTIONS, fetchPromotions)
}

export {
  watchGetPromotions
}
