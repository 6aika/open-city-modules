import { Dimensions } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '$colors.med'
  },
  headerTitle: {
    color: '$colors.min'
  },
  metadata: {
    flex: 2,
  },
  content: {
    flex: 7,
    marginHorizontal: 24,
  },
  description: {
    fontSize: 16,
  },
  status: {
    marginVertical: 8,
    fontSize: 12,
  },
  minimapFullScreen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50,
  },
  minimap: {
    flex: 1,
  },
});

export default styles;
