import React, { Component } from 'react';
import { StarshipDetails, WrappedStarshipList } from '../swapi-components';
import Row from '../row';

export default class StarshipsPage extends Component {

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
        left={<WrappedStarshipList itemSelectedFunc={this.onItemSelected} />}
        right={<StarshipDetails itemId={selectedItem} />} />
    );
  }
}
