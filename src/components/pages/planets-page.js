import React, { Component } from 'react';
import { PlanetDetails, WrappedPlanetList } from '../swapi-components';
import Row from '../row';

export default class PlanetsPage extends Component {

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
        left={<WrappedPlanetList itemSelectedFunc={this.onItemSelected} />}
        right={<PlanetDetails itemId={selectedItem} />} />
    );
  }
}
