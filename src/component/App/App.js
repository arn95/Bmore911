import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import HomeController from '../Home/HomeController';
import AboutController from '../About/AboutController';
import LoginController from '../Login/LoginController';
import RegisterController from '../Register/RegisterController';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact={true} path="/auth/login" component={HomeController} />
                    <Route path="/about" component={AboutController} />
                    <Route path="/login" component={LoginController} />
                    <Route path="/register" component={RegisterController} />
                </Switch>
            </div>
        );
    }
}

export default App;
