import React, { Component } from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import styles from './styles';
// Button which will have an absolute position on the bottom right corner
import SendImage from 'open-city-modules/img/send.png';
import Wave from 'open-city-modules/src/modules/HomeView/components/Wave';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  image: ?Image,
  onPress: () => void,
  size: { width: number, height: number },
}

const Attachment = ({
  visible,
  popupData,
  toggleVisibility,
  onPressOut,
  onPress
}: Props) => {

  return (
    <View
      style={[styles.container, {height: visible ? '100%' : '0%'}]}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          width: '100%',
        }}
        activeOpacity={1}
        onPressOut={onPressOut}
      >
        <View
          style={{
            position: 'absolute',
            bottom: 0,
          }}
        >
          <Wave
            topColor="white"
            bottomColor="transparent"
            style={{transform: [{ rotate: '180deg'}]}}
          />

            <View
              style={styles.popup}
            >

              <TouchableWithoutFeedback
                // onPress={this.goToServiceRequestDetail(this.state.activeServiceRequest)}
                onPress={onPress}
              >

              <View style={{ padding: 20, }}>
                <Text
                  style={styles.title}
                >
                  {popupData.title}
                </Text>
                <Text
                  style={styles.body}
                  numberOfLines={2}
                >
                  {popupData.body}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity
              style={styles.closeButton}
              // onPress={() => this.onMapViewClick()}
              onPress={() => toggleVisibility()}
            >
              <View style={{ padding: 10 }}>
                <Icon
                  name="close"
                  size={24}
                  color="#9fc9eb"
                />
              </View>
            </TouchableOpacity>
            </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Attachment;
