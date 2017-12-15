import React, { Component } from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
// Button which will have an absolute position on the bottom right corner
import SendImage from 'open-city-modules/img/send.png';

type Props = {
  image: ?Image,
  onPress: () => void,
  size: { width: number, height: number },
}

const Attachment = ({
  image,
  onPress,
  size,
}: Props) => {

  return (
    <View style={[styles.attachmentImageContainer, { width: size.width, height: size.height }]}>
      <Image style={[styles.attachmentImage, {width: size.width, height: size.height}]}
        source={image}
      />
      <TouchableOpacity
        style={styles.attachmentClose}
        onPress={onPress}
      >
        <Text style={{color: 'white'}}>{'X'}</Text>
      </TouchableOpacity>
    </View>

  );
}

export default Attachment;
