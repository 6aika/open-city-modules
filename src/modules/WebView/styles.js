import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  errorContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$colors.min',
  },
  errorText: {
    fontSize: 20,
    color: '$colors.max',
  },
});

export default styles;
