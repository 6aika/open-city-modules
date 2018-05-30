import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },
  popup: {
    width: '100%',
    height: 200,
    backgroundColor: '$colors.min',
    paddingHorizontal: 32,
  },
  okButton: {
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    left: 2,
    top: 2,
  },
  headerText: {
    paddingTop: 4,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    marginHorizontal: 16,
  },
  bodyText: {

  }
});

export default styles;
