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
  mode: 'list' | 'grid',
  options: Array<{value: string, selected: boolean}>,
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

const ChoiceView = ({
  mode, options, onOptionPress, onPreviousPress, onNextPress, step,
  totalSteps, nextDisabled, containerStyle, contentStyle, topImage, t,
  questionStyle, buttonProps, bottomBarProps,
}: Props) => {
  let buttons;
  if (mode === 'list') {
    buttons = options.map(option => (
      <OptionButton
        key={option.value}
        label={t(`options.${option.value}`)}
        onPress={() => onOptionPress(option.value)}
        selected={option.selected}
        style={styles.listButton}
        {...buttonProps}
      />
    ));
  } else if (mode === 'grid') {
    buttons = (
      <View style={styles.buttonContainer}>
        { options.map(option => (
          <View key={option.value} style={styles.buttonWrapper}>
            <OptionButton
              label={t(`options.${option.value}`)}
              onPress={() => onOptionPress(option.value)}
              selected={option.selected}
              style={styles.gridButton}
              {...buttonProps}
            />
          </View>
        ))}
      </View>
    );
  }
  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView style={[styles.content, contentStyle]}>
        { topImage && <Image style={styles.appLogo} source={topImage} resizeMode="contain" /> }
        <Text style={[styles.question, questionStyle]}>{step + 1}/{totalSteps}{'\n'}{t('question')}</Text>
        { buttons }
      </ScrollView>
      <StepBottomBar
        onPreviousPress={onPreviousPress}
        onNextPress={onNextPress}
        nextDisabled={nextDisabled}
        step={step}
        totalSteps={totalSteps}
        {...bottomBarProps}
      />
    </View>
  );
};

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
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  buttonWrapper: {
    width: '46%',
    margin: '2%',
  },
  gridButton: {
    aspectRatio: 1,
  },
  listButton: {
    marginBottom: 10,
  },
});

export default ChoiceView;
