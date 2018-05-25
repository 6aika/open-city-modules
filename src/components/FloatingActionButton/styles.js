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
    // backgroundColor: '$colors.med',
    shadowRadius: 3,
    shadowColor: '$colors.max',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
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
  icon: {
    width: '50%',
    height: '50%',
  }
});

export default styles
