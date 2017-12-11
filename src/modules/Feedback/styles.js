import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
const MARKER_IMAGE_SIZE = 36;

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
    width: Dimensions.get('window').width,
    height: 0,
  },
  footer: {
    height: 60,
    backgroundColor: '$colors.med',
    justifyContent: 'center',
    alignItems: 'center'
  },
  markerImage: {
    height: MARKER_IMAGE_SIZE,
    width: MARKER_IMAGE_SIZE,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  footerIcon: {
    color: '$colors.min',
    fontSize: 48,
    fontWeight: '500',
  }
});

export default styles
