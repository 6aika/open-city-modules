import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

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
    backgroundColor: 'red',
  },
  feedbackForm: {
    flex: 4,
    backgroundColor: 'yellow',
  },
  modal: {
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
  }
});

export default styles
