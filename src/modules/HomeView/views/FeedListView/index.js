/* @flow */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { t } from 'open-city-modules/src/modules/translations';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withBackButton } from 'open-city-modules/src/util';
import EStyleSheet from 'react-native-extended-stylesheet';
import Wave from 'open-city-modules/src/modules/HomeView/components/Wave';
import FeedActions from '../../redux/feed/actions';
import { getConfig } from '../../config';
import styles from './styles';

const Config = getConfig();

// import Wave from 'src/modules/Feeds/components/Wave';
// import { type Item } from 'src/modules/Feeds/types';


type Props = {
  navigation: Object,
  screenProps: any,
  t: string => string,
};

type State = {
  feedList: ?Array<Item>,
  loading: boolean,
};

class FeedListView extends React.Component<Props, State> {
  componentWillMount() {
    const { feed } = this.props.navigation.state.params;

    this.props.feedActions.getFeedList(feed.url);
  }

  render() {
    const { navigation, loading, feedList } = this.props;
    const { feed } = navigation.state.params;
    let content;
    if (loading) {
      content = (
        <View style={styles.centeredView}><Text>{t('loading')}</Text></View>
      );
    } else if (Array.isArray(feedList)) {
      content = (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {feedList.map((item, i) => (
            <TouchableOpacity
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              style={styles.listItem}
              onPress={() => navigation.navigate('FeedDetailView', { item, type: feed.name })}
            >
              <Text style={styles.listItemTitle}>{item.title}</Text>
              <Text style={styles.listItemDate}>{t('published')} {item.date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }

    const Header = withBackButton(navigation, EStyleSheet.value('colors.max'))(this.props.screenProps.Header);

    return (
      <View style={{ flex: 1 }}>
        <Header
          style={{ backgroundColor: EStyleSheet.value('$colors.max') }}
          titleStyle={{ color: EStyleSheet.value('$colors.min') }}
          title={t(feed.name).toUpperCase()}
        />
        <View style={{ flex: 1 }}>
          <Wave topColor={EStyleSheet.value('$colors.max')} style={{ position: 'absolute', top: 0, zIndex: 2 }} />
          { content }
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.feed.loading,
    feedList: state.feed.feedList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    feedActions: bindActionCreators(FeedActions, dispatch),
  };
}

const ConnectedFeedListView = connect(mapStateToProps, mapDispatchToProps)(FeedListView);

export default ConnectedFeedListView;
