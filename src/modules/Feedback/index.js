/* @flow */
import * as React from 'react';
import {
  View,
  Dimensions,
  LayoutAnimation,
  Modal,
  Platform,
  Image,
  UIManager
} from 'react-native';
import ServiceRequestMap from 'open-city-modules/src/modules/Feedback/views/ServiceRequestMapView'
import ServiceRequestDetail from 'open-city-modules/src/modules/Feedback/views/ServiceRequestDetail'
import { getServiceTypes, getServiceRequests, getServiceRequest } from 'open-city-modules/src/modules/Feedback/requests'
import { StackNavigator } from 'react-navigation';
import { type ServiceType } from 'open-city-modules/src/types'
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import FloatingActionButton from 'open-city-modules/src/components/FloatingActionButton';
import ServiceRequestListView from 'open-city-modules/src/modules/Feedback/views/ServiceRequestList';
import SendFeedbackModal from 'open-city-modules/src/modules/Feedback/views/SendFeedbackModal';
import Header from 'open-city-modules/src/components/Header';
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
      region: { // Coordinates for the visible area of the map
        latitude: Config.DEFAULT_LATITUDE,
        longitude: Config.DEFAULT_LONGITUDE,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
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


  onRegionChange = (e) => {
    this.setState({
      region: e,
    });
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
    this.setState({
      region,
    });
  }

  onMinimapRegionChange = (region) => {
    this.setState({
      region: {
        ...region,
        longitudeDelta: region.longitudeDelta,
        latitudeDelta: region.latitudeDelta,
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

  handleMarkerPressed = (serviceRequest) => {
    this.setState({
      showMapPopup: true,
      activeServiceRequest: serviceRequest,
      popupData: {
        title: serviceRequest.requestedDateTime,
        body: serviceRequest.description
      }
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

  centerMarker = (region) => {
    const location = {
      latitude: region.latitude,
      longitude: region.longitude,
    };

    this.setState({
      userPosition: location,
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
          <Header
            buttons={buttons}
          />
          <ServiceRequestMap
            region={this.state.region}
            onMarkerPressed={this.handleMarkerPressed}
            onRegionChangeComplete={this.onMapRegionChange}
            serviceRequests={this.state.serviceRequests}
          />
        </View>
        }
        { !this.state.showFeedbackModal && this.state.activePage === LIST_PAGE &&
        <View style={styles.map}>
          <Header
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
