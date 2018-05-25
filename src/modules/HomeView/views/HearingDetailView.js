import React, { Component } from 'react';
import {
  WebView,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

class HearingDetailView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
    };
  }

  onLoadEnd = () => {
    this.setState({ loading: false })
  }

  render() {
    const { navigation } = this.props;
    const { JStoInject } = navigation.state.params;

    return (
      <View style={{flex: 1}}>
        <WebView
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
          source={{ uri: navigation.state.params.url }}
          style={{ flex: this.state.loading ? 0 : 1 }}
          injectedJavaScript={JStoInject}
          javaScriptEnabled={true}
        />
        {this.state.loading &&
          <View style={[styles.loading, { flex: this.state.loading ? 1 : 0}]}>
            <ActivityIndicator
              size={'large'}
              color={EStyleSheet.value('$colors.med')}
            />
          </View>
        }
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  loading: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});


export default HearingDetailView;
