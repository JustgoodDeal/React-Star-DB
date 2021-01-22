import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from "../error-boundry";
import { PeoplePage, PlanetsPage, StarshipsPage, LoginPage, SecretPage } from '../pages';
import { StarshipDetails } from '../swapi-components';
import { SwapiServiceProvider } from '../swapi-service-context'
import {SwapiService, DummySwapiService} from "../../services";

import './app.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        });
    };

    onServiceChange = () => {
        this.setState(({ swapiService }) => {

            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;

            return {
                swapiService: new Service(),
                isLoggedIn: false
            };
        });
    };

    render() {

        const { isLoggedIn } = this.state;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService} >
                    <Router>
                            <div className="stardb-app">
                                <Header onServiceChange={this.onServiceChange} />
                                <RandomPlanet/>

                                <Switch>
                                    <Route path="/"
                                           render={() => <h2>Welcome to Star DB</h2>}
                                           exact />
                                    <Route path="/people/:id?" component={PeoplePage} />
                                    <Route path="/planets" component={PlanetsPage} />
                                    <Route path="/starships" exact component={StarshipsPage} />
                                    <Route path="/starships/:id"
                                           render={({ match }) => {
                                               const { id } = match.params;
                                               return <StarshipDetails itemId={id} />
                                           }}/>

                                    <Route
                                        path="/login"
                                        render={() => (
                                            <LoginPage
                                                isLoggedIn={isLoggedIn}
                                                onLogin={this.onLogin}/>
                                        )}/>

                                    <Route
                                        path="/secret"
                                        render={() => (
                                            <SecretPage isLoggedIn={isLoggedIn} />
                                        )}/>
                                    <Route
                                        render={() => <h2> Page not found </h2>}/>
                                </Switch>

                            </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
