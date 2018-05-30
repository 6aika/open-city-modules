/* @flow */
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { withProps } from 'recompose';
import {
  TouchableOpacity,
  Image,
} from 'react-native'

import FeedbackModule from 'open-city-modules/src/modules/Feedback';
import HomeViewModule from 'open-city-modules/src/modules/HomeView';
import Header from 'open-city-modules/src/components/Header';
import MarkerPin from 'open-city-modules/img/marker_pin_helsinki.png'
import {
  ChoiceView,
  createSingleChoiceStep,
  createMultiChoiceStep,
} from 'open-city-modules/src/steps';

import heroDecorationImage from './img/main-hero-decoration.png';
import mainImage from './img/main-image-decoration.png';
import marker from './img/marker_pin.png';


const initColors = (colors) => {
  EStyleSheet.build({
    $colors: colors,
  });
};

const colors = {
  min: 'white',
  med: 'blue',
  max: 'black',
  homefg: '#ffc61e',
  homebg: '#9fc9eb'
};

initColors(colors);

const MyGridView = withProps({ mode: 'grid' })(ChoiceView);
const MyListView = withProps({ mode: 'list' })(ChoiceView);
const MultiChoiceStep = createMultiChoiceStep(MyGridView);
const SingleChoiceStep = createSingleChoiceStep(MyListView);

const MARKER_IMAGE_SIZE = 32;


const styles = EStyleSheet.create({
  markerImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  markerContainer: {
    height: MARKER_IMAGE_SIZE,
    width: MARKER_IMAGE_SIZE,
  },
  markerIcon: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    tintColor: '$colors.min',
  },
});

const CustomMarker = ({
  onPress = () => { console.warn('click') },
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.markerContainer}
    >
      <Image
        source={MarkerPin}
        style={[
          styles.markerImage,
        ]}
      />
    </TouchableOpacity>
  );
};


const OnboardingMock = () => {
  const interestOptions = [
    { value: 'restaurants' },
    { value: 'movies' },
    { value: 'family' },
    { value: 'health' },
    { value: 'cityPlanning' },
    { value: 'exercise' },
  ];
  const customProps = {
    choiceKey: 'interests',
    options: interestOptions,
    ns: 'interestStep',
    t: str => str,
    i18n: null,
  };
  const noop = () => {};
  const stepProps = {
    ...customProps,
    next: () => console.warn('next'),
    previous: noop,
    profile: {},
    step: 0,
    totalSteps: 5,
    colors,
    locale: 'fi',
  };
  return <SingleChoiceStep {...stepProps} />;
};

const FeedbackModuleMock = () => {
  const colors = {
    min: 'white',
    med: 'blue',
    max: 'black',
  };

  const screenProps = {
    colors,
    locale: 'fi',
    profile: { },
    customMapMarker: CustomMarker
  };

  return <FeedbackModule screenProps={screenProps} />;
};

const HomeViewModuleMock = () => {
  const homeViewColors = {
    min: 'white',
    med: 'blue',
    max: 'black',
    homebg: '#ffc61e',
    homefg: '#9fc9eb'
  };

  initColors(homeViewColors);

  const screenProps = {
    Header,
    heroBanner: heroDecorationImage,
    mainImage: mainImage,
    marker: marker,
    showEvents: true,
    showHearings: false,
    showHero: false,
    locale: 'en',
    colors: homeViewColors
  };

  return (
    <HomeViewModule
      screenProps={screenProps}
    />
  );
};


// export default OnboardingMock;
export default FeedbackModuleMock;
// export default HomeViewModuleMock;
