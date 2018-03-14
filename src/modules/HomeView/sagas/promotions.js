import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
// import translations                                 from '../translations/general';
import PromotionManager from '../util/promotionManager';
import { default as PromotionActions, PromotionTypes }  from '../redux/promotions/actions';
const promotionManager = new PromotionManager();

const LOCALE = 'fi'

const fetchPromotions = function*() {
  console.warn('promotions...')
  try {
    console.warn('fetchprom...')
    const response = yield call(promotionManager.getUnreadPromotions)
    yield put(PromotionActions.getPromotionsSuccess(response))
  } catch(err) {
    console.log("error fetching hearings", err.message)
    yield put(PromotionActions.getPromotionsFailure(err.message))
  }
}

const watchGetPromotions = function*() {
  console.warn('getprom')
  yield takeLatest(PromotionTypes.GET_PROMOTIONS, fetchPromotions)
}

export {
  watchGetPromotions
}
