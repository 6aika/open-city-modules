import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getFeedList: null,
  getFeedListSuccess: ['feedList'],
  getFeedListFailure: ['error'],
});

export const FeedTypes = Types;
export default Creators;
