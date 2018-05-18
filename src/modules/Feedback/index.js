/* @flow */
import * as React from 'react';
import {
  View,
  Modal,
  UIManager,
  DeviceEventEmitter,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import ServiceRequestMap from 'open-city-modules/src/modules/Feedback/views/ServiceRequestMapView';
import ServiceRequestDetail from 'open-city-modules/src/modules/Feedback/views/ServiceRequestDetail';
import { getServiceTypes, getServiceRequests } from 'open-city-modules/src/modules/Feedback/requests';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { type ServiceType } from 'open-city-modules/src/types';
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import MapView from 'react-native-maps';
import EStyleSheet from 'react-native-extended-stylesheet';
import { parseDate } from 'open-city-modules/src/util';
import FloatingActionButton from 'open-city-modules/src/components/FloatingActionButton';
import ServiceRequestListView from 'open-city-modules/src/modules/Feedback/views/ServiceRequestList';
import SendFeedbackModal from 'open-city-modules/src/modules/Feedback/views/SendFeedbackModal';
import PlusIcon from 'open-city-modules/img/plus.png';
import MarkerPopup from 'open-city-modules/src/components/MarkerPopup';
import { changeLanguage, t } from 'open-city-modules/src/modules/Feedback/translations';
import styles from './styles';


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

class FeedbackModule extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      popupData: {
        title: '',
        body: '',
      },
      region: this.props.screenProps.region,
      // markerPosition: null,
      showFeedbackModal: false,
      showMapPopup: false,
      serviceTypes: [],
      serviceRequests: [],
      activeServiceRequest: null,
    };

    this.goToServiceRequestDetail = this.goToServiceRequestDetail.bind(this);
    this.getGeoLocation = this.getGeoLocation.bind(this);
    this.onMapViewClick = this.onMapViewClick.bind(this);
    this.toggleFeedbackModal = this.toggleFeedbackModal.bind(this);

    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillMount = async () => {
    const {
      requests,
    } = this.props.screenProps;
    const {
      serviceRequests,
      serviceTypes,
    } = this.props.screenProps;
    this.setState({
      serviceRequests,
      serviceTypes,
    });
  }

  componentDidMount = () => {

  }

  getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
    });
  };


  componentWillReceiveProps = () => {
    const {
      serviceRequests,
      serviceTypes,
    } = this.props.screenProps;
    this.setState({
      serviceRequests,
      serviceTypes,
    });
  }

  onMapViewClick() {
    if (this.state.showMapPopup) {
      this.setState({
        showMapPopup: false,
      });
    }
  }

  onMapRegionChange = (region) => {
    this.state.region.setValue(region);
  }

  onMinimapRegionChange = (region) => {
    this.state.region.setValue(region);
  }

  getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.centerMapToLocation(position.coords);
      },
      (error) => this.setState({ error: error.message }),
    );
  };

  centerMapToLocation = (position: Location) => {
    this.setState({
      region: new MapView.AnimatedRegion({
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }),
    });
  }

  getServiceTypes = async (serviceTypeFetch: () => Array<ServiceType>) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await serviceTypeFetch();
        resolve(result)
      } catch(error) {
        reject(error)
      }
      // this.setState({ serviceTypes: result });
    });

  }

  getServiceRequests = async (serviceRequestsFetch: () => Array<ServiceRequest>) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await serviceRequestsFetch();
        resolve(result)
      } catch(error) {
        reject(error)
      }
    });

    // this.setState({ serviceRequests: result });
  }

  getServiceRequest = async (serviceRequestFetch: () => Array<ServiceRequest>, requestId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await serviceRequestFetch(requestId);
        resolve(result)
      } catch(error) {
        reject(error)
      }
    });
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
      });
      this.state.region.setValue(region);
    }

    this.setState({
      showMapPopup: true,
      activeServiceRequest: serviceRequest,
      popupData: {
        title: parseDate(serviceRequest.requestedDateTime),
        body: serviceRequest.description,
      },
    });
  }

  goToServiceRequestDetail = (serviceRequest) => () => {
    this.props.navigation.navigate('Detail', {
      serviceRequest,
    });
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
    const {
      Header,
      customMapStyle,
    } = this.props.screenProps;


    const serviceRequestDetailPopup =
      (<MarkerPopup
        data={this.state.popupData}
        onClick={this.goToServiceRequestDetail(this.state.activeServiceRequest)}
        onClose={this.onMapViewClick}
      />);
    return (
      <View style={styles.container}>
        <View style={styles.map}>
          {!!Header &&
            <Header />
          }

          <ServiceRequestMap
            centerToGeoLocation={this.getGeoLocation}
            onRegionChange={this.onMapRegionChange}
            region={this.state.region}
            onMarkerPressed={this.handleMarkerPressed}
            onRegionChangeComplete={this.onMapRegionChange}
            serviceRequests={this.state.serviceRequests}
            customMapStyle={customMapStyle}
          />
        </View>

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
          onPress={this.toggleFeedbackModal}
        />

        {this.state.showMapPopup && serviceRequestDetailPopup}
      </View>
    );
  }
}

