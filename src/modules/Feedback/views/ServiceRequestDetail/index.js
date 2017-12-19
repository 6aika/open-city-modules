/* @flow */
import * as React from 'react';
import {
  View,
  Text,
  Image,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import BackIcon from 'open-city-modules/img/arrow_back.png';
import { type ServiceRequest } from 'open-city-modules/src/types';
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import UpIcon from 'open-city-modules/img/map_up.png'
import Marker from 'open-city-modules/src/components/Marker';
import MarkerIcon from 'open-city-modules/img/marker_default.png';
import Header from 'open-city-modules/src/components/Header';
import styles from './styles';
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

  parseDate = (mDate) => {
    const dateObject = new Date(mDate);
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
        latitude: 25,
        longitude: 25,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
    }
  }

  setFullScreenMap = () => {
    this.setState({ fullScreenMap: true });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  hideFullScreenMap = () => {
    this.setState({ fullScreenMap: false });
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
          title={this.parseDate(serviceRequest.requestedDateTime)}
          leftAction={{
            icon: BackIcon,
            action: this.goBack,
            style: {
              tintColor: '$colors.min',
            },
          }}
        />
        <View style={styles.metadata}>
          { serviceRequest.location.latitude && serviceRequest.location.longitude &&
          <View style={styles.minimap}>
            <MapView
              style={minimapStyle}
              initialRegion={{
                latitude: serviceRequest.location.latitude,
                longitude: serviceRequest.location.longitude,
                latitudeDelta: 0.007,
                longitudeDelta: 0.007,
              }}
              region={{
                latitude: serviceRequest.location.latitude,
                longitude: serviceRequest.location.longitude,
                latitudeDelta: 0.007,
                longitudeDelta: 0.007,
              }}
              provider='google'
              onPanDrag={(e) => { if (!this.state.fullScreenMap) this.setFullScreenMap(true); }}
              onPress={(e) => { if (!this.state.fullScreenMap) this.setFullScreenMap(true); }}
              onLongPress={(e) => { if (!this.state.fullScreenMap) this.setFullScreenMap(true); }}
              onMarkerDragStart={(e) => { if (!this.state.fullScreenMap) this.setFullScreenMap(true); }}
              followUserLocation={false}
              toolbarEnabled={false}
              scrollEnabled={true}
              zoomEnabled={true}
            >
              <MapView.Marker
                ref={(m) => this.marker = m}
                coordinate={{
                  latitude: serviceRequest.location.latitude,
                  longitude: serviceRequest.location.longitude,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }}
              >
                <Marker icon={MarkerIcon} />
              </MapView.Marker>
            </MapView>
          </View>
          }
          {!this.state.fullScreenMap && (serviceRequest.mediaUrl || serviceRequest.mediaUrls) &&
            <View style={styles.attachments}></View>
          }
        </View>
        {!this.state.fullScreenMap &&
        <View style={styles.content}>
          <Text style={styles.description}>{serviceRequest.description}</Text>
          <View style={styles.statusRow}>
            <Text style={styles.status}>{this.parseDate(serviceRequest.requestedDateTime) + ' Palvelupyyntö lähetetty'}</Text>
            {serviceRequest.statusNotes && serviceRequest.statusNotes.map((statusNote) => {
              <Text style={styles.status}>{statusNote}</Text>

            })}
          </View>
        </View>
        }
        {this.state.fullScreenMap &&
          <TouchableOpacity
            onPress={this.hideFullScreenMap}
          >
            <View style={styles.footer}>
              <Image
                style={styles.footerIcon}
                source={UpIcon}
              />
            </View>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

export default ServiceRequestDetail;
