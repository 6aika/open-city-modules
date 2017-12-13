import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  LayoutAnimation,
  ScrollView,
  Image,
  Platform,
  ActivityIndicator
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import EStyleSheet from 'react-native-extended-stylesheet';
import SendIcon from 'open-city-modules/img/send.png';
import BackIcon from 'open-city-modules/img/arrow_back.png'
import Header from 'open-city-modules/src/components/Header';
import UpIcon from 'open-city-modules/img/map_up.png'
import { postServiceRequest } from 'open-city-modules/src/modules/Feedback/requests'
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import FeedbackForm from 'open-city-modules/src/modules/Feedback/components/FeedbackForm'
import { type AttachmentType, ServiceType } from 'open-city-modules/src/types';
import Minimap from 'open-city-modules/src/modules/Feedback/components/Minimap'
import styles from './styles';

const Config = getConfig();

class SendFeedbackModal extends Component {
  constructor(props, context) {
    super(props, context);


    this.state = {
      fullScreenMap: false,
      attachments: [],
      pickerData: [],
      selectedServiceType: null,
    };
  }

  componentDidMount = () => {

  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ pickerData: nextProps.serviceTypes })
  }

  showFullScreenMap = () => {
    this.setState({ fullScreenMap: true });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  hideFullScreenMap = () => {
    this.setState({ fullScreenMap: false });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  removeAttachment = (index) => {
    const tempAttachments = this.state.attachments;
    for (let i = 0; i < tempAttachments.length; i++) {
      if (tempAttachments[i].index === index) {
        tempAttachments.splice(i, 1);
        this.setState({ attachments: tempAttachments })
        return true;
      }
    }
    return false;
  }

  onAddAttachmentClick = () => {
    const options = {
      title: '',
      cancelButtonTitle: 'Peru',
      takePhotoButtonTitle: 'Ota kuva',
      chooseFromLibraryButtonTitle: 'Valitse kuva',
      mediaType: 'photo',
      feedbackText: '',
      titleText: '',
    };

    ImagePicker.showImagePicker(options, (response) => {
      let source = null;
      let fileName = null;

      if (response.error) {
        // TODO: Error handling
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
          Config.IMAGE_MAX_HEIGHT,
          Config.IMAGE_MAX_WIDTH,
          Config.IMAGE_FORMAT,
          Config.IMAGE_QUALITY,
        ).then((resizedImageUri) => {
          const resizedSource = { uri: resizedImageUri, isStatic: true };
          response.path = resizedImageUri;
          response.uri = resizedImageUri;
          const tempArray = this.state.attachments
          const image = {
            data: response,
            source: resizedSource,
            name: response.fileName
          }

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

  sendServiceRequest = () => {
    console.warn("Sending...")
    this.setState({ loading: true });
    const data = new FormData();

    data.append('service_code', this.state.selectedServiceType.key);
    data.append('description', this.state.feedbackText);
    data.append('title', this.state.titleText !== null ? this.state.titleText : '');

    if (this.state.locationEnabled &&
        this.state.markerPosition.latitude !== null &&
        this.state.markerPosition.longitude !== null) {
      data.append('lat', this.state.markerPosition.latitude);
      data.append('long', this.state.markerPosition.longitude);
    }

    const attachments = this.state.attachments;

    if (attachments && attachments.length > 0) {
      const mediaUrls = [];
      for(key in attachments) {
        const attachment = attachments[key];
        const file = {
          uri: attachment.image.source,
          isStored: true,
        }
        mediaUrls.push({
          ...file,
          name: attachment.image.name,
          type: 'image/jpeg',
        })
      }

      data.append('media_urls', mediaUrls)
    }
    console.warn(data)
    postServiceRequest(data).then(() => {
      this.setState({
        loading: false,
      });
    });

  }

  onServiceTypeChange = (service: ServiceType) => {
    this.setState({ selectedServiceType: service })
  }

  onChangeFeedbackText = (text: string) => {
    console.warn('feedback changed')
    this.setState({ feedbackText: text })
  }

  onChangeTitleText = (text: string) => {
    console.warn('title changed')
    this.setState({ titleText: text })
  }



  render() {
    const minimapStyle = this.state.fullScreenMap ? styles.minimapFullScreen : styles.minimap;
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={'UUSI PALAUTE'}
          rightAction={{ icon: SendIcon, action: this.sendServiceRequest }}
          leftAction={{ icon: BackIcon, action: (this.props.toggleFeedbackModal) }}
        />
        <ScrollView style={{ flex: 1 }}>
          <View style={minimapStyle} >
            <Minimap
              {...this.props}
              region={this.props.region}
              locationEnabled
              fullScreenMap={this.state.fullScreenMap}
              setFullScreenMap={this.showFullScreenMap}
            />

          </View>
          {!this.state.fullScreenMap &&
            <View style={styles.feedbackForm}>
              <FeedbackForm
                selectedServiceType={this.state.selectedServiceType}
                serviceTypes={this.state.pickerData}
                attachments={this.state.attachments}
                onAddAttachmentClick={this.onAddAttachmentClick}
                onServiceTypeChange={this.onServiceTypeChange}
                onChangeTitleText={this.onChangeTitleText}
                onChangeFeedbackText={this.onChangeFeedbackText}
              />
            </View>
          }
        </ScrollView>
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
        { this.state.loading &&
          <View style={styles.loadingSpinner}>
            <ActivityIndicator size="large" color={EStyleSheet.value('$colors.med')} />
          </View>
        }
      </View>
    );
  }
}

export default SendFeedbackModal;
