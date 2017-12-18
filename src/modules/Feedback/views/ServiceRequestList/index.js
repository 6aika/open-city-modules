/* @flow */
import * as React from 'react';
import {
  View,
  FlatList,
  SectionList,
  Text
} from 'react-native';

import { type ServiceRequest } from 'open-city-modules/src/types';
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import ListItem from './components/ListItem'

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
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.data) {
      const sections = this.parseDataToSections(nextProps.data)
      this.setState({ sections })
    }
  }

  parseDataToSections = (data: Array<ServiceRequest>) => {
    let sections = {};

    data.map(item => {
      const date = new Date(item.updatedDateTime);
      const month = date.getMonth();
      console.warn("month: " + month)

      if(!(month in sections)) {
        sections[month] = [item]
      } else {
        sections[month].push(item)
      }
    })

    console.warn("SECTIONS: " + JSON.stringify(sections))
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

  render() {
    return (
      <SectionList
        sections={[
          { data: this.props.data, key: "december", title: "December"}
        ]}
        renderItem={this.renderItem}
      />
    );
  }
}

export default ServiceRequestList;
