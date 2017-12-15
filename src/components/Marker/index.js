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

import MarkerPin from 'open-city-modules/img/marker_pin.png';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from './styles';

type Props = {
  tintColor: ?string;
  icon: ?string;
  onPress: () => void;
  customStyle: ?Object;
}

const Marker = ({
  tintColor = EStyleSheet.value('$colors.med'),
  icon,
  onPress,
  customStyle,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.markerContainer}
    >
      <Image
        source={MarkerPin}
        style={[
          styles.markerImage,
          customStyle,
          { tintColor: tintColor }
        ]}
      />
      {icon &&
        <Image
          source={icon}
          style={styles.markerIcon}
        />
      }
    </TouchableOpacity>
  );
};


export default Marker;
