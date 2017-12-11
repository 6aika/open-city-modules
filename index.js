/* @flow */
// Steps
import createMultiChoiceStep, { MultiChoiceView } from 'open-city-modules/src/steps/MultiChoiceStep';
import createSingleChoiceStep, { SingleChoiceView } from 'open-city-modules/src/steps/SingleChoiceStep';
// Modules
import FeedbackModule from 'open-city-modules/src/modules/Feedback';
import WebViewModule from 'open-city-modules/src/modules/WebView';

import EStyleSheet from 'react-native-extended-stylesheet';
import { type ColorSet } from 'open-city-modules/src/types';
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
  WebViewModule,
  FeedbackModule,
};
