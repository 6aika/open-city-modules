import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Button from 'open-city-modules/src/components/Button';
import FormRow from 'open-city-modules/src/components/Form/FormRow';
import Attachment from 'open-city-modules/src/modules/Feedback/components/FeedbackForm/Attachment';
import { type AttachmentType } from 'open-city-modules/src/types';
import styles from './styles';
import SendImage from 'open-city-modules/img/send.png';


const ATTACHMENT_SIZE = 64;
// Button which will have an absolute position on the bottom right corner

type Props = {
  onChangeText: (text) => void,
  onAddAttachmentClick: () => void,
  attachments: ?Array<AttachmentType>
}

onChangeText = (text) => {
  // console.warn(text)
}

const FeedbackForm = ({ onChangeText, onAddAttachmentClick, attachments } : Props) => {
  return (
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
          style={styles.addAttachmentButton}
          title={'Lisää liite'}
          onPress={onAddAttachmentClick}
        />
      </View>
      <ScrollView horizontal={true} style={styles.attachmentContainer}>

        { attachments.map((attachment: AttachmentType, index: number) => (
          <Attachment
            image={attachment.image && attachment.image.source.uri}
            size={{ width: ATTACHMENT_SIZE, height: ATTACHMENT_SIZE }}
            onPress={attachment.onPress}
          />
        ))}
      </ScrollView>

    </View>
  );
}


export default FeedbackForm;
