import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import FormRow from 'open-city-modules/src/components/Form/FormRow'
import styles from '../styles';
// Button which will have an absolute position on the bottom right corner

type Props = {

}

const FeedbackForm = ({
  icon,
  onPress
}) => (
  <View>
    <FormRow
      label="test1dd"
      placeholder={"placeholder"}
    />
    <FormRow
      label="test2"
      placeholder={"placeholder"}
    />
    <FormRow
      label="test5f"
      placeholder={"placeholder"}
    />
  </View>
);


export default FeedbackForm;
