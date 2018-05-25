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
      <View style={{ height: this.state.loading ? '0%' : '100%'}}>
        <WebView
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
          source={{ uri: navigation.state.params.url }}
          style={{ flex:1, marginTop: 20 }}
          injectedJavaScript={JStoInject}
          javaScriptEnabled={true}
        />
        {this.state.loading &&
          <View style={styles.loading}>
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
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
  },
});


export default HearingDetailView;
