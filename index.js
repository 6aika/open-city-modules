import * as React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

class OnboardingResults extends React.Component {
  render() {
    const texts = translations[this.props.locale] ?
      translations[this.props.locale] : translations.en;
    return (
      <View style={styles.container}>
        <Text style={{color: this.props.colors.max}}>
          { texts: text }
        </Text>
      </View>
    );
  }
}

const translations = {
  en: {
    text: "Home screen on module"
  },
  fi: {
    text: "Aloitusnäkymä moduulissa"
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
