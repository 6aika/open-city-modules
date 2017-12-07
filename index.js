/* @flow */
// Steps
import { AppRegistry } from 'react-native'
import SingleChoiceStep from 'open-city-modules/src/steps/SingleChoiceStep';
import MultiChoiceStep from 'open-city-modules/src/steps/MultiChoiceStep';
import App from 'open-city-modules/App'
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

AppRegistry.registerComponent('OpenCityModules', () => App);
