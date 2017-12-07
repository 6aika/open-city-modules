/* @flow */
// Steps
import SingleChoiceStep from 'open-city-modules/src/steps/SingleChoiceStep';
import FeedbackModule from 'open-city-modules/src/modules/FeedbackModule';
import MultiChoiceStep from 'open-city-modules/src/steps/MultiChoiceStep';
// Modules
import OnboardingResults from 'open-city-modules/src/modules/Onboarding/OnboardingResults';

import EStyleSheet from 'react-native-extended-stylesheet';
import { type ColorSet } from 'open-city-modules/types';

const initColors = (colors: ColorSet) => {
  EStyleSheet.build({
    $colors: colors,
  });
};

export {
  initColors,
  SingleChoiceStep,
  MultiChoiceStep,
  OnboardingResults,
  FeedbackModule
};
