import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

class PageFooter extends Component {
    render() {
        return (
            <Segment basic inverted color='green'>

                <span style={{ fontSize: '1.0em', fontWeight: 'bold' , color: 'white'}}>
                    Made with <i className="heart icon" style={{color: 'red'}}></i> 
                    by Arnold Balliu
                </span>

            </Segment>
        );
    }
}

export default PageFooter;