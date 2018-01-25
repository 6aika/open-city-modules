import React, { Component } from 'react';
import {
  // View,
  ScrollView,
  // Image,
} from 'react-native';

// import { connect }            from 'react-redux';
// import { bindActionCreators } from 'redux';
// import EventActions           from '../../redux/events/actions';
// import HearingActions         from '../../redux/hearings/actions';

// import Navbar from '../../components/Navbar';
// import Spinner from '../../components/Spinner';
import { getConfig } from './config'
import Hero from './components/Hero';
import HearingList from './components/HearingList';
import EventList from './components/EventList';
import HomeViewWrapper from './HomeViewWrapper';
// import backIcon from '../../img/back.png';
import styles from './styles';

const config = getConfig();

// function mapStateToProps(state) {
//   return {
//     events: state.events,
//     heroEvent: state.events.heroEvent,
//     heroLoading: state.events.heroLoading,
//     hearingList: state.hearings.hearingList,
//     eventList: state.events.eventList,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     eventActions: bindActionCreators(EventActions, dispatch),
//     hearingActions: bindActionCreators(HearingActions, dispatch),
//   };
// }

// const ConnectedHomeView = connect(mapStateToProps, mapDispatchToProps)(HomeView);

// export default k = () => {
//   console.warn("index")
//   return HomeViewWrapper
// };

export default HomeViewWrapper;
