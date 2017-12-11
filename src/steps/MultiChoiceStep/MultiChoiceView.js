/* @flow */
import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import OptionButton from 'open-city-modules/src/steps/components/OptionButton';
import StepBottomBar from 'open-city-modules/src/steps/components/StepBottomBar';

let styles;

type Props = {
  options: Array<{value: string, selected: boolean}>,
  onOptionPress: (string) => void,
  onPreviousPress: () => void,
  onNextPress: () => void,
  nextDisabled: boolean,
  t: any,
  i18n: any,
  step: any,
  totalSteps: any,
};

const MultiChoiceView = ({
  options,
  onOptionPress,
  onPreviousPress,
  onNextPress,
  nextDisabled,
  t,
  i18n,
  step,
  totalSteps,
}: Props) => (
  <View style={styles.container}>
    <ScrollView style={styles.content}>
      <Text style={styles.title}>{t('title')}</Text>
      <Text style={styles.question}>{t('question')}</Text>
      <View style={styles.buttonContainer}>
        { options.map(option => (
          <View key={option.value} style={styles.buttonWrapper}>
            <OptionButton
              label={t(`options.${option.value}`)}
              onPress={() => onOptionPress(option.value)}
              selected={option.selected}
              style={styles.button}
            />
          </View>
        ))}
      </View>
    </ScrollView>
    <StepBottomBar
      t={t}
      i18n={i18n}
      onPreviousPress={onPreviousPress}
      onNextPress={onNextPress}
      nextDisabled={nextDisabled}
      step={step}
      totalSteps={totalSteps}
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
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  buttonWrapper: {
    width: '46%',
    margin: '2%',
  },
  button: {
    aspectRatio: 1,
  },
});

export default MultiChoiceView;
