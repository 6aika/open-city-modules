/* @flow */
import * as React from 'react';
import {
  View,
  FlatList,
  SectionList,
  Text
} from 'react-native';
import { t } from 'open-city-modules/src/modules/Feedback/translations';
import { type ServiceRequest } from 'open-city-modules/src/types';
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import ListItem from './components/ListItem'
import styles from './styles';

const MAP_PAGE = 'map';
const LIST_PAGE = 'list';

const Config = getConfig();


type Props = {
  data: Array<ServiceRequest>
};

type State = {
  activePage: string,
};


/*
 An onboarding step component where the user can select one option from many
 */
class ServiceRequestList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sections: [],
    };
  }



  componentWillMount = () => {
    if(this.props.data) {
      const sections = this.parseDataToSections(this.props.data)
      this.setState({ sections })
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.data) {
      const sections = this.parseDataToSections(nextProps.data)
      this.setState({ sections })
    }
  }

  resolveMonthString = (date) => {
    const monthNames = [t('january'), t('february'), t('march'), t('april'),
    t('may'), t('june'), t('july'), t('august'), t('september'), t('october'),
    t('november'), t('december')];

    const mDate = new Date(date);
    return monthNames[mDate.getMonth()] + ", " + mDate.getFullYear();
  }

  parseDataToSections = (data: Array<ServiceRequest>) => {
    let sections = [];

    data.map((item) => {
      const date = new Date(item.updatedDateTime);
      const month = date.getMonth();
      const year = date.getFullYear();
      key = `${year}-${month}`;
      let found = false;

      sections.forEach((section) => {
        if (key === section.key) {
          section.data.push(item);
          found = true;
        }
      });

      if (!found) {
        const title = this.resolveMonthString(item.updatedDateTime);

        sections.push({
          data: [item],
          key,
          title
        });
        found = false;
      }
    })
    return sections
  }

  keyExtractor = (item, index) => item.id;

  goToDetail = (item) => {
    this.props.navigation.navigate(
      'Detail',
      {
        serviceRequest: item,
      },
    );
  }

  renderItem = (serviceRequest) => {
    return (
      <ListItem
        style={{flex:1}}
        serviceRequest={serviceRequest}
        onPress={this.goToDetail}
      />
    )
  }

  renderFooter = () => {
    return (<View style={styles.footer} />)
  }

  renderSectionHeader = (section) => {
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeader}>{section.section.title}</Text>
      </View>
    )
  }

  render() {
    return (
      <SectionList
        sections={this.state.sections}
        renderSectionFooter={this.renderFooter}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

export default ServiceRequestList;
