/* @flow */


import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import styles from './styles';


type Props = {
  title: string;
  onPress: () => void;
  style: Object;
  titleStyle: Object;
}

const Button = ({
  title,
  onPress,
  style,
  titleStyle,
}: Props) => (
  <TouchableOpacity
    style={[styles.containerStyle, style]}
    onPress={onPress}
  >
    <View style={[styles.button]}>
      {title &&
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      }
    </View>
  </TouchableOpacity>
);


export default Button;
