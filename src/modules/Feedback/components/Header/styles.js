import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';

const styles = EStyleSheet.create({
  $borderColor: () => Color(EStyleSheet.value('$colors.max')).alpha(0.3),
  $inactiveBG: () => Color(EStyleSheet.value('$colors.max')).alpha(0.1),
  $inactiveText: () => Color(EStyleSheet.value('$colors.max')).alpha(0.3),
  header: {
    height: 64,
    padding: 4,
    borderWidth: 1,
    borderColor: '$borderColor',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabs: {
    flexDirection: 'row',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%'
  },
  tabButton: {
    height: 48,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  active: {
    backgroundColor: '$colors.med',
    color: '$colors.min',
  },
  inactive: {
    backgroundColor: '$inactiveBG',
    color: '$inactiveText'
  },
  label: {
    fontSize: 22,
    fontWeight: '700',
    backgroundColor: 'transparent',
    textAlign: 'center'
  }
});

export default styles
