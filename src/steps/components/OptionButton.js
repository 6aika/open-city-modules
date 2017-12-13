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
