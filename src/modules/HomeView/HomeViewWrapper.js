import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import { store } from './redux/store';
import userManager from './util/userManager';
import ConnectedAuthView from './views/AuthView';
import HearingDetailView from './views/HearingDetailView';
import EventDetailView from './views/EventDetailView';
import HomeView from './components/HomeView';
import ItemListView from './views/ItemListView';

const HomeStack = StackNavigator({
  HomeView: {
    screen: HomeView,
    navigationOptions: {
      header: null,
    },
  },
  HearingDetailView: { screen: HearingDetailView },
  EventDetailView: { screen: EventDetailView },
  FeedListView: { screen: ItemListView },
});

class HomeViewWrapper extends Component<{}> {
  constructor(props) {
    super(props);
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
              screenProps={this.props.screenProps}
            />
          </ConnectedAuthView>
        </OidcProvider>
      </Provider>
    );
  }
}

export default HomeViewWrapper;
