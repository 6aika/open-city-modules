/* @flow */
import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import OptionButton from 'src/steps/components/OptionButton';
import StepBottomBar from 'src/steps/components/StepBottomBar';

type Props = {
  options: Array<{value: string, selected: boolean}>,
  selectedOption: ?string,
  onOptionPress: (string) => void,
  onPreviousPress: () => void,
  onNextPress: () => void,
  nextDisabled: boolean,
  t: any,
  i18n: any,
};

let styles;

const SingleChoiceView = ({
  options, selectedOption, onOptionPress, onPreviousPress, onNextPress, nextDisabled, t, i18n,
}: Props) => (
  <View style={styles.container}>
    <ScrollView style={styles.content}>
      <Text style={styles.title}>{t('title')}</Text>
      <Text style={styles.question}>{t('question')}</Text>
      { options.map(option => (
        <OptionButton
          key={option.value}
          label={t(`options.${option.value}`)}
          onPress={() => onOptionPress(option.value)}
          selected={selectedOption === option.value}
          style={styles.button}
        />
      ))}
    </ScrollView>
    <StepBottomBar
      t={t}
      i18n={i18n}
      onPreviousPress={onPreviousPress}
      onNextPress={onNextPress}
      nextDisabled={!selectedOption}
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
  button: {
    marginBottom: 10,
  },
});

export default SingleChoiceView;
