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
  headerImage,
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
        {title && !headerImage &&
          <View
            style={styles.titleContainer}
          >
            <Text style={[styles.title, titleStyle]}>{title}</Text>
          </View>
        }
        {!title && headerImage &&
          <View>
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={headerImage}
            />
          </View>
        }
        { buttons && buttons.map((button, index) => {
          return (
            <HeaderButton
              key={index}
              {...button}
            />
          );
          })
        }
        { rightAction &&
          <View style={styles.rightAction}>
            <TouchableOpacity
              onPress={rightAction.action}
            >
              <Image
                style={[
                  styles.image,
                  rightAction.style,
                ]}
                source={rightAction.icon}
              />
            </TouchableOpacity>
          </View>
        }
      </View>

    </View>
  );
};

export default Header;
