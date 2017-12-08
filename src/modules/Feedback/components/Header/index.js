import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Button from 'open-city-modules/src/components/Button';
import FormRow from 'open-city-modules/src/components/Form/FormRow'
import HeaderButton from './HeaderButton'
import styles from './styles';
const MAP_PAGE = 'map';
const LIST_PAGE = 'list';
// Button which will have an absolute position on the bottom right corner

type Props = {
  test: string,
  activePage: ?string,
  onMapPress: () => void,
  onListPress: () => void,
  onPress: () => void,
}

const Header = ({onMapPress, onListPress, onPress, activePage}): Props => (
  <View style={styles.header}>
    <View style={styles.tabs}>
      <HeaderButton
        onPress={onMapPress}
        active={activePage === MAP_PAGE}
        title={'KARTTA'}/>
      <HeaderButton
        onPress={onListPress}
        active={activePage === LIST_PAGE}
        title={'LISTA'}/>
    </View>
  </View>
);


export default Header;
