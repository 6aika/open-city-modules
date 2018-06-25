/* @flow */


import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color'
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
        style={{ alignItems: 'stretch' }}
        data={data}
        initValue={placeholder}
        cancelText="Peruuta"
        onChange={
          option => onChangeSelection({ label: option.label, key: option.key })
        }
      >
        <View style={styles.picker}>
          <Text>{value ? value : placeholder}</Text>
          <Icon
            name="keyboard-arrow-down"
            style={styles.inputIcon}
            backgroundColor='transparent'
            size={26}
            color={EStyleSheet.value('$colors.max')}
          />
        </View>

      </ModalSelector>
    </View>
  </View>
);


export default Picker;
