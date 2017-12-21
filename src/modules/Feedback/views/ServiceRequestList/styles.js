import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
const styles = EStyleSheet.create({
  $statusColor: () => Color(EStyleSheet.value('$colors.max')).alpha(0.4),
  footer: {
    height: 72,
  },
  sectionHeader: {
    fontSize: 18,
    backgroundColor: 'transparent',
    fontWeight: 'bold'
  },
  sectionHeaderContainer: {
    flex: 1,
    marginVertical: 12,
    marginHorizontal: 24,
  }
});

export default styles;
