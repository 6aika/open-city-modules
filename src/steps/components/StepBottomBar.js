/* @flow */
import React from 'react';
import {
  View,
  Button,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

let styles;

type Props = {
  onPreviousPress: () => void,
  onNextPress: () => void,
  nextDisabled: boolean,
  i18n: any,
  t: any,
};

const StepBottomBar = (props: Props) => {
  const { t, i18n } = props;
  return (
    <View style={styles.bottomBar}>
      <Button
        onPress={props.onPreviousPress}
        title={t('previous')}
      />
      <Button
        onPress={() => i18n.changeLanguage('fi')}
        title="Finnish"
      />
      <Button
        onPress={() => i18n.changeLanguage('en')}
        title="English"
      />
      <Button
        disabled={props.nextDisabled}
        onPress={props.onNextPress}
        title={t('next')}
      />
    </View>
  );
};

styles = EStyleSheet.create({
  bottomBar: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '$colors.med',
  },
});

export default StepBottomBar;
