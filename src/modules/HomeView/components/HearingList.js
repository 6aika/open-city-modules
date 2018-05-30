import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { t } from 'open-city-modules/src/modules/translations';
import CardList from './CardList';
import Config from '../config.json';
import styles from '../styles';

class HearingList extends Component {
  constructor(props) {
    super(props);
  }

  onPressItem = (item) => {
    this.props.navigation.navigate('HearingDetailView', {
      url: Config.HEARINGS_WEB_URL + item.urlSlug,
      JStoInject: 'Array.from(document.getElementsByTagName("nav")).map(function(elem){elem.style.display="none"});'
    });
  }

  render() {
    const { hearingList } = this.props;

    return (
      <View style={styles.hearingWrapper}>
        <View style={styles.headline}>
          <Text style={styles.headlineText}>
            {t('hearings')}
          </Text>
        </View>
        <CardList
          listData={hearingList}
          onPress={this.onPressItem}
        />
      </View>
    );
  }
}

export default HearingList;
