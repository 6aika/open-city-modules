import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import HeaderButton from './HeaderButton';
import styles from './styles';
import SendImage from 'open-city-modules/img/send.png'

// Button which will have an absolute position on the bottom right corner

type Props = {
  buttons: ?Array<HeaderButton>,
  leftAction: ?object,
  rightAction: ?object,
  title: ?string,
}

const Header = ({
  buttons,
  leftAction,
  rightAction,
  title,
  style,
  titleStyle,
}): Props => {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.tabs}>
        { leftAction &&
          <View
            style={styles.leftAction}
          >
            <TouchableOpacity
              onPress={leftAction.action}
            >
              <Image style={[styles.image, leftAction.style]} source={leftAction.icon} />
            </TouchableOpacity>
          </View>
        }
        { rightAction && !leftAction &&
          <View style={styles.placeHolder} />
        }
        {title &&
          <View
            style={styles.titleContainer}
          >
            <Text style={[styles.title, titleStyle]}>{title}</Text>
          </View>
        }
        { buttons && buttons.map((button, index) => {
          return (
            <HeaderButton
              key={index}
              {...button}
            />
          )
          })
        }
        { rightAction &&
          <View style={styles.rightAction}>
            <TouchableOpacity
              onPress={rightAction.action}
            >
              <Image style={[styles.image, rightAction.style]} source={rightAction.icon} />
            </TouchableOpacity>
          </View>
        }
        { leftAction && !rightAction &&
          <View style={styles.placeHolder} />
        }
      </View>

    </View>
  );
}


export default Header;
