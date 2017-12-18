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
}

const ListItem = ({
  serviceRequest,
}: Props) => {
  console.warn(JSON.stringify(serviceRequest.item))
  return (
    <View>
      <Text>{serviceRequest.item.id}</Text>
    </View>

  );
}

export default ListItem;
