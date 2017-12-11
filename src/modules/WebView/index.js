/* @flow */
import * as React from 'react';
import {
  WebView,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import translations from '../translations';

type Props = {
  src: String, // Secure connection is required
  locale: String,
};

/*
 WebView component
 */
class WebViewModule extends React.Component<Props> {
  // Returns a component to be rendered on WebView error
  onError = () => {
    const localeTranslations = translations[this.props.locale] ?
      translations[this.props.locale] : translations.en;
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          { localeTranslations.WebViewError }
        </Text>
      </View>
    );
  }

  render() {
    return (
      <WebView
        source={{ uri: this.props.src }}
        renderError={this.onError}
      />
    );
  }
}

export default WebViewModule;
