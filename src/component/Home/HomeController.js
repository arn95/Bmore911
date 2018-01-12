import React, { Component } from 'react';
import PageFooter from './PageFooter';
import PageHeader from './PageHeader';
import PageMain from './PageMain';

class HomeController extends Component {
    render() {
        return (
            <div>
                <div className="page">
                    <PageHeader/>
                    <PageMain/>
                    <PageFooter/>
                </div>
            </div>
        );
    }
}

export default HomeController;