import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getFeedList: ['feedUrl'],
  getFeedListSuccess: ['feedList'],
  getFeedListFailure: ['error'],
});

export const FeedTypes = Types;
export default Creators;
