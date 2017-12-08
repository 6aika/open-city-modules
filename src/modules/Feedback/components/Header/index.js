import React from 'react';
import {
  View,
  Text
} from 'react-native';
import HeaderButton from './HeaderButton';
import styles from './styles';

// Button which will have an absolute position on the bottom right corner

type Props = {
  buttons: ?Array<HeaderButton>,
  leftAction: ?object,
  rightAction: ?object,
  title: ?string,
  override: ?boolean,
}

const Header = ({
  buttons,
  leftAction,
  rightAction,
  title,
  override = false,
}): Props => {
  const headerStyle = override ? styles.overridedHeader : styles.header;
  return (
    <View style={headerStyle}>
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
        { rightAction &&
          <View />
        }
      </View>
    </View>
  );
}


export default Header;
