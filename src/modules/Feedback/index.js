/* @flow */
import * as React from 'react';
import {
  View,
  Dimensions,
  LayoutAnimation,
  Modal,
  Platform,
} from 'react-native';
import MapView from 'react-native-maps';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { StackNavigator } from 'react-navigation';
import { type AttachmentType } from 'open-city-modules/src/types';
import FloatingActionButton from 'open-city-modules/src/components/FloatingActionButton';
import SendFeedbackModal from './SendFeedbackModal';
import Header from './components/Header';
import styles from './styles';

const MAP_PAGE = 'map';
const LIST_PAGE = 'list';

const IMAGE_MAX_HEIGHT = 1080;
const IMAGE_MAX_WIDTH = 1980;
const IMAGE_QUALITY = 60;
const IMAGE_FORMAT = 'JPEG';

type Props = {
  // next: Profile => void, // provided by Onboarding
  // previous: Profile => void, // provided by Onboarding
  // profile: Profile, // provided by Onboarding
  // options: Array<{value: string}>,
  //   // array of options, value is saved to the profile object and used as translation key
  // choiceKey: string, // choice is saved in the profile object with this key as the property name
  // ns: string,
  // t: string => string,
  // i18n: any,
};

type State = {
  text: ?string,
  region: ?Object,
  showFeedbackModal: boolean,
  feedbackModalHeight: ?number,
  activePage: string,
  markerPosition: ?Object,
};

// Default region set as Helsinki
const DEFAULT_LATITUDE = 61.4983875;
const DEFAULT_LONGITUDE = 23.752394;
const DEFAULT_LATITUDE_DELTA = 0.02208;
const DEFAULT_LONGITUDE_DELTA = 0.01010;


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
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
      },
      markerPosition: null,
      showFeedbackModal: false,
      activePage: MAP_PAGE,
      attachments: [],
    };
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
    this.setState({
      region
    });
  }

  toggleFeedbackModal = () => {
    if (this.state.showFeedbackModal) {
      this.setState({
        showFeedbackModal: false,
        feedbackModalHeight: 0,
      });
    } else if (!this.state.showFeedbackModal) {
      this.setState({
        showFeedbackModal: true,
        feedbackModalHeight: Dimensions.get('window').height,
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

  removeAttachment = (index) => {
    const tempAttachments = this.state.attachments;
    let found;
    for (let i = 0; i < tempAttachments.length; i++) {
      if(tempAttachments[i].index === index) {
        tempAttachments.splice(i, 1);
        this.setState({ attachments: tempAttachments })
        return true;
      }
    }
    return false;
  }

  onAddAttachmentClick = () => {
    console.warn("onadd")
    const options = {
      title: '',
      cancelButtonTitle: 'Peru',
      takePhotoButtonTitle: 'Ota kuva',
      chooseFromLibraryButtonTitle: 'Valitse kuva',
      mediaType: 'photo'
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.warn("imagepicker")
      let source = null;
      let fileName = null;

      if (response.error) {
        console.warn("error picker")
        // showAlert(transError.attachmentErrorTitle, transError.attachmentErrorMessage, transError.attachmentError);
      } else if (response.didCancel) {
        source = null;
      } else {

        if (Platform.OS === 'ios') {
          source = { uri: response.uri.replace('file://', ''), isStatic: true };
        } else {
          source = { uri: response.uri, isStatic: true };
        }

        // Compress image size
        ImageResizer.createResizedImage(
          response.uri,
          IMAGE_MAX_HEIGHT,
          IMAGE_MAX_WIDTH,
          IMAGE_FORMAT,
          IMAGE_QUALITY,
        ).then((resizedImageUri) => {
          console.warn("imageresizer")

          const resizedSource = { uri: resizedImageUri, isStatic: true };

          response.path = resizedImageUri;
          response.uri = resizedImageUri;
          const tempArray = this.state.attachments
          const image = { source: resizedSource, name: response.fileName }
          const index = tempArray.length - 1;
          const attachment = {
            index,
            image,
            onPress: () => {
              this.removeAttachment(index)
            },
          };
          tempArray.push(attachment)

          this.setState({
            image,
            imageData: response,
            attachments: tempArray,
          });

          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        }).catch((err) => {
          console.warn("error resize")
          // showAlert(transError.feedbackImageErrorTitle, transError.feedbackImageErrorMessage, transError.feedbackImageErrorButton)
        });
      }
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
          <MapView
            style={styles.map}
            ref={(ref) => { this.mapView = ref; }}
            region={this.state.region}
            showsUserLocation
            followUserLocation={false}
            toolbarEnabled={false}
            // onRegionChange={this.onMapRegionChange(region)}
            // onPress={this.onMapViewClick.bind(this)}
            onRegionChangeComplete={this.onMapRegionChange}
          />

        </View>
        }
        {this.state.showFeedbackModal &&
          <Modal style={[styles.modal]}>
            <SendFeedbackModal
              toggleFeedbackModal={this.toggleFeedbackModal}
              region={this.state.region}
              onRegionChangeComplete={this.onMapRegionChange}
              onRegionChange={this.onRegionChange}
              onAddAttachmentClick={this.onAddAttachmentClick}
              attachments={this.state.attachments}
            />
          </Modal>
        }
        <FloatingActionButton
          onPress={() => {
            // this.props.navigation.navigate('SendRequest', {region: this.state.region})
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


export default FeedbackStack;
