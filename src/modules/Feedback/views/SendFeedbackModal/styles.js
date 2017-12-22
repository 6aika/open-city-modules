import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
const MARKER_IMAGE_SIZE = 48;

const styles = EStyleSheet.create({
  $disabled: () => Color(EStyleSheet.value('$colors.min')).alpha(0.5),
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
  footer: {
    height: 60,
    backgroundColor: '$colors.med',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: 100,
  },
  footerIcon: {
    tintColor: '$colors.min',
  },
  loadingSpinner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    tintColor: '$colors.min',
  },
  disabledIcon: {
    tintColor: '$disabled',
  },
  headerTitle: {
    color: '$colors.min',
  },
  header: {
    backgroundColor: '$colors.med',
  },
  checkbox: {
    marginHorizontal: 24,
    marginTop: 12,
  }
});

export default styles;
