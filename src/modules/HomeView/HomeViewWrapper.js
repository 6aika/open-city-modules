import React, { Component } from 'react';
import { DeviceEventEmitter, BackHandler } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import { store } from './redux/store';
import userManager from './util/userManager';
import ConnectedAuthView from './views/AuthView';
import HearingDetailView from './views/HearingDetailView';
import EventDetailView from './views/EventDetailView';
import HomeView from './components/HomeView';
import FeedListView from './views/FeedListView';
import FeedDetailView from './views/FeedDetailView';

const HomeStack = StackNavigator({
  HomeView: {
    screen: HomeView,
    navigationOptions: {
      header: null,
    },
  },
  HearingDetailView: { screen: HearingDetailView },
  EventDetailView: { screen: EventDetailView },
  FeedListView: {
    screen: FeedListView,
    navigationOptions: {
      header: null,
    },
  },
  FeedDetailView: {
    screen: FeedDetailView,
    navigationOptions: {
      header: null,
    },
  },
});

class HomeViewWrapper extends Component<{}> {
  tabChangeListener: Object;

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.tabChangeListener = DeviceEventEmitter.addListener('tabChanged', this.onTabChange)
    const timeoutId = setTimeout(() => {
      BackHandler.addEventListener('hardwareBackPress', this.goBack)
    }, 1000);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardWareBackPress', this.goBack);
    this.tabChangeListener.remove();
  }

  goBack = () => {
    const index = this.navigator.state.nav.index
    if (index > 0) {
      this.navigator._navigation.goBack();
      return true;
    }

    return false;
  }

  onTabChange = (params) => {
    // Reset navigator when switching tabs

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'HomeView' }),
      ],
    });
    const index = this.navigator.state.nav.index;

    if (params.prevRoute === 'HomeView') {
      BackHandler.removeEventListener('hardWareBackPress', this.goBack);

      if (index > 0) {
        this.navigator._navigation.dispatch(resetAction);
      }
    }

    if (params.nextRoute === 'HomeView') {
      BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }
  }


  render() {
    return (

      <Provider store={store} >
        <OidcProvider
          store={store}
          userManager={userManager}
        >
          <ConnectedAuthView
            enabled
          >
            <HomeStack
              ref={(ref) => this.navigator = ref}
              screenProps={{
                ...this.props.screenProps,
                rootNavigation: this.props.navigation,
              }}
            />
          </ConnectedAuthView>
        </OidcProvider>
      </Provider>
    );
  }
}

export default HomeViewWrapper;
