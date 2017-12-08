import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';


const styles = EStyleSheet.create({
  $inputBackground: () => Color(EStyleSheet.value('$colors.med')).alpha(0.2),
  row: {
    height: 64,
    paddingHorizontal: 24,
    marginVertical: 12,
  },
  label: {
    flex: 1,
  },
  inputContainer: {
    flex: 2,
  },
  input: {
    paddingHorizontal: 16,
    backgroundColor: '$inputBackground',
    padding: 8,
  },
});

export default styles;
