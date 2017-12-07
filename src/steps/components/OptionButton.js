/* @flow */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

type OptionButtonProps = {
  label: string,
  onPress: () => void,
  selected: boolean,
  style: any,
}

let styles;

const OptionButton = (props: OptionButtonProps) => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={[styles.container, props.style, props.selected && styles.containerSelected]}>
      <Text style={[styles.label, props.selected && styles.labelSelected]}>
        {props.label}
      </Text>
    </View>
  </TouchableOpacity>
);

styles = EStyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '$colors.min',
    borderWidth: 2,
    borderColor: '$colors.max',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSelected: {
    backgroundColor: '$colors.max',
  },
  label: {
    fontSize: 20,
    color: '$colors.max',
    textAlign: 'center',
  },
  labelSelected: {
    color: '$colors.min',
  },
});

export default OptionButton;
