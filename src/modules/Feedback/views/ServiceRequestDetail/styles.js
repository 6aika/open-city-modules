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
    flexDirection: 'row'
  },
  content: {
    flex: 7,
    margin: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
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
  marker: {
    height: 48,
    width: 48,
    tintColor: '$colors.med',
  },
  attachments: {
    flex:1,
  },
  attachmentsFullScreen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50,
  },
  footer: {
    height: 60,
    backgroundColor: '$colors.med',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: 100,
  },
  footerIcon: {
    color: '$colors.min',
    fontSize: 48,
    fontWeight: '500',
  },
  attachmentImage: {
    flex: 1,
    resizeMode: 'stretch'
  },
  attachmentImageFullScreen: {
    flex: 1,
    resizeMode: 'contain'
  }
});

export default styles;
