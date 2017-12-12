/* @flow */
import * as React from 'react';
import {
  View,
  Dimensions,
  LayoutAnimation,
  Modal,
  Platform,
} from 'react-native';
import MapView from 'react-native-maps';
import { getServiceTypes } from 'open-city-modules/src/modules/Feedback/requests'
import { StackNavigator } from 'react-navigation';
import { type ServiceType } from 'open-city-modules/src/types'
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import FloatingActionButton from 'open-city-modules/src/components/FloatingActionButton';
import SendFeedbackModal from './SendFeedbackModal';
import Header from './components/Header';
import styles from './styles';

const MAP_PAGE = 'map';
const LIST_PAGE = 'list';

const Config = getConfig();


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
  text: ?string,
  region: ?Object,
  showFeedbackModal: boolean,
  feedbackModalHeight: ?number,
  activePage: string,
  markerPosition: ?Object,
  serviceTypes: Array<ServiceType>
};


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
        latitude: Config.DEFAULT_LATITUDE,
        longitude: Config.DEFAULT_LONGITUDE,
        latitudeDelta: Config.DEFAULT_LATITUDE_DELTA,
        longitudeDelta: Config.DEFAULT_LONGITUDE_DELTA,
      },
      markerPosition: null,
      showFeedbackModal: false,
      activePage: MAP_PAGE,
      serviceTypes: [],
    };
  }

  componentWillMount = () => {
    this.getServiceTypes(getServiceTypes);
  }


  onRegionChange = (e) => {
    this.setState({
      region: e,
    });
  }

  onMapViewClick() {
    if (this.state.showPopup) {
      this.setState({
        region: this.state.region,
        showPopup: false,
      });
    }
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

  onMapRegionChange = (region) => {
    this.setState({
      region
    });
  }

  getServiceTypes = async (serviceTypeFetch: () => Array<ServiceType>) => {
    const result = await serviceTypeFetch();
    this.setState({ serviceTypes: result });
  }

  toggleFeedbackModal = () => {
    if (this.state.showFeedbackModal) {
      this.setState({
        showFeedbackModal: false,
        feedbackModalHeight: 0,
      });
    } else if (!this.state.showFeedbackModal) {
      this.setState({
        showFeedbackModal: true,
        feedbackModalHeight: Dimensions.get('window').height,
      });
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  centerMarker = (region) => {
    const location = {
      latitude: region.latitude,
      longitude: region.longitude,
    };

    this.setState({
      markerPosition: location,
      region
    });
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
        {!this.state.showFeedbackModal &&
        <View style={styles.map}>
          <Header
            buttons={buttons}
          />
          <MapView
            style={styles.map}
            ref={(ref) => { this.mapView = ref; }}
            region={this.state.region}
            showsUserLocation
            followUserLocation={false}
            toolbarEnabled={false}
            // onRegionChange={this.onMapRegionChange(region)}
            // onPress={this.onMapViewClick.bind(this)}
            onRegionChangeComplete={this.onMapRegionChange}
          />

        </View>
        }
        {this.state.showFeedbackModal &&
          <Modal style={[styles.modal]}>
            <SendFeedbackModal
              toggleFeedbackModal={this.toggleFeedbackModal}
              region={this.state.region}
              onRegionChangeComplete={this.onMapRegionChange}
              onRegionChange={this.onRegionChange}
              serviceTypes={this.state.serviceTypes}
            />
          </Modal>
        }
        <FloatingActionButton
          onPress={() => {
            // this.props.navigation.navigate('SendRequest', {region: this.state.region})
            this.toggleFeedbackModal();
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
