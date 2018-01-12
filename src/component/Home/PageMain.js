import React, { Component } from 'react';

class PageMain extends Component {
    render() {
        return (
            <div className="page-content">
            <div className="ui container fluid">
                <div className="ui vertical segment">
                <div className="ui three statistics">
                <div className="statistic">
                    <div className="value">
                    25,000
                    </div>
                    <div className="label">
                    Call Records
                    </div>
                </div>
                <div className="statistic">
                    <div className="value">
                    100
                    </div>
                    <div className="label">
                    Calls Today
                    </div>
                </div>
                <div className="statistic">
                    <div className="value">
                    1000
                    </div>
                    <div className="label">
                    Calls This Month
                    </div>
                </div>
                </div>        
                </div>
            </div>
            </div>
        );
    }
}

export default PageMain;