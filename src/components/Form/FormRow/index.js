/* @flow */


import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Color from 'color'
import styles from '../styles';


type Props = {
  label: ?string;
  placeholder: ?string;
  onChangeText: (text: string) => void;
}

const FormRow = ({
  label,
  placeholder,
}) => (
  <View
    style={styles.row}
  >
    <View
      style={styles.label}
    >
      <Text
        style={styles.labelText}
      >
        {label}
      </Text>
    </View>
    <View
      style={styles.inputContainer}
    >
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={(text) => { onChangeText(text); }}
      />
    </View>
  </View>
);


export default FormRow;
