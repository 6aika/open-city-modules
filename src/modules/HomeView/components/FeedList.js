import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import CardList from './CardList';
import transHearings from '../../translations';
import Config from '../config.json';
import styles from '../styles';

class FeedList extends Component {
  constructor(props) {
    super(props);
  }

  onPressItem = (item) => {
    console.warn('item pressed')
    // this.props.navigation.navigate('HearingDetailView', {
    //   url: Config.HEARINGS_WEB_URL + item.urlSlug,
    //   JStoInject: 'document.querySelector(".navbar-primary").style.display="none";',
    // });
  }

  render() {
    const { feedList } = this.props;
    console.warn(feedList.length)
    // console.warn(hearingList)

    return (
      <View style={styles.hearingWrapper}>
        <View style={styles.headline}>
          <Text style={styles.headlineText}>
            {'tapahtumat'}
          </Text>
        </View>
        <CardList
          listData={feedList}
          onPress={this.onPressItem}
        />
      </View>
    );
  }
}

export default FeedList;
