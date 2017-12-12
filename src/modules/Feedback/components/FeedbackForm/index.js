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
import Picker from 'open-city-modules/src/components/Form/Picker';
import SendImage from 'open-city-modules/img/send.png';
import Attachment from 'open-city-modules/src/modules/Feedback/components/FeedbackForm/Attachment';
import { type AttachmentType, type ServiceType } from 'open-city-modules/src/types';
import styles from './styles';


const ATTACHMENT_SIZE = 64;
// Button which will have an absolute position on the bottom right corner

type Props = {
  onChangeSeleciton: (selection) => void,
  onChangeText: (text) => void,
  onAddAttachmentClick: () => void,
  attachments: ?Array<AttachmentType>,
  serviceTypes: ?Array<ServiceType>,
}

const FeedbackForm = ({
  onChangeText,
  onAddAttachmentClick,
  attachments,
  serviceTypes,
  onChangeSelection,
}: Props) => {
  return (
    <View>
      <Picker
        label="Tyyppi"
        placeholder="Valitse tyyppi"
        data={serviceTypes}
        onChangeSelection={() => {console.warn("onchange")}}
      />
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
