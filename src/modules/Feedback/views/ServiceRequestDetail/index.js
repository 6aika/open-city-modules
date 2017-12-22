/* @flow */
import * as React from 'react';
import {
  View,
  Text,
  Image,
  LayoutAnimation,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import MapView from 'react-native-maps';
import { parseDate } from 'open-city-modules/src/util'
import BackIcon from 'open-city-modules/img/arrow_back.png';
import { type ServiceRequest } from 'open-city-modules/src/types';
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import UpIcon from 'open-city-modules/img/map_up.png';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';
import Marker from 'open-city-modules/src/components/Marker';
import MarkerIcon from 'open-city-modules/img/marker_default.png';
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
      fullScreenImage: false,
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

  showFullScreenMap = () => {
    this.setState({ fullScreenMap: true });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  hideFullScreenMap = () => {
    this.setState({ fullScreenMap: false, fullScreenImage: false });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  showFullScreenImage = () => {
    this.setState({ fullScreenImage: true });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  renderMultipleMedia = (mediaUrls) => {
    if (!this.state.fullScreenImage) {
      return (
        <View style={styles.attachments}>
          <TouchableOpacity
            onPress={this.showFullScreenImage}
            style={{ flex: 1 }}
          >
            <Image
              style={styles.attachmentImage}
              source={{ uri: mediaUrls[0] }}
            />
            <View style={styles.imageTag}>
              <Text style={styles.tag}>{"+" + (mediaUrls.length - 1)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    } else if (this.state.fullScreenImage) {
      return (
        <View style={styles.attachmentsFullScreen}>
          <Swiper style={{}}>
          {mediaUrls.map(media => {
            return (
              <Image
                style={styles.attachmentImageFullScreen}
                source={{ uri: media }}
              />
            )
          })}
          </Swiper>
        </View>
      )
    }

  }

  renderSingleMedia = (mediaUrl) => {
    const attachmentsStyle = this.state.fullScreenImage ? styles.attachmentsFullScreen : styles.attachments;
    const attachmentImageStyle = this.state.fullScreenImage ? styles.attachmentImageFullScreen : styles.attachmentImage;

    return (
      <View style={attachmentsStyle}>
        <TouchableOpacity
          onPress={this.showFullScreenImage}
          style={{flex:1}}
        >
          <Image
            style={attachmentImageStyle}
            source={{ uri: mediaUrl }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  renderMetadata = (serviceRequest) => {
    const minimapStyle = this.state.fullScreenMap ? styles.minimapFullScreen : styles.minimap;

    const hiddenStyle = { flex: 0 };
    const hasLocation = serviceRequest.location && serviceRequest.location.latitude ? true : false;
    if ((serviceRequest.location.latitude && serviceRequest.location.longitude)
      || serviceRequest.mediaUrl || serviceRequest.mediaUrls) {

      return (
        <View style={styles.metadata}>
          { hasLocation &&
          <View style={styles.minimap}>
            <MapView
              style={minimapStyle}
              initialRegion={{
                latitude: parseFloat(serviceRequest.location.latitude),
                longitude: parseFloat(serviceRequest.location.longitude),
                latitudeDelta: 0.007,
                longitudeDelta: 0.007,
              }}
              region={{
                latitude: parseFloat(serviceRequest.location.latitude),
                longitude: parseFloat(serviceRequest.location.longitude),
                latitudeDelta: 0.007,
                longitudeDelta: 0.007,
              }}
              provider='google'
              onPanDrag={(e) => { if (!this.state.fullScreenMap) this.showFullScreenMap(true); }}
              onPress={(e) => { if (!this.state.fullScreenMap) this.showFullScreenMap(true); }}
              onLongPress={(e) => { if (!this.state.fullScreenMap) this.showFullScreenMap(true); }}
              onMarkerDragStart={(e) => { if (!this.state.fullScreenMap) this.showFullScreenMap(true); }}
              followUserLocation={false}
              liteMode
              toolbarEnabled={false}
              scrollEnabled={true}
              zoomEnabled={true}
            >
              <MapView.Marker
                ref={(m) => this.marker = m}
                coordinate={{
                  latitude: parseFloat(serviceRequest.location.latitude),
                  longitude: parseFloat(serviceRequest.location.longitude),
                }}
              >
                <Marker icon={MarkerIcon} />
              </MapView.Marker>
            </MapView>
          </View>
          }
          {!this.state.fullScreenMap && (serviceRequest.mediaUrl) &&
            this.renderSingleMedia(serviceRequest.mediaUrl)
          }
          {!this.state.fullScreenMap && (serviceRequest.mediaUrls && serviceRequest.mediaUrls.length === 1) &&
            this.renderSingleMedia(serviceRequest.mediaUrls[0])
          }
          {!this.state.fullScreenMap && (serviceRequest.mediaUrls && serviceRequest.mediaUrls.length > 1) &&
            this.renderMultipleMedia(serviceRequest.mediaUrls)
          }
        </View>
      );
    }
  }

  render() {
    const { Header } = this.props.screenProps;
    const { serviceRequest } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Header
          style={styles.header}
          titleStyle={styles.headerTitle}
          title={parseDate(serviceRequest.updatedDateTime)}
          leftAction={{
            icon: BackIcon,
            action: this.goBack,
            style: {
              tintColor: EStyleSheet.value('$colors.min'),
            },
          }}
        />
        { this.renderMetadata(serviceRequest) }

        {(!this.state.fullScreenMap && !this.state.fullScreenImage) &&
        <View style={styles.content}>
          <ScrollView>
          { serviceRequest.title &&
            <Text style={styles.title}>{serviceRequest.title}</Text>
          }
          <Text style={styles.description}>{serviceRequest.description}</Text>
          <View style={styles.statusRow}>
            <Text style={styles.status}>{parseDate(serviceRequest.updatedDateTime) + ' Palvelupyyntö lähetetty'}</Text>
          </View>
            { serviceRequest.statusNotes &&
            <View style={styles.statusNotesContainer}>
              <Text
                multiline
                style={styles.statusNote}
              >
                {serviceRequest.statusNotes}
              </Text>
            </View>
            }
          </ScrollView>
        </View>
        }

        { (this.state.fullScreenMap || this.state.fullScreenImage) &&
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
