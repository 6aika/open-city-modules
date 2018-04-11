
import { watchGetHeroContent, watchGetEvents, watchGetEvent } from './events';
import { watchGetHearings } from './hearings';
import { watchGetFeedList } from './feed';
import { watchGetPromotions } from './promotions';

const sagas = function* sagas() {
  yield [
    watchGetHeroContent(),
    watchGetHearings(),
    watchGetEvents(),
    watchGetEvent(),
    watchGetFeedList(),
    watchGetPromotions(),
  ];
};

export default sagas;
