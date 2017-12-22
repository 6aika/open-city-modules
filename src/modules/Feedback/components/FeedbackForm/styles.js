import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';

const styles = EStyleSheet.create({
  addAttachmentButton: {
    backgroundColor: '$colors.max',
    borderRadius: 24,
    width: '70%',
  },
  attachmentButtonTitle: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  attachmentContainer: {
    marginHorizontal: 24,
    marginVertical: 16,
    flexDirection: 'row',
  },
  attachmentImageContainer: {
    alignSelf: 'stretch',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: () => Color(EStyleSheet.value('$colors.max')).alpha(0.2),
    marginRight: 16,
  },
  attachmentImage: {
    borderRadius: 8,
  },

  attachmentClose: {
    position: 'absolute',
    top: 2,
    right: 2,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '$colors.med'
  },
});

export default styles
