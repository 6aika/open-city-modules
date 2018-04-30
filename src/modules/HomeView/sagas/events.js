import {
  select,
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
// import translations                             from '../translations/general';
import Moment from 'moment';
import Twix from 'twix';
import 'moment/locale/fi';
import 'moment/locale/sv';
import { stripTags, unescapeHTML } from 'underscore.string';
import { getConfig } from '../config';
import { makeRequest } from '../util/requests';
import { default as EventActions, EventTypes } from '../redux/events/actions';

const Config = getConfig();
// const LOCALE = translations.getLanguage()
const LOCALE = 'fi';

const fetchHero = function*() {
  try {
    if (heroLink === undefined) {
      throw new Error('Missing link URL in hero.')
    }
    const { heroLink, myHelsinkiEventData } = yield call(fetchHeroLink)
    const linkedEventsEventData = yield call(makeRequest, heroLink + "?include=location", 'GET', null)
    yield put(EventActions.getHeroSuccess(parseHeroData(linkedEventsEventData, myHelsinkiEventData)))
  } catch (err) {
    yield put(EventActions.getHeroFailure(err.message))
  }
}

const getEvents = function*() {
  try {
    const currentTime = Moment(new Date()).format('YYYY-MM-DD');
    const url = Config.LINKED_EVENTS_API_BASE_URL + Config.LINKED_EVENTS_GET_PARAMS + '&start=' + currentTime;
    const response = yield call(makeRequest, url, 'GET', null)
    const eventList = parseEventList(response.data)
    yield put(EventActions.getListSuccess(eventList))
  } catch (err) {
    yield put(EventActions.getListFailure(err.message))
  }
}

const getEvent = function*(args) {
  try {

    let event = undefined
    const hero = yield select(state => state.events.heroEvent)

    if(args.eventUrl === hero.eventUrl) {
      event = hero
    } else {
      const eventData = yield call(makeRequest, args.eventUrl + "?include=location", 'GET', null)
      event = parseEventData(eventData)
    }
    yield put(EventActions.getEventSuccess(event))
  } catch(err) {
    yield put(EventActions.getEventFailure(err.message))
  }
}

const parseHeroData = (linkedEventData, myHelsinkiEventData) => {
  let parsedEvent = {
    eventUrl: linkedEventData["@id"]
  }

  parsedEvent.date = getEventDuration(linkedEventData)
  parsedEvent.place = getEventPlace(linkedEventData) || myHelsinkiEventData.field_promotion_link[0].field_location_name
  parsedEvent.headline = getEventHeadline(linkedEventData) || myHelsinkiEventData.field_promotion_link[0].title
  parsedEvent.description = getEventDescription(linkedEventData) || stripHTML(myHelsinkiEventData.field_promotion_link[0].field_description)
  parsedEvent.region = getEventRegion(linkedEventData, myHelsinkiEventData.field_promotion_link[0].field_geolocation[0])
  parsedEvent.imageUrl = getEventImage(linkedEventData) || myHelsinkiEventData.field_image_video[0].thumbnail[0].styles.card

  return parsedEvent
}

const parseEventData = (linkedEventData) => {
  let linkedEvent = linkedEventData;
  if (linkedEvent.data) linkedEvent = linkedEvent.data;
  return {
    key: linkedEvent["@id"],
    eventUrl: linkedEvent["@id"],
    date: getEventDuration(linkedEvent),
    place: getEventPlace(linkedEvent),
    headline: getEventHeadline(linkedEvent),
    description: getEventDescription(linkedEvent),
    region: getEventRegion(linkedEvent),
    imageUrl: getEventImage(linkedEvent)
  }
}

// Kludge: this will filter some valid events too, e.g. ones with just the picture missing
// TODO: Set up placeholder data for parts that are placeholdable
const parseEventList = (linkedEventList) => {
  return linkedEventList
    .map(parseEventData)
    .filter((parsedEvent) => {
      // return parsedEvent
      return Object.values(parsedEvent).every((item) => {
        return (item !== undefined && item !== null && item !== "")
      })
    })
}

const getEventPlace = (linkedEvent) => {
  if(!linkedEvent.location || !linkedEvent.location.name || !linkedEvent.location.name.length===0) {
    return null
  }
  return linkedEvent.location.name[LOCALE]
}

const getEventHeadline = (linkedEvent) => {
  if(!linkedEvent.name) {
    return null
  }
  return linkedEvent.name[LOCALE]
}

const getEventImage = (linkedEvent) => {
  if (linkedEvent.images && linkedEvent.images.length > 0) {
    return linkedEvent.images[0].url;
  } else if (linkedEvent.image && linkedEvent.image.length > 0) {
    return linkedEvent.image;
  }

  return null;
};

const getEventDuration = (linkedEvent) => {
  Moment.locale(LOCALE)
  if(!linkedEvent.start_time) {
    return null
  }
  if(!linkedEvent.end_time) {
    return Moment(linkedEvent.start_time).format("DD.MM HH:mm")
  }
  return Moment(linkedEvent.start_time).twix(linkedEvent.end_time, {allDay:true}).format({
    hourFormat: "H"
  })
}

const getEventRegion = (linkedEvent, myHelsinkiLocation) => {

  let parsedLocation = {
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  }

  parsedLocation.latitude = linkedEvent.location && linkedEvent.location.position && linkedEvent.location.position.coordinates[1] || myHelsinkiLocation && myHelsinkiLocation.lat
  parsedLocation.longitude = linkedEvent.location && linkedEvent.location.position && linkedEvent.location.position.coordinates[0] || myHelsinkiLocation && myHelsinkiLocation.lng

  return parsedLocation
}

const getEventDescription = (linkedEvent) => {
  if(!linkedEvent.description || !linkedEvent.description[LOCALE]) {
    return null
  }

  const description = linkedEvent.description[LOCALE]
  return stripHTML(description)
}

const stripHTML = (text) => {
  const escaped = unescapeHTML(text)
  const stripped = stripTags(text)

  return stripped
}

const fetchHeroLink = function() {
  return makeRequest(Config.FEATURED_EVENT_API_BASE_URL, 'GET', null)
    .then((response) => {
      const heroLink = response.field_hero_carousel[0].field_promotion_link[0].field__id
      const myHelsinkiEventData = response.field_hero_carousel[0]
      return { heroLink, myHelsinkiEventData }
    })
}

const watchGetHeroContent = function*() {
  yield takeLatest(EventTypes.GET_HERO, fetchHero)
}

const watchGetEvents = function*() {
  yield takeLatest(EventTypes.GET_LIST, getEvents)
}

const watchGetEvent = function*() {
  yield takeLatest(EventTypes.GET_EVENT, getEvent)
}

export {
  watchGetHeroContent,
  watchGetEvents,
  watchGetEvent
}
