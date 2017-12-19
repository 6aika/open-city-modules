/* @flow */
import * as React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import MapView from 'react-native-maps';
import BackIcon from 'open-city-modules/img/arrow_back.png';
import { type ServiceRequest } from 'open-city-modules/src/types';
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import Header from 'open-city-modules/src/components/Header';
import styles from './styles';
import MarkerPin from 'open-city-modules/img/marker_pin.png';

const Config = getConfig();


type Props = {
};

type State = {
};


/*
 An onboarding step component where the user can select one option from many
 */
class ServiceRequestDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fullScreenMap: false,
    };
  }



  componentWillMount = () => {
  }

  componentWillReceiveProps = (nextProps) => {
  }

  parseHeaderDate = (serviceRequest: ServiceRequest) => {
    const dateObject = new Date(serviceRequest.requestedDateTime);
    const date = dateObject.getDate();
    const month = dateObject.getMonth();
    const year = dateObject.getFullYear();

    return (date + '.' + month + '.' + year)
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  parseFooter = (serviceRequest) => {

  }

  getRegion = (serviceRequest) => {
    if (
      serviceRequest.location
      && serviceRequest.location.latitude
      && serviceRequest.location.longitude
    ) {
      return {
        latitude: parseFloat(Config.DEFAULT_LATITUDE),
        longitude: parseFloat(Config.DEFAULT_LONGITUDE),
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
    }
  }

  setFullScreenMap = () => {
    this.setState({ fullScreenMap: true });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  render() {
    const minimapStyle = this.state.fullScreenMap ? styles.minimapFullScreen : styles.minimap;
    const { serviceRequest } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Header
          style={styles.header}
          titleStyle={styles.headerTitle}
          title={this.parseHeaderDate(serviceRequest)}
          leftAction={{
            icon: BackIcon,
            action: this.goBack,
            style: {
              tintColor: '$colors.min',
            },
          }}
        />
        <View style={styles.metadata}>
          <View style={styles.minimap}>
            <MapView.Animated
              style={styles.minimap}
              initialRegion={{
                latitude: Config.DEFAULT_LATITUDE,
                longitude: Config.DEFAULT_LONGITUDE,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
              region={() => this.getRegion(serviceRequest)}
              provider='google'
              followUserLocation={false}
              toolbarEnabled={false}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <MapView.Marker.Animated
                ref={(m) => this.marker = m}
                coordinate={this.getRegion}
              >
                <Image // This image hides the default marker
                  source={MarkerPin}
                  style={{ height: 0, width: 0 }}
                />
              </MapView.Marker.Animated>
            </MapView.Animated>
          </View>
          <View style={styles.attachments}></View>
        </View>
        <View style={styles.content}>
          <Text style={styles.description}>{serviceRequest.description}</Text>
          <Text style={styles.status}>{serviceRequest.status}</Text>
        </View>

      </View>
    );
  }
}

export default ServiceRequestDetail;
