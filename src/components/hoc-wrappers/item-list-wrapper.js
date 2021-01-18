import React, { Component } from 'react';

import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';
import { MyContext } from '../swapi-service-context'


const itemListWrapper = (ViewComponent, getDataFunc) => {
  return class extends Component {

    static contextType = MyContext;

    state = {
      itemsList: null,
      error: false,
    };

    componentDidMount() {
      this.previousContext = this.context;
      this.updateItemsList()
    }

    componentDidUpdate() {
      if (this.previousContext !== this.context) {
        this.previousContext = this.context;
        this.updateItemsList()
      }
    }

    updateItemsList() {
      this.previousContext[getDataFunc]()
          .then(this.onItemsLoaded)
          .catch(this.onError);
    }

    onItemsLoaded = (itemsList) => {
      this.setState({
        itemsList,
      })
    };

    onError = () => {
      this.setState({
        error: true,
      })
    };

    render() {
      const { error, itemsList } = this.state;

      if (error) {
        return <ErrorIndicator />
      } else if (!itemsList) {
        return <Spinner />;
      }
      return <ViewComponent {...this.props} itemsList={itemsList} />;
    }
  };
};


export default itemListWrapper;
