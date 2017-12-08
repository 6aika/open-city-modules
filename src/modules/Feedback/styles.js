import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '$colors.min',
  },
  map: {
    flex: 1,
  },
  minimap: {
    flex: 2,
  },
  minimapFullScreen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50,
  },
  feedbackForm: {
    flex: 4,
  },
  modal: {
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
  },
  attachmentButton: {
    backgroundColor: '$colors.med'
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'flex-start',
    marginLeft: 24,
  },
  footer: {
    height: 60,
    backgroundColor: '$colors.med',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles
