import React, { Component } from 'react';
import { WrappedPersonDetails, WrappedPersonList } from '../swapi-components';
import Row from '../row';

export default class PeoplePage extends Component {

  state = {
    selectedItem: null
  };

  onItemSelected = (selectedItem) => {
    this.setState({ selectedItem });
  };

  render() {
    const { selectedItem } = this.state;

    return (
      <Row
        left={<WrappedPersonList itemSelectedFunc={this.onItemSelected} />}
        right={<WrappedPersonDetails itemId={selectedItem} />} />
    );
  }

}
