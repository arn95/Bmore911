import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import HomeController from '../Home/HomeController';

class App extends Component {
    render() {
        return (
            <div className="App">
                <HomeController/>
            </div>
        );
    }
}

export default App;
