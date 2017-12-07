import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';


const styles = EStyleSheet.create({
  $inputBackground: Color('white').darken(0.8),
  row: {
    height: 64,
    paddingHorizontal: 24,
  },
  label: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 16,
    backgroundColor: '$inputBackground',
  }
});

export default styles
