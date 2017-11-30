import * as React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import translations from './translations';

type Props = {
  colors: ColorSet,
  locale: string // Default 'en'
};

type State = {};

/*
Component to show user's results from the onboarding
*/
class OnboardingResults extends React.Component<Props, State> {
  render() {
    const texts = translations[this.props.locale] ?
      translations[this.props.locale] : translations.en;

    return (
      <View style={styles.container}>
        <Text style={{color: this.props.colors.max}}>
          { texts.text }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default OnboardingResults;
