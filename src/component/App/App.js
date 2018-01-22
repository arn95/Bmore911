import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import HomeController from '../Home/HomeController';
import AboutController from '../About/AboutController';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardController from '../Dashboard/DashboardController';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

class App extends Component {
    render() {
        return (
            <div className="App">
                <AppHeader/>
                    <BrowserRouter>
                        <Switch>
                            <Route exact={true} path="/" component={HomeController} />
                            <Route path="/about" component={AboutController} />
                            <Route path="/dashboard" component={DashboardController} />
                        </Switch>
                    </BrowserRouter>
                <AppFooter/>
            </div>
        );
    }
}

export default App;
