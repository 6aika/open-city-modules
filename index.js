/* @flow */
// Steps
import SingleChoiceStep from 'open-city-modules/steps/SingleChoiceStep';
import MultiChoiceStep from 'open-city-modules/steps/MultiChoiceStep';

// Modules
import OnboardingResults from 'open-city-modules/modules/OnboardingResults';

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
};
