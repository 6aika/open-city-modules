import React, { Component } from 'react';
import {
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventActions from '../redux/events/actions';
import HearingActions from '../redux/hearings/actions';
import { getConfig } from '../config';
import Hero from './Hero';
import HearingList from './HearingList';
import EventList from './EventList';
import styles from '../styles';

const config = getConfig();

class HomeView extends Component {
  constructor(props, context) {
    super(props);
  }

  componentWillMount() {
    this.props.eventActions.getHero();
    this.props.eventActions.getList();
    this.props.hearingActions.getHearings();
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
      showEvents,
      showHearings,
    } = this.props.screenProps;
    return (
      <ScrollView Style={styles.container}>
        <Header />
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
        <HearingList
          navigation={this.props.navigation}
          hearingList={hearingList}
        />
      </ScrollView>
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    eventActions: bindActionCreators(EventActions, dispatch),
    hearingActions: bindActionCreators(HearingActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
