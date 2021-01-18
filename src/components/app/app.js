import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorBoundry from "../error-boundry";
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context'
import {SwapiService, DummySwapiService} from "../../services";

import './app.css';


export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
    };

    onServiceChange = () => {
        this.setState(({ swapiService }) => {

            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;

            return {
                swapiService: new Service()
            };
        });
    };

    render() {
        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService} >
                    <div className="stardb-app">

                        <Header onServiceChange={this.onServiceChange} />

                        <RandomPlanet/>
                        <PeoplePage/>
                        <PlanetsPage/>
                        <StarshipsPage/>
                        {/*<div className="row mb2 button-row">*/}
                        {/*    <ErrorButton />*/}
                        {/*</div>*/}

                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
