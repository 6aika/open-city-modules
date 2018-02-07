import React, { Component } from 'react';
import {
  ImageBackground,
  Image,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  Text,
  Platform,
} from 'react-native';
import styles from '../styles';

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { imageUrl, headline, onPressItem, image } = this.props;
    let pic;
    if (imageUrl) {
      pic = {
        uri: imageUrl,
      };
    } else if (image) {
      pic = image;
    }


    const CardContent = (
      <View>
        { imageUrl && <ImageBackground source={pic} style={styles.cardImage} resizeMode="cover" /> }
        { image && <Image source={pic} tintColor={'black'} style={[{ width: 48, height: 48, alignSelf: 'center', margin: 24,}]} resizeMode="cover" /> }
        <View style={styles.cardOverlay}>
          <Text style={styles.cardHeadline}>{headline}</Text>
        </View>
      </View>
    );

    return (
      Platform.select({
        ios: (
          <TouchableHighlight onPress={onPressItem} style={styles.cardWrapper}>
            {CardContent}
          </TouchableHighlight>
        ),
        android: (
          <TouchableNativeFeedback onPress={onPressItem}>
            <View style={styles.cardWrapper}>
              {CardContent}
            </View>
          </TouchableNativeFeedback>
        ),
      })
    );
  }
}

export default Card;
