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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  hideFullScreenMap = () => {
    this.setState({ fullScreenMap: false });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  render() {
    const minimapStyle = this.state.fullScreenMap ? styles.minimapFullScreen : styles.minimap;
    return (
      <ScrollView style={{ flex: 1 }}>
        <Header
          title={'UUSI PALAUTE'}
          rightAction={ SendImage }
        />
        <View style={minimapStyle} >
          <Minimap
            region={this.props.region}
            locationEnabled
            setFullScreenMap={this.showFullScreenMap}
          />
          {this.state.fullScreenMap &&
            <TouchableWithoutFeedback
              onPress={this.hideFullScreenMap}
            >
              <View style={styles.footer}><Text>{'^'}</Text></View>
            </TouchableWithoutFeedback>
          }
        </View>
        {!this.state.fullScreenMap &&
          <View style={styles.feedbackForm}>
            <FeedbackForm />
          </View>
        }
      </ScrollView>
    );
  }
}

export default SendFeedbackModal;
