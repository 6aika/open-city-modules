/* @flow */
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import FeedbackModule from './src/modules/Feedback';
import createMultiChoiceStep, { MultiChoiceView } from './src/steps/MultiChoiceStep';

const initColors = (colors) => {
  EStyleSheet.build({
    $colors: colors,
  });
};

const colors = {
  min: 'white',
  med: 'blue',
  max: 'black',
};

initColors(colors);

const MultiChoiceStep = createMultiChoiceStep(MultiChoiceView);

const OnboardingMock = () => {
  const interestOptions = [
    { value: 'restaurants' },
    { value: 'movies' },
    { value: 'family' },
    { value: 'health' },
    { value: 'cityPlanning' },
    { value: 'exercise' },
  ];
  const customProps = {
    choiceKey: 'interests',
    options: interestOptions,
    ns: 'interestStep',
    t: str => str,
    i18n: null,
  };
  const noop = () => {};
  const stepProps = {
    ...customProps,
    next: noop,
    previous: noop,
    profile: {},
    step: 0,
    totalSteps: 1,
    colors,
    locale: 'fi',
  };
  return <MultiChoiceStep {...stepProps} />;
};

export default OnboardingMock;
