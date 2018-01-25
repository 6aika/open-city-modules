import React, { Component } from 'react';
import {
  // View,
  ScrollView,
  // Image,
} from 'react-native';

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import EventActions           from '../redux/events/actions';
import HearingActions         from '../redux/hearings/actions';

// import Navbar from '../../components/Navbar';
// import Spinner from '../../components/Spinner';
import { getConfig } from '../config'
import Hero from './Hero';
import HearingList from './HearingList';
import EventList from './EventList';
// import backIcon from '../../img/back.png';
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

  // static navigationOptions = {
  //   headerTitle: (
  //       <Image
  //         style={styles.headerLogo}
  //         resizeMode="contain"
  //         source={require('./../../img/city-logo.png')}
  //       />
  //   ),
  //   tabBarLabel: 'Home',
  //   tabBarIcon: ({ tintColor }) => (
  //     <Image
  //       source={require('./../../img/icon-home.png')}
  //       style={[styles.icon, {tintColor: tintColor}]}
  //     />
  //   ),
  // };

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
