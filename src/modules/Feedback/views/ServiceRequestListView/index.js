/* @flow */
import * as React from 'react';
import {
  View,
  Dimensions,
  LayoutAnimation,
  Modal,
  Platform,
  Image,
} from 'react-native';
import ServiceRequestMap from 'open-city-modules/src/modules/Feedback/views/ServiceRequestMapView'
import { getServiceTypes, getServiceRequests, getServiceRequest } from 'open-city-modules/src/modules/Feedback/requests'
import { StackNavigator } from 'react-navigation';
import { type ServiceRequest } from 'open-city-modules/src/types'
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import FloatingActionButton from 'open-city-modules/src/components/FloatingActionButton';
import Header from 'open-city-modules/src/components/Header';
import PlusIcon from 'open-city-modules/img/plus.png'

const MAP_PAGE = 'map';
const LIST_PAGE = 'list';

const Config = getConfig();


type Props = {

};

type State = {
  activePage: string,
};


/*
 An onboarding step component where the user can select one option from many
 */
class ServiceRequestListView extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Home',
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      activePage: MAP_PAGE,
    };
  }

  componentWillMount = async () => {

  }

  render() {
    const buttons = [
      {
        onPress: this.onMapPress,
        active: this.state.activePage === MAP_PAGE,
        title: 'KARTTA',
      },
      {
        onPress: this.onListPress,
        active: this.state.activePage === LIST_PAGE,
        title: 'LISTA',
      },
    ];

    return (
      <View style={styles.container}>
        <Header
          buttons={buttons}
        />
      </View>
    );
  }
}

export default ServiceRequestListView;
