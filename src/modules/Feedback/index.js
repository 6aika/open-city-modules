/* @flow */
import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet
} from 'react-native';
import { cloneDeep } from 'lodash';
import MapView from 'react-native-maps';
import { StackNavigator, TabNavigator, TabBarTop } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import FloatingActionButton from 'open-city-modules/src/components/FloatingActionButton';
import SendFeedbackModal from './SendFeedbackModal';
import Header from './components/Header'
import HeaderButton from './components/Header/HeaderButton'
import styles from './styles'

const MAP_PAGE = 'map';
const LIST_PAGE = 'list';

type Profile = {[string]: mixed};

type Props = {
  // next: Profile => void, // provided by Onboarding
  // previous: Profile => void, // provided by Onboarding
  // profile: Profile, // provided by Onboarding
  // options: Array<{value: string}>,
  //   // array of options, value is saved to the profile object and used as translation key
  // choiceKey: string, // choice is saved in the profile object with this key as the property name
  // ns: string,
  // t: string => string,
  // i18n: any,
};

type State = {
  text: ?String,
  region: ?Object,
  showFeedbackModal: Boolean,
  activePage: string,
};

// Default region set as Helsinki
const DEFAULT_LATITUDE = 61.4983875;
const DEFAULT_LONGITUDE = 23.752394;
const DEFAULT_LATITUDE_DELTA = 0.02208;
const DEFAULT_LONGITUDE_DELTA = 0.01010;


/*
 An onboarding step component where the user can select one option from many
 */
class FeedbackModule extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Home',
  }



  constructor(props: Props) {
    super(props);
    this.state = {
      region: { // Coordinates for the visible area of the map
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
      },
      showFeedbackModal: false,
      activePage: MAP_PAGE,
    };
  }

  onMapPress = () => {
    if (this.state.activePage !== MAP_PAGE) {
      this.setState({
        activePage: MAP_PAGE,
      });
    }
  }

  onListPress = () => {
    if (this.state.activePage !== LIST_PAGE) {
      this.setState({
        activePage: LIST_PAGE,
      });
    }
  }

  toggleFeedbackModal = () => {
    if (this.state.showFeedbackModal) {
      this.setState({ showFeedbackModal: false });
    } else if (!this.state.showFeedbackModal) {
      this.setState({ showFeedbackModal: true });
    }
  }

  render() {
    const buttons = [
      {
        onPress: this.onMapPress,
        active: this.state.activePage === MAP_PAGE,
        title: 'KARTTA'
      },
      {
        onPress: this.onListPress,
        active: this.state.activePage === LIST_PAGE,
        title: 'LISTA'
      },
    ]

    return (
      <View style={styles.container}>
        {!this.state.showFeedbackModal &&
        <View style={styles.map}>
          <Header
            buttons={buttons}
            override={true}
          />
          <MapView
            style={styles.map}
            ref={(ref) => { this.mapView = ref; }}
            style={styles.map}
            region={this.state.region}
            showsUserLocation={true}
            followUserLocation={false}
            toolbarEnabled={false}
            // onPress={this.onMapViewClick.bind(this)}
            // onRegionChangeComplete={this.onMapRegionChange.bind(this)}
            >
          </MapView>

        </View>
        }
        {this.state.showFeedbackModal &&
          <View style={styles.modal}>
            <SendFeedbackModal
              region={this.state.region}
            />
          </View>
        }
        <FloatingActionButton
          onPress={() => {
            console.warn(this.state.showFeedbackModal)
            // this.props.navigation.navigate('SendRequest', {region: this.state.region})
            this.toggleFeedbackModal()
          }}
        />
      </View>
    );
  }
}



const FeedbackStack = StackNavigator(
  {
    Home: {
      screen: FeedbackModule,
    },
    SendRequest: {
      screen: SendFeedbackModal,
    },
  },
  {
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
);


export default FeedbackStack;
