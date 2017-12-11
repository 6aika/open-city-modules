/* @flow */
import React from 'react';
import {
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

let styles;

type Props = {
  onPreviousPress: () => void,
  onNextPress: () => void,
  nextDisabled: boolean,
  bgColor: string,
  fgColor: string,
  previousLabel: string,
  nextLabel: string,
};

const StepBottomBar = (props: Props) => {
  return (
    <View style={styles.bottomBar}>
      {props.previousLabel ?
        <Button
          onPress={props.onPreviousPress}
          title={props.previousLabel}
        /> :
        <TouchableOpacity onPress={props.onPreviousPress}>
          <Icon name="chevron-left" size={40} />
        </TouchableOpacity>
      }
      {props.nextLabel ?
        <Button
          onPress={props.onNextPress}
          title={props.nextLabel}
        /> :
        <TouchableOpacity onPress={props.onNextPress}>
          <Icon name="chevron-right" size={40} />
        </TouchableOpacity>
      }
    </View>
  );
};

styles = EStyleSheet.create({
  bottomBar: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '$colors.med',
  },
});

export default StepBottomBar;
