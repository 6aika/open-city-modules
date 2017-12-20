/* @flow */


import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from './styles';

type Props = {

}

const CheckBox = ({
  enabled,
  onCheckBoxPress,
  style,
  label,
  size = 32,
  backgroundColor = EStyleSheet.value('$colors.max'),
  color = EStyleSheet.value('$colors.min')
}: Props) => {
  return (
    <TouchableWithoutFeedback
      onPress={onCheckBoxPress}
    >
      <View style={[styles.row, style]}>
        <View style={[
          styles.checkbox,
          {
            backgroundColor: backgroundColor,
            width: size,
            height: size,
          },
        ]}>
        {enabled &&
          <Icon name="done" style={styles.icon}  size={size * 0.8} color={color} />
        }
        </View>
        <View style={styles.label}>
          <Text style={styles.labelText}>{label}</Text>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
};


export default CheckBox;
