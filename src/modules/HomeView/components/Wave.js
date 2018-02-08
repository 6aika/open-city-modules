/* @flow */
import React from 'react';
import { Image, Dimensions } from 'react-native';
import wave2 from 'open-city-modules/img/wave2.png';
import EStyleSheet from 'react-native-extended-stylesheet';

const ASPECT_RATIO = 1080 / 50;
const screenWidth = Dimensions.get('window').width;

const Wave = (props: { topColor?: string, bottomColor?: string, style?: any }) => (
  <Image
    source={wave2}
    style={[{
      width: screenWidth,
      height: screenWidth / ASPECT_RATIO,
      backgroundColor: props.bottomColor,
    }, props.style]}
    tintColor={props.topColor}
  />
);

Wave.defaultProps = {
  topColor: EStyleSheet.value('black'),
  bottomColor: 'transparent',
  style: {},
};

export default Wave;
