import React, { Component } from 'react';
import DashboardLayout from './DashboardLayout';

class Dashboard extends Component {
    render() {
        return (
            <div className='AppContent'>
                <DashboardLayout/>
            </div>
        );
    }
}

export default Dashboard;