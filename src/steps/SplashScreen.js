import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

let styles;

type Props = {
  bgImage: any,
  bgImageAspectRatio: number,
  logo: any,
  cityName: string,
  welcomeText: string,
  beginText: string,
  textColor: string,
  marginTopMultiplier: number,
  dismiss: () => void,
};

export default SplashScreen = ({
  bgImage, bgImageAspectRatio = 9 / 16, logo,
  cityName, welcomeText, beginText,
  textColor, marginTopMultiplier, dismiss,
}: Props) => {
  const textColorStyle = textColor && { color: textColor };
  const bgImageHeightStyle = { height: Dimensions.get('window').width / bgImageAspectRatio };
  return (
    <View style={styles.container}>
      { bgImage && <Image source={bgImage} style={[styles.bgImage, bgImageHeightStyle]} /> }
      <View style={[styles.city, marginTopMultiplier && { marginTop: Dimensions.get('window').width * marginTopMultiplier }]}>
        { logo && <Image source={logo} style={styles.logo} />}
        <Text style={[styles.cityName, textColorStyle]}>{cityName}</Text>
      </View>
      <Text style={[styles.welcomeText, textColorStyle]}>{welcomeText}</Text>
      <TouchableOpacity onPress={dismiss}>
        <View style={styles.beginButton}>
          <Text style={[styles.beginText, textColorStyle]}>{beginText}</Text>
          <Icon name="chevron-right" size={30} style={textColorStyle} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bgImage: {
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  city: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  cityName: {
    marginLeft: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  welcomeText: {
    flex: 1,
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  beginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  beginText: {
    fontSize: 20,
  },
});
