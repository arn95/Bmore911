import React, { Component } from 'react';


class PageFooter extends Component {
    render() {
        return (
            <div className="ui footer basic segment">
                <span
                        style={{ fontSize: '1.0em', fontWeight: 'bold' , color: 'black'}}
                    >Made with <i className="heart icon" style={{color: 'red'}}></i> by Arnold Balliu</span>
            </div>
        );
    }
}

export default PageFooter;