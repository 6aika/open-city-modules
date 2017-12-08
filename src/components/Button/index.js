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
}

const Button = ({
  title,
  onPress,
}: Props) => (
  <TouchableOpacity
    onPress={onPress}
  >
    <View style={styles.button}>
      {title &&
        <Text style={styles.title}>{title}</Text>
      }
    </View>
  </TouchableOpacity>
);


export default Button;
