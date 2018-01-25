import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Platform,
  BackHandler
} from 'react-native';

import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import { store } from './redux/store';
import userManager from './util/userManager';

import ConnectedAuthView from './views/AuthView';
// import Global                   from './util/globals';
// import { Navigator }            from './navigation';
import HomeView from './components/HomeView';
// import { View } from 'react-native';

class HomeViewWrapper extends Component<{}> {

  constructor(props, context) {
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
            <HomeView
              screenProps={this.props.screenProps}
            />
          </ConnectedAuthView>
        </OidcProvider>
      </Provider>
    );
  }
}

export default HomeViewWrapper;
