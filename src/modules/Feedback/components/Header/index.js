import React from 'react';
import {
  View,
  Text,
  Image,
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
}): Props => {
  return (
    <View style={styles.header}>
      <View style={styles.tabs}>
        { leftAction &&
          <View />
        }
        {title &&
          <View style={styles.titleContainer} ><Text style={styles.title}>{title}</Text></View>
        }
        { buttons && buttons.map((button) => {
          return (
            <HeaderButton
              {...button}
            />
          )
          })
        }

      </View>
      { rightAction &&
        <View style={styles.rightAction}>
          <Image style={[styles.image]} source={rightAction} />
        </View>
      }
    </View>
  );
}


export default Header;
