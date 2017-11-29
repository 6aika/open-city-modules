import * as React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

class OnboardingResults extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Home Module Screen
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
  },
  text: {
    color: 'red'
  }
});
export default OnboardingResults;
