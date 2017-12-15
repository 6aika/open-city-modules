import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';


const styles = EStyleSheet.create({
  $inputBackground: () => Color(EStyleSheet.value('$colors.med')).alpha(0.1),
  row: {
    paddingHorizontal: 24,
    marginVertical: 12,
  },
  label: {
    marginBottom: 8,
  },
  labelText: {
    fontSize: 20,
  },
  input: {
    paddingHorizontal: 16,
    backgroundColor: '$inputBackground',
    paddingTop: 8,
    paddingBottom: 8,
    textAlignVertical: 'top',
  },
  inputContainer : {
    marginTop: 8,
  }
});

export default styles;
