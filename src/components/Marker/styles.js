import EStyleSheet from 'react-native-extended-stylesheet';

const MARKER_IMAGE_SIZE = 48;

const styles = EStyleSheet.create({
  markerImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    tintColor: '$colors.med',
  },
  markerContainer: {
    height: MARKER_IMAGE_SIZE,
    width: MARKER_IMAGE_SIZE,
  },
  markerIcon: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
});

export default styles;
