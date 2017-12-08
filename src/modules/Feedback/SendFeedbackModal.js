import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Animated
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from './styles';
import Minimap from './components/Minimap'
import FeedbackForm from './components/FeedbackForm'


class SendFeedbackModal extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={styles.minimap} >
          <Minimap
            region={this.props.region}
            locationEnabled={true}
          />
        </View>
        <View style={styles.feedbackForm}>
          <FeedbackForm/>
        </View>
      </View>
    );
  }
}

export default SendFeedbackModal;