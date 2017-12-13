import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Animated,
  LayoutAnimation,
  ScrollView,
  Platform,
  Picker
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import EStyleSheet from 'react-native-extended-stylesheet';
import SendImage from 'open-city-modules/img/send.png';
import Header from 'open-city-modules/src/components/Header';
import styles from './styles';
import Minimap from './components/Minimap'
import FeedbackForm from './components/FeedbackForm'
import { type AttachmentType, ServiceType } from 'open-city-modules/src/types';
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
// Attachment properties
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
    const options = {
      title: '',
      cancelButtonTitle: 'Peru',
      takePhotoButtonTitle: 'Ota kuva',
      chooseFromLibraryButtonTitle: 'Valitse kuva',
      mediaType: 'photo'
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

  onServiceTypeChange = (service: ServiceType) => {
    this.setState({ selectedServiceType: service })
  }

  onChangeFeedbackText = (text: string) => {
    console.warn('feedback changed')
  }

  onChangeTitleText = (text: string) => {
    console.warn('title changed')
  }



  render() {
    const minimapStyle = this.state.fullScreenMap ? styles.minimapFullScreen : styles.minimap;
    return (
      <ScrollView style={{ flex: 1 }}>
        <Header
          title={'UUSI PALAUTE'}
          rightAction={{ icon: SendImage, action: () => { console.warn('send') } }}
          leftAction={{ icon: SendImage, action: (this.props.toggleFeedbackModal) }}
        />
        <View style={minimapStyle} >
          <Minimap
            {...this.props}
            region={this.props.region}
            locationEnabled
            fullScreenMap={this.state.fullScreenMap}
            setFullScreenMap={this.showFullScreenMap}
          />
          {this.state.fullScreenMap &&
            <TouchableWithoutFeedback
              onPress={this.hideFullScreenMap}
            >
              <View style={styles.footer}><Text style={styles.footerIcon}>{'^'}</Text></View>
            </TouchableWithoutFeedback>
          }
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
    );
  }
}

export default SendFeedbackModal;
