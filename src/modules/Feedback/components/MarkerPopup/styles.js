import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    top: 0,
    backgroundColor: '#00000040'
  },
  popup: {
    width: '100%',
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginHorizontal: 48,
  },
  body: {
    elevation: 1,
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  }

});

export default styles
