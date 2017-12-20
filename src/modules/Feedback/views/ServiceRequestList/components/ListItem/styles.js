import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
const styles = EStyleSheet.create({
  $statusColor: () => Color(EStyleSheet.value('$colors.max')).alpha(0.4),
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  dateCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 32,
    backgroundColor: '$colors.med',
    alignItems: 'center',
    justifyContent: 'center',

    shadowRadius: 3,
    shadowColor: '$colors.max',
    shadowOpacity: 0.5,
    elevation: 3,
  },
  date: {
    backgroundColor: 'transparent',
    color: '$colors.min',
    fontSize: 24,
    fontWeight: '700'
  },
  description: {
    alignSelf: 'stretch',
    flex: 1,
    fontSize: 16,
    color: '$colors.max',
    marginRight: 16,
  },
  status: {
    fontSize: 14,
    color: '$colors.max',
    marginRight: 16,
  },
  item: {
    flex: 1,
  },
  title: {
    fontSize: 18,
  }

});

export default styles;
