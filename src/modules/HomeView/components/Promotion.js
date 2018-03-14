/* @flow */
import React, { Component } from 'react';

import { UIManager, View, Text, TouchableWithoutFeedback, Image, TouchableOpacity, LayoutAnimation } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Wave from 'open-city-modules/src/modules/HomeView/components/Wave';
import Icon from 'react-native-vector-icons/MaterialIcons';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class Promotion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: false,
    }
  }

  hidePromotion = () => {
    this.setState({ hidden: true })
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  render = () => {
    const { promotion, index, customView, onClose, onPress } = this.props;

    const bodyStyle = this.state.hidden ? [styles.hidden] : styles.body;

    // Using zIndex to place concurrent promotions under the previous one.
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[bodyStyle, {zIndex: -1 - index}]}>
          <View style={[styles.container, { backgroundColor: promotion.bgColor }]}>
            { !customView &&
            <View>
              <Text style={[styles.titleText, { color: promotion.textColor }]}>{promotion.title}</Text>
              <Text style={[styles.bodyText, { color: promotion.textColor }]}>{promotion.body}</Text>
            </View>
            }
            { customView && customView }
          </View>
          <View style={styles.wave}>
            <Wave
              topColor={promotion.bgColor}
              bottomColor={'transparent'}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              console.warn('onclose')
              this.hidePromotion()
              onClose(promotion.id)
            }}
            style={styles.closeButton}>
            <Icon name="close" size={24} color={'white'} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingBottom: 24,
    marginBottom: 32,
    zIndex: -1,

  },
  wave: {
    marginTop: -32,
  },
  body: {
    marginTop: -32,
    zIndex: -1,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 32,
    marginHorizontal: 8,
    color: '$colors.max',
  },
  bodyText: {
    marginTop: 8,
    marginHorizontal: 8,
    color: '$colors.max',
    fontSize: 14,
  },
  closeButton: {
    position: 'absolute',
    top: 42,
    right: 12,
  },
  hidden: {
    height: 0,
  }
});

export default Promotion;
