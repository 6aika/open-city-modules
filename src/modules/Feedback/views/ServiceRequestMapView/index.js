/* @flow */
import * as React from 'react';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { type ServiceRequest } from 'open-city-modules/src/types';
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import Marker from 'open-city-modules/src/components/Marker';
import MarkerNew from 'open-city-modules/img/marker_new.png';
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
  onRegionChangeComplete: ({
      latitude: float,
      longitude: float,
      latitudeDelta: float,
      longitudeDelta: float,
  });
  onMarkerPressed: () => void;
  serviceRequests: Array<ServiceRequest>
}

const ServiceRequestMapView = ({
  region,
  onRegionChangeComplete,
  onMarkerPressed,
  serviceRequests,
}): Props => (
  <MapView
    style={styles.map}
    ref={(ref) => { this.mapView = ref; }}
    initialRegion={
      {
        latitude: Config.DEFAULT_LATITUDE,
        longitude: Config.DEFAULT_LONGITUDE,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }
    }
    region={region}
    showsUserLocation
    provider={PROVIDER_GOOGLE}
    followUserLocation={false}
    toolbarEnabled={false}
    // onRegionChange={this.onMapRegionChange(region)}
    // onPress={this.onMapViewClick.bind(this)}
    onRegionChangeComplete={onRegionChangeComplete}
  >
    { serviceRequests && serviceRequests.map(serviceRequest => {
      if (serviceRequest.location.latitude && serviceRequest.location.longitude)
        return (
          <MapView.Marker
            key={serviceRequest.id}
            coordinate={{
              latitude: parseFloat(serviceRequest.location.latitude),
              longitude: parseFloat(serviceRequest.location.longitude),
            }}
            onPress={() => onMarkerPressed(serviceRequest)}

          >
            <Marker
              icon={MarkerNew}
            />
            <MapView.Callout tooltip={true}/>
            {/* <MapView.Callout tooltip={true}>
              <EmptyMarkerCallout />
            </MapView.Callout> */}
          </MapView.Marker>
        );
      }
    )
  }
  </MapView>
);



  export default ServiceRequestMapView;
