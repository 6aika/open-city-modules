import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import CardList from './CardList';
import transHearings from '../../translations';
import Config from '../config.json';
import styles from '../styles';

class HearingList extends Component {
  constructor(props) {
    super(props);
  }

  onPressItem = (item) => {
    this.props.navigation.navigate('HearingDetailView', {
      url: Config.HEARINGS_WEB_URL + item.urlSlug,
      JStoInject: 'document.querySelector(".navbar-primary").style.display="none";',
    });
  }

  render() {
    const { hearingList } = this.props;
    // console.warn(hearingList)

    return (
      <View style={styles.hearingWrapper}>
        <View style={styles.headline}>
          <Text style={styles.headlineText}>
            {transHearings.fi.hearings}
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
