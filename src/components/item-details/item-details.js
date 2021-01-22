import React, { Component } from 'react';

import './item-details.css';
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";


const Record = ({ item, field, label }) => {
  return (
      <li className="list-group-item">
        <span className="term">{label}</span>
        <span>{item[field]}</span>
      </li>
  )
};

export { Record }

export default class ItemDetails extends Component {

  state = {
    item: null,
    loading: true,
    error: false,
    image: null
  };

  componentDidMount() {
    this.updateItem()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.itemId !== this.props.itemId ||
        prevProps.getDataFunc !== this.props.getDataFunc ||
        prevProps.getImageUrlFunc !== this.props.getImageUrlFunc) {
      this.updateItem()
    }
  }

  updateItem = () => {
    let { itemId, getDataFunc } = this.props;
    if (!itemId) {
      return
    }

    this.setState({
      loading: true,
    });

    getDataFunc(itemId)
        .then(this.onItemLoaded)
        .catch(this.onError)
  };

  onItemLoaded = (item) => {
    this.setState({
      item,
      loading: false,
      image: this.props.getImageUrlFunc(item)
    })
  };

  onError = (err) => {
    console.log(err);
    this.setState({
      error: true,
      loading: false
    })
  };

  render() {

    if (this.state.error) {
      return <ErrorIndicator />
    }

    const { item, loading, image } = this.state;

    if (!item) {
      return <span> Select item from a list </span>;
    }

    if (loading) {
      return <Spinner />
    }

    let { name } = item;


    return (
      <div className="item-details card">
        <img className="item-image" src={image} alt="Item photo" />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                    return React.cloneElement(child, {item})
                  })
            }
          </ul>
        </div>
      </div>
    )
  }
}
