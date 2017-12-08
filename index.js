/* @flow */
// Steps
import SingleChoiceStep from 'open-city-modules/src/steps/SingleChoiceStep';
import MultiChoiceStep from 'open-city-modules/src/steps/MultiChoiceStep';
// Modules
import WebViewModule from 'open-city-modules/src/modules/WebView';
import FeedbackModule from 'open-city-modules/src/modules/Feedback';

import EStyleSheet from 'react-native-extended-stylesheet';
import { type ColorSet } from 'open-city-modules/types';
import Development from './development';

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
  FeedbackModule,
  WebViewModule,
};
