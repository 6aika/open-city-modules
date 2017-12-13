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
  step: any,
  totalSteps: any,
  bgColor: string,
  fgColor: string,
  previousLabel: string,
  nextLabel: string,
};

const StepBottomBar = (props: Props) => {
  // Icons for steps
  const steps = [];
  for (let stepNum = 0; stepNum < props.totalSteps; stepNum++) {
    steps.push((
      <Icon
        key={stepNum}
        name="checkbox-blank-circle"
        style={[
          styles.step,
          { color: props.fgColor },
          stepNum !== props.step ? { opacity: 0.5 } : {}]}
      />
    ));
  }
  // Navigations disabled?
  const prevNav = props.step === 0;
  const nextNav = props.nextDisabled;
  return (
    <View style={[styles.bottomBar, { backgroundColor: props.bgColor }]}>
      <View style={prevNav ? { opacity: 0.5 } : { opacity: 1 }}>
        {props.previousLabel ?
          <Button
            onPress={props.onPreviousPress}
            title={props.previousLabel}
            disabled={prevNav}
          /> :
          <TouchableOpacity onPress={props.onPreviousPress} disabled={prevNav}>
            <Icon
              name="chevron-left"
              size={40}
              style={{ color: props.fgColor }}
            />
          </TouchableOpacity>
        }
      </View>
      <View style={styles.steps}>
        {steps}
      </View>
      <View style={nextNav ? { opacity: 0.5 } : { opacity: 1 }}>
        {props.nextLabel ?
          <Button
            onPress={props.onNextPress}
            title={props.nextLabel}
            disabled={nextNav}
          /> :
          <TouchableOpacity onPress={props.onNextPress} disabled={nextNav}>
            <Icon
              name="chevron-right"
              size={40}
              style={{ color: props.fgColor }}
            />
          </TouchableOpacity>
        }
      </View>
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
  steps: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  step: {
    fontSize: 20,
  },
});

export default StepBottomBar;
