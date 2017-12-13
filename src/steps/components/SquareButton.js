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
  icon: ?string,
  iconColor: string,
  iconSelectedColor: string,
  image: any,
  wrapperStyle: any,
  containerStyle: any,
  containerSelectedStyle: any,
  imageStyle: any,
  labelStyle: any,
  labelSelectedStyle: any,
};

let styles;

const SquareButton = (props: Props) => {
  const colors = EStyleSheet.value('$colors');
  const containerStyles = [
    styles.container,
    props.containerStyle,
    props.selected && styles.containerSelected,
    props.selected && props.containerSelectedStyle,
  ];
  const labelStyles = [
    styles.label,
    props.labelStyle,
    props.selected && styles.labelSelected,
    props.selected && props.labelSelectedStyle,
  ];
  let iconColor = colors.med;
  if (props.selected && props.iconSelectedColor) {
    iconColor = props.iconSelectedColor;
  } else if (props.iconColor) {
    // eslint-disable-next-line prefer-destructuring
    iconColor = props.iconColor;
  }
  return (
    <View style={[styles.wrapper, props.wrapperStyle]}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={containerStyles}>
          { props.icon && <Icon
            name={props.icon}
            size={40}
            color={iconColor}
          /> }
          { !props.icon && props.image && <Image
            source={props.image}
            style={[styles.image, props.imageStyle]}
          /> }
          <Text style={labelStyles}>
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
