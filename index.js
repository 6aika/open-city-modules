/* @flow */
// Steps
import {
  ChoiceView,
  createSingleChoiceStep,
  createMultiChoiceStep,
} from 'open-city-modules/src/steps';
// Modules
import FeedbackModule from 'open-city-modules/src/modules/Feedback';
import WebViewModule from 'open-city-modules/src/modules/WebView';

import EStyleSheet from 'react-native-extended-stylesheet';
import { type ColorSet } from 'open-city-modules/src/types';
// eslint-disable-next-line
import Development from './development'

const initColors = (colors: ColorSet) => {
  EStyleSheet.build({
    $colors: colors,
  });
};

export {
  initColors,
  ChoiceView, createSingleChoiceStep, createMultiChoiceStep,
  WebViewModule, FeedbackModule,
};
