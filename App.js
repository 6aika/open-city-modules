/* @flow */
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import FeedbackModule from 'open-city-modules/src/modules/Feedback';
import createMultiChoiceStep, { MultiChoiceView } from 'open-city-modules/src/steps/MultiChoiceStep';
import createSingleChoiceStep, { SingleChoiceView } from 'open-city-modules/src/steps/SingleChoiceStep';

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
const SingleChoiceStep = createSingleChoiceStep(SingleChoiceView);

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
  return <SingleChoiceStep {...stepProps} />;
};

export default OnboardingMock;
