import React, { Component } from 'react';

class PageMain extends Component {
    render() {
        return (
            <div class="page-content">
            <div class="ui container fluid">
                <div class="ui vertical segment">
                <div class="ui three statistics">
                <div class="statistic">
                    <div class="value">
                    25,000
                    </div>
                    <div class="label">
                    Call Records
                    </div>
                </div>
                <div class="statistic">
                    <div class="value">
                    100
                    </div>
                    <div class="label">
                    Calls Today
                    </div>
                </div>
                <div class="statistic">
                    <div class="value">
                    1000
                    </div>
                    <div class="label">
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