/* @flow */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

type Props = {
  label: string,
  onPress: () => void,
  selected: boolean,
  containerStyle: any,
  containerSelectedStyle: any,
  labelStyle: any,
  labelSelectedStyle: any,
};

let styles;

const OptionButton = (props: Props) => {
  const containerStyles = [
    styles.container,
    props.containerStyle,
    props.selected && styles.containerSelected,
    props.selected && props.containerSelectedStyle,
  ];
  const labelStyles = [
    styles.label,
    props.labelStyle,
    props.selected && styles.labelSelected,
    props.selected && props.labelSelectedStyle,
  ];
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={containerStyles}>
        <Text style={labelStyles}>
          {props.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

styles = EStyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '$colors.min',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  containerSelected: {
    borderWidth: 1,
    borderColor: '$colors.med',
  },
  label: {
    fontSize: 20,
    color: '$colors.med',
    textAlign: 'center',
  },
  labelSelected: {
    color: '$colors.med',
  },
});

export default OptionButton;
