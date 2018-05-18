import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Linking,
} from 'react-native';
import { changeLanguage, t } from 'open-city-modules/src/modules/translations';
import { connect } from 'react-redux';
import HeroDecoration from 'open-city-modules/img/main-hero-decoration.png';
import Wave from 'open-city-modules/src/modules/HomeView/components/Wave';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import EventActions from '../redux/events/actions';
import HearingActions from '../redux/hearings/actions';
import FeedActions from '../redux/feed/actions';
import PromotionActions from '../redux/promotions/actions';
import Hero from './Hero';
import MenuItem from './MenuItem';
import { getConfig, getFeeds, getPromotions } from '../config';
import HearingList from './HearingList';
import EventList from './EventList';
import Promotion from './Promotion';
import styles from '../styles';
import PromotionManager from '../util/promotionManager';

const promotionManager = new PromotionManager();
const Config = getConfig();

const feeds = getFeeds();

class HomeView extends Component {
  constructor(props) {
    super(props);

    this.goToFeedListView = this.goToFeedListView.bind(this);
  }

  componentWillMount() {
    const {
      showEvents = true,
      showHearings = true,
      showFeed = true,
      showHero = true,
      showPromotions = true,
    } = this.props.screenProps;

    if (showHero) {
      this.props.eventActions.getHero();
    }

    if (showPromotions) {
      this.props.promotionActions.getPromotions();
    }

    if (showEvents) {
      this.props.eventActions.getList();
    }

    if (showHearings) {
      this.props.hearingActions.getHearings();
    }

    if (this.props.screenProps.locale) {
      changeLanguage(this.props.screenProps.locale);
    }

    Linking.getInitialURL().then((url) => {
      //this.loading = true;
      if (url) console.warn(url);
    }).catch((err) => {
      // console.warn('Error occured', err);
    });
  }

  componentWillReceiveProps(nextProps: ModuleProps) {
    if (this.props.screenProps.locale !== nextProps.screenProps.locale) {
      changeLanguage(nextProps.screenProps.locale);
    }
  }

  onPromotionClose = (id) => {
    promotionManager.markPromotionAsRead(id);
  }

  goToFeedListView = (feed) => () => this.props.navigation.navigate('FeedListView', { feed });

  render() {
    const {
      heroEvent,
      hearingList,
      eventList,
      feedList,
      promotionList,
      heroLoading,
    } = this.props;

    const {
      Header,
      heroBanner = HeroDecoration,
      showHero = true,
      showEvents = true,
      showHearings = true,
      showFeed = true,
      showPromotions = true,
      homeViewBGColor = 'white',
    } = this.props.screenProps;

    return (
      <View style={{ flex: 1, backgroundColor: homeViewBGColor }}>
        {!!Header &&
          <Header />
        }
        <ScrollView style={styles.container}>
          <View>
            { !showHero &&
              <View>
                <View style={styles.heroOverlay} />
                <Wave topColor={EStyleSheet.value('$colors.max')} />
              </View>
            }
            { showHero &&
            <Hero
              banner={heroBanner}
              imageUrl={heroEvent.imageUrl}
              date={heroEvent.date}
              place={heroEvent.place}
              headline={heroEvent.headline}
              eventUrl={heroEvent.eventUrl}
              loading={heroLoading}
              navigation={this.props.navigation}
            />
            }
            { showPromotions &&
              <View style={styles.promotionsContainer}>
                { promotionList.map((item, index) => {
                  const child = index < promotionList.length ? promotionList[index + 1] : null;

                  return (
                    <Promotion
                      navigation={this.props.screenProps.rootNavigation}
                      promotion={item}
                      index={index}
                      onClose={(id) => this.onPromotionClose(id)}
                    />
                  );
                })}
              </View>
            }
            { showEvents &&
              <EventList
                navigation={this.props.navigation}
                eventList={eventList}
              />
            }
          </View>

          { showHearings &&
            <HearingList
              navigation={this.props.navigation}
              hearingList={hearingList}
            />
          }
          { showFeed &&
            <View style={styles.feedContainer}>
              { feeds.map(feed => (
                <MenuItem
                  key={feed.name}
                  label={t(feed.name)}
                  icon={feed.icon}
                  onPress={this.goToFeedListView(feed)}
                />
              ))}
            </View>
          }
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    heroEvent: state.events.heroEvent,
    heroLoading: state.events.heroLoading,
    hearingList: state.hearings.hearingList,
    eventList: state.events.eventList,
    feedList: state.feed.feedList,
    promotionList: state.promotions.promotionList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    eventActions: bindActionCreators(EventActions, dispatch),
    hearingActions: bindActionCreators(HearingActions, dispatch),
    feedActions: bindActionCreators(FeedActions, dispatch),
    promotionActions: bindActionCreators(PromotionActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
