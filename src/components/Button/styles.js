import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';


const styles = EStyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

  },
  containerStyle: {
    height: 48,
    backgroundColor: '$colors.med',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: '$colors.max',
    shadowOffset: { height: 0, width: 0 },
    elevation: 5,
  },
  title: {
    color: '$colors.min',
    fontSize: 20,
  }
});

export default styles;
