/* @flow */
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

type Props = {
  label: string,
  icon: any,
  onPress: () => void,
};

const MenuItem = (props: Props) => (
  <TouchableOpacity onPress={props.onPress} style={styles.container}>
    <View style={styles.iconWrapper}>
      <Image source={props.icon} style={styles.icon} />
    </View>
    <Text style={styles.label}>{props.label}</Text>
  </TouchableOpacity>
);

const ICON_WRAPPER_SIZE = 60;
const ICON_SIZE = 35;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '$colors.max',
    padding: 25,
    marginHorizontal: 10,
    marginTop: 5,
    alignItems: 'center',
  },
  iconWrapper: {
    width: ICON_WRAPPER_SIZE,
    height: ICON_WRAPPER_SIZE,
    borderRadius: ICON_WRAPPER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$colors.med',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    tintColor: '$colors.min',
  },
  label: {
    flex: 1,
    marginLeft: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '$colors.min',
  },
});

export default MenuItem;
