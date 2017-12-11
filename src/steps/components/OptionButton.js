/* @flow */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';

type Props = {
  label: string,
  onPress: () => void,
  selected: boolean,
  style: any,
};

let styles;

const OptionButton = (props: Props) => (
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
    borderBottomWidth: 2,
    borderColor: Color('black').alpha(0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSelected: {
    backgroundColor: '$colors.med',
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
