/* @flow */
import React, { Component } from 'react';
import {
  UIManager,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Wave from 'open-city-modules/src/modules/HomeView/components/Wave';
import Icon from 'react-native-vector-icons/MaterialIcons';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class Promotion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: false,
    };

    this.hidePromotion = this.hidePromotion.bind(this)
  }

  hidePromotion = (id) => () => {
    this.props.onClose(id);
    this.setState({ hidden: true });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  render = () => {
    const {
      promotion,
      index,
      customView,
    } = this.props;

    const bodyStyle = styles.body;

    // Using zIndex to place concurrent promotions under the previous one.

    if (this.state.hidden) {
      return (<View/>)
    }

    return (
      <TouchableWithoutFeedback onPress={() => {
          this.props.navigation.navigate(promotion.targetTab);
        }}
      >
        <View
          style={[bodyStyle,
            { zIndex: -1 - index }
          ]}
        >

          <View style={[styles.container, { backgroundColor: promotion.bgColor }]}>
            {/* <View style={styles.wave}>
              <Wave
                topColor={'transparent'}
                bottomColor={promotion.bgColor}
              />
            </View> */}
            { !customView &&
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                { promotion.image &&
                  <Image
                    style={styles.image}
                    source={promotion.image}
                  />
                }
                <View style={{ borderWidth: 1, paddingRight: 24 }}>
                  <Text
                    style={[styles.titleText, { color: promotion.textColor }]}
                  >
                    {promotion.title}
                  </Text>
                  <Text
                    multiLine
                    style={[styles.bodyText, { color: promotion.textColor }]}
                  >
                    {promotion.body}
                  </Text>
                  {promotion.footer &&
                    <Text
                      style={[styles.footer, { color: promotion.textColor }]}
                    >
                      {promotion.footer}
                    </Text>
                  }
                </View>
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
            onPress={this.hidePromotion(promotion.id)}
            style={styles.closeButton}
          >
            <Icon name="close" size={24} color={'white'} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingBottom: 24,
    marginBottom: 32,
    zIndex: -1,
    paddingHorizontal: 12,

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
  footer: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 8,
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
    backgroundColor: 'transparent',
  },
  hidden: {
    height: 0,
  },
  image: {
    height: 64,
    width: 64,
  },
});

export default Promotion;
