/* @flow */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  label: string,
  onPress: () => void,
  selected: boolean,
  style: any,
  icon: string,
  image: any,
};

let styles;

const SquareButton = (props: Props) => {
  const colors = EStyleSheet.value('$colors');
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={[styles.container, props.style, props.selected && styles.containerSelected]}>
          { props.icon && <Icon
            name={props.icon}
            size={40}
            color={colors.med}
          /> }
          { !props.icon && props.image && <Image
            source={props.image}
            style={styles.image}
          /> }
          <Text style={[styles.label, props.selected && styles.labelSelected]}>
            {props.label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

styles = EStyleSheet.create({
  wrapper: {
    width: '44%',
    margin: '3%',
  },
  container: {
    padding: 10,
    backgroundColor: '$colors.min',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    aspectRatio: 1,
  },
  containerSelected: {
    borderWidth: 1,
    borderColor: '$colors.med',
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
  },
  label: {
    fontSize: 20,
    color: '$colors.med',
    textAlign: 'center',
  },
  labelSelected: {
    color: '$colors.med',
  },
});

export default SquareButton;
