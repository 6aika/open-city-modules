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
import { type ServiceType } from 'open-city-modules/src/types'
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import FloatingActionButton from 'open-city-modules/src/components/FloatingActionButton';
import SendFeedbackModal from 'open-city-modules/src/modules/Feedback/views/SendFeedbackModal';
import Header from 'open-city-modules/src/components/Header';
import PlusIcon from 'open-city-modules/img/plus.png'
import Marker from 'open-city-modules/src/components/Marker';
import MarkerNew from 'open-city-modules/img/marker_new.png'
import styles from './styles';

const MAP_PAGE = 'map';
const LIST_PAGE = 'list';

const Config = getConfig();


type Props = {

};

type State = {
  text: ?string,
  region: ?Object,
  showFeedbackModal: boolean,
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
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      // markerPosition: null,
      showFeedbackModal: false,
      activePage: MAP_PAGE,
      serviceTypes: [],
      serviceRequests: [],
    };
  }

  componentWillMount = async () => {
    this.getServiceTypes(getServiceTypes);
    this.getServiceRequests(getServiceRequests);
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
    console.warn(JSON.stringify(region))
    this.setState({
      region,
    });
  }

  onMinimapRegionChange = (region) => {
    this.setState({
      region: {
        ...region,
        longitudeDelta: region * 2,
        latitudeDelta: region * 2,
      }
    })
  }

  getServiceTypes = async (serviceTypeFetch: () => Array<ServiceType>) => {
    const result = await serviceTypeFetch();
    this.setState({ serviceTypes: result });
  }

  getServiceRequests = async (serviceRequestsFetch: () => Array<ServiceRequest>) => {
    const result = await serviceRequestsFetch();
    this.setState({ serviceRequests: result });
  }

  getServiceRequest = async (serviceRequestFetch: () => Array<ServiceRequest>, requestId: string) => {
    const result = await serviceRequestFetch(requestId);
    return result
    // this.setState({ serviceRequests: result });
  }

  toggleFeedbackModal = () => {
    if (this.state.showFeedbackModal) {
      this.setState({
        showFeedbackModal: false,
      });
    } else if (!this.state.showFeedbackModal) {
      this.setState({
        showFeedbackModal: true,
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
          <ServiceRequestMap
            region={this.state.region}
            onRegionChangeComplete={this.onMapRegionChange}
            serviceRequests={this.state.serviceRequests}
          />
        </View>
        }
          <Modal
            style={[styles.modal]}
            animationType="slide"
            visible={this.state.showFeedbackModal}
            onRequestClose={this.toggleFeedbackModal}
          >
            <SendFeedbackModal
              toggleFeedbackModal={this.toggleFeedbackModal}
              region={this.state.region}
              onMinimapRegionChange={this.onMapRegionChange}
              serviceRequests={this.state.serviceRequests}
            />
          </Modal>

        <FloatingActionButton
          icon={PlusIcon}
          onPress={() => {
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


export default FeedbackModule;
