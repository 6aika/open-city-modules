import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

// Button which will have an absolute position on the bottom right corner

type Props = {
  icon: ?string;
  onPress: ?Function;
}

const FloatingActionButton = ({
  icon,
  onPress
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
  >
    <View style={styles.buttonView}>
      {icon &&
        <Image
          source={icon}
          style={styles.plusIcon}
        />
      }
    </View>
  </TouchableOpacity>
);


export default FloatingActionButton;
