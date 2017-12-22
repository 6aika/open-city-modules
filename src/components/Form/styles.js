import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';


const styles = EStyleSheet.create({
  $inputBackground: () => Color(EStyleSheet.value('$colors.max')).alpha(0.03),
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
  picker: {
    paddingHorizontal: 16,
    borderWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    textAlignVertical: 'top',
    flexDirection: 'row',

  },
  inputContainer: {
    marginTop: 8,
  },
  inputIcon: {
    position: 'absolute',
    right: 8,
    height: '100%',
    top: '35%',
  }
});

export default styles;
