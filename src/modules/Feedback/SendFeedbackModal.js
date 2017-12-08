import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Animated,
  ScrollView
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from './styles';
import Minimap from './components/Minimap'
import FeedbackForm from './components/FeedbackForm'
import Header from './components/Header'


class SendFeedbackModal extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <ScrollView style={{flex:1}}>
        <Header title ={'test'}/>
        <View style={styles.minimap} >
          <Minimap
            region={this.props.region}
            locationEnabled={true}
          />
        </View>
        <View style={styles.feedbackForm}>
          <FeedbackForm/>
        </View>
      </ScrollView>
    );
  }
}

export default SendFeedbackModal;
