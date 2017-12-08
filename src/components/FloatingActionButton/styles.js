import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const BUTTON_WIDTH         = 56;
const BUTTON_HEIGHT        = 56;
const BUTTON_BORDER_RADIUS = 28;

const styles = EStyleSheet.create({
  container: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_BORDER_RADIUS,
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$colors.med'
  },
  buttonView: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingActionButtonText: {
    fontSize: 16,
  },
  plusIcon: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT
  }
});

export default styles
