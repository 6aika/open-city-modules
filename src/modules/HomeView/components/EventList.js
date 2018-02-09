import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { t } from 'open-city-modules/src/modules/translations';
import CardList from './CardList';
import styles from '../styles';

class EventList extends Component {
  constructor(props) {
    super(props);
  }

  onPressItem = (item) => {
    this.props.navigation.navigate('EventDetailView', {
      eventUrl: item.eventUrl,
    });
  }

  render() {
    const { eventList } = this.props;

    return (
      <View style={styles.eventWrapper}>
        <View style={styles.headline}>
          <Text style={styles.headlineText}>
            {t('toDo')}
          </Text>
        </View>
        <CardList
          listData={eventList}
          onPress={this.onPressItem}
        />
      </View>
    );
  }
}

export default EventList;
