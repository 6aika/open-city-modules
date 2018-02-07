import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventActions from '../redux/events/actions';
import HearingActions from '../redux/hearings/actions';
import FeedActions from '../redux/feed/actions';
import Hero from './Hero';
import HearingList from './HearingList';
import EventList from './EventList';
import styles from '../styles';

class HomeView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {
      showEvents = true,
      showHearings = true,
      showFeed = true,
    } = this.props.screenProps;

    if (showEvents) {
      this.props.eventActions.getHero();
      this.props.eventActions.getList();
    }

    if (showHearings) {
      this.props.hearingActions.getHearings();
    }

    if (showFeed) {
      this.props.feedActions.getFeedList();
    }

  }

  render() {
    const {
      heroEvent,
      hearingList,
      eventList,
      heroLoading,
    } = this.props;
    const {
      Header,
      heroBanner,
      showHero,
      showEvents = true,
      showHearings = true,
    } = this.props.screenProps;
    return (
      <View style={{flex: 1}}>
        <Header />
        <ScrollView style={styles.container}>
          { showEvents &&
            <View>
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
            <EventList
              navigation={this.props.navigation}
              eventList={eventList}
            />
            </View>
          }
          { !showEvents &&
            <View>
              <View style={styles.heroOverlay} />
              <Image
                source={heroBanner}
                resizeMode="cover"
                style={styles.heroDecoration}
              />
            </View>
          }
          { showHearings &&
            <HearingList
              navigation={this.props.navigation}
              hearingList={hearingList}
            />
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
