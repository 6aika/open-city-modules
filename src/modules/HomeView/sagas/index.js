
import { watchGetHeroContent, watchGetEvents, watchGetEvent } from './events';
import { watchGetHearings } from './hearings';
import { watchGetFeedList } from './feed';

const sagas = function* sagas() {
  yield [
    watchGetHeroContent(),
    watchGetHearings(),
    watchGetEvents(),
    watchGetEvent(),
    watchGetFeedList(),
  ];
};

export default sagas;
