import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Animated,
  LayoutAnimation,
  ScrollView
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SendImage from 'open-city-modules/img/send.png'
import styles from './styles';
import Minimap from './components/Minimap'
import FeedbackForm from './components/FeedbackForm'
import Header from './components/Header'

class SendFeedbackModal extends Component {
  constructor(props, context) {
    super(props, context);


    this.state = {
      fullScreenMap: false,
    };
  }

  showFullScreenMap = () => {
    this.setState({ fullScreenMap: true });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  hideFullScreenMap = () => {
    this.setState({ fullScreenMap: false });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }



  render() {
    console.warn(this.props.attachments && this.props.attachments.length)
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
              attachments={this.props.attachments}
              onAddAttachmentClick={this.props.onAddAttachmentClick}
            />
          </View>
        }
      </ScrollView>
    );
  }
}

export default SendFeedbackModal;
