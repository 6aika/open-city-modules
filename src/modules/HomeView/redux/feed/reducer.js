import { createReducer } from 'reduxsauce';
import { FeedTypes } from './actions';

const INITIAL_STATE = { feedList: [], loading: false, error: null }

const setLoading = (state = INITIAL_STATE) => {
  return { ...state, loading: true };
};

const getFeedListSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, feedList: action.feedList, loading: false };
};

const getFeedListFailure = (state = INITIAL_STATE, action) => {
  return { ...state, error: action.error, loading: false };
};


const HANDLERS = {
  [FeedTypes.GET_FEED_LIST]: setLoading,
  [FeedTypes.GET_FEED_LIST_SUCCESS]: getFeedListSuccess,
  [FeedTypes.GET_FEED_LIST_FAILURE]: getFeedListFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
