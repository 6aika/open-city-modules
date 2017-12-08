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
import styles from '../styles';
// Button which will have an absolute position on the bottom right corner

type Props = {

}

onChangeText = (text) => {
  console.warn(text)
}

const FeedbackForm = () => (
  <View>
    <FormRow
      label="Otsikko"
      placeholder={"Palautteen otsikko"}
      onChangeText={onChangeText}
    />
    <FormRow
      label="Palaute"
      placeholder={"Kirjoita tähän palaute tai kehitysehdotus"}
      onChangeText={onChangeText}
      inputHeight={120}
      multiline
    />

    <View style={styles.buttonContainer}>
      <Button
        style={styles.attachmentButton}
        title={'Lisää liite'}
        onPress={() => {
          console.warn("button pressed")
        }}
      />
    </View>
  </View>
);


export default FeedbackForm;