const FeedbackTabNavigator = TabNavigator({
  MapView: {
    screen: FeedbackModule,
    navigationOptions: () => ({
      tabBarLabel: t('map').toUpperCase(),
    }),
  },
  ListView: {
    screen: ServiceRequestListView,
    navigationOptions: () => ({
      tabBarLabel: t('list').toUpperCase(),
    }),
  },
});

const FeedbackStack = StackNavigator({
  Map: {
    screen: FeedbackTabNavigator,
    navigationOptions: {
      header: null,
    },
  },
  Detail: {
    screen: ServiceRequestDetail,
  },
});


type ModuleProps = {
  screenProps: { locale: string },
};

// eslint-disable-next-line
class Feedback extends React.Component<ModuleProps> {
  tabChangeListener: Object;

  constructor(props: Props) {
    super(props);
    this.state = {
      serviceTypes: [],
      serviceRequests: [],
      region: null,
      loading: true,
    };
  }

  getServiceTypes = async (serviceTypeFetch: () => Array<ServiceType>) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await serviceTypeFetch();
        resolve(result)
      } catch(error) {
        reject(error)
      }
      // this.setState({ serviceTypes: result });
    });

  }

  getServiceRequests = async (serviceRequestsFetch: () => Array<ServiceRequest>) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await serviceRequestsFetch();
        resolve(result)
      } catch(error) {
        reject(error)
      }
    });

    // this.setState({ serviceRequests: result });
  }

  getServiceRequest = async (serviceRequestFetch: () => Array<ServiceRequest>, requestId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await serviceRequestFetch(requestId);
        resolve(result)
      } catch(error) {
        reject(error)
      }
    });
  }

  async componentWillMount() {
    if (this.props.screenProps.locale) {
      changeLanguage(this.props.screenProps.locale);
    }
    // this.tabChangeListener = DeviceEventEmitter.addListener('tabChanged', this.onTabChange)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: new MapView.AnimatedRegion({ // Coordinates for the visible area of the map
            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude),
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }),
        });
      },
      (error) => {
        this.setState({
          region: new MapView.AnimatedRegion({ // Coordinates for the visible area of the map
            latitude: parseFloat(Config.DEFAULT_LATITUDE),
            longitude: parseFloat(Config.DEFAULT_LONGITUDE),
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }),
        });
      },
    );

    const {
      requests
    } = this.props.screenProps;

    if (requests) {
      const serviceTypes = await this.getServiceTypes(requests.getServiceTypes);
      const serviceRequests = await this.getServiceRequests(requests.getServiceRequests);

      this.setState({
        serviceTypes,
        serviceRequests,
        loading: false,
      });
    } else {
      const serviceTypes = await this.getServiceTypes(getServiceTypes);
      const serviceRequests = await this.getServiceRequests(getServiceRequests);

      this.setState({
        serviceTypes,
        serviceRequests,
        loading: false,
      });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardWareBackPress', this.goBack);
    // this.tabChangeListener.remove();
  }

  componentWillReceiveProps(nextProps: ModuleProps) {
    if (this.props.screenProps.locale !== nextProps.screenProps.locale) {
      changeLanguage(nextProps.screenProps.locale);
    }
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
    //
    // const resetAction = NavigationActions.reset({
    //   index: 0,
    //   actions: [
    //     NavigationActions.navigate({ routeName: 'Map' }),
    //   ]
    // });
    //
    // const index = this.navigator.state.nav.index;
    //
    // if (params.prevRoute === 'Feedback') {
    //   BackHandler.removeEventListener('hardWareBackPress', this.goBack);
    //
    //   if(index > 0) {
    //     this.navigator._navigation.dispatch(resetAction);
    //   }
    // }
    //
    // console.warn(params.nextRoute)
    // if (params.nextRoute === 'Feedback') {
    //   BackHandler.addEventListener('hardwareBackPress', this.goBack)
    // }

  }

  render() {

    if (this.state.loading || !this.state.region) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            size="large"
            color={EStyleSheet.value('$colors.med')}
          />
        </View>
      );
    }

    return <FeedbackStack screenProps={
      {
        ...this.props.screenProps,
        serviceTypes: this.state.serviceTypes,
        serviceRequests: this.state.serviceRequests,
        region: this.state.region
      }
    }/>;
  }
}

export default Feedback;
