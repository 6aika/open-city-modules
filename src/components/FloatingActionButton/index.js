import React from 'react';
import {
  View,
  Image,
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
  onPress,
  buttonColor,
}) => (
  <TouchableOpacity
    style={[styles.container, { backgroundColor: buttonColor }]}
    onPress={onPress}
  >
    <View style={styles.buttonView}>
      {icon &&
        <Image
          source={icon}
          style={styles.icon}
        />
      }
    </View>
  </TouchableOpacity>
);


export default FloatingActionButton;
