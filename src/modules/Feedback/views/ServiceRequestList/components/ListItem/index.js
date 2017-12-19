import React, { Component } from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import { type ServiceRequest } from 'open-city-modules/src/types';
import styles from './styles';


type Props = {
  serviceRequest: ServiceRequest;
  onPress: (serviceRequest: ServiceRequest) => void;
}

const getDate = (date) => {
  return new Date(date).getDate();
}

const ListItem = ({
  serviceRequest,
  onPress
}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(serviceRequest.item)}
      style={styles.row}
    >
      <View style={styles.dateCircle}>
        <Text style={styles.date}>{getDate(serviceRequest.item.requestedDateTime)}</Text>
      </View>
      <View style={styles.item}>
        <View style={{flexDirection: 'row' }}>
          <Text numberOfLines={1} style={styles.description}>{serviceRequest.item.description}</Text>
        </View>
        <View>
          <Text style={styles.status}>{serviceRequest.item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ListItem;
