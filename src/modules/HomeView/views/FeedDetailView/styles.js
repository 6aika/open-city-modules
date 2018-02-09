import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  topContent: {
    backgroundColor: '$colors.max',
  },
  title: {
    color: '$colors.min',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  date: {
    color: '$colors.med',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  bottomContent: {
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
  description: {
    color: '$colors.max',
    fontSize: 16,
    marginBottom: 20,
  },
  link: {
    color: '$colors.med',
    fontSize: 20,
  },
});

export default styles;
