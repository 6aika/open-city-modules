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
  KeyboardAvoidingView,
  ToastAndroid
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import EStyleSheet from 'react-native-extended-stylesheet';
import SendIcon from 'open-city-modules/img/send.png';
import BackIcon from 'open-city-modules/img/arrow_back.png';
import CheckBox from 'open-city-modules/src/components/CheckBox';
import UpIcon from 'open-city-modules/img/map_up.png';
import { postServiceRequest } from 'open-city-modules/src/modules/Feedback/requests';
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import FeedbackForm from 'open-city-modules/src/modules/Feedback/components/FeedbackForm';
import { type AttachmentType, ServiceType } from 'open-city-modules/src/types';
import Minimap from 'open-city-modules/src/modules/Feedback/components/Minimap';
import { t } from 'open-city-modules/src/modules/Feedback/translations';
import styles from './styles';

const Config = getConfig();

class SendFeedbackModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loadingAttachment: false,
      fullScreenMap: true,
      attachments: [],
      selectedService: null,
      selectedServiceType: null,
      sendingRequest: false,
      locationEnabled: true,
      location: null,
      descriptionText: '',
      titleText: '',
    };
  }

  componentDidMount = () => {
    this.setState({ fullScreenMap: false, location: this.props.region });
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
        this.setState({ attachments: tempAttachments });
        return true;
      }
    }
    return false;
  }

  onAddAttachmentClick = () => {
    const options = {
      title: '',
      cancelButtonTitle: t('cancel'),
      takePhotoButtonTitle: t('takePhoto'),
      chooseFromLibraryButtonTitle: t('choosePhoto'),
      mediaType: 'photo',
    };

    ImagePicker.showImagePicker(options, (response) => {
      const {
        error,
        uri,
        originalRotation,
        didCancel
      } = response;
      console.warn("originalRotation: " + originalRotation)

      this.setState({ loadingAttachment: true });

      let source = null;
      let fileName = null;
      let rotation = 0;
      if (error) {
        // TODO: Error handling
        console.log("error picker")
        this.setState({ loadingAttachment: false });
        // showAlert(transError.attachmentErrorTitle, transError.attachmentErrorMessage, transError.attachmentError);
      } else if (didCancel) {
        this.setState({ loadingAttachment: false });
        source = null;
      } else {
        if (Platform.OS === 'ios') {
          source = { uri: uri.replace('file://', ''), isStatic: true };
        } else {
          source = { uri: uri, isStatic: true };


          if (originalRotation === 90) {
            rotation = 90;
          } else if (originalRotation === 180) {
            // console.warn("270")
            rotation = 180;
          }
        }

        // Compress image size
        ImageResizer.createResizedImage(
          uri,
          Config.IMAGE_MAX_HEIGHT,
          Config.IMAGE_MAX_WIDTH,
          Config.IMAGE_FORMAT,
          Config.IMAGE_QUALITY,
          rotation,
        ).then((resizedImageUri) => {
          const resizedSource = { uri: resizedImageUri, isStatic: true };
          response.path = resizedImageUri;
          response.uri = resizedImageUri;
          const tempArray = this.state.attachments;
          const image = {
            source: resizedSource,
            name: response.fileName,
          };

          const index = tempArray.length - 1;
          const attachment = {
            index,
            image,
            onPress: () => {
              this.removeAttachment(index);
            },
          };

          tempArray.push(attachment);

          this.setState({
            attachments: tempArray,
            loadingAttachment: false,
          });
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }).catch((err) => {
          console.warn("error resize");
          this.setState({ loadingAttachment: false });
          // showAlert(transError.feedbackImageErrorTitle, transError.feedbackImageErrorMessage, transError.feedbackImageErrorButton)
        });
      }
    });
  }

  sendServiceRequest = () => {
    this.setState({
      loading: true,
      sendingRequest: true,
    });
    const data = new FormData();

    data.append('service_code', this.state.selectedService);
    data.append('description', this.state.descriptionText);
    data.append('title', this.state.titleText !== null ? this.state.titleText : '');

    if (this.state.locationEnabled) {
      data.append('lat', this.state.location.latitude);
      data.append('long', this.state.location.longitude);
    }

    const attachments = this.state.attachments;
    if (attachments && attachments.length > 0) {
      attachments.map(attachment => data.append(
        'media[]',
        {
          name: attachment.image.name,
          uri: attachment.image.source.uri.uri,
          isStored: true,
          type: 'image/jpeg',
        },
      ));
    }

    const {
      requests,
      piwik
    } = this.props.screenProps;

    if (requests && requests.postServiceRequest) {
      requests.postServiceRequest(data).then((response) => {
        this.setState({
          loading: false,
          sendingRequest: false,
        });
        if (piwik) piwik.trackEvent("feedback", "feedback_sent", "User has sent a feedback: " + response, 1)
        ToastAndroid.show('Lähettäminen onnistui', ToastAndroid.SHORT);
        this.props.toggleFeedbackModal();
      });
    } else {
      postServiceRequest(data).then((response) => {
        this.setState({
          loading: false,
          sendingRequest: false,
        });
        if (piwik) piwik.trackEvent("feedback", "feedback_sent", "User has sent a feedback: " + response, 1)
        ToastAndroid.show('Lähettäminen onnistui', ToastAndroid.SHORT);
        this.props.toggleFeedbackModal();
      });
    }
  }

  onServiceTypeChange = (service: ServiceType) => {
    this.setState({
      selectedService: service.key,
      selectedServiceType: service,
    });
  }

  onChangeFeedbackText = (text: string) => {
    this.setState({ descriptionText: text });
  }

  onChangeTitleText = (text: string) => {
    this.setState({ titleText: text });
  }

  handleCheckBoxPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      locationEnabled: !this.state.locationEnabled,
    });
  }

  onMinimapRegionChange = (region) => {
    this.setState({ location: region });
  }

  validateFields = () => {
    if (this.state.descriptionText.length < 10) {
      return false;
    }

    if (!this.state.selectedServiceType) {
      return false;
    }

    if (this.state.sendingRequest) {
      return false;
    }

    return true;
  }

  render() {
    const {
      Header,
      customMapStyle,
    } = this.props.screenProps;
    const minimapStyle = this.state.fullScreenMap ? styles.minimapFullScreen : styles.minimap;
    const validFields = this.validateFields();

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        {!!Header &&
          <Header
            title={t('newFeedback').toUpperCase()}
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
        }
        {!Header &&
          <View
            style={{ flexDirection: 'row', padding: 8, justifyContent: 'space-between', marginTop: Platform.OS === 'ios' ? 24 : 0 }}
          >
            <TouchableOpacity
              onPress={() => {
                  this.props.toggleFeedbackModal();
              }}
            >
              <Image source={BackIcon} style={[styles.headerIcon, { tintColor: 'black' }]} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (validFields) {
                  this.sendServiceRequest();
                }
              }}
            >
              <Image source={SendIcon} style={[{ tintColor: 'black' }, validFields ? styles.headerIcon : styles.disabledIcon]} />
            </TouchableOpacity>
          </View>
        }
        <ScrollView style={{ flex: 1 }}>
          { this.state.locationEnabled &&
            <View style={minimapStyle} >
              <Minimap
                {...this.props}
                userPosition={this.state.location}
                region={this.props.region}
                locationEnabled
                fullScreenMap={this.state.fullScreenMap}
                setFullScreenMap={this.showFullScreenMap}
                onRegionChangeComplete={this.onMinimapRegionChange}
                customMapStyle={customMapStyle}
              />
            </View>
          }
          <View style={[styles.feedbackForm, this.state.fullScreenMap && { flex: 0 }]}>
            <View>
              <CheckBox
                onCheckBoxPress={this.handleCheckBoxPress}
                enabled={this.state.locationEnabled}
                style={styles.checkbox}
                size={20}
                label={t('includeLocation')}
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
