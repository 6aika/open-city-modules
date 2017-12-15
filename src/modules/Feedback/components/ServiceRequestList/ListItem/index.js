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
  serviceRequest: ServiceRequest
}

const ListItem = ({
  serviceRequest
}: Props) => {

  return (
    <View>
      <Text>{serviceRequest.description}</Text>
    </View>

  );
}

export default Attachment;
