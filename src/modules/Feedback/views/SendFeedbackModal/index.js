import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  LayoutAnimation,
  ScrollView,
  Image,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import EStyleSheet from 'react-native-extended-stylesheet';
import SendIcon from 'open-city-modules/img/send.png';
import BackIcon from 'open-city-modules/img/arrow_back.png'
import CheckBox from 'open-city-modules/src/components/CheckBox'
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
      loadingAttachment: false,
      fullScreenMap: true,
      attachments: [],
      selectedServiceType: null,
      locationEnabled: true,
      userPosition: null,
      descriptionText: '',
      titleText: '',
    };
  }

  componentDidMount = () => {
    this.setState({ fullScreenMap: false, userPosition: this.props.region })
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
    };

    ImagePicker.showImagePicker(options, (response) => {
      this.setState({ loadingAttachment: true });
      
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
            loadingAttachment: false,
          });

          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        }).catch((err) => {
          console.warn("error resize")
          this.setState({ loadingAttachment: false, })
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
    data.append('description', this.state.descriptionText);
    data.append('title', this.state.titleText !== null ? this.state.titleText : '');

    if (this.state.locationEnabled) {
      data.append('lat', this.state.userPosition.latitude);
      data.append('long', this.state.userPosition.longitude);
    }

    const attachments = this.state.attachments;

    if (attachments && attachments.length > 0) {
      attachments.map(attachment => data.append(
        'media[]',
        {
          name: attachment.image.name,
          uri: attachment.image.source.uri.uri,
          isStored: true,
        },
      ));
    }


    postServiceRequest(data).then(() => {
      this.setState({
        loading: false,
      });

      this.props.toggleFeedbackModal();
    });

  }

  onServiceTypeChange = (service: ServiceType) => {
    this.setState({ selectedServiceType: service })
  }

  onChangeFeedbackText = (text: string) => {
    this.setState({ descriptionText: text })
  }

  onChangeTitleText = (text: string) => {
    this.setState({ titleText: text })
  }

  handleCheckBoxPress = () => {
    console.warn("deed")
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      locationEnabled: !this.state.locationEnabled,
    });
  }

  onMinimapRegionChange = (region) => {
    console.warn("saving regio")
    this.setState({ userPosition: region })
  }

  validateFields = () => {
    if (this.state.descriptionText.length < 10) {
      return false;
    }

    if (!this.state.selectedServiceType) {
      return false;
    }

    return true;
  }

  render() {
    const { Header } = this.props.screenProps;
    const minimapStyle = this.state.fullScreenMap ? styles.minimapFullScreen : styles.minimap;
    const validFields = this.validateFields();
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Header
          title={'UUSI PALAUTE'}
          style={styles.header}
          titleStyle={styles.headerTitle}
          rightAction={{
            icon: SendIcon,
            action: validFields ? this.sendServiceRequest : null,
            style: validFields ? styles.headerIcon : styles.disabledIcon,
          }}
          leftAction={{
            icon: BackIcon,
            action: (this.props.toggleFeedbackModal),
            style: styles.headerIcon,
          }}
        />
        <ScrollView style={{ flex: 1 }}>
          { this.state.locationEnabled &&
            <View style={minimapStyle} >
              <Minimap
                {...this.props}
                userPosition={this.state.userPosition}
                region={this.props.region}
                locationEnabled
                fullScreenMap={this.state.fullScreenMap}
                setFullScreenMap={this.showFullScreenMap}
                onRegionChangeComplete={this.onMinimapRegionChange}
              />

            </View>
          }
          <View style={[styles.feedbackForm, { flex: this.state.fullScreenMap && 0}]}>
            <View>
            <CheckBox
              onCheckBoxPress={this.handleCheckBoxPress}
              enabled={this.state.locationEnabled}
              style={styles.checkbox}
              size={20}
              onPress={() => this.handleCheckBoxPress}
              label={'Sisällytä sijainti palautteeseen'}
            />

            </View>
            <FeedbackForm
              selectedServiceType={this.state.selectedServiceType}
              serviceTypes={this.props.serviceTypes}
              attachments={this.state.attachments}
              onAddAttachmentClick={this.onAddAttachmentClick}
              onServiceTypeChange={this.onServiceTypeChange}
              onChangeTitleText={this.onChangeTitleText}
              onChangeFeedbackText={this.onChangeFeedbackText}
            />
          </View>

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
        { this.state.loading || this.state.loadingAttachment &&
          <View style={styles.loadingSpinner}>
            <ActivityIndicator size="large" color={EStyleSheet.value('$colors.med')} />
          </View>
        }
      </KeyboardAvoidingView>
    );
  }
}

export default SendFeedbackModal;
