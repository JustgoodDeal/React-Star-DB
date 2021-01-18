import React, { Component } from 'react';

import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'
import {MyContext} from "../swapi-service-context";

import './random-planet.css';


export default class RandomPlanet extends Component {

  static defaultProps = {
    updateInterval: 10000
  };

  static propTypes = {
    updateInterval: (props, propName, componentName) => {
      const value = props[propName];
      const valueIsValid = typeof value === 'number' && !isNaN(value);
      if (valueIsValid) {
        return null;
      }
      return new TypeError(`${componentName}: ${propName} must be number`)
    }
  };

  state = {
    planet: {},
    loading: true,
    error: false
  };

  componentDidMount() {
    const { updateInterval } = this.props;
    this.previousContext = this.context;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentDidUpdate() {
    if (this.previousContext !== this.context) {
      this.previousContext = this.context;
      this.updatePlanet();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
    })
  };

  onError = (err) => {
    console.log(err);
    this.setState({
      error: true,
      loading: false
    })
  };

  updatePlanet = () => {
    let id = Math.floor(Math.random()*25) + 2;
    this.previousContext
        .getPlanet(id)
        .then(this.onPlanetLoaded)
        .catch(this.onError)
  };

  render() {
    let { planet, loading, error } = this.state;

    let errorMessage = error ? <ErrorIndicator /> : null;
    let spinner = loading ? <Spinner /> : null;
    let content = !(loading || error) ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        { errorMessage }
        { spinner }
        { content }
      </div>
    );
  }
}

RandomPlanet.contextType = MyContext


const PlanetView = ({ planet }) => {

  const { id, name, population,
    rotationPeriod, diameter } = planet;

  return (
      <React.Fragment>
        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="Random planet" />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </React.Fragment>
  );
};
