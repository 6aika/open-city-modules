/* @flow */
import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { type ServiceRequest } from 'open-city-modules/src/types';
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import Marker from 'open-city-modules/src/components/Marker';
import MarkerNew from 'open-city-modules/img/marker_new.png';
import LocationImage from 'open-city-modules/img/my_location.png';
import styles from './styles';

const Config = getConfig();
// Button which will have an absolute position on the bottom right corner

type Props = {
  region: {
    latitude: float,
    longitude: float,
    latitudeDelta: float,
    longitudeDelta: float,
  };
  onRegionChange: ({
      latitude: float,
      longitude: float,
      latitudeDelta: float,
      longitudeDelta: float,
  });
  onMarkerPressed: () => void;
  serviceRequests: Array<ServiceRequest>,
  centerToGeoLocation: () => void;
}

const ServiceRequestMapView = ({
  region,
  onRegionChange,
  onMarkerPressed,
  serviceRequests,
  centerToGeoLocation,
  customMapStyle,
  isLocationVisible,
  onRegionChangeComplete,
  customMapMarker
}): Props => {
  const MapMarker = customMapMarker || Marker;

  return (
    <View style={styles.map}>

      <MapView.Animated
        style={styles.map}
        ref={(ref) => { this.mapView = ref; }}
        onRegionChangeComplete={onRegionChangeComplete}
        region={region}
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        followUserLocation={false}
        toolbarEnabled={false}
        // onPress={this.onMapViewClick.bind(this)}
        onRegionChange={onRegionChange}
        customMapStyle={customMapStyle}
      >
        { serviceRequests && serviceRequests.map((serviceRequest, index) => {
          if (serviceRequest.location.latitude && serviceRequest.location.longitude) {
            if (isLocationVisible(serviceRequest.location)) {
              return (
                <MapView.Marker
                  key={serviceRequest.id}
                  coordinate={serviceRequest.location}
                  onPress={() => onMarkerPressed(serviceRequest)}

                >
                  <MapMarker
                    icon={MarkerNew}
                  />
                </MapView.Marker>
              );
            }
          }
        })
      }
      </MapView.Animated>
      <TouchableOpacity
        style={styles.userLocationButton}
        onPress={centerToGeoLocation}
      >
        <Image
          style={styles.locationImage}
          source={LocationImage}
        />
      </TouchableOpacity>
    </View>
  );
}

export default ServiceRequestMapView;
