import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import { t } from 'open-city-modules/src/modules/translations';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventActions from '../redux/events/actions';
import HearingActions from '../redux/hearings/actions';
import FeedActions from '../redux/feed/actions';
import Hero from './Hero';
import MenuItem from './MenuItem';
import { getConfig, feeds } from '../config';
import HearingList from './HearingList';
import EventList from './EventList';
import FeedList from './FeedList';
import styles from '../styles';

const Config = getConfig();

class HomeView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {
      showEvents = true,
      showHearings = true,
      showFeed = true,
      showHero = true,
    } = this.props.screenProps;

    if (showHero) {
      this.props.eventActions.getHero();
    }

    if (showEvents) {
      this.props.eventActions.getList();
    }

    if (showHearings) {
      this.props.hearingActions.getHearings();
    }
  }

  goToFeedListView = feed => this.props.navigation.navigate('FeedListView', { feed });

  render() {
    const {
      heroEvent,
      hearingList,
      eventList,
      feedList,
      heroLoading,
    } = this.props;
    const {
      Header,
      heroBanner,
      showHero = true,
      showEvents = true,
      showHearings = true,
      showFeed = true,
    } = this.props.screenProps;

    return (
      <View style={{ flex: 1 }}>
        <Header />
        <ScrollView style={styles.container}>
          <View>
            { !showHero &&
              <View>
                <View style={styles.heroOverlay} />
                <Image
                  source={heroBanner}
                  resizeMode="cover"
                  style={styles.heroDecoration}
                />
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
                  onPress={() => this.goToFeedListView(feed)}
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    eventActions: bindActionCreators(EventActions, dispatch),
    hearingActions: bindActionCreators(HearingActions, dispatch),
    feedActions: bindActionCreators(FeedActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
