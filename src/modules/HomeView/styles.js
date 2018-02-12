import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions  } from 'react-native';

const BRAND_LIGHT_ONE = '#ffc61e'; // Helsinki Summer
const BRAND_LIGHT_TWO = '#9fc9eb'; // Helsinki Fog
const BRAND_LIGHT_THREE = '#00d7a7'; // Helsinki Copper

const BRAND_DARK_ONE = '#0000bf'; // Helsinki Bus
const BRAND_DARK_TWO = '#fd4f00'; // Helsinki Metro
const BRAND_DARK_THREE = '#009246'; // Helsinki Tram

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$colors.homebg',
  },
  icon: {
    width: 26,
    height: 26,
  },
  headerLogo: {
    height: 26,
  },
  cardWrapper: {
    width: 240,
    backgroundColor: '$colors.min',
  },
  cardImage: {
    width: undefined,
    minHeight: 240,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cardOverlay: {
    minHeight: 100,
    width: '100%',
    padding: 10,
  },
  list: {
    alignItems: 'stretch',
  },
  listItemMargin: {
    marginHorizontal: 10,
  },
  eventWrapper: {
    flex: 1,
    backgroundColor: '$colors.homebg',
    paddingTop: 50,
    paddingBottom: 50,
  },
  hearingWrapper: {
    flex: 1,
    backgroundColor: '$colors.homebg',
    paddingTop: 50,
    paddingBottom: 50,
  },
  headline: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  heroWrapper: {
    alignContent: 'flex-start',
    flexDirection: 'column',
  },
  heroImage: {
    width: undefined,
    height: 250,
  },
  heroDecoration: {
    width: '100%',
    height: 30,
    tintColor: '$colors.homefg',
  },
  heroOverlay: {
    backgroundColor: '$colors.homefg',
    paddingTop: 30,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  heroHeadline: 40,
  heroPlace: 20,
  heroDate: 20,
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    backgroundColor: '$colors.min',
  },
  image: {
    width: undefined,
    height: 250,
  },
  headerImage: {
    marginBottom: 30,
  },
  headerImageDecoration: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 30,
  },
  centeredContent: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  date: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 16,
  },
  textBlockNarrow: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
  },
  textBlock: {
    marginTop: 10,
    marginBottom: 10,
  },
  map: {
    height: 250,
    width: Dimensions.get('window').width,
  },
  markerIcon: {
    height: 30,
    width: 30,
  },
  feedContainer: {
    flex: 1,
    alignItems: 'stretch',
    borderRadius: 2,
    marginTop: 5,
    marginBottom: 10,
  },
  headlineText: 30,
  cardHeadline: 20,
});

export default styles;
