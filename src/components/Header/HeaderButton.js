import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
// Button which will have an absolute position on the bottom right corner

type Props = {
  title: string,
  active: boolean,
  onPress: () => void,
}

const HeaderButton = ({
  title,
  active = false,
  onPress,
}: Props) => {
  const activeStyle = active ? styles.active : styles.inactive;
  const activeBGStyle = active ? styles.activeBackground : styles.inactiveBackground;
  return (
    <TouchableOpacity
      style={[styles.tabButton, activeBGStyle]}
      onPress={onPress}
    >
      <Text style={[activeStyle, styles.label]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default HeaderButton;
