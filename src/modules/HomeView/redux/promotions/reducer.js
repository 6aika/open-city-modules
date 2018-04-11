import { createReducer } from 'reduxsauce';
import { PromotionTypes } from './actions';

const INITIAL_STATE = { promotionList: [], loading: false, error: null }

const setLoading = (state = INITIAL_STATE) => {
  return { ...state, loading: true }
}

const getPromotionsSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, promotionList: action.promotionList, loading: false }
}

const getPromotionsFailure = (state = INITIAL_STATE, action) => {
  return { ...state, error: action.error, loading: false }
}

const HANDLERS = {
  [PromotionTypes.GET_PROMOTIONS]: setLoading,
  [PromotionTypes.GET_PROMOTIONS_SUCCESS]: getPromotionsSuccess,
  [PromotionTypes.GET_PROMOTIONS_FAILURE]: getPromotionsFailure
}

export default createReducer(INITIAL_STATE, HANDLERS)
