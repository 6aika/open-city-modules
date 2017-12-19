import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
const styles = EStyleSheet.create({
  $statusColor: () => Color(EStyleSheet.value('$colors.max')).alpha(0.4),
  footer: {
    height: 72,
  }
});

export default styles;
