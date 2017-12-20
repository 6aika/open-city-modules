/* @flow */


import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import { type ServiceRequest } from 'open-city-modules/src/types'
import Icon from 'react-native-vector-icons/MaterialIcons';
import MarkerPin from 'open-city-modules/img/marker_pin.png';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from './styles';
import Color from 'color';

type Props = {
  data: { title: ?string, body: ?string };
  serviceRequest: ServiceRequest;
  onClick: () => void;
  onClose: () => void;
}

const MarkerPopup = ({
  data,
  onClick,
  onClose
}: Props) => {
  const tintColor = Color(EStyleSheet.value('$colors.med'))
  return (
    <TouchableWithoutFeedback onPress={onClose} style={styles.container}>
      <View style={styles.container}>
      <View style={styles.popup}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{data && data.title}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>{data && data.body}</Text>
        </View>
        <TouchableOpacity
          style={styles.okButton}
          onPress={onClick}
        >
          <Icon name="keyboard-arrow-right" size={32} color={tintColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Icon name="close" size={24} color={tintColor} />
        </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};


export default MarkerPopup;
