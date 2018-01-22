import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import Typist from 'react-typist';

var imageStyle = { marginTop: 30 };
const ImageWithText = (props) => (
    <div className="ui container fluid">

        <Header
            as='h1'
            content='Welcome'
            inverted
            style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '1em' }}
        />
        <Header
            as='h2'
            content='Designed to show the latest emergency calls in Baltimore'
            inverted
            style={{ fontSize: '1.9em', fontWeight: 'normal' }}
        />
        <Typist cursor={{ hideWhenDone: true, element: ' ' }}>
            <span style={{ fontSize: '1.7em', fontWeight: 'bold', color: '#1fc231' }}>>Beautiful.</span>
            <Typist.Backspace count={10} delay={500} style={{ fontSize: '1.5em', fontWeight: 'bold' }} />
            <span style={{ fontSize: '1.7em', fontWeight: 'bold', color: '#1fc231' }}>Fast.</span>
            <Typist.Backspace count={5} delay={500} />
            <span style={{ fontSize: '1.7em', fontWeight: 'bold', color: '#1fc231' }}>Simple.</span>
        </Typist>
        <img className="ui large circular centered image" alt="Circular baltimore map" src={props.url} style={imageStyle} />
        <Header
            as='h3'
            content='Powered by Google Maps.'
            inverted
            style={{ fontSize: '1.0em', fontWeight: 'normal' }}
        />

    </div>
)

const HomeLayout = (props) => (

    <div className="AppContent">

        <Segment vertical inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }}>
            <ImageWithText url="/images/snazzy-image.png" />
        </Segment>

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

)

export default HomeLayout;