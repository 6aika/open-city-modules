/* @flow */
import * as React from 'react';
import {
  View,
  FlatList,
} from 'react-native';

import { type ServiceRequest } from 'open-city-modules/src/types';
import { getConfig } from 'open-city-modules/src/modules/Feedback/config';
import ListItem from './ListItem'

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

    };
  }


  componentWillMount = async () => {

  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = (serviceRequest) => {
    return (
      <ListItem
        serviceRequest={serviceRequest}
      />
    )
  }

  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={this._renderItem}
      />
    );
  }
}

export default ServiceRequestList;
