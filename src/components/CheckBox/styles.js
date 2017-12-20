import EStyleSheet from 'react-native-extended-stylesheet';


const styles = EStyleSheet.create({
  checkbox: {
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    borderRadius: 38,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  label: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  labelText: {
    textAlignVertical: 'center',
    marginLeft: 16,
  }
});

export default styles;
