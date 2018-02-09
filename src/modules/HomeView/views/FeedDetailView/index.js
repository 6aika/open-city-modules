/* @flow */
import React from 'react';
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withBackButton } from 'open-city-modules/src/util';
import EStyleSheet from 'react-native-extended-stylesheet';
import Wave from 'open-city-modules/src/modules/HomeView/components/Wave';
import FeedActions from '../../redux/feed/actions';
import { getConfig } from '../../config';
import styles from './styles';
import transFeeds from '../../../translations';
import { t } from 'open-city-modules/src/modules/translations';

const Config = getConfig();

type Props = {
  navigation: Object,
  screenProps: any,
}

const FeedDetailView = (props: Props) => {
  const { item, type } = props.navigation.state.params;
  const Header = withBackButton(props.navigation, EStyleSheet.value('$colors.min'))(props.screenProps.Header);
  return (
    <View style={styles.container}>
      <Header
        style={{backgroundColor: EStyleSheet.value('$colors.max')}}
        titleStyle={{color: EStyleSheet.value('$colors.min')}}
      />
      <ScrollView>
        <View style={styles.topContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{t('published')} {item.date}</Text>
        </View>
        <Wave topColor={EStyleSheet.value('$colors.max')}/>
        <View style={styles.bottomContent}>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
            <Text style={styles.link}>{t(`link${type}`)}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default FeedDetailView;
