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
  onChangeSelection: (selection: string) => void;
  data: Array<{key: string, label: string}>;
  value: string;
}

const Picker = ({
  label,
  data,
  placeholder,
  onChangeSelection,
  value,
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
        onChange={
          option => onChangeSelection({ label: option.label, key: option.key })
        }
      >
        <TextInput
          style={[styles.input]}
          placeholder={placeholder}
          multiline={false}
          value={value}
        />
      </ModalSelector>
    </View>
  </View>
);


export default Picker;
