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
  userLocationButton: {
    position: 'absolute',
    width: 32,
    height: 32,
    top: 0,
    right: 0,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: () => Color(EStyleSheet.value('$colors.med')).alpha(0.5)
  },
  locationImage: {
    width: 24,
    height: 24,
    tintColor: '$colors.min'
  }
});

export default styles;
