/* @flow */
import * as React from 'react';
import {
  View,
  Dimensions,
  LayoutAnimation,
  Modal,
  Platform,
  Image,
  UIManager,
} from 'react-native';
import ServiceRequestMap from 'open-city-modules/src/modules/Feedback/views/ServiceRequestMapView'
import ServiceRequestDetail from 'open-city-modules/src/modules/Feedback/views/ServiceRequestDetail'
import { getServiceTypes, getServiceRequests, getServiceRequest } from 'open-city-modules/src/modules/Feedback/requests'
import { StackNavigator } from 'react-navigation';
import { type ServiceType } from 'open-city-modules/src/types'
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import MapView from 'react-native-maps';

import FloatingActionButton from 'open-city-modules/src/components/FloatingActionButton';
import ServiceRequestListView from 'open-city-modules/src/modules/Feedback/views/ServiceRequestList';
import SendFeedbackModal from 'open-city-modules/src/modules/Feedback/views/SendFeedbackModal';
import SubHeader from 'open-city-modules/src/components/Header';
import PlusIcon from 'open-city-modules/img/plus.png'
import Marker from 'open-city-modules/src/components/Marker';
import MarkerNew from 'open-city-modules/img/marker_new.png';
import MarkerPopup from 'open-city-modules/src/components/MarkerPopup';
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
  constructor(props: Props) {
    super(props);
    this.state = {
      region: new MapView.AnimatedRegion({ // Coordinates for the visible area of the map
        latitude: Config.DEFAULT_LATITUDE,
        longitude: Config.DEFAULT_LONGITUDE,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }),
      popupData: {
        title: '',
        body: '',
      },
      // markerPosition: null,
      showFeedbackModal: false,
      showMapPopup: false,
      activePage: MAP_PAGE,
      serviceTypes: [],
      serviceRequests: [],
      activeServiceRequest: null,
    };

    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillMount = async () => {
    this.getServiceTypes(getServiceTypes);
    this.getServiceRequests(getServiceRequests);
  }

  onMapViewClick() {
    if (this.state.showMapPopup) {
      this.setState({
        showMapPopup: false,
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
    this.state.region.setValue(region)
  }

  onMinimapRegionChange = (region) => {
    this.state.region.setValue(region)
  }

  getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.centerMapToLocation(position.coords)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  centerMapToLocation = (position: Location) => {
    this.setState({
      region: new MapView.AnimatedRegion({
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      })
    })

  }

  getServiceTypes = async (serviceTypeFetch: () => Array<ServiceType>) => {
    const result = await serviceTypeFetch();
    this.setState({ serviceTypes: result });
  }

  getServiceRequests = async (serviceRequestsFetch: () => Array<ServiceRequest>) => {
    const result = await serviceRequestsFetch();
    console.warn("res: +" + JSON.stringify(result))

    this.setState({ serviceRequests: result });
  }

  getServiceRequest = async (serviceRequestFetch: () => Array<ServiceRequest>, requestId: string) => {
    const result = await serviceRequestFetch(requestId);
    return result
    // this.setState({ serviceRequests: result });
  }

  handleMarkerPressed = (serviceRequest) => {
    let region = this.state.region;
    if (serviceRequest.location.latitude && serviceRequest.location.longitude) {
      region = ({
        ...this.state.region,
        latitude: serviceRequest.location.latitude,
        longitude: serviceRequest.location.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      })
      this.state.region.setValue(region);
    }

    this.setState({
      showMapPopup: true,
      activeServiceRequest: serviceRequest,
      popupData: {
        title: serviceRequest.requestedDateTime,
        body: serviceRequest.description
      },
    });
  }

  goToServiceRequestDetail = (serviceRequest) => {
    this.props.navigation.navigate('Detail', {
      serviceRequest
    })
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
  }

  render() {
    const { Header } = this.props.screenProps;

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
    const serviceRequestDetailPopup =
      (<MarkerPopup
        data={this.state.popupData}
        onClick={()=> this.goToServiceRequestDetail(this.state.activeServiceRequest)}
        onClose={()=> this.setState({ showMapPopup: false })}
      />);
    return (
      <View style={styles.container}>
        {!this.state.showFeedbackModal && this.state.activePage === MAP_PAGE &&
        <View style={styles.map}>
          <Header />
          <SubHeader
            buttons={buttons}
          />
          <ServiceRequestMap
            centerToGeoLocation={() => this.getGeoLocation()}
            onRegionChange={this.onMapRegionChange}
            region={this.state.region}
            onMarkerPressed={this.handleMarkerPressed}
            onRegionChangeComplete={this.onMapRegionChange}
            serviceRequests={this.state.serviceRequests}
          />
        </View>
        }
        { !this.state.showFeedbackModal && this.state.activePage === LIST_PAGE &&
        <View style={styles.map}>
          <Header />
          <SubHeader
            buttons={buttons}
          />
          <ServiceRequestListView
            data={this.state.serviceRequests}
            navigation={this.props.navigation}
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
            screenProps={this.props.screenProps}

            toggleFeedbackModal={this.toggleFeedbackModal}
            region={this.state.region}
            onMinimapRegionChange={this.onMinimapRegionChange}
            serviceRequests={this.state.serviceRequests}
            serviceTypes={this.state.serviceTypes}
          />
        </Modal>

        <FloatingActionButton
          icon={PlusIcon}
          onPress={() => {
            this.toggleFeedbackModal();
          }}
        />

        {this.state.showMapPopup && serviceRequestDetailPopup}
      </View>
    );
  }
}

const FeedbackStack = StackNavigator(
  {
    Map: {
      screen: FeedbackModule,
    },
    Detail: {
      screen: ServiceRequestDetail
    }
  },
  {
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
);


export default FeedbackStack;
