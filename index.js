/* @flow */
// Steps
import createMultiChoiceStep, { MultiChoiceView } from 'src/steps/MultiChoiceStep';
import createSingleChoiceStep, { SingleChoiceView } from 'src/steps/SingleChoiceStep';
// Modules
import FeedbackModule from 'src/modules/Feedback';
import OnboardingResults from 'src/modules/Onboarding/OnboardingResults';

import EStyleSheet from 'react-native-extended-stylesheet';
import { type ColorSet } from 'src/types';
import Development from './development'

const initColors = (colors: ColorSet) => {
  EStyleSheet.build({
    $colors: colors,
  });
};

export {
  initColors,
  createSingleChoiceStep, SingleChoiceView,
  createMultiChoiceStep, MultiChoiceView,
  OnboardingResults,
  FeedbackModule,
};
