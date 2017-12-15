import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { getConfig } from 'open-city-modules/src/modules/Feedback/config'
import MarkerPin from 'open-city-modules/img/marker_pin.png';
import MarkerIcon from 'open-city-modules/img/marker_default.png';
import Marker from 'open-city-modules/src/components/Marker'
import MapView from 'react-native-maps';
import styles from '../styles';
const MARKER_IMAGE_SIZE = 36;
const MAP_HEIGHT        = 140;
const MAP_MARGIN        = 24;

const Config = getConfig();

class Minimap extends Component {

  constructor(props, context) {
    super(props, context);

  }

  mapHeight() {
    if (!this.props.locationEnabled) {
      return {
        height: 0,
      }
    }
    else if (this.props.fullScreenMap) {
      return {
        height: Dimensions.get('window').height - MAP_MARGIN
      }
    } else {
      return {
        height: MAP_HEIGHT,
      }
    }
  }



  render() {
    return (
      <Animated.View style={[styles.container, this.mapHeight()]}>
        {this.props.locationEnabled &&
          <View style={[
            styles.mapView, {
              flex: 1,
            }]}
          >
            <MapView.Animated
              style={styles.map}
              region={{
                ...this.props.region,
                latitudeDelta: this.props.region.latitudeDelta,
                longitudeDelta: this.props.region.longitudeDelta,
              }}
              provider='google'
              showsUserLocation={false}
              followUserLocation={false}
              toolbarEnabled={false}
              scrollEnabled={this.props.fullScreenMap}
              zoomEnabled={this.props.fullScreenMap}
              onPanDrag={(e) => { if (!this.props.fullScreenMap) this.props.setFullScreenMap(true); }}
              onPress={(e) => { if (!this.props.fullScreenMap) this.props.setFullScreenMap(true); }}
              onLongPress={(e) => { if (!this.props.fullScreenMap) this.props.setFullScreenMap(true); }}
              onMarkerDragStart={(e) => { if (!this.props.fullScreenMap) this.props.setFullScreenMap(true); }}
              onRegionChangeComplete={this.props.onRegionChangeComplete}
            >
              <MapView.Marker.Animated
                ref={(m) => this.marker = m}
                coordinate={this.props.region}
                onPress={(e) => this.props.setFullScreenMap(true)}
                onDragEnd={(e) => this.updateMarkerPos(e.nativeEvent.coordinate, this.marker)}
              >
                <Image // This image hides the default marker
                  source={MarkerPin}
                  style={{ height: 0, width: 0 }}
                />
              </MapView.Marker.Animated>
            </MapView.Animated>
            <TouchableWithoutFeedback
              onPress={() => this.props.setFullScreenMap(true)}>
              <View
                style={styles.markerContainer}
                pointerEvents="none"
              >
                <Marker icon={MarkerIcon}/>
              </View>
            </TouchableWithoutFeedback>
          </View>
        }
      {/* {this.props.locationEnabled && this.props.fullScreenMap &&
        <View style={styles.doneButtonContainer}>
          <TouchableWithoutFeedback onPress={()=>this.props.onDoneClick()}>
            <Animated.View style={[styles.doneButton, this.props.animation]}>
              <Text style={styles.doneButtonText}>{transSendServiceRequest.done}</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      } */}
      </Animated.View>
    );
  }
}


export default Minimap;
