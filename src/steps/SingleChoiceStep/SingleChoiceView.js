/* @flow */
import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import OptionButton from 'open-city-modules/src/steps/components/OptionButton';
import StepBottomBar from 'open-city-modules/src/steps/components/StepBottomBar';

type StyleObj = {[string]: mixed};

type Props = {
  options: Array<{value: string, selected: boolean}>,
  selectedOption: ?string,
  onOptionPress: (string) => void,
  onPreviousPress: () => void,
  onNextPress: () => void,
  step: number,
  totalSteps: number,
  nextDisabled: boolean,
  t: any,
  i18n: any,
  containerStyle: ?StyleObj,
  contentStyle: ?StyleObj,
  topImage: any,
  questionStyle: ?StyleObj,
  buttonProps: any,
  bottomBarProps: any,
};

let styles;

const SingleChoiceView = ({
  options, selectedOption, onOptionPress, onPreviousPress, onNextPress, step,
  totalSteps, nextDisabled, t, i18n, containerStyle, contentStyle, topImage,
  questionStyle, buttonProps, bottomBarProps,
}: Props) => (
  <View style={[styles.container, containerStyle]}>
    <ScrollView style={[styles.content, contentStyle]}>
      { topImage && <Image style={styles.appLogo} source={topImage} resizeMode="contain" /> }
      <Text style={[styles.question, questionStyle]}>{step + 1}/{totalSteps}{'\n'}{t('question')}</Text>
      { options.map(option => (
        <OptionButton
          key={option.value}
          label={t(`options.${option.value}`)}
          onPress={() => onOptionPress(option.value)}
          selected={selectedOption === option.value}
          style={styles.button}
          {...buttonProps}
        />
      ))}
    </ScrollView>
    <StepBottomBar
      t={t}
      i18n={i18n}
      onPreviousPress={onPreviousPress}
      onNextPress={onNextPress}
      nextDisabled={nextDisabled}
      {...bottomBarProps}
    />
  </View>
);

styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '$colors.min',
  },
  appLogo: {
    marginTop: 5,
    height: 50,
    alignSelf: 'center',
  },
  content: {
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: '$colors.max',
    textAlign: 'center',
    marginVertical: 20,
  },
  question: {
    fontSize: 20,
    color: '$colors.max',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
});

export default SingleChoiceView;
