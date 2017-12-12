/* @flow */


import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Color from 'color'
import ModalSelector from 'react-native-modal-selector';
import styles from '../styles';

type Props = {
  label: string;
  placeholder: string;
  onChangeSelection: (text: string) => void;
}

const Picker = ({
  label,
  data,
  placeholder,
  onChangeSelection,
}: Props) => (
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
      <ModalSelector
        style={{alignItems: 'stretch'}}
        data={data}
        initValue={placeholder}
        onChange={onChangeSelection}
      >
        <TextInput
          style={[styles.input]}
          placeholder={placeholder}
          multiline={multiline}
        />
      </ModalSelector>
    </View>
  </View>
);


export default Picker;
